import { CircleDot } from 'lucide-react'
import { Section, Eyebrow } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { Globe } from '../components/Globe'
import { Award } from '../components/Awards'
import { ABOUT_STORY } from '../data/site'

/** AMP's global awards — MUSE and NYX, grouped by programme, one laurel per tier. */
const AWARD_GROUPS = [
  {
    label: 'MUSE Creative Awards',
    awards: [
      { title: '7+', tier: 'Platinum', level: 'platinum' as const },
      { title: '5+', tier: 'Gold', level: 'gold' as const },
      { title: '1+', tier: 'Silver', level: 'silver' as const },
    ],
  },
  {
    label: 'NYX Awards',
    awards: [
      { title: '2+', tier: 'Grand', level: 'platinum' as const },
      { title: '1+', tier: 'Gold', level: 'gold' as const },
      { title: '2+', tier: 'Silver', level: 'silver' as const },
    ],
  },
]

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
      {/* 2. AWARDS & RECOGNITION                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <h2 className="max-w-prose font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            Awards &amp; recognition
          </h2>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-primary/90">
            Our work has been recognised among the best in the world, judged on craft,
            originality, and impact.
          </p>
        </Reveal>

        <div className="mt-12 space-y-12 md:mt-16 md:space-y-14">
          {AWARD_GROUPS.map((group, gi) => (
            <Reveal key={group.label} delay={0.05 + gi * 0.05}>
              <h3 className="text-center font-body text-sm font-semibold uppercase tracking-[0.2em] text-amp">
                {group.label}
              </h3>
              <div className="mt-2 flex flex-wrap items-start justify-center gap-x-6 gap-y-4 md:gap-x-12">
                {group.awards.map((award) => (
                  <Award key={`${group.label}-${award.tier}`} {...award} className="w-56" />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. INTERNATIONAL PRESENCE                                         */}
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
