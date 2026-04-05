import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Month + year of latest git commit (footer); falls back to today if git is unavailable. */
function lastCommitMonthYearForBuild(): string {
  try {
    const iso = execSync('git log -1 --format=%cI', {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) {
      return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())
    }
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(d)
  } catch {
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())
  }
}

// https://vite.dev/config/
// GitHub Pages project site: https://<user>.github.io/<repo>/
// Production builds must use base: '/<repo>/' so JS/CSS load from the subpath.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/resume/' : '/',
  define: {
    __LAST_COMMIT_MONTH_YEAR__: JSON.stringify(lastCommitMonthYearForBuild()),
  },
}))
