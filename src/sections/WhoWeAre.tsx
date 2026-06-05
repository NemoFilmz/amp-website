import { CircleDot } from 'lucide-react'
import { Section, Container } from '../components/ui'
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
            'radial-gradient(115% 95% at 50% 45%, rgba(32,33,36,0.50) 0%, rgba(32,33,36,0.66) 55%, rgba(32,33,36,0.80) 100%)',
        }}
      />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left: headline, vertically centred against the right-hand content */}
        <div className="lg:col-span-5 lg:flex lg:items-center">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] uppercase leading-[0.98] tracking-tighter text-primary">
              {WHO_WE_ARE.title}
            </h2>
          </Reveal>
        </div>

        {/* Right: editorial body */}
        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <p className="font-light text-2xl leading-snug text-primary md:text-3xl">
              {WHO_WE_ARE.lead}
            </p>
          </Reveal>

          {/* Capabilities ledger */}
          <div className="mt-12">
            <RevealGroup className="grid grid-cols-1 gap-y-1 md:grid-cols-2">
              {WHO_WE_ARE.capabilities.slice(0, 6).map((capability) => (
                <RevealItem key={capability}>
                  <div className="flex items-center gap-3 py-3">
                    <CircleDot size={13} className="shrink-0 text-amp" aria-hidden />
                    <span className="font-body text-primary">{capability}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
        </div>
      </Container>
    </Section>
  )
}
