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

Logotipo oficial em PNG transparente: `public/brand/logo.png` (+ `logo.webp` com transparência), obtido do ficheiro
fornecido (`assets-src/brand/logo-transparent.png`) apenas com recorte das margens vazias — sem alteração de
proporções nem cores. Não há caixa nem placa por trás do logotipo. Sobre fundos escuros (hero, rodapé, menu mobile)
o componente `Logo` com `tone="dark"` aplica apenas um halo luminoso muito suave (CSS `drop-shadow`) para
legibilidade. O favicon usa o emblema transparente. Caminho configurável em `src/content/site.ts` (`brand.logoSrc`).
Recomenda-se uma versão vectorial (SVG) oficial quando disponível.

## Conteúdos da brochura institucional

Fonte: `Brochura ROA_OC_NF.pdf` (8 páginas). Textos em `src/content/brochure.ts` (PT/EN), editáveis no
backoffice › Conteúdos da brochura. Correcções apenas ortográficas («fabriação de barras de outo» → «fabrico de
barras de ouro»; «A posição da marca» → «Aposição da marca»; «às necessidade» → «às necessidades»).

| Página da brochura | Onde está no portal |
| --- | --- |
| 1 — «Ouro Angolano ganha valor em Angola.» | Homepage › Apresentação institucional (título + fotografia da capa) |
| 2 — Apresentação, Cadeia de Valor Integrada, metais, objectivo | Homepage › Cadeia de Valor; `/cadeia-de-valor`; Sobre Nós |
| 3 — Missão, Visão, 6 Valores | Homepage › A Refinaria; `/missao-visao-valores` |
| 4 — Nossos Serviços (01–03), Capacidade 25 kg/dia | Homepage › Nossos Serviços e Capacidade; `/servicos`; `/cadeia-de-valor#capacidade` |
| 5 — Técnicas de refinação, Fine Gold | Homepage › Técnicas; `/tecnologias-de-refinacao` |
| 6–7 — Contrastaria, Vantagens e Impacto, Ensaio, Certificado, Rastreabilidade, Hallmarking | Homepage › Contrastaria; `/contrastaria-e-certificacao` |
| 8 — Contactos e assinatura «Pureza • Autenticidade • Conformidade • Rastreabilidade» | Rodapé, `/contactos`, homepage |

Fotografias: 14 imagens originais extraídas do PDF (`pdfimages`, sem capturas de página), com as máscaras de
transparência originais aplicadas aos recortes (barras de ouro). Ficheiros `assets-src/images/brochure-*`,
assinalados como «Brochura institucional». Ícones e texturas de fundo da brochura não foram usados.
Versão anterior recuperável pela tag git `pre-brochura-v1`.

## Imagens e créditos

- Retrato oficial do CEO (`ceo-domingos-kimba-baptista`): fotografia fornecida pela Refinaria, usada sem
  alterações (apenas optimizada para web). Perfil em `src/content/leadership.ts` (backoffice › Liderança): só nome,
  cargo e texto institucional proposto — formação e percurso não são apresentados por não terem sido verificados
  (o perfil LinkedIn indicado não pôde ser consultado). Endereço `/lideranca/domingos-kimba-baptista`; endereços
  antigos em `/lideranca/*` redireccionam para ele.

- Bandeiras do selector de idioma (`public/flags/pt.svg`, `public/flags/us.svg`): SVG oficiais de Portugal e dos
  Estados Unidos, do domínio público, obtidos da Wikimedia Commons e servidos localmente.

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
- Selector de idioma PT/EN com bandeiras; a escolha persiste entre páginas e após recarregar (`localStorage`, `?lang=`).
- `prefers-reduced-motion` respeitado (sem Ken Burns, parallax nem autoplay), navegação por teclado,
  foco visível, skip link, diálogos com focus trap, hero com pausa/retoma e setas do teclado.
- SPA: para indexação mais robusta considerar pré-renderização (ex.: `vite-react-ssg`) numa fase seguinte.

## Publicação

Build estático (`dist/`). Incluídos: `.htaccess` (Apache/cPanel), `_redirects` (Netlify) e `vercel.json` para
encaminhar todas as rotas para `index.html`.

## Pendências para publicação oficial

- Versão vectorial (SVG) do logotipo e direitos das imagens do hero.
- Contactos da brochura (telefone «900 000 000» — aparenta ser provisório —, geral@roa.co.ao, www.roa.co.ao,
  Polo de Desenvolvimento Industrial de Viana) publicados com nota «em validação» → confirmar no backoffice › Contactos.
- Dados da brochura a validar: capacidade de 25 kg de ouro por dia; «primeira unidade do género no país»;
  contrastaria, marcação oficial e emissão de certificados (enquadramento regulamentar); direitos das fotografias da brochura.
- Endpoint do formulário (`VITE_CONTACT_ENDPOINT`) com validação e anti-spam no servidor (rate limit, CAPTCHA).
- Backend do CMS (`VITE_API_BASE_URL`) com autenticação segura.
- Validação institucional dos textos, serviços, políticas e documentos.
