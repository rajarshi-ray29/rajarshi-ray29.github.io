# rajarshi-ray29.github.io

Personal site of **Rajarshi Ray** — part-time entrepreneur behind [SceneSenseAI](https://rajarshi-ray29.github.io/scenesense.html), AI Engineer at IBM.

Hand-built static site (no frameworks, no build step) hosted on GitHub Pages.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Portfolio — about, experience, research, publications, contact |
| `scenesense.html` | SceneSenseAI product page for pilot customers and investors |
| `music.html` | Hobby page — latest covers auto-pulled from YouTube, plus the radio story |
| `cv.html` | Print-friendly CV page, mirroring `files/resume.pdf` |

## Structure

- `assets/css/style.css` — shared design system for the dark pages
- `assets/js/main.js` — animations: particle network, scroll reveals, counters, typewriter, tilt cards, chat demo
- `files/resume.pdf` — the research resume PDF (authored in LaTeX outside this repo, copied in)
- `data/videos.json` — latest YouTube uploads; refreshed daily by `.github/workflows/update-videos.yml` (runs `scripts/update_videos.py` against the channel RSS feed, no API key needed)
- `.nojekyll` — served as plain static files (no Jekyll processing)

## Updating the resume

`files/resume.pdf` is the authored research resume (LaTeX, kept outside this repo). To update it, copy the new PDF over `files/resume.pdf` and edit `cv.html` so the CV page matches.

To render a PDF from `cv.html` instead (this overwrites the LaTeX version):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --no-pdf-header-footer --print-to-pdf="files/resume.pdf" \
  "file://$(pwd)/cv.html"
```

## Local preview

```bash
python3 -m http.server 8421
```
