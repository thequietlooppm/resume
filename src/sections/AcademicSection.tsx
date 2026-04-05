/**
 * Education cards with optional campus photography, dark scrim, and tonal fallback.
 */
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import SchoolIcon from '@mui/icons-material/School'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import type { EducationItem } from '../content/types'
import { design } from '../theme'
import { publicAssetPath } from '../utils/publicUrl'

type Props = { education: EducationItem[] }

function educationAccentIcon(school: string) {
  const s = school.toLowerCase()
  if (s.includes('wisconsin')) return PrecisionManufacturingIcon
  if (s.includes('texas') && s.includes('austin')) return BusinessCenterIcon
  return SchoolIcon
}

/** Default campus images under `public/images/`. */
function defaultCampusPhotoPath(school: string): string | null {
  const s = school.toLowerCase()
  if (s.includes('wisconsin')) return '/images/uw-madison-campus.png'
  if (s.includes('texas') && s.includes('austin')) return '/images/ut-austin-campus.png'
  return null
}

function resolveCampusPhoto(edu: EducationItem): string | null {
  const path = edu.campusPhoto ?? defaultCampusPhotoPath(edu.school)
  return path ? publicAssetPath(path) : null
}

function cardBackgroundFallback(index: number): string {
  const hues = [
    'linear-gradient(135deg, rgba(77, 142, 255, 0.35) 0%, rgba(11, 19, 38, 0.92) 55%), ',
    'linear-gradient(135deg, rgba(173, 198, 255, 0.25) 0%, rgba(11, 19, 38, 0.92) 60%), ',
  ]
  return `${hues[index % hues.length]}linear-gradient(180deg, ${design.surfaceHigh} 0%, ${design.surfaceLow} 100%)`
}

const textShadow = '0 2px 20px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.9)'

/** Heavier at bottom: text sits low on busy roof/sky photos. */
const scrim =
  'linear-gradient(180deg, rgba(8, 12, 22, 0.12) 0%, rgba(11, 19, 38, 0.5) 45%, rgba(11, 19, 38, 0.92) 78%, rgba(6, 10, 18, 0.97) 100%)'

type CardProps = { edu: EducationItem; index: number }

function EducationCard({ edu, index }: CardProps) {
  const rawPhoto = resolveCampusPhoto(edu)
  const [photoFailed, setPhotoFailed] = useState(false)
  const showPhoto = Boolean(rawPhoto && !photoFailed)
  const isWisconsin = edu.school.toLowerCase().includes('wisconsin')
  const isUtAustin =
    edu.school.toLowerCase().includes('texas') && edu.school.toLowerCase().includes('austin')
  const AccentIcon = educationAccentIcon(edu.school)

  return (
    <Card
      elevation={0}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 300, md: 340 },
        border: design.ghostBorder,
        bgcolor: design.surfaceHigh,
      }}
    >
      {rawPhoto ? (
        <Box
          component="img"
          alt=""
          src={rawPhoto}
          onError={() => setPhotoFailed(true)}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: isWisconsin ? 'center 28%' : isUtAustin ? 'center 35%' : 'center center',
            zIndex: 0,
          }}
        />
      ) : null}

      <CardContent
        sx={{
          position: 'relative',
          zIndex: 1,
          p: { xs: 2.5, sm: 3 },
          pt: { xs: 6, sm: 8 },
          minHeight: { xs: 300, md: 340 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          boxSizing: 'border-box',
          background: showPhoto ? scrim : cardBackgroundFallback(index),
          backdropFilter: showPhoto ? undefined : 'blur(10px)',
        }}
      >
        <Box>
          <AccentIcon
            sx={{
              color: 'primary.light',
              mb: 1.25,
              fontSize: 32,
              filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.85))',
            }}
          />
          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontWeight: 700,
              mb: 0.5,
              color: 'text.primary',
              textShadow,
            }}
          >
            {edu.schoolUrl ? (
              <Link
                href={edu.schoolUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                sx={{ fontWeight: 700, textShadow }}
              >
                {edu.school}
              </Link>
            ) : (
              edu.school
            )}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 600,
              color: 'primary.light',
              textShadow,
            }}
          >
            {edu.degree}
          </Typography>
          <Typography variant="body2" sx={{ mb: edu.details ? 0.75 : 0, color: 'rgba(232, 234, 237, 0.92)', textShadow }}>
            {edu.start} — {edu.end} · {edu.location}
          </Typography>
          {edu.details ? (
            <Typography variant="body2" sx={{ color: 'rgba(232, 234, 237, 0.88)', textShadow }}>
              {edu.details}
            </Typography>
          ) : null}
        </Box>
      </CardContent>
    </Card>
  )
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
              <EducationCard edu={edu} index={i} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
