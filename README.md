# Tuition Centre Website Template

A fast, single-page marketing site for a tuition centre, built without a framework and designed so non-technical staff can update it. The brand ("Lumen Learning Centre"), people and figures in this repository are placeholders.

A production version of this template runs for a real tuition centre in Selangor, Malaysia.

## Features

- **Content separated from code.** Every piece of editable content (centre details, photos, programmes, class timetable, news and events, testimonials) lives in one file, `content.js`. Staff edit that file; `app.js` and `index.html` never change.
- **Class timetable** with day tabs that switches to a stacked card layout on phones.
- **Enquiries through WhatsApp.** The trial-class form validates input and builds a pre-filled `wa.me` message, so there is no backend, no database and no personal data stored on a server.
- **Motion without a framework:** a small spring-physics engine (tension/friction model) on `requestAnimationFrame` drives scroll reveals, hover effects, parallax and two carousels. Smooth scrolling uses Lenis. Honours `prefers-reduced-motion`.
- **Fluid scaling:** a rem-based layout scales the whole design with the viewport width.
- **Security headers** (`_headers`): Content-Security-Policy limited to self plus two CDNs, `X-Frame-Options: DENY`, `nosniff`, HSTS, and a Permissions-Policy that turns off camera, microphone and location.
- **Accessible:** semantic landmarks, keyboard focus states, Escape closes the dialogs, scroll lock while the menu or form is open, and alt text on every image.
- **SEO basics:** meta description, `robots.txt` and `sitemap.xml`. Each image slot shows a ruled-paper placeholder until a real photo is added.

## Stack

Plain HTML, CSS and JavaScript (no build step) · Lenis 1.1.18 (CDN) · Google Fonts (Onest). Deployed as a static site with continuous deployment from GitHub (Cloudflare Pages or Netlify).

## Project structure

```
index.html   markup and styles
app.js       behaviour: rendering, animation engine, carousels, modal, menu
content.js   all editable content (the only file staff touch)
_headers     security headers for the host
images/      photos and logo
```

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Connect the repository to Cloudflare Pages or Netlify. Set the framework preset to "None", leave the build command empty and set the output directory to the root. Every push to `main` publishes the site.
