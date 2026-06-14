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

/** `public/images/logos/*` — add SVGs for other employers as needed. */
function employerLogo(label: string): { path: string; imgWidth: number } | null {
  if (label === 'Meta') return { path: '/images/logos/meta.svg', imgWidth: 24 }
  if (label === 'National Instruments') return { path: '/images/logos/national-instruments.svg', imgWidth: 30 }
  if (label === 'Division of Information Technology') return { path: '/images/logos/uw-madison.png', imgWidth: 28 }
  return null
}

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

function companyKey(company: string): string {
  const c = company.toLowerCase()
  if (c.includes('meta') || c.includes('facebook')) return 'Meta'
  if (c.includes('national instruments')) return 'National Instruments'
  return company
}

/** Meta spans full row on md+; other employers pair as half-width cards. */
function workCardGridSize(label: string): { xs: number; md: number } {
  return label === 'Meta' ? { xs: 12, md: 12 } : { xs: 12, md: 6 }
}

function groupExperience(jobs: ExperienceItem[]): {
  label: string
  url?: string
  employerSummary?: string | string[]
  items: ExperienceItem[]
}[] {
  const map = new Map<string, { url?: string; employerSummary?: string | string[]; items: ExperienceItem[] }>()
  for (const job of jobs) {
    const label = companyKey(job.company)
    const existing = map.get(label)
    const url = job.companyUrl ?? existing?.url
    const items = existing ? [...existing.items, job] : [job]
    const employerSummary = existing?.employerSummary ?? job.employerSummary
    map.set(label, { url, items, employerSummary })
  }
  const order = ['Meta', 'National Instruments']
  const rest = [...map.keys()].filter((k) => !order.includes(k))
  const keys = [...order.filter((k) => map.has(k)), ...rest.filter((k) => map.has(k))]
  return keys.map((label) => ({
    label,
    url: map.get(label)!.url,
    employerSummary: map.get(label)!.employerSummary,
    items: map.get(label)!.items,
  }))
}

/** Renders a highlight string, turning `[text](url)` tokens into clickable links. */
function HighlightText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (match) {
          return (
            <Link key={i} href={match[2]} target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.light' }}>
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
            const logo = employerLogo(g.label)
            const logoUrl = logo ? publicAssetPath(logo.path) : null
            const summaryText = formatEmployerSummary(g.employerSummary)
            return (
            <Grid key={g.label} size={workCardGridSize(g.label)}>
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
                      {g.url ? (
                        <Link href={g.url} target="_blank" rel="noopener noreferrer" variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
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
                          alt=""
                          sx={{
                            width: logo?.imgWidth ?? 24,
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
