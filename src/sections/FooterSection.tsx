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
import { safeHref, safeMailto } from '../utils/safeUrl'
import { currentYear, lastCommitMonthYear } from '../utils/siteDates'

type Props = { data: Resume }

export function FooterSection({ data }: Props) {
  const { basics, contact, footer } = data
  const year = currentYear()
  const updated = lastCommitMonthYear()
  const emailHref = safeMailto(contact.email)
  const emailLower = contact.email ? contact.email.toLowerCase() : ''
  const linkedinHref = safeHref(contact.linkedin)
  const githubHref = safeHref(contact.github)

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
            {footer.headingPrefix}{' '}
            <Box component="span" sx={{ background: design.gradientCta, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {footer.headingAccent}
            </Box>
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520 }}>
            {footer.pitch}
          </Typography>
        </Stack>

        {emailHref ? (
          <Stack alignItems="center" sx={{ mb: 6 }}>
            <Button
              component="a"
              href={emailHref}
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
            {linkedinHref ? (
              <Link
                href={linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', fontWeight: 600 }}
              >
                <LinkedInIcon fontSize="small" /> LinkedIn
              </Link>
            ) : null}
            {githubHref ? (
              <Link
                href={githubHref}
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

        <Typography variant="caption" color="text.disabled" sx={{ display: 'block', textAlign: 'center', mt: 2.5 }}>
          Last updated {updated}
        </Typography>
      </Container>
    </Box>
  )
}
