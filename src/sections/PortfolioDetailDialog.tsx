/**
 * Lazy-loaded project write-up dialog (see `PortfolioSection`). Split into its own
 * module so `react-markdown` + `remark-gfm` are only downloaded when a visitor
 * actually opens a write-up, keeping the initial bundle smaller.
 */
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { design } from '../theme'

type Props = {
  open: boolean
  title: string
  markdown: string | undefined
  onClose: () => void
}

export default function PortfolioDetailDialog({ open, title, markdown, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      aria-labelledby="portfolio-detail-title"
      slotProps={{
        paper: {
          sx: {
            bgcolor: design.surfaceHigh,
            backgroundImage: 'none',
            border: design.ghostBorder,
            maxHeight: 'min(92vh, 880px)',
          },
        },
      }}
    >
      {markdown ? (
        <>
          <DialogTitle
            id="portfolio-detail-title"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              pr: 1,
              borderBottom: design.ghostBorder,
              color: 'text.primary',
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontWeight: 700,
              fontSize: '1.15rem',
            }}
          >
            {title}
            <IconButton type="button" onClick={onClose} aria-label="Close" sx={{ color: 'text.secondary' }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 2, sm: 2.5 } }}>
            <Box
              className="portfolio-markdown-paper"
              sx={{
                bgcolor: '#f4f1eb',
                color: '#1c1b19',
                borderRadius: 1,
                px: { xs: 2.5, sm: 3.5 },
                py: { xs: 2.5, sm: 3.5 },
                maxHeight: 'min(68vh, 640px)',
                overflow: 'auto',
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.07)',
                fontFamily: '"Georgia", "Times New Roman", serif',
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                '& h1': {
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  fontFamily: 'inherit',
                  mt: 0,
                  mb: 2,
                  lineHeight: 1.25,
                },
                '& h2': {
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  fontFamily: 'inherit',
                  mt: 3,
                  mb: 1.25,
                  lineHeight: 1.3,
                },
                '& h3': {
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  fontFamily: 'inherit',
                  mt: 2.5,
                  mb: 1,
                },
                '& p': { mb: 2, mt: 0 },
                '& ul, & ol': { pl: 2.5, mb: 2, mt: 0 },
                '& li': { mb: 0.5 },
                '& a': { color: '#0b57d0', textDecoration: 'underline', wordBreak: 'break-word' },
                '& a:hover': { color: '#0842a0' },
                '& code': {
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '0.88em',
                  bgcolor: 'rgba(0,0,0,0.07)',
                  px: 0.5,
                  borderRadius: 0.5,
                },
                '& pre': {
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '0.85em',
                  bgcolor: 'rgba(0,0,0,0.06)',
                  p: 2,
                  borderRadius: 1,
                  overflow: 'auto',
                  mb: 2,
                  lineHeight: 1.5,
                },
                '& pre code': { bgcolor: 'transparent', p: 0 },
                '& blockquote': {
                  borderLeft: '4px solid rgba(0,0,0,0.15)',
                  pl: 2,
                  ml: 0,
                  mr: 0,
                  my: 2,
                  color: 'rgba(0,0,0,0.78)',
                },
                '& table': {
                  width: '100%',
                  borderCollapse: 'collapse',
                  mb: 2,
                  fontSize: '0.95em',
                },
                '& th, & td': {
                  border: '1px solid rgba(0,0,0,0.12)',
                  px: 1.5,
                  py: 1,
                  textAlign: 'left',
                },
                '& th': { bgcolor: 'rgba(0,0,0,0.04)', fontWeight: 700 },
                '& hr': { border: 'none', borderTop: '1px solid rgba(0,0,0,0.12)', my: 3 },
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Omit `node` — spreading it onto a DOM <a> triggers a React unknown-prop warning.
                  a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </Box>
          </DialogContent>
        </>
      ) : null}
    </Dialog>
  )
}
