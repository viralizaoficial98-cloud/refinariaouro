import { AnimatePresence, motion } from 'framer-motion'
import { useId, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { contactConfigured, submitContact, type SubmitResult } from '../../services/contact'

type Fields = { name: string; organisation: string; email: string; phone: string; subject: string; message: string; consent: boolean; website: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'sending' | 'success' | 'error'

const subjects = [
  { value: 'geral', pt: 'Informações gerais', en: 'General enquiries' },
  { value: 'parcerias', pt: 'Parcerias e investimento', en: 'Partnerships and investment' },
  { value: 'fornecimento', pt: 'Fornecimento de material', en: 'Material supply' },
  { value: 'servicos', pt: 'Serviços técnicos', en: 'Technical services' },
  { value: 'carreiras', pt: 'Carreiras', en: 'Careers' },
  { value: 'imprensa', pt: 'Imprensa e comunicação', en: 'Press and media' },
]

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function ContactForm({ dark = false }: { dark?: boolean }) {
  const { t, lang } = useLang()
  const [params] = useSearchParams()
  const initialSubject = subjects.some((s) => s.value === params.get('assunto')) ? params.get('assunto')! : 'geral'
  const [f, setF] = useState<Fields>({ name: '', organisation: '', email: '', phone: '', subject: initialSubject, message: '', consent: false, website: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<SubmitResult | null>(null)
  const started = useRef(Date.now())
  const uid = useId()

  const validate = (v: Fields): Errors => {
    const e: Errors = {}
    if (v.name.trim().length < 2) e.name = t({ pt: 'Indique o seu nome.', en: 'Please enter your name.' })
    if (!emailRe.test(v.email.trim())) e.email = t({ pt: 'Indique um endereço de e-mail válido.', en: 'Please enter a valid email address.' })
    if (v.phone && !/^[+()\d\s-]{7,20}$/.test(v.phone.trim())) e.phone = t({ pt: 'Número de telefone inválido.', en: 'Invalid phone number.' })
    if (v.message.trim().length < 20) e.message = t({ pt: 'A mensagem deve ter pelo menos 20 caracteres.', en: 'The message must be at least 20 characters long.' })
    if (v.message.length > 3000) e.message = t({ pt: 'A mensagem não pode exceder 3000 caracteres.', en: 'The message cannot exceed 3000 characters.' })
    if (!v.consent) e.consent = t({ pt: 'É necessário aceitar a política de privacidade.', en: 'You must accept the privacy policy.' })
    return e
  }

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    const next = { ...f, [k]: v }
    setF(next)
    if (errors[k]) setErrors((old) => ({ ...old, [k]: validate(next)[k] }))
  }
  const blur = (k: keyof Fields) => setErrors((old) => ({ ...old, [k]: validate(f)[k] }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    const errs = validate(f)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) { document.getElementById(`${uid}-${first}`)?.focus(); return }
    setStatus('sending')
    const r = await submitContact({ ...f, lang, elapsedMs: Date.now() - started.current })
    setResult(r)
    setStatus(r.ok ? 'success' : 'error')
    if (r.ok) setF((old) => ({ ...old, message: '', consent: false }))
  }

  const errorText = (r: SubmitResult | null) => {
    if (!r || r.ok) return ''
    switch (r.reason) {
      case 'not-configured': return t({ pt: 'A mensagem não foi enviada: o serviço de recepção de mensagens ainda não está configurado neste portal. Por favor, tente mais tarde ou utilize um canal oficial de contacto.', en: 'Your message was not sent: the message-receiving service is not yet configured on this portal. Please try again later or use an official contact channel.' })
      case 'network': return t({ pt: 'A mensagem não foi enviada devido a uma falha de ligação. Verifique a sua ligação e tente novamente.', en: 'Your message was not sent due to a connection failure. Please check your connection and try again.' })
      case 'server': return t({ pt: 'O servidor não aceitou a mensagem. Tente novamente dentro de alguns minutos.', en: 'The server did not accept the message. Please try again in a few minutes.' })
      case 'rejected': return t({ pt: 'Não foi possível validar o envio. Aguarde alguns segundos e tente novamente.', en: 'The submission could not be validated. Please wait a few seconds and try again.' })
    }
  }

  const label = `block text-[0.66rem] font-semibold uppercase tracking-[0.2em] ${dark ? 'text-ivory/70' : 'text-charcoal-500'}`
  const input = (err?: string) =>
    `mt-2 block w-full border-0 border-b bg-transparent px-0 py-3 text-base transition-colors duration-300 focus:outline-none focus:ring-0 ${dark ? 'text-ivory placeholder:text-ivory/30' : 'text-charcoal placeholder:text-charcoal/30'} ${err ? 'border-red-500' : dark ? 'border-ivory/25 focus:border-gold' : 'border-charcoal/20 focus:border-forest'}`
  const errCls = 'mt-2 text-xs text-red-500'
  const field = (k: keyof Fields) => ({ id: `${uid}-${k}`, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${uid}-${k}-err` : undefined })

  return (
    <form noValidate onSubmit={onSubmit} className="relative" aria-busy={status === 'sending'}>
      {!contactConfigured && (
        <p className={`mb-8 border-l-2 border-gold pl-4 text-sm ${dark ? 'text-ivory/70' : 'text-charcoal-500'}`}>
          {t({ pt: 'Aviso: o envio de mensagens ainda não está activo neste portal (serviço de recepção por configurar). O formulário não simula envios.', en: 'Notice: message sending is not yet active on this portal (receiving service pending configuration). The form does not simulate submissions.' })}
        </p>
      )}
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className={label}>{t({ pt: 'Nome completo', en: 'Full name' })} *</label>
          <input {...field('name')} autoComplete="name" required value={f.name} onChange={(e) => set('name', e.target.value)} onBlur={() => blur('name')} className={input(errors.name)} />
          {errors.name && <p id={`${uid}-name-err`} className={errCls}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-organisation`} className={label}>{t({ pt: 'Organização', en: 'Organisation' })}</label>
          <input {...field('organisation')} autoComplete="organization" value={f.organisation} onChange={(e) => set('organisation', e.target.value)} className={input()} />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={label}>E-mail *</label>
          <input {...field('email')} type="email" autoComplete="email" required value={f.email} onChange={(e) => set('email', e.target.value)} onBlur={() => blur('email')} className={input(errors.email)} />
          {errors.email && <p id={`${uid}-email-err`} className={errCls}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className={label}>{t({ pt: 'Telefone', en: 'Phone' })}</label>
          <input {...field('phone')} type="tel" autoComplete="tel" value={f.phone} onChange={(e) => set('phone', e.target.value)} onBlur={() => blur('phone')} className={input(errors.phone)} />
          {errors.phone && <p id={`${uid}-phone-err`} className={errCls}>{errors.phone}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-subject`} className={label}>{t({ pt: 'Assunto', en: 'Subject' })}</label>
          <select {...field('subject')} value={f.subject} onChange={(e) => set('subject', e.target.value)} className={`${input()} cursor-pointer`}>
            {subjects.map((s) => <option key={s.value} value={s.value} className="text-charcoal">{lang === 'pt' ? s.pt : s.en}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-message`} className={label}>{t({ pt: 'Mensagem', en: 'Message' })} *</label>
          <textarea {...field('message')} rows={5} required maxLength={3000} value={f.message} onChange={(e) => set('message', e.target.value)} onBlur={() => blur('message')} className={`${input(errors.message)} resize-y`} />
          {errors.message && <p id={`${uid}-message-err`} className={errCls}>{errors.message}</p>}
        </div>
        {/* Campo-isco anti-spam: invisível para pessoas */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${uid}-website`}>Website</label>
          <input id={`${uid}-website`} tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set('website', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className={`flex items-start gap-3 text-sm ${dark ? 'text-ivory/75' : 'text-charcoal-700'}`}>
            <input {...field('consent')} type="checkbox" checked={f.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-forest" />
            <span>
              {t({ pt: 'Autorizo o tratamento dos meus dados pessoais para resposta a este pedido, nos termos da ', en: 'I authorise the processing of my personal data to respond to this request, under the ' })}
              <a href={path('legal')} className="underline decoration-gold underline-offset-4">{t({ pt: 'Política de Privacidade', en: 'Privacy Policy' })}</a>. *
            </span>
          </label>
          {errors.consent && <p id={`${uid}-consent-err`} className={errCls}>{errors.consent}</p>}
        </div>
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <button type="submit" disabled={status === 'sending'} className="group relative inline-flex items-center gap-3 overflow-hidden bg-gold px-8 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors duration-500 hover:text-ivory disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2">
          <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-forest transition-transform duration-500 ease-lux group-hover:scale-x-100" />
          <span className="relative">{status === 'sending' ? t({ pt: 'A enviar…', en: 'Sending…' }) : t({ pt: 'Enviar mensagem', en: 'Send message' })}</span>
          {status !== 'sending' && <span aria-hidden className="relative">→</span>}
        </button>
        <p className={`text-xs ${dark ? 'text-ivory/50' : 'text-charcoal-400'}`}>* {t({ pt: 'Campos obrigatórios', en: 'Required fields' })}</p>
      </div>
      <div role="status" aria-live="polite" className="mt-8">
        <AnimatePresence mode="wait">
          {status === 'success' && (
            <motion.p key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="border-l-2 border-emerald bg-emerald/10 p-4 text-sm">
              {t({ pt: 'Mensagem enviada com sucesso. Obrigado pelo seu contacto.', en: 'Message sent successfully. Thank you for getting in touch.' })}
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p key="err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="border-l-2 border-red-500 bg-red-500/10 p-4 text-sm">
              {errorText(result)}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
