import type { L, Verification } from './types'

export interface LeaderProfile {
  name: string
  role: L
  headline: L
  subtitle: L
  image: string
  /** Parágrafos de apresentação (texto fornecido pela Refinaria). */
  bio: L[]
  education: { degree: L; institution: string }[]
  experience: { institutions: string[]; areas: L[] }
  /** Nome e cargo actual fornecidos para validação institucional. */
  status: Verification
}

/**
 * Perfil da CEO — conteúdo fornecido pela Refinaria. Não acrescentar declarações,
 * citações ou dados biográficos que não tenham sido fornecidos.
 */
export const initialLeadership: LeaderProfile = {
  name: 'Eng.ª Jaimara Marques',
  role: { pt: 'CEO — Refinaria de Ouro de Angola', en: 'CEO — Angola Gold Refinery' },
  headline: {
    pt: 'Liderança, Visão e Excelência ao Serviço da Valorização do Ouro Angolano',
    en: 'Leadership, Vision and Excellence in Service of Adding Value to Angolan Gold',
  },
  subtitle: { pt: 'Eng.ª Jaimara Marques | Liderança Executiva', en: 'Eng. Jaimara Marques | Executive Leadership' },
  image: 'ceo-jaimara-marques',
  bio: [
    {
      pt: 'Com uma trajectória marcada pela excelência técnica, visão estratégica e experiência no sector mineiro angolano, a Eng.ª Jaimara Marques representa uma liderança orientada para a inovação, o rigor e a valorização dos recursos nacionais.',
      en: 'With a career marked by technical excellence, strategic vision and experience in Angola’s mining sector, Eng. Jaimara Marques represents a leadership focused on innovation, rigour and adding value to national resources.',
    },
    {
      pt: 'Licenciada em Engenharia de Minas pela University of Johannesburg e com um MBA pela MANCOSA, reúne formação técnica especializada e conhecimentos sólidos de gestão empresarial.',
      en: 'Holding a degree in Mining Engineering from the University of Johannesburg and an MBA from MANCOSA, she combines specialised technical training with solid business-management knowledge.',
    },
    {
      pt: 'Ao longo da sua carreira, desenvolveu experiência em instituições de referência do sector mineiro, incluindo a Sociedade Mineira de Catoca, a ENDIAMA E.P. e a Alfa5, com actuação nas áreas de Recursos Humanos, Finanças e Logística.',
      en: 'Throughout her career, she has gained experience at leading institutions in the mining sector, including Sociedade Mineira de Catoca, ENDIAMA E.P. and Alfa5, working in the areas of Human Resources, Finance and Logistics.',
    },
    {
      pt: 'A sua trajectória profissional reflecte o compromisso com a excelência, a responsabilidade e o desenvolvimento sustentável da indústria mineira angolana.',
      en: 'Her professional journey reflects a commitment to excellence, responsibility and the sustainable development of Angola’s mining industry.',
    },
  ],
  education: [
    { degree: { pt: 'Licenciatura em Engenharia de Minas', en: 'Degree in Mining Engineering' }, institution: 'University of Johannesburg' },
    { degree: { pt: 'MBA — Master of Business Administration', en: 'MBA — Master of Business Administration' }, institution: 'MANCOSA' },
  ],
  experience: {
    institutions: ['Sociedade Mineira de Catoca', 'ENDIAMA E.P.', 'Alfa5'],
    areas: [
      { pt: 'Recursos Humanos', en: 'Human Resources' },
      { pt: 'Finanças', en: 'Finance' },
      { pt: 'Logística', en: 'Logistics' },
    ],
  },
  status: 'a-confirmar',
}
