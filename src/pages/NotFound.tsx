import { ArrowRight } from 'lucide-react'
import { Container, CTAButton } from '../components/ui'

export function NotFound() {
  return (
    <section className="grain relative flex min-h-[70vh] items-center pt-24">
      <Container className="text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-5 font-display text-[clamp(3rem,10vw,7rem)] leading-[0.9] tracking-tighter text-primary">
          Page Not Found
        </h1>
        <p className="mx-auto mt-5 max-w-md font-body text-lg leading-relaxed text-secondary">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <CTAButton variant="primary" to="/" icon={<ArrowRight size={16} aria-hidden />}>
            Back to home
          </CTAButton>
          <CTAButton variant="outline" to="/work">
            View our work
          </CTAButton>
        </div>
      </Container>
    </section>
  )
}
