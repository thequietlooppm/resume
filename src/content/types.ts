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

export interface AboutPillar {
  title: string
  body: string
  /** Maps to a small icon in AboutSection (`engineering` | `business`). */
  icon?: 'engineering' | 'business'
}

export interface AboutSectionContent {
  badge: string
  heading: string
  pillars: AboutPillar[]
}

export interface FooterContent {
  headingPrefix: string
  headingAccent: string
  pitch: string
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
   * Groups roles onto one employer card. Jobs that share an id (e.g. Meta and Facebook)
   * render together. Defaults to `company` when omitted.
   */
  employerId?: string
  /** Card heading. Defaults to `company`. Set on any row; the first occurrence wins. */
  employerLabel?: string
  /** Path under `public/`, e.g. `/images/logos/meta.svg`. First occurrence wins. */
  logoSrc?: string
  logoWidth?: number
  /** Full-width card on md+. First occurrence wins. */
  fullWidth?: boolean
  /** Lower numbers first among employer cards. First occurrence wins. */
  sortOrder?: number
  /**
   * Shown once at the top of this employer’s card, above the first role title.
   * Put it on any row for that company; the first occurrence in `resume.json` wins.
   * Use a string array to break long copy across multiple JSON lines; parts are joined with spaces for display.
   * Literal newlines (`\\n` in JSON) are preserved and render as line breaks.
   */
  employerSummary?: string | string[]
}

export type EducationAccent = 'engineering' | 'business' | 'school'

export interface EducationItem {
  degree: string
  school: string
  schoolUrl?: string
  location: string
  start: string
  end: string
  details?: string
  /** Optional `public/` path, e.g. `/images/ut-austin-campus.png`. */
  campusPhoto?: string
  /** CSS `object-position` for the campus photo, e.g. `center 35%`. */
  objectPosition?: string
  accent?: EducationAccent
}

/** Long-form in-page reader (white-paper style) for a portfolio project. */
export interface ProjectDetailModal {
  /** Modal header; defaults to the project `name`. */
  title?: string
  /**
   * Slug for `src/content/portfolio/{markdown}.md` (no extension). Content is Markdown (GFM).
   */
  markdown: string
  /** Card control label; default `Full write-up`. */
  openLabel?: string
}

export interface ProjectItem {
  name: string
  description: string
  /** Omit when the card only opens a `detailModal` write-up. */
  githubUrl?: string
  demoUrl?: string
  /** Path under `public/`, e.g. `/images/projects/sbrio.png`. Omit for the default gradient strip. */
  imageSrc?: string
  /** Chip “pills” on the card. Omit or use [] to hide the tag row. */
  tags?: string[]
  /** When set (and the `.md` file exists), opens a Markdown modal from `src/content/portfolio/`. */
  detailModal?: ProjectDetailModal
}

export interface Resume {
  /** Bump when the JSON shape changes so other clients can detect incompatibility. */
  contentVersion: string
  basics: Basics
  contact: Contact
  summary: string
  about: string
  aboutSection: AboutSectionContent
  footer: FooterContent
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: string[]
  projects: ProjectItem[]
}
