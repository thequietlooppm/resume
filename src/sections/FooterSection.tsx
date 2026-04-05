/**
 * Final CTA, email pill, copyright, LinkedIn + GitHub (icon + text).
 */
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Resume } from '../content/types'
import { design } from '../theme'
import { currentYear } from '../utils/siteDates'

type Props = { data: Resume }

export function FooterSection({ data }: Props) {
  const { basics, contact } = data
  const year = currentYear()
  const emailLower = contact.email ? contact.email.toLowerCase() : ''

  return (
    <Box
      id="contact"
      component="footer"
      sx={{
        scrollMarginTop: 96,
        pt: { xs: 10, md: 12 },
        pb: 4,
        bgcolor: design.surfaceLow,
        borderTop: design.ghostBorder,
      }}
    >
      <Container maxWidth="lg">
        <Stack alignItems="center" textAlign="center" sx={{ mb: 5 }}>
          <Typography
            variant="h2"
            component="p"
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            Ready for the{' '}
            <Box component="span" sx={{ background: design.gradientCta, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Next Challenge!
            </Box>
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520 }}>
            While I have most of my experience in the integrity space, my passion is solving hard problems alongside briliant people. Open to any roles in the Techincal Program or Product Management space!  — let&apos;s connect.
          </Typography>
        </Stack>

        {contact.email ? (
          <Stack alignItems="center" sx={{ mb: 6 }}>
            <Button
              component="a"
              href={`mailto:${contact.email}`}
              variant="outlined"
              size="large"
              sx={{
                borderRadius: 999,
                px: 4,
                py: 1.5,
                borderColor: 'rgba(232, 234, 237, 0.35)',
                color: 'text.primary',
                fontSize: '1rem',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(173, 198, 255, 0.06)',
                },
              }}
            >
              {emailLower}
            </Button>
          </Stack>
        ) : null}

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ pt: 3, borderTop: design.ghostBorder }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: '0.06em' }}>
            © {year} {basics.name.toUpperCase()}. ALL RIGHTS RESERVED.
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            {contact.linkedin ? (
              <Link
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', fontWeight: 600 }}
              >
                <LinkedInIcon fontSize="small" /> LinkedIn
              </Link>
            ) : null}
            {contact.github ? (
              <Link
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', fontWeight: 600 }}
              >
                <GitHubIcon fontSize="small" /> GitHub
              </Link>
            ) : (
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: 'text.disabled' }}>
                <IconButton size="small" disabled aria-label="GitHub">
                  <GitHubIcon fontSize="small" />
                </IconButton>
                <Typography variant="caption">GitHub</Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
