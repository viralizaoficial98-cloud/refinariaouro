import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { PageHero } from '../components/blocks/PageHero'
import { RelatedLinks } from '../components/blocks/RelatedLinks'
import { Reveal } from '../components/ui/Reveal'
import { Container } from '../components/ui/Typography'
import { useContent } from '../content/ContentContext'
import { routes } from '../content/routes'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

export default function FaqPage() {
  const { t } = useLang()
  const { content } = useContent()
  const [open, setOpen] = useState<number | null>(0)
  const r = routes.faq
  return (
    <>
      <Seo title={t(r.title)} description={t(r.description)} image="gold-nugget"
        jsonLd={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: content.faq.map((f) => ({ '@type': 'Question', name: t(f.q), acceptedAnswer: { '@type': 'Answer', text: t(f.a) } })) }} />
      <PageHero compact eyebrow={t(r.title)} title={t({ pt: 'Respostas claras para perguntas frequentes.', en: 'Clear answers to frequent questions.' })} image="gold-nugget" crumbs={[{ label: t(r.title) }]} />
      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-4xl">
          <ul className="border-t border-ivory-300">
            {content.faq.map((f, i) => (
              <Reveal as="li" key={i} delay={i * 0.04} className="border-b border-ivory-300">
                <h2>
                  <button type="button" id={`faq-q-${i}`} aria-expanded={open === i} aria-controls={`faq-a-${i}`} onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-7 text-left font-display text-2xl text-forest transition-colors hover:text-emerald focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:text-[1.75rem]">
                    {t(f.q)}
                    <span aria-hidden className={`mt-1 text-2xl text-gold-deep transition-transform duration-500 ${open === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                </h2>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <p className="max-w-3xl pb-8 text-lg leading-relaxed text-charcoal-700">{t(f.a)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
      <RelatedLinks />
    </>
  )
}
