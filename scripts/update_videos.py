#!/usr/bin/env python3
"""Refresh data/videos.json from the channel's public RSS feed.

Run by .github/workflows/update-videos.yml on a daily schedule so the
music page always shows the latest uploads. Stdlib only, no API key.

Extras: the RSS feed only carries the ~15 newest uploads, so older
covers worth keeping on the page are pinned in EXTRA_VIDEOS.

De-duplication: when the same performance was uploaded as both a video
and a Short (matching title cores, published within 60 days), only the
full video is kept. Shorts are detected by requesting the /shorts/ URL:
real Shorts return 200, regular videos redirect (3xx).
"""
import json
import pathlib
import re
import urllib.request
import xml.etree.ElementTree as ET

CHANNEL_ID = "UCCykFjeFcpd2FDQ3L-0zCKQ"
FEED_URL = f"https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}"
OUT = pathlib.Path(__file__).resolve().parent.parent / "data" / "videos.json"

NS = {
    "a": "http://www.w3.org/2005/Atom",
    "yt": "http://www.youtube.com/xml/schemas/2015",
}

# Older uploads that have aged out of the 15-entry RSS window.
EXTRA_VIDEOS = [
    {
        "id": "-H9r5-Lx8bI",
        "title": "Game of Thrones Theme - Fingerstyle Guitar Cover",
        "published": "2024-06-21T22:00:00+00:00",
    },
    {
        "id": "6CNrPurWwiI",
        "title": "Satranga (Animal) - Acoustic Guitar & Vocal Cover by Rajarshi Ray",
        "published": "2024-05-26T22:22:48+00:00",
    },
]

# Uploads to keep off the page entirely.
EXCLUDE_IDS = {
    "YUUUropeJM4",  # Sajni
    "epuYUO2HkLc",  # Rabindrasangeet Reimagined
}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


def is_short(video_id: str) -> bool:
    """A real Short serves /shorts/<id> with 200; videos redirect away."""
    req = urllib.request.Request(
        f"https://www.youtube.com/shorts/{video_id}",
        headers={"User-Agent": "Mozilla/5.0"},
    )
    opener = urllib.request.build_opener(NoRedirect)
    try:
        with opener.open(req, timeout=20) as r:
            return r.status == 200
    except urllib.error.HTTPError as e:
        return not (300 <= e.code < 400)
    except Exception:
        return False  # on network trouble, keep the upload


def title_core(title: str) -> str:
    core = title.split("|")[0]
    core = re.sub(r"#\S+", "", core)
    core = re.sub(r"[^a-z0-9 ]", " ", core.lower())
    return re.sub(r"\s+", " ", core).strip()


def main() -> None:
    req = urllib.request.Request(FEED_URL, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        root = ET.fromstring(r.read())

    videos = []
    for entry in root.findall("a:entry", NS):
        videos.append(
            {
                "id": entry.find("yt:videoId", NS).text,
                "title": entry.find("a:title", NS).text,
                "published": entry.find("a:published", NS).text,
            }
        )

    feed_ids = {v["id"] for v in videos}
    videos += [v for v in EXTRA_VIDEOS if v["id"] not in feed_ids]
    videos = [v for v in videos if v["id"] not in EXCLUDE_IDS]

    for v in videos:
        v["short"] = is_short(v["id"])
        v["core"] = title_core(v["title"])
        v["day"] = v["published"][:10]

    def near(a, b, days=60):
        from datetime import date

        da = date.fromisoformat(a["day"])
        db = date.fromisoformat(b["day"])
        return abs((da - db).days) <= days

    kept = []
    for v in videos:
        if v["short"]:
            dupe_of = next(
                (
                    w
                    for w in videos
                    if not w["short"]
                    and near(v, w)
                    and (v["core"] in w["core"] or w["core"] in v["core"])
                ),
                None,
            )
            if dupe_of:
                print(f"dropping short {v['id']} ({v['title'][:40]}…), dupe of {dupe_of['id']}")
                continue
        kept.append(v)

    for v in kept:
        v.pop("core", None)
        v.pop("day", None)

    kept.sort(key=lambda v: v["published"], reverse=True)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"videos": kept}, indent=2, ensure_ascii=False) + "\n")
    print(f"wrote {len(kept)} videos to {OUT}")


if __name__ == "__main__":
    main()
