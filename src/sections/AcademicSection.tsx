/**
 * Education as two wide “foundation” cards with tonal overlays (DESIGN.md — no harsh photo borders).
 */
import SchoolIcon from '@mui/icons-material/School'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { EducationItem } from '../content/types'
import { design } from '../theme'

type Props = { education: EducationItem[] }

function cardBackground(index: number): string {
  const hues = [
    'linear-gradient(135deg, rgba(77, 142, 255, 0.35) 0%, rgba(11, 19, 38, 0.92) 55%), ',
    'linear-gradient(135deg, rgba(173, 198, 255, 0.25) 0%, rgba(11, 19, 38, 0.92) 60%), ',
  ]
  return `${hues[index % hues.length]}linear-gradient(180deg, ${design.surfaceHigh} 0%, ${design.surfaceLow} 100%)`
}

export function AcademicSection({ education }: Props) {
  return (
    <Box
      id="education"
      component="section"
      sx={{
        scrollMarginTop: 96,
        py: { xs: 8, md: 10 },
        bgcolor: design.surfaceLow,
      }}
    >
      <Container maxWidth="lg">
        <Stack alignItems="center" textAlign="center" sx={{ mb: 5 }}>
          <Typography variant="h2" component="h2" sx={{ color: 'text.primary' }}>
            Academic Foundations
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 520 }}>
            Formal training that bridges silicon, software, and business execution.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {education.map((edu, i) => (
            <Grid key={`${edu.school}-${edu.degree}`} size={{ xs: 12, md: 6 }}>
              <Card
                elevation={0}
                sx={{
                  minHeight: 220,
                  border: design.ghostBorder,
                  background: cardBackground(i),
                  backdropFilter: 'blur(10px)',
                }}
              >
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <SchoolIcon sx={{ color: 'primary.main', mb: 1.5 }} />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {edu.schoolUrl ? (
                      <Link href={edu.schoolUrl} target="_blank" rel="noopener noreferrer" color="inherit" sx={{ fontWeight: 700 }}>
                        {edu.school}
                      </Link>
                    ) : (
                      edu.school
                    )}
                  </Typography>
                  <Typography variant="subtitle1" color="primary.light" sx={{ mb: 1.5, fontWeight: 600 }}>
                    {edu.degree}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {edu.start} — {edu.end} · {edu.location}
                  </Typography>
                  {edu.details ? (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
                      {edu.details}
                    </Typography>
                  ) : null}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
