import { BlockRenderer } from '../components/blocks/Blocks'
import { PageHero } from '../components/blocks/PageHero'
import { RelatedLinks } from '../components/blocks/RelatedLinks'
import { Reveal } from '../components/ui/Reveal'
import { ButtonLink, Container } from '../components/ui/Typography'
import { useContent } from '../content/ContentContext'
import { routes, path } from '../content/routes'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

export default function CareersPage() {
  const { t, u } = useLang()
  const { content } = useContent()
  const r = routes.careers
  const jobs = content.jobs.filter((j) => j.open)
  return (
    <>
      <Seo title={t(r.title)} description={t(r.description)} image="laboratory-team" />
      <PageHero eyebrow={t(r.title)} title={t({ pt: 'Talento angolano para uma indústria de excelência.', en: 'Angolan talent for an industry of excellence.' })} intro={t({ pt: 'Metalurgia, química analítica, segurança, engenharia e gestão: procuramos profissionais comprometidos com o rigor e a integridade.', en: 'Metallurgy, analytical chemistry, safety, engineering and management: we seek professionals committed to rigour and integrity.' })} image="laboratory-team" crumbs={[{ label: t(r.title) }]} />
      <BlockRenderer blocks={[
        { type: 'pillars', eyebrow: { pt: 'Porquê juntar-se a nós', en: 'Why join us' }, title: { pt: 'Uma carreira com significado.', en: 'A career with meaning.' }, items: [
          { title: { pt: 'Conhecimento especializado', en: 'Specialised knowledge' }, text: { pt: 'Contacto com técnicas de refinação e análise de metais preciosos.', en: 'Exposure to precious-metal refining and analysis techniques.' } },
          { title: { pt: 'Formação contínua', en: 'Continuous training' }, text: { pt: 'Desenvolvimento técnico e comportamental ao longo da carreira.', en: 'Technical and soft-skills development throughout your career.' } },
          { title: { pt: 'Impacto nacional', en: 'National impact' }, text: { pt: 'Contribuir para a valorização dos recursos de Angola.', en: 'Contribute to adding value to Angola’s resources.' } },
        ] },
      ]} />
      <section className="bg-ivory py-20 sm:py-28" aria-labelledby="jobs-title">
        <Container>
          <h2 id="jobs-title" className="font-display text-4xl text-forest sm:text-5xl">{t({ pt: 'Vagas abertas', en: 'Open positions' })}</h2>
          {jobs.length ? (
            <ul className="mt-10 border-t border-ivory-300">
              {jobs.map((j) => (
                <li key={j.id} className="grid gap-2 border-b border-ivory-300 py-6 sm:grid-cols-12 sm:items-center">
                  <span className="font-display text-2xl text-forest sm:col-span-6">{t(j.title)}</span>
                  <span className="text-sm text-charcoal-500 sm:col-span-2">{t(j.area)}</span>
                  <span className="text-sm text-charcoal-500 sm:col-span-2">{t(j.location)}</span>
                  <span className="text-sm text-charcoal-500 sm:col-span-2">{t(j.type)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal className="mt-10 max-w-2xl border-l-2 border-gold pl-6">
              <p className="font-display text-2xl text-forest">{u('noJobs')}</p>
              <p className="mt-3 text-charcoal-500">{u('noJobsText')}</p>
              <ButtonLink to={`${path('contact')}?assunto=carreiras`} variant="outline" className="mt-8">{u('applyInterest')}</ButtonLink>
            </Reveal>
          )}
        </Container>
      </section>
      <RelatedLinks />
    </>
  )
}
