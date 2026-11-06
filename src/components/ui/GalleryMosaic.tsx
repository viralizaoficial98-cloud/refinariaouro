import { motion } from 'framer-motion'
import { useState } from 'react'
import type { GalleryItem } from '../../content/types'
import { useLang } from '../../i18n/LanguageContext'
import { Picture } from './Picture'
import { Lightbox } from './Lightbox'
import { staggerChild, staggerParent } from './Reveal'

const spanClass: Record<NonNullable<GalleryItem['span']> | 'none', string> = {
  large: 'sm:col-span-2 sm:row-span-2',
  tall: 'sm:row-span-2',
  wide: 'sm:col-span-2',
  none: '',
}

/** Mosaico editorial com lightbox acessível. */
export function GalleryMosaic({ items }: { items: GalleryItem[] }) {
  const { t, u } = useLang()
  const [open, setOpen] = useState<number | null>(null)
  return (
    <>
      <motion.ul variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-5%' }} className="grid auto-rows-[15rem] grid-cols-1 gap-3 sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-4">
        {items.map((g, i) => (
          <motion.li key={g.id} variants={staggerChild} className={spanClass[g.span ?? 'none']}>
            <button type="button" onClick={() => setOpen(i)} className="group relative block h-full w-full overflow-hidden bg-charcoal text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2" aria-label={`${u('openImage')}: ${t(g.caption)}`}>
              <Picture id={g.image} alt="" sizes="(min-width: 1024px) 50vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-110" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 translate-y-2 p-5 transition-transform duration-700 ease-lux group-hover:translate-y-0">
                <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-gold-light">{t(g.category)}</span>
                <span className="mt-1 block font-display text-xl text-ivory">{t(g.caption)}</span>
                <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.2em] text-ivory/55">{u('illustrative')}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </>
  )
}
