import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Section, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { CtaCard } from '../components/CtaCard'
import { STATS, WHY_PILLARS } from '../data/site'
import { PROJECTS } from '../data/projects'
import { cn, industrySlug } from '../lib/util'

const ALL = 'All'

/* Filter by industry, matching the home industry panels (and their deep-links). */
const FILTERS: string[] = [
  ALL,
  'Government & Culture',
  'Oil & Gas',
  'Energy & Utilities',
  'Aviation & Airlines',
  'Heavy Industries',
]

export function WorkPage() {
  const [searchParams] = useSearchParams()

  // The home industry panels link here as /work?industry=<slug>; map that slug
  // back to the matching filter so the right industry arrives pre-selected.
  const fromParam = useMemo(() => {
    const slug = searchParams.get('industry')
    if (!slug) return ALL
    return FILTERS.find((f) => industrySlug(f) === slug) ?? ALL
  }, [searchParams])

  const [active, setActive] = useState<string>(fromParam)

  // Keep the selection in sync when arriving with (or changing) the param.
  useEffect(() => {
    setActive(fromParam)
  }, [fromParam])

  const visible = useMemo(
    () => (active === ALL ? PROJECTS : PROJECTS.filter((p) => p.industries.includes(active))),
    [active],
  )

  return (
    <>
      <Section className="pt-40 pb-24 md:pt-48 md:pb-32">
        {/* Intro + representative-content note */}
        <Reveal>
          <Eyebrow index={1} total={4}>
            Selected Work
          </Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            Work
          </h2>
        </Reveal>

        {/* Industry filter row */}
        <Reveal delay={0.05}>
          <div
            role="group"
            aria-label="Filter case studies by industry"
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {FILTERS.map((filter) => {
              const isActive = filter === active
              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(filter)}
                  className={cn(
                    'rounded-full border px-4 py-2 font-body text-xs uppercase tracking-label transition-colors duration-300',
                    isActive
                      ? 'border-amp bg-amp/10 text-amp'
                      : 'border-line text-secondary hover:border-line-strong hover:text-primary',
                  )}
                >
                  {filter}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Project grid — plain (no scroll-reveal gating, which fails on a
            very tall grid where the in-view threshold can never be met). */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <div
              key={`${p.image}-${i}`}
              className="group relative block aspect-[3/2] overflow-hidden rounded-2xl border border-line"
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(32,33,36,0.92) 0%, rgba(32,33,36,0.25) 48%, rgba(32,33,36,0) 100%)',
                }}
              />
              {p.industries[0] && (
                <span className="absolute left-4 top-4 z-10 rounded-full border border-amp/70 bg-base/40 px-3 py-1 font-body text-[11px] uppercase tracking-label text-amp backdrop-blur-sm">
                  {p.industries[0]}
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                <h3 className="font-display text-lg leading-tight tracking-tighter text-primary md:text-xl">
                  {p.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Ecosystem + closing CTA — one section (moved from the About page) */}
      {/* Plain background, matching the other pages.                       */}
      {/* ---------------------------------------------------------------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <Eyebrow>Built for Complex Industries</Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            A complete ecosystem behind every frame
          </h2>
        </Reveal>

        {/* Stat strip */}
        <RevealGroup className="mt-12 grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <RevealItem
              key={stat.label}
              className={cn(
                'border-line pl-5',
                i % 2 === 1 ? 'border-l' : 'border-l-0',
                i % 4 === 0 ? 'md:border-l-0' : 'md:border-l',
              )}
            >
              <div className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-none text-amp">
                {stat.value}
              </div>
              <div className="eyebrow mt-2">{stat.label}</div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Pillar cards */}
        <RevealGroup className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2">
          {WHY_PILLARS.map((pillar) => {
            return (
              <RevealItem
                key={pillar.title}
                className="group rounded-2xl border border-line bg-surface p-8 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-line-strong hover:bg-elevated hover:shadow-xl hover:shadow-black/30"
              >
                <h3 className="font-display text-2xl tracking-tighter text-primary md:text-[1.75rem]">
                  {pillar.title}
                </h3>
                {pillar.body && (
                  <p className="mt-3 font-body leading-relaxed text-primary/90">
                    {pillar.body}
                  </p>
                )}
                {pillar.items && (
                  <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check size={13} className="mt-1 shrink-0 text-amp" aria-hidden />
                        <span className="font-body text-sm text-primary/85">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </RevealItem>
            )
          })}
        </RevealGroup>

        {/* Closing CTA — kept in this section so it reads as one page */}
        <CtaCard
          className="mt-16 md:mt-20"
          imageSrc="/placeholders/cta-rig.jpg"
          title="Let's build your next story"
          description="Bring us your most technical subject. We turn it into cinematic work people can follow, and actually care about."
          inputPlaceholder="Your email"
          buttonText="Start your project"
        />
      </Section>
    </>
  )
}
