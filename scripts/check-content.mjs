import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const resumePath = path.join(root, 'src/content/resume.json')
const resume = JSON.parse(readFileSync(resumePath, 'utf8'))
const errors = []

function publicFile(p, label) {
  if (!p || typeof p !== 'string' || !p.trim()) return
  const rel = p.replace(/^\/+/, '')
  const full = path.join(root, 'public', rel)
  if (!existsSync(full)) errors.push(`Missing ${label}: ${p}`)
}

publicFile(resume.basics?.photoSrc, 'basics.photoSrc')

for (const [i, job] of (resume.experience ?? []).entries()) {
  publicFile(job.logoSrc, `experience[${i}].logoSrc`)
}

for (const [i, edu] of (resume.education ?? []).entries()) {
  publicFile(edu.campusPhoto, `education[${i}].campusPhoto`)
}

for (const [i, project] of (resume.projects ?? []).entries()) {
  publicFile(project.imageSrc, `projects[${i}].imageSrc`)
  const slug = project.detailModal?.markdown?.trim()
  if (slug) {
    const md = path.join(root, 'src/content/portfolio', `${slug}.md`)
    if (!existsSync(md)) errors.push(`Missing projects[${i}].detailModal markdown: src/content/portfolio/${slug}.md`)
  }
}

if (errors.length) {
  console.error('Content path check failed:\n' + errors.join('\n'))
  process.exit(1)
}

console.log('Content paths OK')
