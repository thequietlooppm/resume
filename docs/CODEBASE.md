# Codebase guide

This document summarizes **what each source file does** and **what each named function/component is for**. For editing copy and fields, see [CONTENT.md](./CONTENT.md).

## Directory map

| Area | Role |
|------|------|
| `src/` | Application code (React, MUI, router). |
| `src/content/` | `resume.json` plus TypeScript types and the `resume` export. |
| `src/layout/` | Header, footer, and the route shell. |
| `src/pages/` | One file per route (`/`, `/resume`, `/projects`, `/contact`). |
| `src/components/` | Shared UI: sections, profile icons, sheet layout. |
| `src/utils/` | Small pure helpers (dates, strings, URL checks). |
| `public/` | Static assets (e.g. `public/images/` for headshots). |

---

## File reference

### Entry and app shell

| File | Purpose |
|------|---------|
| [index.html](../index.html) | HTML shell, viewport meta, favicon, Google Fonts (Playfair + Source Sans 3). |
| [src/main.tsx](../src/main.tsx) | Mounts React; wraps app in `ThemeProvider`, `CssBaseline`. |
| [src/App.tsx](../src/App.tsx) | Defines `BrowserRouter` routes; unknown paths redirect to `/`. |
| [src/theme.ts](../src/theme.ts) | Exports `theme` — MUI palette, typography, component defaults. |
| [src/index.css](../src/index.css) | Minimal global CSS (`#root` min-height, body margin). |

**Functions**

- `App` (default export) — Declares the route tree under `SiteLayout`.

---

### Content

| File | Purpose |
|------|---------|
| [src/content/types.ts](../src/content/types.ts) | Interfaces for `Resume` and nested objects; documents expected JSON shape. |
| [src/content/resume.json](../src/content/resume.json) | **Source of truth** for all resume text, links, and lists. |
| [src/content/index.ts](../src/content/index.ts) | Exports `resume` (typed import of JSON). |

**Exports**

- `resume` — Parsed resume object used across layout and pages.

---

### Layout

| File | Purpose |
|------|---------|
| [src/layout/SiteLayout.tsx](../src/layout/SiteLayout.tsx) | Column flex shell: header, `main` + `Outlet`, footer. |
| [src/layout/SiteHeader.tsx](../src/layout/SiteHeader.tsx) | Sticky brand + desktop nav + mobile drawer. |
| [src/layout/SiteFooter.tsx](../src/layout/SiteFooter.tsx) | Copyright, build stamp, Email column, Follow column (LinkedIn/GitHub). |

**Functions / components**

- `SiteLayout` — Renders persistent chrome around child routes.
- `SiteHeader` — Shows `basics.name` / `basics.title`, `navItems`, hamburger menu on small screens.
- `NavTextLink` — Desktop-only styled `NavLink` with active color from theme.
- `SiteFooter` — Left block (© + “Built with…”), flexible spacer, right cluster (Email then Follow).

---

### Pages (routes)

| File | Route | Purpose |
|------|-------|---------|
| [src/pages/AboutPage.tsx](../src/pages/AboutPage.tsx) | `/` | Profile card, summary, CTAs to Resume/Projects; vertically centered. |
| [src/pages/ResumePage.tsx](../src/pages/ResumePage.tsx) | `/resume` | Wraps experience, education, skills in `PageSheet`. |
| [src/pages/ProjectsPage.tsx](../src/pages/ProjectsPage.tsx) | `/projects` | Wraps projects in `PageSheet`. |
| [src/pages/ContactPage.tsx](../src/pages/ContactPage.tsx) | `/contact` | Contact card with icons and links. |

**Exports**

- `AboutPage`, `ResumePage`, `ProjectsPage`, `ContactPage` — Route-level components (no props; read `resume` from content).

---

### Shared components

| File | Purpose |
|------|---------|
| [src/components/PageSheet.tsx](../src/components/PageSheet.tsx) | Shared `Paper` wrapper for Resume and Projects pages. |
| [src/components/CvSection.tsx](../src/components/CvSection.tsx) | Section title with accent bar; wraps arbitrary children. |
| [src/components/resumeSections.tsx](../src/components/resumeSections.tsx) | Maps `resume` arrays into CV sections. |
| [src/components/SocialIconRow.tsx](../src/components/SocialIconRow.tsx) | Icon row on the About card: email & LinkedIn when set; GitHub always (link or disabled placeholder). |

**Exports**

- `PageSheet` — Layout chrome for multi-section CV pages.
- `CvSection` — Props: `title`, optional `id`, `children`.
- `ExperienceSection`, `EducationSection`, `SkillsSection`, `ProjectsSection` — Props: `{ data: Resume }`.
- `SocialIconRow` — Props: `contact`, optional `iconColor`. GitHub matches footer behavior (disabled until `contact.github` is set).

---

### Utilities

| File | Purpose |
|------|---------|
| [src/utils/initials.ts](../src/utils/initials.ts) | Avatar fallback letters from a full name. |
| [src/utils/siteDates.ts](../src/utils/siteDates.ts) | Footer copyright year and “month year” stamp. |
| [src/utils/externalLinks.ts](../src/utils/externalLinks.ts) | Detect GitHub URLs for project link labels. |

**Functions**

- `initialsFromName(name)` — Returns up to two uppercase initials.
- `currentYear()` — `new Date().getFullYear()`.
- `formatFooterMonthYear()` — e.g. `"April 2026"` in `en-US`.
- `isGithubUrl(url)` — True if hostname contains `github.com`.

---

## Simplifications made

1. **`PageSheet`** — Resume and Projects shared duplicate `Paper`/`Container`/`Box` markup; now one component.
2. **`siteDates` / `externalLinks` / `initialsFromName`** — Small pure logic lifted out of JSX files for clarity and reuse.
3. **`resumeSections`** — Shared `sectionDivider` and `projectLinkSx` reduce repeated MUI props.
4. **`SiteFooter`** — Single `centeredColumnTitleSx` for Email/Follow headings.

---

## Related docs

- [README.md](../README.md) — Install, dev server, routing, deploy notes.
- [CONTENT.md](./CONTENT.md) — `resume.json` field reference.
