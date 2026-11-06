/**
 * Envio do formulário de contacto.
 * O endpoint é configurado em VITE_CONTACT_ENDPOINT (serviço próprio, função
 * serverless ou fornecedor de formulários). A protecção anti-spam definitiva
 * (rate limiting, CAPTCHA/Turnstile, validação) deve existir também no servidor.
 */
export interface ContactPayload {
  name: string
  organisation: string
  email: string
  phone: string
  subject: string
  message: string
  consent: boolean
  lang: string
  /** Campo-isco: deve chegar vazio. */
  website: string
  /** Milissegundos entre a abertura do formulário e o envio. */
  elapsedMs: number
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: 'not-configured' | 'network' | 'server' | 'rejected' }

const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined)?.trim()

export const contactConfigured = Boolean(endpoint)

export async function submitContact(payload: ContactPayload): Promise<SubmitResult> {
  // Heurísticas anti-spam no cliente (complementares às do servidor).
  if (payload.website || payload.elapsedMs < 3000) return { ok: false, reason: 'rejected' }
  if (!endpoint) return { ok: false, reason: 'not-configured' }
  try {
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), 15000)
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    window.clearTimeout(timer)
    return res.ok ? { ok: true } : { ok: false, reason: 'server' }
  } catch {
    return { ok: false, reason: 'network' }
  }
}
