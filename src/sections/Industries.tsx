import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Plus, Minus, ArrowUpRight } from 'lucide-react'
import { Section, Eyebrow, CinematicMedia } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { INDUSTRIES, INDUSTRIES_TITLE } from '../data/site'
import { cn, pad } from '../lib/util'

const EASE = [0.16, 1, 0.3, 1] as const

/** Reactive media query so only one layout variant mounts at a time. */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = () => setMatches(mql.matches)
    handler()
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])
  return matches
}

/* ------------------------------------------------------------------ */
/* Shared item chip                                                    */
/* ------------------------------------------------------------------ */

function ItemChip({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <Check size={12} className="mt-1 shrink-0 text-amp" aria-hidden />
      <span className="text-sm leading-snug text-secondary">{label}</span>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop showcase (lg+)                                              */
/* ------------------------------------------------------------------ */

function DesktopShowcase() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const current = INDUSTRIES[active]

  return (
    <div className="mt-16 grid grid-cols-12 gap-12">
      {/* LEFT: vertical industry list */}
      <div className="lg:col-span-5">
        <ul className="border-b border-line">
          {INDUSTRIES.map((industry, i) => {
            const isActive = i === active
            return (
              <li key={industry.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className="group relative flex w-full items-center gap-5 border-t border-line py-4 text-left transition-colors duration-300"
                >
                  {/* active left tick */}
                  <span
                    aria-hidden
                    className={cn(
                      'absolute -left-5 top-1/2 h-8 w-px -translate-y-1/2 origin-center bg-amp transition-transform duration-300',
                      isActive ? 'scale-y-100' : 'scale-y-0',
                    )}
                  />
                  <span
                    className={cn(
                      'index-tag transition-colors duration-300',
                      isActive ? 'text-amp' : 'text-muted group-hover:text-secondary',
                    )}
                  >
                    {pad(i + 1)}
                  </span>
                  <span
                    className={cn(
                      'font-display text-[clamp(1.4rem,2.4vw,2.1rem)] leading-none tracking-tighter transition-colors duration-300',
                      isActive ? 'text-primary' : 'text-muted group-hover:text-secondary',
                    )}
                  >
                    {industry.name}
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden
                    className={cn(
                      'ml-auto shrink-0 transition-all duration-300',
                      isActive
                        ? 'translate-x-0 text-amp opacity-100'
                        : '-translate-x-2 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-60',
                    )}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* RIGHT: cinematic media + items */}
      <div className="lg:col-span-7">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, scale: 1.04, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02, x: -24 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <CinematicMedia
                src={current.image}
                alt={current.name}
                className="h-full w-full rounded-lg"
              >
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-display text-2xl tracking-tighter text-primary">
                    {current.name}
                  </h3>
                  <p className="mt-2 max-w-md text-secondary leading-relaxed">{current.blurb}</p>
                </div>
              </CinematicMedia>
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={active}
            className="mt-7 grid grid-cols-2 gap-x-8 gap-y-3"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {current.items.map((item) => (
              <ItemChip key={item} label={item} />
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile accordion (<lg)                                              */
/* ------------------------------------------------------------------ */

function MobileAccordion() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState<number>(0)

  return (
    <div className="mt-12 border-b border-line">
      {INDUSTRIES.map((industry, i) => {
        const isOpen = i === open
        return (
          <div key={industry.name} className="border-t border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 py-4 text-left"
            >
              <span className={cn('index-tag', isOpen ? 'text-amp' : 'text-muted')}>
                {pad(i + 1)}
              </span>
              <span
                className={cn(
                  'font-display text-[clamp(1.5rem,7vw,2rem)] leading-none tracking-tighter transition-colors duration-300',
                  isOpen ? 'text-primary' : 'text-secondary',
                )}
              >
                {industry.name}
              </span>
              <span
                aria-hidden
                className={cn(
                  'ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
                  isOpen ? 'border-amp text-amp' : 'border-line-strong text-secondary',
                )}
              >
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  initial={reduce ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={reduce ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pt-1">
                    <CinematicMedia
                      src={industry.image}
                      alt={industry.name}
                      className="aspect-[16/10] w-full rounded-lg"
                    />
                    <p className="mt-5 text-secondary leading-relaxed">{industry.blurb}</p>
                    <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                      {industry.items.map((item) => (
                        <ItemChip key={item} label={item} />
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Industries() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  return (
    <Section id="industries" divider className="py-32 md:py-40">
      <Reveal>
        <Eyebrow index={3} total={10}>
          Industries We Serve
        </Eyebrow>
        <h2 className="mt-4 max-w-4xl font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
          {INDUSTRIES_TITLE}
        </h2>
      </Reveal>

      {isDesktop ? <DesktopShowcase /> : <MobileAccordion />}
    </Section>
  )
}
