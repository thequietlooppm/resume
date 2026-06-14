import { execSync } from 'node:child_process'
import path from 'node:path'
import { defineConfig, normalizePath, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** Re-evaluate `import.meta.glob('./portfolio/*.md')` when portfolio files change. */
function portfolioMarkdownGlob(): Plugin {
  const portfolioMarkdownId = normalizePath(path.resolve('src/content/portfolioMarkdown.ts'))

  return {
    name: 'portfolio-markdown-glob',
    configureServer(server) {
      const invalidate = (file: string) => {
        if (!file.endsWith('.md') || !file.includes(`${path.sep}portfolio${path.sep}`)) return
        const mod = server.moduleGraph.getModuleById(portfolioMarkdownId)
        if (mod) server.moduleGraph.invalidateModule(mod)
      }

      server.watcher.on('add', invalidate)
      server.watcher.on('unlink', invalidate)
    },
  }
}

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
  plugins: [react(), portfolioMarkdownGlob()],
  base: mode === 'production' ? '/resume/' : '/',
  define: {
    __LAST_COMMIT_MONTH_YEAR__: JSON.stringify(lastCommitMonthYearForBuild()),
  },
}))
