import { Gauge, Layers, Boxes, Sparkles, Check } from 'lucide-react'
import { Section, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { WHY_TITLE, WHY_PILLARS, STATS } from '../data/site'
import { cn } from '../lib/util'

const PILLAR_ICONS = [Gauge, Layers, Boxes, Sparkles] as const

export function WhyAmp() {
  return (
    <Section id="why" divider className="py-24 md:py-32">
      {/* Header */}
      <Reveal>
        <Eyebrow index={5} total={10}>
          Why AMP
        </Eyebrow>
        <h2 className="mt-4 max-w-prose font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
          {WHY_TITLE}
        </h2>
      </Reveal>

      {/* Stat strip */}
      <RevealGroup className="mt-12 grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <RevealItem
            key={stat.label}
            className={cn(
              'border-line pl-5',
              // mobile (2-col): border except first in each row; desktop (4-col): border except first of four
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

      {/* Pillars */}
      <RevealGroup className="mt-16 grid gap-px bg-line md:mt-24 md:grid-cols-2">
        {WHY_PILLARS.map((pillar, i) => {
          const Icon = PILLAR_ICONS[i] ?? Sparkles
          return (
            <RevealItem
              key={pillar.title}
              className="group bg-surface p-8 transition-colors duration-300 hover:bg-elevated md:p-10"
            >
              <Icon
                size={22}
                aria-hidden
                className="mb-6 text-amp transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <h3 className="font-display text-2xl tracking-tighter text-primary md:text-[1.75rem]">
                {pillar.title}
              </h3>
              {pillar.body && (
                <p className="mt-3 font-body leading-relaxed text-secondary">{pillar.body}</p>
              )}
              {pillar.items && (
                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={13} className="mt-1 shrink-0 text-amp" aria-hidden />
                      <span className="text-sm text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </RevealItem>
          )
        })}
      </RevealGroup>
    </Section>
  )
}
