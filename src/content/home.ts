import type { L } from './types'

export interface ProcessStep { id: string; title: L; text: L; image: string }

/** Etapas do processo de refinação (descrição técnica genérica, não específica das instalações). */
export const processSteps: ProcessStep[] = [
  { id: 'recepcao', image: 'gold-nugget',
    title: { pt: 'Recepção e rastreabilidade', en: 'Receipt and traceability' },
    text: { pt: 'Cada lote é recebido, pesado, identificado de forma única e associado à documentação de origem. A cadeia de custódia começa aqui.', en: 'Each lot is received, weighed, uniquely identified and linked to its origin documentation. The chain of custody begins here.' } },
  { id: 'amostragem', image: 'nugget-quartz',
    title: { pt: 'Amostragem', en: 'Sampling' },
    text: { pt: 'Recolhem-se amostras representativas segundo procedimentos controlados, garantindo que a análise reflecte fielmente a composição do lote.', en: 'Representative samples are taken under controlled procedures, ensuring the analysis faithfully reflects the lot’s composition.' } },
  { id: 'ensaio', image: 'fire-assay-furnace',
    title: { pt: 'Ensaio laboratorial', en: 'Laboratory assay' },
    text: { pt: 'O teor de metal precioso é determinado por métodos de referência — como o ensaio por via seca — complementados por técnicas instrumentais.', en: 'Precious-metal content is determined by reference methods — such as fire assay — complemented by instrumental techniques.' } },
  { id: 'fundicao', image: 'induction-melting',
    title: { pt: 'Fundição', en: 'Melting' },
    text: { pt: 'O material é fundido a alta temperatura para homogeneização, preparando-o para as etapas de purificação.', en: 'The material is melted at high temperature for homogenisation, preparing it for purification.' } },
  { id: 'refinacao', image: 'crucible-casting',
    title: { pt: 'Refinação', en: 'Refining' },
    text: { pt: 'Processos metalúrgicos e químicos controlados separam impurezas e metais associados, elevando o ouro ao grau de pureza pretendido.', en: 'Controlled metallurgical and chemical processes separate impurities and associated metals, raising gold to the intended purity.' } },
  { id: 'qualidade', image: 'laboratory-analyst',
    title: { pt: 'Controlo de qualidade', en: 'Quality control' },
    text: { pt: 'O produto refinado é novamente analisado. Só avança o metal que cumpre integralmente as especificações definidas.', en: 'The refined product is analysed again. Only metal that fully meets the defined specifications moves forward.' } },
  { id: 'pesagem', image: 'hero-bars-macro',
    title: { pt: 'Pesagem e marcação', en: 'Weighing and marking' },
    text: { pt: 'Os lingotes são pesados com instrumentos de precisão, marcados e registados com a respectiva identificação e certificado de análise.', en: 'Bars are weighed with precision instruments, marked and recorded with their identification and assay certificate.' } },
  { id: 'expedicao', image: 'bullion-stack',
    title: { pt: 'Expedição', en: 'Dispatch' },
    text: { pt: 'A saída do produto ocorre sob protocolos de segurança e documentação completa, encerrando um ciclo integralmente rastreável.', en: 'Product leaves under security protocols and complete documentation, closing a fully traceable cycle.' } },
]

export const homeText = {
  intro: {
    eyebrow: { pt: 'Bem-vindo', en: 'Welcome' },
    title: { pt: 'Onde o ouro angolano ganha o seu valor pleno.', en: 'Where Angolan gold reaches its full value.' },
    body: [
      { pt: 'A Refinaria de Ouro de Angola nasce de uma ambição nacional: transformar em Angola o metal precioso extraído do seu solo, acrescentando valor, conhecimento e confiança a cada etapa da cadeia.', en: 'The Angola Gold Refinery stems from a national ambition: to transform in Angola the precious metal extracted from its soil, adding value, knowledge and trust at every stage of the chain.' },
      { pt: 'Integrada no Grupo ENDIAMA, a Refinaria orienta-se por princípios de rigor técnico, rastreabilidade e responsabilidade — os mesmos que os mercados internacionais exigem e que a sociedade angolana merece.', en: 'As part of the ENDIAMA Group, the Refinery is guided by principles of technical rigour, traceability and responsibility — the same that international markets demand and Angolan society deserves.' },
    ] as L[],
  },
  refinery: {
    eyebrow: { pt: 'A Refinaria', en: 'The Refinery' },
    title: { pt: 'Uma instituição ao serviço da valorização dos recursos nacionais.', en: 'An institution serving the value of national resources.' },
    vision: { pt: 'Afirmar-se como referência na refinação de metais preciosos em África, reconhecida pela integridade, pela qualidade e pelo contributo para o desenvolvimento de Angola.', en: 'To become a benchmark for precious-metal refining in Africa, recognised for integrity, quality and its contribution to Angola’s development.' },
    mission: { pt: 'Transformar e valorizar o ouro com rigor técnico e responsabilidade, assegurando rastreabilidade, segurança e confiança a parceiros, mercados e sociedade.', en: 'To transform and add value to gold with technical rigour and responsibility, ensuring traceability, safety and trust for partners, markets and society.' },
    values: [
      { pt: 'Integridade', en: 'Integrity' },
      { pt: 'Rigor', en: 'Rigour' },
      { pt: 'Segurança', en: 'Safety' },
      { pt: 'Transparência', en: 'Transparency' },
      { pt: 'Responsabilidade', en: 'Responsibility' },
      { pt: 'Excelência', en: 'Excellence' },
    ] as L[],
    contribution: { pt: 'A refinação local de ouro permite reter em Angola uma parte maior do valor gerado pelos recursos minerais, estimular competências técnicas especializadas e reforçar a credibilidade do ouro nacional junto dos mercados.', en: 'Local gold refining keeps a greater share of the value generated by mineral resources in Angola, fosters specialised technical skills and strengthens the credibility of national gold in the markets.' },
  },
  quality: {
    eyebrow: { pt: 'Qualidade e Padrões', en: 'Quality and Standards' },
    title: { pt: 'Rigor que se mede. Confiança que se constrói.', en: 'Rigour you can measure. Trust you can build on.' },
    items: [
      { title: { pt: 'Boas práticas laboratoriais', en: 'Good laboratory practice' }, text: { pt: 'Procedimentos documentados, calibração de equipamentos e controlo de amostras de referência.', en: 'Documented procedures, equipment calibration and reference-sample control.' } },
      { title: { pt: 'Segurança operacional', en: 'Operational safety' }, text: { pt: 'Prevenção de riscos em ambientes de alta temperatura e no manuseamento de reagentes.', en: 'Risk prevention in high-temperature environments and reagent handling.' } },
      { title: { pt: 'Diligência devida', en: 'Due diligence' }, text: { pt: 'Verificação da origem do material e avaliação de riscos na cadeia de fornecimento.', en: 'Verification of material origin and risk assessment across the supply chain.' } },
      { title: { pt: 'Melhoria contínua', en: 'Continuous improvement' }, text: { pt: 'Revisão sistemática de processos com base em indicadores e auditorias internas.', en: 'Systematic process review based on indicators and internal audits.' } },
    ],
    note: { pt: 'As referências a normas e certificações serão publicadas apenas após confirmação oficial.', en: 'References to standards and certifications will only be published after official confirmation.' },
  },
  sustainability: {
    eyebrow: { pt: 'Sustentabilidade e Responsabilidade', en: 'Sustainability and Responsibility' },
    title: { pt: 'Valor que perdura para além do metal.', en: 'Value that endures beyond the metal.' },
    items: [
      { title: { pt: 'Ambiente', en: 'Environment' }, text: { pt: 'Gestão responsável de emissões, efluentes e resíduos, com foco na prevenção.', en: 'Responsible management of emissions, effluents and waste, with a focus on prevention.' } },
      { title: { pt: 'Pessoas', en: 'People' }, text: { pt: 'Formação, valorização de quadros nacionais e condições de trabalho dignas.', en: 'Training, development of national talent and decent working conditions.' } },
      { title: { pt: 'Segurança', en: 'Safety' }, text: { pt: 'Uma cultura de prevenção partilhada por todos, todos os dias.', en: 'A prevention culture shared by everyone, every day.' } },
      { title: { pt: 'Ética', en: 'Ethics' }, text: { pt: 'Integridade, transparência e tolerância zero à corrupção.', en: 'Integrity, transparency and zero tolerance for corruption.' } },
      { title: { pt: 'Desenvolvimento local', en: 'Local development' }, text: { pt: 'Contributo para a economia nacional e para as comunidades envolventes.', en: 'Contribution to the national economy and surrounding communities.' } },
    ],
  },
  infrastructure: {
    eyebrow: { pt: 'Infraestrutura e Tecnologia', en: 'Infrastructure and Technology' },
    title: { pt: 'Engenharia de precisão ao serviço de um metal nobre.', en: 'Precision engineering in service of a noble metal.' },
    layers: [
      { label: { pt: 'Fusão', en: 'Melting' }, text: { pt: 'Fornos concebidos para fusão controlada e homogénea do metal precioso.', en: 'Furnaces designed for controlled, homogeneous melting of precious metal.' } },
      { label: { pt: 'Análise', en: 'Analysis' }, text: { pt: 'Laboratório preparado para métodos de ensaio de referência e técnicas instrumentais.', en: 'A laboratory prepared for reference assay methods and instrumental techniques.' } },
      { label: { pt: 'Segurança', en: 'Security' }, text: { pt: 'Controlo de acessos, custódia e protocolos de segurança física.', en: 'Access control, custody and physical security protocols.' } },
    ],
    note: { pt: 'A descrição detalhada de equipamentos e capacidades instaladas será publicada após validação técnica.', en: 'A detailed description of installed equipment and capacity will be published after technical validation.' },
  },
  endiama: {
    eyebrow: { pt: 'Grupo ENDIAMA', en: 'ENDIAMA Group' },
    title: { pt: 'Parte de um grupo com papel central no sector mineiro angolano.', en: 'Part of a group with a central role in Angola’s mining sector.' },
    body: [
      { pt: 'A ENDIAMA é uma referência do sector mineiro em Angola. A integração da Refinaria de Ouro no seu universo institucional reflecte a ambição de diversificar e valorizar os recursos minerais do País.', en: 'ENDIAMA is a reference in Angola’s mining sector. The integration of the Gold Refinery within its institutional framework reflects the ambition to diversify and add value to the country’s mineral resources.' },
      { pt: 'Os termos jurídicos e societários desta ligação serão detalhados na página de Governança, mediante informação oficial.', en: 'The legal and corporate terms of this connection will be detailed on the Governance page, based on official information.' },
    ] as L[],
  },
  partnerships: {
    eyebrow: { pt: 'Parcerias e Oportunidades', en: 'Partnerships and Opportunities' },
    title: { pt: 'Construamos juntos o futuro do ouro angolano.', en: 'Let us build the future of Angolan gold together.' },
    text: { pt: 'Instituições, operadores do sector, investidores e parceiros técnicos: a Refinaria está aberta ao diálogo sobre cooperação responsável e de longo prazo.', en: 'Institutions, sector operators, investors and technical partners: the Refinery is open to dialogue on responsible, long-term cooperation.' },
  },
}
