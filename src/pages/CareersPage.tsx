import {
  ArrowUpRight,
  Film,
  GraduationCap,
  Cpu,
  Wand2,
  Layers,
  Brain,
  HardHat,
  Check,
  Send,
} from 'lucide-react'
import { PageHero, Section, Eyebrow, CTAButton } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { WHY_PILLARS, PAGES } from '../data/site'
import { cn } from '../lib/util'

const CAREERS_EMAIL = 'careers@actionmpro.com'

/* The team-disciplines pillar from the brief, reused verbatim. */
const DISCIPLINES_PILLAR =
  WHY_PILLARS.find((p) => p.title === 'Artistic + Technical Excellence') ?? WHY_PILLARS[0]

/* Icon per discipline, aligned to the order of the pillar's items. */
const DISCIPLINE_ICONS = [
  Film, // Cinema production expertise
  GraduationCap, // Academic art backgrounds
  Cpu, // Technology-focused creators
  Layers, // Industrial visualization specialists
  Wand2, // Creative directors
  Brain, // AI artists
  HardHat, // Engineers and technical consultants
] as const

/*
 * Representative roles only. These are sample postings used to demonstrate the
 * layout and are not live vacancies. Replace with real openings when published.
 */
type Role = { title: string; discipline: string }

const ROLES: Role[] = [
  { title: '3D Animator', discipline: 'Animation' },
  { title: 'AI Production Artist', discipline: 'AI' },
  { title: 'Creative Director', discipline: 'Creative' },
  { title: 'Industrial Visualization Specialist', discipline: 'Visualization' },
  { title: 'Technical Pipeline Engineer', discipline: 'Engineering' },
  { title: 'Producer', discipline: 'Production' },
]

function applyHref(role: Role): string {
  const subject = encodeURIComponent(`Application: ${role.title} (${role.discipline})`)
  const body = encodeURIComponent(
    `Hello AMP team,\n\nI would like to apply for the ${role.title} role.\n\n`,
  )
  return `mailto:${CAREERS_EMAIL}?subject=${subject}&body=${body}`
}

export function CareersPage() {
  return (
    <>
      <PageHero {...PAGES.careers} seed={4} />

      {/* ---------- 1. WHY JOIN ---------- */}
      <Section className="py-24 md:py-32">
        <Reveal>
          <Eyebrow index={1} total={4}>
            Why AMP
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-7 max-w-4xl text-balance font-light text-2xl leading-snug text-primary md:text-3xl md:leading-snug">
            At AMP, cinema, academic art, technology, and engineering work in the same room. We
            build photorealistic worlds that are technically accurate and emotionally powerful, and
            we look for people who want their craft to shape how complex industries and national
            visions are understood.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-secondary">
            You work alongside filmmakers, 3D artists, AI creators, visualization specialists, and
            technical consultants on an in-house production ecosystem, turning operational and
            industrial complexity into clarity audiences remember.
          </p>
        </Reveal>
      </Section>

      {/* ---------- 2. DISCIPLINES ---------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <Eyebrow index={2} total={4}>
            The Disciplines We Bring Together
          </Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[0.98] tracking-tighter text-primary">
            One team, many crafts
          </h2>
          {DISCIPLINES_PILLAR.body && (
            <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-secondary">
              {DISCIPLINES_PILLAR.body}
            </p>
          )}
        </Reveal>

        <RevealGroup className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {(DISCIPLINES_PILLAR.items ?? []).map((item, i) => {
            const Icon = DISCIPLINE_ICONS[i] ?? Layers
            return (
              <RevealItem
                key={item}
                className="group flex items-start gap-5 bg-surface p-8 transition-colors duration-300 hover:bg-elevated md:p-10"
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-amp transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="font-display text-xl leading-tight tracking-tighter text-primary md:text-2xl">
                    {item}
                  </h3>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </Section>

      {/* ---------- 3. OPEN ROLES ---------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <Eyebrow index={3} total={4}>
            Open Roles
          </Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[0.98] tracking-tighter text-primary">
            Where your craft fits
          </h2>
          <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 font-body text-sm text-muted">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-amp" />
            Sample roles. Replace with live openings.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 border-b border-line">
          {ROLES.map((role) => (
            <RevealItem key={role.title}>
              <a
                href={applyHref(role)}
                className={cn(
                  'group grid grid-cols-1 items-center gap-4 border-t border-line py-6',
                  'sm:grid-cols-[1fr_auto_auto] sm:gap-8',
                  'transition-colors duration-300 hover:bg-surface',
                )}
              >
                <h3 className="font-display text-xl leading-tight tracking-tighter text-primary transition-colors duration-300 group-hover:text-amp md:text-2xl">
                  {role.title}
                </h3>

                <span className="font-body text-[11px] uppercase tracking-label text-secondary sm:justify-self-end">
                  {role.discipline}
                </span>

                <span className="inline-flex items-center gap-2 font-body text-[14px] uppercase tracking-label text-amp sm:justify-self-end">
                  Apply
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'In-house production ecosystem',
              'Cinema, AI, and engineering under one roof',
              'Real industrial and government projects',
            ].map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <Check size={13} aria-hidden className="mt-1 shrink-0 text-amp" />
                <span className="font-body text-sm text-secondary">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* ---------- 4. CLOSING CTA BAND ---------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-elevated px-8 py-14 text-center md:px-16 md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(60% 60% at 50% 0%, rgba(249,192,12,0.10), transparent 70%), radial-gradient(55% 70% at 18% 100%, rgba(43,217,255,0.07), transparent 70%)',
              }}
            />
            <div className="relative z-10">
              <h2 className="mx-auto max-w-3xl text-balance font-display text-[clamp(1.9rem,4.5vw,3.4rem)] leading-[1] tracking-tighter text-primary">
                Do not see your role? Introduce yourself.
              </h2>
              <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-secondary">
                Send your portfolio and the kind of work you want to make. We are always interested
                in cinematic, technical, and AI-driven talent.
              </p>
              <div className="mt-9 flex justify-center">
                <CTAButton
                  href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
                    'Introduction and portfolio',
                  )}`}
                  variant="primary"
                  icon={<Send size={16} />}
                >
                  Email Our Talent Team
                </CTAButton>
              </div>
              <p className="mt-6 font-body text-sm text-muted">
                Or write to us directly at{' '}
                <a
                  href={`mailto:${CAREERS_EMAIL}`}
                  className="text-secondary underline-offset-4 transition-colors hover:text-amp"
                >
                  {CAREERS_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
