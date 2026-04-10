/**
 * TypeScript shape for `src/content/resume.json`. Edit the JSON for all site text/links;
 * keep fields aligned with these interfaces so `tsc` catches mistakes.
 */
export interface Basics {
  name: string
  title: string
  location: string
  /** Path under public/, e.g. `/images/headshot.jpg`. Omit or empty to show initials. */
  photoSrc?: string
}

export interface Contact {
  email?: string
  phone?: string
  linkedin?: string
  github?: string
}

export interface ExperienceItem {
  role: string
  company: string
  companyUrl?: string
  location: string
  start: string
  end: string
  highlights?: string[]
  /**
   * Shown once at the top of this employer’s card, above the first role title.
   * Put it on any row for that company; the first occurrence in `resume.json` wins.
   * Use a string array to break long copy across multiple JSON lines; parts are joined with spaces for display.
   * Literal newlines (`\\n` in JSON) are preserved and render as line breaks.
   */
  employerSummary?: string | string[]
}

export interface EducationItem {
  degree: string
  school: string
  schoolUrl?: string
  location: string
  start: string
  end: string
  details?: string
  /** Optional `public/` path, e.g. `/images/ut-austin-campus.png` (overrides name-based default). */
  campusPhoto?: string
}

export interface ProjectItem {
  name: string
  description: string
  githubUrl: string
  demoUrl?: string
}

export interface Resume {
  basics: Basics
  contact: Contact
  summary: string
  about: string
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: string[]
  projects: ProjectItem[]
}
