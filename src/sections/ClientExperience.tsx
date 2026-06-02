import { Check } from 'lucide-react'
import { Section, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { CLIENTS } from '../data/site'
import { pad } from '../lib/util'

export function ClientExperience() {
  return (
    <Section id="clients" divider className="py-24 md:py-32">
      <Reveal>
        <Eyebrow index={9} total={10}>
          Client Experience
        </Eyebrow>

        <h2 className="mt-4 max-w-4xl font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary text-balance">
          {CLIENTS.title}
        </h2>

        <p className="eyebrow mt-10">{CLIENTS.lead}</p>
      </Reveal>

      <RevealGroup className="mt-6 grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
        {CLIENTS.list.map((client, i) => (
          <RevealItem key={client}>
            <div className="group flex items-center gap-4 bg-base px-6 py-6 transition-colors duration-300 hover:bg-elevated">
              <span className="index-tag shrink-0">{pad(i + 1)}</span>
              <span className="font-display text-lg tracking-tighter text-primary transition-colors duration-300 group-hover:text-amp md:text-xl">
                {client}
              </span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Trust band: governmental gravitas, grounded in the brief's language */}
      <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
        {CLIENTS.trust.map((item) => (
          <RevealItem key={item}>
            <div className="flex h-full items-start gap-3 bg-surface px-6 py-7">
              <Check size={16} className="mt-0.5 shrink-0 text-amp" aria-hidden />
              <span className="font-body text-sm leading-relaxed text-secondary">{item}</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mt-12 max-w-3xl font-light text-2xl leading-snug text-primary md:text-3xl text-balance">
          {CLIENTS.closing}
        </p>
      </Reveal>
    </Section>
  )
}
