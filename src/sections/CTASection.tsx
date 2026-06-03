import { ArrowRight } from 'lucide-react'
import { Container, Eyebrow, CTAButton, Magnetic } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { CTA } from '../data/site'

/**
 * Closing call to action. Routes to the single canonical inquiry form on /contact
 * (no second inline form). Tints the closing phrase "Visual Storytelling" without
 * editing the source copy.
 */
const ACCENT_PHRASE = 'Visual Storytelling'
const splitIndex = CTA.title.lastIndexOf(ACCENT_PHRASE)
const titleHead = splitIndex >= 0 ? CTA.title.slice(0, splitIndex) : CTA.title
const titleAccent = splitIndex >= 0 ? CTA.title.slice(splitIndex) : ''

export function CTASection() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-base grain py-28 md:py-40">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(249,192,12,0.10), transparent 70%), radial-gradient(55% 60% at 18% 90%, rgba(43,217,255,0.08), transparent 70%)',
        }}
      />

      <Container>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow className="mb-6 justify-center">Get Started</Eyebrow>
          </Reveal>
          <Reveal delay={0.04}>
            <h2 className="text-balance font-display text-[clamp(2.4rem,6.2vw,5rem)] leading-[0.98] tracking-tighter text-primary">
              {titleHead}
              {titleAccent && <span className="text-amp">{titleAccent}</span>}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-secondary">
              {CTA.body}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {CTA.buttons.map((b) =>
                b.variant === 'primary' ? (
                  <Magnetic key={b.label}>
                    <CTAButton variant={b.variant} to={b.to} icon={<ArrowRight size={16} aria-hidden />}>
                      {b.label}
                    </CTAButton>
                  </Magnetic>
                ) : (
                  <CTAButton key={b.label} variant={b.variant} to={b.to}>
                    {b.label}
                  </CTAButton>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
