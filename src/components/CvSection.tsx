import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  id?: string
}

export function CvSection({ title, children, id }: Props) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        pt: { xs: 3, sm: 3.5 },
        pb: { xs: 2.5, sm: 3 },
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-of-type': {
          borderBottom: 'none',
          pb: { xs: 3, sm: 4 },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 2.5,
        }}
      >
        <Box
          aria-hidden
          sx={{
            width: 4,
            alignSelf: 'stretch',
            minHeight: 28,
            borderRadius: 1,
            bgcolor: 'primary.main',
            flexShrink: 0,
          }}
        />
        <Typography variant="h2" component="h2" sx={{ color: 'primary.main' }}>
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  )
}
