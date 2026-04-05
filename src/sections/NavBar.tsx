/**
 * Sticky glass navigation with in-page anchor links (single-page scroll).
 */
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { design } from '../theme'
import type { Resume } from '../content/types'

const links = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
  { label: 'Projects', id: 'projects' },
]

type Props = { data: Resume }

export function NavBar({ data }: Props) {
  const { basics } = data

  return (
    <Box
      component="nav"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1200,
        py: 1.5,
        borderBottom: design.ghostBorder,
        backgroundColor: 'rgba(34, 42, 61, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ flexWrap: 'wrap', rowGap: 1 }}
        >
          <Typography
            component="a"
            href="#hero"
            variant="h6"
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              color: 'text.primary',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            {basics.name}
          </Typography>

          <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2 }}
            sx={{ display: { xs: 'none', md: 'flex' }, flexWrap: 'wrap' }}
          >
            {links.map((l) => (
              <Button
                key={l.id}
                component="a"
                href={`#${l.id}`}
                color="inherit"
                sx={{ color: 'text.secondary', fontSize: '0.875rem', minWidth: 0, px: 1 }}
              >
                {l.label}
              </Button>
            ))}
          </Stack>

          <Button
            component="a"
            href="#contact"
            variant="contained"
            sx={{
              background: design.gradientCta,
              color: design.onPrimary,
              boxShadow: 'none',
              px: 2.5,
              borderRadius: 999,
              '&:hover': {
                background: design.gradientCta,
                boxShadow: design.ambientShadow,
                filter: 'brightness(1.05)',
              },
            }}
          >
            Contact
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
