import { useState, type FormEvent } from 'react'
import { MapPin, Phone, Mail, Send, type LucideIcon } from 'lucide-react'

const EMAIL = 'ayman@actionmpro.com'
const PHONE_DISPLAY = '+971 50 322 2003'
const PHONE_HREF = 'tel:+971503222003'

// Real AMP studio location (Action Media Production FZ LLC, Yas Creative Hub, Abu Dhabi).
const MAP_LINK = 'https://maps.app.goo.gl/eQTc1HugfLC4i9477'
const MAP_EMBED = 'https://maps.google.com/maps?q=24.4604736,54.6007697&z=16&output=embed'

/** Address / Phone / Email, each shown under a diamond icon (per the reference). */
const INFO: { icon: LucideIcon; label: string; lines: string[]; href: string; external?: boolean }[] = [
  {
    icon: MapPin,
    label: 'Address',
    lines: ['Yas Creative Hub, Podium 3', 'Abu Dhabi, United Arab Emirates'],
    href: MAP_LINK,
    external: true,
  },
  { icon: Phone, label: 'Phone', lines: [PHONE_DISPLAY], href: PHONE_HREF },
  { icon: Mail, label: 'E-mail', lines: [EMAIL], href: `mailto:${EMAIL}` },
]

/** Lucide icon framed inside a rotated square (the reference's diamond motif). */
function Diamond({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      aria-hidden
      className="flex h-12 w-12 rotate-45 items-center justify-center rounded-[3px] border border-amp/55 transition-colors duration-300 group-hover:border-amp"
    >
      <Icon size={17} className="-rotate-45 text-amp" />
    </span>
  )
}

/** Dark-styled Google map of the studio with a pin and an address card. */
function StudioMap() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <iframe
        title="AMP studio location: Yas Creative Hub, Podium 3, Abu Dhabi"
        src={MAP_EMBED}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="pointer-events-none h-full w-full border-0"
        style={{ filter: 'invert(0.92) hue-rotate(185deg) brightness(0.9) contrast(0.9) saturate(0.6)' }}
      />
      {/* on-brand wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 55% 45%, rgba(249,192,12,0.05), transparent 55%), linear-gradient(to bottom, rgba(32,33,36,0.35), transparent 30%)',
        }}
      />
      {/* pin + address card, centred on the studio */}
      <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="relative mb-3 flex items-center justify-center">
          <span className="absolute h-9 w-9 animate-ping rounded-full bg-amp/25 motion-reduce:animate-none" />
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-amp text-base shadow-amp">
            <MapPin size={18} aria-hidden />
          </span>
        </span>
        <a
          href={MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open AMP studio location in Google Maps"
          className="block rounded-lg bg-[#f4f2ec]/95 px-5 py-3 text-center shadow-2xl ring-1 ring-black/10 backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
        >
          <p className="font-body text-sm font-semibold text-[#1c1d19]">Yas Creative Hub, Podium 3</p>
          <p className="mt-0.5 font-body text-xs text-[#55564e]">Abu Dhabi, United Arab Emirates</p>
        </a>
      </div>
    </div>
  )
}

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const subject = encodeURIComponent(`New enquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  const field =
    'w-full rounded-lg border border-line bg-surface px-4 py-3.5 font-body text-primary placeholder:text-muted transition-colors focus:border-amp focus:outline-none focus:ring-1 focus:ring-amp/40'

  return (
    <main>
      <section className="relative bg-base pb-16 pt-40 lg:pb-20 lg:pt-44">
        <div className="lg:flex lg:items-stretch">
          {/* ---- Left: contact details + form ---- */}
          <div className="px-6 sm:px-10 lg:w-1/2 lg:pl-14 lg:pr-12 xl:pl-20">
            <div className="mx-auto w-full max-w-xl lg:mx-0">
            <h1 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[0.98] tracking-tighter text-primary">
              Get in <span className="text-amp">touch</span> with us
            </h1>
            <p className="mt-6 max-w-md font-body leading-relaxed text-primary">
              Have a project in mind, or a question about working with AMP? Send us a message and we will
              get back to you.
            </p>

            {/* Contact details (diamond icons) */}
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {INFO.map(({ icon, label, lines, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="group flex flex-col items-center text-center"
                >
                  <Diamond icon={icon} />
                  <div className="mt-4">
                    <div className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                      {label}
                    </div>
                    {lines.map((line, i) => (
                      <p
                        key={line}
                        className={
                          i === 0
                            ? 'mt-1.5 font-body text-sm text-primary transition-colors group-hover:text-amp'
                            : 'font-body text-sm text-primary'
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </a>
              ))}
            </div>

            {/* Send a message */}
            <h2 className="mt-10 font-display text-xl tracking-tighter text-primary md:text-2xl">
              Send a message
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Name"
                  aria-label="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={field}
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  aria-label="Your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={field}
                />
              </div>
              <textarea
                rows={5}
                required
                placeholder="Message"
                aria-label="Your message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${field} resize-none`}
              />
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2.5 rounded-full bg-amp px-9 py-3.5 font-body text-[14px] font-semibold uppercase tracking-[0.12em] text-base transition-shadow duration-300 hover:shadow-amp"
                >
                  Send message
                  <Send size={16} aria-hidden />
                </button>
              </div>
            </form>
            </div>
          </div>

          {/* ---- Right: studio map (matches the left content height) ---- */}
          <div className="relative mt-12 min-h-[55vh] bg-surface lg:mt-0 lg:min-h-0 lg:w-1/2">
            <StudioMap />
          </div>
        </div>
      </section>
    </main>
  )
}
