import { Hero } from '../sections/Hero'
import { WhoWeAre } from '../sections/WhoWeAre'
import { Industries } from '../sections/Industries'
import { Services } from '../sections/Services'
import { WhyAmp } from '../sections/WhyAmp'
import { GlobalPresence } from '../sections/GlobalPresence'
import { Philosophy } from '../sections/Philosophy'
import { Academy } from '../sections/Academy'
import { ClientExperience } from '../sections/ClientExperience'
import { CTASection } from '../sections/CTASection'

export function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Industries />
      <Services />
      <WhyAmp />
      <GlobalPresence />
      <Philosophy />
      <Academy />
      <ClientExperience />
      <CTASection />
    </>
  )
}
