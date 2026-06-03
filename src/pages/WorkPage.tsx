import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { PageHero, Section, CinematicMedia, Eyebrow, CTAButton } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { PAGES } from '../data/site'
import { cn } from '../lib/util'

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

export function WorkPage() {
  const [active, setActive] = useState<string>(ALL)

  const visible = useMemo(
    () => (active === ALL ? CASES : CASES.filter((c) => c.tag === active)),
    [active],
  )

  return (
    <>
      <PageHero {...PAGES.work} seed={1} />

      <Section className="py-24 md:py-32">
        {/* Intro + representative-content note */}
        <Reveal>
          <Eyebrow index={1} total={4}>
            Case Studies
          </Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            Selected Productions
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

      {/* Closing CTA band */}
      <Section divider className="py-24 md:py-32">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface px-6 py-16 text-center md:px-16 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 60% at 50% 0%, rgba(249,192,12,0.10), transparent 70%), radial-gradient(55% 60% at 18% 100%, rgba(43,217,255,0.07), transparent 70%)',
            }}
          />
          <Reveal className="relative z-10">
            <Eyebrow className="justify-center">Start a Conversation</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-3xl text-balance font-display text-[clamp(2rem,5vw,4rem)] leading-[0.98] tracking-tighter text-primary">
              Bring your most complex story to the screen
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-secondary">
              From offshore platforms to national vision films, we make the most ambitious
              projects impossible to overlook.
            </p>
            <div className="mt-10 flex justify-center">
              <CTAButton to="/contact" icon={<ArrowRight size={16} />}>
                Discuss Your Project
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
