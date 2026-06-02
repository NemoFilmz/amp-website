import { Link } from 'react-router-dom'
import { BRAND, FOOTER } from '../data/site'
import { Wordmark } from './Wordmark'
import { Container } from './ui'

// Footer nav targets: dedicated routes, or home-page section anchors via "/#id".
const navToByLabel: Record<string, string> = {
  Home: '/',
  'About AMP': '/about',
  Work: '/work',
  Technology: '/technology',
  'AMP Academy': '/academy',
  Industries: '/#industries',
  Services: '/#services',
  'Global Offices': '/#global',
  Careers: '/careers',
  Contact: '/contact',
}

export function Footer() {
  const year = 2026

  return (
    <footer className="relative border-t border-line bg-base">
      <Container className="py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Wordmark withSub />
            <p className="mt-6 max-w-xs font-body text-sm leading-relaxed text-secondary">
              {FOOTER.statement.line}
            </p>
            <p className="mt-3 font-body font-medium text-[11px] uppercase tracking-[0.14em] text-muted">
              {BRAND.years} years of transforming complexity into powerful storytelling.
            </p>
            <div className="mt-7 flex gap-6">
              {[
                { label: 'Instagram', short: 'IG' },
                { label: 'LinkedIn', short: 'LI' },
                { label: 'YouTube', short: 'YT' },
              ].map((s) => (
                <a
                  key={s.short}
                  href="#top"
                  aria-label={s.label}
                  onClick={(e) => e.preventDefault()}
                  className="font-body font-medium text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-amp"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h3 className="eyebrow mb-5">Navigation</h3>
            <ul className="space-y-3">
              {FOOTER.nav.map((label) => (
                <li key={label}>
                  <Link
                    to={navToByLabel[label] ?? '/'}
                    className="font-body text-sm text-secondary transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div className="lg:col-span-2">
            <h3 className="eyebrow mb-5">Offices</h3>
            <ul className="space-y-3">
              {FOOTER.offices.map((city) => (
                <li
                  key={city}
                  className="font-body text-sm text-secondary"
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact emails */}
          <div className="lg:col-span-3">
            <h3 className="eyebrow mb-5">Contact</h3>
            <ul className="space-y-2.5">
              {FOOTER.emails.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="font-body font-medium text-[12px] text-secondary transition-colors hover:text-amp"
                  >
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final statement */}
        <div className="mt-16 border-t border-line pt-8">
          <p className="max-w-3xl font-display text-lg font-medium tracking-tighter text-primary">
            {FOOTER.statement.lead}
          </p>
          <p className="mt-2 max-w-3xl font-body text-sm text-secondary">
            {FOOTER.statement.line} {FOOTER.statement.sub}
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-body font-medium text-[11px] uppercase tracking-[0.14em] text-muted">
            © {year} {BRAND.short}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms'].map((l) => (
              <a
                key={l}
                href="#top"
                onClick={(e) => e.preventDefault()}
                className="font-body font-medium text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-secondary"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
