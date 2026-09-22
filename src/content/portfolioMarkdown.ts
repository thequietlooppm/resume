/**
 * Long-form portfolio write-ups as Markdown files in `./portfolio/*.md`.
 * Referenced from `resume.json` via `detailModal.markdown` (slug without `.md`).
 * Loaders are lazy so write-up text is not in the initial JS chunk.
 */
const loaders = import.meta.glob('./portfolio/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

function loaderFor(slug: string): (() => Promise<string>) | undefined {
  const trimmed = slug.trim()
  if (!trimmed) return undefined
  const direct = loaders[`./portfolio/${trimmed}.md`]
  if (direct) return direct
  const found = Object.entries(loaders).find(([key]) => key.endsWith(`/${trimmed}.md`))
  return found?.[1]
}

export function hasPortfolioMarkdown(slug: string): boolean {
  return Boolean(loaderFor(slug))
}

export async function loadPortfolioMarkdown(slug: string): Promise<string | undefined> {
  const load = loaderFor(slug)
  if (!load) return undefined
  const raw = await load()
  const text = typeof raw === 'string' ? raw.trim() : ''
  return text || undefined
}
