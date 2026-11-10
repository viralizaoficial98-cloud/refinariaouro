import type { L, Verification } from './types'

/**
 * Conteúdos institucionais extraídos da brochura «Brochura ROA_OC_NF.pdf» (8 páginas).
 * Os textos seguem a brochura, apenas com correcções ortográficas e adaptação à leitura digital.
 * Dados operacionais (capacidade), contactos e alegações de certificação estão marcados
 * como 'a-confirmar' até aprovação institucional.
 */
export interface BrochureStep { id: string; title: L; text: L; image: string }
export interface BrochureTechnique { id: string; title: L; text: L; benefits: L[]; image: string }
export interface BrochureBlock { id: string; title: L; text: L; items?: L[]; image?: string }

export interface BrochureContent {
  slogan: L
  presentation: L[]
  valueChain: { title: L; intro: L; steps: BrochureStep[]; metals: L[]; objective: L }
  mission: L[]
  vision: L
  values: { title: L; text: L }[]
  servicesNote: L
  capacity: { value: string; unit: L; label: L; intro: L; scales: { label: L; image: string }[]; impact: L; status: Verification }
  techniques: { title: L; intro: L; items: BrochureTechnique[]; fineGold: { title: L; text: L; image: string } }
  contrastaria: {
    title: L
    intro: L
    impactTitle: L
    impact: L[]
    blocks: BrochureBlock[]
    status: Verification
  }
  tagline: L
}

export const initialBrochure: BrochureContent = {
  slogan: { pt: 'Ouro Angolano ganha valor em Angola.', en: 'Angolan gold gains value in Angola.' },

  presentation: [
    { pt: 'A Refinaria de Ouro de Angola foi criada para responder às necessidades dos nossos clientes e potenciar a sua capacidade produtiva e competitiva. Este projecto resulta da aposta do Governo angolano em promover a cadeia de valor dos minerais, capitalizando as operações de prospecção, exploração, transformação e comercialização dos recursos.', en: 'The Angola Gold Refinery was created to meet our clients’ needs and to strengthen their productive and competitive capacity. The project stems from the Angolan Government’s commitment to developing the minerals value chain, building on prospecting, mining, processing and marketing of the country’s resources.' },
    { pt: 'Nasce como a primeira unidade do género no país, marcando um novo capítulo na cadeia de valor do subsector dos metais preciosos.', en: 'It is the first facility of its kind in the country, marking a new chapter in the value chain of the precious-metals sub-sector.' },
    { pt: 'O projecto vem responder à necessidade estratégica de processar, refinar e certificar o ouro e outros metais preciosos extraídos em território nacional, reduzindo a dependência de refinação no exterior e reforçando a soberania económica sobre um dos recursos mais valiosos do país.', en: 'The project responds to the strategic need to process, refine and certify gold and other precious metals mined in Angola, reducing dependence on refining abroad and strengthening economic sovereignty over one of the country’s most valuable resources.' },
    { pt: 'Concebida segundo padrões internacionais de qualidade, segurança e rastreabilidade, a unidade está equipada para transformar ouro bruto e concentrados em metal refinado de elevada pureza, pronto para comercialização nos mercados nacional e internacional.', en: 'Designed to international standards of quality, safety and traceability, the facility is equipped to transform raw gold and concentrates into high-purity refined metal, ready for sale on national and international markets.' },
  ],

  valueChain: {
    title: { pt: 'Cadeia de Valor Integrada', en: 'Integrated Value Chain' },
    intro: { pt: 'Da análise da matéria-prima à certificação do metal refinado, cada etapa decorre num único circuito, em Angola.', en: 'From raw-material analysis to certification of the refined metal, every stage takes place within a single circuit, in Angola.' },
    steps: [
      { id: 'analise', image: 'brochure-analysis-loupe',
        title: { pt: 'Análise', en: 'Analysis' },
        text: { pt: 'Determinação precisa do teor e da composição de ouro, prata e outros metais preciosos.', en: 'Precise determination of the content and composition of gold, silver and other precious metals.' } },
      { id: 'refinacao', image: 'brochure-refining-torch',
        title: { pt: 'Refinação', en: 'Refining' },
        text: { pt: 'Transformação de ouro bruto e concentrados em metal refinado de elevada pureza.', en: 'Transformation of raw gold and concentrates into high-purity refined metal.' } },
      { id: 'purificacao', image: 'brochure-electrolysis',
        title: { pt: 'Purificação', en: 'Purification' },
        text: { pt: 'Purificação final do metal, adequada aos padrões de comercialização internacional.', en: 'Final purification of the metal, in line with international trading standards.' } },
      { id: 'certificacao', image: 'brochure-contrastaria-die',
        title: { pt: 'Certificação', en: 'Certification' },
        text: { pt: 'Ensaio, marcação e certificação do teor e da autenticidade dos metais preciosos.', en: 'Assaying, hallmarking and certification of the fineness and authenticity of precious metals.' } },
    ],
    metals: [
      { pt: 'Ouro', en: 'Gold' },
      { pt: 'Prata', en: 'Silver' },
      { pt: 'Outros metais preciosos', en: 'Other precious metals' },
    ],
    objective: { pt: 'O nosso maior objectivo é assegurar que os metais preciosos que chegam ao consumidor, no mercado nacional e internacional, são autênticos, rastreáveis e certificados segundo os mais rigorosos padrões de qualidade.', en: 'Our foremost objective is to ensure that the precious metals reaching consumers, on the national and international markets, are authentic, traceable and certified to the most rigorous quality standards.' },
  },

  mission: [
    { pt: 'Liderar a indústria de refinação de metais preciosos e de fabrico de barras de ouro e prata, com elevados padrões internacionais de qualidade, integridade e sustentabilidade, agregando valor aos recursos minerais de Angola.', en: 'To lead the precious-metals refining and gold and silver bar manufacturing industry, with high international standards of quality, integrity and sustainability, adding value to Angola’s mineral resources.' },
    { pt: 'Promover a industrialização, a confiança do mercado e o desenvolvimento económico e social do país.', en: 'To promote industrialisation, market confidence and the country’s economic and social development.' },
  ],
  vision: { pt: 'Ser a refinaria de ouro de referência em África, reconhecida pela excelência operacional, inovação, credibilidade e contribuição para posicionar Angola como um centro estratégico de refinação e comercialização de ouro.', en: 'To be Africa’s benchmark gold refinery, recognised for operational excellence, innovation, credibility and its contribution to positioning Angola as a strategic hub for gold refining and trading.' },
  values: [
    { title: { pt: 'Integridade', en: 'Integrity' }, text: { pt: 'Actuamos com ética, transparência e responsabilidade em todas as nossas operações.', en: 'We act with ethics, transparency and accountability in all our operations.' } },
    { title: { pt: 'Sustentabilidade', en: 'Sustainability' }, text: { pt: 'Operamos de forma sustentável, criando valor económico, respeitando o ambiente e as comunidades e promovendo práticas éticas em toda a cadeia de valor.', en: 'We operate sustainably, creating economic value, respecting the environment and communities and promoting ethical practices across the value chain.' } },
    { title: { pt: 'Inovação', en: 'Innovation' }, text: { pt: 'Investimos em tecnologia, conhecimento e melhoria contínua para impulsionar a competitividade.', en: 'We invest in technology, knowledge and continuous improvement to drive competitiveness.' } },
    { title: { pt: 'Orgulho Nacional', en: 'National Pride' }, text: { pt: 'Contribuímos para a valorização dos recursos naturais de Angola, promovendo a industrialização e o desenvolvimento do país.', en: 'We help add value to Angola’s natural resources, promoting the country’s industrialisation and development.' } },
    { title: { pt: 'Confiança', en: 'Trust' }, text: { pt: 'Construímos relações sólidas com clientes, parceiros, investidores e instituições, baseadas na credibilidade e no cumprimento dos nossos compromissos.', en: 'We build solid relationships with clients, partners, investors and institutions, based on credibility and on honouring our commitments.' } },
    { title: { pt: 'Excelência', en: 'Excellence' }, text: { pt: 'Procuramos continuamente os mais elevados padrões de qualidade, segurança e eficiência.', en: 'We continually pursue the highest standards of quality, safety and efficiency.' } },
  ],

  servicesNote: { pt: 'Desde o momento em que recebemos as amostras para análise até à confecção das barras de ouro e prata, cada etapa do processo é marcada pela transparência. Queremos que os nossos clientes compreendam plenamente o valor, a autenticidade e a qualidade dos serviços que oferecemos.', en: 'From the moment we receive samples for analysis to the production of gold and silver bars, every stage of the process is marked by transparency. We want our clients to fully understand the value, authenticity and quality of the services we provide.' },

  capacity: {
    value: '25',
    unit: { pt: 'kg de ouro', en: 'kg of gold' },
    label: { pt: 'por dia', en: 'per day' },
    intro: { pt: 'Capacidade de processamento contínuo e controlado de volumes crescentes de matéria-prima, com uma produção de 25 kg de ouro por dia.', en: 'Continuous, controlled processing capacity for growing volumes of raw material, with production of 25 kg of gold per day.' },
    scales: [
      { label: { pt: 'Pequena escala', en: 'Small scale' }, image: 'brochure-bars-small' },
      { label: { pt: 'Média escala', en: 'Medium scale' }, image: 'brochure-bars-medium' },
      { label: { pt: 'Grande escala', en: 'Large scale' }, image: 'brochure-bars-large' },
    ],
    impact: { pt: 'Este volume de produção posiciona a refinaria como uma infraestrutura central para a formalização e valorização do ouro explorado em Angola, contribuindo directamente para o aumento das receitas fiscais e para a criação de emprego qualificado.', en: 'This production volume positions the refinery as central infrastructure for the formalisation and value addition of gold mined in Angola, contributing directly to higher tax revenue and the creation of skilled jobs.' },
    status: 'a-confirmar',
  },

  techniques: {
    title: { pt: 'Tecnologias e Técnicas de Refinação', en: 'Refining Technologies and Techniques' },
    intro: { pt: 'Para garantir elevados níveis de pureza e eficiência, a refinaria opera com dois sistemas complementares de refinação do ouro e da prata, permitindo flexibilidade operacional consoante a natureza e o grau de pureza da matéria-prima recebida.', en: 'To ensure high levels of purity and efficiency, the refinery operates two complementary gold and silver refining systems, allowing operational flexibility according to the nature and purity of the raw material received.' },
    items: [
      { id: 'agua-regia', image: 'brochure-aqua-regia',
        title: { pt: 'Tratamento por Água-Régia', en: 'Aqua Regia Treatment' },
        text: { pt: 'Processo químico que dissolve o ouro através de uma mistura de ácido clorídrico e ácido nítrico, seguido de precipitação e purificação, permitindo obter ouro de elevada pureza a partir de ouro bruto e concentrados, em condições controladas e seguras.', en: 'A chemical process that dissolves gold in a mixture of hydrochloric and nitric acid, followed by precipitation and purification, producing high-purity gold from raw gold and concentrates under controlled, safe conditions.' },
        benefits: [
          { pt: 'Elevada eficácia na dissolução de ouro de diferentes granulometrias e origens.', en: 'Highly effective dissolution of gold of different particle sizes and origins.' },
          { pt: 'Processo consolidado e amplamente utilizado na indústria de refinação a nível mundial.', en: 'A well-established process widely used in the refining industry worldwide.' },
          { pt: 'Controlo rigoroso de emissões e resíduos, em conformidade com as normas ambientais.', en: 'Strict control of emissions and waste, in compliance with environmental standards.' },
        ] },
      { id: 'electrolise', image: 'brochure-electrolysis',
        title: { pt: 'Refinação por Electrólise', en: 'Electrolytic Refining' },
        text: { pt: 'Processo electrolítico que utiliza corrente eléctrica para separar o ouro de outras substâncias, permitindo a sua purificação final e a obtenção de ouro de elevada pureza, adequado aos padrões de comercialização internacional.', en: 'An electrolytic process that uses electric current to separate gold from other substances, enabling its final purification and producing high-purity gold suited to international trading standards.' },
        benefits: [
          { pt: 'Elevado grau de pureza final do metal refinado.', en: 'High final purity of the refined metal.' },
          { pt: 'Processo energeticamente eficiente e com menor geração de resíduos químicos.', en: 'An energy-efficient process generating less chemical waste.' },
          { pt: 'Maior controlo e consistência na qualidade do produto acabado.', en: 'Greater control and consistency in the quality of the finished product.' },
        ] },
    ],
    fineGold: {
      title: { pt: 'Fine Gold', en: 'Fine Gold' },
      text: { pt: 'A combinação destes dois sistemas confere à refinaria versatilidade operacional, permitindo adaptar o processo de tratamento ao tipo de matéria-prima recebida e assegurar, em todas as etapas, um produto final certificado e conforme aos padrões internacionais de qualidade.', en: 'Combining these two systems gives the refinery operational versatility, allowing the treatment process to be adapted to the type of raw material received and ensuring, at every stage, a certified final product that meets international quality standards.' },
      image: 'brochure-fine-gold-bars',
    },
  },

  contrastaria: {
    title: { pt: 'Serviços de Contrastaria', en: 'Assay Office Services' },
    intro: { pt: 'Complementando a actividade de refinação, a unidade dispõe de um serviço de contrastaria, responsável pela verificação, ensaio e certificação oficial dos metais preciosos processados. Este serviço assegura que cada lote de ouro refinado é rigorosamente analisado e selado com garantia de título (pureza), conferindo-lhe reconhecimento e valor de mercado tanto a nível nacional como internacional.', en: 'Complementing its refining activity, the facility has an assay office (contrastaria) responsible for the verification, assaying and official certification of the precious metals processed. This service ensures that every lot of refined gold is rigorously analysed and sealed with a guarantee of fineness (purity), giving it recognition and market value both nationally and internationally.' },
    impactTitle: { pt: 'Vantagens e Impacto', en: 'Benefits and Impact' },
    impact: [
      { pt: 'Valorização do ouro produzido em Angola dentro do próprio país, reduzindo a exportação de matéria-prima não processada.', en: 'Adding value to gold produced in Angola within the country itself, reducing exports of unprocessed raw material.' },
      { pt: 'Reforço da transparência e da rastreabilidade na cadeia de produção aurífera nacional.', en: 'Greater transparency and traceability in the national gold production chain.' },
      { pt: 'Contribuição para a formalização da actividade mineira artesanal e de pequena escala.', en: 'A contribution to formalising artisanal and small-scale mining.' },
      { pt: 'Criação de emprego directo e indirecto especializado no Polo Industrial de Viana.', en: 'Creation of direct and indirect skilled employment at the Viana Industrial Hub.' },
      { pt: 'Aumento das receitas fiscais e das divisas geradas pelo sector do ouro.', en: 'Higher tax revenue and foreign-exchange earnings from the gold sector.' },
      { pt: 'Posicionamento de Angola como novo actor na cadeia de valor internacional do ouro refinado.', en: 'Positioning Angola as a new player in the international refined-gold value chain.' },
    ],
    blocks: [
      { id: 'ensaio', image: 'brochure-analysis-loupe',
        title: { pt: 'Ensaio e Determinação do Título', en: 'Assaying and Fineness Determination' },
        text: { pt: 'Análise laboratorial da liga metálica para determinação exacta do teor do ouro, expresso em quilates ou em partes por mil, através de métodos de ensaio reconhecidos (via seca e via húmida), garantindo resultados fiáveis e reprodutíveis.', en: 'Laboratory analysis of the alloy to determine the exact gold content, expressed in carats or parts per thousand, using recognised assay methods (fire assay and wet assay), ensuring reliable and reproducible results.' } },
      { id: 'certificacao', image: 'brochure-fine-gold-bar',
        title: { pt: 'Certificado de Origem e Pureza', en: 'Certificate of Origin and Purity' },
        text: { pt: 'A unidade dispõe de um serviço de contrastaria que verifica e certifica a pureza dos metais preciosos, assegurando a sua qualidade e reconhecimento no mercado nacional e internacional.', en: 'The facility has an assay office that verifies and certifies the purity of precious metals, ensuring their quality and recognition on national and international markets.' } },
      { id: 'rastreabilidade', image: 'brochure-precious-metals',
        title: { pt: 'Rastreabilidade e Conformidade', en: 'Traceability and Compliance' },
        text: { pt: 'O serviço de contrastaria opera de forma integrada com o processo de refinação, assegurando a cadeia de custódia do metal desde a matéria-prima até ao produto certificado, em conformidade com as exigências legais e regulamentares aplicáveis ao sector aurífero em Angola.', en: 'The assay office operates in an integrated manner with the refining process, ensuring the metal’s chain of custody from raw material to certified product, in compliance with the legal and regulatory requirements applicable to Angola’s gold sector.' },
        items: [
          { pt: 'Determinação precisa do título do ouro (quilates/milésimas).', en: 'Precise determination of gold fineness (carats/millesimal).' },
          { pt: 'Marcação oficial (punção) de garantia de pureza.', en: 'Official hallmarking (punch mark) guaranteeing purity.' },
          { pt: 'Emissão de certificados de origem, peso e título por lote.', en: 'Issue of certificates of origin, weight and fineness per lot.' },
          { pt: 'Rastreabilidade completa da matéria-prima ao produto final.', en: 'Full traceability from raw material to final product.' },
          { pt: 'Conformidade com normas e práticas internacionais de contrastaria.', en: 'Compliance with international assay-office standards and practices.' },
        ] },
      { id: 'marcacao', image: 'brochure-contrastaria-die',
        title: { pt: 'Marcação e Selagem (Hallmarking)', en: 'Marking and Sealing (Hallmarking)' },
        text: { pt: 'Aposição da marca de contraste (punção oficial) em cada peça ou lingote, atestando o título do metal e a origem da refinação, em conformidade com as normas e convenções internacionais de contrastaria de metais preciosos.', en: 'Application of the hallmark (official punch mark) to each piece or ingot, attesting the metal’s fineness and refining origin, in accordance with international standards and conventions for hallmarking precious metals.' } },
    ],
    status: 'a-confirmar',
  },

  tagline: { pt: 'Pureza • Autenticidade • Conformidade • Rastreabilidade', en: 'Purity • Authenticity • Compliance • Traceability' },
}
