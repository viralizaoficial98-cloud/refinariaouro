/**
 * Optimização de imagens: lê assets-src/images/* e gera variantes AVIF + WebP
 * em public/images/, além de um manifesto com dimensões e créditos
 * (src/content/image-manifest.json). Executar com `npm run images`.
 */
import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const srcDir = path.join(root, 'assets-src/images')
const outDir = path.join(root, 'public/images')
const widths = [640, 1280, 1920]

const sources = JSON.parse(await readFile(path.join(root, 'scripts/image-sources.json'), 'utf8'))
await mkdir(outDir, { recursive: true })

const manifest = {}
for (const file of (await readdir(srcDir)).sort()) {
  if (!/\.(jpe?g|png|webp|avif)$/i.test(file)) continue
  const id = file.replace(/\.[^.]+$/, '')
  const input = sharp(path.join(srcDir, file)).rotate()
  const meta = await input.metadata()
  const usable = widths.filter((w) => w <= meta.width)
  if (!usable.length || usable[usable.length - 1] < meta.width) usable.push(Math.min(meta.width, 1920))
  const finalWidths = [...new Set(usable)]
  for (const w of finalWidths) {
    const resized = sharp(path.join(srcDir, file)).rotate().resize({ width: w, withoutEnlargement: true })
    await resized.clone().webp({ quality: 78 }).toFile(path.join(outDir, `${id}-${w}.webp`))
    await resized.clone().avif({ quality: 55, effort: 4 }).toFile(path.join(outDir, `${id}-${w}.avif`))
  }
  const credit = sources[id] ?? { author: 'Por identificar', license: 'Por verificar', source: '' }
  manifest[id] = {
    width: meta.width,
    height: meta.height,
    widths: finalWidths,
    ...credit,
  }
  console.log(`✔ ${id} (${meta.width}×${meta.height}) → ${finalWidths.join(', ')}`)
}
await writeFile(path.join(root, 'src/content/image-manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`Manifesto actualizado com ${Object.keys(manifest).length} imagens.`)
