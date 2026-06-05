import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { NAV_LINKS } from '../data/site'
import { useSmoothScroll } from './SmoothScroll'
import { Wordmark } from './Wordmark'
import { Magnetic } from './ui'
import { cn } from '../lib/util'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollTo } = useSmoothScroll()
  const { pathname } = useLocation()
  const openBtnRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      openBtnRef.current?.focus()
    }
  }, [open])

  const homeClick = () => {
    if (pathname === '/') scrollTo(0)
  }

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.2 })

  const linkBase = 'font-body text-[16px] font-medium uppercase tracking-[0.12em] transition-colors'
  // Active = the current route. Home-section anchors don't mark a page.
  const isActive = (to: string) =>
    to === '/#top' ? pathname === '/' : !to.includes('#') && pathname === to

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-line bg-base/80 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-[100px] max-w-content items-center justify-between px-6 md:px-12 lg:px-20">
          <Link to="/" onClick={homeClick} className="shrink-0" aria-label="Action Media Production, home">
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => {
              const active = isActive(l.to)
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    linkBase,
                    'group relative py-1',
                    active ? 'text-primary' : 'text-secondary hover:text-primary',
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-amp transition-transform duration-300 ease-out',
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <Magnetic>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-amp px-6 py-3.5 font-body text-[16px] font-medium uppercase tracking-[0.12em] text-base transition-shadow duration-300 hover:shadow-amp"
              >
                Start Your Project
                <ArrowRight size={16} aria-hidden />
              </Link>
            </Magnetic>
          </div>

          <button
            ref={openBtnRef}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-primary lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Scroll-progress accent line */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-amp"
          style={{ scaleX: progress }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] flex flex-col bg-base lg:hidden"
          >
            <div className="flex h-[100px] items-center justify-between px-6">
              <Link to="/" onClick={() => setOpen(false)}>
                <Wordmark />
              </Link>
              <button
                ref={closeBtnRef}
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="-mr-2 flex h-11 w-11 items-center justify-center text-primary"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  {l.to.includes('#') ? (
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block border-b border-line py-4 font-display text-3xl tracking-tighter text-primary"
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'block border-b border-line py-4 font-display text-3xl tracking-tighter',
                          isActive ? 'text-amp' : 'text-primary',
                        )
                      }
                    >
                      {l.label}
                    </NavLink>
                  )}
                </motion.div>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-amp px-6 py-4 font-body text-[16px] font-medium uppercase tracking-[0.12em] text-base"
              >
                Start Your Project
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
