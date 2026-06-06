import { Hero } from '../sections/Hero'
import { Industries } from '../sections/Industries'
import { ClientLogos } from '../sections/ClientLogos'

/**
 * Home page: Hero -> Industries -> Our Partners, then the footer.
 * The "Complex, made clear" intro now lives on the About page.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Industries />
      <ClientLogos />
    </>
  )
}
