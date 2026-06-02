import {
  Check,
  Star,
  Hotel,
  Brain,
  Boxes,
  Landmark,
  Clapperboard,
  Wand2,
  ArrowRight,
} from 'lucide-react'
import { Section, CTAButton, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { cn } from '../lib/util'
import { ACADEMY } from '../data/site'

/* Icon mapped to each learning track by index. */
const trackIcons = [Brain, Boxes, Landmark, Clapperboard, Wand2] as const

/* A single amp-ticked list item: yellow check + body copy. */
function Ticked({ children, className }: { children: string; className?: string }) {
  return (
    <li className={cn('flex items-start gap-3', className)}>
      <Check size={14} className="mt-1 shrink-0 text-amp" aria-hidden />
      <span className="font-body text-secondary">{children}</span>
    </li>
  )
}

export function Academy() {
  return (
    <Section
      id="academy"
      container={false}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Gold bracket bars top and bottom */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-amp" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-amp" />

      <div className="mx-auto w-full max-w-content px-6 md:px-12 lg:px-20">
        {/* ---------- Header ---------- */}
        <Reveal>
          <header>
            <Eyebrow index={8} total={10} className="mb-6">
              Academy
            </Eyebrow>
            <h2 className="sr-only">{ACADEMY.wordmark}</h2>
            <p
              aria-hidden
              className="font-display text-[clamp(2.2rem,5.5vw,4.4rem)] leading-none tracking-tighter text-amp"
            >
              {ACADEMY.wordmark}
            </p>
            <span aria-hidden className="mt-5 block h-[2px] w-24 bg-amp" />

            <p className="mt-8 font-light text-xl text-secondary md:text-2xl">
              {ACADEMY.question}
            </p>
            <p className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] tracking-tighter text-primary">
              {ACADEMY.title}
            </p>
          </header>
        </Reveal>

        {/* ---------- Intro ---------- */}
        <Reveal delay={0.05}>
          <div className="mt-8 max-w-prose space-y-5">
            {ACADEMY.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="font-body text-lg leading-relaxed text-secondary"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {/* ---------- What you'll learn ---------- */}
        <Reveal>
          <p className="eyebrow mt-16">{ACADEMY.learnLead}</p>
        </Reveal>
        <RevealGroup className="mt-6 grid gap-x-10 gap-y-3 md:grid-cols-2">
          {ACADEMY.learn.map((item) => (
            <RevealItem key={item}>
              <div className="flex items-start gap-3">
                <Check size={14} className="mt-1 shrink-0 text-amp" aria-hidden />
                <span className="font-body text-secondary">{item}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ---------- Weekend Intensive ---------- */}
        <Reveal>
          <div className="mt-16 rounded-xl border border-line bg-surface p-8 md:p-10">
            <h3 className="font-display text-2xl tracking-tighter text-primary md:text-3xl">
              {ACADEMY.weekend.title}
            </h3>
            <p className="eyebrow mt-2">{ACADEMY.weekend.subtitle}</p>
            <p className="mt-4 max-w-2xl font-body leading-relaxed text-secondary">
              {ACADEMY.weekend.lead}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {ACADEMY.weekend.days.map((day) => (
                <span
                  key={day}
                  className="rounded-full border border-amp px-5 py-2 font-body text-sm text-amp"
                >
                  {day}
                </span>
              ))}
            </div>

            <p className="eyebrow mt-8">{ACADEMY.weekend.experienceLead}</p>
            <ul className="mt-4 grid gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {ACADEMY.weekend.experience.map((item) => (
                <Ticked key={item} className="text-sm">
                  {item}
                </Ticked>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ---------- Luxury Creative Experience ---------- */}
        <Reveal>
          <div className="relative mt-8 overflow-hidden rounded-xl border border-line bg-surface p-8 shadow-glow md:p-10">
            {/* faint corner glow for a 5-star feel */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amp/10 blur-3xl"
            />
            <div className="relative">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-amp/40 bg-elevated">
                  <Hotel size={22} className="text-amp" aria-hidden />
                </span>
                <span aria-hidden className="flex items-center gap-1.5 text-amp">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl tracking-tighter text-primary md:text-3xl">
                {ACADEMY.luxury.title}
              </h3>
              <p className="eyebrow mt-2">{ACADEMY.luxury.subtitle}</p>
              <p className="mt-4 max-w-2xl font-body leading-relaxed text-secondary">
                {ACADEMY.luxury.lead}
              </p>

              <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {ACADEMY.luxury.perks.map((perk) => (
                  <Ticked key={perk}>{perk}</Ticked>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ---------- Tracks ---------- */}
        <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACADEMY.tracks.map((track, i) => {
            const Icon = trackIcons[i] ?? Brain
            return (
              <RevealItem key={track.name}>
                <article className="group h-full rounded-lg border border-line bg-surface p-6 transition-colors duration-300 hover:border-amp">
                  <Icon size={22} className="mb-5 text-amp" aria-hidden />
                  <h3 className="font-display text-xl tracking-tighter text-primary">
                    {track.name}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-secondary">
                    {track.desc}
                  </p>
                </article>
              </RevealItem>
            )
          })}
        </RevealGroup>

        {/* ---------- CTA ---------- */}
        <Reveal>
          <div className="mt-14 flex flex-wrap gap-3">
            <CTAButton
              variant="primary"
              href="#contact"
              icon={<ArrowRight size={16} aria-hidden />}
            >
              Join AMP Academy
            </CTAButton>
            <CTAButton variant="outline" href="#contact">
              Discover AMP Academy
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
