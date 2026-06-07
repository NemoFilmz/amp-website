import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowUpRight, Send, ArrowRight } from 'lucide-react'
import { PageHero, Section, Eyebrow, CTAButton, Magnetic } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { OFFICES, GENERAL_EMAILS, SERVICES, PAGES } from '../data/site'

const PROJECTS_EMAIL = 'projects@actionmpro.com'

const fieldClass =
  'w-full bg-surface border border-line rounded-md py-3.5 px-5 text-primary placeholder:text-muted focus:border-amp focus:outline-none transition-colors font-body'

const labelClass = 'mb-2 block font-body text-[12px] font-medium uppercase tracking-label text-secondary'

export function ContactPage() {
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
    <>
      <PageHero {...PAGES.contact} seed={0} />

      {/* ---- Contact body: form + regional rail ---- */}
      <Section className="py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* LEFT: inquiry form */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index={1} total={2}>
                Start a Conversation
              </Eyebrow>
              <h2 className="mt-4 max-w-xl font-display text-[clamp(1.9rem,4vw,3rem)] leading-[0.98] tracking-tighter text-primary">
                Brief Our Team
              </h2>
              <p className="mt-5 max-w-xl font-body leading-relaxed text-secondary">
                Tell us about the initiative, project, or technology you need to
                communicate. Our producers will review the scope and respond with
                next steps.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              {submitted ? (
                <div className="mt-9 rounded-lg border border-line bg-surface p-10 text-center">
                  <span
                    aria-hidden
                    className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-amp/40 bg-amp/10"
                  >
                    <Check className="text-amp" size={26} />
                  </span>
                  <h3 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.02] tracking-tighter text-primary">
                    Almost there
                  </h3>
                  <p className="mx-auto mt-4 max-w-md font-body leading-relaxed text-secondary">
                    We have opened a draft email so you can review your message and send it to our
                    team. If nothing opened, write to{' '}
                    <a
                      href={`mailto:${PROJECTS_EMAIL}`}
                      className="text-amp underline-offset-4 hover:underline"
                    >
                      {PROJECTS_EMAIL}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-7 font-body text-[12px] font-medium uppercase tracking-label text-secondary underline-offset-4 transition-colors hover:text-amp"
                  >
                    Edit or send another
                  </button>
                </div>
              ) : (
                <>
                  <form
                    onSubmit={handleSubmit}
                    className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2"
                  >
                    <div>
                      <label htmlFor="contact-name" className={labelClass}>
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={fieldClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className={labelClass}>
                        Email <span className="text-amp">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="jane@organization.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={fieldClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-organization" className={labelClass}>
                        Organization
                      </label>
                      <input
                        id="contact-organization"
                        type="text"
                        autoComplete="organization"
                        placeholder="Ministry, company, or entity"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className={fieldClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-project-type" className={labelClass}>
                        Project type
                      </label>
                      <select
                        id="contact-project-type"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className={fieldClass}
                      >
                        <option value="" disabled>
                          Select a project type
                        </option>
                        {SERVICES.map((service) => (
                          <option key={service.name} value={service.name}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="contact-message" className={labelClass}>
                        Message <span className="text-amp">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        required
                        placeholder="Tell us about the initiative, project, or technology you need to communicate."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={fieldClass}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-amp px-7 py-3.5 text-[14px] font-medium uppercase tracking-[0.08em] text-base transition hover:shadow-amp active:scale-[0.98]"
                      >
                        <span>Send Inquiry</span>
                        <Send
                          size={15}
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
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

          {/* RIGHT: regional offices rail */}
          <div className="lg:col-span-5">
            <Reveal delay={0.06}>
              <Eyebrow index={2} total={2}>
                Regional Studios
              </Eyebrow>
              <p className="mt-4 max-w-sm font-light text-lg leading-relaxed text-secondary">
                We communicate at the highest executive and international levels.
              </p>
            </Reveal>

            <RevealGroup className="mt-8 grid grid-cols-1 gap-4">
              {OFFICES.map((office) => (
                <RevealItem key={office.email}>
                  <div className="group rounded-lg border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl tracking-tighter text-primary">
                        {office.city}
                      </h3>
                      <span className="text-muted">{office.country}</span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-secondary">
                      {office.role}
                    </p>

                    <a
                      href={`mailto:${office.email}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-amp underline-offset-4 transition-colors hover:underline"
                    >
                      {office.email}
                      <ArrowUpRight
                        size={15}
                        aria-hidden
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <div className="mt-8 border-t border-line pt-7">
                <span className="eyebrow">General</span>
                <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                  {GENERAL_EMAILS.map((address) => (
                    <li key={address}>
                      <a
                        href={`mailto:${address}`}
                        className="inline-flex items-center gap-1.5 font-body text-sm text-secondary underline-offset-4 transition-colors hover:text-amp"
                      >
                        {address}
                        <ArrowUpRight size={13} aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---- Closing CTA band ---- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Consultation</Eyebrow>
            <p className="mx-auto mt-5 max-w-2xl font-body text-lg leading-relaxed text-secondary">
              From national initiatives to billion-dollar projects, our team is
              ready to bring your vision to the people who decide.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Magnetic>
                <CTAButton to="/contact" icon={<ArrowRight size={16} />}>
                  Book a Consultation
                </CTAButton>
              </Magnetic>
              <CTAButton variant="outline" href={`mailto:${PROJECTS_EMAIL}`}>
                Email Our Team
              </CTAButton>
            </div>
            <p className="mt-8 font-body text-sm text-muted">
              Prefer to explore first? Visit our{' '}
              <Link
                to="/work"
                className="text-secondary underline-offset-4 transition-colors hover:text-amp"
              >
                selected work
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
