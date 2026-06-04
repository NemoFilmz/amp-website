import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SmoothScroll, useSmoothScroll } from './SmoothScroll'
import { Nav } from './Nav'
import { ScrollRail } from './ScrollRail'
import { StickyFooter } from './StickyFooter'

const SITE = 'Action Media Production'
const ROUTE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: `${SITE} | Cinematic Industrial Storytelling`,
    description:
      'Cinematic visual storytelling for governments, energy, aviation, and mega projects. 15+ years turning complexity into clarity.',
  },
  '/about': {
    title: `About | ${SITE}`,
    description:
      'A specialized visual communication studio built for governments, industrial leaders, energy companies, and airlines.',
  },
  '/work': {
    title: `Work | ${SITE}`,
    description:
      'Cinematic industrial and government storytelling, from offshore platforms to national vision films.',
  },
  '/technology': {
    title: `Technology & Innovation | ${SITE}`,
    description:
      'In-house rendering, AI production, real-time pipelines, and a deep industrial asset library.',
  },
  '/academy': {
    title: `AMP Academy | ${SITE}`,
    description: 'Learn world-class cinematic industrial production from real AMP projects.',
  },
  '/careers': {
    title: `Careers | ${SITE}`,
    description: 'Join the team shaping how complex industries and national visions are seen.',
  },
  '/contact': {
    title: `Contact | ${SITE}`,
    description:
      'Reach our regional studios in Abu Dhabi, Dubai, Riyadh, and Barcelona, or start a project brief.',
  },
}

function setMeta(prop: string, attr: 'name' | 'property', content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${prop}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, prop)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Per-route head management + scroll behaviour on navigation. */
function RouteManager() {
  const { pathname, hash } = useLocation()
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    const meta = ROUTE_META[pathname] ?? ROUTE_META['/']
    document.title = meta.title
    setMeta('description', 'name', meta.description)
    setMeta('og:title', 'property', meta.title)
    setMeta('og:description', 'property', meta.description)
    setMeta('twitter:title', 'name', meta.title)
    setMeta('twitter:description', 'name', meta.description)
  }, [pathname])

  useEffect(() => {
    if (hash) {
      const id = window.setTimeout(() => scrollTo(hash, { offset: -100 }), 80)
      return () => window.clearTimeout(id)
    }
    scrollTo(0, { immediate: true })
  }, [pathname, hash, scrollTo])

  return null
}

export function Layout() {
  return (
    <SmoothScroll>
      <RouteManager />
      <Nav />
      <ScrollRail />
      <main id="top">
        <Outlet />
      </main>
      <StickyFooter />
    </SmoothScroll>
  )
}
