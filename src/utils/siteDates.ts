/** Calendar year at runtime (for copyright). */
export function currentYear(): number {
  return new Date().getFullYear()
}

/** Month and year of the latest git commit, baked in at build time (see `vite.config.ts`). */
export function lastCommitMonthYear(): string {
  return __LAST_COMMIT_MONTH_YEAR__
}
