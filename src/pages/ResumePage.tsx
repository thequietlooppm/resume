import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { resume } from '../content'
import { EducationSection, ExperienceSection, SkillsSection } from '../components/resumeSections'

export function ResumePage() {
  return (
    <Box sx={{ py: { xs: 3, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <Container maxWidth="md" disableGutters>
        <Paper
          elevation={0}
          sx={{
            overflow: 'hidden',
            borderRadius: { xs: 2, sm: 3 },
            border: '1px solid',
            borderColor: 'rgba(0,0,0,0.06)',
            boxShadow: '0 8px 32px rgba(15, 23, 42, 0.06)',
            bgcolor: 'background.paper',
          }}
        >
          <Box sx={{ px: { xs: 2.5, sm: 4 }, pt: { xs: 2, sm: 1 } }}>
            <ExperienceSection data={resume} />
            <EducationSection data={resume} />
            <SkillsSection data={resume} />
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
