/**
 * Sticky top bar: brand (home link), desktop nav, and mobile drawer menu.
 */
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import type { Resume } from '../content/types'

const navItems: { label: string; to: string; end?: boolean }[] = [
  { label: 'About me', to: '/', end: true },
  { label: 'Resume', to: '/resume' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

type Props = { data: Resume }

/** Uppercase nav link for md+ screens; highlights when route matches. */
function NavTextLink({ to, end, children }: { to: string; end?: boolean; children: string }) {
  const theme = useTheme()
  return (
    <NavLink
      to={to}
      end={end}
      style={({ isActive }) => ({
        textDecoration: 'none',
        color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
        fontWeight: isActive ? 700 : 500,
        letterSpacing: '0.06em',
        fontSize: '0.8125rem',
        textTransform: 'uppercase',
      })}
    >
      {children}
    </NavLink>
  )
}

/** Application header wired to `resume.basics` for the brand line. */
export function SiteHeader({ data }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { basics } = data

  const drawer = (
    <Box sx={{ width: 260, pt: 2 }} onClick={() => setMobileOpen(false)}>
      <List>
        {navItems.map((item) => (
          <ListItemButton key={item.to} component={NavLink} to={item.to} end={Boolean(item.end)}>
            <ListItemText primary={item.label} primaryTypographyProps={{ sx: { textTransform: 'uppercase', fontSize: '0.875rem' } }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'rgba(15, 23, 42, 0.08)',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ minHeight: { xs: 64, sm: 72 }, py: 0.5 }}
        >
          <NavLink
            to="/"
            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', minWidth: 0 }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ minWidth: 0 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  bgcolor: 'primary.main',
                  borderRadius: 0.5,
                  flexShrink: 0,
                }}
              />
              <Stack direction="row" alignItems="center" flexWrap="wrap" sx={{ columnGap: 0.5, rowGap: 0.5, minWidth: 0 }}>
                <Typography
                  component="span"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '1.0625rem', sm: '1.25rem' },
                    letterSpacing: '-0.02em',
                    lineHeight: 1.25,
                    color: 'text.primary',
                  }}
                >
                  {basics.name}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontSize: { xs: '1.0625rem', sm: '1.25rem' },
                    lineHeight: 1.25,
                    fontWeight: 600,
                    color: 'text.secondary',
                    letterSpacing: '-0.01em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {' / '}
                  {basics.title}
                </Typography>
              </Stack>
            </Stack>
          </NavLink>

          <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <NavTextLink key={item.to} to={item.to} end={item.end}>
                {item.label}
              </NavTextLink>
            ))}
          </Stack>

          <IconButton
            edge="end"
            aria-label="open menu"
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
      </Container>
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        {drawer}
      </Drawer>
    </Box>
  )
}
