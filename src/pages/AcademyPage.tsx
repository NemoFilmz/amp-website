import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Plus, Minus } from 'lucide-react'
import { Section, Container } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { useSmoothScroll } from '../components/SmoothScroll'
import { CourseWheel } from '../components/CourseWheel'
import { cn } from '../lib/util'

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

/* Real clients whose work AMP has produced (social proof). */
const LOGOS = [
  { src: '/logos/adnoc.png', name: 'ADNOC', h: 'h-9 md:h-10' },
  { src: '/logos/mubadala.png', name: 'Mubadala', h: 'h-7 md:h-8' },
  { src: '/logos/etihad.png', name: 'Etihad', h: 'h-14 md:h-16' },
  { src: '/logos/masdar.png', name: 'Masdar', h: 'h-7 md:h-8' },
  { src: '/logos/nmdc.png', name: 'NMDC', h: 'h-9 md:h-10' },
  { src: '/logos/adairports.png', name: 'Abu Dhabi Airports', h: 'h-9 md:h-10' },
]

/* FAQ — answers drawn from the established academy facts. */
const FAQS = [
  {
    q: 'Who is AMP Academy for?',
    a: 'Filmmakers, 3D artists, AI creators, and visual storytellers who want to learn how world-class cinematic industrial content is actually produced.',
  },
  {
    q: 'How is it different from a normal course?',
    a: 'Every session is taught directly from real AMP productions and industry projects developed over the last 15 years, never from theory.',
  },
  {
    q: 'What will I learn?',
    a: 'Cinematic industrial storytelling, high-end 3D animation pipelines, AI production, building large-scale environments, and how visual direction shapes the decisions of the people who watch.',
  },
  {
    q: 'How is the program structured?',
    a: 'As weekend intensive masterclasses, each built on one selected AMP production, with real production breakdowns, AI and 3D demonstrations, lighting and rendering, and creative direction sessions.',
  },
  {
    q: 'Where is it held?',
    a: 'At the AMP studio in Yas Creative Hub, Podium 3, Abu Dhabi.',
  },
]

const CTA_CLASS =
  'inline-flex items-center gap-2 rounded-full bg-amp px-7 py-3.5 font-body text-[15px] font-medium uppercase tracking-[0.12em] text-base transition-shadow duration-300 hover:shadow-amp'

/** Accordion FAQ (one open at a time), with the wireframe's +/- affordance. */
function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mx-auto max-w-3xl border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className={i > 0 ? 'border-t border-line' : ''}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors md:py-6"
            >
              <span className="font-display text-lg tracking-tight text-primary md:text-xl">{item.q}</span>
              <span aria-hidden className="shrink-0 text-amp">
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
              </span>
            </button>
            <div
              className={cn(
                'grid overflow-hidden transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="min-h-0">
                <p className="max-w-2xl font-body leading-relaxed text-secondary">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function AcademyPage() {
  const { scrollTo } = useSmoothScroll()
  const reserve = () => scrollTo('#courses', { offset: -90 })

  return (
    <main>
      {/* ---------------------------------------------------------------- */}
      {/* 1. HERO — copy + CTA left, image right                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="flex min-h-screen items-center bg-base pb-16 pt-[120px] md:pb-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <h1 className="font-display text-[clamp(2.4rem,5.2vw,4.8rem)] leading-[0.95] tracking-tighter text-primary">
                  Welcome to{' '}
                  <span className="whitespace-nowrap">
                    <span className="text-amp">AMP</span> Academy
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-secondary">
                  An exclusive program where filmmakers, 3D artists, and AI creators learn how world-class
                  cinematic industrial content is actually produced, directly from AMP instructors.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-9">
                  <button type="button" onClick={reserve} className={CTA_CLASS}>
                    Reserve your seat
                    <ArrowRight size={16} aria-hidden />
                  </button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl ring-1 ring-line shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
                <img
                  src="/placeholders/academy-hero.jpg"
                  alt="AMP Academy production environment"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 2. SOCIAL PROOF — client logos                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-line bg-base py-12 md:py-14">
        <Container>
          <Reveal>
            <p className="text-center font-body text-[12px] font-medium uppercase tracking-[0.2em] text-muted">
              Taught on real work for the region's landmark institutions
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
              {LOGOS.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className={cn(
                    'w-auto select-none object-contain opacity-70 transition-opacity duration-300 hover:opacity-100',
                    logo.h,
                  )}
                />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. BENEFITS — Why AMP Academy + image                            */}
      {/* ---------------------------------------------------------------- */}
      <Section divider container={false} className="relative overflow-hidden py-24 md:py-32">
        <Container className="relative">
          <div className="lg:flex lg:gap-10">
            <div className="lg:w-[56%]">
              <Reveal>
                <h2 className="whitespace-nowrap text-center font-display text-[clamp(1.7rem,5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
                  Why <span className="text-amp">AMP</span> Academy
                </h2>
              </Reveal>
              <RevealGroup className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2 md:mt-14 md:gap-x-14">
                {ADVANTAGES.map(({ title, text }) => (
                  <RevealItem key={title}>
                    <h3 className="font-display text-xl tracking-tighter text-primary md:text-2xl">{title}</h3>
                    <p className="mt-3 font-body leading-relaxed text-primary/90">{text}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            {/* AMP architectural-viz piece, in its own framed container, poking off the right edge */}
            <div className="relative mt-12 hidden self-stretch lg:mt-0 lg:block lg:w-[44%]">
              <div className="absolute left-0 top-1/2 w-[42rem] max-w-none -translate-y-1/2 overflow-hidden rounded-2xl ring-1 ring-line shadow-[0_30px_70px_rgba(0,0,0,0.55)] xl:w-[50rem]">
                <img
                  src="/academy/tower-night.jpg"
                  alt="AMP architectural visualization of a tower at night"
                  loading="lazy"
                  className="w-full select-none"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. BENEFITS — What these skills can do for you (with CTA)        */}
      {/* ---------------------------------------------------------------- */}
      <Section divider className="py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Three pictures in smooth rounded boxes (1 + 2 collage) */}
          <Reveal>
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              <div className="col-span-2 overflow-hidden rounded-2xl ring-1 ring-line shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                <img
                  src="/academy/domain-ai.jpg"
                  alt="Holographic brain visualization for AI and neural systems"
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl ring-1 ring-line shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                <img
                  src="/academy/domain-aerospace.jpg"
                  alt="Satellite in a hangar, aerospace visualization"
                  loading="lazy"
                  className="aspect-[5/4] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl ring-1 ring-line shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                <img
                  src="/academy/domain-industrial.jpg"
                  alt="Precision engineering close-up, industrial visualization"
                  loading="lazy"
                  className="aspect-[5/4] w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* Heading + supporting line + CTA */}
          <Reveal delay={0.08}>
            <div>
              <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.0] tracking-tighter text-primary">
                What these skills can do <span className="text-amp">for you</span>
              </h2>
              <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-primary/90">
                The same craft <span className="text-amp">AMP</span> brings to real productions, applied to
                anything from AI and neural systems to aerospace and precision engineering. You leave able
                to turn the most complex subject into work that is clear, accurate, and cinematic.
              </p>
              <ul className="mt-9 space-y-4">
                <li className="flex items-center gap-3.5">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-amp" />
                  <span className="font-body text-lg text-primary/90">AI &amp; neural systems</span>
                </li>
                <li className="flex items-center gap-3.5">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-amp" />
                  <span className="font-body text-lg text-primary/90">Aerospace &amp; satellites</span>
                </li>
                <li className="flex items-center gap-3.5">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-amp" />
                  <span className="font-body text-lg text-primary/90">Precision engineering</span>
                </li>
              </ul>
              <div className="mt-9">
                <button type="button" onClick={reserve} className={CTA_CLASS}>
                  Reserve your seat
                  <ArrowRight size={16} aria-hidden />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. OFFERING — What we teach (course wheel)                       */}
      {/* ---------------------------------------------------------------- */}
      <Section id="courses" container={false} divider className="py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
                What we <span className="text-amp">teach</span>
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
      {/* 6. FAQ — objection handling                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <h2 className="text-center font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[0.98] tracking-tighter text-primary">
            Frequently asked <span className="text-amp">questions</span>
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-12 md:mt-14">
            <Faq items={FAQS} />
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 7. FINAL CTA                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-line bg-surface py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.0] tracking-tighter text-primary">
                Spend one weekend inside a real <span className="text-amp">AMP</span> production
              </h2>
              <p className="mx-auto mt-5 max-w-md font-body leading-relaxed text-secondary">
                Pick a course, reserve your seat, and learn the craft on real work, directly from the people
                who made it.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <button type="button" onClick={reserve} className={CTA_CLASS}>
                  Reserve your seat
                  <ArrowRight size={16} aria-hidden />
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 font-body text-[15px] font-medium uppercase tracking-[0.12em] text-primary transition-colors duration-300 hover:border-amp hover:text-amp"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
