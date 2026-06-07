import { CircleDot } from 'lucide-react'
import { Section, Eyebrow } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { Globe } from '../components/Globe'
import { ABOUT_STORY } from '../data/site'
import { cn } from '../lib/util'

/** White client logos for the credentials strip, keyed by client name.
 *  `size` is a per-logo height (some marks sit smaller within their bounds). */
const CLIENT_LOGOS: Record<string, { src: string; size: string }> = {
  ADNOC: { src: '/logos/adnoc.png', size: 'h-12 md:h-14' },
  Mubadala: { src: '/logos/mubadala.png', size: 'h-11 md:h-12' },
  Etihad: { src: '/logos/etihad.png', size: 'h-14 md:h-16' },
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

        {/* Proof strip — real client logos (a conventional "trusted by" row)
            balanced against amber award stats across a hairline band. */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-10 border-y border-line py-10 md:mt-14 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-0 md:divide-x md:divide-line">
            <div className="md:pr-16">
              <span className="font-body text-sm font-medium uppercase tracking-[0.18em] text-secondary">
                {ABOUT_STORY.clientsLabel}
              </span>
              <div className="mt-6 flex flex-wrap items-center gap-x-9 gap-y-6 md:gap-x-12">
                {ABOUT_STORY.clients.map((client) => (
                  <img
                    key={client}
                    src={CLIENT_LOGOS[client].src}
                    alt={client}
                    loading="lazy"
                    className={cn(
                      'w-auto max-w-[200px] select-none object-contain opacity-85 transition-opacity duration-300 hover:opacity-100',
                      CLIENT_LOGOS[client].size,
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-10 md:pl-16">
              {ABOUT_STORY.awards.map((award) => (
                <div key={award.label}>
                  <div className="font-display text-[clamp(2.4rem,4.2vw,3.4rem)] leading-none text-amp">
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
              <div className="md:border-l md:border-line md:pl-10 lg:pl-12">
                <h3 className="font-display text-2xl tracking-tighter text-primary md:text-3xl">
                  {ABOUT_STORY.bringIntro}
                </h3>
                <ul className="mt-8 space-y-5">
                  {ABOUT_STORY.bring.map((item) => (
                    <li key={item} className="flex items-start gap-3.5">
                      <CircleDot size={16} className="mt-1.5 shrink-0 text-amp" aria-hidden />
                      <span className="font-body text-lg leading-relaxed text-primary/90">{item}</span>
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
            International Projects
          </Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            International Projects
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 md:mt-16">
            <Globe />
          </div>
        </Reveal>
      </Section>
    </main>
  )
}
