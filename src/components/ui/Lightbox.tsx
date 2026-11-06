import { AnimatePresence, motion } from 'framer-motion'
import type { GalleryItem } from '../../content/types'
import { useLang } from '../../i18n/LanguageContext'
import { useDialog } from '../../hooks/useDialog'
import { images } from '../../content/images'
import { Picture } from './Picture'

export function Lightbox({ items, index, onClose, onChange }: { items: GalleryItem[]; index: number | null; onClose: () => void; onChange: (i: number) => void }) {
  const { t, u } = useLang()
  const open = index !== null
  const ref = useDialog<HTMLDivElement>(open, onClose)
  const item = open ? items[index] : null
  const meta = item ? images[item.image] : null
  const move = (d: number) => index !== null && onChange((index + d + items.length) % items.length)
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={t(item.caption)}
          className="fixed inset-0 z-[80] flex flex-col bg-charcoal/97 p-4 text-ivory sm:p-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onKeyDown={(e) => { if (e.key === 'ArrowRight') move(1); if (e.key === 'ArrowLeft') move(-1) }}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-ivory/60">{(index ?? 0) + 1} / {items.length}</p>
            <button type="button" data-autofocus onClick={onClose} className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">{u('close')} <span aria-hidden>×</span></button>
          </div>
          <div className="relative flex flex-1 items-center justify-center py-6">
            <AnimatePresence mode="wait">
              <motion.div key={item.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="max-h-full">
                <Picture id={item.image} alt={t(item.caption)} sizes="90vw" imgClassName="max-h-[72vh] w-auto object-contain" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-display text-2xl">{t(item.caption)}</p>
              {meta && <p className="mt-1 text-xs text-ivory/50">{u('illustrative')} · {meta.author} · {meta.license}</p>}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => move(-1)} aria-label={u('previous')} className="flex h-12 w-12 items-center justify-center border border-ivory/25 font-display text-2xl hover:border-gold hover:bg-gold hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"><span aria-hidden>←</span></button>
              <button type="button" onClick={() => move(1)} aria-label={u('next')} className="flex h-12 w-12 items-center justify-center border border-ivory/25 font-display text-2xl hover:border-gold hover:bg-gold hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"><span aria-hidden>→</span></button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
