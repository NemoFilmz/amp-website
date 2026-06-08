import { Link } from 'react-router-dom'
import { FaInstagram, FaLinkedinIn, FaYoutube, FaVimeoV } from 'react-icons/fa'
import { BRAND, FOOTER } from '../data/site'
import { Container } from './ui'
import { cn } from '../lib/util'

// Footer nav targets: dedicated routes, or home-page section anchors via "/#id".
const navToByLabel: Record<string, string> = {
  Home: '/',
  'About AMP': '/about',
  Work: '/work',
  Technology: '/technology',
  'AMP Academy': '/academy',
  Industries: '/#industries',
  Careers: '/careers',
  Contact: '/contact',
}

const LEFT_LINKS = ['Home', 'About AMP', 'Work']
const RIGHT_LINKS = ['AMP Academy', 'Industries', 'Contact']

// Social links — replace the placeholder URLs with the real AMP profiles.
const SOCIALS = [
  { Icon: FaInstagram, label: 'Instagram', href: '#' },
  { Icon: FaLinkedinIn, label: 'LinkedIn', href: '#' },
  { Icon: FaYoutube, label: 'YouTube', href: '#' },
  { Icon: FaVimeoV, label: 'Vimeo', href: '#' },
]

const linkClass =
  'font-body text-[12px] font-medium uppercase tracking-[0.18em] text-secondary transition-colors duration-200 hover:text-primary'

function FooterLinks({ labels, align }: { labels: string[]; align: 'end' | 'start' }) {
  return (
    <nav
      className={cn(
        'flex flex-col items-center gap-4',
        align === 'end' ? 'md:items-end' : 'md:items-start',
      )}
      aria-label="Footer navigation"
    >
      {labels.map((label) => (
        <Link key={label} to={navToByLabel[label] ?? '/'} className={linkClass}>
          {label}
        </Link>
      ))}
    </nav>
  )
}

export function Footer() {
  const year = 2026

  return (
    <footer className="relative border-t border-line bg-base">
      <Container className="py-16 md:py-20">
        <div className="grid items-center gap-12 md:grid-cols-3 md:gap-8">
          {/* Left links */}
          <FooterLinks labels={LEFT_LINKS} align="end" />

          {/* Center: logo + description + socials */}
          <div className="flex flex-col items-center text-center">
            <Link to="/" aria-label="Action Media Production, home">
              <img
                src="/logo-amp.png"
                alt="Action Media Production"
                className="h-9 w-auto select-none md:h-10"
              />
            </Link>
            <p className="mt-6 max-w-xs font-body text-sm leading-relaxed text-secondary">
              {FOOTER.statement.line}
            </p>
            <div className="mt-7 flex items-center gap-6">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-secondary transition-colors duration-200 hover:text-amp"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Right links */}
          <FooterLinks labels={RIGHT_LINKS} align="start" />
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-line pt-7 text-center">
          <p className="font-body text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            © {year} {BRAND.short}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
