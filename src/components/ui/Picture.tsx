import { fallbackSrc, images, srcSet } from '../../content/images'

interface Props {
  id: string
  alt: string
  sizes?: string
  className?: string
  imgClassName?: string
  priority?: boolean
}

/** Imagem responsiva AVIF/WebP com lazy loading e dimensões intrínsecas (evita CLS). */
export function Picture({ id, alt, sizes = '100vw', className = '', imgClassName = '', priority = false }: Props) {
  const meta = images[id]
  if (!meta) return <div className={`bg-forest-800 ${className}`} role="img" aria-label={alt} />
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet(id, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(id, 'webp')} sizes={sizes} />
      <img
        src={fallbackSrc(id)}
        alt={alt}
        width={meta.width}
        height={meta.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
      />
    </picture>
  )
}
