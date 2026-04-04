/**
 * Builds two-letter initials from a display name (first letter of first two words).
 * Used when no profile photo is available or the image fails to load.
 */
export function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
