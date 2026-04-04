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
}

export interface EducationItem {
  degree: string
  school: string
  schoolUrl?: string
  location: string
  start: string
  end: string
  details?: string
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
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: string[]
  projects: ProjectItem[]
}
