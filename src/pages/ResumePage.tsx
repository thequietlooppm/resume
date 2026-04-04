import { PageSheet } from '../components/PageSheet'
import { EducationSection, ExperienceSection, SkillsSection } from '../components/resumeSections'
import { resume } from '../content'

/** `/resume` — experience, education, and skills inside a shared `PageSheet` layout. */
export function ResumePage() {
  return (
    <PageSheet>
      <ExperienceSection data={resume} />
      <EducationSection data={resume} />
      <SkillsSection data={resume} />
    </PageSheet>
  )
}
