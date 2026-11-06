import { BlockRenderer } from '../components/blocks/Blocks'
import { PageHero } from '../components/blocks/PageHero'
import { RelatedLinks } from '../components/blocks/RelatedLinks'
import { useContent } from '../content/ContentContext'
import type { PageKey } from '../content/pages'
import { routes } from '../content/routes'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

/** Página interna genérica, construída a partir de blocos editoriais geridos no CMS. */
export default function ContentPage({ pageKey }: { pageKey: PageKey }) {
  const { t } = useLang()
  const { content } = useContent()
  const page = content.pages[pageKey]
  const route = routes[pageKey]
  return (
    <>
      <Seo title={t(route.title)} description={t(route.description)} image={page.heroImage} />
      <PageHero eyebrow={t(page.eyebrow)} title={t(page.title)} intro={t(page.intro)} image={page.heroImage} crumbs={[{ label: t(route.title) }]} />
      <BlockRenderer blocks={page.blocks} />
      <RelatedLinks />
    </>
  )
}
