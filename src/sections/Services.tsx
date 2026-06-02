import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Section, Eyebrow } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { SERVICES, SERVICES_TITLE } from '../data/site'

const EASE = [0.16, 1, 0.3, 1] as const

export function Services() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="services" divider className="py-24 md:py-32">
      <Reveal>
        <header className="max-w-prose">
          <Eyebrow index={4} total={10}>
            Our Services
          </Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.6rem)] tracking-tighter leading-[0.98] text-primary">
            {SERVICES_TITLE}
          </h2>
        </header>
      </Reveal>

      <Reveal delay={0.1} className="mt-14 md:mt-20">
        <ul role="list">
          {SERVICES.map((service, i) => {
            const isOpen = open === i
            const isLast = i === SERVICES.length - 1
            const panelId = `service-panel-${i}`
            const buttonId = `service-trigger-${i}`

            return (
              <li
                key={service.name}
                className={
                  'group relative overflow-hidden border-t border-line' +
                  (isLast ? ' border-b' : '')
                }
              >
                {/* AMP left edge bar on hover */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-amp transition-transform duration-300 group-hover:scale-y-100"
                />
                {/* subtle surface wash on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-elevated/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <h3 className="relative">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="grid w-full grid-cols-12 items-start gap-4 py-7 text-left md:gap-6"
                  >
                    <span className="col-span-11 md:col-span-5">
                      <span className="block font-display text-[clamp(1.4rem,2.2vw,2rem)] tracking-tighter text-primary">
                        {service.name}
                      </span>
                      {/* mobile-only stacked description */}
                      <span className="mt-3 block font-body leading-relaxed text-secondary md:hidden">
                        {service.description}
                      </span>
                    </span>

                    <span className="hidden font-body leading-relaxed text-secondary md:col-span-6 md:block">
                      {service.description}
                    </span>

                    <span className="flex justify-end md:col-span-1">
                      <ChevronDown
                        size={20}
                        aria-hidden
                        className={
                          'text-muted transition-all duration-300 group-hover:text-amp' +
                          (isOpen ? ' rotate-180 text-amp' : '')
                        }
                      />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="relative overflow-hidden"
                      initial={reduce ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={reduce ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <div className="grid grid-cols-12 gap-4 pb-8 md:gap-6">
                        <div className="col-span-12 md:col-span-7 md:col-start-6">
                          <ul className="flex flex-wrap gap-2" role="list">
                            {service.capabilities.map((capability) => (
                              <li
                                key={capability}
                                className="rounded-full border border-line px-3 py-1 text-xs text-secondary transition-colors duration-200 hover:border-amp hover:text-amp"
                              >
                                {capability}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </Section>
  )
}
