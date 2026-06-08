import { useState, type FormEvent } from 'react'
import { ArrowRight, Clapperboard, Cpu, Compass, Users, MapPin, Phone, Mail } from 'lucide-react'
import { Section, Container } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { useSmoothScroll } from '../components/SmoothScroll'
import { CourseWheel } from '../components/CourseWheel'
import { ACADEMY } from '../data/site'

const EMAIL = 'ayman@actionmpro.com'

/* Four advantages, each with an icon (the "Advantage Learning" grid). */
const ADVANTAGES = [
  {
    icon: Clapperboard,
    title: 'Taught from real projects',
    text: 'Every session is built on an actual AMP production, never theory. You learn the decisions that shipped.',
  },
  {
    icon: Cpu,
    title: 'AI & 3D pipelines',
    text: 'Work hands-on in the same professional toolset AMP uses on real client work, end to end.',
  },
  {
    icon: Compass,
    title: 'Cinematic direction',
    text: 'Real film training sits behind every technique, so the work reads as cinema, not as a render.',
  },
  {
    icon: Users,
    title: 'Mentorship & access',
    text: 'Private production tours, industry guest speakers, and one-to-one creative mentorship.',
  },
]

export function AcademyPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const { scrollTo } = useSmoothScroll()

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const subject = encodeURIComponent(`AMP Academy enquiry${form.name ? ` from ${form.name}` : ''}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  const field =
    'w-full rounded-md border border-line bg-surface px-4 py-3 font-body text-primary placeholder:text-muted transition-colors focus:border-amp focus:outline-none'

  return (
    <main>
      {/* ---------------------------------------------------------------- */}
      {/* 1. HERO                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <img
          src="/placeholders/academy-hero.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* legibility grades */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(32,33,36,0.86) 0%, rgba(32,33,36,0.5) 45%, rgba(32,33,36,0.12) 100%), linear-gradient(0deg, rgba(32,33,36,0.95) 0%, rgba(32,33,36,0.1) 45%, rgba(32,33,36,0.55) 100%)',
          }}
        />
        {/* diagonal accent line */}
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <line x1="0%" y1="100%" x2="100%" y2="30%" stroke="rgba(244,245,247,0.18)" strokeWidth="1.5" />
        </svg>

        <Container className="relative z-10">
          <div className="max-w-xl pt-24 md:pt-0">
            <Reveal>
              <span className="eyebrow text-amp">The Academy</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 font-display text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.95] tracking-tighter text-primary">
                Welcome to
                <br />
                <span className="text-amp">AMP</span> Academy
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md font-body leading-relaxed text-primary">
                An exclusive program where filmmakers, 3D artists, and AI creators learn how world-class cinematic
                industrial content is actually produced, directly from real AMP productions.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-9 flex">
                <button
                  type="button"
                  onClick={() => scrollTo('#courses', { offset: -90 })}
                  className="inline-flex items-center gap-2 rounded-full bg-amp px-7 py-3.5 font-body text-[15px] font-medium uppercase tracking-[0.12em] text-base transition-shadow duration-300 hover:shadow-amp"
                >
                  Reserve your seat
                  <ArrowRight size={16} aria-hidden />
                </button>
              </div>
            </Reveal>
          </div>

        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 2. ADVANTAGE LEARNING                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            Why AMP
            <br />
            Academy
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-x-12 gap-y-12 md:mt-16 md:grid-cols-2 md:gap-x-20">
          {ADVANTAGES.map(({ icon: Icon, title, text }) => (
            <RevealItem key={title}>
              <Icon size={28} className="text-amp" aria-hidden />
              <h3 className="mt-5 font-display text-xl tracking-tighter text-primary md:text-2xl">{title}</h3>
              <p className="mt-3 max-w-md font-body leading-relaxed text-secondary">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. WELCOME + COURSE WHEEL                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section id="courses" container={false} divider className="py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
                What we teach
              </h2>
              <p className="mx-auto mt-6 max-w-xl font-body leading-relaxed text-secondary">
                Pick the course that fits you. Open it to see the full program, reserve your seat, and book your place.
              </p>
            </div>
          </Reveal>
        </Container>

        <Reveal delay={0.05}>
          <div className="mt-14 md:mt-16">
            <CourseWheel />
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. CONTACT + LEAVE A MESSAGE                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section divider className="py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          {/* Contact us */}
          <Reveal>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] tracking-tighter text-primary">
              Contact us
            </h2>
            <ul className="mt-8 space-y-7">
              <li className="flex items-start gap-3.5">
                <MapPin size={18} className="mt-0.5 shrink-0 text-amp" aria-hidden />
                <div>
                  <div className="font-body text-[12px] font-medium uppercase tracking-label text-secondary">
                    Studio
                  </div>
                  <p className="mt-1.5 font-body text-primary">Yas Creative Hub, Podium 3</p>
                  <p className="font-body text-sm text-muted">Abu Dhabi, United Arab Emirates</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <Phone size={18} className="mt-0.5 shrink-0 text-amp" aria-hidden />
                <div>
                  <div className="font-body text-[12px] font-medium uppercase tracking-label text-secondary">
                    Telephone
                  </div>
                  <a href="tel:+971503222003" className="mt-1.5 block font-body text-primary hover:text-amp">
                    +971 50 322 2003
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <Mail size={18} className="mt-0.5 shrink-0 text-amp" aria-hidden />
                <div>
                  <div className="font-body text-[12px] font-medium uppercase tracking-label text-secondary">
                    E-mail
                  </div>
                  <a href={`mailto:${EMAIL}`} className="mt-1.5 block font-body text-primary hover:text-amp">
                    {EMAIL}
                  </a>
                </div>
              </li>
            </ul>
          </Reveal>

          {/* Leave a message */}
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] tracking-tighter text-primary">
              Leave a message
            </h2>
            <form onSubmit={submit} className="mt-8 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Name"
                  aria-label="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={field}
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  aria-label="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={field}
                />
              </div>
              <textarea
                rows={6}
                required
                placeholder="Message"
                aria-label="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={field}
              />
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-8 py-3 font-body text-[13px] font-medium uppercase tracking-label text-primary transition-all duration-300 hover:border-amp hover:text-amp"
                >
                  Send
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </Section>
    </main>
  )
}
