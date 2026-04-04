/**
 * Horizontal icon row on the About profile card: email and LinkedIn when set;
 * GitHub is always shown (link if `contact.github` is set, otherwise disabled).
 */
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import type { Contact } from '../content/types'

type Props = {
  contact: Contact
  iconColor?: 'dark' | 'inherit'
}

export function SocialIconRow({ contact, iconColor = 'dark' }: Props) {
  const color = iconColor === 'dark' ? 'rgba(15, 23, 42, 0.85)' : 'inherit'

  const hasEmail = Boolean(contact.email)
  const hasLinkedIn = Boolean(contact.linkedin)

  return (
    <Stack direction="row" spacing={0.5} justifyContent="center" useFlexGap flexWrap="wrap">
      {hasEmail ? (
        <Tooltip title="Email">
          <IconButton
            component="a"
            href={`mailto:${contact.email}`}
            aria-label="Email"
            size="medium"
            sx={{ color }}
          >
            <EmailOutlinedIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      {hasLinkedIn ? (
        <Tooltip title="LinkedIn">
          <IconButton
            component="a"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            size="medium"
            sx={{ color }}
          >
            <LinkedInIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      {contact.github ? (
        <Tooltip title="GitHub">
          <IconButton
            component="a"
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            size="medium"
            sx={{ color }}
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add GitHub URL in resume.json">
          <span>
            <IconButton aria-label="GitHub (add URL in resume.json)" disabled size="medium" sx={{ color: 'text.disabled' }}>
              <GitHubIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </Stack>
  )
}
