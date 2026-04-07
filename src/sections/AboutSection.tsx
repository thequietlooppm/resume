/**
 * About: photo + Meta badge, editorial copy, Engineering / Strategy pillar cards.
 */
import CodeIcon from '@mui/icons-material/Code'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import type { Resume } from '../content/types'
import { design } from '../theme'
import { initialsFromName } from '../utils/initials'
import { publicAssetPath } from '../utils/publicUrl'

type Props = { data: Resume }

/** Split summary into two paragraphs on sentence boundaries when possible. */
function splitSummary(text: string): [string, string] {
  const mid = Math.floor(text.length / 2)
  const dot = text.lastIndexOf('. ', mid)
  if (dot > 40) {
    return [text.slice(0, dot + 1).trim(), text.slice(dot + 1).trim()]
  }
  const first = text.slice(0, mid)
  const rest = text.slice(mid)
  return [first.trim(), rest.trim()]
}

export function AboutSection({ data }: Props) {
  const { basics, about } = data
  const [photoFailed, setPhotoFailed] = useState(false)
  const showPhoto = basics.photoSrc && !photoFailed
  const photoUrl = basics.photoSrc ? publicAssetPath(basics.photoSrc) : undefined
  const [p1, p2] = splitSummary(about)

  return (
    <Box
      id="about"
      component="section"
      sx={{
        scrollMarginTop: 96,
        py: { xs: 8, md: 10 },
        bgcolor: design.surfaceLow,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: 'relative', maxWidth: 400, mx: { xs: 'auto', md: 0 } }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1',
                  maxHeight: 420,
                  borderRadius: 3,
                  overflow: 'hidden',
                  bgcolor: design.surfaceHigh,
                  border: design.ghostBorder,
                }}
              >
                {showPhoto && photoUrl ? (
                  <Box
                    component="img"
                    alt=""
                    src={photoUrl}
                    onError={() => setPhotoFailed(true)}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'grayscale(0.12) contrast(1.03)',
                    }}
                  />
                ) : (
                  <Stack alignItems="center" justifyContent="center" sx={{ height: '100%', minHeight: 280 }}>
                    <Typography
                      sx={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontWeight: 700,
                        fontSize: '4rem',
                        color: 'text.secondary',
                      }}
                    >
                      {initialsFromName(basics.name)}
                    </Typography>
                  </Stack>
                )}
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  left: 12,
                  right: 12,
                  py: 1,
                  px: 1.5,
                  borderRadius: 2,
                  bgcolor: 'rgba(11, 19, 38, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: design.ghostBorder,
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: '0.06em' }}>
                  Currently · Meta Central Integrity TPM
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: '0.14em', fontWeight: 700 }}>
              About
            </Typography>
            <Typography variant="h2" component="h2" sx={{ mt: 1, mb: 3, color: 'text.primary' }}>
              My Blend of TPM
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {p1}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {p2}
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Card
                  elevation={0}
                  sx={{
                    bgcolor: design.surfaceHigh,
                    border: design.ghostBorder,
                    backdropFilter: 'blur(10px)',
                    height: '100%',
                  }}
                >
                  <CardContent>
                    <CodeIcon sx={{ color: 'primary.main', mb: 1 }} />
                    <Typography variant="h4" component="h3" sx={{ mb: 0.5 }}>
                      Engineering
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Engineering-rooted TPM adept at technical deep dives alongside software engineers, data engineers, and data scientists.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Card
                  elevation={0}
                  sx={{
                    bgcolor: design.surfaceHigh,
                    border: design.ghostBorder,
                    backdropFilter: 'blur(10px)',
                    height: '100%',
                  }}
                >
                  <CardContent>
                    <TrendingUpIcon sx={{ color: 'primary.main', mb: 1 }} />
                    <Typography variant="h4" component="h3" sx={{ mb: 0.5 }}>
                      Business
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Business-minded TPM bridging the gap between technical and non-technical partners to deliver high-quality technical solutions that meet critical company objectives.                    
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
