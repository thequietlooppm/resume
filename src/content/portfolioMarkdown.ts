/**
 * Long-form portfolio write-ups as Markdown files in `./portfolio/*.md`.
 * Referenced from `resume.json` via `detailModal.markdown` (slug without `.md`).
 * After adding a new `.md` file, save this file or refresh the page if the write-up
 * button does not appear (dev server re-scans the glob on portfolio file changes).
 */
const rawByPath = import.meta.glob('./portfolio/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function getPortfolioMarkdown(slug: string): string | undefined {
  const trimmed = slug.trim()
  if (!trimmed) return undefined
  const key = `./portfolio/${trimmed}.md`
  const direct = rawByPath[key]
  if (typeof direct === 'string') return direct
  const found = Object.keys(rawByPath).find((k) => k.endsWith(`/${trimmed}.md`))
  return found ? rawByPath[found] : undefined
}
