# Jasser Noomani — Portfolio

An English/French portfolio built in the existing Angular application, with an original interactive Three.js sculpture.

## Run locally

```sh
npm install
npm start -- --port 4300
```

Open http://localhost:4300. Production build: `npm run build`. Tests: `npm test -- --watch=false` (7 tests: filters, language, CV/contact links, dialog, menu, clipboard).

Static production files are written to `dist/vite-project/browser`.

## Deploy (GitHub Pages, free)

`.github/workflows/deploy.yml` installs, tests, builds and publishes the site on every push to `main` or `master`. It sets the base path automatically: a repository named `jassernoomani.github.io` is served at `https://jassernoomani.github.io/`; any other name (e.g. `portfolio`) at `https://jassernoomani.github.io/portfolio/`.

One-time setup: create the repository on GitHub, push this folder, then in the repository open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**. Progress shows in the **Actions** tab.

## Structure

Sections, in order: Hero (availability, CV download, key figures) → 01 Work → 02 Experience & education → 03 Skills → 04 About → 05 Contact.

- `src/app/portfolio.data.ts`: **all content** — projects (with key results), experience, education, and every English/French string. Edit text here, not in the template.
- `src/app/app.html`: page structure, project illustrations, and the project dialog.
- `src/app/app.css`: one consolidated stylesheet (shared primitives → sections → project visuals → responsive). Colour tokens live in `src/styles.css`.
- `src/app/player-card.*`: the hero "engineer profile" card (tilts with the mouse, floats, pauses with the Motion button). **Your photo goes in `public/photo.jpg`**; it is shown in a blue duotone automatically, and the JN monogram appears until the file exists. Card numbers live in `cardStats` in `app.ts`.
- `src/app/three-scene.ts` / `orbital-scene.ts`: the earlier Three.js sculpture, no longer used on the page (kept in case you want it back).
- `src/app/app.ts`: language, filtering, dialog focus, clipboard, contact links.
- `public/Jasser_Noomani_CV_Fr.pdf`: the downloadable CV. Replace this file to update it everywhere.

Project cards use three sizes (`featured`, `major`, `minor`) set in the data file. When a filter is active, cards switch to an even two-column grid.

## Content provenance

Content matches the October 2026 CV: ReaddlyTech internship (Jul–Aug 2026, e-Biessa), Tunisie Telecom initiation internship (Aug–Sep 2025), Veeva (Jun 2024–Apr 2025, from the original CV), ESPRIT 2024–present, ISSAT Kasserine 2021–2024. Languages: French B2, English B2 (no certificate claimed). Contact: Jasser.NOOMANI@esprit.tn and linkedin.com/in/jasser-noomani.

Figures are measured, not estimated: Nova Paris (20 features, ~20,500 lines of Dart, 155 tests, 43/43 E2E on device) and Nirvana (86 tests, 94% coverage) come from the repository measurements of 24 October 2026; Polars vs PostgreSQL timings (3.7 s vs 15.6 s, 67M rows, 9 GB) come from the 2024 licence PFE report. "240+ automated tests" in the hero is 155 + 86.

Project illustrations are original editorial graphics, not screenshots. No clients, testimonials, live deployments or repository links are invented; e-Biessa is described as a local development and resilience lab.

## Visual identity — "Midnight tide"

A style inspired by late-night, ocean-blue JRPG interfaces: deep blues, electric cyan and moonlight white, slanted menus and heavy italic type. It uses no game logos, characters, fonts or screenshots; every shape is original CSS/SVG.

- Palette tokens in `src/styles.css`: `--abyss #020b2e`, `--bg #041244`, `--deep #071c6b`, `--surface #0a2690`, `--blue #1452ff`, `--electric #2f7bff`, `--cyan #3fd8ff`, `--ice #b8f1ff`, `--text #f2f9ff`.
- Fonts are self-hosted from npm (`@fontsource/anton`, `@fontsource/barlow`, `@fontsource/barlow-condensed`): Anton for headlines, Barlow Condensed italic for menus and labels, Barlow for body text. No Google Fonts request.
- Hero backdrop: CSS moon, drifting light slashes, water caustics and rising bubbles (all decorative, paused for reduced motion). The Three.js sculpture uses matching blue/cyan materials.
- `src/project-art.css`: the project card illustrations, kept global so the component stylesheet stays within Angular's budget.
- `public/brand-mark.svg` / `favicon.svg`: JN monogram in white and cyan.
- `public/icons/`: Bootstrap Icons v1.13.1 (MIT), same-origin sprite.
- `design-backup/navy/`: the previous navy design (app.html, app.css, brand-panel.css, styles.css, three-scene.ts) if you want to switch back.
