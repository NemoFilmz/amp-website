import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Play, ArrowRight, Check, ShieldCheck, Quote, Plus, ImageIcon } from 'lucide-react'
import { Section, Container, CinematicMedia, CTAButton, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { COURSES, COURSE_SHARED } from '../data/site'
import { slugify, cn } from '../lib/util'

/**
 * One sales page per Academy course, applied uniformly to every track.
 * Anatomy: hero -> opening story + video -> description -> modules ->
 * mid CTA -> testimonials -> instructor -> pricing -> guarantee -> FAQ ->
 * closing PS + CTA.
 */
export function CoursePage() {
  const { slug } = useParams()
  const course = COURSES.find((c) => slugify(c.name) === slug)

  useEffect(() => {
    if (course) document.title = `${course.name} | AMP Academy`
  }, [course])

  if (!course) return <Navigate to="/academy" replace />

  const enquire = `/contact?course=${slug}`
  const { testimonials, instructor, pricing, guarantee, faq, ps } = COURSE_SHARED

  return (
    <main>
      {/* 1. HERO — eye-catching image, headline, subtitle, CTA */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-[116px]">
        <div aria-hidden className="absolute inset-0">
          <CinematicMedia src={course.image} alt={course.name} eager className="h-full w-full" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(to right, rgba(32,33,36,0.92) 0%, rgba(32,33,36,0.7) 45%, rgba(32,33,36,0.4) 100%), linear-gradient(to top, rgba(32,33,36,0.95) 0%, transparent 45%)',
          }}
        />
        <Container className="relative z-10">
          <Reveal>
            <span className="eyebrow text-amp">AMP Academy</span>
            <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,6.5vw,6rem)] leading-[1.02] tracking-tighter text-primary">
              {course.name}
            </h1>
            <p className="mt-6 max-w-2xl font-light text-xl leading-snug text-primary/90 md:text-2xl">
              {course.tagline}
            </p>
            <div className="mt-9">
              <CTAButton to={enquire} icon={<ArrowRight size={16} />}>
                Reserve your seat
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 2. OPENING STORY + VIDEO INTRO */}
      <Section divider className="py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal>
            <div className="space-y-6">
              {course.story.map((para) => (
                <p key={para} className="max-w-prose font-body text-lg leading-relaxed text-primary/90">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            {/* Intro video placeholder — drop a real course film in here later. */}
            <button
              type="button"
              aria-label={`Play the ${course.name} introduction`}
              className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-line"
            >
              <CinematicMedia src={course.image} alt={`${course.name} introduction`} className="absolute inset-0 h-full w-full" />
              <span className="absolute inset-0 z-10 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amp text-base shadow-amp transition-transform duration-300 group-hover:scale-105">
                  <Play size={24} className="ml-0.5" aria-hidden />
                </span>
              </span>
            </button>
          </Reveal>
        </div>
      </Section>

      {/* 3. SOFTWARE YOU'LL USE */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>The Tools</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
              Software you'll use
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-light text-xl leading-relaxed text-secondary">
              You'll work hands-on in the same professional toolset AMP uses on
              real productions.
            </p>
          </div>
        </Reveal>

        {/* Software icon placeholders — swap each tile's box for a real logo. */}
        <RevealGroup className="mx-auto mt-12 grid max-w-4xl grid-cols-3 gap-6 sm:grid-cols-4 md:mt-16 md:grid-cols-6">
          {course.software.map((tool) => (
            <RevealItem key={tool.name} className="flex flex-col items-center gap-3 text-center">
              <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-line-strong">
                <ImageIcon size={26} className="text-muted" aria-hidden />
              </div>
              <span className="font-body text-[11px] uppercase tracking-label text-secondary">
                {tool.name}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* 4. MODULES + 5. MID-PAGE CTA */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            Inside the course
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 space-y-4">
          {course.modules.map((module, i) => (
            <RevealItem
              key={module.title}
              className="group flex items-start gap-5 rounded-2xl border border-line bg-surface p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-line-strong hover:bg-elevated hover:shadow-xl hover:shadow-black/30 md:gap-7 md:p-8"
            >
              <span className="shrink-0 text-center leading-none">
                <span className="block font-body text-[11px] font-medium uppercase tracking-label text-amp">
                  Day
                </span>
                <span className="font-display text-3xl leading-none text-amp md:text-4xl">
                  {i + 1}
                </span>
              </span>
              <div>
                <h3 className="font-display text-xl tracking-tighter text-primary md:text-2xl">{module.title}</h3>
                <p className="mt-2 font-body leading-relaxed text-secondary">{module.desc}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <CTAButton to={enquire} icon={<ArrowRight size={16} />}>
              Reserve your seat
            </CTAButton>
          </div>
        </Reveal>
      </Section>

      {/* 6. TESTIMONIALS */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <h2 className="text-center font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            What participants say
          </h2>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem
              key={t.quote}
              className="flex flex-col rounded-2xl border border-line bg-surface p-8 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-line-strong"
            >
              <Quote size={26} className="text-amp" aria-hidden />
              <p className="mt-4 flex-1 font-body text-lg leading-relaxed text-primary/90">{t.quote}</p>
              <p className="mt-6 font-body text-sm uppercase tracking-label text-muted">
                {t.name} · {t.role}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* 7. INSTRUCTOR BIO */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <h2 className="max-w-3xl font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            {instructor.name}
          </h2>
          <p className="mt-2 font-body text-sm uppercase tracking-label text-amp">{instructor.role}</p>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-primary/90">{instructor.bio}</p>
        </Reveal>
      </Section>

      {/* 8. PRICING */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <h2 className="text-center font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            Choose your experience
          </h2>
        </Reveal>
        <RevealGroup className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
          {pricing.map((tier) => (
            <RevealItem
              key={tier.tier}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-surface p-8 transition-all duration-300 ease-out hover:-translate-y-1',
                tier.highlighted
                  ? 'border-amp ring-1 ring-amp/40 shadow-xl shadow-amp/5'
                  : 'border-line hover:border-line-strong',
              )}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-8 rounded-full bg-amp px-3 py-1 font-body text-[11px] font-medium uppercase tracking-label text-base">
                  {tier.note}
                </span>
              )}
              <h3 className="font-display text-2xl tracking-tighter text-primary">{tier.tier}</h3>
              <div className="mt-3 font-display text-[clamp(1.8rem,3vw,2.4rem)] leading-none text-amp">{tier.price}</div>
              {!tier.highlighted && (
                <p className="mt-2 font-body text-sm uppercase tracking-label text-muted">{tier.note}</p>
              )}
              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={15} className="mt-0.5 shrink-0 text-amp" aria-hidden />
                    <span className="font-body text-secondary">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CTAButton variant={tier.highlighted ? 'primary' : 'outline'} to={enquire} className="w-full justify-center">
                  Reserve
                </CTAButton>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* 9. SATISFACTION GUARANTEE */}
      <Section divider className="py-20 md:py-24">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <ShieldCheck size={40} className="text-amp" aria-hidden />
            <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight tracking-tighter text-primary">
              Our guarantee
            </h2>
            <p className="font-body text-lg leading-relaxed text-secondary">{guarantee}</p>
          </div>
        </Reveal>
      </Section>

      {/* 10. FAQ */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <h2 className="text-center font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            Questions, answered
          </h2>
        </Reveal>
        <div className="mx-auto mt-12 max-w-3xl border-y border-line">
          {faq.map((item) => (
            <details key={item.q} className="group border-b border-line last:border-b-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg tracking-tight text-primary transition-colors duration-200 hover:text-amp">
                {item.q}
                <Plus
                  size={20}
                  aria-hidden
                  className="shrink-0 text-amp transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="pb-5 font-body leading-relaxed text-secondary">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* 11. PS STATEMENT + CLOSING CTA */}
      <Section container={false} className="relative overflow-hidden bg-surface py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 0%, rgba(249,192,12,0.10), transparent 70%), radial-gradient(55% 60% at 15% 100%, rgba(43,217,255,0.07), transparent 70%)',
          }}
        />
        <Container className="relative z-10 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-balance font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
              Spend one weekend inside real cinematic production
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-secondary">{ps}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex justify-center">
              <CTAButton to={enquire} icon={<ArrowRight size={16} />}>
                Reserve your seat
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  )
}
