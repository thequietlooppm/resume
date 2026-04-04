import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import type { ReactNode } from 'react'
import type { Contact } from '../content/types'

type Props = {
  contact: Contact
  /** 'dark' matches Wix-style black icons on white card */
  iconColor?: 'dark' | 'inherit'
}

export function SocialIconRow({ contact, iconColor = 'dark' }: Props) {
  const color =
    iconColor === 'dark' ? 'rgba(15, 23, 42, 0.85)' : 'inherit'

  const items: { href: string; label: string; icon: ReactNode }[] = []
  if (contact.email) {
    items.push({
      href: `mailto:${contact.email}`,
      label: 'Email',
      icon: <EmailOutlinedIcon />,
    })
  }
  if (contact.linkedin) {
    items.push({
      href: contact.linkedin,
      label: 'LinkedIn',
      icon: <LinkedInIcon />,
    })
  }
  if (contact.github) {
    items.push({
      href: contact.github,
      label: 'GitHub',
      icon: <GitHubIcon />,
    })
  }

  if (items.length === 0) {
    return null
  }

  return (
    <Stack direction="row" spacing={0.5} justifyContent="center" useFlexGap flexWrap="wrap">
      {items.map((item) => (
        <Tooltip key={item.href} title={item.label}>
          <IconButton
            component="a"
            href={item.href}
            target={item.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            aria-label={item.label}
            size="medium"
            sx={{ color }}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  )
}
