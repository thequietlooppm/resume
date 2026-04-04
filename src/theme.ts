import { createTheme } from '@mui/material/styles'

/** Wix-style portfolio: blue accent, warm neutrals, serif display for names */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#64748b',
    },
    text: {
      primary: '#1e293b',
      secondary: '#475569',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    divider: 'rgba(37, 99, 235, 0.12)',
  },
  typography: {
    fontFamily: '"Source Sans 3", "Source Sans Pro", system-ui, sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
      fontWeight: 700,
      fontSize: '2.125rem',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      color: '#0f172a',
      '@media (min-width:600px)': {
        fontSize: '2.75rem',
      },
    },
    h2: {
      fontFamily: '"Source Sans 3", system-ui, sans-serif',
      fontWeight: 700,
      fontSize: '1.0625rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#2563eb',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.0625rem',
      lineHeight: 1.35,
    },
    body1: {
      fontSize: '1.0625rem',
      lineHeight: 1.75,
    },
    body2: {
      fontSize: '0.9375rem',
      lineHeight: 1.65,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 600,
      letterSpacing: '0.04em',
      color: '#334155',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  },
})
