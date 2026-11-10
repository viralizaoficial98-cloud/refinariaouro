import type { L, Verification } from './types'

export interface LeaderProfile {
  name: string
  role: L
  /** Título da secção de liderança. */
  headline: L
  subtitle: L
  image: string
  /** Texto institucional (proposta editorial da Refinaria, não declaração pessoal). */
  bio: L[]
  /** Apenas dados verificados; listas vazias não são apresentadas. */
  education: { degree: L; institution: string }[]
  experience: { institutions: string[]; areas: L[] }
  /** Nome, cargo e texto fornecidos para validação institucional. */
  status: Verification
}

/**
 * Perfil do Director Geral — conteúdo fornecido pela Refinaria. Não acrescentar formação, cargos
 * anteriores, certificações, datas, declarações ou outros dados biográficos não verificados.
 */
export const initialLeadership: LeaderProfile = {
  name: 'Domingos Kimba Baptista',
  role: { pt: 'Director Geral — Refinaria de Ouro de Angola', en: 'Director General — Angola Gold Refinery' },
  headline: { pt: 'Liderança Executiva', en: 'Executive Leadership' },
  subtitle: { pt: 'Domingos Kimba Baptista | Liderança Executiva', en: 'Domingos Kimba Baptista | Executive Leadership' },
  image: 'ceo-domingos-kimba-baptista',
  bio: [
    {
      pt: 'A liderança da Refinaria de Ouro de Angola está orientada para o fortalecimento da indústria nacional de metais preciosos, a excelência operacional e a valorização dos recursos minerais angolanos. Sob a direcção executiva de Domingos Kimba Baptista, a instituição reafirma o seu compromisso com o rigor, a inovação, a qualidade e o desenvolvimento sustentável.',
      en: 'The leadership of the Angola Gold Refinery is focused on strengthening the national precious-metals industry, operational excellence and adding value to Angola’s mineral resources. Under the executive direction of Domingos Kimba Baptista, the institution reaffirms its commitment to rigour, innovation, quality and sustainable development.',
    },
  ],
  education: [],
  experience: { institutions: [], areas: [] },
  status: 'a-confirmar',
}
