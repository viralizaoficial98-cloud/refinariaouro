import { HeroSlider } from '../components/home/HeroSlider'
import { IntroSection } from '../components/home/IntroSection'
import { RefinerySection } from '../components/home/RefinerySection'
import { ProcessStory } from '../components/home/ProcessStory'
import { ServicesSection } from '../components/home/ServicesSection'
import { QualitySection } from '../components/home/QualitySection'
import { SustainabilitySection } from '../components/home/SustainabilitySection'
import { InfrastructureSection } from '../components/home/InfrastructureSection'
import { EndiamaSection } from '../components/home/EndiamaSection'
import { NewsSection } from '../components/home/NewsSection'
import { GallerySection } from '../components/home/GallerySection'
import { PartnershipsSection } from '../components/home/PartnershipsSection'
import { ContactSection } from '../components/home/ContactSection'
import { routes } from '../content/routes'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Refinaria de Ouro de Angola',
  alternateName: 'Angola Gold Refinery',
  parentOrganization: { '@type': 'Organization', name: 'ENDIAMA' },
}

export default function HomePage() {
  const { t } = useLang()
  return (
    <>
      <Seo title="" description={t(routes.home.description)} jsonLd={orgJsonLd} />
      <HeroSlider />
      <IntroSection />
      <RefinerySection />
      <ProcessStory />
      <ServicesSection />
      <QualitySection />
      <SustainabilitySection />
      <InfrastructureSection />
      <EndiamaSection />
      <NewsSection />
      <GallerySection />
      <PartnershipsSection />
      <ContactSection />
    </>
  )
}
