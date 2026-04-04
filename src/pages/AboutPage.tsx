import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'
import { resume } from '../content'
import { SocialIconRow } from '../components/SocialIconRow'

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

export function AboutPage() {
  const data = resume
  const { basics, contact, summary } = data
  const [photoFailed, setPhotoFailed] = useState(false)
  const showPhoto = basics.photoSrc && !photoFailed

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: 0,
        py: { xs: 3, sm: 4 },
      }}
    >
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 0, sm: 2 } }}>
        <Grid
          container
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Left: beige panel + profile card */}
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{
              bgcolor: '#e8e4dc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: { xs: 4, md: 5 },
              px: { xs: 2, sm: 3 },
            }}
          >
            <Paper
              elevation={8}
              sx={{
                maxWidth: 300,
                width: '100%',
                px: 3,
                py: 4,
                textAlign: 'center',
                borderRadius: 2,
              }}
            >
              <Avatar
                alt=""
                src={showPhoto ? basics.photoSrc : undefined}
                imgProps={{
                  onError: () => {
                    setPhotoFailed(true)
                  },
                }}
                sx={{
                  width: 140,
                  height: 140,
                  mx: 'auto',
                  fontSize: '2.5rem',
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  color: 'primary.dark',
                  bgcolor: 'grey.100',
                  border: '4px solid',
                  borderColor: 'background.paper',
                  boxShadow: '0 4px 20px rgba(15,23,42,0.08)',
                }}
              >
                {!showPhoto ? initials(basics.name) : null}
              </Avatar>
              <Typography
                component="p"
                sx={{
                  mt: 2.5,
                  mb: 1.5,
                  fontSize: { xs: '1.75rem', sm: '2rem' },
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  color: 'text.primary',
                }}
              >
                {basics.name}
              </Typography>
              <Divider
                sx={{
                  borderColor: 'primary.main',
                  borderBottomWidth: 2,
                  maxWidth: 120,
                  mx: 'auto',
                  mb: 2,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: 'text.secondary',
                  display: 'block',
                  mb: 2,
                }}
              >
                {basics.title}
              </Typography>
              <SocialIconRow contact={contact} iconColor="dark" />
            </Paper>
          </Grid>

          {/* Right: intro + CTAs */}
          <Grid
            size={{ xs: 12, md: 7 }}
            sx={{
              bgcolor: 'background.paper',
              py: { xs: 4, md: 5 },
              px: { xs: 2.5, sm: 4, md: 6 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2.75rem', sm: '3.5rem' },
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'text.primary',
              }}
            >
              Hello
            </Typography>
            <Typography
              component="p"
              sx={{
                mt: 1.5,
                mb: 3,
                fontWeight: 700,
                fontSize: { xs: '1.125rem', sm: '1.25rem' },
                letterSpacing: '0.02em',
                color: 'text.primary',
              }}
            >
              Here&apos;s who I am &amp; what I do
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
              <Button component={RouterLink} to="/resume" variant="contained" size="large" sx={{ px: 3, fontWeight: 700 }}>
                Resume
              </Button>
              <Button
                component={RouterLink}
                to="/projects"
                variant="outlined"
                size="large"
                sx={{
                  px: 3,
                  fontWeight: 700,
                  borderColor: 'text.primary',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'text.primary',
                    bgcolor: 'rgba(15,23,42,0.04)',
                  },
                }}
              >
                Projects
              </Button>
            </Stack>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520 }}>
              {summary}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {basics.location}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
