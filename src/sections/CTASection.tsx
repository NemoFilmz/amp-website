import { useState, type FormEvent } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Container, Eyebrow, CTAButton, Magnetic } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { CTA, SERVICES } from '../data/site'

const PROJECTS_EMAIL = 'projects@actionmpro.com'

/**
 * Split the CTA headline so the closing phrase "Visual Storytelling"
 * can be tinted AMP-yellow without editing the source copy.
 */
const ACCENT_PHRASE = 'Visual Storytelling'
const splitIndex = CTA.title.lastIndexOf(ACCENT_PHRASE)
const titleHead = splitIndex >= 0 ? CTA.title.slice(0, splitIndex) : CTA.title
const titleAccent = splitIndex >= 0 ? CTA.title.slice(splitIndex) : ''

const fieldClass =
  'w-full bg-surface border border-line rounded-md py-3.5 px-5 text-primary placeholder:text-muted focus:border-amp focus:outline-none transition-colors font-body'

export function CTASection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [organization, setOrganization] = useState('')
  const [projectType, setProjectType] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // No backend yet: hand the inquiry to the user's mail client so the lead is never lost.
    const subject = encodeURIComponent(`Project inquiry${name ? ` from ${name}` : ''}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\nProject type: ${projectType}\n\n${message}`,
    )
    window.location.href = `mailto:${PROJECTS_EMAIL}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-base grain py-28 md:py-40">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(249,192,12,0.10), transparent 70%), radial-gradient(55% 60% at 18% 90%, rgba(43,217,255,0.08), transparent 70%)',
        }}
      />

      <Container>
        {/* ---- Top: closing statement ---- */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow index={10} total={10} className="mb-6 justify-center">
              Get Started
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.04}>
            <h2 className="text-balance font-display text-[clamp(2.4rem,6.2vw,5rem)] leading-[0.98] tracking-tighter text-primary">
              {titleHead}
              {titleAccent && <span className="text-amp">{titleAccent}</span>}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-secondary leading-relaxed">
              {CTA.body}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {CTA.buttons.map((b) =>
                b.variant === 'primary' ? (
                  <Magnetic key={b.label}>
                    <CTAButton variant={b.variant} href={b.href} icon={<ArrowRight size={16} />}>
                      {b.label}
                    </CTAButton>
                  </Magnetic>
                ) : (
                  <CTAButton key={b.label} variant={b.variant} href={b.href}>
                    {b.label}
                  </CTAButton>
                )
              )}
            </div>
          </Reveal>
        </div>

        {/* ---- Inquiry form ---- */}
        <div className="relative z-10 mx-auto mt-16 max-w-3xl text-left">
          <Reveal delay={0.1}>
            <Eyebrow>Start a Conversation</Eyebrow>

            {submitted ? (
              <div className="mt-7 rounded-lg border border-line p-10 text-center">
                <span
                  aria-hidden
                  className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-amp/40 bg-amp/10"
                >
                  <Check className="text-amp" size={26} />
                </span>
                <h3 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.02] tracking-tighter text-primary">
                  Thank you
                </h3>
                <p className="mx-auto mt-4 max-w-md font-body text-secondary leading-relaxed">
                  Your inquiry has reached AMP. Our team will review your project and respond
                  shortly. For anything time-sensitive, reach us directly at{' '}
                  <a
                    href={`mailto:${PROJECTS_EMAIL}`}
                    className="text-amp underline-offset-4 hover:underline"
                  >
                    {PROJECTS_EMAIL}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="cta-name" className="sr-only">
                      Name
                    </label>
                    <input
                      id="cta-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="cta-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      autoComplete="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="cta-organization" className="sr-only">
                      Organization
                    </label>
                    <input
                      id="cta-organization"
                      type="text"
                      autoComplete="organization"
                      placeholder="Organization"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="cta-project-type" className="sr-only">
                      Project type
                    </label>
                    <select
                      id="cta-project-type"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className={fieldClass}
                    >
                      <option value="" disabled>
                        Project type
                      </option>
                      {SERVICES.map((service) => (
                        <option key={service.name} value={service.name}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="cta-message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="cta-message"
                      rows={4}
                      placeholder="Tell us about your project"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={fieldClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="rounded-full bg-amp px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.08em] text-base transition hover:shadow-amp"
                    >
                      Send Inquiry
                    </button>
                  </div>
                </form>

                <p className="mt-6 font-body text-sm text-muted">
                  Or write to us at{' '}
                  <a
                    href={`mailto:${PROJECTS_EMAIL}`}
                    className="text-secondary underline-offset-4 transition-colors hover:text-amp"
                  >
                    {PROJECTS_EMAIL}
                  </a>
                  .
                </p>
              </>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
