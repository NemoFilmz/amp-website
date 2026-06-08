import { useState, type FormEvent } from 'react'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import { Section, Container } from '../components/ui'
import { Reveal } from '../components/Reveal'

const EMAIL = 'ayman@actionmpro.com'

/** Contact info columns (Address / Phone / E-mail), matching the reference layout. */
const INFO = [
  {
    icon: MapPin,
    label: 'Studio',
    lines: ['Abu Dhabi, United Arab Emirates', 'Dubai · Riyadh · Barcelona'],
  },
  {
    icon: Phone,
    label: 'Phone',
    lines: ['+971 50 322 2003'],
    href: 'tel:+971503222003',
  },
  {
    icon: Mail,
    label: 'E-mail',
    lines: [EMAIL],
    href: `mailto:${EMAIL}`,
  },
]

/** A faint, AMP-styled "map" texture with a location pin, sitting on the right. */
function MapTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] md:block"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 38%, #000 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, #000 38%, #000 100%)',
      }}
    >
      <svg className="h-full w-full" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse">
            <path d="M46 0H0V46" fill="none" stroke="#383b42" strokeWidth="1" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="600" height="600" fill="url(#grid)" />
        {/* a few "roads" for a map feel */}
        <path d="M-20 140 L640 360" stroke="#494d55" strokeWidth="2" opacity="0.55" />
        <path d="M120 -20 L380 640" stroke="#494d55" strokeWidth="2" opacity="0.45" />
        <path d="M-20 460 L640 200" stroke="#383b42" strokeWidth="1.5" opacity="0.5" />
        <circle cx="362" cy="300" r="120" fill="none" stroke="#383b42" strokeWidth="1" opacity="0.4" />
      </svg>

      {/* location pin */}
      <span className="absolute left-[58%] top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <span className="absolute h-9 w-9 animate-ping rounded-full bg-amp/25 motion-reduce:animate-none" />
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-amp text-base shadow-amp">
          <MapPin size={18} aria-hidden />
        </span>
      </span>
      <span className="absolute left-[58%] top-[calc(50%+30px)] -translate-x-1/2 font-body text-[11px] font-medium uppercase tracking-label text-secondary">
        Abu Dhabi
      </span>
    </div>
  )
}

export function ContactPage() {
  const [name, setName] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const subject = encodeURIComponent(name ? `New enquiry from ${name}` : 'New enquiry')
    window.location.href = `mailto:${EMAIL}?subject=${subject}`
  }

  return (
    <main>
      {/* ---- Contacts header + info, over the map texture ---- */}
      <Section container={false} className="relative overflow-hidden pt-40 pb-20 md:pt-44 md:pb-28">
        <MapTexture />
        <Container className="relative z-10">
          <div className="flex items-baseline justify-between gap-6">
            <Reveal>
              <span className="eyebrow">How to contact us</span>
            </Reveal>
            <Reveal>
              <span className="hidden font-body text-sm uppercase tracking-label text-muted sm:block">
                24.45°N 54.37°E
              </span>
            </Reveal>
          </div>

          {/* Heading block: amber accent bar + big title */}
          <Reveal delay={0.05}>
            <div className="mt-5 flex items-stretch gap-5 md:gap-7">
              <span aria-hidden className="w-1 shrink-0 rounded-full bg-amp" />
              <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tighter text-primary">
                Contact
              </h1>
            </div>
          </Reveal>

          {/* 3-column contact info */}
          <div className="mt-16 grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-3 md:mt-20">
            {INFO.map(({ icon: Icon, label, lines, href }, i) => (
              <Reveal key={label} delay={0.08 + i * 0.05}>
                <div>
                  <div className="flex items-center gap-2.5 text-amp">
                    <Icon size={16} aria-hidden />
                    <span className="font-body text-[12px] font-medium uppercase tracking-label text-secondary">
                      {label}
                    </span>
                  </div>
                  <div className="mt-4 space-y-1">
                    {lines.map((line) =>
                      href && line === lines[0] ? (
                        <a
                          key={line}
                          href={href}
                          className="block font-body text-primary underline-offset-4 transition-colors hover:text-amp"
                        >
                          {line}
                        </a>
                      ) : (
                        <p
                          key={line}
                          className={
                            line === lines[0]
                              ? 'font-body text-primary'
                              : 'font-body text-sm text-muted'
                          }
                        >
                          {line}
                        </p>
                      ),
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Get in touch: large name input + Next ---- */}
      <Section divider className="py-20 md:py-28">
        <Reveal>
          <div className="flex items-center gap-4">
            <span aria-hidden className="h-4 w-1 rounded-full bg-amp" />
            <span className="eyebrow">Get in touch</span>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-center sm:gap-8"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              aria-label="Your name"
              className="w-full flex-1 bg-transparent font-display text-[clamp(1.6rem,4vw,2.8rem)] leading-none tracking-tighter text-primary placeholder:text-muted focus:outline-none"
            />
            <button
              type="submit"
              className="group inline-flex shrink-0 items-center gap-3 font-body text-sm font-medium uppercase tracking-label text-base"
            >
              <span className="text-primary transition-colors group-hover:text-amp">Next</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amp text-base transition-shadow duration-300 group-hover:shadow-amp">
                <ArrowRight size={18} aria-hidden />
              </span>
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 font-body text-sm text-muted">
            Or write to us directly at{' '}
            <a
              href={`mailto:${EMAIL}`}
              className="text-secondary underline-offset-4 transition-colors hover:text-amp"
            >
              {EMAIL}
            </a>
            .
          </p>
        </Reveal>
      </Section>
    </main>
  )
}
