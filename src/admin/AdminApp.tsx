import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useContent, type SiteContent } from '../content/ContentContext'
import { images } from '../content/images'
import { nav } from '../content/site'
import { initialPages, type PageKey } from '../content/pages'
import { routes } from '../content/routes'
import { Picture } from '../components/ui/Picture'
import { apiConfigured, authApi, contentApi, type AdminUser } from '../services/api'
import { contactConfigured } from '../services/contact'
import { FieldEditor } from './FieldEditor'
import { Seo } from '../seo/Seo'

type Section = 'dashboard' | 'leadership' | 'brochure' | 'slides' | 'news' | 'pages' | 'services' | 'documents' | 'gallery' | 'jobs' | 'faq' | 'contact' | 'menus' | 'media' | 'export'

const sections: { key: Section; label: string }[] = [
  { key: 'dashboard', label: 'Painel' },
  { key: 'leadership', label: 'Liderança (Director Geral)' },
  { key: 'brochure', label: 'Conteúdos da brochura' },
  { key: 'slides', label: 'Slides do hero' },
  { key: 'news', label: 'Notícias' },
  { key: 'pages', label: 'Páginas e textos' },
  { key: 'services', label: 'Serviços' },
  { key: 'documents', label: 'Documentos' },
  { key: 'gallery', label: 'Galeria' },
  { key: 'jobs', label: 'Vagas' },
  { key: 'faq', label: 'Perguntas frequentes' },
  { key: 'contact', label: 'Contactos' },
  { key: 'menus', label: 'Menus' },
  { key: 'media', label: 'Fotografias' },
  { key: 'export', label: 'Exportar conteúdo' },
]

const btn = 'border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors'

function Login({ onDemo, onLogged }: { onDemo: () => void; onLogged: (u: AdminUser) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true); setError('')
    try { const r = await authApi.login(email, password); onLogged(r.user) }
    catch { setError('Credenciais inválidas ou serviço indisponível.') }
    finally { setBusy(false); setPassword('') }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-900 p-6">
      <div className="w-full max-w-md bg-ivory p-10">
        <img src="/brand/logo.png" alt="Refinaria de Ouro de Angola — Grupo ENDIAMA" className="mx-auto mb-8 h-24 w-auto" />
        <p className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-gold-deep">Backoffice</p>
        <h1 className="mt-3 font-display text-4xl text-forest">Gestão de conteúdos</h1>
        {apiConfigured ? (
          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block text-sm">E-mail<input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full border border-charcoal/20 px-3 py-2" /></label>
            <label className="block text-sm">Palavra-passe<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full border border-charcoal/20 px-3 py-2" /></label>
            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            <button disabled={busy} className="w-full bg-forest py-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ivory disabled:opacity-60">{busy ? 'A autenticar…' : 'Entrar'}</button>
          </form>
        ) : (
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-charcoal-700">
            <p className="border-l-2 border-gold pl-4">Nenhum backend configurado (<code>VITE_API_BASE_URL</code> vazio). A autenticação real está desactivada e <strong>não existe persistência</strong>.</p>
            <p>Pode explorar o CMS em <strong>modo de demonstração</strong>: as alterações são visíveis no site apenas nesta sessão do navegador e perdem-se ao recarregar. Use «Exportar conteúdo» para obter o JSON editado.</p>
            <button type="button" onClick={onDemo} className="w-full bg-gold py-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-charcoal">Entrar em modo de demonstração</button>
          </div>
        )}
        <Link to="/" className="mt-8 block text-center text-xs text-charcoal-500 underline">← Voltar ao site</Link>
      </div>
    </div>
  )
}

function CollectionEditor<T extends { id?: string }>({ items, title, onSave }: { items: T[]; title: (i: T) => string; onSave: (v: T[]) => void }) {
  const [draft, setDraft] = useState<T[]>(items)
  const [sel, setSel] = useState(0)
  useEffect(() => setDraft(items), [items])
  const dirty = JSON.stringify(draft) !== JSON.stringify(items)
  const current = draft[sel]
  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <div>
        <ul className="border border-charcoal/10 bg-white">
          {draft.map((it, i) => (
            <li key={(it.id ?? '') + i}>
              <button type="button" onClick={() => setSel(i)} className={`block w-full border-b border-charcoal/5 px-4 py-3 text-left text-sm ${i === sel ? 'bg-forest text-ivory' : 'hover:bg-ivory'}`}>
                <span className="line-clamp-2">{title(it) || '(sem título)'}</span>
              </button>
            </li>
          ))}
          {!draft.length && <li className="px-4 py-3 text-sm text-charcoal-500">Sem itens.</li>}
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          {draft.length > 0 && <button type="button" className={`${btn} border-forest/30 text-forest hover:bg-forest hover:text-ivory`} onClick={() => { setDraft([...draft, structuredClone({ ...draft[draft.length - 1], id: `novo-${Date.now().toString(36)}` })]); setSel(draft.length) }}>+ Duplicar último</button>}
          {current && <button type="button" className={`${btn} border-red-300 text-red-700 hover:bg-red-50`} onClick={() => { if (confirm('Remover este item?')) { setDraft(draft.filter((_, i) => i !== sel)); setSel(0) } }}>Remover</button>}
        </div>
      </div>
      <div className="bg-white p-6">
        {current ? <FieldEditor name="item" value={current} onChange={(v) => { const c = [...draft]; c[sel] = v as T; setDraft(c) }} /> : <p className="text-sm text-charcoal-500">Seleccione um item.</p>}
        <SaveBar dirty={dirty} onSave={() => onSave(draft)} onDiscard={() => setDraft(items)} />
      </div>
    </div>
  )
}

function ObjectEditor<T>({ value, onSave }: { value: T; onSave: (v: T) => void }) {
  const [draft, setDraft] = useState<T>(value)
  useEffect(() => setDraft(value), [value])
  const dirty = JSON.stringify(draft) !== JSON.stringify(value)
  return (
    <div className="bg-white p-6">
      <FieldEditor name="root" value={draft} onChange={(v) => setDraft(v as T)} />
      <SaveBar dirty={dirty} onSave={() => onSave(draft)} onDiscard={() => setDraft(value)} />
    </div>
  )
}

function SaveBar({ dirty, onSave, onDiscard }: { dirty: boolean; onSave: () => void; onDiscard: () => void }) {
  return (
    <div className="sticky bottom-0 -mx-6 -mb-6 mt-8 flex items-center justify-between gap-4 border-t border-charcoal/10 bg-white/95 px-6 py-4 backdrop-blur">
      <span className="text-xs text-charcoal-500">{dirty ? 'Alterações por aplicar.' : 'Sem alterações.'}</span>
      <div className="flex gap-2">
        <button type="button" disabled={!dirty} onClick={onDiscard} className={`${btn} border-charcoal/20 text-charcoal-700 disabled:opacity-40`}>Descartar</button>
        <button type="button" disabled={!dirty} onClick={onSave} className={`${btn} border-forest bg-forest text-ivory disabled:opacity-40`}>{apiConfigured ? 'Guardar' : 'Aplicar (sessão)'}</button>
      </div>
    </div>
  )
}

export default function AdminApp() {
  const { content, update, reset } = useContent()
  const [user, setUser] = useState<AdminUser | null>(null)
  const [demo, setDemo] = useState(false)
  const [section, setSection] = useState<Section>('dashboard')
  const [page, setPage] = useState<PageKey>('about')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!apiConfigured) return
    authApi.me().then((r) => setUser(r.user)).catch(() => undefined)
  }, [])

  const save = async <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    if (apiConfigured && user) {
      try { await contentApi.save(key, value); update(key, value); setNotice('Guardado no servidor.') }
      catch { setNotice('Erro ao guardar no servidor. Nada foi alterado.') }
    } else {
      update(key, value)
      setNotice('Aplicado nesta sessão (modo de demonstração — sem persistência).')
    }
    window.setTimeout(() => setNotice(''), 4000)
  }

  if (!user && !demo) return <><Seo title="Backoffice" description="Área reservada" noindex /><Login onDemo={() => setDemo(true)} onLogged={setUser} /></>

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `conteudo-refinaria-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const pending = [
    ...content.services.filter((s) => s.status === 'a-confirmar').map((s) => `Serviço: ${s.title.pt}`),
    ...content.documents.filter((d) => d.status === 'a-confirmar').map((d) => `Documento: ${d.title.pt}`),
    ...content.news.filter((n) => n.sample).map((n) => `Notícia exemplificativa: ${n.title.pt}`),
    ...(content.leadership.status === 'confirmado' ? [] : ['Liderança: nome, cargo e texto institucional do Director Geral (proposta editorial)']),
    ...(content.contact.phones.some((p) => p.status === 'confirmado') ? [] : ['Contactos: telefone (brochura indica «900 000 000» — confirmar se é o número real)']),
    ...(content.contact.emails.some((p) => p.status === 'confirmado') ? [] : ['Contactos: e-mail geral@roa.co.ao (brochura)']),
    ...(content.contact.website?.status === 'confirmado' ? [] : ['Contactos: website www.roa.co.ao (brochura)']),
    ...(content.contact.address.status === 'confirmado' ? [] : ['Contactos: localização Polo Industrial de Viana (brochura) e mapa']),
    ...(content.brochure.capacity.status === 'confirmado' ? [] : ['Brochura: capacidade declarada de 25 kg de ouro por dia (confirmar actualidade)']),
    ...(content.brochure.contrastaria.status === 'confirmado' ? [] : ['Brochura: contrastaria, certificados de origem/pureza e marcação oficial (validação regulamentar)']),
    'Brochura: alegação «primeira unidade do género no país»',
    'Direitos de utilização das 14 fotografias extraídas da brochura institucional',
    'Direitos de utilização das 3 imagens de referência do hero e do retrato do Director Geral',
  ]

  return (
    <div className="min-h-screen bg-ivory-200 font-sans text-charcoal">
      <Seo title="Backoffice" description="Área reservada" noindex />
      {!apiConfigured && (
        <div role="status" className="bg-gold px-4 py-2 text-center text-xs font-semibold text-charcoal">
          MODO DE DEMONSTRAÇÃO — sem backend: as alterações não são guardadas e perdem-se ao recarregar a página.
        </div>
      )}
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-forest-900 text-ivory md:flex">
          <div className="px-6 py-6">
            <img src="/brand/logo.png" alt="Refinaria de Ouro de Angola — Grupo ENDIAMA" className="h-16 w-auto" style={{ filter: 'drop-shadow(0 0 0.35px rgba(255,255,255,0.7)) drop-shadow(0 0 8px rgba(255,255,255,0.28))' }} />
            <p className="mt-3 text-[0.6rem] uppercase tracking-[0.3em] text-gold">Backoffice</p>
          </div>
          <nav aria-label="Secções do backoffice" className="flex-1 overflow-y-auto">
            {sections.map((s) => (
              <button key={s.key} type="button" onClick={() => setSection(s.key)} aria-current={section === s.key ? 'page' : undefined}
                className={`block w-full px-6 py-2.5 text-left text-sm ${section === s.key ? 'bg-forest text-gold-light' : 'text-ivory/75 hover:bg-forest/60'}`}>{s.label}</button>
            ))}
          </nav>
          <div className="space-y-2 p-6 text-xs">
            <Link to="/" className="block text-ivory/70 underline">Ver site</Link>
            <button type="button" onClick={() => { if (user) authApi.logout().catch(() => undefined); setUser(null); setDemo(false) }} className="text-ivory/70 underline">Terminar sessão</button>
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-5 sm:p-8">
          <label className="mb-6 block md:hidden">
            <span className="text-xs text-charcoal-500">Secção</span>
            <select value={section} onChange={(e) => setSection(e.target.value as Section)} className="mt-1 w-full border px-3 py-2">{sections.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}</select>
          </label>
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-display text-4xl text-forest">{sections.find((s) => s.key === section)?.label}</h1>
            {notice && <p role="status" className="bg-white px-4 py-2 text-sm text-forest shadow">{notice}</p>}
          </header>

          {section === 'dashboard' && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="bg-white p-6">
                <h2 className="font-display text-2xl text-forest">Estado da integração</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>API do CMS: <strong>{apiConfigured ? 'configurada' : 'não configurada (demonstração)'}</strong></li>
                  <li>Formulário de contacto: <strong>{contactConfigured ? 'endpoint configurado' : 'sem endpoint (envios bloqueados com aviso)'}</strong></li>
                  <li>Utilizador: <strong>{user ? user.email : 'demonstração'}</strong></li>
                </ul>
              </div>
              <div className="bg-white p-6">
                <h2 className="font-display text-2xl text-forest">Conteúdo a confirmar ({pending.length})</h2>
                <p className="mt-1 text-xs text-charcoal-500">Itens que não são publicados como factos até validação oficial.</p>
                <ul className="mt-4 max-h-80 space-y-1 overflow-y-auto text-sm">{pending.map((p) => <li key={p} className="border-l-2 border-gold pl-3">{p}</li>)}</ul>
              </div>
            </div>
          )}
          {section === 'brochure' && (
            <div className="space-y-4">
              <p className="max-w-3xl text-sm text-charcoal-500">Textos, fotografias (identificadores de imagem), etapas da cadeia de valor, capacidade declarada, técnicas de refinação, contrastaria e traduções PT/EN extraídos da brochura institucional. Mude <code>status</code> para <code>confirmado</code> após validação.</p>
              <ObjectEditor value={content.brochure} onSave={(v) => save('brochure', v)} />
            </div>
          )}
          {section === 'leadership' && <ObjectEditor value={content.leadership} onSave={(v) => save('leadership', v)} />}
          {section === 'slides' && <CollectionEditor items={content.slides} title={(s) => s.title.pt} onSave={(v) => save('slides', v)} />}
          {section === 'news' && <CollectionEditor items={content.news} title={(n) => `${n.date} · ${n.title.pt}`} onSave={(v) => save('news', v)} />}
          {section === 'services' && <CollectionEditor items={content.services} title={(s) => `${s.status === 'confirmado' ? '✓' : '…'} ${s.title.pt}`} onSave={(v) => save('services', v)} />}
          {section === 'documents' && <CollectionEditor items={content.documents} title={(d) => d.title.pt} onSave={(v) => save('documents', v)} />}
          {section === 'gallery' && <CollectionEditor items={content.gallery} title={(g) => g.caption.pt} onSave={(v) => save('gallery', v)} />}
          {section === 'faq' && <CollectionEditor items={content.faq.map((f, i) => ({ id: `faq-${i}`, ...f }))} title={(f) => f.q.pt} onSave={(v) => save('faq', v.map(({ q, a }) => ({ q, a })))} />}
          {section === 'jobs' && (
            content.jobs.length
              ? <CollectionEditor items={content.jobs} title={(j) => j.title.pt} onSave={(v) => save('jobs', v)} />
              : <div className="bg-white p-6 text-sm">
                  <p>Não existem vagas.</p>
                  <button type="button" className={`${btn} mt-4 border-forest text-forest`} onClick={() => save('jobs', [{ id: `vaga-${Date.now().toString(36)}`, title: { pt: 'Nova vaga', en: 'New position' }, area: { pt: '', en: '' }, location: { pt: '', en: '' }, type: { pt: '', en: '' }, open: false }])}>+ Criar vaga (fechada)</button>
                </div>
          )}
          {section === 'contact' && <ObjectEditor value={content.contact} onSave={(v) => save('contact', v)} />}
          {section === 'pages' && (
            <div>
              <label className="mb-4 block max-w-sm text-sm">Página
                <select value={page} onChange={(e) => setPage(e.target.value as PageKey)} className="mt-1 w-full border px-3 py-2">
                  {(Object.keys(initialPages) as PageKey[]).map((k) => <option key={k} value={k}>{routes[k].title.pt}</option>)}
                </select>
              </label>
              <ObjectEditor key={page} value={content.pages[page]} onSave={(v) => save('pages', { ...content.pages, [page]: v })} />
            </div>
          )}
          {section === 'menus' && (
            <div className="bg-white p-6 text-sm">
              <p className="mb-4 border-l-2 border-gold pl-3 text-charcoal-500">A estrutura de menus está definida em <code>src/content/site.ts</code> (constante <code>nav</code>) e ligada às rotas. A edição dinâmica de menus fica disponível quando a API expuser o recurso <code>/content/nav</code>.</p>
              <ul className="space-y-4">{nav.map((g) => <li key={g.to}><strong>{g.label.pt}</strong> / {g.label.en}<ul className="ml-5 mt-1 list-disc text-charcoal-500">{g.children?.map((c) => <li key={c.to}>{c.label.pt} → <code>{c.to}</code></li>)}</ul></li>)}</ul>
            </div>
          )}
          {section === 'media' && (
            <div>
              <p className="mb-4 max-w-3xl text-sm text-charcoal-500">Biblioteca de fotografias optimizadas (AVIF/WebP). Para adicionar imagens: colocar o original em <code>assets-src/images/</code>, registar créditos em <code>scripts/image-sources.json</code> e executar <code>npm run images</code>. O carregamento via browser requer o endpoint <code>/uploads/presign</code> do backend.</p>
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Object.entries(images).map(([id, m]) => (
                  <li key={id} className="bg-white">
                    <Picture id={id} alt="" sizes="300px" className="block aspect-[4/3] overflow-hidden" imgClassName="h-full w-full object-cover" />
                    <div className="p-3 text-xs"><p className="font-semibold">{id}</p><p className="text-charcoal-500">{m.width}×{m.height} · {m.license}</p><p className="text-charcoal-500">{m.author}</p></div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {section === 'export' && (
            <div className="max-w-2xl space-y-4 bg-white p-6 text-sm">
              <p>Descarregue o conteúdo actual (incluindo alterações desta sessão) em JSON, para revisão ou importação no backend.</p>
              <div className="flex gap-3">
                <button type="button" onClick={exportJson} className={`${btn} border-forest bg-forest text-ivory`}>Descarregar JSON</button>
                <button type="button" onClick={() => { if (confirm('Repor todo o conteúdo inicial?')) reset() }} className={`${btn} border-charcoal/20`}>Repor conteúdo inicial</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
