import { PageHero } from '../components/blocks/PageHero'
import { Container, PendingNote } from '../components/ui/Typography'
import { routes } from '../content/routes'
import type { L } from '../content/types'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

const sections: { id: string; title: L; body: L[] }[] = [
  { id: 'privacidade', title: { pt: '1. Política de Privacidade', en: '1. Privacy Policy' }, body: [
    { pt: 'A Refinaria de Ouro de Angola respeita a privacidade dos utilizadores deste portal e trata os dados pessoais em conformidade com a legislação angolana aplicável à protecção de dados pessoais.', en: 'The Angola Gold Refinery respects the privacy of users of this portal and processes personal data in accordance with applicable Angolan personal-data-protection legislation.' },
    { pt: 'Os dados recolhidos através do formulário de contacto (nome, organização, e-mail, telefone e mensagem) destinam-se exclusivamente a responder ao pedido apresentado e não são cedidos a terceiros para fins comerciais.', en: 'Data collected through the contact form (name, organisation, email, phone and message) is used solely to respond to the request and is not shared with third parties for commercial purposes.' },
    { pt: 'O titular dos dados pode solicitar o acesso, a rectificação ou a eliminação dos seus dados através dos canais oficiais de contacto.', en: 'Data subjects may request access to, rectification or erasure of their data through the official contact channels.' },
  ] },
  { id: 'cookies', title: { pt: '2. Cookies e armazenamento local', en: '2. Cookies and local storage' }, body: [
    { pt: 'Este portal não utiliza cookies de publicidade nem de rastreamento. É guardada localmente no navegador apenas a preferência de idioma, para melhorar a experiência de navegação.', en: 'This portal does not use advertising or tracking cookies. Only the language preference is stored locally in the browser to improve the browsing experience.' },
  ] },
  { id: 'termos', title: { pt: '3. Termos de Utilização', en: '3. Terms of Use' }, body: [
    { pt: 'O conteúdo deste portal tem carácter informativo. A informação institucional é publicada à medida que é oficialmente validada; conteúdos assinalados como «em validação» ou «exemplificativos» não constituem compromisso ou declaração oficial.', en: 'The content of this portal is informative. Institutional information is published as it is officially validated; content marked “under validation” or “sample” does not constitute an official commitment or statement.' },
    { pt: 'As fotografias assinaladas como «Imagem ilustrativa» não retratam as instalações da Refinaria. Os direitos das fotografias pertencem aos respectivos autores, conforme indicado na página Créditos de Imagem.', en: 'Photographs marked “Illustrative image” do not depict the Refinery’s facilities. Photograph rights belong to their respective authors, as listed on the Image Credits page.' },
    { pt: 'É proibida a reprodução dos conteúdos institucionais para fins comerciais sem autorização prévia.', en: 'Reproduction of institutional content for commercial purposes without prior authorisation is prohibited.' },
  ] },
]

export default function LegalPage() {
  const { t } = useLang()
  const r = routes.legal
  return (
    <>
      <Seo title={t(r.title)} description={t(r.description)} image="ingot-display" />
      <PageHero compact eyebrow={t(r.title)} title={t(r.title)} image="ingot-display" crumbs={[{ label: t(r.title) }]} />
      <section className="bg-white py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <nav aria-label={t({ pt: 'Índice', en: 'Contents' })} className="lg:col-span-3">
            <ul className="space-y-3 lg:sticky lg:top-28">
              {sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="text-sm text-charcoal-500 hover:text-forest">{t(s.title)}</a></li>)}
            </ul>
          </nav>
          <div className="max-w-3xl lg:col-span-8 lg:col-start-5">
            <PendingNote>{t({ pt: 'Texto-base sujeito a revisão jurídica e aprovação institucional antes da publicação definitiva.', en: 'Base text subject to legal review and institutional approval before final publication.' })}</PendingNote>
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 pt-14">
                <h2 className="font-display text-3xl text-forest sm:text-4xl">{t(s.title)}</h2>
                {s.body.map((p, i) => <p key={i} className="mt-5 text-lg leading-relaxed text-charcoal-700">{t(p)}</p>)}
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
