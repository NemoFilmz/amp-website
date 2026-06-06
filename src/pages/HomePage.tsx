import { Hero } from '../sections/Hero'
import { Industries } from '../sections/Industries'
import { ClientLogos } from '../sections/ClientLogos'
import { PartnerCTA } from '../sections/PartnerCTA'

/**
 * Home page: Hero -> Industries -> Our Partners -> closing CTA, then the
 * footer. The "Complex, made clear" intro now lives on the About page.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Industries />
      <ClientLogos />
      <PartnerCTA />
    </>
  )
}
