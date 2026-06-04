import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '../lib/util'

/**
 * Fixed right-side scroll-progress rail: a thin track with one circle per
 * top-level section over a dark backdrop. A yellow line grows down the track as
 * you scroll, reaching (and filling) each circle when its section comes into
 * view. Desktop only; purely decorative.
 */
export function ScrollRail() {
  const { pathname } = useLocation()
  const [sections, setSections] = useState<HTMLElement[]>([])
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const raf = useRef(0)

  // (Re)collect the top-level <section> elements whenever the route changes,
  // and again once layout has settled (media can shift offsets).
  useEffect(() => {
    const collect = () => {
      const all = Array.from(document.querySelectorAll('section')) as HTMLElement[]
      setSections(all.filter((s) => !s.parentElement?.closest('section')))
    }
    collect()
    const t = window.setTimeout(collect, 500)
    return () => window.clearTimeout(t)
  }, [pathname])

  useEffect(() => {
    if (sections.length < 2) return
    const update = () => {
      raf.current = 0
      const mark = window.innerHeight * 0.4
      const tops = sections.map((s) => s.getBoundingClientRect().top)
      let idx = 0
      for (let i = 0; i < tops.length; i++) if (tops[i] - mark <= 1) idx = i
      let frac = 0
      if (idx < tops.length - 1) {
        const span = tops[idx + 1] - tops[idx]
        if (span > 0) frac = Math.min(1, Math.max(0, (mark - tops[idx]) / span))
      }
      setActive(idx)
      setProgress((idx + frac) / (tops.length - 1))
    }
    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [sections])

  if (sections.length < 2) return null
  const n = sections.length

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-0 top-0 z-40 hidden h-screen w-16 items-center justify-center lg:flex"
    >
      {/* Dark backdrop strip on the right edge */}
      <div className="absolute inset-0 bg-gradient-to-l from-base/85 via-base/45 to-transparent" />

      {/* Track + circles */}
      <div className="relative h-[68vh] w-3">
        {/* Grey track */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line-strong" />
        {/* Yellow progress fill */}
        <div
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-amp"
          style={{ height: `${progress * 100}%` }}
        />
        {/* Circles */}
        {sections.map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${(i / (n - 1)) * 100}%` }}
          >
            <span
              className={cn(
                'block h-2.5 w-2.5 rounded-full border transition-all duration-300',
                i <= active
                  ? 'border-amp bg-amp shadow-[0_0_8px_rgba(249,192,12,0.55)]'
                  : 'border-line-strong bg-base',
              )}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
