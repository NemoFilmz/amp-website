import { Section, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { Globe, ArrowUpRight } from 'lucide-react'
import { GLOBAL_INTRO, OFFICES, GENERAL_EMAILS } from '../data/site'

export function GlobalPresence() {
  return (
    <Section id="global" divider className="relative overflow-hidden py-24 md:py-32">
      {/* Faint orbital watermark */}
      <Globe
        aria-hidden
        size={420}
        strokeWidth={0.5}
        className="pointer-events-none absolute -right-20 top-10 hidden text-line/40 md:block"
      />

      {/* Header */}
      <Reveal>
        <header className="relative max-w-2xl">
          <Eyebrow index={6} total={10}>
            Global Presence
          </Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            International Presence
          </h2>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-secondary">
            {GLOBAL_INTRO}
          </p>
        </header>
      </Reveal>

      {/* Offices */}
      <RevealGroup className="relative mt-14 grid gap-6 md:grid-cols-2">
        {OFFICES.map((office) => (
          <RevealItem key={office.city}>
            <article className="group relative h-full rounded-lg border border-line bg-surface p-8 transition-colors duration-300 hover:border-line-strong">
              <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-none tracking-tighter text-primary">
                {office.city}
                <span className="ml-2 text-muted">{office.country}</span>
              </h3>

              <p className="mt-4 font-body leading-relaxed text-secondary">
                {office.role}
              </p>

              <a
                href={`mailto:${office.email}`}
                className="mt-6 inline-flex items-center gap-2 font-body text-amp transition-colors hover:underline"
              >
                {office.email}
                <ArrowUpRight aria-hidden size={15} />
              </a>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* General emails */}
      <Reveal className="relative mt-12">
        <div className="flex flex-col gap-x-8 gap-y-2 border-t border-line pt-8 sm:flex-row sm:flex-wrap sm:items-center">
          <span className="eyebrow shrink-0">General</span>
          {GENERAL_EMAILS.map((email) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="font-body text-sm text-secondary transition-colors hover:text-amp"
            >
              {email}
            </a>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
