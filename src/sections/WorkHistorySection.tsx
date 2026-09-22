/**
 * Work history grouped by employer (Meta, National Instruments, etc.) — tonal cards, no harsh dividers.
 */
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ExperienceItem } from '../content/types'
import { design } from '../theme'
import { publicAssetPath } from '../utils/publicUrl'
import { safeHref } from '../utils/safeUrl'

/**
 * Join `employerSummary` chunks for display; arrays are for editor-friendly JSON only.
 * Newlines inside strings are kept; the summary `Typography` uses `pre-line` so `\n` becomes a line break.
 */
function formatEmployerSummary(value: string | string[] | undefined): string | undefined {
  if (value == null) return undefined
  if (Array.isArray(value)) {
    const parts = value.map((s) => s.trim()).filter(Boolean)
    return parts.length ? parts.join(' ') : undefined
  }
  const t = value.trim()
  return t.length ? t : undefined
}

type EmployerGroup = {
  id: string
  label: string
  url?: string
  logoSrc?: string
  logoWidth?: number
  fullWidth: boolean
  sortOrder: number
  employerSummary?: string | string[]
  items: ExperienceItem[]
}

function groupExperience(jobs: ExperienceItem[]): EmployerGroup[] {
  const map = new Map<string, EmployerGroup>()
  let autoOrder = 0
  for (const job of jobs) {
    const id = job.employerId?.trim() || job.company
    const existing = map.get(id)
    if (!existing) {
      autoOrder += 1
      map.set(id, {
        id,
        label: job.employerLabel ?? job.company,
        url: job.companyUrl,
        logoSrc: job.logoSrc,
        logoWidth: job.logoWidth,
        fullWidth: Boolean(job.fullWidth),
        sortOrder: job.sortOrder ?? autoOrder + 100,
        employerSummary: job.employerSummary,
        items: [job],
      })
      continue
    }
    existing.items.push(job)
    existing.url = existing.url ?? job.companyUrl
    existing.logoSrc = existing.logoSrc ?? job.logoSrc
    existing.logoWidth = existing.logoWidth ?? job.logoWidth
    existing.fullWidth = existing.fullWidth || Boolean(job.fullWidth)
    if (job.employerLabel && existing.label === existing.items[0]?.company) {
      existing.label = job.employerLabel
    }
    existing.employerSummary = existing.employerSummary ?? job.employerSummary
    if (job.sortOrder != null) existing.sortOrder = Math.min(existing.sortOrder, job.sortOrder)
  }
  return [...map.values()].sort((a, b) => a.sortOrder - b.sortOrder)
}

/** Renders a highlight string, turning `[text](url)` tokens into clickable links. */
function HighlightText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (match) {
          const href = safeHref(match[2])
          if (!href) return <span key={i}>{match[1]}</span>
          return (
            <Link key={i} href={href} target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.light' }}>
              {match[1]}
            </Link>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

type Props = { experience: ExperienceItem[] }

export function WorkHistorySection({ experience }: Props) {
  const groups = groupExperience(experience)

  return (
    <Box
      id="experience"
      component="section"
      sx={{
        scrollMarginTop: 96,
        py: { xs: 8, md: 10 },
        bgcolor: design.surface,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <Typography variant="h2" component="h2" sx={{ display: 'inline', color: 'text.primary' }}>
            Work{' '}
          </Typography>
          <Typography variant="h2" component="span" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            History
          </Typography>
          <Box sx={{ mt: 1.5, width: 56, height: 3, borderRadius: 1, background: design.gradientCta }} />
        </Box>

        <Grid container spacing={3}>
          {groups.map((g) => {
            const logoUrl = g.logoSrc ? publicAssetPath(g.logoSrc) : null
            const summaryText = formatEmployerSummary(g.employerSummary)
            const companyHref = safeHref(g.url)
            return (
            <Grid key={g.id} size={{ xs: 12, md: g.fullWidth ? 12 : 6 }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  bgcolor: design.surfaceHigh,
                  border: design.ghostBorder,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ mb: 2 }}>
                    <Box>
                      {companyHref ? (
                        <Link href={companyHref} target="_blank" rel="noopener noreferrer" variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                          {g.label}
                        </Link>
                      ) : (
                        <Typography variant="h5" component="h3" sx={{ fontWeight: 700 }}>
                          {g.label}
                        </Typography>
                      )}
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {g.items[g.items.length - 1]?.start} — {g.items[0]?.end}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: design.surfaceLow,
                        border: design.ghostBorder,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      {logoUrl ? (
                        <Box
                          component="img"
                          src={logoUrl}
                          alt={`${g.label} logo`}
                          sx={{
                            width: g.logoWidth ?? 24,
                            height: 24,
                            objectFit: 'contain',
                            display: 'block',
                          }}
                        />
                      ) : null}
                    </Box>
                  </Stack>
                  {summaryText ? (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2.5, lineHeight: 1.65, whiteSpace: 'pre-line' }}
                    >
                      {summaryText}
                    </Typography>
                  ) : null}
                  <Stack spacing={2.5}>
                    {g.items.map((job) => (
                      <Box key={`${job.role}-${job.start}`}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.light' }}>
                          {job.role}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.75 }}>
                          {job.start} — {job.end} · {job.location}
                        </Typography>
                        {job.highlights && job.highlights.length > 0 ? (
                          <Stack component="ul" spacing={0.75} sx={{ m: 0, pl: 2, color: 'text.secondary' }}>
                            {job.highlights.map((h) => (
                              <Typography key={h} component="li" variant="body2">
                                <HighlightText text={h} />
                              </Typography>
                            ))}
                          </Stack>
                        ) : null}
                      </Box>
                    ))}
                  </Stack>
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
