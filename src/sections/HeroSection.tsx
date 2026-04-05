/**
 * Hero: display name, gradient title line, summary teaser, CTAs + GitHub affordance.
 */
import GitHubIcon from '@mui/icons-material/GitHub'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import type { Resume } from '../content/types'
import { design } from '../theme'

type Props = { data: Resume }

export function HeroSection({ data }: Props) {
  const { basics, contact, summary } = data
  const teaser =
    summary.length > 220 ? `${summary.slice(0, 217).trim()}…` : summary

  return (
    <Box
      id="hero"
      component="section"
      sx={{
        scrollMarginTop: 96,
        pt: { xs: 6, md: 10 },
        pb: { xs: 8, md: 12 },
        background: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(77, 142, 255, 0.18), transparent 55%), ${design.surface}`,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h1"
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            mb: 2,
          }}
        >
          <Box component="span" sx={{ color: 'text.primary' }}>
            {basics.name}
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', mx: 1 }}>
            /
          </Box>
          <Box
            component="span"
            sx={{
              background: design.gradientCta,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {basics.title}
          </Box>
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 640, mb: 4, fontSize: { xs: '1.05rem', md: '1.125rem' } }}
        >
          {teaser}
        </Typography>

        <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
          <Button
            component="a"
            href={contact.email ? `mailto:${contact.email}` : '#contact'}
            variant="contained"
            size="large"
            sx={{
              background: design.gradientCta,
              color: design.onPrimary,
              borderRadius: 999,
              px: 3,
              py: 1.25,
              boxShadow: 'none',
              '&:hover': {
                background: design.gradientCta,
                boxShadow: design.ambientShadow,
              },
            }}
          >
            Contact Me
          </Button>
          <Link href="#contact" variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
            Contact section →
          </Link>
          {contact.github ? (
            <Tooltip title="GitHub">
              <IconButton
                component="a"
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{ color: 'text.primary', border: design.ghostBorder, borderRadius: 2 }}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Add GitHub URL in resume.json">
              <span>
                <IconButton disabled aria-label="GitHub" sx={{ border: design.ghostBorder, borderRadius: 2 }}>
                  <GitHubIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
