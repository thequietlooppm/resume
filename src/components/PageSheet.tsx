import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import type { ReactNode } from 'react'

const paperSx = {
  overflow: 'hidden' as const,
  borderRadius: { xs: 2, sm: 3 },
  border: '1px solid',
  borderColor: 'rgba(0,0,0,0.06)',
  boxShadow: '0 8px 32px rgba(15, 23, 42, 0.06)',
  bgcolor: 'background.paper' as const,
}

const innerSx = { px: { xs: 2.5, sm: 4 }, pt: { xs: 2, sm: 1 } }

type Props = { children: ReactNode }

/**
 * Shared bordered sheet layout for Resume and Projects routes: outer padding,
 * `maxWidth="md"` container, and consistent `Paper` styling around section content.
 */
export function PageSheet({ children }: Props) {
  return (
    <Box sx={{ py: { xs: 3, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <Container maxWidth="md" disableGutters>
        <Paper elevation={0} sx={paperSx}>
          <Box sx={innerSx}>{children}</Box>
        </Paper>
      </Container>
    </Box>
  )
}
