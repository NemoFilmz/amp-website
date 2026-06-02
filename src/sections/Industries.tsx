import { Container, Eyebrow, CinematicMedia } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { INDUSTRIES, INDUSTRIES_TITLE } from '../data/site'
import { pad } from '../lib/util'

/**
 * Simple, cinematic industry panels: a full-bleed graded image with the
 * industry name and a one-line description. Scroll through, no interaction.
 */
export function Industries() {
  return (
    <section id="industries" className="relative scroll-mt-24 border-t border-line">
      <Container className="py-20 md:py-28">
        <Reveal>
          <Eyebrow index={3} total={10}>
            Industries We Serve
          </Eyebrow>
          <h2 className="mt-4 max-w-4xl font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            {INDUSTRIES_TITLE}
          </h2>
        </Reveal>
      </Container>

      <div className="flex flex-col">
        {INDUSTRIES.map((industry, i) => (
          <CinematicMedia
            key={industry.name}
            src={industry.image}
            alt={industry.name}
            className="flex min-h-[72vh] items-end md:min-h-[80vh]"
          >
            <Container className="relative z-10 pb-12 md:pb-20">
              <Reveal>
                <span className="index-tag">
                  {pad(i + 1)}
                  <span className="text-muted"> / {pad(INDUSTRIES.length)}</span>
                </span>
                <h3 className="mt-4 font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.9] tracking-tighter text-primary">
                  {industry.name}
                </h3>
                <p className="mt-5 max-w-xl font-light text-xl leading-relaxed text-secondary md:text-2xl">
                  {industry.blurb}
                </p>
              </Reveal>
            </Container>
          </CinematicMedia>
        ))}
      </div>
    </section>
  )
}
