/**
 * Root React tree: `BrowserRouter` and route table. Nested routes render inside `SiteLayout`.
 */
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './layout/SiteLayout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ResumePage } from './pages/ResumePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<AboutPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
