/**
 * Interfaces de integração com o backend do CMS.
 *
 * O frontend NUNCA contém credenciais ou chaves. A autenticação deve ser feita
 * no servidor (ex.: sessão com cookie HttpOnly + SameSite + CSRF, ou OIDC), e a
 * gestão de ficheiros deve usar URLs pré-assinadas emitidas pelo servidor.
 *
 * Contrato REST esperado (VITE_API_BASE_URL):
 *   POST   /auth/login          { email, password }       → 200 { user }   (define cookie HttpOnly)
 *   POST   /auth/logout                                     → 204
 *   GET    /auth/me                                         → 200 { user } | 401
 *   GET    /content                                         → 200 SiteContent
 *   PUT    /content/:section    (JSON da secção)            → 200
 *   POST   /uploads/presign     { filename, contentType }   → 200 { uploadUrl, publicUrl }
 */
import type { SiteContent } from '../content/ContentContext'

export interface AdminUser { email: string; name?: string; role: 'admin' | 'editor' }

export const apiBase = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') || ''
export const apiConfigured = Boolean(apiBase)

async function request<T>(pathname: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(apiBase + pathname, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...init.headers },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T)
}

export const authApi = {
  login: (email: string, password: string) => request<{ user: AdminUser }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => request<void>('/auth/logout', { method: 'POST' }),
  me: () => request<{ user: AdminUser }>('/auth/me'),
}

export const contentApi = {
  load: () => request<SiteContent>('/content'),
  save: <K extends keyof SiteContent>(section: K, value: SiteContent[K]) =>
    request<void>(`/content/${String(section)}`, { method: 'PUT', body: JSON.stringify(value) }),
  presignUpload: (filename: string, contentType: string) =>
    request<{ uploadUrl: string; publicUrl: string }>('/uploads/presign', { method: 'POST', body: JSON.stringify({ filename, contentType }) }),
}
