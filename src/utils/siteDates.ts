/** Calendar year at runtime (for copyright). */
export function currentYear(): number {
  return new Date().getFullYear()
}

/**
 * Long month + year for the footer “Built with …” line, e.g. “April 2026”.
 * Reflects the visitor’s current calendar month when the page renders.
 */
export function formatFooterMonthYear(): string {
  return new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })
}
