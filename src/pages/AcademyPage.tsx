import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { Section, Container } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { useSmoothScroll } from '../components/SmoothScroll'
import { CourseWheel } from '../components/CourseWheel'
import { ACADEMY } from '../data/site'

const EMAIL = 'ayman@actionmpro.com'

/* Four advantages of the academy (the "Why AMP Academy" grid). */
const ADVANTAGES = [
  {
    title: 'Taught from real projects',
    text: 'Every session is built on an actual AMP production, never theory. You learn the decisions that shipped.',
  },
  {
    title: 'AI & 3D pipelines',
    text: 'Work hands-on in the same professional toolset AMP uses on real client work, end to end.',
  },
  {
    title: 'Cinematic direction',
    text: 'Real film training sits behind every technique, so the work reads as cinema, not as a render.',
  },
  {
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
              'linear-gradient(0deg, rgba(32,33,36,0.92) 0%, rgba(32,33,36,0.4) 48%, rgba(32,33,36,0.7) 100%), radial-gradient(70% 60% at 50% 45%, rgba(32,33,36,0.55), transparent 80%)',
          }}
        />
        {/* diagonal accent line */}
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <line x1="0%" y1="100%" x2="100%" y2="30%" stroke="rgba(244,245,247,0.18)" strokeWidth="1.5" />
        </svg>

        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl pt-24 text-center md:pt-0">
            <Reveal>
              <h1
                className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] tracking-tighter text-primary"
                style={{ textShadow: '0 2px 30px rgba(0,0,0,0.6)' }}
              >
                Welcome to{' '}
                <span className="whitespace-nowrap">
                  <span className="text-amp">AMP</span> Academy
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p
                className="mx-auto mt-6 max-w-lg font-body leading-relaxed text-primary"
                style={{ textShadow: '0 1px 16px rgba(0,0,0,0.85)' }}
              >
                An exclusive program where filmmakers, 3D artists, and AI creators learn how world-class cinematic
                industrial content is actually produced, directly from AMP instructors.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-9 flex justify-center">
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
          <h2 className="whitespace-nowrap text-center font-display text-[clamp(1.7rem,5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            Why AMP Academy
          </h2>
        </Reveal>

        <RevealGroup className="mx-auto mt-14 grid max-w-4xl gap-x-12 gap-y-12 md:mt-16 md:grid-cols-2 md:gap-x-16">
          {ADVANTAGES.map(({ title, text }) => (
            <RevealItem key={title}>
              <h3 className="font-display text-xl tracking-tighter text-primary md:text-2xl">{title}</h3>
              <p className="mt-3 font-body leading-relaxed text-primary/90">{text}</p>
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
        <Reveal>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center font-display text-[clamp(1.6rem,3vw,2.4rem)] tracking-tighter text-primary">
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
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-8 py-3 font-body text-[13px] font-medium uppercase tracking-label text-primary transition-all duration-300 hover:border-amp hover:text-amp"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </Reveal>
      </Section>
    </main>
  )
}
