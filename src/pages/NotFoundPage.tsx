import { PageHero } from '../components/blocks/PageHero'
import { ButtonLink, Container } from '../components/ui/Typography'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

export default function NotFoundPage() {
  const { u } = useLang()
  return (
    <>
      <Seo title={u('notFoundTitle')} description={u('notFoundText')} noindex />
      <PageHero compact eyebrow="404" title={u('notFoundTitle')} intro={u('notFoundText')} image="gold-nugget" />
      <section className="bg-ivory py-20"><Container><ButtonLink to="/">{u('backHome')}</ButtonLink></Container></section>
    </>
  )
}
