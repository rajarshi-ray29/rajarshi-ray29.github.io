#!/usr/bin/env python3
"""Refresh data/videos.json from the channel's public RSS feed.

Run by .github/workflows/update-videos.yml on a daily schedule so the
music page always shows the latest uploads (videos and shorts alike).
Stdlib only — no API key needed.
"""
import json
import pathlib
import urllib.request
import xml.etree.ElementTree as ET

CHANNEL_ID = "UCCykFjeFcpd2FDQ3L-0zCKQ"
FEED_URL = f"https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}"
OUT = pathlib.Path(__file__).resolve().parent.parent / "data" / "videos.json"

NS = {
    "a": "http://www.w3.org/2005/Atom",
    "yt": "http://www.youtube.com/xml/schemas/2015",
}


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

    videos.sort(key=lambda v: v["published"], reverse=True)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"videos": videos}, indent=2, ensure_ascii=False) + "\n")
    print(f"wrote {len(videos)} videos to {OUT}")


if __name__ == "__main__":
    main()
