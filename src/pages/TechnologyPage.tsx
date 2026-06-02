import {
  Cpu,
  Layers,
  Boxes,
  Camera,
  Brain,
  Network,
  Gauge,
  Sparkles,
  Aperture,
  Monitor,
  Projector,
  Check,
  ArrowRight,
} from 'lucide-react'
import {
  PageHero,
  Section,
  Container,
  Eyebrow,
  CTAButton,
  CinematicBackdrop,
} from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { WHY_PILLARS, SERVICES, PAGES, CTA } from '../data/site'
import type { ComponentType } from 'react'

/* ------------------------------------------------------------------ */
/* Data lookups (by title / name, never by index)                     */
/* ------------------------------------------------------------------ */

const INFRASTRUCTURE_PILLAR = WHY_PILLARS.find(
  (p) => p.title === 'In-House Production Infrastructure',
)
const ASSET_PILLAR = WHY_PILLARS.find(
  (p) => p.title === 'Extensive Industrial Asset Library',
)
const AI_SERVICE = SERVICES.find((s) => s.name === 'AI Creative Production')
const VIRTUAL_SERVICE = SERVICES.find(
  (s) => s.name === 'Virtual Production & Emerging Technologies',
)

/* Icon cycle for the in-house ecosystem grid. */
const ECOSYSTEM_ICONS: ComponentType<{ size?: number; className?: string }>[] = [
  Cpu,
  Layers,
  Boxes,
  Camera,
  Brain,
  Network,
  Gauge,
]

/* Icon cycle for the virtual production capability list. */
const VP_ICONS: ComponentType<{ size?: number; className?: string }>[] = [
  Aperture,
  Monitor,
  Projector,
]

export function TechnologyPage() {
  return (
    <>
      <PageHero {...PAGES.technology} seed={2} />

      {/* ============================================================ */}
      {/* 1. IN-HOUSE PRODUCTION ECOSYSTEM                              */}
      {/* ============================================================ */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <Eyebrow index={1} total={4}>
            In-House Production Ecosystem
          </Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            One Studio, Every Pipeline Under One Roof
          </h2>
          {INFRASTRUCTURE_PILLAR?.body && (
            <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-secondary">
              {INFRASTRUCTURE_PILLAR.body}
            </p>
          )}
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {(INFRASTRUCTURE_PILLAR?.items ?? []).map((item, i) => {
            const Icon = ECOSYSTEM_ICONS[i % ECOSYSTEM_ICONS.length]
            return (
              <RevealItem
                key={item}
                className="group flex h-full flex-col gap-5 rounded-lg border border-line bg-surface p-6 transition-colors duration-300 hover:bg-elevated"
              >
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-line bg-base text-amp transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                  <Icon size={20} />
                </span>
                <span className="index-tag text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg leading-tight tracking-tighter text-primary">
                  {item}
                </h3>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </Section>

      {/* ============================================================ */}
      {/* Cinematic backdrop strip                                     */}
      {/* ============================================================ */}
      <Section container={false} className="border-t border-line">
        <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden md:h-[56vh]">
          <CinematicBackdrop seed={2} />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(8,9,11,0.45) 0%, rgba(8,9,11,0.25) 50%, rgba(8,9,11,0.92) 100%)',
            }}
          />
          <Container className="relative z-10 flex h-full flex-col justify-end pb-12 md:pb-16">
            <Reveal>
              <span className="eyebrow text-glow">Real-Time Rendering Floor</span>
              <p className="mt-4 max-w-2xl font-light text-2xl leading-snug text-primary md:text-3xl">
                Cinema-grade pipelines and deep learning compute, engineered to
                turn industrial complexity into clarity.
              </p>
            </Reveal>
          </Container>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 2. AI CREATIVE PRODUCTION                                     */}
      {/* ============================================================ */}
      {AI_SERVICE && (
        <Section divider className="py-24 md:py-32">
          <Reveal>
            <Eyebrow index={2} total={4}>
              AI Creative Production
            </Eyebrow>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Motif + description */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="relative overflow-hidden rounded-lg border border-line bg-surface">
                  <CinematicBackdrop seed={4} className="opacity-90" />
                  <div className="relative z-10 flex aspect-[4/3] flex-col items-center justify-center gap-6 p-10">
                    <span
                      aria-hidden
                      className="flex h-20 w-20 items-center justify-center rounded-2xl border border-amp/40 bg-amp/10 text-amp shadow-glow"
                    >
                      <Brain size={36} />
                    </span>
                    <Sparkles size={22} className="text-glow" aria-hidden />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h2 className="mt-8 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1] tracking-tighter text-primary">
                  {AI_SERVICE.name}
                </h2>
                <p className="mt-5 font-body text-lg leading-relaxed text-secondary">
                  {AI_SERVICE.description}
                </p>
              </Reveal>
            </div>

            {/* Capabilities list */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <span className="eyebrow">Capabilities</span>
              </Reveal>
              <RevealGroup className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
                {AI_SERVICE.capabilities.map((cap) => (
                  <RevealItem
                    key={cap}
                    className="flex items-start gap-3 bg-surface px-6 py-5 transition-colors duration-300 hover:bg-elevated"
                  >
                    <Check size={15} className="mt-1 shrink-0 text-amp" aria-hidden />
                    <span className="font-body text-secondary">{cap}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Section>
      )}

      {/* ============================================================ */}
      {/* 3. VIRTUAL PRODUCTION & EMERGING TECHNOLOGIES                 */}
      {/* ============================================================ */}
      {VIRTUAL_SERVICE && (
        <Section divider className="py-24 md:py-32">
          <Reveal>
            <Eyebrow index={3} total={4}>
              Virtual Production & Emerging Technologies
            </Eyebrow>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1] tracking-tighter text-primary">
              {VIRTUAL_SERVICE.name}
            </h2>
            <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-secondary">
              {VIRTUAL_SERVICE.description}
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {VIRTUAL_SERVICE.capabilities.map((cap, i) => {
              const Icon = VP_ICONS[i % VP_ICONS.length]
              return (
                <RevealItem
                  key={cap}
                  className="group flex h-full items-start gap-4 border border-line bg-surface p-6 transition-colors duration-300 hover:bg-elevated"
                >
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line bg-base text-glow transition-transform duration-300 group-hover:-translate-y-0.5"
                  >
                    <Icon size={18} />
                  </span>
                  <span className="font-display text-lg leading-tight tracking-tighter text-primary">
                    {cap}
                  </span>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </Section>
      )}

      {/* ============================================================ */}
      {/* 4. INDUSTRIAL ASSET LIBRARY                                   */}
      {/* ============================================================ */}
      {ASSET_PILLAR && (
        <Section divider className="py-24 md:py-32">
          <Reveal>
            <Eyebrow index={4} total={4}>
              Industrial Asset Library
            </Eyebrow>
            <h2 className="mt-4 max-w-prose font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
              {ASSET_PILLAR.title}
            </h2>
            {ASSET_PILLAR.body && (
              <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-secondary">
                {ASSET_PILLAR.body}
              </p>
            )}
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {(ASSET_PILLAR.items ?? []).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line px-4 py-2 font-body text-sm text-secondary transition-colors duration-300 hover:border-amp hover:text-amp"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      {/* ============================================================ */}
      {/* 5. CLOSING CTA BAND                                           */}
      {/* ============================================================ */}
      <Section
        container={false}
        className="relative overflow-hidden border-t border-line bg-base py-24 md:py-32"
      >
        <CinematicBackdrop seed={3} />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 0%, rgba(249,192,12,0.10), transparent 70%), linear-gradient(180deg, rgba(8,9,11,0.55) 0%, rgba(8,9,11,0.4) 45%, rgba(8,9,11,0.95) 100%)',
          }}
        />
        <Container className="relative z-10 text-center">
          <Reveal>
            <span className="eyebrow text-amp">Put the Pipeline to Work</span>
            <h2 className="mx-auto mt-5 max-w-3xl text-balance font-display text-[clamp(2rem,5vw,4rem)] leading-[0.98] tracking-tighter text-primary">
              {CTA.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-secondary">
              {CTA.body}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <CTAButton to="/contact" icon={<ArrowRight size={16} />}>
                Start a Project
              </CTAButton>
              <CTAButton to="/work" variant="outline">
                See Our Work
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
