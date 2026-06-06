import { Fragment } from 'react'
import { CircleDot } from 'lucide-react'
import { Section, Container, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import TeamShowcase from '../components/TeamShowcase'
import { ABOUT_STORY, OFFICES } from '../data/site'

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

        {/* Proof strip — clients + awards as balanced credentials in a
            hairline band: legible labels, display-weight values both sides. */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-10 border-y border-line py-10 md:mt-14 md:grid-cols-[1.25fr_1fr] md:items-center md:gap-0 md:divide-x md:divide-line">
            <div className="md:pr-16">
              <span className="font-body text-sm font-medium uppercase tracking-[0.18em] text-secondary">
                {ABOUT_STORY.clientsLabel}
              </span>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                {ABOUT_STORY.clients.map((client, i) => (
                  <Fragment key={client}>
                    {i > 0 && (
                      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-amp" />
                    )}
                    <span className="font-display text-[clamp(1.5rem,2.3vw,2rem)] uppercase leading-none tracking-tight text-primary">
                      {client}
                    </span>
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="flex gap-10 md:pl-16">
              {ABOUT_STORY.awards.map((award) => (
                <div key={award.label}>
                  <div className="font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-none text-amp">
                    {award.value}
                  </div>
                  <div className="mt-2.5 font-body text-[13px] uppercase leading-snug tracking-[0.1em] text-secondary">
                    {award.label}
                  </div>
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
      {/* 2. INTERNATIONAL PRESENCE                                         */}
      {/* ---------------------------------------------------------------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <Eyebrow index={3} total={5}>
            International Presence
          </Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            International Presence
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-px bg-line md:mt-16 md:grid-cols-2">
          {OFFICES.map((office) => (
            <RevealItem
              key={office.city}
              className="group relative flex flex-col overflow-hidden bg-surface p-8 md:p-10"
            >
              {office.image && (
                <>
                  <img
                    src={office.image}
                    alt=""
                    aria-hidden
                    style={{ objectPosition: office.imagePosition ?? '50% 55%' }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to bottom, rgba(32,33,36,0.95) 0%, rgba(32,33,36,0.72) 50%, rgba(32,33,36,0.42) 100%)',
                    }}
                  />
                </>
              )}
              <div className="relative z-10">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-3xl tracking-tighter text-primary md:text-4xl">
                    {office.city}
                  </h3>
                  <span className="font-body text-sm uppercase tracking-label text-primary/70">
                    {office.country}
                  </span>
                </div>

                <p className="mt-5 max-w-prose font-body leading-relaxed text-primary/90">
                  {office.role}
                </p>

                {office.comingSoon && (
                  <span className="mt-6 inline-flex items-center gap-2 font-body text-sm uppercase tracking-label text-primary/80">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amp" />
                    Coming soon
                  </span>
                )}
              </div>
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
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] tracking-tighter text-primary">
              Meet the team in ACTI<span className="text-amp">ON</span>
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
