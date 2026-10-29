# Jasser Noomani — Portfolio

My personal portfolio: **[jassernoomani.github.io](https://jassernoomani.github.io)**

A single-page site in English and French that presents my projects, experience and CV. The design is inspired by Persona 3 Reload, in a dark-blue "Midnight Tide" palette.

## Features

- **Hero player card** with my photo, key stats and a tilt effect
- **Project grid** with filters (Full-stack, Mobile, Applied AI, Data & DevOps)
- **Project details** with demo videos, screenshot galleries and a full-screen carousel with zoom and swipe
- **About panel** with a live Tunis clock
- **English / French** switch, remembered between visits
- **CV download** in the selected language (`Jasser_Noomani_CV_En.pdf` / `Jasser_Noomani_CV_Fr.pdf`)
- Responsive layout, keyboard navigation and reduced-motion support

## Tech stack

- **Angular 21**: standalone components, signals, new control flow
- **Vitest** unit tests (`ng test`)
- Self-hosted fonts (Anton, Barlow, Barlow Condensed) via `@fontsource`
- **GitHub Actions** builds the site and deploys it to **GitHub Pages** on every push to `main`

## Run locally

```bash
npm install
npm start         # http://localhost:4200
npm test          # unit tests
npm run build     # production build in dist/
```

## Project structure

```text
src/app/
  app.ts / app.html / app.css    page layout, filters, dialogs, carousel
  portfolio.data.ts              projects, experience, education, translations
  player-card.*                  hero card
  brand-panel.*                  About panel (JN emblem + clock)
  icon.ts                        SVG icon component
public/
  projects/                      screenshots and demo videos
  icons/sprite.svg               icon sprite
  Jasser_Noomani_CV_*.pdf        CVs
```

To add or edit a project, update `src/app/portfolio.data.ts` and put its images in `public/projects/<name>/`.
More details are in [PORTFOLIO.md](PORTFOLIO.md).

## Contact

[Jasser.NOOMANI@esprit.tn](mailto:Jasser.NOOMANI@esprit.tn) · [LinkedIn](https://www.linkedin.com/in/jasser-noomani)
