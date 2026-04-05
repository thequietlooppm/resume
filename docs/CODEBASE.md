# Codebase guide

Single-page resume site: **continuous vertical scroll**, dark “Architectural Architect” styling (see DESIGN.md tokens in `src/theme.ts` + `design` export). All copy comes from [`src/content/resume.json`](../src/content/resume.json).

## Directory map

| Area | Role |
|------|------|
| `src/pages/HomePage.tsx` | Composes every section in order. |
| `src/sections/` | One file per scroll section (nav, hero, about, work, education, portfolio, footer). |
| `src/content/` | JSON + types + `resume` export. |
| `src/utils/` | `initialsFromName`, `publicAssetPath`, `formatFooterMonthYear`, `currentYear`, `isGithubUrl`. |
| `public/images/` | Headshot and other static files. |

## File reference

| File | Purpose |
|------|---------|
| [src/main.tsx](../src/main.tsx) | Mount + MUI `ThemeProvider` / `CssBaseline`. |
| [src/App.tsx](../src/App.tsx) | Renders `HomePage` only. |
| [src/theme.ts](../src/theme.ts) | Dark palette, typography (Space Grotesk + Inter), `design` tokens (surfaces, gradient, shadows). |
| [src/pages/HomePage.tsx](../src/pages/HomePage.tsx) | Wires `NavBar`, hero, about, work, academic, portfolio, footer. |
| [src/sections/NavBar.tsx](../src/sections/NavBar.tsx) | Sticky glass nav; anchor links `#about`, `#experience`, etc.; Contact → `#contact`. |
| [src/sections/HeroSection.tsx](../src/sections/HeroSection.tsx) | Name + gradient title, summary teaser, Consult Me / contact jump, GitHub control. |
| [src/sections/AboutSection.tsx](../src/sections/AboutSection.tsx) | Photo + Meta badge, “Blueprint of a TPM”, Engineering/Strategy cards. |
| [src/sections/WorkHistorySection.tsx](../src/sections/WorkHistorySection.tsx) | Groups `experience` by employer (Meta, NI, …) into cards. |
| [src/sections/AcademicSection.tsx](../src/sections/AcademicSection.tsx) | Two foundation cards from `education`. |
| [src/sections/PortfolioSection.tsx](../src/sections/PortfolioSection.tsx) | Three project cards with ledger-style tags. |
| [src/sections/FooterSection.tsx](../src/sections/FooterSection.tsx) | CTA, email pill, © line, LinkedIn/GitHub. |

## GitHub Pages

Production `base` remains `/resume/` in `vite.config.ts`. In-page anchors use `#section` (no client router). Headshots use `publicAssetPath()` so `/images/...` resolves under the base URL.

## Related docs

- [README.md](../README.md) — install, build, deploy.
- [CONTENT.md](./CONTENT.md) — `resume.json` fields.
