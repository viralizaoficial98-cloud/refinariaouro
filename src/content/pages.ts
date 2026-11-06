import type { PageContent } from './types'
import { path } from './routes'

/**
 * Conteúdo editorial das páginas internas. Textos institucionais sujeitos a
 * aprovação. Dados factuais desconhecidos (datas, nomes, capacidades,
 * certificações) NÃO são publicados — usam-se blocos «notice».
 */
export type PageKey = 'about' | 'history' | 'mission' | 'governance' | 'infrastructure' | 'quality' | 'sustainability' | 'hse' | 'ethics' | 'partners'

export const initialPages: Record<PageKey, PageContent> = {
  about: {
    eyebrow: { pt: 'Sobre Nós', en: 'About Us' },
    title: { pt: 'Transformar o ouro. Valorizar Angola.', en: 'Transforming gold. Adding value to Angola.' },
    intro: { pt: 'A Refinaria de Ouro de Angola é uma plataforma industrial dedicada à transformação de metais preciosos, integrada no Grupo ENDIAMA e orientada para o desenvolvimento do País.', en: 'The Angola Gold Refinery is an industrial platform dedicated to precious-metal transformation, part of the ENDIAMA Group and focused on the country’s development.' },
    heroImage: 'crucible-casting',
    blocks: [
      { type: 'lead', text: { pt: 'Acreditamos que os recursos naturais de Angola devem gerar valor em Angola. Por isso, dedicamo-nos a transformar o ouro com os mais exigentes critérios de rigor, segurança e transparência.', en: 'We believe Angola’s natural resources should create value in Angola. That is why we transform gold to the most demanding standards of rigour, safety and transparency.' } },
      { type: 'split', eyebrow: { pt: 'O nosso propósito', en: 'Our purpose' }, title: { pt: 'Acrescentar valor a cada grama.', en: 'Adding value to every gram.' }, image: 'hero-bars-macro', body: [
        { pt: 'A refinação é a etapa em que o ouro adquire o grau de pureza e a identidade que lhe conferem valor nos mercados. Realizá-la em Angola significa reter conhecimento, emprego qualificado e valor económico no País.', en: 'Refining is the stage at which gold acquires the purity and identity that give it market value. Doing it in Angola means retaining knowledge, skilled employment and economic value in the country.' },
        { pt: 'A nossa actuação apoia-se em três compromissos: integridade na origem, rigor no processo e confiança no resultado.', en: 'Our work rests on three commitments: integrity at the source, rigour in the process and trust in the result.' },
      ] },
      { type: 'pillars', eyebrow: { pt: 'Compromissos', en: 'Commitments' }, title: { pt: 'Aquilo que nos orienta.', en: 'What guides us.' }, tone: 'dark', items: [
        { title: { pt: 'Integridade na origem', en: 'Integrity at the source' }, text: { pt: 'Diligência devida sobre a proveniência de cada lote de material.', en: 'Due diligence on the provenance of every lot of material.' } },
        { title: { pt: 'Rigor no processo', en: 'Rigour in the process' }, text: { pt: 'Procedimentos técnicos documentados, controlados e auditáveis.', en: 'Documented, controlled and auditable technical procedures.' } },
        { title: { pt: 'Confiança no resultado', en: 'Trust in the result' }, text: { pt: 'Produto rastreável, analisado e acompanhado da respectiva documentação.', en: 'Traceable, analysed product accompanied by its documentation.' } },
      ] },
      { type: 'split', id: 'grupo-endiama', eyebrow: { pt: 'Grupo ENDIAMA', en: 'ENDIAMA Group' }, title: { pt: 'Uma ligação institucional estratégica.', en: 'A strategic institutional connection.' }, image: 'luanda-bay', reverse: true, body: [
        { pt: 'A Refinaria integra o universo do Grupo ENDIAMA, entidade de referência no sector mineiro angolano. Esta ligação reforça a visão de uma cadeia de valor mineira mais completa, diversificada e transformadora.', en: 'The Refinery is part of the ENDIAMA Group, a reference entity in Angola’s mining sector. This connection reinforces the vision of a more complete, diversified and transformative mining value chain.' },
        { pt: 'Informação detalhada sobre o enquadramento jurídico e societário será disponibilizada após validação oficial.', en: 'Detailed information on the legal and corporate framework will be made available after official validation.' },
      ], caption: { pt: 'Baía de Luanda', en: 'Bay of Luanda' } },
      { type: 'cta', title: { pt: 'Conheça o nosso processo.', en: 'Discover our process.' }, text: { pt: 'Oito etapas, um único princípio: rastreabilidade total.', en: 'Eight stages, one principle: full traceability.' }, label: { pt: 'Processo de Refinação', en: 'Refining Process' }, to: path('process') },
    ],
  },
  history: {
    eyebrow: { pt: 'História e Identidade', en: 'History and Identity' },
    title: { pt: 'Uma identidade forjada no valor da terra angolana.', en: 'An identity forged in the value of Angolan soil.' },
    intro: { pt: 'O ouro acompanha a história da humanidade como símbolo de valor, confiança e permanência. A Refinaria assume esse legado com uma missão contemporânea.', en: 'Gold has accompanied human history as a symbol of value, trust and permanence. The Refinery embraces this legacy with a contemporary mission.' },
    heroImage: 'archive-refinery',
    blocks: [
      { type: 'lead', text: { pt: 'Durante séculos, refinar ouro foi uma arte de poucos. Hoje é uma ciência exigente — e Angola está determinada a dominá-la.', en: 'For centuries, refining gold was an art for the few. Today it is a demanding science — and Angola is determined to master it.' } },
      { type: 'split', eyebrow: { pt: 'Um ofício milenar', en: 'An ancient craft' }, title: { pt: 'Da arte à ciência.', en: 'From art to science.' }, image: 'archive-assay', body: [
        { pt: 'A refinação de ouro evoluiu de técnicas artesanais para processos metalúrgicos e químicos de elevada precisão, apoiados por laboratórios e instrumentos analíticos.', en: 'Gold refining has evolved from artisanal techniques into high-precision metallurgical and chemical processes, supported by laboratories and analytical instruments.' },
        { pt: 'O que permanece inalterado é o princípio fundamental: confiança absoluta na pureza e na origem do metal.', en: 'What remains unchanged is the fundamental principle: absolute trust in the purity and origin of the metal.' },
      ], caption: { pt: 'Fotografia de arquivo histórico, sem relação com as instalações', en: 'Historical archive photograph, unrelated to the facilities' } },
      { type: 'pillars', eyebrow: { pt: 'Identidade', en: 'Identity' }, title: { pt: 'As cores que nos representam.', en: 'The colours that represent us.' }, items: [
        { title: { pt: 'Verde', en: 'Green' }, text: { pt: 'A terra angolana, a esperança e o compromisso com o desenvolvimento sustentável.', en: 'Angolan soil, hope and commitment to sustainable development.' } },
        { title: { pt: 'Dourado', en: 'Gold' }, text: { pt: 'O valor do metal precioso e a excelência que buscamos em cada etapa.', en: 'The value of precious metal and the excellence we pursue at every stage.' } },
        { title: { pt: 'Marfim', en: 'Ivory' }, text: { pt: 'A clareza, a transparência e a integridade da nossa actuação.', en: 'The clarity, transparency and integrity of our work.' } },
      ] },
      { type: 'notice', text: { pt: 'Os marcos históricos da instituição (constituição, investimentos e início de operações) serão publicados após confirmação oficial.', en: 'The institution’s historical milestones (incorporation, investments and start of operations) will be published after official confirmation.' } },
    ],
  },
  mission: {
    eyebrow: { pt: 'Missão, Visão e Valores', en: 'Mission, Vision and Values' },
    title: { pt: 'Princípios que dão forma a cada decisão.', en: 'Principles that shape every decision.' },
    intro: { pt: 'A nossa missão, visão e valores traduzem a forma como entendemos a responsabilidade de transformar um recurso nacional.', en: 'Our mission, vision and values express how we understand the responsibility of transforming a national resource.' },
    heroImage: 'hero-bars-macro',
    blocks: [
      { type: 'quote', text: { pt: 'Transformar e valorizar o ouro com rigor técnico e responsabilidade, assegurando rastreabilidade, segurança e confiança a parceiros, mercados e sociedade.', en: 'To transform and add value to gold with technical rigour and responsibility, ensuring traceability, safety and trust for partners, markets and society.' }, attribution: { pt: 'Missão', en: 'Mission' } },
      { type: 'quote', text: { pt: 'Afirmar-se como referência na refinação de metais preciosos em África, reconhecida pela integridade, pela qualidade e pelo contributo para o desenvolvimento de Angola.', en: 'To become a benchmark for precious-metal refining in Africa, recognised for integrity, quality and its contribution to Angola’s development.' }, attribution: { pt: 'Visão', en: 'Vision' } },
      { type: 'pillars', eyebrow: { pt: 'Valores', en: 'Values' }, title: { pt: 'Seis valores. Um só padrão.', en: 'Six values. One standard.' }, tone: 'dark', items: [
        { title: { pt: 'Integridade', en: 'Integrity' }, text: { pt: 'Agimos com honestidade, coerência e respeito pela lei.', en: 'We act with honesty, consistency and respect for the law.' } },
        { title: { pt: 'Rigor', en: 'Rigour' }, text: { pt: 'Precisão técnica e disciplina em cada procedimento.', en: 'Technical precision and discipline in every procedure.' } },
        { title: { pt: 'Segurança', en: 'Safety' }, text: { pt: 'A protecção das pessoas está acima de qualquer resultado.', en: 'Protecting people comes before any result.' } },
        { title: { pt: 'Transparência', en: 'Transparency' }, text: { pt: 'Informação clara, verificável e responsável.', en: 'Clear, verifiable and responsible information.' } },
        { title: { pt: 'Responsabilidade', en: 'Responsibility' }, text: { pt: 'Para com o ambiente, as comunidades e as gerações futuras.', en: 'Towards the environment, communities and future generations.' } },
        { title: { pt: 'Excelência', en: 'Excellence' }, text: { pt: 'Ambição de cumprir os mais elevados padrões internacionais.', en: 'Ambition to meet the highest international standards.' } },
      ] },
      { type: 'notice', text: { pt: 'Textos institucionais sujeitos a aprovação final pelos órgãos competentes.', en: 'Institutional texts subject to final approval by the competent bodies.' } },
    ],
  },
  governance: {
    eyebrow: { pt: 'Governança', en: 'Governance' },
    title: { pt: 'Governação responsável, prestação de contas clara.', en: 'Responsible governance, clear accountability.' },
    intro: { pt: 'Uma instituição que trata um recurso estratégico deve ser exemplar na forma como é governada.', en: 'An institution handling a strategic resource must be exemplary in how it is governed.' },
    heroImage: 'luanda-city',
    blocks: [
      { type: 'pillars', eyebrow: { pt: 'Princípios', en: 'Principles' }, title: { pt: 'Os fundamentos da nossa governação.', en: 'The foundations of our governance.' }, items: [
        { title: { pt: 'Legalidade', en: 'Legality' }, text: { pt: 'Cumprimento rigoroso do quadro legal e regulamentar angolano.', en: 'Strict compliance with Angola’s legal and regulatory framework.' } },
        { title: { pt: 'Prestação de contas', en: 'Accountability' }, text: { pt: 'Responsabilidades definidas e mecanismos de reporte claros.', en: 'Defined responsibilities and clear reporting mechanisms.' } },
        { title: { pt: 'Controlo interno', en: 'Internal control' }, text: { pt: 'Gestão de riscos, auditoria e segregação de funções.', en: 'Risk management, audit and segregation of duties.' } },
        { title: { pt: 'Transparência', en: 'Transparency' }, text: { pt: 'Divulgação de informação institucional relevante e verificada.', en: 'Disclosure of relevant, verified institutional information.' } },
      ] },
      { type: 'list', eyebrow: { pt: 'Estrutura institucional', en: 'Institutional structure' }, title: { pt: 'Áreas previstas da estrutura organizativa.', en: 'Planned areas of the organisational structure.' }, items: [
        { pt: 'Órgãos de administração e fiscalização', en: 'Management and supervisory bodies' },
        { pt: 'Direcção de operações e refinação', en: 'Operations and refining directorate' },
        { pt: 'Laboratório e controlo de qualidade', en: 'Laboratory and quality control' },
        { pt: 'Saúde, segurança e ambiente', en: 'Health, safety and environment' },
        { pt: 'Conformidade, ética e gestão de riscos', en: 'Compliance, ethics and risk management' },
        { pt: 'Áreas de suporte: finanças, recursos humanos e comunicação', en: 'Support areas: finance, human resources and communication' },
      ] },
      { type: 'notice', text: { pt: 'A composição dos órgãos sociais, o organograma oficial e o enquadramento societário serão publicados após confirmação institucional. Nenhum nome ou dado jurídico é apresentado antes dessa validação.', en: 'The composition of the governing bodies, the official organisational chart and the corporate framework will be published after institutional confirmation. No names or legal data are shown before that validation.' } },
    ],
  },
  infrastructure: {
    eyebrow: { pt: 'Infraestrutura e Tecnologia', en: 'Infrastructure and Technology' },
    title: { pt: 'Onde a engenharia encontra o metal mais nobre.', en: 'Where engineering meets the noblest metal.' },
    intro: { pt: 'A refinação de ouro de classe internacional exige infraestruturas especializadas, segurança física rigorosa e tecnologia analítica de precisão.', en: 'World-class gold refining requires specialised infrastructure, rigorous physical security and precision analytical technology.' },
    heroImage: 'hero-refining-hall',
    blocks: [
      { type: 'split', eyebrow: { pt: 'Fusão e fundição', en: 'Melting and casting' }, title: { pt: 'Calor controlado, resultado preciso.', en: 'Controlled heat, precise result.' }, image: 'induction-melting', body: [
        { pt: 'A fusão por indução permite aquecer o metal de forma rápida, limpa e homogénea, reduzindo perdas e garantindo a uniformidade necessária às etapas seguintes.', en: 'Induction melting heats metal quickly, cleanly and homogeneously, reducing losses and ensuring the uniformity required for subsequent stages.' },
        { pt: 'O vazamento em lingoteiras é realizado com controlo de temperatura e de tempo, determinantes para a qualidade final do lingote.', en: 'Pouring into ingot moulds is carried out with temperature and timing control, both decisive for final bar quality.' },
      ], caption: { pt: 'Imagem ilustrativa', en: 'Illustrative image' } },
      { type: 'split', eyebrow: { pt: 'Laboratório', en: 'Laboratory' }, title: { pt: 'A ciência por detrás de cada certificado.', en: 'The science behind every certificate.' }, image: 'laboratory-team', reverse: true, body: [
        { pt: 'O laboratório é o garante da confiança: é aqui que se determina, com métodos de referência, o teor de cada amostra antes e depois da refinação.', en: 'The laboratory guarantees trust: this is where the content of each sample is determined, using reference methods, before and after refining.' },
      ] },
      { type: 'pillars', eyebrow: { pt: 'Segurança física', en: 'Physical security' }, title: { pt: 'Custódia em cada metro.', en: 'Custody in every metre.' }, tone: 'dark', items: [
        { title: { pt: 'Controlo de acessos', en: 'Access control' }, text: { pt: 'Zonas restritas e registo de entradas e saídas.', en: 'Restricted zones and entry/exit logging.' } },
        { title: { pt: 'Videovigilância', en: 'Video surveillance' }, text: { pt: 'Monitorização permanente das áreas sensíveis.', en: 'Continuous monitoring of sensitive areas.' } },
        { title: { pt: 'Cofre e custódia', en: 'Vault and custody' }, text: { pt: 'Armazenamento seguro e reconciliação de inventário.', en: 'Secure storage and inventory reconciliation.' } },
      ] },
      { type: 'notice', text: { pt: 'Os equipamentos instalados, a capacidade de processamento e a localização das instalações serão publicados após validação técnica e institucional.', en: 'Installed equipment, processing capacity and facility location will be published after technical and institutional validation.' } },
    ],
  },
  quality: {
    eyebrow: { pt: 'Qualidade e Laboratórios', en: 'Quality and Laboratories' },
    title: { pt: 'A confiança começa no laboratório.', en: 'Trust begins in the laboratory.' },
    intro: { pt: 'Cada resultado analítico sustenta decisões comerciais, fiscais e técnicas. Por isso, a qualidade não é um departamento — é uma cultura.', en: 'Every analytical result underpins commercial, fiscal and technical decisions. Quality is therefore not a department — it is a culture.' },
    heroImage: 'laboratory-analyst',
    blocks: [
      { type: 'split', eyebrow: { pt: 'Métodos de ensaio', en: 'Assay methods' }, title: { pt: 'Métodos de referência, resultados fiáveis.', en: 'Reference methods, reliable results.' }, image: 'fire-assay-furnace', body: [
        { pt: 'O ensaio por via seca (copelação) é historicamente o método de referência para a determinação do teor de ouro. É complementado por técnicas instrumentais que permitem caracterizar impurezas e metais associados.', en: 'Fire assay (cupellation) is historically the reference method for determining gold content. It is complemented by instrumental techniques that characterise impurities and associated metals.' },
      ], caption: { pt: 'Copelas numa mufla de ensaio — imagem ilustrativa', en: 'Cupels in an assay muffle — illustrative image' } },
      { type: 'pillars', eyebrow: { pt: 'Boas práticas', en: 'Good practice' }, title: { pt: 'Disciplina analítica.', en: 'Analytical discipline.' }, items: [
        { title: { pt: 'Calibração', en: 'Calibration' }, text: { pt: 'Equipamentos de pesagem e análise calibrados periodicamente.', en: 'Weighing and analysis equipment calibrated periodically.' } },
        { title: { pt: 'Materiais de referência', en: 'Reference materials' }, text: { pt: 'Controlo de exactidão com padrões conhecidos.', en: 'Accuracy control with known standards.' } },
        { title: { pt: 'Duplicados e brancos', en: 'Duplicates and blanks' }, text: { pt: 'Verificação da repetibilidade e ausência de contaminação.', en: 'Checking repeatability and absence of contamination.' } },
        { title: { pt: 'Registo e arquivo', en: 'Recording and archiving' }, text: { pt: 'Resultados rastreáveis e conservados de forma segura.', en: 'Traceable results, securely preserved.' } },
      ] },
      { type: 'notice', text: { pt: 'Acreditações, certificações e participação em programas de ensaios interlaboratoriais apenas serão divulgadas após verificação oficial.', en: 'Accreditations, certifications and participation in interlaboratory proficiency programmes will only be disclosed after official verification.' } },
    ],
  },
  sustainability: {
    eyebrow: { pt: 'Sustentabilidade e ESG', en: 'Sustainability and ESG' },
    title: { pt: 'Um metal eterno exige uma responsabilidade duradoura.', en: 'An everlasting metal demands lasting responsibility.' },
    intro: { pt: 'A sustentabilidade é parte integrante do modelo de actuação: ambiente, pessoas e governação responsável caminham lado a lado.', en: 'Sustainability is integral to how we operate: environment, people and responsible governance go hand in hand.' },
    heroImage: 'luanda-bay',
    blocks: [
      { type: 'pillars', eyebrow: { pt: 'Ambiental', en: 'Environmental' }, title: { pt: 'Proteger o que é de todos.', en: 'Protecting what belongs to all.' }, items: [
        { title: { pt: 'Emissões', en: 'Emissions' }, text: { pt: 'Sistemas de tratamento de gases e monitorização da qualidade do ar.', en: 'Gas treatment systems and air-quality monitoring.' } },
        { title: { pt: 'Água e efluentes', en: 'Water and effluents' }, text: { pt: 'Uso racional da água e tratamento de efluentes antes da descarga.', en: 'Rational water use and effluent treatment before discharge.' } },
        { title: { pt: 'Resíduos', en: 'Waste' }, text: { pt: 'Segregação, valorização e destino adequado de resíduos.', en: 'Segregation, recovery and proper disposal of waste.' } },
      ] },
      { type: 'pillars', eyebrow: { pt: 'Social', en: 'Social' }, title: { pt: 'Investir nas pessoas.', en: 'Investing in people.' }, tone: 'dark', items: [
        { title: { pt: 'Emprego qualificado', en: 'Skilled employment' }, text: { pt: 'Valorização de quadros angolanos e transferência de conhecimento.', en: 'Developing Angolan talent and transferring knowledge.' } },
        { title: { pt: 'Formação', en: 'Training' }, text: { pt: 'Programas de capacitação técnica e de segurança.', en: 'Technical and safety training programmes.' } },
        { title: { pt: 'Comunidade', en: 'Community' }, text: { pt: 'Diálogo com as comunidades e contributo para o desenvolvimento local.', en: 'Dialogue with communities and contribution to local development.' } },
      ] },
      { type: 'pillars', eyebrow: { pt: 'Governação', en: 'Governance' }, title: { pt: 'Integridade como alicerce.', en: 'Integrity as foundation.' }, items: [
        { title: { pt: 'Ética', en: 'Ethics' }, text: { pt: 'Código de conduta e canais de denúncia.', en: 'Code of conduct and whistleblowing channels.' } },
        { title: { pt: 'Diligência devida', en: 'Due diligence' }, text: { pt: 'Avaliação de riscos na cadeia de fornecimento.', en: 'Supply-chain risk assessment.' } },
        { title: { pt: 'Reporte', en: 'Reporting' }, text: { pt: 'Divulgação progressiva de indicadores de desempenho.', en: 'Progressive disclosure of performance indicators.' } },
      ] },
      { type: 'notice', text: { pt: 'Metas, indicadores e relatórios de sustentabilidade serão publicados após aprovação institucional.', en: 'Sustainability targets, indicators and reports will be published following institutional approval.' } },
    ],
  },
  hse: {
    eyebrow: { pt: 'Saúde, Segurança e Ambiente', en: 'Health, Safety and Environment' },
    title: { pt: 'Ninguém se magoa. Nada se perde.', en: 'No one gets hurt. Nothing is lost.' },
    intro: { pt: 'Trabalhar com metal fundido e reagentes químicos exige uma cultura de prevenção sem concessões.', en: 'Working with molten metal and chemical reagents demands an uncompromising prevention culture.' },
    heroImage: 'induction-melting',
    blocks: [
      { type: 'lead', text: { pt: 'A segurança não é uma prioridade que muda com as circunstâncias — é um valor permanente.', en: 'Safety is not a priority that shifts with circumstances — it is a permanent value.' } },
      { type: 'pillars', eyebrow: { pt: 'Saúde e segurança', en: 'Health and safety' }, title: { pt: 'Prevenir em primeiro lugar.', en: 'Prevention first.' }, items: [
        { title: { pt: 'Avaliação de riscos', en: 'Risk assessment' }, text: { pt: 'Identificação sistemática de perigos em todas as tarefas.', en: 'Systematic hazard identification across all tasks.' } },
        { title: { pt: 'Equipamento de protecção', en: 'Protective equipment' }, text: { pt: 'EPI adequado a altas temperaturas e agentes químicos.', en: 'PPE suited to high temperatures and chemical agents.' } },
        { title: { pt: 'Formação contínua', en: 'Continuous training' }, text: { pt: 'Preparação para operação segura e resposta a emergências.', en: 'Preparation for safe operation and emergency response.' } },
        { title: { pt: 'Vigilância da saúde', en: 'Health surveillance' }, text: { pt: 'Acompanhamento médico ocupacional dos colaboradores.', en: 'Occupational health monitoring of employees.' } },
      ] },
      { type: 'banner', image: 'crucible-casting', title: { pt: 'Ambiente', en: 'Environment' }, text: { pt: 'Controlo de emissões, gestão de efluentes e resíduos e uso eficiente de energia e água.', en: 'Emissions control, effluent and waste management and efficient use of energy and water.' } },
      { type: 'notice', text: { pt: 'Indicadores de segurança e licenças ambientais serão publicados apenas após confirmação oficial.', en: 'Safety indicators and environmental licences will only be published after official confirmation.' } },
    ],
  },
  ethics: {
    eyebrow: { pt: 'Ética e Fornecimento Responsável', en: 'Ethics and Responsible Sourcing' },
    title: { pt: 'Ouro com origem conhecida e consciência tranquila.', en: 'Gold with known origin and a clear conscience.' },
    intro: { pt: 'A confiança nos metais preciosos depende da integridade de toda a cadeia de valor — da mina ao lingote.', en: 'Trust in precious metals depends on the integrity of the entire value chain — from mine to bar.' },
    heroImage: 'gold-nugget',
    blocks: [
      { type: 'split', eyebrow: { pt: 'Diligência devida', en: 'Due diligence' }, title: { pt: 'Conhecer a origem de cada lote.', en: 'Knowing the origin of every lot.' }, image: 'nugget-quartz', body: [
        { pt: 'A diligência devida na cadeia de fornecimento de ouro procura identificar, avaliar e mitigar riscos associados à origem do material, incluindo riscos de natureza legal, social e ambiental.', en: 'Due diligence in the gold supply chain seeks to identify, assess and mitigate risks associated with material origin, including legal, social and environmental risks.' },
        { pt: 'Esta abordagem segue as orientações internacionalmente reconhecidas para cadeias de fornecimento responsáveis de minerais, cuja adopção formal será comunicada em documento próprio.', en: 'This approach follows internationally recognised guidance for responsible mineral supply chains, the formal adoption of which will be communicated in a dedicated document.' },
      ], caption: { pt: 'Imagem ilustrativa', en: 'Illustrative image' } },
      { type: 'list', eyebrow: { pt: 'Princípios de conduta', en: 'Principles of conduct' }, title: { pt: 'Compromissos éticos.', en: 'Ethical commitments.' }, items: [
        { pt: 'Tolerância zero à corrupção, ao suborno e ao branqueamento de capitais', en: 'Zero tolerance for corruption, bribery and money laundering' },
        { pt: 'Conhecimento dos fornecedores e parceiros (KYC)', en: 'Know Your Counterparty (KYC) procedures' },
        { pt: 'Rejeição de material associado a conflitos ou violações de direitos humanos', en: 'Rejection of material linked to conflict or human-rights abuses' },
        { pt: 'Prevenção de conflitos de interesses', en: 'Prevention of conflicts of interest' },
        { pt: 'Canal confidencial para comunicação de irregularidades', en: 'Confidential channel for reporting irregularities' },
      ] },
      { type: 'notice', text: { pt: 'A política de fornecimento responsável e o código de ética serão disponibilizados em Documentos após aprovação.', en: 'The responsible-sourcing policy and code of ethics will be available in Documents after approval.' } },
    ],
  },
  partners: {
    eyebrow: { pt: 'Parceiros e Investidores', en: 'Partners and Investors' },
    title: { pt: 'Cooperação responsável para um sector mais forte.', en: 'Responsible cooperation for a stronger sector.' },
    intro: { pt: 'A Refinaria procura relações de longo prazo baseadas em confiança, transparência e benefício mútuo.', en: 'The Refinery seeks long-term relationships built on trust, transparency and mutual benefit.' },
    heroImage: 'bullion-stack',
    blocks: [
      { type: 'pillars', eyebrow: { pt: 'Perfis de parceria', en: 'Partnership profiles' }, title: { pt: 'Com quem queremos construir.', en: 'Who we want to build with.' }, items: [
        { title: { pt: 'Operadores do sector', en: 'Sector operators' }, text: { pt: 'Entidades da cadeia de valor do ouro que cumpram requisitos de diligência devida.', en: 'Gold value-chain entities meeting due-diligence requirements.' } },
        { title: { pt: 'Parceiros técnicos', en: 'Technical partners' }, text: { pt: 'Instituições de investigação, fornecedores de tecnologia e formação.', en: 'Research institutions, technology and training providers.' } },
        { title: { pt: 'Investidores', en: 'Investors' }, text: { pt: 'Investimento alinhado com critérios de governação e sustentabilidade.', en: 'Investment aligned with governance and sustainability criteria.' } },
        { title: { pt: 'Instituições', en: 'Institutions' }, text: { pt: 'Cooperação institucional, académica e internacional.', en: 'Institutional, academic and international cooperation.' } },
      ] },
      { type: 'notice', text: { pt: 'Parcerias e acordos apenas serão divulgados após formalização e autorização das partes.', en: 'Partnerships and agreements will only be disclosed after formalisation and authorisation by the parties.' } },
      { type: 'cta', title: { pt: 'Vamos conversar.', en: 'Let’s talk.' }, text: { pt: 'Apresente a sua proposta de cooperação através do formulário de contacto.', en: 'Submit your cooperation proposal through the contact form.' }, label: { pt: 'Contactar', en: 'Contact us' }, to: `${path('contact')}?assunto=parcerias` },
    ],
  },
}
