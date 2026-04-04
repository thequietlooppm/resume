import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Resume } from '../content/types'

type Props = { data: Resume }

function buildStamp() {
  return new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })
}

export function SiteFooter({ data }: Props) {
  const { basics, contact } = data
  const year = new Date().getFullYear()
  const updated = buildStamp()
  const emailLower = contact.email ? contact.email.toLowerCase() : ''

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'rgba(15, 23, 42, 0.08)',
        bgcolor: 'background.paper',
        py: { xs: 3, sm: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexWrap: 'wrap',
            alignItems: { xs: 'stretch', md: 'flex-start' },
            justifyContent: 'space-between',
            gap: { xs: 3, md: 2 },
          }}
        >
          {/* Left: copyright + build (left-aligned) */}
          <Stack
            spacing={1}
            sx={{
              textAlign: 'left',
              alignItems: 'flex-start',
              flex: { md: '0 1 auto' },
              minWidth: { md: 200 },
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8125rem' }}>
              © {year} {basics.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8125rem' }}>
              Built with React &amp; Vite {updated}
            </Typography>
          </Stack>

          {/* Flexible gap between left and right groups on desktop */}
          <Box
            sx={{
              flex: { md: '1 1 auto' },
              minWidth: { md: 24 },
              display: { xs: 'none', md: 'block' },
            }}
            aria-hidden
          />

          {/* Right cluster: Email (inner) then Follow (further right); each column centers label + content */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 3, sm: 4, md: 5 }}
            sx={{
              alignItems: { xs: 'stretch', sm: 'flex-start' },
              justifyContent: { xs: 'flex-start', sm: 'flex-end' },
              flex: { md: '0 0 auto' },
              width: { xs: '100%', md: 'auto' },
            }}
          >
            {/* Email: left of Follow on desktop; label + address centered in column */}
            <Stack
              spacing={1}
              sx={{
                alignItems: 'center',
                textAlign: 'center',
                minWidth: { sm: 180 },
                maxWidth: { xs: '100%', sm: 260 },
                mx: { xs: 'auto', sm: 0 },
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                Email
              </Typography>
              {contact.email ? (
                <Link
                  href={`mailto:${contact.email}`}
                  variant="body2"
                  color="text.primary"
                  sx={{
                    fontWeight: 600,
                    wordBreak: 'break-word',
                    textAlign: 'center',
                    display: 'block',
                    width: '100%',
                  }}
                >
                  {emailLower}
                </Link>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  Add <code>contact.email</code> in resume.json
                </Typography>
              )}
            </Stack>

            {/* Follow: furthest right; icons centered under label */}
            <Stack
              spacing={1}
              sx={{
                alignItems: 'center',
                textAlign: 'center',
                minWidth: { sm: 120 },
                mx: { xs: 'auto', sm: 0 },
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                Follow
              </Typography>
              <Stack direction="row" spacing={0.5} justifyContent="center" useFlexGap sx={{ width: '100%' }}>
                {contact.linkedin ? (
                  <IconButton
                    component="a"
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    size="small"
                    sx={{ color: 'text.primary' }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                ) : null}
                {contact.github ? (
                  <IconButton
                    component="a"
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    size="small"
                    sx={{ color: 'text.primary' }}
                  >
                    <GitHubIcon />
                  </IconButton>
                ) : (
                  <IconButton aria-label="GitHub (add URL in resume.json)" disabled size="small" sx={{ color: 'text.disabled' }}>
                    <GitHubIcon />
                  </IconButton>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
