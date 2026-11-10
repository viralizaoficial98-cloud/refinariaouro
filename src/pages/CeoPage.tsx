import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Picture } from '../components/ui/Picture'
import { MaskReveal, Reveal, staggerChild, staggerParent } from '../components/ui/Reveal'
import { ButtonLink, Container, Eyebrow, PendingNote } from '../components/ui/Typography'
import { useContent } from '../content/ContentContext'
import { routes, path } from '../content/routes'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

export default function CeoPage() {
  const { t, u } = useLang()
  const { content } = useContent()
  const c = content.leadership
  const r = routes.ceo
  return (
    <>
      <Seo title={t(r.title)} description={t(r.description)} image={c.image}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'Person', name: c.name, jobTitle: 'Director Geral', worksFor: { '@type': 'Organization', name: 'Refinaria de Ouro de Angola' }, ...(c.education.length ? { alumniOf: c.education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution })) } : {}) }} />

      {/* Cabeçalho do perfil */}
      <section className="relative overflow-hidden bg-forest-900 pb-20 pt-36 text-ivory sm:pt-40 lg:pb-28 lg:pt-48">
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <Container className="grid items-end gap-14 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <nav aria-label={u('breadcrumb')}>
              <ol className="flex flex-wrap items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-ivory/60">
                <li><Link to="/" className="hover:text-gold-light">{u('home')}</Link></li>
                <li className="flex items-center gap-2"><span aria-hidden className="text-gold">/</span><Link to={path('about')} className="hover:text-gold-light">{t(routes.about.title)}</Link></li>
                <li className="flex items-center gap-2"><span aria-hidden className="text-gold">/</span><span aria-current="page" className="text-ivory/85">{t({ pt: 'Liderança', en: 'Leadership' })}</span></li>
              </ol>
            </nav>
            <Reveal delay={0.1} className="mt-10"><Eyebrow light>{t({ pt: 'Perfil Executivo', en: 'Executive Profile' })}</Eyebrow></Reveal>
            <Reveal delay={0.2}><h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-[5rem]">{c.name}</h1></Reveal>
            <Reveal delay={0.3}><p className="mt-5 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-gold-light">{t(c.role)}</p></Reveal>
            <Reveal delay={0.4}><p className="mt-10 max-w-2xl font-display text-2xl leading-snug text-ivory/85 sm:text-3xl">{t(c.headline)}</p></Reveal>
          </div>
          <div className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:col-span-4 lg:col-start-9 lg:max-w-none">
            <div className="relative">
              <span aria-hidden className="absolute -left-4 -top-4 h-full w-full border border-gold/50" />
              <MaskReveal className="group relative aspect-[4/5] overflow-hidden bg-white">
                <Picture id={c.image} alt={`${c.name}, ${t(c.role)}`} priority sizes="(min-width: 1024px) 33vw, 80vw" className="block h-full w-full" imgClassName="h-full w-full object-cover object-top transition-transform duration-[1600ms] ease-lux group-hover:scale-[1.035]" />
              </MaskReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Biografia */}
      <section className="bg-ivory py-20 sm:py-28" aria-labelledby="bio-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal><Eyebrow>{t({ pt: 'Biografia', en: 'Biography' })}</Eyebrow></Reveal>
            <Reveal delay={0.1}><h2 id="bio-title" className="mt-7 font-display text-4xl text-forest sm:text-5xl">{t(c.subtitle)}</h2></Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {c.bio.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className={`leading-relaxed text-charcoal-700 ${i === 0 ? 'font-display text-2xl leading-snug text-forest sm:text-3xl' : 'mt-7 text-lg'}`}>{t(p)}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Percurso académico e experiência — só apresentados quando existem dados verificados */}
      {(c.education.length > 0 || c.experience.institutions.length > 0) && (
      <section className="bg-white py-20 sm:py-28">
        <Container className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal><Eyebrow>{t({ pt: 'Percurso Académico', en: 'Education' })}</Eyebrow></Reveal>
            <motion.ol variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }} className="mt-10 border-t border-ivory-300">
              {c.education.map((e, i) => (
                <motion.li key={i} variants={staggerChild} className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-ivory-300 py-7">
                  <span className="font-display text-2xl text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-display text-2xl text-forest transition-transform duration-500 ease-lux group-hover:translate-x-1 sm:text-[1.75rem]">{t(e.degree)}</p>
                    <p className="mt-1 text-sm uppercase tracking-[0.16em] text-charcoal-500">{e.institution}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
          <div>
            <Reveal><Eyebrow>{t({ pt: 'Experiência Profissional', en: 'Professional Experience' })}</Eyebrow></Reveal>
            <Reveal delay={0.1}><p className="mt-10 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-charcoal-500">{t({ pt: 'Instituições de referência do sector mineiro', en: 'Leading mining-sector institutions' })}</p></Reveal>
            <motion.ul variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }} className="mt-4 border-t border-ivory-300">
              {c.experience.institutions.map((inst) => (
                <motion.li key={inst} variants={staggerChild} className="group flex items-center gap-5 border-b border-ivory-300 py-6">
                  <span aria-hidden className="h-px w-6 bg-gold transition-all duration-500 ease-lux group-hover:w-10" />
                  <span className="font-display text-2xl text-forest sm:text-[1.75rem]">{inst}</span>
                </motion.li>
              ))}
            </motion.ul>
            <Reveal delay={0.2}>
              <p className="mt-10 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-charcoal-500">{t({ pt: 'Áreas de actuação', en: 'Areas of activity' })}</p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {c.experience.areas.map((a, i) => (
                  <li key={i} className="border border-gold/50 px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-forest">{t(a)}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>
      )}

      <section className="bg-ivory pb-20 pt-4">
        <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          {c.status === 'a-confirmar' && (
            <PendingNote className="max-w-2xl">{t({ pt: 'Nome e cargo indicados pela Refinaria. O texto apresentado é uma proposta editorial institucional (não constitui declaração pessoal) e está sujeito a aprovação antes da publicação definitiva.', en: 'Name and position as indicated by the Refinery. The text shown is an institutional editorial proposal (not a personal statement) and is subject to approval before final publication.' })}</PendingNote>
          )}
          <ButtonLink to={path('about')} variant="outline">{t({ pt: 'Conhecer a Refinaria', en: 'Discover the Refinery' })}</ButtonLink>
        </Container>
      </section>
    </>
  )
}
