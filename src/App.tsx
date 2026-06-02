import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { WorkPage } from './pages/WorkPage'
import { TechnologyPage } from './pages/TechnologyPage'
import { AcademyPage } from './pages/AcademyPage'
import { CareersPage } from './pages/CareersPage'
import { ContactPage } from './pages/ContactPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="work" element={<WorkPage />} />
        <Route path="technology" element={<TechnologyPage />} />
        <Route path="academy" element={<AcademyPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  )
}
