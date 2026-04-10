/**
 * Portfolio grid from `resume.projects` — ledger-style tags, external links.
 */
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import LaunchIcon from '@mui/icons-material/Launch'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ProjectItem } from '../content/types'
import { design } from '../theme'
import { isGithubUrl } from '../utils/externalLinks'
import { publicAssetPath } from '../utils/publicUrl'

type Props = { projects: ProjectItem[] }

function normalizedTags(project: ProjectItem): string[] {
  return (project.tags ?? []).map((t) => t.trim()).filter(Boolean)
}

export function PortfolioSection({ projects }: Props) {
  return (
    <Box
      id="projects"
      component="section"
      sx={{
        scrollMarginTop: 96,
        py: { xs: 8, md: 10 },
        bgcolor: design.surface,
      }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h2" component="h2" sx={{ color: 'text.primary' }}>
              Portfolio
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 480 }}>
              Selected personal and professional projects.
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {projects.map((project) => {
            const tags = normalizedTags(project)
            return (
            <Grid key={project.name} size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: design.surfaceHigh,
                  border: design.ghostBorder,
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: design.ambientShadow,
                  },
                }}
              >
                {project.imageSrc ? (
                  <Box
                    component="img"
                    src={publicAssetPath(project.imageSrc)}
                    alt=""
                    sx={{
                      height: 140,
                      width: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      borderBottom: design.ghostBorder,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 140,
                      background: `linear-gradient(160deg, rgba(77,142,255,0.35), rgba(19,27,46,0.95)), ${design.surfaceLow}`,
                      borderBottom: design.ghostBorder,
                    }}
                  />
                )}
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 700, mb: tags.length > 0 ? 1 : 2 }}
                  >
                    {project.name}
                  </Typography>
                  {tags.length > 0 ? (
                    <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mb: 2 }}>
                      {tags.map((t) => (
                        <Chip
                          key={t}
                          label={t}
                          size="small"
                          sx={{
                            fontFamily: 'ui-monospace, monospace',
                            fontSize: '0.65rem',
                            letterSpacing: '0.08em',
                            bgcolor: 'rgba(138, 180, 255, 0.12)',
                            color: 'primary.light',
                            border: 'none',
                          }}
                        />
                      ))}
                    </Stack>
                  ) : null}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                    {project.description}
                  </Typography>
                  <Link
                    href={project.demoUrl ?? project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontWeight: 600,
                      color: 'primary.main',
                    }}
                  >
                    {project.demoUrl ? 'View case study' : isGithubUrl(project.githubUrl) ? 'GitHub repository' : 'Open link'}
                    {project.demoUrl ? <ArrowForwardIcon sx={{ fontSize: 18 }} /> : <LaunchIcon sx={{ fontSize: 18 }} />}
                  </Link>
                </CardContent>
              </Card>
            </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}
