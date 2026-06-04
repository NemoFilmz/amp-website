import { CircleDot } from 'lucide-react'
import { Section, Container, Eyebrow } from '../components/ui'
import { BackgroundPaths } from '../components/BackgroundPaths'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { WHO_WE_ARE } from '../data/site'

export function WhoWeAre() {
  return (
    <Section
      id="about"
      divider
      container={false}
      className="relative overflow-hidden py-24 md:py-32"
    >
      <BackgroundPaths />
      {/* Legibility scrim: darkens the animated paths into a subtle texture so the
          copy (which sits above it at z-10) reads with strong contrast. Slightly
          deeper at the edges for a contained, panel-like feel. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(115% 95% at 50% 45%, rgba(8,9,11,0.50) 0%, rgba(8,9,11,0.66) 55%, rgba(8,9,11,0.80) 100%)',
        }}
      />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left: eyebrow + sticky headline */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow index={2} total={10}>
                Who We Are
              </Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.6rem)] uppercase leading-[0.98] tracking-tighter text-primary">
                {WHO_WE_ARE.title}
              </h2>
              <div aria-hidden className="mt-8 h-px w-16 bg-amp" />
              <p className="mt-8 max-w-xs font-body text-lg leading-relaxed text-secondary">
                A specialized studio where cinema, engineering understanding, and AI-driven production
                converge for executive and government-level audiences.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Right: editorial body */}
        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <p className="font-light text-2xl leading-snug text-primary md:text-3xl">
              {WHO_WE_ARE.lead}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              {WHO_WE_ARE.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-6 max-w-prose font-body text-lg leading-relaxed text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Capabilities ledger */}
          <div className="mt-12 border-t border-line-strong pt-10">
            <Reveal delay={0.05}>
              <p className="eyebrow">{WHO_WE_ARE.capabilitiesIntro}</p>
            </Reveal>

            <RevealGroup className="mt-6 grid grid-cols-1 md:grid-cols-2">
              {WHO_WE_ARE.capabilities.map((capability) => (
                <RevealItem key={capability}>
                  <div className="flex items-center gap-3 border-t border-line py-3.5">
                    <CircleDot size={13} className="shrink-0 text-amp" aria-hidden />
                    <span className="font-body text-primary">{capability}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal delay={0.05}>
            <p className="mt-10 max-w-prose font-body text-lg leading-relaxed text-secondary">
              {WHO_WE_ARE.closing}
            </p>
          </Reveal>
        </div>
        </div>
      </Container>
    </Section>
  )
}
