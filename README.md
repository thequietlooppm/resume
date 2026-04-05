# Resume site

Static resume site built with **Vite**, **React**, **TypeScript**, and **Material UI (MUI)**. Content lives in [`src/content/resume.json`](src/content/resume.json). The UI is a **single continuous scroll** (dark theme, section anchors in the nav) — no client-side router.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

- **Production build:** `npm run build` — output in `dist/`.
- **Preview build:** `npm run preview`.

## Code structure

See **[`docs/CODEBASE.md`](docs/CODEBASE.md)** for a per-file and per-function overview of the React app.

## Editing content

See **[`docs/CONTENT.md`](docs/CONTENT.md)** for field-by-field documentation of `resume.json`.

- **Text and links:** edit [`src/content/resume.json`](src/content/resume.json).
- **Types:** [`src/content/types.ts`](src/content/types.ts) defines the schema; keep JSON aligned with it.
- **Headshot:** add an image under [`public/images/`](public/images/) (e.g. `headshot.jpg`) and set `basics.photoSrc` to `/images/headshot.jpg` in the JSON.

## Page sections (anchor links)

| Hash | Section |
|------|---------|
| `#hero` | Name, title, summary teaser, CTAs |
| `#about` | Photo, blueprint copy, Engineering / Strategy cards |
| `#experience` | Work history (grouped by company) |
| `#education` | Academic foundations |
| `#projects` | Portfolio cards |
| `#contact` | Footer CTA + email + social |

`npm run build` still copies `dist/index.html` → `dist/404.html` for GitHub Pages edge cases.

## Responsive layout

Sections use MUI `Grid` / `Stack` with mobile-first stacking. Check **Chrome DevTools** at ~**375px** and **768px** after layout changes.

## Deployment

`dist/` is static files only. It works with **GitHub Pages**, **Vercel**, **Netlify**, or any static host.

### GitHub Pages at `https://<user>.github.io/resume/`

This repo is configured for a **project site** (repo name `resume`):

- **[`vite.config.ts`](vite.config.ts)** sets `base: '/resume/'` in **production** builds so scripts and styles load from `/resume/assets/...`.
- **[`src/App.tsx`](src/App.tsx)** sets `BrowserRouter` `basename` from `import.meta.env.BASE_URL` so in-app links match that path.
- **`npm run build`** copies `dist/index.html` → `dist/404.html` so [GitHub Pages can serve your SPA](https://github.com/orgs/community/discussions/36999) when users open or refresh a deep link (e.g. `/resume/projects`).

`npm run dev` still uses `base: '/'` (root), so local URLs stay `http://localhost:5173/...`.

**Preview a production build locally** (with `/resume/` base):

```bash
npm run build && npm run preview
```

Open **http://localhost:4173/resume/** — the single-page app loads there; use nav links or hashes like `#projects`.

If you rename the GitHub repo, change **`/resume/`** in `vite.config.ts` to `/<new-repo-name>/`.

## Scripts

| Command        | Action                          |
|----------------|---------------------------------|
| `npm run dev`  | Dev server with hot reload      |
| `npm run build`| Typecheck + production bundle   |
| `npm run preview` | Serve `dist/` locally      |
| `npm run lint` | ESLint                          |
