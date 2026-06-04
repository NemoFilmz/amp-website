import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { FaInstagram, FaLinkedinIn, FaYoutube, FaBehance } from 'react-icons/fa'
import { cn } from '../lib/util'
import { Wordmark } from './Wordmark'
import { BRAND, FOOTER } from '../data/site'

// Footer nav targets: home-page section anchors via "/#id", or routes.
const navToByLabel: Record<string, string> = {
  Home: '/#top',
  'About AMP': '/about',
  Work: '/#industries',
  Technology: '/#services',
  'AMP Academy': '/academy',
  Industries: '/#industries',
  Services: '/#services',
  'Global Offices': '/about',
  Careers: '/about',
  Contact: '/#top',
}

// Social links are placeholders ('#') until real profiles are supplied.
const socials = [
  { title: 'Instagram', href: '#', icon: FaInstagram },
  { title: 'LinkedIn', href: '#', icon: FaLinkedinIn },
  { title: 'YouTube', href: '#', icon: FaYoutube },
  { title: 'Behance', href: '#', icon: FaBehance },
]

/**
 * Scroll-reveal sticky footer (adapted from the 21st.dev sticky-footer):
 * a fixed, clipped panel that the page content scrolls up to reveal. Uses
 * AMP's real footer content, framer-motion, and the brand tokens.
 */
export function StickyFooter({ className, ...props }: ComponentProps<'footer'>) {
  return (
    <footer
      className={cn('relative h-[600px] w-full', className)}
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
      {...props}
    >
      <div className="fixed bottom-0 h-[600px] w-full">
        <div className="sticky top-[calc(100vh-600px)] h-full overflow-y-auto bg-base">
          <div className="relative flex size-full flex-col justify-between gap-8 border-t border-line px-6 py-12 md:px-12">
            {/* Subtle top glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  'radial-gradient(60% 55% at 50% 0%, rgba(255,255,255,0.04), transparent 70%)',
              }}
            />

            {/* Top: brand + link columns */}
            <div className="relative z-10 flex flex-col gap-10 md:flex-row md:gap-12">
              <AnimatedContainer className="w-full max-w-sm space-y-5">
                <Wordmark withSub />
                <p className="max-w-xs font-body text-sm leading-relaxed text-secondary">
                  {FOOTER.statement.line}
                </p>
                <div className="flex gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.title}
                      href={s.href}
                      title={s.title}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-8 items-center justify-center rounded-md border border-line text-secondary transition-colors hover:border-amp hover:text-amp"
                    >
                      <s.icon className="size-4" />
                    </a>
                  ))}
                </div>
              </AnimatedContainer>

              <AnimatedContainer delay={0.15} className="w-full">
                <h3 className="eyebrow">Navigation</h3>
                <ul className="mt-4 space-y-2.5">
                  {FOOTER.nav.map((label) => (
                    <li key={label}>
                      <Link
                        to={navToByLabel[label] ?? '/'}
                        className="font-body text-sm text-secondary transition-colors hover:text-primary"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>

              <AnimatedContainer delay={0.25} className="w-full">
                <h3 className="eyebrow">Offices</h3>
                <ul className="mt-4 space-y-2.5">
                  {FOOTER.offices.map((city) => (
                    <li key={city} className="font-body text-sm text-secondary">
                      {city}
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>

              <AnimatedContainer delay={0.35} className="w-full">
                <h3 className="eyebrow">Contact</h3>
                <ul className="mt-4 space-y-2.5">
                  {FOOTER.emails.map((email) => (
                    <li key={email}>
                      <a
                        href={`mailto:${email}`}
                        className="font-body text-[13px] font-medium text-secondary transition-colors hover:text-amp"
                      >
                        {email}
                      </a>
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>
            </div>

            {/* Bottom: copyright */}
            <div className="relative z-10 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 text-sm text-muted md:flex-row md:items-center">
              <p className="font-body font-medium text-[11px] uppercase tracking-[0.14em]">
                © 2026 {BRAND.short}. All rights reserved.
              </p>
              <p className="font-body font-medium text-[11px] uppercase tracking-[0.14em]">
                {BRAND.years} years of transforming complexity into clarity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

type AnimatedContainerProps = ComponentProps<typeof motion.div> & {
  children?: ReactNode
  delay?: number
}

function AnimatedContainer({ delay = 0.1, children, ...props }: AnimatedContainerProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div {...(props as ComponentProps<'div'>)}>{children}</div>
  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
