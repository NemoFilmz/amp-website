import { Container, CinematicMedia } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { ScrollVideoPanel } from '../components/ScrollVideo'
import { INDUSTRIES } from '../data/site'

/**
 * Simple, cinematic industry panels: a full-bleed graded image with the
 * industry name and a one-line description. Scroll through, no interaction.
 */
export function Industries() {
  return (
    <section id="industries" className="relative scroll-mt-24 border-t border-line">
      <div className="flex flex-col">
        {INDUSTRIES.map((industry) =>
          industry.video ? (
            <ScrollVideoPanel
              key={industry.name}
              src={industry.video}
              poster={industry.poster ?? industry.image}
              name={industry.name}
              blurb={industry.blurb}
            />
          ) : (
            <CinematicMedia
              key={industry.name}
              src={industry.image}
              alt={industry.name}
              className="flex min-h-[58vh] items-end md:min-h-[80vh]"
            >
              {/* Localized scrim so text stays legible over bright imagery (sunset, sparks) */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 z-[1] h-2/3 bg-gradient-to-t from-base via-base/80 to-transparent"
              />
              <Container className="relative z-10 pb-12 md:pb-20">
                <Reveal>
                  <h3 className="font-display text-[clamp(2rem,7vw,5.5rem)] leading-[0.92] tracking-tighter text-primary">
                    {industry.name}
                  </h3>
                  <p className="mt-5 max-w-xl font-light text-xl leading-relaxed text-secondary md:text-2xl">
                    {industry.blurb}
                  </p>
                </Reveal>
              </Container>
            </CinematicMedia>
          ),
        )}
      </div>
    </section>
  )
}
