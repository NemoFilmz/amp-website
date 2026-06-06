import { useState, type FormEvent, type HTMLAttributes } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal } from './Reveal'
import { cn } from '../lib/util'

interface CtaCardProps extends HTMLAttributes<HTMLDivElement> {
  imageSrc: string
  title: string
  description: string
  inputPlaceholder?: string
  buttonText: string
  /** Where the form routes on submit; the email is carried as a query param. */
  to?: string
}

/**
 * Cinematic call-to-action card: a full-bleed graded image with a headline,
 * a short line, and an email capture that routes to the enquiry page.
 *
 * Adapted to the AMP design system (base/amp tokens, Anton/dinosaur fonts,
 * the shared Reveal entrance) from a generic shadcn CTA card, so it sits in
 * the existing token system instead of pulling in a parallel one.
 */
export function CtaCard({
  imageSrc,
  title,
  description,
  inputPlaceholder = 'Email address',
  buttonText,
  to = '/contact',
  className,
  ...props
}: CtaCardProps) {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(email ? `${to}?email=${encodeURIComponent(email)}` : to)
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border border-line',
        className,
      )}
      {...props}
    >
      {/* Background image */}
      <img
        src={imageSrc}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[50%_45%]"
      />
      {/* Left-heavy grade so the copy reads while the imagery stays visible. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(32,33,36,0.95) 0%, rgba(32,33,36,0.82) 40%, rgba(32,33,36,0.55) 72%, rgba(32,33,36,0.35) 100%)',
        }}
      />

      <div className="relative z-10 grid grid-cols-1 items-center gap-10 p-8 md:grid-cols-2 md:gap-12 md:p-14 lg:p-16">
        <Reveal>
          <h2 className="text-balance font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] tracking-tighter text-primary">
            {title}
          </h2>
          <p className="mt-5 max-w-xl font-light text-lg leading-relaxed text-secondary md:text-xl">
            {description}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3 sm:flex-row md:ml-auto md:max-w-md"
          >
            <label htmlFor="cta-email" className="sr-only">
              {inputPlaceholder}
            </label>
            <input
              id="cta-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={inputPlaceholder}
              className="h-12 flex-grow rounded-full border border-line-strong bg-base/60 px-5 font-body text-[15px] text-primary placeholder:text-muted backdrop-blur-sm transition-colors focus:border-amp focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-amp px-6 font-body text-[15px] font-medium uppercase tracking-[0.12em] text-base transition-shadow duration-300 hover:shadow-amp"
            >
              {buttonText}
              <ArrowRight size={16} aria-hidden />
            </button>
          </form>
        </Reveal>
      </div>
    </div>
  )
}
