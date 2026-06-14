/**
 * Portfolio grid from `resume.projects` — ledger-style tags, external links, optional Markdown modal.
 */
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CloseIcon from '@mui/icons-material/Close'
import LaunchIcon from '@mui/icons-material/Launch'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPortfolioMarkdown } from '../content/portfolioMarkdown'
import type { ProjectItem } from '../content/types'
import { design } from '../theme'
import { isGithubUrl } from '../utils/externalLinks'
import { publicAssetPath } from '../utils/publicUrl'

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
                      {project.demoUrl ?? project.githubUrl ? (
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
                          {project.demoUrl
                            ? 'View case study'
                            : project.githubUrl && isGithubUrl(project.githubUrl)
                              ? 'GitHub repository'
                              : 'Open link'}
                          {project.demoUrl ? <ArrowForwardIcon sx={{ fontSize: 18 }} /> : <LaunchIcon sx={{ fontSize: 18 }} />}
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

      <Dialog
        open={Boolean(detailModal && detailMarkdown)}
        onClose={() => setDetailOpenFor(null)}
        maxWidth="md"
        fullWidth
        scroll="paper"
        aria-labelledby="portfolio-detail-title"
        slotProps={{
          paper: {
            sx: {
              bgcolor: design.surfaceHigh,
              backgroundImage: 'none',
              border: design.ghostBorder,
              maxHeight: 'min(92vh, 880px)',
            },
          },
        }}
      >
        {detailModal && detailMarkdown ? (
          <>
            <DialogTitle
              id="portfolio-detail-title"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                pr: 1,
                borderBottom: design.ghostBorder,
                color: 'text.primary',
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '1.15rem',
              }}
            >
              {detailModal.title ?? detailProject?.name ?? 'Project'}
              <IconButton
                type="button"
                onClick={() => setDetailOpenFor(null)}
                aria-label="Close"
                sx={{ color: 'text.secondary' }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Box
                className="portfolio-markdown-paper"
                sx={{
                  bgcolor: '#f4f1eb',
                  color: '#1c1b19',
                  borderRadius: 1,
                  px: { xs: 2.5, sm: 3.5 },
                  py: { xs: 2.5, sm: 3.5 },
                  maxHeight: 'min(68vh, 640px)',
                  overflow: 'auto',
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.07)',
                  fontFamily: '"Georgia", "Times New Roman", serif',
                  fontSize: '1.0625rem',
                  lineHeight: 1.75,
                  '& h1': {
                    fontSize: '1.65rem',
                    fontWeight: 700,
                    fontFamily: 'inherit',
                    mt: 0,
                    mb: 2,
                    lineHeight: 1.25,
                  },
                  '& h2': {
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    fontFamily: 'inherit',
                    mt: 3,
                    mb: 1.25,
                    lineHeight: 1.3,
                  },
                  '& h3': {
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    fontFamily: 'inherit',
                    mt: 2.5,
                    mb: 1,
                  },
                  '& p': { mb: 2, mt: 0 },
                  '& ul, & ol': { pl: 2.5, mb: 2, mt: 0 },
                  '& li': { mb: 0.5 },
                  '& a': { color: '#0b57d0', textDecoration: 'underline', wordBreak: 'break-word' },
                  '& a:hover': { color: '#0842a0' },
                  '& code': {
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '0.88em',
                    bgcolor: 'rgba(0,0,0,0.07)',
                    px: 0.5,
                    borderRadius: 0.5,
                  },
                  '& pre': {
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '0.85em',
                    bgcolor: 'rgba(0,0,0,0.06)',
                    p: 2,
                    borderRadius: 1,
                    overflow: 'auto',
                    mb: 2,
                    lineHeight: 1.5,
                  },
                  '& pre code': { bgcolor: 'transparent', p: 0 },
                  '& blockquote': {
                    borderLeft: '4px solid rgba(0,0,0,0.15)',
                    pl: 2,
                    ml: 0,
                    mr: 0,
                    my: 2,
                    color: 'rgba(0,0,0,0.78)',
                  },
                  '& table': {
                    width: '100%',
                    borderCollapse: 'collapse',
                    mb: 2,
                    fontSize: '0.95em',
                  },
                  '& th, & td': {
                    border: '1px solid rgba(0,0,0,0.12)',
                    px: 1.5,
                    py: 1,
                    textAlign: 'left',
                  },
                  '& th': { bgcolor: 'rgba(0,0,0,0.04)', fontWeight: 700 },
                  '& hr': { border: 'none', borderTop: '1px solid rgba(0,0,0,0.12)', my: 3 },
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ href, children, ...props }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                        {children}
                      </a>
                    ),
                  }}
                >
                  {detailMarkdown}
                </ReactMarkdown>
              </Box>
            </DialogContent>
          </>
        ) : null}
      </Dialog>
    </Box>
  )
}
