import { ArrowRight } from 'lucide-react'
import { Section, Eyebrow, CTAButton, CinematicMedia } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { ACADEMY } from '../data/site'

/* 2x2 mosaic of the disciplines AMP Academy teaches. */
const MOSAIC = [
  { src: '/placeholders/gov.jpg', label: 'Government Films' },
  { src: '/placeholders/oilgas.jpg', label: 'Industrial 3D' },
  { src: '/placeholders/aviation.jpg', label: 'Aviation' },
  { src: '/placeholders/hero.jpg', label: 'AI Production' },
]

/**
 * Simple Academy promo (homepage). Concise two-column teaser that links to the
 * full /academy page, which holds the weekend program, luxury experience, and tracks.
 */
export function Academy() {
  return (
    <Section id="academy" divider className="py-24 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: text */}
        <div>
          <Reveal>
            <Eyebrow index={8} total={10}>
              AMP Academy
            </Eyebrow>
            <span aria-hidden className="mt-5 block h-[2px] w-24 bg-amp" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-8 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
              {ACADEMY.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-secondary">
              {ACADEMY.intro[1]}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9">
              <CTAButton variant="primary" to="/academy" icon={<ArrowRight size={16} aria-hidden />}>
                Discover AMP Academy
              </CTAButton>
            </div>
          </Reveal>
        </div>

        {/* Right: 2x2 image mosaic */}
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-3">
            {MOSAIC.map((m) => (
              <CinematicMedia key={m.label} src={m.src} alt={m.label} className="aspect-square rounded-lg">
                <span className="eyebrow absolute bottom-3 left-3 z-10 text-primary">{m.label}</span>
              </CinematicMedia>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
