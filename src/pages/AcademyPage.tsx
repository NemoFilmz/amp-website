import {
  Check,
  Star,
  Hotel,
  Brain,
  Boxes,
  Landmark,
  Clapperboard,
  Wand2,
  Calendar,
  GraduationCap,
  ArrowRight,
  Send,
} from 'lucide-react'
import { PageHero, Section, Container, Eyebrow, CTAButton } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { ACADEMY, PAGES } from '../data/site'
import { cn } from '../lib/util'

const ACADEMY_EMAIL = 'academy@actionmpro.com'

/* Icon mapped to each learning track by index. */
const TRACK_ICONS = [Brain, Boxes, Landmark, Clapperboard, Wand2] as const

/** A single amp-ticked list item: yellow check + body copy. */
function Ticked({ children, className }: { children: string; className?: string }) {
  return (
    <li className={cn('flex items-start gap-3', className)}>
      <Check size={14} className="mt-1 shrink-0 text-amp" aria-hidden />
      <span className="font-body text-secondary">{children}</span>
    </li>
  )
}

/** A thin gold rule placed under a section eyebrow to keep the Academy gold accent. */
function AmpRule({ className }: { className?: string }) {
  return <span aria-hidden className={cn('mt-5 block h-px w-16 bg-amp', className)} />
}

export function AcademyPage() {
  return (
    <>
      <PageHero {...PAGES.academy} seed={3} />

      {/* ---------- 1. Intro + What you'll learn ---------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <Eyebrow index={1} total={5}>
            {ACADEMY.wordmark}
          </Eyebrow>
          <AmpRule />
          <p className="mt-8 font-light text-xl leading-relaxed text-secondary md:text-2xl">
            {ACADEMY.question}
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.9rem,4.5vw,3.4rem)] leading-[1.0] tracking-tighter text-primary">
            {ACADEMY.title}
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 max-w-prose space-y-5">
            {ACADEMY.intro.map((paragraph) => (
              <p key={paragraph} className="font-body text-lg leading-relaxed text-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {/* What you'll learn */}
        <Reveal>
          <p className="eyebrow mt-16">{ACADEMY.learnLead}</p>
        </Reveal>
        <RevealGroup className="mt-6 grid gap-x-10 gap-y-3.5 md:grid-cols-2">
          {ACADEMY.learn.map((item) => (
            <RevealItem key={item}>
              <div className="flex items-start gap-3">
                <Check size={14} className="mt-1 shrink-0 text-amp" aria-hidden />
                <span className="font-body text-secondary">{item}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- 2. Weekend Intensive ---------- */}
      <Section className="py-24 md:py-32">
        <Reveal>
          <Eyebrow index={2} total={5}>
            Weekend Intensive
          </Eyebrow>
          <AmpRule />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 rounded-xl border border-line bg-surface p-8 md:p-12">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-amp/40 bg-elevated">
                <Calendar size={22} className="text-amp" aria-hidden />
              </span>
            </div>

            <h3 className="mt-6 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.02] tracking-tighter text-primary">
              {ACADEMY.weekend.title}
            </h3>
            <p className="eyebrow mt-3">{ACADEMY.weekend.subtitle}</p>
            <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-secondary">
              {ACADEMY.weekend.lead}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {ACADEMY.weekend.days.map((day) => (
                <span
                  key={day}
                  className="rounded-full border border-amp px-5 py-2 font-body text-sm text-amp"
                >
                  {day}
                </span>
              ))}
            </div>

            <p className="eyebrow mt-10">{ACADEMY.weekend.experienceLead}</p>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {ACADEMY.weekend.experience.map((item) => (
                <Ticked key={item} className="text-sm">
                  {item}
                </Ticked>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* ---------- 3. Luxury Creative Experience ---------- */}
      <Section className="py-24 md:py-32">
        <Reveal>
          <Eyebrow index={3} total={5}>
            Luxury Experience
          </Eyebrow>
          <AmpRule />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="relative mt-10 overflow-hidden rounded-xl border border-line bg-surface p-8 shadow-glow md:p-12">
            {/* faint corner glow for a 5-star feel */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amp/10 blur-3xl"
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

              <h3 className="mt-6 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.02] tracking-tighter text-primary">
                {ACADEMY.luxury.title}
              </h3>
              <p className="eyebrow mt-3">{ACADEMY.luxury.subtitle}</p>
              <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-secondary">
                {ACADEMY.luxury.lead}
              </p>

              <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {ACADEMY.luxury.perks.map((perk) => (
                  <Ticked key={perk}>{perk}</Ticked>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ---------- 4. Tracks ---------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <Eyebrow index={4} total={5}>
            Academy Tracks
          </Eyebrow>
          <AmpRule />
          <h2 className="mt-7 max-w-2xl font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.0] tracking-tighter text-primary">
            Specialized paths through real production
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACADEMY.tracks.map((track, i) => {
            const Icon = TRACK_ICONS[i] ?? Brain
            return (
              <RevealItem key={track.name}>
                <article className="group h-full rounded-lg border border-line bg-surface p-7 transition-colors duration-300 hover:border-amp">
                  <Icon
                    size={22}
                    className="mb-5 text-amp transition-transform duration-300 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                  <h3 className="font-display text-xl tracking-tighter text-primary">
                    {track.name}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-secondary">
                    {track.desc}
                  </p>
                </article>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </Section>

      {/* ---------- 5. Booking CTA band ---------- */}
      <Section
        container={false}
        className="relative overflow-hidden bg-base py-28 md:py-36"
      >
        {/* Gold bracket bars top and bottom for the Academy gold-accent feel */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-amp" />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-amp" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 50% at 50% 0%, rgba(249,192,12,0.12), transparent 70%), radial-gradient(50% 60% at 16% 95%, rgba(43,217,255,0.06), transparent 70%)',
          }}
        />

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-amp/40 bg-elevated">
                <GraduationCap size={26} className="text-amp" aria-hidden />
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="eyebrow mt-8 justify-center text-center">{ACADEMY.wordmark}</p>
              <h2 className="mt-4 text-balance font-display text-[clamp(2.2rem,5.5vw,4.4rem)] leading-[0.98] tracking-tighter text-primary">
                Reserve Your Seat
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-secondary">
                Seats for each Weekend Intensive are limited to keep the experience close to the
                work. Request a seat and our team will share the next available production
                masterclass and the full program details.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <CTAButton
                  variant="primary"
                  to="/contact"
                  icon={<ArrowRight size={16} aria-hidden />}
                >
                  Request a Seat
                </CTAButton>
                <CTAButton
                  variant="outline"
                  href={`mailto:${ACADEMY_EMAIL}`}
                  icon={<Send size={15} aria-hidden />}
                >
                  Email the Academy
                </CTAButton>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 font-body text-sm text-muted">
                Or write to us directly at{' '}
                <a
                  href={`mailto:${ACADEMY_EMAIL}`}
                  className="text-secondary underline-offset-4 transition-colors hover:text-amp"
                >
                  {ACADEMY_EMAIL}
                </a>
                .
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
