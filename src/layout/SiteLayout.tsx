/**
 * Shell for all routes: header, scrollable main (`Outlet`), footer. Imports global `resume` once.
 */
import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import { resume } from '../content'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function SiteLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <SiteHeader data={resume} />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
        }}
      >
        <Outlet />
      </Box>
      <SiteFooter data={resume} />
    </Box>
  )
}
