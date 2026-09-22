# Codebase guide

Single-page resume site: **continuous vertical scroll**, dark editorial theme (`src/theme.ts` + `design` export). Page copy, links, logos, campus photos, and grouping rules live in [`src/content/resume.json`](../src/content/resume.json). `contentVersion` is the compatibility marker for other clients.

## Directory map

| Area | Role |
|------|------|
| `src/pages/HomePage.tsx` | Composes every section in order. |
| `src/sections/` | One file per scroll section (nav, hero, about, work, education, portfolio, footer) plus the lazy Markdown dialog. |
| `src/content/` | JSON + types + `resume` export + portfolio Markdown. |
| `src/utils/` | `initialsFromName`, `publicAssetPath`, `currentYear`, `lastCommitMonthYear`, `isGithubUrl`, `safeHref` / `safeMailto`. |
| `public/images/` | Headshot, campus photos, employer logos, project images. |
| `scripts/check-content.mjs` | Build-time check that JSON asset paths and Markdown slugs exist on disk. |

## File reference

| File | Purpose |
|------|---------|
| [src/main.tsx](../src/main.tsx) | Mount + MUI `ThemeProvider` / `CssBaseline`. |
| [src/App.tsx](../src/App.tsx) | Renders `HomePage` only. |
| [src/theme.ts](../src/theme.ts) | Dark palette, typography (Space Grotesk + Inter), `design` tokens. |
| [src/pages/HomePage.tsx](../src/pages/HomePage.tsx) | Wires `NavBar`, hero, about, work, academic, portfolio, footer. |
| [src/sections/NavBar.tsx](../src/sections/NavBar.tsx) | Sticky glass nav; desktop anchors + mobile hamburger; Contact → `#contact`. |
| [src/sections/HeroSection.tsx](../src/sections/HeroSection.tsx) | Name + gradient title, summary teaser, Contact Me, optional LinkedIn/GitHub. |
| [src/sections/AboutSection.tsx](../src/sections/AboutSection.tsx) | Photo + badge, heading, pillar cards, and skills chips — all from JSON. |
| [src/sections/WorkHistorySection.tsx](../src/sections/WorkHistorySection.tsx) | Groups `experience` by `employerId` into cards. |
| [src/sections/AcademicSection.tsx](../src/sections/AcademicSection.tsx) | Education cards; campus photo / accent come from JSON. |
| [src/sections/PortfolioSection.tsx](../src/sections/PortfolioSection.tsx) | Project cards with tags, optional image, optional Markdown modal. |
| [src/sections/PortfolioDetailDialog.tsx](../src/sections/PortfolioDetailDialog.tsx) | Lazy-loaded write-up dialog (`react-markdown`). |
| [src/sections/FooterSection.tsx](../src/sections/FooterSection.tsx) | CTA from `footer`, email pill, © line, LinkedIn/GitHub. |

## GitHub Pages

Production `base` remains `/resume/` in `vite.config.ts`. In-page anchors use `#section` (no client router). Headshots use `publicAssetPath()` so `/images/...` resolves under the base URL. The production build also emits `dist/resume.json` (same file as `src/content/resume.json`) for a second client to fetch.

CI: `.github/workflows/ci.yml` (lint + build on PRs). Deploy: `.github/workflows/static.yml` (lint + build + Pages on push to `main`).

## Related docs

- [README.md](../README.md) — install, build, deploy.
- [CONTENT.md](./CONTENT.md) — `resume.json` fields.
