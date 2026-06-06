import { lazy, Suspense, type ComponentType } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'

const named = <T extends string>(p: Promise<Record<T, ComponentType>>, key: T) =>
  p.then((m) => ({ default: m[key] }))

const HomePage = lazy(() => named(import('./pages/HomePage'), 'HomePage'))
const AboutPage = lazy(() => named(import('./pages/AboutPage'), 'AboutPage'))
const WorkPage = lazy(() => named(import('./pages/WorkPage'), 'WorkPage'))
const TechnologyPage = lazy(() => named(import('./pages/TechnologyPage'), 'TechnologyPage'))
const AcademyPage = lazy(() => named(import('./pages/AcademyPage'), 'AcademyPage'))
const CoursePage = lazy(() => named(import('./pages/CoursePage'), 'CoursePage'))
const CareersPage = lazy(() => named(import('./pages/CareersPage'), 'CareersPage'))
const ContactPage = lazy(() => named(import('./pages/ContactPage'), 'ContactPage'))
const NotFound = lazy(() => named(import('./pages/NotFound'), 'NotFound'))

function RouteFallback() {
  return <div aria-hidden className="min-h-screen bg-base" />
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<RouteFallback />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route path="about" element={<Suspense fallback={<RouteFallback />}><AboutPage /></Suspense>} />
        <Route path="work" element={<Suspense fallback={<RouteFallback />}><WorkPage /></Suspense>} />
        <Route path="technology" element={<Suspense fallback={<RouteFallback />}><TechnologyPage /></Suspense>} />
        <Route path="academy" element={<Suspense fallback={<RouteFallback />}><AcademyPage /></Suspense>} />
        <Route path="academy/:slug" element={<Suspense fallback={<RouteFallback />}><CoursePage /></Suspense>} />
        <Route path="careers" element={<Suspense fallback={<RouteFallback />}><CareersPage /></Suspense>} />
        <Route path="contact" element={<Suspense fallback={<RouteFallback />}><ContactPage /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<RouteFallback />}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  )
}
