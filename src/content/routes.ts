/**
 * Registo central de rotas públicas. Partilhado entre a aplicação (navegação,
 * pesquisa, SEO) e o vite.config.ts (geração de sitemap.xml).
 * Não importar aqui código que dependa do browser.
 */
export type Lang = 'pt' | 'en'
export type L = { pt: string; en: string }

export type RouteKey =
  | 'home' | 'about' | 'history' | 'mission' | 'governance' | 'infrastructure'
  | 'process' | 'services' | 'quality' | 'sustainability' | 'hse' | 'ethics'
  | 'news' | 'gallery' | 'documents' | 'careers' | 'partners' | 'faq'
  | 'contact' | 'legal' | 'credits' | 'ceo'
  | 'valueChain' | 'technologies' | 'contrastaria'

export interface RouteMeta {
  key: RouteKey
  path: string
  title: L
  description: L
  priority: number
}

export const routes: Record<RouteKey, RouteMeta> = {
  home: { key: 'home', path: '/', priority: 1,
    title: { pt: 'Início', en: 'Home' },
    description: { pt: 'Refinaria de Ouro de Angola — Grupo ENDIAMA. Transformação de metais preciosos com rigor técnico, rastreabilidade e compromisso com o desenvolvimento de Angola.', en: 'Angola Gold Refinery — ENDIAMA Group. Precious-metal transformation built on technical rigour, traceability and a commitment to Angola’s development.' } },
  about: { key: 'about', path: '/sobre-nos', priority: 0.9,
    title: { pt: 'Sobre Nós', en: 'About Us' },
    description: { pt: 'Conheça a Refinaria de Ouro de Angola, o seu propósito institucional e a ligação ao Grupo ENDIAMA.', en: 'Discover the Angola Gold Refinery, its institutional purpose and its connection to the ENDIAMA Group.' } },
  history: { key: 'history', path: '/historia-e-identidade', priority: 0.7,
    title: { pt: 'História e Identidade', en: 'History and Identity' },
    description: { pt: 'A identidade da Refinaria de Ouro de Angola e o percurso que dá sentido à valorização do ouro angolano.', en: 'The identity of the Angola Gold Refinery and the journey behind adding value to Angolan gold.' } },
  mission: { key: 'mission', path: '/missao-visao-valores', priority: 0.7,
    title: { pt: 'Missão, Visão e Valores', en: 'Mission, Vision and Values' },
    description: { pt: 'Missão, visão e valores que orientam a Refinaria de Ouro de Angola.', en: 'The mission, vision and values guiding the Angola Gold Refinery.' } },
  governance: { key: 'governance', path: '/governanca', priority: 0.6,
    title: { pt: 'Governança e Estrutura Institucional', en: 'Governance and Institutional Structure' },
    description: { pt: 'Princípios de governação, prestação de contas e estrutura institucional.', en: 'Governance principles, accountability and institutional structure.' } },
  infrastructure: { key: 'infrastructure', path: '/infraestrutura-e-tecnologia', priority: 0.7,
    title: { pt: 'Infraestrutura e Tecnologia', en: 'Infrastructure and Technology' },
    description: { pt: 'Infraestrutura industrial e tecnologia ao serviço da refinação de metais preciosos.', en: 'Industrial infrastructure and technology serving precious-metal refining.' } },
  process: { key: 'process', path: '/processo-de-refinacao', priority: 0.8,
    title: { pt: 'Processo de Refinação', en: 'Refining Process' },
    description: { pt: 'Da recepção à expedição: as etapas de um processo de refinação de ouro rigoroso e rastreável.', en: 'From receipt to dispatch: the stages of a rigorous, traceable gold-refining process.' } },
  services: { key: 'services', path: '/servicos', priority: 0.8,
    title: { pt: 'Serviços e Soluções', en: 'Services and Solutions' },
    description: { pt: 'Áreas de competência em refinação, ensaio, fundição, controlo de qualidade e rastreabilidade.', en: 'Areas of expertise in refining, assaying, casting, quality control and traceability.' } },
  quality: { key: 'quality', path: '/qualidade-e-laboratorios', priority: 0.7,
    title: { pt: 'Qualidade e Laboratórios', en: 'Quality and Laboratories' },
    description: { pt: 'Boas práticas laboratoriais, controlo de qualidade e cultura de rigor.', en: 'Good laboratory practice, quality control and a culture of rigour.' } },
  sustainability: { key: 'sustainability', path: '/sustentabilidade-esg', priority: 0.7,
    title: { pt: 'Sustentabilidade e ESG', en: 'Sustainability and ESG' },
    description: { pt: 'Ambiente, pessoas, ética e desenvolvimento local no centro da actividade.', en: 'Environment, people, ethics and local development at the heart of our activity.' } },
  hse: { key: 'hse', path: '/saude-seguranca-ambiente', priority: 0.6,
    title: { pt: 'Saúde, Segurança e Ambiente', en: 'Health, Safety and Environment' },
    description: { pt: 'Compromisso com a saúde, a segurança operacional e a protecção ambiental.', en: 'Commitment to health, operational safety and environmental protection.' } },
  ethics: { key: 'ethics', path: '/etica-e-fornecimento-responsavel', priority: 0.6,
    title: { pt: 'Ética, Transparência e Fornecimento Responsável', en: 'Ethics, Transparency and Responsible Sourcing' },
    description: { pt: 'Integridade, transparência e diligência devida na cadeia de fornecimento.', en: 'Integrity, transparency and due diligence across the supply chain.' } },
  news: { key: 'news', path: '/noticias', priority: 0.8,
    title: { pt: 'Notícias e Comunicados', en: 'News and Announcements' },
    description: { pt: 'Notícias, comunicados e informação institucional.', en: 'News, announcements and institutional information.' } },
  gallery: { key: 'gallery', path: '/galeria', priority: 0.5,
    title: { pt: 'Galeria Multimédia', en: 'Media Gallery' },
    description: { pt: 'Galeria fotográfica e multimédia.', en: 'Photo and media gallery.' } },
  documents: { key: 'documents', path: '/documentos', priority: 0.5,
    title: { pt: 'Documentos e Publicações', en: 'Documents and Publications' },
    description: { pt: 'Documentos institucionais, políticas e publicações.', en: 'Institutional documents, policies and publications.' } },
  careers: { key: 'careers', path: '/carreiras', priority: 0.6,
    title: { pt: 'Oportunidades e Carreiras', en: 'Opportunities and Careers' },
    description: { pt: 'Construa uma carreira na transformação de metais preciosos em Angola.', en: 'Build a career in precious-metal transformation in Angola.' } },
  partners: { key: 'partners', path: '/parceiros-e-investidores', priority: 0.6,
    title: { pt: 'Parceiros e Investidores', en: 'Partners and Investors' },
    description: { pt: 'Oportunidades de cooperação institucional, técnica e comercial.', en: 'Opportunities for institutional, technical and commercial cooperation.' } },
  faq: { key: 'faq', path: '/perguntas-frequentes', priority: 0.5,
    title: { pt: 'Perguntas Frequentes', en: 'Frequently Asked Questions' },
    description: { pt: 'Respostas às perguntas mais frequentes.', en: 'Answers to frequently asked questions.' } },
  contact: { key: 'contact', path: '/contactos', priority: 0.8,
    title: { pt: 'Contactos', en: 'Contact' },
    description: { pt: 'Entre em contacto com a Refinaria de Ouro de Angola.', en: 'Get in touch with the Angola Gold Refinery.' } },
  legal: { key: 'legal', path: '/privacidade-e-termos', priority: 0.3,
    title: { pt: 'Política de Privacidade e Termos', en: 'Privacy Policy and Terms' },
    description: { pt: 'Política de privacidade, termos de utilização e cookies.', en: 'Privacy policy, terms of use and cookies.' } },
  ceo: { key: 'ceo', path: '/lideranca/domingos-kimba-baptista', priority: 0.8,
    title: { pt: 'Domingos Kimba Baptista — Director Geral', en: 'Domingos Kimba Baptista — Director General' },
    description: { pt: 'Perfil executivo de Domingos Kimba Baptista, Director Geral da Refinaria de Ouro de Angola.', en: 'Executive profile of Domingos Kimba Baptista, Director General of the Angola Gold Refinery.' } },
  valueChain: { key: 'valueChain', path: '/cadeia-de-valor', priority: 0.8,
    title: { pt: 'Cadeia de Valor e Capacidade', en: 'Value Chain and Capacity' },
    description: { pt: 'Cadeia de valor integrada — análise, refinação, purificação e certificação — e capacidade de refinação da Refinaria de Ouro de Angola.', en: 'Integrated value chain — analysis, refining, purification and certification — and refining capacity of the Angola Gold Refinery.' } },
  technologies: { key: 'technologies', path: '/tecnologias-de-refinacao', priority: 0.8,
    title: { pt: 'Tecnologias de Refinação', en: 'Refining Technologies' },
    description: { pt: 'Tratamento por água-régia e refinação por electrólise: os dois sistemas complementares de refinação do ouro e da prata.', en: 'Aqua regia treatment and electrolytic refining: the two complementary gold and silver refining systems.' } },
  contrastaria: { key: 'contrastaria', path: '/contrastaria-e-certificacao', priority: 0.8,
    title: { pt: 'Contrastaria e Certificação', en: 'Assay Office and Certification' },
    description: { pt: 'Ensaio e determinação do título, certificado de origem e pureza, rastreabilidade, conformidade e marcação (hallmarking) de metais preciosos.', en: 'Assaying and fineness determination, certificate of origin and purity, traceability, compliance and hallmarking of precious metals.' } },
  credits: { key: 'credits', path: '/creditos-de-imagem', priority: 0.2,
    title: { pt: 'Créditos de Imagem', en: 'Image Credits' },
    description: { pt: 'Autoria, licenças e origem das fotografias utilizadas.', en: 'Authorship, licences and origin of the photographs used.' } },
}

export const routeList = Object.values(routes)
export const path = (key: RouteKey) => routes[key].path
