import { Section } from '../components/ui'
import { CtaCard } from '../components/CtaCard'

/**
 * Closing call-to-action under "Our Partners": invites a new project enquiry.
 * The form routes to the contact page with the email prefilled.
 */
export function PartnerCTA() {
  return (
    <Section divider className="py-20 md:py-28">
      <CtaCard
        imageSrc="/placeholders/heavy.jpg"
        title="Let's build your next story"
        description="Bring us your most technical subject. We turn it into cinematic work people can follow, and actually care about."
        inputPlaceholder="Your email"
        buttonText="Start your project"
      />
    </Section>
  )
}
