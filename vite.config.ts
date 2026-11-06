import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { routeList } from './src/content/routes.ts'
import { initialNews } from './src/content/news.ts'

/** Gera sitemap.xml e robots.txt no build, a partir do registo de rotas. */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const base = siteUrl.replace(/\/$/, '')
      const today = new Date().toISOString().slice(0, 10)
      const urls = [
        ...routeList.map((r) => ({ loc: base + r.path, priority: r.priority })),
        ...initialNews.filter((n) => n.published).map((n) => ({ loc: `${base}/noticias/${n.slug}`, priority: 0.6 })),
      ]
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
        .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.priority.toFixed(1)}</priority></url>`)
        .join('\n')}\n</urlset>\n`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${base}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = env.VITE_SITE_URL || 'https://www.exemplo.ao'
  return {
    plugins: [react(), seoFiles(siteUrl)],
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'motion'
              if (id.includes('react-router')) return 'router'
              if (id.includes('embla')) return 'embla'
              if (id.includes('react')) return 'react'
            }
          },
        },
      },
    },
  }
})
