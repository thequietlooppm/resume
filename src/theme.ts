/**
 * Dark “Architectural Architect” theme aligned with DESIGN.md:
 * midnight surfaces, primary as light source, Space Grotesk + Inter.
 */
import { createTheme } from '@mui/material/styles'

const surface = '#0b1326'
const surfaceLow = '#131b2e'
const surfaceHigh = '#222a3d'
const primary = '#adc6ff'
const primaryContainer = '#4d8eff'
const onPrimary = '#002e6a'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: primary,
      dark: primaryContainer,
      contrastText: onPrimary,
    },
    secondary: {
      main: '#8ab4ff',
    },
    background: {
      default: surface,
      paper: surfaceHigh,
    },
    text: {
      primary: '#e8eaed',
      secondary: '#9aa3b2',
    },
    divider: 'rgba(66, 71, 84, 0.15)',
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
      lineHeight: 1.1,
    },
    h2: {
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
    },
    h3: {
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h4: {
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      fontWeight: 600,
      fontSize: '1.05rem',
    },
    body1: {
      fontSize: '1.0625rem',
      lineHeight: 1.75,
    },
    body2: {
      fontSize: '0.9375rem',
      lineHeight: 1.65,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          backgroundColor: surface,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  },
})

export const design = {
  surface,
  surfaceLow,
  surfaceHigh,
  surfaceLowest: '#0a0f1a',
  primary,
  primaryContainer,
  onPrimary,
  ambientShadow: '0 20px 40px rgba(6, 14, 32, 0.4)',
  ghostBorder: '1px solid rgba(66, 71, 84, 0.15)',
  gradientCta: `linear-gradient(135deg, ${primary} 0%, ${primaryContainer} 100%)`,
} as const
