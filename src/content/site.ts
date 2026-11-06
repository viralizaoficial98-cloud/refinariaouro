import type { ContactInfo, DocumentItem, FaqItem, GalleryItem, Job, NavItem, Service, Slide, L } from './types'
import { path } from './routes'

export const brand = {
  name: { pt: 'Refinaria de Ouro de Angola', en: 'Angola Gold Refinery' } as L,
  group: 'Grupo ENDIAMA',
  /**
   * Caminho do logotipo oficial (ex.: '/brand/logo.svg'). Enquanto vazio, o site
   * apresenta uma assinatura tipográfica provisória — não é o logotipo oficial.
   */
  logoSrc: '',
  logoLightSrc: '',
}

export const initialSlides: Slide[] = [
  {
    id: 's1',
    image: 'hero-molten-pour',
    eyebrow: { pt: 'Refinaria de Ouro de Angola', en: 'Angola Gold Refinery' },
    title: { pt: 'O Valor do Ouro. A Força de Angola.', en: 'The Value of Gold. The Strength of Angola.' },
    subtitle: { pt: 'Transformamos o metal precioso com rigor técnico, rastreabilidade e responsabilidade, ao serviço do desenvolvimento nacional.', en: 'We transform precious metal with technical rigour, traceability and responsibility, in service of national development.' },
    cta: { label: { pt: 'Conhecer a Refinaria', en: 'Discover the Refinery' }, to: path('about') },
  },
  {
    id: 's2',
    image: 'hero-bars-macro',
    eyebrow: { pt: 'Metais preciosos', en: 'Precious metals' },
    title: { pt: 'Excelência na Transformação de Metais Preciosos.', en: 'Excellence in Precious-Metal Transformation.' },
    subtitle: { pt: 'Cada etapa — da recepção ao lingote final — é conduzida com controlo, precisão e integridade.', en: 'Every stage — from receipt to the final bar — is carried out with control, precision and integrity.' },
    cta: { label: { pt: 'O Processo de Refinação', en: 'The Refining Process' }, to: path('process') },
  },
  {
    id: 's3',
    image: 'hero-refining-hall',
    eyebrow: { pt: 'Indústria e futuro', en: 'Industry and future' },
    title: { pt: 'Inovação, Rigor e Confiança para o Futuro.', en: 'Innovation, Rigour and Trust for the Future.' },
    subtitle: { pt: 'Uma plataforma industrial pensada para elevar os padrões do sector mineiro angolano e afirmar o ouro nacional nos mercados.', en: 'An industrial platform designed to raise the standards of Angola’s mining sector and position national gold in the markets.' },
    cta: { label: { pt: 'Infraestrutura e Tecnologia', en: 'Infrastructure and Technology' }, to: path('infrastructure') },
  },
]

export const nav: NavItem[] = [
  {
    label: { pt: 'Institucional', en: 'Institutional' },
    to: path('about'),
    children: [
      { label: { pt: 'Sobre Nós', en: 'About Us' }, to: path('about'), description: { pt: 'Quem somos e o nosso propósito', en: 'Who we are and our purpose' } },
      { label: { pt: 'História e Identidade', en: 'History and Identity' }, to: path('history'), description: { pt: 'A identidade que nos define', en: 'The identity that defines us' } },
      { label: { pt: 'Missão, Visão e Valores', en: 'Mission, Vision and Values' }, to: path('mission'), description: { pt: 'Os princípios que nos orientam', en: 'The principles that guide us' } },
      { label: { pt: 'Governança', en: 'Governance' }, to: path('governance'), description: { pt: 'Estrutura e prestação de contas', en: 'Structure and accountability' } },
      { label: { pt: 'Grupo ENDIAMA', en: 'ENDIAMA Group' }, to: `${path('about')}#grupo-endiama`, description: { pt: 'A ligação institucional', en: 'The institutional connection' } },
    ],
  },
  {
    label: { pt: 'Operações', en: 'Operations' },
    to: path('process'),
    children: [
      { label: { pt: 'Processo de Refinação', en: 'Refining Process' }, to: path('process'), description: { pt: 'Da recepção à expedição', en: 'From receipt to dispatch' } },
      { label: { pt: 'Serviços e Soluções', en: 'Services and Solutions' }, to: path('services'), description: { pt: 'Áreas de competência', en: 'Areas of expertise' } },
      { label: { pt: 'Qualidade e Laboratórios', en: 'Quality and Laboratories' }, to: path('quality'), description: { pt: 'Rigor analítico', en: 'Analytical rigour' } },
      { label: { pt: 'Infraestrutura e Tecnologia', en: 'Infrastructure and Technology' }, to: path('infrastructure'), description: { pt: 'Capacidade industrial', en: 'Industrial capability' } },
    ],
  },
  {
    label: { pt: 'Responsabilidade', en: 'Responsibility' },
    to: path('sustainability'),
    children: [
      { label: { pt: 'Sustentabilidade e ESG', en: 'Sustainability and ESG' }, to: path('sustainability'), description: { pt: 'Ambiente, pessoas e comunidade', en: 'Environment, people and community' } },
      { label: { pt: 'Saúde, Segurança e Ambiente', en: 'Health, Safety and Environment' }, to: path('hse'), description: { pt: 'Prevenção como cultura', en: 'Prevention as culture' } },
      { label: { pt: 'Ética e Fornecimento Responsável', en: 'Ethics and Responsible Sourcing' }, to: path('ethics'), description: { pt: 'Integridade na cadeia de valor', en: 'Integrity across the value chain' } },
    ],
  },
  {
    label: { pt: 'Comunicação', en: 'Media' },
    to: path('news'),
    children: [
      { label: { pt: 'Notícias e Comunicados', en: 'News and Announcements' }, to: path('news'), description: { pt: 'Actualidade institucional', en: 'Institutional news' } },
      { label: { pt: 'Galeria Multimédia', en: 'Media Gallery' }, to: path('gallery'), description: { pt: 'Imagens e multimédia', en: 'Images and media' } },
      { label: { pt: 'Documentos e Publicações', en: 'Documents and Publications' }, to: path('documents'), description: { pt: 'Políticas e relatórios', en: 'Policies and reports' } },
    ],
  },
  {
    label: { pt: 'Oportunidades', en: 'Opportunities' },
    to: path('partners'),
    children: [
      { label: { pt: 'Parceiros e Investidores', en: 'Partners and Investors' }, to: path('partners'), description: { pt: 'Cooperação e investimento', en: 'Cooperation and investment' } },
      { label: { pt: 'Carreiras', en: 'Careers' }, to: path('careers'), description: { pt: 'Junte-se à nossa equipa', en: 'Join our team' } },
      { label: { pt: 'Perguntas Frequentes', en: 'FAQ' }, to: path('faq'), description: { pt: 'Respostas rápidas', en: 'Quick answers' } },
    ],
  },
]

export const initialServices: Service[] = [
  {
    id: 'refining',
    title: { pt: 'Refinação de ouro', en: 'Gold refining' },
    summary: { pt: 'Elevação do teor de pureza do ouro através de processos metalúrgicos controlados e documentados.', en: 'Raising gold purity through controlled, documented metallurgical processes.' },
    details: [
      { pt: 'Tratamento de ouro bruto e doré', en: 'Treatment of raw gold and doré' },
      { pt: 'Separação de impurezas e metais associados', en: 'Separation of impurities and associated metals' },
      { pt: 'Registo integral de cada lote', en: 'Full record of every lot' },
    ],
    image: 'crucible-casting',
    status: 'a-confirmar',
  },
  {
    id: 'assay',
    title: { pt: 'Análise e ensaio', en: 'Analysis and assaying' },
    summary: { pt: 'Determinação do teor de metal precioso com métodos laboratoriais reconhecidos internacionalmente.', en: 'Determining precious-metal content using internationally recognised laboratory methods.' },
    details: [
      { pt: 'Amostragem representativa', en: 'Representative sampling' },
      { pt: 'Ensaio por via seca e métodos instrumentais', en: 'Fire assay and instrumental methods' },
      { pt: 'Relatórios técnicos de resultados', en: 'Technical results reports' },
    ],
    image: 'fire-assay-furnace',
    status: 'a-confirmar',
  },
  {
    id: 'casting',
    title: { pt: 'Fundição', en: 'Casting' },
    summary: { pt: 'Fusão e vazamento de metal precioso em lingotes e formatos normalizados.', en: 'Melting and pouring precious metal into bars and standard formats.' },
    details: [
      { pt: 'Fusão em fornos de indução', en: 'Induction-furnace melting' },
      { pt: 'Vazamento em lingoteiras', en: 'Pouring into ingot moulds' },
      { pt: 'Marcação e identificação', en: 'Marking and identification' },
    ],
    image: 'induction-melting',
    status: 'a-confirmar',
  },
  {
    id: 'quality',
    title: { pt: 'Avaliação e controlo de qualidade', en: 'Evaluation and quality control' },
    summary: { pt: 'Verificação sistemática da conformidade do produto em cada fase do processo.', en: 'Systematic verification of product conformity at every stage.' },
    details: [
      { pt: 'Inspecção dimensional e de peso', en: 'Dimensional and weight inspection' },
      { pt: 'Verificação de pureza', en: 'Purity verification' },
      { pt: 'Gestão de não-conformidades', en: 'Non-conformity management' },
    ],
    image: 'laboratory-analyst',
    status: 'a-confirmar',
  },
  {
    id: 'traceability',
    title: { pt: 'Rastreabilidade', en: 'Traceability' },
    summary: { pt: 'Cadeia de custódia documentada, desde a origem do material até à expedição.', en: 'Documented chain of custody, from material origin to dispatch.' },
    details: [
      { pt: 'Identificação única de lotes', en: 'Unique lot identification' },
      { pt: 'Registos de recepção, processamento e saída', en: 'Receipt, processing and output records' },
      { pt: 'Suporte a auditorias', en: 'Audit support' },
    ],
    image: 'gold-nugget',
    status: 'a-confirmar',
  },
  {
    id: 'advisory',
    title: { pt: 'Assessoria técnica', en: 'Technical advisory' },
    summary: { pt: 'Apoio técnico especializado a entidades do sector dos metais preciosos.', en: 'Specialised technical support for entities in the precious-metals sector.' },
    details: [
      { pt: 'Boas práticas de manuseamento e amostragem', en: 'Handling and sampling best practice' },
      { pt: 'Preparação de material para refinação', en: 'Material preparation for refining' },
      { pt: 'Capacitação técnica', en: 'Technical capacity-building' },
    ],
    image: 'laboratory-team',
    status: 'a-confirmar',
  },
]

export const initialContact: ContactInfo = {
  phones: [{ label: { pt: 'Geral', en: 'General' }, value: '', status: 'a-confirmar' }],
  emails: [{ label: { pt: 'Informações gerais', en: 'General enquiries' }, value: '', status: 'a-confirmar' }],
  address: { value: { pt: '', en: '' }, status: 'a-confirmar' },
  hours: { value: { pt: 'Segunda a sexta-feira', en: 'Monday to Friday' }, status: 'a-confirmar' },
  mapEmbedUrl: '',
  social: [],
}

export const initialDocuments: DocumentItem[] = [
  { id: 'd1', title: { pt: 'Apresentação institucional', en: 'Corporate presentation' }, category: { pt: 'Institucional', en: 'Corporate' }, description: { pt: 'Visão geral da Refinaria, propósito e áreas de actuação.', en: 'Overview of the Refinery, its purpose and areas of activity.' }, url: '', date: '', status: 'a-confirmar' },
  { id: 'd2', title: { pt: 'Política de Fornecimento Responsável', en: 'Responsible Sourcing Policy' }, category: { pt: 'Políticas', en: 'Policies' }, description: { pt: 'Princípios de diligência devida na cadeia de fornecimento de ouro.', en: 'Due-diligence principles across the gold supply chain.' }, url: '', date: '', status: 'a-confirmar' },
  { id: 'd3', title: { pt: 'Código de Ética e Conduta', en: 'Code of Ethics and Conduct' }, category: { pt: 'Políticas', en: 'Policies' }, description: { pt: 'Normas de integridade aplicáveis a colaboradores e parceiros.', en: 'Integrity standards applicable to employees and partners.' }, url: '', date: '', status: 'a-confirmar' },
  { id: 'd4', title: { pt: 'Política de Saúde, Segurança e Ambiente', en: 'Health, Safety and Environment Policy' }, category: { pt: 'Políticas', en: 'Policies' }, description: { pt: 'Compromissos de prevenção e protecção ambiental.', en: 'Prevention and environmental protection commitments.' }, url: '', date: '', status: 'a-confirmar' },
  { id: 'd5', title: { pt: 'Relatório de Sustentabilidade', en: 'Sustainability Report' }, category: { pt: 'Relatórios', en: 'Reports' }, description: { pt: 'Desempenho ambiental, social e de governação.', en: 'Environmental, social and governance performance.' }, url: '', date: '', status: 'a-confirmar' },
  { id: 'd6', title: { pt: 'Guia do fornecedor', en: 'Supplier guide' }, category: { pt: 'Fornecedores', en: 'Suppliers' }, description: { pt: 'Requisitos documentais e procedimentos de recepção de material.', en: 'Documentation requirements and material-receipt procedures.' }, url: '', date: '', status: 'a-confirmar' },
]

export const initialGallery: GalleryItem[] = [
  { id: 'g1', image: 'hero-molten-pour', caption: { pt: 'Vazamento de ouro fundido em lingoteiras', en: 'Pouring molten gold into ingot moulds' }, category: { pt: 'Fundição', en: 'Casting' }, span: 'large' },
  { id: 'g2', image: 'bullion-stack', caption: { pt: 'Barras de ouro', en: 'Gold bars' }, category: { pt: 'Produto', en: 'Product' } },
  { id: 'g3', image: 'induction-melting', caption: { pt: 'Fusão em forno de indução', en: 'Induction-furnace melting' }, category: { pt: 'Fundição', en: 'Casting' }, span: 'tall' },
  { id: 'g4', image: 'laboratory-team', caption: { pt: 'Ambiente laboratorial', en: 'Laboratory environment' }, category: { pt: 'Laboratório', en: 'Laboratory' } },
  { id: 'g5', image: 'fire-assay-furnace', caption: { pt: 'Copelas em mufla de ensaio', en: 'Cupels in an assay muffle furnace' }, category: { pt: 'Ensaio', en: 'Assay' }, span: 'wide' },
  { id: 'g6', image: 'gold-nugget', caption: { pt: 'Pepita de ouro nativo', en: 'Native gold nugget' }, category: { pt: 'Matéria-prima', en: 'Raw material' } },
  { id: 'g7', image: 'crucible-casting', caption: { pt: 'Vazamento a partir de cadinho', en: 'Pouring from a crucible' }, category: { pt: 'Fundição', en: 'Casting' } },
  { id: 'g8', image: 'luanda-bay', caption: { pt: 'Baía de Luanda', en: 'Bay of Luanda' }, category: { pt: 'Angola', en: 'Angola' }, span: 'wide' },
  { id: 'g9', image: 'hero-bars-macro', caption: { pt: 'Detalhe de barras de ouro', en: 'Gold bar detail' }, category: { pt: 'Produto', en: 'Product' } },
  { id: 'g10', image: 'laboratory-analyst', caption: { pt: 'Análise instrumental', en: 'Instrumental analysis' }, category: { pt: 'Laboratório', en: 'Laboratory' } },
  { id: 'g11', image: 'archive-refinery', caption: { pt: 'Arquivo histórico: refinaria de ouro (início do séc. XX)', en: 'Historical archive: gold refinery (early 20th century)' }, category: { pt: 'Arquivo', en: 'Archive' }, span: 'wide' },
  { id: 'g12', image: 'ingot-display', caption: { pt: 'Lingote de ouro histórico', en: 'Historical gold ingot' }, category: { pt: 'Produto', en: 'Product' } },
]

export const initialJobs: Job[] = []

export const initialFaq: FaqItem[] = [
  { q: { pt: 'O que é a Refinaria de Ouro de Angola?', en: 'What is the Angola Gold Refinery?' }, a: { pt: 'É uma instituição industrial dedicada à transformação e valorização de metais preciosos, integrada no universo do Grupo ENDIAMA. A informação institucional detalhada é publicada à medida que é oficialmente validada.', en: 'It is an industrial institution dedicated to transforming and adding value to precious metals, within the ENDIAMA Group. Detailed institutional information is published as it is officially validated.' } },
  { q: { pt: 'Que serviços estão disponíveis?', en: 'Which services are available?' }, a: { pt: 'As áreas de competência apresentadas no portal — refinação, ensaio, fundição, controlo de qualidade, rastreabilidade e assessoria técnica — encontram-se em validação institucional. A disponibilidade efectiva de cada serviço será confirmada pelos canais oficiais.', en: 'The areas of expertise presented on the portal — refining, assaying, casting, quality control, traceability and technical advisory — are under institutional validation. The effective availability of each service will be confirmed through official channels.' } },
  { q: { pt: 'Como posso tornar-me fornecedor ou parceiro?', en: 'How can I become a supplier or partner?' }, a: { pt: 'Utilize o formulário da página de Contactos, seleccionando o assunto «Parcerias» ou «Fornecimento». O pedido será encaminhado para a área competente.', en: 'Use the form on the Contact page, selecting “Partnerships” or “Supply”. Your request will be forwarded to the relevant department.' } },
  { q: { pt: 'Como é garantida a rastreabilidade do ouro?', en: 'How is gold traceability ensured?' }, a: { pt: 'O processo de refinação assenta em princípios de cadeia de custódia: identificação de cada lote na recepção, registo de todas as operações e documentação de saída. As políticas formais serão publicadas na secção de Documentos.', en: 'The refining process is built on chain-of-custody principles: identification of every lot on receipt, recording of all operations and output documentation. Formal policies will be published in the Documents section.' } },
  { q: { pt: 'Onde posso consultar oportunidades de emprego?', en: 'Where can I find job opportunities?' }, a: { pt: 'As vagas abertas são publicadas na página Oportunidades e Carreiras. Quando não existirem vagas, poderá manifestar interesse através do formulário de contacto.', en: 'Open positions are published on the Opportunities and Careers page. When none are open, you can express interest via the contact form.' } },
  { q: { pt: 'As fotografias do portal correspondem às instalações?', en: 'Do the portal’s photographs show the facilities?' }, a: { pt: 'Não necessariamente. As fotografias assinaladas como «Imagem ilustrativa» têm carácter representativo e não correspondem às instalações reais. Os créditos e licenças estão disponíveis na página Créditos de Imagem.', en: 'Not necessarily. Photographs marked “Illustrative image” are representative and do not depict the actual facilities. Credits and licences are listed on the Image Credits page.' } },
]
