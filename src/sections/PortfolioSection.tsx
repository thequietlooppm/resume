/**
 * Portfolio grid from `resume.projects` — ledger-style tags, external links, optional Markdown modal.
 */
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import LaunchIcon from '@mui/icons-material/Launch'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Suspense, lazy, useState } from 'react'
import { getPortfolioMarkdown } from '../content/portfolioMarkdown'
import type { ProjectItem } from '../content/types'
import { design } from '../theme'
import { isGithubUrl } from '../utils/externalLinks'
import { publicAssetPath } from '../utils/publicUrl'
import { safeHref } from '../utils/safeUrl'

/** Markdown dialog is code-split and only mounted once a write-up is requested,
 *  so `react-markdown` stays off the wire until then. */
const PortfolioDetailDialog = lazy(() => import('./PortfolioDetailDialog'))

type Props = { projects: ProjectItem[] }

function normalizedTags(project: ProjectItem): string[] {
  return (project.tags ?? []).map((t) => t.trim()).filter(Boolean)
}

function detailMarkdownFor(project: ProjectItem): string | undefined {
  const slug = project.detailModal?.markdown?.trim()
  if (!slug) return undefined
  const raw = getPortfolioMarkdown(slug)
  return raw?.trim() || undefined
}

export function PortfolioSection({ projects }: Props) {
  const [detailOpenFor, setDetailOpenFor] = useState<string | null>(null)
  const detailProject = detailOpenFor ? projects.find((p) => p.name === detailOpenFor) : undefined
  const detailModal = detailProject?.detailModal
  const detailMarkdown = detailProject ? detailMarkdownFor(detailProject) : undefined

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
            const md = detailMarkdownFor(project)
            const hasDetail = Boolean(project.detailModal && md)
            const demoHref = safeHref(project.demoUrl)
            const githubHref = safeHref(project.githubUrl)
            const projectHref = demoHref ?? githubHref
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
                      alt={project.name}
                      loading="lazy"
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
                    <Stack spacing={1.25} sx={{ mt: 'auto' }}>
                      {hasDetail ? (
                        <Button
                          type="button"
                          variant="outlined"
                          size="small"
                          startIcon={<MenuBookIcon sx={{ fontSize: 18 }} />}
                          onClick={() => setDetailOpenFor(project.name)}
                          sx={{
                            alignSelf: 'flex-start',
                            borderColor: 'rgba(173, 198, 255, 0.35)',
                            color: 'primary.light',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                              borderColor: 'primary.main',
                              bgcolor: 'rgba(173, 198, 255, 0.06)',
                            },
                          }}
                        >
                          {project.detailModal?.openLabel ?? 'Full write-up'}
                        </Button>
                      ) : null}
                      {projectHref ? (
                        <Link
                          href={projectHref}
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
                          {demoHref
                            ? 'View case study'
                            : githubHref && isGithubUrl(githubHref)
                              ? 'GitHub repository'
                              : 'Open link'}
                          {demoHref ? <ArrowForwardIcon sx={{ fontSize: 18 }} /> : <LaunchIcon sx={{ fontSize: 18 }} />}
                        </Link>
                      ) : null}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>

      {detailOpenFor ? (
        <Suspense
          fallback={
            <Box role="status" sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress aria-label="Loading write-up" />
            </Box>
          }
        >
          <PortfolioDetailDialog
            open={Boolean(detailModal && detailMarkdown)}
            title={detailModal?.title ?? detailProject?.name ?? 'Project'}
            markdown={detailMarkdown}
            onClose={() => setDetailOpenFor(null)}
          />
        </Suspense>
      ) : null}
    </Box>
  )
}
