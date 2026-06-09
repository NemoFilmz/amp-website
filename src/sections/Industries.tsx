import { Link } from 'react-router-dom'
import { Container, CinematicMedia } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { ScrollVideoPanel } from '../components/ScrollVideo'
import { INDUSTRIES } from '../data/site'
import { industrySlug } from '../lib/util'

/**
 * Simple, cinematic industry panels: a full-bleed graded image with the
 * industry name and a one-line description. Each panel links to the Work page
 * with this industry pre-selected in the filter.
 */
export function Industries() {
  return (
    <section id="industries" className="relative scroll-mt-24">
      <div className="flex flex-col">
        {INDUSTRIES.map((industry, i) => {
          const to = `/work?industry=${industrySlug(industry.name)}`
          return industry.video ? (
            <ScrollVideoPanel
              key={industry.name}
              to={to}
              src={industry.video}
              poster={industry.poster ?? industry.image}
              name={industry.name}
              blurb={industry.blurb}
              first={i === 0}
            />
          ) : (
            <Link
              key={industry.name}
              to={to}
              aria-label={`See our ${industry.name} work`}
              className="group block"
            >
              <CinematicMedia
                src={industry.image}
                alt={industry.name}
                className="flex min-h-[58vh] items-start md:min-h-[80vh]"
              >
                {/* Smooth left-side fade: a semi-transparent dark panel that lifts text
                    contrast while the imagery stays visible through it and on the right. */}
                <div
                  aria-hidden
                  className="absolute inset-0 z-[1]"
                  style={{
                    background:
                      'linear-gradient(to right, rgba(32,33,36,0.72) 0%, rgba(32,33,36,0.42) 32%, transparent 66%)',
                  }}
                />
                {/* Localized scrim so text stays legible over bright imagery (sunset, sparks) */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 z-[1] h-2/3 bg-gradient-to-b from-base via-base/80 to-transparent"
                />
                {/* Bottom fade: blends the seam where stacked panels touch into base */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 z-[1] h-1/3 bg-gradient-to-t from-base via-base/55 to-transparent"
                />
                <Container className="relative z-10 pt-28 md:pt-32">
                  <Reveal>
                    <h3 className="font-display text-[clamp(2rem,5.8vw,4.75rem)] leading-[0.92] tracking-tighter text-primary">
                      {industry.name}
                    </h3>
                    <p className="mt-5 max-w-xl font-light text-xl leading-relaxed text-secondary md:text-2xl">
                      {industry.blurb}
                    </p>
                  </Reveal>
                </Container>
              </CinematicMedia>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
