import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, Calendar, Hotel, Users } from 'lucide-react'
import { PageHero, Section, Eyebrow, CTAButton, CinematicMedia } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { ACADEMY, PAGES } from '../data/site'

/* Background image per track (order matches ACADEMY.tracks). */
const TRACK_IMG = [
  '/placeholders/hero.jpg', // AI Cinematic Production
  '/placeholders/oilgas.jpg', // Industrial 3D Animation
  '/placeholders/gov.jpg', // Government Presentation Films
  '/placeholders/heavy.jpg', // Cinematic Storytelling for Mega Projects
  '/placeholders/aviation.jpg', // Creative Direction & Art Department
]

/* Condensed "what's included", distilled from the weekend + luxury detail. */
const INCLUDED = [
  {
    icon: Calendar,
    title: 'Weekend Intensive',
    text: 'Friday to Sunday deep-dive masterclasses built on one real AMP production.',
  },
  {
    icon: Hotel,
    title: '5-Star Stay',
    text: 'Two complimentary nights at a nearby hotel on selected programs.',
  },
  {
    icon: Users,
    title: 'VIP Access',
    text: 'Private production tours, industry guest speakers, and creative mentorship.',
  },
]

export function AcademyPage() {
  return (
    <>
      <PageHero {...PAGES.academy} seed={3} />

      {/* ---------- Choose a track (the navigable core) ---------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <Eyebrow>Choose a Track</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            Five disciplines, taught from real projects
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
          {ACADEMY.tracks.map((track, i) => (
            <RevealItem key={track.name}>
              <Link
                to="/contact"
                className="group relative block aspect-[16/10] overflow-hidden rounded-lg border border-line transition-colors duration-300 hover:border-amp"
                aria-label={`Enquire about ${track.name}`}
              >
                <CinematicMedia src={TRACK_IMG[i]} alt={track.name} className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-7 md:p-8">
                  <h3 className="font-display text-2xl leading-tight tracking-tighter text-primary md:text-3xl">
                    {track.name}
                  </h3>
                  <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-secondary">
                    {track.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-body text-[12px] font-medium uppercase tracking-label text-amp">
                    Enquire
                    <ArrowUpRight
                      size={15}
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- What's included (condensed) ---------- */}
      <Section divider className="py-24 md:py-32">
        <Reveal>
          <Eyebrow>The Experience</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            A luxury creative experience
          </h2>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-secondary">
            {ACADEMY.intro[1]}
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {INCLUDED.map(({ icon: Icon, title, text }) => (
            <RevealItem
              key={title}
              className="rounded-lg border border-line bg-surface p-8 transition-colors duration-300 hover:border-line-strong"
            >
              <Icon size={22} className="mb-5 text-amp" aria-hidden />
              <h3 className="font-display text-xl tracking-tighter text-primary">{title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-secondary">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- Booking CTA ---------- */}
      <Section divider className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-balance font-display text-[clamp(2rem,5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
              Reserve your seat
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-secondary">
              Programs run every weekend. Tell us which track fits you and our team will arrange the details.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <CTAButton variant="primary" to="/contact" icon={<ArrowRight size={16} aria-hidden />}>
                Request a Seat
              </CTAButton>
              <a
                href="mailto:academy@actionmpro.com"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-line-strong px-7 py-3.5 text-[14px] font-medium uppercase tracking-[0.08em] text-primary transition-all duration-300 hover:border-amp hover:text-amp"
              >
                academy@actionmpro.com
              </a>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
