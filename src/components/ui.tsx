import {
  useRef,
  type ReactNode,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
} from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cn, pad } from '../lib/util'

/* ------------------------------------------------------------------ */
/* Section shell                                                       */
/* ------------------------------------------------------------------ */

export function Section({
  id,
  children,
  className,
  container = true,
  divider = false,
}: {
  id?: string
  children: ReactNode
  className?: string
  /** Wrap children in the centered max-width container. */
  container?: boolean
  /** Render a hairline divider at the top of the section. */
  divider?: boolean
}) {
  return (
    <section
      id={id}
      className={cn('relative scroll-mt-24', divider && 'border-t border-line', className)}
    >
      {container ? <Container>{children}</Container> : children}
    </section>
  )
}

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full max-w-content px-6 md:px-12 lg:px-20', className)}>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Labels                                                              */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  index,
  total,
  children,
  className,
}: {
  index?: number
  total?: number
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {index !== undefined && (
        <span className="index-tag">
          {pad(index)}
          {total !== undefined && <span className="text-muted"> / {pad(total)}</span>}
        </span>
      )}
      <span className="eyebrow">{children}</span>
    </div>
  )
}

/** A short label with a leading 18px AMP-yellow tick mark. */
export function TickLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-3 eyebrow', className)}>
      <span aria-hidden className="inline-block h-px w-6 bg-amp" />
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Cinematic backdrop: procedural navy/cyan holographic scene           */
/* (mirrors AMP's real ADIPEC look; needs zero external assets)         */
/* ------------------------------------------------------------------ */

function seedFrom(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

const HUES = [192, 200, 178, 210, 186]
const GX = [72, 28, 52, 84, 38]
const GRID = [60, 74, 52, 82, 66]
const HORIZON = ['40%', '44%', '38%', '46%', '41%']

export function CinematicBackdrop({
  seed = 0,
  className,
}: {
  seed?: number
  className?: string
}) {
  const i = seed % HUES.length
  const hue = HUES[i]
  const gx = GX[i]
  const grid = GRID[i]
  const top = HORIZON[i]
  const ampRim = i % 2 === 1 // occasional warm rim light for variety
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden bg-[#090E15]', className)}
    >
      {/* base navy + restrained bloom */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 95% at ${gx}% 6%, hsla(${hue},85%,55%,0.13), transparent 56%), linear-gradient(180deg,#0B1019 0%,#080A0F 100%)`,
        }}
      />
      {/* optional faint amp rim light */}
      {ampRim && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(70% 60% at ${100 - gx}% 96%, rgba(249,192,12,0.07), transparent 60%)`,
          }}
        />
      )}
      {/* receding holographic floor grid (dialed back) */}
      <div
        className="absolute -left-1/4 -right-1/4 bottom-0 h-[66%]"
        style={{
          backgroundImage: `linear-gradient(hsla(${hue},88%,62%,0.14) 1px, transparent 1px), linear-gradient(90deg, hsla(${hue},88%,62%,0.14) 1px, transparent 1px)`,
          backgroundSize: `${grid}px ${grid}px`,
          transform: 'perspective(520px) rotateX(62deg)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, black 4%, transparent 76%)',
          WebkitMaskImage: 'linear-gradient(to top, black 4%, transparent 76%)',
          opacity: 0.5,
        }}
      />
      {/* horizon glow line */}
      <div
        className="absolute left-0 right-0"
        style={{
          top,
          height: '1px',
          background: `hsla(${hue},92%,65%,0.38)`,
          boxShadow: `0 0 46px 5px hsla(${hue},92%,60%,0.22)`,
        }}
      />
      {/* fine scanlines */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg,#fff 0 1px,transparent 1px 3px)',
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(100% 100% at 50% 45%, transparent 50%, rgba(0,0,0,0.58))',
        }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Cinematic media slot: backdrop base + optional photo (swappable)     */
/* ------------------------------------------------------------------ */

export function CinematicMedia({
  src,
  alt,
  className,
  overlay = true,
  eager = false,
  children,
}: {
  src?: string
  alt: string
  className?: string
  overlay?: boolean
  eager?: boolean
  children?: ReactNode
}) {
  return (
    <div className={cn('relative overflow-hidden bg-surface', className)}>
      {/* Always-present procedural backdrop (varies by src/alt) */}
      <CinematicBackdrop seed={seedFrom(src || alt)} />
      {/* Optional real photo on top; hides itself cleanly if it fails to load */}
      {src && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
          }}
          className="cine-grade absolute inset-0 h-full w-full object-cover"
        />
      )}
      {/* navy/cyan grade wash + legibility gradient */}
      {overlay && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 70% 20%, rgba(43,217,255,0.10), transparent 60%), linear-gradient(180deg, rgba(8,9,11,0.05) 0%, rgba(8,9,11,0.45) 68%, rgba(8,9,11,0.9) 100%)',
          }}
        />
      )}
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Magnetic wrapper                                                    */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block', className)}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* CTA button                                                          */
/* ------------------------------------------------------------------ */

type Variant = 'primary' | 'outline' | 'ghost'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-amp text-base font-medium hover:shadow-amp hover:-translate-y-0.5',
  outline:
    'border border-line-strong text-primary hover:border-amp hover:text-amp',
  ghost: 'text-secondary hover:text-primary',
}

const baseBtn =
  'group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.08em] transition-all duration-300'

export function CTAButton({
  children,
  variant = 'primary',
  icon,
  className,
  href,
  to,
  ...rest
}: {
  children: ReactNode
  variant?: Variant
  icon?: ReactNode
  className?: string
  href?: string
  /** Client-side route (react-router). Takes precedence over href. */
  to?: string
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(baseBtn, variantClasses[variant], className)
  const content = (
    <>
      <span>{children}</span>
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    )
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */

export function Marquee({
  children,
  className,
  speed = 'animate-marquee',
}: {
  children: ReactNode
  className?: string
  speed?: string
}) {
  return (
    <div className={cn('group relative flex overflow-hidden', className)}>
      <div className={cn('flex shrink-0 items-center gap-16 pr-16', speed, 'group-hover:[animation-play-state:paused]')}>
        {children}
      </div>
      <div
        aria-hidden
        className={cn('flex shrink-0 items-center gap-16 pr-16', speed, 'group-hover:[animation-play-state:paused]')}
      >
        {children}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page hero: shared header band for subpages (route pages)             */
/* ------------------------------------------------------------------ */

export function PageHero({
  eyebrow,
  title,
  intro,
  seed = 3,
  children,
}: {
  eyebrow: string
  title: string
  intro?: string
  seed?: number
  children?: ReactNode
}) {
  return (
    <section className="grain relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <CinematicBackdrop seed={seed} />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(8,9,11,0.55) 0%, rgba(8,9,11,0.35) 45%, rgba(8,9,11,0.92) 100%)',
        }}
      />
      <Container className="relative z-10">
        <TickLabel>{eyebrow}</TickLabel>
        <h1 className="mt-6 max-w-4xl text-balance font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.96] tracking-tighter text-primary">
          {title}
        </h1>
        {intro && (
          <p className="mt-7 max-w-2xl font-light text-xl leading-relaxed text-secondary md:text-2xl">
            {intro}
          </p>
        )}
        {children && <div className="mt-9">{children}</div>}
      </Container>
    </section>
  )
}
