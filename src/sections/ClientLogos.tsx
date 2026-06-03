import { Container } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { LogoCloud } from '../components/LogoCloud'
import { LOGO_CLOUD } from '../data/site'

/**
 * "Who We Serve" wordmark cloud, sitting directly under the Industries panels.
 * Uses honest organisation-type wordmarks (no invented client logos); swap real
 * logos in via the `src` field on each LOGO_CLOUD item when available.
 */
export function ClientLogos() {
  return (
    <section className="relative border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="eyebrow text-center">{LOGO_CLOUD.eyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-center font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.02] tracking-tighter text-primary text-balance">
            {LOGO_CLOUD.heading}
          </h2>
        </Reveal>
      </Container>

      <Reveal delay={0.05}>
        <div className="mx-auto mt-12 max-w-content px-6 md:px-12 lg:px-20">
          <LogoCloud items={LOGO_CLOUD.items} />
        </div>
      </Reveal>
    </section>
  )
}
