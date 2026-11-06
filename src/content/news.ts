import type { NewsItem } from './types.ts'

/**
 * Notícias iniciais. Os itens marcados com `sample: true` são textos
 * institucionais exemplificativos — devem ser revistos ou substituídos por
 * comunicados oficiais no backoffice antes da publicação definitiva.
 */
export const initialNews: NewsItem[] = [
  {
    id: 'n1',
    slug: 'novo-portal-institucional',
    date: '2026-11-06',
    category: { pt: 'Institucional', en: 'Corporate' },
    title: { pt: 'Novo portal institucional reforça a comunicação com parceiros e sociedade', en: 'New institutional portal strengthens communication with partners and society' },
    excerpt: { pt: 'O portal reúne, num único espaço, a informação institucional, o processo de refinação, as políticas de responsabilidade e os canais de contacto.', en: 'The portal brings together institutional information, the refining process, responsibility policies and contact channels in a single place.' },
    body: [
      { pt: 'A Refinaria de Ouro de Angola disponibiliza um novo portal institucional, concebido para comunicar com clareza a sua missão, os seus princípios de actuação e o compromisso com a valorização do ouro angolano.', en: 'The Angola Gold Refinery is launching a new institutional portal, designed to communicate clearly its mission, operating principles and commitment to adding value to Angolan gold.' },
      { pt: 'A plataforma foi estruturada para acompanhar a evolução da instituição: os conteúdos são geridos a partir de uma área administrativa própria e serão progressivamente enriquecidos com documentos, comunicados e informação técnica validada.', en: 'The platform is structured to evolve with the institution: content is managed from a dedicated administrative area and will be progressively enriched with validated documents, announcements and technical information.' },
      { pt: 'Toda a informação publicada segue um princípio editorial simples — apenas dados oficialmente confirmados são apresentados como factos.', en: 'All published information follows a simple editorial principle — only officially confirmed data is presented as fact.' },
    ],
    image: 'hero-refining-hall',
    published: true,
    sample: false,
  },
  {
    id: 'n2',
    slug: 'compromisso-fornecimento-responsavel',
    date: '2026-10-28',
    category: { pt: 'Responsabilidade', en: 'Responsibility' },
    title: { pt: 'Fornecimento responsável como princípio orientador da cadeia de valor', en: 'Responsible sourcing as a guiding principle of the value chain' },
    excerpt: { pt: 'A diligência devida sobre a origem do metal precioso é um pilar da confiança entre a refinaria, os fornecedores e os mercados.', en: 'Due diligence on the origin of precious metal is a pillar of trust between the refinery, suppliers and markets.' },
    body: [
      { pt: 'A rastreabilidade do ouro, desde a recepção até à expedição, é um requisito crescente dos mercados internacionais e uma responsabilidade perante a sociedade angolana.', en: 'Gold traceability, from receipt to dispatch, is a growing requirement of international markets and a responsibility towards Angolan society.' },
      { pt: 'O enquadramento das políticas de fornecimento responsável da Refinaria encontra-se em preparação e será publicado na secção de Documentos após aprovação institucional.', en: 'The Refinery’s responsible-sourcing policy framework is being prepared and will be published in the Documents section following institutional approval.' },
    ],
    image: 'gold-nugget',
    published: true,
    sample: true,
  },
  {
    id: 'n3',
    slug: 'valorizacao-de-quadros-tecnicos',
    date: '2026-10-15',
    category: { pt: 'Pessoas', en: 'People' },
    title: { pt: 'Valorização de quadros técnicos angolanos na metalurgia de precisão', en: 'Developing Angolan technical talent in precision metallurgy' },
    excerpt: { pt: 'A formação contínua em ensaio laboratorial, fundição e segurança operacional é essencial para uma indústria de classe internacional.', en: 'Continuous training in laboratory assaying, casting and operational safety is essential for a world-class industry.' },
    body: [
      { pt: 'A transformação de metais preciosos exige competências técnicas especializadas. A aposta na formação de quadros nacionais é um vector de desenvolvimento industrial e de transferência de conhecimento.', en: 'Precious-metal transformation requires specialised technical skills. Investing in the training of national professionals drives industrial development and knowledge transfer.' },
      { pt: 'As oportunidades de carreira e estágio serão divulgadas na página Oportunidades e Carreiras.', en: 'Career and internship opportunities will be announced on the Opportunities and Careers page.' },
    ],
    image: 'laboratory-analyst',
    published: true,
    sample: true,
  },
  {
    id: 'n4',
    slug: 'cultura-de-seguranca-operacional',
    date: '2026-09-30',
    category: { pt: 'Saúde e Segurança', en: 'Health and Safety' },
    title: { pt: 'Cultura de segurança: o primeiro critério de excelência operacional', en: 'Safety culture: the first criterion of operational excellence' },
    excerpt: { pt: 'Em ambientes de alta temperatura e manuseamento de reagentes, a segurança é uma disciplina diária partilhada por todos.', en: 'In high-temperature environments with reagent handling, safety is a daily discipline shared by everyone.' },
    body: [
      { pt: 'A refinação de ouro envolve fusão a temperaturas elevadas, manuseamento de reagentes químicos e operações de precisão. A prevenção, a formação e o equipamento de protecção adequado são condições inegociáveis.', en: 'Gold refining involves high-temperature melting, chemical reagent handling and precision operations. Prevention, training and appropriate protective equipment are non-negotiable conditions.' },
    ],
    image: 'induction-melting',
    published: true,
    sample: true,
  },
]
