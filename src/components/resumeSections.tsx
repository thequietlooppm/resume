/**
 * Resume content blocks used on `/resume` and `/projects`. Each wraps `CvSection`
 * and maps arrays from the typed `Resume` model into MUI layout.
 */
import LaunchIcon from '@mui/icons-material/Launch'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Resume } from '../content/types'
import { isGithubUrl } from '../utils/externalLinks'
import { CvSection } from './CvSection'

type Props = { data: Resume }

const sectionDivider = <Divider flexItem sx={{ opacity: 0.7 }} />

const projectLinkSx = {
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  gap: 0.5,
  fontWeight: 600,
  color: 'primary.dark',
  py: 0.5,
}

/** Work history with optional company links and bullet highlights. */
export function ExperienceSection({ data }: Props) {
  return (
    <CvSection title="Experience" id="experience">
      <Stack spacing={2.75} divider={sectionDivider}>
        {data.experience.map((job) => (
          <Box key={`${job.company}-${job.role}-${job.start}`}>
            <Typography variant="h3" component="h3" sx={{ color: 'text.primary' }}>
              {job.role}
              {job.company ? (
                <>
                  <Typography component="span" variant="h3" sx={{ fontWeight: 400, color: 'text.secondary' }}>
                    {' '}
                    ·{' '}
                  </Typography>
                  {job.companyUrl ? (
                    <Link
                      href={job.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontWeight: 700,
                        fontSize: 'inherit',
                        color: 'primary.dark',
                      }}
                    >
                      {job.company}
                    </Link>
                  ) : (
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      {job.company}
                    </Box>
                  )}
                </>
              ) : null}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
              {job.start} — {job.end} · {job.location}
            </Typography>
            {job.highlights && job.highlights.length > 0 ? (
              <Box
                component="ul"
                sx={{
                  m: 0,
                  mt: 1.25,
                  pl: 2.25,
                  color: 'text.secondary',
                }}
              >
                {job.highlights.map((h) => (
                  <Typography key={h} component="li" variant="body2" sx={{ mb: 0.5 }}>
                    {h}
                  </Typography>
                ))}
              </Box>
            ) : null}
          </Box>
        ))}
      </Stack>
    </CvSection>
  )
}

/** Degrees and schools with optional school links. */
export function EducationSection({ data }: Props) {
  return (
    <CvSection title="Education" id="education">
      <Stack spacing={2.5} divider={sectionDivider}>
        {data.education.map((edu) => (
          <Box key={`${edu.school}-${edu.degree}`}>
            <Typography variant="h3" component="h3">
              {edu.schoolUrl ? (
                <Link
                  href={edu.schoolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ fontWeight: 700, fontSize: 'inherit', color: 'primary.dark' }}
                >
                  {edu.school}
                </Link>
              ) : (
                edu.school
              )}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.75, fontWeight: 500 }}>
              {edu.degree}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.35 }}>
              {edu.start} — {edu.end} · {edu.location}
            </Typography>
            {edu.details ? (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {edu.details}
              </Typography>
            ) : null}
          </Box>
        ))}
      </Stack>
    </CvSection>
  )
}

/** Skill tags from `resume.skills`. */
export function SkillsSection({ data }: Props) {
  return (
    <CvSection title="Skills" id="skills">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.25,
        }}
      >
        {data.skills.map((skill) => (
          <Box
            key={skill}
            component="span"
            sx={{
              display: 'inline-block',
              px: 1.75,
              py: 0.75,
              borderRadius: 10,
              bgcolor: 'rgba(37, 99, 235, 0.08)',
              color: 'primary.dark',
              typography: 'body2',
              fontWeight: 600,
              border: '1px solid',
              borderColor: 'rgba(37, 99, 235, 0.15)',
            }}
          >
            {skill}
          </Box>
        ))}
      </Box>
    </CvSection>
  )
}

/** Project blurbs with primary and optional demo links. */
export function ProjectsSection({ data }: Props) {
  return (
    <CvSection title="Projects" id="projects">
      <Stack spacing={2.75} divider={sectionDivider}>
        {data.projects.map((project) => (
          <Box key={project.name}>
            <Typography variant="h3" component="h3">
              {project.name}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              {project.description}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.5} useFlexGap sx={{ mt: 1.5 }}>
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="body2"
                sx={projectLinkSx}
              >
                {isGithubUrl(project.githubUrl) ? 'Repository' : 'Link'}
                <LaunchIcon sx={{ fontSize: 18 }} aria-hidden />
              </Link>
              {project.demoUrl ? (
                <Link
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                  sx={projectLinkSx}
                >
                  Demo / article
                  <LaunchIcon sx={{ fontSize: 18 }} aria-hidden />
                </Link>
              ) : null}
            </Stack>
          </Box>
        ))}
      </Stack>
    </CvSection>
  )
}
