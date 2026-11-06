import { useLang } from '../../i18n/LanguageContext'
import { ContactDetails } from '../ui/ContactDetails'
import { ContactForm } from '../ui/ContactForm'
import { Reveal } from '../ui/Reveal'
import { Container, Eyebrow, Heading } from '../ui/Typography'

export function ContactSection() {
  const { t } = useLang()
  return (
    <section className="bg-forest-900 py-24 text-ivory sm:py-32 lg:py-40" aria-labelledby="contact-title">
      <Container className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal><Eyebrow light>{t({ pt: 'Contactos', en: 'Contact' })}</Eyebrow></Reveal>
          <Reveal delay={0.1}><Heading id="contact-title" light className="mt-8">{t({ pt: 'Fale connosco.', en: 'Talk to us.' })}</Heading></Reveal>
          <Reveal delay={0.2}><p className="mt-8 text-lg leading-relaxed text-ivory/70">{t({ pt: 'Para informações institucionais, parcerias, fornecimento ou imprensa, envie-nos a sua mensagem.', en: 'For institutional information, partnerships, supply or press, send us your message.' })}</p></Reveal>
          <Reveal delay={0.3} className="mt-12"><ContactDetails dark /></Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-7 lg:col-start-6">
          <ContactForm dark />
        </Reveal>
      </Container>
    </section>
  )
}
