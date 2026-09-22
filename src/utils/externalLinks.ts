/**
 * Returns true when the URL’s host is GitHub, used to choose link copy
 * (“Repository” vs “Link”) for project URLs.
 */
export function isGithubUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '').toLowerCase()
    return host === 'github.com' || host.endsWith('.github.com')
  } catch {
    return false
  }
}
