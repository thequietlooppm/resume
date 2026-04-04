/**
 * Resolves a path served from `public/` (e.g. `/images/headshot.png` in JSON) to a URL
 * that respects Vite `base`. Required for GitHub Pages project sites (`/resume/...`).
 */
export function publicAssetPath(path: string): string {
  const trimmed = path.replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${trimmed}`
}
