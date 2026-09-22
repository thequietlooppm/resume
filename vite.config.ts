import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
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

/** Publish `src/content/resume.json` at the site root so other clients can fetch the same contract. */
function emitResumeJson(): Plugin {
  return {
    name: 'emit-resume-json',
    generateBundle() {
      const source = readFileSync(path.resolve('src/content/resume.json'), 'utf-8')
      this.emitFile({ type: 'asset', fileName: 'resume.json', source })
    },
  }
}

function withTrailingSlash(value: string): string {
  return value.endsWith('/') ? value : `${value}/`
}

function productionBase(): string {
  return withTrailingSlash(process.env.BASE_PATH || '/resume/')
}

function siteUrl(): string {
  return withTrailingSlash(process.env.SITE_URL || 'https://thequietlooppm.github.io/resume/')
}

function htmlSiteMeta(canonical: string, injectCsp: boolean): Plugin {
  const csp =
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'self'"
  return {
    name: 'html-site-meta',
    transformIndexHtml(html) {
      let next = html.replaceAll('__SITE_URL__', canonical)
      if (injectCsp) {
        next = next.replace(
          '<meta name="viewport"',
          `<meta http-equiv="Content-Security-Policy" content="${csp}" />\n    <meta name="viewport"`,
        )
      }
      return next
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
export default defineConfig(({ mode }) => {
  const canonical = siteUrl()
  return {
    plugins: [react(), portfolioMarkdownGlob(), emitResumeJson(), htmlSiteMeta(canonical, mode === 'production')],
    base: mode === 'production' ? productionBase() : '/',
    define: {
      __LAST_COMMIT_MONTH_YEAR__: JSON.stringify(lastCommitMonthYearForBuild()),
    },
  }
})
