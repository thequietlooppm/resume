/**
 * Allow only https: and mailto: for hrefs taken from resume content.
 * javascript:, data:, and other schemes are dropped so they cannot run in the browser.
 */
const ALLOWED = new Set(['https:', 'mailto:'])

export function safeHref(url: string | undefined): string | undefined {
  if (!url) return undefined
  const trimmed = url.trim()
  if (!trimmed) return undefined
  try {
    const parsed = new URL(trimmed)
    return ALLOWED.has(parsed.protocol) ? trimmed : undefined
  } catch {
    return undefined
  }
}

/** `mailto:` href for a contact email; rejects values that would change the scheme. */
export function safeMailto(email: string | undefined): string | undefined {
  if (!email) return undefined
  const trimmed = email.trim()
  if (!trimmed || /[:/\s<>]/.test(trimmed)) return undefined
  return safeHref(`mailto:${trimmed}`)
}
