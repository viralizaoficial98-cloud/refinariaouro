import { PageHero } from '../components/blocks/PageHero'
import { RelatedLinks } from '../components/blocks/RelatedLinks'
import { ProcessStory } from '../components/home/ProcessStory'
import { Reveal } from '../components/ui/Reveal'
import { ButtonLink, Container, PendingNote } from '../components/ui/Typography'
import { routes, path } from '../content/routes'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

export default function ProcessPage() {
  const { t } = useLang()
  const r = routes.process
  return (
    <>
      <Seo title={t(r.title)} description={t(r.description)} image="crucible-casting" />
      <PageHero eyebrow={t(r.title)} title={t({ pt: 'Da recepção ao lingote: um ciclo integralmente rastreável.', en: 'From receipt to bar: a fully traceable cycle.' })} intro={t({ pt: 'A refinação de ouro combina metalurgia, química analítica e controlo documental. Cada etapa produz registos que garantem a integridade da cadeia de custódia.', en: 'Gold refining combines metallurgy, analytical chemistry and document control. Every stage produces records that guarantee chain-of-custody integrity.' })} image="crucible-casting" crumbs={[{ label: t(r.title) }]} />
      <section className="bg-ivory py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7"><p className="font-display text-3xl leading-snug text-forest sm:text-4xl">{t({ pt: 'Rastreabilidade não é uma etapa — é o fio condutor de todo o processo.', en: 'Traceability is not a stage — it is the thread running through the entire process.' })}</p></Reveal>
          <Reveal delay={0.15} className="self-end lg:col-span-4 lg:col-start-9"><PendingNote>{t({ pt: 'Descrição técnica de carácter geral. Parâmetros operacionais, métodos específicos e equipamentos da Refinaria serão publicados após validação técnica.', en: 'General technical description. The Refinery’s specific operating parameters, methods and equipment will be published after technical validation.' })}</PendingNote></Reveal>
        </Container>
      </section>
      <ProcessStory showHeader={false} showLink={false} />
      <section className="bg-ivory py-20 sm:py-24">
        <Container className="flex flex-wrap items-center justify-between gap-8">
          <p className="max-w-xl font-display text-3xl text-forest">{t({ pt: 'Pretende saber mais sobre os requisitos de recepção de material?', en: 'Want to know more about material-receipt requirements?' })}</p>
          <ButtonLink to={`${path('contact')}?assunto=fornecimento`}>{t({ pt: 'Contactar', en: 'Contact us' })}</ButtonLink>
        </Container>
      </section>
      <RelatedLinks />
    </>
  )
}
