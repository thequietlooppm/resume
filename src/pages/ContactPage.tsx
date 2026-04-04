import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { resume } from '../content'

export function ContactPage() {
  const { basics, contact } = resume

  return (
    <Box sx={{ py: { xs: 3, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'rgba(0,0,0,0.06)',
            boxShadow: '0 8px 32px rgba(15, 23, 42, 0.06)',
          }}
        >
          <Typography variant="h2" sx={{ mb: 1, color: 'primary.main' }}>
            Contact
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Reach out via email or connect on social. The same details appear in the site footer on every page.
          </Typography>
          <Stack spacing={2.5}>
            <Typography variant="body2" color="text.secondary">
              <strong>{basics.name}</strong>
              <br />
              {basics.title}
            </Typography>
            {contact.phone ? (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <PhoneOutlinedIcon color="primary" />
                <Link href={`tel:${contact.phone.replace(/\s/g, '')}`} variant="body1" fontWeight={600}>
                  {contact.phone}
                </Link>
              </Stack>
            ) : null}
            {contact.email ? (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <EmailOutlinedIcon color="primary" />
                <Link href={`mailto:${contact.email}`} variant="body1" fontWeight={600}>
                  {contact.email}
                </Link>
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Add your email in <code>resume.json</code> under <code>contact.email</code>.
              </Typography>
            )}
            <Stack direction="row" spacing={1}>
              {contact.linkedin ? (
                <Link href={contact.linkedin} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <LinkedInIcon color="primary" /> LinkedIn
                </Link>
              ) : null}
              {contact.github ? (
                <Link href={contact.github} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <GitHubIcon color="primary" /> GitHub
                </Link>
              ) : null}
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
