import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container, CTAButton, Magnetic, CinematicBackdrop } from '../components/ui'
import { HERO } from '../data/site'

const EASE = [0.16, 1, 0.3, 1] as const

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

const HEADLINE_ACCENT = 'decisions'

/**
 * Renders the headline with the key word emphasised in AMP yellow,
 * splitting on that exact token so all surrounding copy stays verbatim.
 */
function Headline({ text }: { text: string }) {
  const parts = text.split(HEADLINE_ACCENT)
  if (parts.length === 1) return <>{text}</>
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="text-amp">{HEADLINE_ACCENT}</span>}
        </span>
      ))}
    </>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const hasVideo = Boolean(HERO.videoSrc)

  const motionItem = (className: string, children: React.ReactNode) =>
    reduce ? (
      <div className={className}>{children}</div>
    ) : (
      <motion.div variants={itemVariants} className={className}>
        {children}
      </motion.div>
    )

  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden grain pt-[84px]">
      {/* Full-bleed background: procedural backdrop as the base, a graded poster
          image on top, swappable for a real showreel video when HERO.videoSrc is set.
          The image hides itself on error so the backdrop always remains. */}
      <CinematicBackdrop seed={3} />
      {!hasVideo && HERO.posterImage && (
        <img
          src={HERO.posterImage}
          alt=""
          aria-hidden
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
          }}
          className="cine-grade absolute inset-0 h-full w-full object-cover"
        />
      )}
      {hasVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={HERO.posterImage}
          aria-hidden
          className="cine-grade absolute inset-0 h-full w-full object-cover"
        >
          <source src={HERO.videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Radial cyan glow, top-right */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 60% at 82% 8%, rgba(43,217,255,0.16), transparent 58%)',
        }}
      />
      {/* Strong bottom gradient down to bg-base for legibility */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(8,9,11,0.62) 0%, rgba(8,9,11,0.40) 34%, rgba(8,9,11,0.78) 78%, rgba(8,9,11,0.98) 100%)',
        }}
      />
      {/* Left-edge wash to ground the type column */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(8,9,11,0.70) 0%, rgba(8,9,11,0.30) 42%, transparent 70%)',
        }}
      />

      {/* Content. The section reserves the fixed nav's height (pt-[84px]) and uses
          items-center; with no internal vertical padding here, the section's spare
          min-height is split evenly above and below this block, so the gap from the
          nav equals the gap to the section's bottom edge. */}
      <Container className="relative z-10">
        <motion.div
          className="max-w-5xl"
          variants={reduce ? undefined : containerVariants}
          initial={reduce ? false : 'hidden'}
          animate={reduce ? undefined : 'show'}
        >
          {motionItem(
            '',
            <h1 className="font-display text-[clamp(2.2rem,6.5vw,5.25rem)] font-normal leading-[0.98] tracking-tighter text-balance text-primary">
              <Headline text={HERO.headline} />
            </h1>,
          )}

          {motionItem(
            'mt-6',
            <p className="max-w-2xl font-body text-base text-secondary md:text-lg">
              {HERO.subheadline}
            </p>,
          )}

          {motionItem(
            'mt-4',
            <p className="max-w-2xl font-body text-sm text-muted md:text-base">{HERO.paragraph}</p>,
          )}

          {motionItem(
            'mt-6',
            <p className="max-w-3xl border-l-2 border-amp pl-5 font-light text-base text-primary/90 md:text-lg">
              {HERO.statement}
            </p>,
          )}

          {motionItem(
            'mt-8 flex flex-wrap items-center gap-3',
            <>
              {HERO.ctas.map((c) =>
                c.variant === 'primary' ? (
                  <Magnetic key={c.label}>
                    <CTAButton
                      variant={c.variant}
                      to={c.to}
                      icon={<ArrowRight size={16} aria-hidden />}
                    >
                      {c.label}
                    </CTAButton>
                  </Magnetic>
                ) : (
                  <CTAButton key={c.label} variant={c.variant} to={c.to}>
                    {c.label}
                  </CTAButton>
                ),
              )}
            </>,
          )}
        </motion.div>
      </Container>
    </section>
  )
}
