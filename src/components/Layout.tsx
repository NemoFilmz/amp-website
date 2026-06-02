import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SmoothScroll, useSmoothScroll } from './SmoothScroll'
import { Nav } from './Nav'
import { Footer } from './Footer'

/** Scrolls to top on route change, or to the hash target when present. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    if (hash) {
      const id = window.setTimeout(() => scrollTo(hash, { offset: -80 }), 80)
      return () => window.clearTimeout(id)
    }
    scrollTo(0, { immediate: true })
  }, [pathname, hash, scrollTo])

  return null
}

export function Layout() {
  return (
    <SmoothScroll>
      <ScrollManager />
      <Nav />
      <main id="top">
        <Outlet />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
