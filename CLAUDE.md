# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This is a plain static site — no `package.json`, no build step, no linter, no test suite.

- **Preview**: open any `.html` file directly in a browser, or serve the folder with any static file server (e.g. `python -m http.server`, `npx serve`). A server is only needed to avoid `file://` quirks; there is no compilation step.
- There is nothing to build, lint, or test.

## Architecture

Four standalone HTML pages — `index.html`, `reel.html`, `portfolio.html`, `contact.html` — share one stylesheet (`css/style.css`) and one script (`js/main.js`). There is no templating system, so shared chrome is duplicated by hand in every page:

- `<head>`: identical Google Fonts `<link>` tags (Yeseva One for headings/brand, GFS Didot as its fallback, Courier Prime for body/mono text) in all four files (also duplicated in `work.html`).
- `.topbar`: identical brand link + nav markup (`data-nav="home|reel|portfolio|contact"`) repeated in every file.
- `.shell > .main`: page content wrapped in `.sprocket` divider strips and a shared `footer`.

**When changing nav links, brand name, or footer text, edit all four HTML files — there is no single source of truth for shared markup.**

### Theming (`css/style.css`)

All colors are CSS custom properties defined once on the default `:root` (`--paper`, `--paper-raised`, `--paper-line`, `--text`, `--text-muted`, `--khaki`, `--red`/`--red-soft`/`--on-accent` as the accent color, `--green`/`--green-soft`). The site is light-only — there is no dark mode (no OS `prefers-color-scheme` block, no `data-theme` toggle). Don't reintroduce either without being asked.

`--on-accent` exists specifically so text on `--red`-colored buttons/surfaces stays readable against the accent color.

### `js/main.js`

One IIFE, loaded on every page: `IntersectionObserver` adds `.in` to `.reveal` elements as they scroll into view; marks the nav link matching `document.body[data-page]` as `.active`. Also does a scroll-progress lookup against `#railProgress` — that element no longer exists in the HTML (removed when the left sidebar was replaced by the top nav bar), so this is a harmless no-op now.

A previous iteration had an in-page color-picker widget that saved its picks to `localStorage` under `kt-theme-colors` and re-applied them via inline `style.setProperty(...)` on every load — which silently overrode any later CSS color changes (a CSS edit could look like it "didn't work" for anyone with an old saved value). Both the widget and the persistence logic have been removed for good; `main.js` actively clears that `localStorage` key on load so stale values from anyone who used the old widget stop overriding the CSS. **Colors live in `css/style.css` only. Do not reintroduce JS-driven inline color overrides or `localStorage`-based theme persistence.**

### Theme direction: "Screenplay Manuscript"

The site's visual identity is a minimal, film-industry screenwriter aesthetic:
- **Fonts**: headings (`h1–h4`, `.topbar .brand`) use a **Yeseva One** stack (bold display serif, single 400 weight — falls back to Didot/GFS Didot if it fails to load); body text and `.mono` both use **Courier Prime** (authentic screenplay typewriter font) — same font, `.mono` just adds `font-weight:700` and tighter tracking for labels/meta text (slate fields, durations, nav-adjacent tags). **Thai-language pages (`html[lang="th"]`, the default) override body/`.mono`/`.slugline`/headings to the local `Supermarket` display font** (`fonts/supermarket.ttf`, single Regular weight, `@font-face` in `css/style.css`, sourced from f0nt.com) — Yeseva One/Courier Prime remain as fallback and are what's shown when the EN toggle sets `lang="en"`. `.topbar .brand` (the "W. Benyapha" wordmark) is never translated and stays on the Yeseva One stack regardless of language.
- **Sluglines**: each page opens its main `<section>` with a `.slugline` line styled like a screenplay transition — `FADE IN:` on `index.html`, `CUT TO:` on `reel.html`/`portfolio.html`, `FADE OUT.` on `contact.html`. Keep this convention if new pages are added.
- **Revision marks**: `.eyebrow` labels used to carry a bold red `*` via `::before` (mimicking the asterisk screenwriters use in the margin to flag a changed line). This was removed site-wide by request — `.eyebrow` is now plain red uppercase text with no leading mark. Don't reintroduce the `::before` asterisk.
- **Film motifs already in place**: `.grain` overlay, `.sprocket` divider strips, and the `.slate` "clapperboard" field list on the homepage — these predate the manuscript theme but are consistent with it and should be kept.
