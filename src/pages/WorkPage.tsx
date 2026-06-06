import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Gauge, Layers, Boxes, Sparkles, Check } from 'lucide-react'
import { Section, CinematicMedia, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { CtaCard } from '../components/CtaCard'
import { STATS, WHY_PILLARS } from '../data/site'
import { cn, industrySlug } from '../lib/util'

/* ------------------------------------------------------------------ */
/* Representative case studies.                                        */
/* Sample content only; replace with real AMP productions.            */
/* ------------------------------------------------------------------ */

type Case = {
  title: string
  tag: string
  scope: string
  image: string
}

const CASES: Case[] = [
  {
    title: 'Offshore Field Visualization',
    tag: 'Oil & Gas',
    scope: 'Upstream operations rendered for executive review',
    image: '/placeholders/oilgas.jpg',
  },
  {
    title: 'National Vision Film',
    tag: 'Government & Culture',
    scope: 'A cinematic vision film for a national program',
    image: '/placeholders/gov.jpg',
  },
  {
    title: 'The Future of Energy',
    tag: 'Energy & Utilities',
    scope: 'Hydrogen and renewables, explained visually',
    image: '/placeholders/energy.jpg',
  },
  {
    title: 'Fleet Experience Film',
    tag: 'Aviation & Airlines',
    scope: 'Aircraft and passenger experience storytelling',
    image: '/placeholders/aviation.jpg',
  },
  {
    title: 'Mega Port Reveal',
    tag: 'Heavy Industries',
    scope: 'Maritime infrastructure brought to the screen',
    image: '/placeholders/heavy.jpg',
  },
  {
    title: 'Smart City Showcase',
    tag: 'Government & Culture',
    scope: 'An immersive smart-city development reveal',
    image: '/placeholders/gov.jpg',
  },
]

const ALL = 'All'

/* Distinct tags, in first-seen order, prefixed with the "All" filter. */
const FILTERS: string[] = [ALL, ...Array.from(new Set(CASES.map((c) => c.tag)))]

const PILLAR_ICONS = [Gauge, Layers, Boxes, Sparkles] as const

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
    () => (active === ALL ? CASES : CASES.filter((c) => c.tag === active)),
    [active],
  )

  return (
    <>
      <Section className="pt-40 pb-24 md:pt-48 md:pb-32">
        {/* Intro + representative-content note */}
        <Reveal>
          <Eyebrow index={1} total={4}>
            Case Studies
          </Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            Work
          </h2>
          <p className="eyebrow mt-6 text-muted">
            A representative selection across the sectors we serve.
          </p>
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

        {/* Case-study grid */}
        <RevealGroup
          key={active}
          className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((c) => (
            <RevealItem key={`${c.title}-${c.scope}`}>
              <Link
                to="/contact"
                aria-label={`Enquire about ${c.title}`}
                className="group relative block overflow-hidden rounded-lg"
              >
                <CinematicMedia
                  src={c.image}
                  alt={c.title}
                  className="aspect-[4/3] rounded-lg transition-transform duration-500 group-hover:scale-[1.03]"
                >
                  {/* Tag pill */}
                  <span className="absolute left-4 top-4 z-10 rounded-full border border-amp px-3 py-1 text-xs text-amp">
                    {c.tag}
                  </span>

                  {/* Bottom text block */}
                  <div className="absolute bottom-5 left-5 right-5 z-10">
                    <h3 className="font-display text-xl tracking-tighter text-primary md:text-2xl">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 font-body text-sm leading-relaxed text-secondary">
                      {c.scope}
                    </p>
                    {/* Persistent, honest affordance: these route to contact, not a case page */}
                    <span className="mt-3 inline-flex items-center gap-1.5 font-body text-[12px] font-medium uppercase tracking-label text-amp">
                      Enquire
                      <ArrowUpRight
                        size={15}
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </CinematicMedia>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
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
          {WHY_PILLARS.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i] ?? Sparkles
            return (
              <RevealItem
                key={pillar.title}
                className="group rounded-lg border border-line bg-surface p-8 transition-colors duration-300 hover:border-line-strong hover:bg-elevated"
              >
                <span
                  aria-hidden
                  className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-base text-amp transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                  <Icon size={20} />
                </span>
                <h3 className="font-display text-2xl tracking-tighter text-primary md:text-[1.75rem]">
                  {pillar.title}
                </h3>
                {pillar.body && (
                  <p className="mt-3 font-body leading-relaxed text-secondary">
                    {pillar.body}
                  </p>
                )}
                {pillar.items && (
                  <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check size={13} className="mt-1 shrink-0 text-amp" aria-hidden />
                        <span className="font-body text-sm text-secondary">{item}</span>
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
          imageSrc="/placeholders/heavy.jpg"
          title="Let's build your next story"
          description="Bring us your most technical subject. We turn it into cinematic work people can follow, and actually care about."
          inputPlaceholder="Your email"
          buttonText="Start your project"
        />
      </Section>
    </>
  )
}
