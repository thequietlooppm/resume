/**
 * Returns true when the URL’s host is GitHub, used to choose link copy
 * (“Repository” vs “Link”) for project URLs.
 */
export function isGithubUrl(url: string): boolean {
  try {
    return new URL(url).hostname.replace(/^www\./, '').includes('github.com')
  } catch {
    return false
  }
}
