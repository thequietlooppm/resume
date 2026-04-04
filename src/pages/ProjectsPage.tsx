import { PageSheet } from '../components/PageSheet'
import { ProjectsSection } from '../components/resumeSections'
import { resume } from '../content'

/** `/projects` — project list inside a shared `PageSheet` layout. */
export function ProjectsPage() {
  return (
    <PageSheet>
      <ProjectsSection data={resume} />
    </PageSheet>
  )
}
