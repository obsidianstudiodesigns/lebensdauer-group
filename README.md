# Lebensdauer Group — Website

Static marketing site for Lebensdauer Group (Est. 2017) — commercial, industrial and high-end
residential construction across the Eastern Cape and Durban.

**Building excellence. Delivering quality.**

---

## Stack

Plain HTML, CSS and vanilla JavaScript. No build step, no dependencies, no framework.
Drop the folder on any static host and it runs.

```
index.html          Home — full-bleed video hero, services, process, locations
about.html          The group, values, numbers, regions
services.html       Sector showcase + six detailed service blocks
contact.html        Enquiry form, direct contact details, regions
404.html            Not-found page
robots.txt          Crawl rules
sitemap.xml         Search-engine sitemap
assets/
  css/main.css      Single stylesheet (design tokens at the top)
  js/main.js        Sticky header, mobile drawer, hero video, scroll reveal, form
  img/              Logo derivatives, posters, project photography
  video/            Hero videos (desktop + mobile, MP4 + WebM)
```

## Running locally

Any static server works. For example:

```bash
npx --yes http-server . -p 4321 -c-1
```

Then open <http://localhost:4321>. Opening `index.html` directly from disk also works.

---

## Design

| Token | Value | Use |
| --- | --- | --- |
| `--amber` | `#ffc13c` | Primary accent — sampled from the logo's arch |
| `--orange` | `#fc8527` | Secondary accent |
| `--orange-deep` | `#f65f1a` | Gradient anchor, glow washes |
| `--cream` | `#f9e0a8` | Button hover, captions |
| `--ink-900` | `#08080a` | Page background |
| `--paper` | `#f2efe9` | Headings |

Typefaces: **Anton** for display, **Barlow** for everything else (Google Fonts).
All design tokens live in the `:root` block at the top of `assets/css/main.css`.

---

## Assets

### Hero videos

The supplied landing-page videos carried a white four-point star watermark near the
bottom-right corner. It has been removed from both cuts with ffmpeg's `delogo` filter,
which reconstructs the covered area from the surrounding pixels:

```bash
# Desktop cut (1280x720) — watermark at x1131 y569, 61x63
ffmpeg -i "Landing page.mp4" \
  -vf "delogo=x=1131:y=569:w=61:h=63" -an \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 25 -preset slow \
  -movflags +faststart assets/video/hero-desktop.mp4

# Mobile cut (720x1280) — watermark at x571 y1129, 61x61
ffmpeg -i "Landing page mobile.mp4" \
  -vf "delogo=x=571:y=1129:w=61:h=61" -an \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -preset slow \
  -movflags +faststart assets/video/hero-mobile.mp4
```

Audio is stripped (the hero is muted anyway) and WebM/VP9 versions are served first for
browsers that support them. `assets/js/main.js` injects the right pair at runtime based on
`(max-width: 900px) and (orientation: portrait)`, so a phone never downloads the landscape file.

### Logo

`assets/img/logo-mark.png`, `logo-wordmark.png` and `logo-full.png` are derived from the
supplied `LOGO.jpg` with the black background converted to transparency, so the mark sits
cleanly on the dark UI. The header uses mark + wordmark side by side as a horizontal lockup.

### Photography

The six service-card images are all 640×480 (4:3) and drive both the homepage grid and the
sector strip on `services.html`:

| File | Service | Source |
| --- | --- | --- |
| `work-commercial.jpg` | Commercial construction | Flyer 2 crop |
| `work-industrial.jpg` | Industrial construction | Flyer 2 crop |
| `work-residential.jpg` | High-end residential | Flyer 2 crop |
| `work-renovations.jpg` | Renovations & alterations | Flyer 1 crop |
| `work-civil.jpg` | Civil infrastructure | Flyer 1 crop |
| `work-management.jpg` | Project management | Drafted floor plan — see below |

`site-sunset.jpg` (the about-page feature image) is also a Flyer 1 crop.

The five photographic images are placeholders derived from the supplied brand assets —
replace them with real project photography as it becomes available. Keep the 4:3 ratio and
the filenames and nothing else needs to change.

`work-management.jpg` is not a photo: it is an architectural ground-floor plan drawn as SVG
and rendered at 2× through headless Chrome, then downscaled. The source is
`tools/floor-plan.html` — edit that and re-render to change it:

```bash
# from the repo root, with the plan open at 1280x960
ffmpeg -i plan-2x.png -vf "scale=640:480:flags=lanczos" -q:v 3 assets/img/work-management.jpg
```

Because it is line-work on near-black, its card carries a `service__shot--plan` modifier
that skips the photographic darkening filter. If you swap it for a photo, drop that class.

---

## Enquiry form

`contact.html` posts through the visitor's own mail client: the form has no `action`, so
`assets/js/main.js` builds a pre-filled `mailto:` to `info@lebensdauergroup.co.za`.

To capture submissions server-side instead, add an `action` (and `method="POST"`) to the
form — the script detects it and steps out of the way:

```html
<form class="form" data-enquiry method="POST" action="https://formspree.io/f/XXXXXXX">
```

Netlify Forms works the same way — add `netlify` and a `form-name` hidden input.

---

## Accessibility & responsiveness

- Verified with no horizontal overflow from 320px through 1440px.
- Mobile drawer: `aria-expanded`, `aria-controls`, `inert` when closed, focus moved into the
  panel on open and returned to the trigger on close, focus trapped while open, `Escape` closes,
  body scroll locked, and the close control stays above the overlay.
- `prefers-reduced-motion` disables transitions, animations and smooth scrolling.
- Scroll-reveal has a `<noscript>` fallback and a periodic sweep, so content is never stuck
  invisible if the observer is outrun.
- Visible focus rings, skip-to-content link, landmark regions and labelled form fields.

---

## Deploying

Any static host: GitHub Pages, Netlify, Vercel, Cloudflare Pages, or plain FTP to shared
hosting. There is nothing to compile.

Before go-live, update the absolute URLs in `sitemap.xml`, `robots.txt` and the `canonical`
/ `og:` tags in each page's `<head>` if the final domain differs from
`https://www.lebensdauergroup.co.za/`.

---

## Contact

074 860 7069 · info@lebensdauergroup.co.za · royalstarconstruc@outlook.com
Eastern Cape · Durban
