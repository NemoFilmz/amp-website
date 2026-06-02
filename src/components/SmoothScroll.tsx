import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'

type ScrollTo = (
  target: string | HTMLElement | number,
  opts?: { offset?: number; immediate?: boolean },
) => void

const LenisContext = createContext<{ scrollTo: ScrollTo }>({ scrollTo: () => {} })

// eslint-disable-next-line react-refresh/only-export-components
export function useSmoothScroll() {
  return useContext(LenisContext)
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo: ScrollTo = (target, opts) => {
    const offset = opts?.offset ?? 0
    const immediate = opts?.immediate ?? false
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset, duration: immediate ? 0 : 1.2, immediate })
      return
    }
    // Reduced-motion / fallback path
    if (typeof target === 'string') {
      const el = document.querySelector(target)
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY + offset
        window.scrollTo(0, y)
      }
    } else if (target instanceof HTMLElement) {
      const y = target.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo(0, y)
    } else {
      window.scrollTo(0, target)
    }
  }

  return <LenisContext.Provider value={{ scrollTo }}>{children}</LenisContext.Provider>
}
