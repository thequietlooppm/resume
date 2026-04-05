/**
 * Single-page scroll: nav + hero, about, work, education, portfolio, footer CTA.
 * Content is read from `resume` (see `src/content/resume.json`).
 */
import Box from '@mui/material/Box'
import { resume } from '../content'
import { AboutSection } from '../sections/AboutSection'
import { AcademicSection } from '../sections/AcademicSection'
import { FooterSection } from '../sections/FooterSection'
import { HeroSection } from '../sections/HeroSection'
import { NavBar } from '../sections/NavBar'
import { PortfolioSection } from '../sections/PortfolioSection'
import { WorkHistorySection } from '../sections/WorkHistorySection'

export function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavBar data={resume} />
      <main>
        <HeroSection data={resume} />
        <AboutSection data={resume} />
        <WorkHistorySection experience={resume.experience} />
        <AcademicSection education={resume.education} />
        <PortfolioSection projects={resume.projects} />
      </main>
      <FooterSection data={resume} />
    </Box>
  )
}
