import {
  CircleDot,
  Gauge,
  Layers,
  Boxes,
  Sparkles,
  Check,
  MapPin,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react'
import { PageHero, Section, Container, Eyebrow, TickLabel, CTAButton } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import {
  WHO_WE_ARE,
  PHILOSOPHY,
  WHY_PILLARS,
  STATS,
  OFFICES,
  PAGES,
} from '../data/site'
import { cn } from '../lib/util'

const PILLAR_ICONS = [Gauge, Layers, Boxes, Sparkles] as const

/**
 * Accent the phrase "national vision" inside the third philosophy line
 * without editing the source copy. We match case-insensitively and tint
 * the matched run AMP-yellow.
 */
const ACCENT_PHRASE = 'national vision'
function renderPhilosophyLine(line: string) {
  const idx = line.toLowerCase().indexOf(ACCENT_PHRASE)
  if (idx === -1) return line
  const before = line.slice(0, idx)
  const match = line.slice(idx, idx + ACCENT_PHRASE.length)
  const after = line.slice(idx + ACCENT_PHRASE.length)
  return (
    <>
      {before}
      <span className="text-amp">{match}</span>
      {after}
    </>
  )
}

export function AboutPage() {
  return (
    <main>
      <PageHero {...PAGES.about} seed={0} />

      {/* ---------------------------------------------------------------- */}
      {/* 1. STORY                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section className="py-24 md:py-32">
        <Reveal>
          <Eyebrow index={1} total={5}>
            Who We Are
          </Eyebrow>
        </Reveal>

        <div className="mt-10 grid gap-y-12 md:grid-cols-12 md:gap-x-16">
          {/* Lead + body */}
          <div className="md:col-span-7">
            <Reveal delay={0.04}>
              <h2 className="max-w-prose text-balance font-light text-2xl leading-snug text-primary md:text-3xl">
                {WHO_WE_ARE.lead}
              </h2>
            </Reveal>
            <div className="mt-7 space-y-6">
              {WHO_WE_ARE.body.map((paragraph, i) => (
                <Reveal key={paragraph} delay={0.08 + i * 0.04}>
                  <p className="max-w-prose font-body text-lg leading-relaxed text-secondary">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Side rail: title echo */}
          <div className="md:col-span-5">
            <Reveal delay={0.12}>
              <div className="border-l border-line pl-6 md:pl-8">
                <TickLabel>{WHO_WE_ARE.title}</TickLabel>
                <p className="mt-5 font-body text-base leading-relaxed text-muted">
                  A specialized studio where cinema, engineering understanding, and
                  AI-driven production converge for executive-level audiences.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Divider */}
        <div className="my-14 h-px w-full bg-line md:my-20" aria-hidden />

        {/* Capabilities ledger */}
        <Reveal>
          <span className="eyebrow">{WHO_WE_ARE.capabilitiesIntro}</span>
        </Reveal>
        <RevealGroup className="mt-8 grid grid-cols-1 gap-x-16 sm:grid-cols-2">
          {WHO_WE_ARE.capabilities.map((capability) => (
            <RevealItem
              key={capability}
              className="flex items-center gap-4 border-t border-line py-4"
            >
              <CircleDot size={13} className="shrink-0 text-amp" aria-hidden />
              <span className="font-body text-base text-primary">{capability}</span>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.06}>
          <p className="mt-12 max-w-2xl font-light text-xl leading-relaxed text-secondary md:mt-16">
            {WHO_WE_ARE.closing}
          </p>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 2. PHILOSOPHY                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <Eyebrow index={2} total={5}>
            Our Philosophy
          </Eyebrow>
        </Reveal>

        <RevealGroup className="mt-12 max-w-4xl space-y-2 md:mt-16 md:space-y-3">
          {PHILOSOPHY.lines.map((line) => (
            <RevealItem key={line}>
              <p className="font-display leading-[1.02] tracking-tighter text-primary text-[clamp(1.6rem,4vw,3rem)]">
                {renderPhilosophyLine(line)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-2xl font-light text-xl leading-relaxed text-secondary md:mt-16">
            {PHILOSOPHY.body}
          </p>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. CAPABILITIES + STATS                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <Eyebrow index={3} total={5}>
            Built for Complex Industries
          </Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[0.98] tracking-tighter text-primary">
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
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. GLOBAL PRESENCE                                                */}
      {/* ---------------------------------------------------------------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <Eyebrow index={4} total={5}>
            Global Presence
          </Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[0.98] tracking-tighter text-primary">
            Strategic hubs across the region and beyond
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-px bg-line md:mt-16 md:grid-cols-2">
          {OFFICES.map((office) => (
            <RevealItem key={office.city} className="bg-surface p-8 md:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl tracking-tighter text-primary md:text-4xl">
                  {office.city}
                </h3>
                <span className="font-body text-sm uppercase tracking-label text-muted">
                  {office.country}
                </span>
              </div>

              <span className="index-tag mt-4 inline-flex items-center gap-2">
                <MapPin size={13} aria-hidden />
                {office.coord}
              </span>

              <p className="mt-5 max-w-prose font-body leading-relaxed text-secondary">
                {office.role}
              </p>

              <a
                href={`mailto:${office.email}`}
                className="group/email mt-6 inline-flex items-center gap-2 font-body text-sm text-amp underline-offset-4 transition-colors hover:underline"
              >
                {office.email}
                <ArrowUpRight
                  size={15}
                  aria-hidden
                  className="transition-transform duration-300 group-hover/email:-translate-y-0.5 group-hover/email:translate-x-0.5"
                />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. CLOSING CTA BAND                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section container={false} className="relative overflow-hidden bg-surface py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 0%, rgba(249,192,12,0.10), transparent 70%), radial-gradient(55% 60% at 15% 100%, rgba(43,217,255,0.07), transparent 70%)',
          }}
        />
        <Container className="relative z-10 text-center">
          <Reveal>
            <TickLabel className="justify-center">Start the Conversation</TickLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-[clamp(2.2rem,5.5vw,4.4rem)] leading-[0.98] tracking-tighter text-primary">
              Let us build the future together
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl font-light text-xl leading-relaxed text-secondary">
              See how we turn complexity into cinematic clarity, then bring us your
              next national initiative or industrial story.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <CTAButton variant="primary" to="/work" icon={<ArrowRight size={16} />}>
                See Our Work
              </CTAButton>
              <CTAButton variant="outline" to="/contact">
                Start a Project
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  )
}
