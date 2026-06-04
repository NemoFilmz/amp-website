import { Hero } from '../sections/Hero'
import { WhoWeAre } from '../sections/WhoWeAre'
import { Industries } from '../sections/Industries'
import { ClientLogos } from '../sections/ClientLogos'

/**
 * Home page: scrolls Hero -> Who We Are -> Industries -> Our Partners, then the
 * footer reveals itself. The remaining sections live on their own pages.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Industries />
      <ClientLogos />
    </>
  )
}
