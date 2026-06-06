import { CircleDot, ArrowUpRight } from 'lucide-react'
import { Section, Container, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import TeamShowcase from '../components/TeamShowcase'
import { ABOUT_STORY, PHILOSOPHY, OFFICES } from '../data/site'

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
    <main className="pt-12 md:pt-16">
      {/* ---------------------------------------------------------------- */}
      {/* 1. STORY                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section className="py-24 md:py-32">
        {/* Identity headline — who AMP is; the intro answers it */}
        <Reveal>
          <h2 className="max-w-4xl text-balance font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02] tracking-tighter text-primary">
            Who we are
          </h2>
        </Reveal>

        {/* Lead — sets context, clearly between headline and body */}
        <Reveal delay={0.05}>
          <p className="mt-8 max-w-3xl font-light text-xl leading-snug text-primary md:text-2xl">
            {ABOUT_STORY.intro}
          </p>
        </Reveal>

        {/* Proof strip — clients + awards pulled out of the prose so they read
            at a glance (chunking) and the awards isolate as credentials. */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-14 md:grid-cols-2">
            <div className="bg-surface p-7 md:p-9">
              <span className="eyebrow">{ABOUT_STORY.clientsLabel}</span>
              <ul className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
                {ABOUT_STORY.clients.map((client) => (
                  <li
                    key={client}
                    className="font-display text-2xl tracking-tighter text-primary md:text-[1.7rem]"
                  >
                    {client}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 divide-x divide-line">
              {ABOUT_STORY.awards.map((award) => (
                <div key={award.label} className="bg-surface p-7 md:p-9">
                  <div className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] leading-none text-amp">
                    {award.value}
                  </div>
                  <div className="eyebrow mt-2.5">{award.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Core idea — heads the narrative that explains how we work */}
        <Reveal delay={0.05}>
          <h3 className="mt-16 max-w-3xl text-balance font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.05] tracking-tighter text-primary md:mt-20">
            We make complicated things{' '}
            <span className="text-amp">easy to understand.</span>
          </h3>
        </Reveal>

        {/* Narrative (read) on the left; capabilities (scan) as a sidebar on the right */}
        <div className="mt-8 grid gap-y-12 md:mt-10 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-7">
            <div className="space-y-6">
              {ABOUT_STORY.paragraphs.map((paragraph, i) => (
                <Reveal key={paragraph} delay={0.06 + i * 0.04}>
                  <p className="max-w-prose font-body text-lg leading-relaxed text-primary/90">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={0.1}>
              <div className="md:border-l md:border-line md:pl-10">
                <h3 className="font-display text-xl tracking-tighter text-primary">
                  {ABOUT_STORY.bringIntro}
                </h3>
                <ul className="mt-6 space-y-4">
                  {ABOUT_STORY.bring.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CircleDot size={13} className="mt-1.5 shrink-0 text-amp" aria-hidden />
                      <span className="font-body text-primary/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
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
              <p className="font-display leading-[1.1] tracking-tighter text-primary text-[clamp(1.4rem,3vw,2.4rem)]">
                {renderPhilosophyLine(line)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. GLOBAL PRESENCE                                                */}
      {/* ---------------------------------------------------------------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <Eyebrow index={3} total={5}>
            Global Presence
          </Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
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
      {/* 4. TEAM                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section container={false} divider className="py-24 md:py-32">
        <Container>
          <Reveal>
            <h2 className="max-w-prose font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
              The people behind the work
            </h2>
          </Reveal>
        </Container>
        <div className="mt-12 md:mt-16">
          <TeamShowcase />
        </div>
      </Section>

    </main>
  )
}
