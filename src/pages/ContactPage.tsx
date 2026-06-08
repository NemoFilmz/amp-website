import { useState, type FormEvent } from 'react'
import { MapPin, Phone, Mail, ArrowRight, Send } from 'lucide-react'
import { Section, Container } from '../components/ui'
import { Reveal } from '../components/Reveal'

const EMAIL = 'ayman@actionmpro.com'

/** Contact info columns (Address / Phone / E-mail), matching the reference layout. */
const INFO = [
  {
    icon: MapPin,
    label: 'Studio',
    lines: ['Yas Creative Hub, Podium 3', 'Abu Dhabi, United Arab Emirates'],
    href: 'https://maps.app.goo.gl/eQTc1HugfLC4i9477',
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

// Real AMP studio location (Action Media Production FZ LLC, near Yas, Abu Dhabi).
const MAP_LINK = 'https://maps.app.goo.gl/eQTc1HugfLC4i9477'
const MAP_EMBED = 'https://maps.google.com/maps?q=24.4604736,54.6007697&z=16&output=embed'

/** Real map of the studio (Yas Creative Hub, Podium 3), dark-styled and AMP-tinted. */
function LocationMap() {
  return (
    <div
      className="absolute inset-y-0 right-0 hidden w-[55%] overflow-hidden md:block"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 42%, #000 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, #000 42%, #000 100%)',
      }}
    >
      {/* Real map, filtered to a dark theme that blends with the AMP palette */}
      <iframe
        title="AMP studio location — Yas Creative Hub, Podium 3, Abu Dhabi"
        src={MAP_EMBED}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0"
        style={{ filter: 'invert(0.92) hue-rotate(185deg) brightness(0.92) contrast(0.9) saturate(0.65)' }}
      />
      {/* obsidian + amber wash so the map reads on-brand */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 60% 50%, rgba(249,192,12,0.06), transparent 55%), linear-gradient(to right, rgba(32,33,36,0.55), rgba(32,33,36,0.12) 45%, transparent)',
        }}
      />
      {/* amber pin marking the exact spot (map is centred on it) */}
      <a
        href={MAP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        aria-label="Open AMP studio location in Google Maps"
      >
        <span className="relative flex items-center justify-center">
          <span className="absolute h-9 w-9 animate-ping rounded-full bg-amp/25 motion-reduce:animate-none" />
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-amp text-base shadow-amp transition-transform duration-300 group-hover:-translate-y-0.5">
            <MapPin size={18} aria-hidden />
          </span>
        </span>
        <span className="mt-2 whitespace-nowrap rounded-full bg-base/80 px-2.5 py-1 font-body text-[11px] font-medium uppercase tracking-label text-primary backdrop-blur">
          Yas Creative Hub · Podium 3
        </span>
      </a>
    </div>
  )
}

const STEPS = [
  { key: 'name' as const, type: 'text', placeholder: 'Enter your name' },
  { key: 'email' as const, type: 'email', placeholder: 'Your email' },
  { key: 'message' as const, type: 'textarea', placeholder: 'Your message' },
]

export function ContactPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (step < STEPS.length - 1) {
      setStep(step + 1)
      return
    }
    const subject = encodeURIComponent(`New enquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  return (
    <main>
      {/* ---- Contacts header + info, over the map texture ---- */}
      <Section container={false} className="relative overflow-hidden pt-40 pb-20 md:pt-44 md:pb-28">
        <LocationMap />
        {/* Top fade so the fixed nav stays legible over the map */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-base via-base/85 to-transparent"
        />
        <Container className="relative z-10">
          {/* Heading block: amber accent bar + big title */}
          <Reveal>
            <div className="flex items-stretch gap-5 md:gap-7">
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
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={`${label} — open`}
                      className="flex items-center gap-2.5 text-amp transition-opacity duration-200 hover:opacity-80"
                    >
                      <Icon size={16} aria-hidden />
                      <span className="font-body text-[12px] font-medium uppercase tracking-label text-primary/80">
                        {label}
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-2.5 text-amp">
                      <Icon size={16} aria-hidden />
                      <span className="font-body text-[12px] font-medium uppercase tracking-label text-primary/80">
                        {label}
                      </span>
                    </div>
                  )}
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
                              : 'font-body text-sm text-secondary'
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

          {/* Get in touch: a 3-step form (name -> email -> message -> send) */}
          <Reveal delay={0.28}>
            <div className="mt-16 max-w-xl md:mt-24 md:max-w-2xl">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:gap-8"
              >
                {current.type === 'textarea' ? (
                  <textarea
                    key="message"
                    rows={2}
                    required
                    autoFocus
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={current.placeholder}
                    aria-label="Your message"
                    className="w-full flex-1 resize-none bg-transparent font-body text-[clamp(1.3rem,3vw,2rem)] font-light leading-tight tracking-tight text-primary placeholder:text-muted focus:outline-none"
                  />
                ) : (
                  <input
                    key={current.key}
                    type={current.type}
                    required
                    autoFocus
                    value={form[current.key]}
                    onChange={(e) => setForm({ ...form, [current.key]: e.target.value })}
                    placeholder={current.placeholder}
                    aria-label={current.placeholder}
                    className="w-full flex-1 bg-transparent font-body text-[clamp(1.5rem,3.6vw,2.4rem)] font-light leading-tight tracking-tight text-primary placeholder:text-muted focus:outline-none"
                  />
                )}
                <button
                  type="submit"
                  className="group inline-flex shrink-0 items-center gap-3 font-body text-sm font-medium uppercase tracking-label text-base"
                >
                  <span className="text-primary transition-colors group-hover:text-amp">
                    {isLast ? 'Send' : 'Next'}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amp text-base transition-shadow duration-300 group-hover:shadow-amp">
                    {isLast ? <Send size={17} aria-hidden /> : <ArrowRight size={18} aria-hidden />}
                  </span>
                </button>
              </form>

              {/* progress + back */}
              <div className="mt-5 flex items-center gap-5">
                <div className="flex items-center gap-2">
                  {STEPS.map((s, i) => (
                    <span
                      key={s.key}
                      aria-hidden
                      className={
                        'h-1.5 rounded-full transition-all duration-300 ' +
                        (i === step ? 'w-6 bg-amp' : i < step ? 'w-1.5 bg-amp/60' : 'w-1.5 bg-line-strong')
                      }
                    />
                  ))}
                </div>
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="font-body text-[12px] font-medium uppercase tracking-label text-muted transition-colors hover:text-primary"
                  >
                    Back
                  </button>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mt-8 font-body text-sm text-secondary">
              Or write to us directly at{' '}
              <a
                href={`mailto:${EMAIL}`}
                className="text-primary underline-offset-4 transition-colors hover:text-amp"
              >
                {EMAIL}
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </Section>
    </main>
  )
}
