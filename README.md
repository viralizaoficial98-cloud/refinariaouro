# Refinaria de Ouro de Angola — Grupo ENDIAMA · Portal institucional

Portal institucional bilingue (PT-AO / EN), responsivo e acessível, construído com
**React 19 + TypeScript + Vite + Tailwind CSS 3 + Framer Motion + Embla Carousel + React Router 7**.

## Requisitos e comandos

```bash
npm install          # instalar dependências (Node 20+)
npm run dev          # servidor de desenvolvimento (http://localhost:5173)
npm run build        # verificação de tipos + build de produção em dist/ (gera sitemap.xml e robots.txt)
npm run preview      # pré-visualizar o build
npm run images       # regenerar imagens AVIF/WebP e o manifesto de créditos
npm run lint         # oxlint
```

## Variáveis de ambiente

Copiar `.env.example` para `.env` (nunca colocar segredos — tudo o que começa por `VITE_` fica público no bundle):

| Variável | Função |
|---|---|
| `VITE_SITE_URL` | URL canónica (canonical, Open Graph, sitemap). |
| `VITE_CONTACT_ENDPOINT` | Endpoint HTTPS que recebe o formulário (POST JSON). Vazio = o formulário mostra que o envio não está disponível; **nunca simula sucesso**. |
| `VITE_API_BASE_URL` | API do CMS. Vazio = backoffice apenas em modo de demonstração, sem persistência. |

## Estrutura

```
src/
  content/        conteúdos PT/EN (routes, site, home, pages, news), tipos, manifesto de imagens
  components/
    layout/       cabeçalho (dropdowns, pesquisa, idioma), menu mobile de ecrã inteiro, rodapé, transições
    home/         hero slideshow e as secções da homepage
    blocks/       PageHero, blocos editoriais (split, pillars, quote, list, banner, notice, cta)
    ui/           Picture (AVIF/WebP + lazy), Reveal/MaskReveal, formulário, galeria + lightbox
  pages/          páginas internas (20 rotas públicas + notícia individual + 404)
  admin/          backoffice (CMS) e editor genérico de campos PT/EN
  services/       api.ts (contrato REST do CMS), contact.ts (envio do formulário)
  seo/Seo.tsx     title, description, canonical, hreflang, Open Graph, Twitter, JSON-LD
scripts/          optimize-images.mjs, image-sources.json (créditos)
assets-src/       imagens originais (fonte para `npm run images`)
public/           imagens optimizadas, favicon, .htaccess, _redirects
```

## Gestão de conteúdos (backoffice)

Aceder a `/admin`.

- **Sem `VITE_API_BASE_URL`** — modo de demonstração claramente sinalizado: permite editar slides, notícias,
  páginas e textos, serviços, documentos, galeria, vagas, FAQ e contactos (PT/EN). As alterações reflectem-se no
  site apenas na sessão actual e perdem-se ao recarregar. «Exportar conteúdo» descarrega o JSON editado.
- **Com API** — login real (`POST /auth/login`, sessão por cookie HttpOnly), gravação por secção
  (`PUT /content/:secção`), uploads por URL pré-assinada. O contrato completo está documentado em `src/services/api.ts`.
- A protecção de `/admin` no frontend é apenas de interface: **a autorização tem de ser garantida pelo servidor**.
- Menus: definidos em `src/content/site.ts` (`nav`); edição dinâmica quando a API expuser `/content/nav`.

### Regra editorial: só factos confirmados

Cada serviço, documento e contacto tem `status: 'a-confirmar' | 'confirmado'`. Itens «a confirmar» não são
apresentados como factos (serviços surgem como «âmbito em validação», documentos como «em preparação», contactos e
mapa não aparecem). Notícias com `sample: true` mostram a etiqueta «Conteúdo exemplificativo».
Não foram inventados datas de fundação, administradores, capacidades, localização, equipamentos, certificações,
clientes, parceiros nem números.

## Logotipo

Não foi recebido nenhum ficheiro de logotipo. Enquanto não existir, o site mostra uma **assinatura tipográfica
provisória** (não é o logotipo oficial). Para usar o oficial:
1. colocar o ficheiro em `public/brand/logo.svg` (e uma versão clara para fundos escuros, se existir);
2. definir `brand.logoSrc` / `brand.logoLightSrc` em `src/content/site.ts`.
O componente `Logo` usa a imagem sem alterar proporções nem cores.

## Imagens e créditos

- 3 imagens do hero (`hero-*`): referências visuais fornecidas pelo cliente — **confirmar direitos de utilização antes da publicação**.
- Restantes: Wikimedia Commons (CC0, domínio público, CC BY, CC BY-SA), com autor, licença e origem em
  `scripts/image-sources.json` e na página pública `/creditos-de-imagem`.
- Todas são assinaladas como **«Imagem ilustrativa»** — não retratam as instalações reais.
- A 4.ª imagem de referência recebida não foi usada por conter marca de terceiros visível.
- Adicionar imagens: original em `assets-src/images/<id>.jpg`, créditos em `scripts/image-sources.json`, `npm run images`.

## SEO, performance e acessibilidade

- Metadados por página, canonical, hreflang (`?lang=pt|en`), Open Graph/Twitter, JSON-LD (Organization, NewsArticle, FAQPage).
- `sitemap.xml` e `robots.txt` gerados no build a partir de `src/content/routes.ts` (`/admin` excluído).
- Imagens AVIF/WebP em 640/1280/1920 px com `srcset`, lazy loading e dimensões intrínsecas; hero pré-carregado.
- Code splitting por rota; tipos de letra locais (@fontsource).
- `prefers-reduced-motion` respeitado (sem Ken Burns, parallax nem autoplay), navegação por teclado,
  foco visível, skip link, diálogos com focus trap, hero com pausa/retoma e setas do teclado.
- SPA: para indexação mais robusta considerar pré-renderização (ex.: `vite-react-ssg`) numa fase seguinte.

## Publicação

Build estático (`dist/`). Incluídos: `.htaccess` (Apache/cPanel), `_redirects` (Netlify) e `vercel.json` para
encaminhar todas as rotas para `index.html`.

## Pendências para publicação oficial

- Logotipo oficial e direitos das imagens do hero.
- Contactos oficiais (telefone, e-mail, morada, mapa) → backoffice › Contactos, estado «confirmado».
- Endpoint do formulário (`VITE_CONTACT_ENDPOINT`) com validação e anti-spam no servidor (rate limit, CAPTCHA).
- Backend do CMS (`VITE_API_BASE_URL`) com autenticação segura.
- Validação institucional dos textos, serviços, políticas e documentos.
