# rajarshi-ray29.github.io

Personal site of **Rajarshi Ray** — Founder of [SceneSenseAI](https://rajarshi-ray29.github.io/scenesense.html), AI Engineer at IBM.

Hand-built static site (no frameworks, no build step) hosted on GitHub Pages.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Portfolio — about, experience, research, publications, contact |
| `scenesense.html` | SceneSenseAI product page for pilot customers and investors |
| `cv.html` | Print-friendly CV (source of truth for `files/resume.pdf`) |

## Structure

- `assets/css/style.css` — shared design system for the dark pages
- `assets/js/main.js` — animations: particle network, scroll reveals, counters, typewriter, tilt cards, chat demo
- `files/resume.pdf` — generated from `cv.html`
- `.nojekyll` — served as plain static files (no Jekyll processing)

## Updating the resume PDF

Edit `cv.html`, then regenerate:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --no-pdf-header-footer --print-to-pdf="files/resume.pdf" \
  "file://$(pwd)/cv.html"
```

## Local preview

```bash
python3 -m http.server 8421
```
