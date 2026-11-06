import { imageIds } from '../content/images'
import { Picture } from '../components/ui/Picture'

type Json = unknown

const isL = (v: Json): v is { pt: string; en: string } =>
  !!v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v as object).length === 2 && 'pt' in (v as object) && 'en' in (v as object)

const labels: Record<string, string> = {
  title: 'Título', subtitle: 'Subtítulo', eyebrow: 'Antetítulo', intro: 'Introdução', text: 'Texto', body: 'Corpo', summary: 'Resumo',
  details: 'Detalhes', image: 'Imagem', heroImage: 'Imagem de destaque', status: 'Estado de verificação', category: 'Categoria',
  caption: 'Legenda', date: 'Data (AAAA-MM-DD)', slug: 'Endereço (slug)', excerpt: 'Excerto', published: 'Publicado', sample: 'Conteúdo exemplificativo',
  label: 'Rótulo', to: 'Ligação', cta: 'Botão', items: 'Itens', blocks: 'Blocos', value: 'Valor', description: 'Descrição', url: 'URL do ficheiro',
  q: 'Pergunta', a: 'Resposta', phones: 'Telefones', emails: 'E-mails', address: 'Morada', hours: 'Horário', mapEmbedUrl: 'URL do mapa (incorporação)',
  social: 'Redes sociais', open: 'Vaga aberta', area: 'Área', location: 'Local', type: 'Tipo', span: 'Formato no mosaico', reverse: 'Inverter',
  attribution: 'Atribuição', tone: 'Tom', id: 'Identificador',
}

const inputCls = 'mt-1 w-full border border-charcoal/15 bg-white px-3 py-2 text-sm text-charcoal focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest'

function Label({ name }: { name: string }) {
  return <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-charcoal-500">{labels[name] ?? name}</span>
}

/** Editor recursivo genérico: suporta textos PT/EN, imagens, estados, listas e objectos. */
export function FieldEditor({ name, value, onChange, depth = 0 }: { name: string; value: Json; onChange: (v: Json) => void; depth?: number }) {
  if (isL(value)) {
    const long = (value.pt?.length ?? 0) > 70 || ['body', 'text', 'summary', 'excerpt', 'intro', 'a', 'description'].includes(name)
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {(['pt', 'en'] as const).map((l) => (
          <label key={l} className="block">
            <Label name={name} /> <span className="text-[0.6rem] font-bold text-gold-deep">{l.toUpperCase()}</span>
            {long ? (
              <textarea rows={3} className={inputCls} value={value[l]} onChange={(e) => onChange({ ...value, [l]: e.target.value })} />
            ) : (
              <input className={inputCls} value={value[l]} onChange={(e) => onChange({ ...value, [l]: e.target.value })} />
            )}
          </label>
        ))}
      </div>
    )
  }
  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="accent-forest" /><Label name={name} /></label>
    )
  }
  if (typeof value === 'number') {
    return <label className="block"><Label name={name} /><input type="number" className={inputCls} value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>
  }
  if (typeof value === 'string') {
    if (name === 'image' || name === 'heroImage') {
      return (
        <div>
          <Label name={name} />
          <div className="mt-1 flex items-center gap-3">
            <Picture id={value} alt="" sizes="80px" className="block h-14 w-20 shrink-0 overflow-hidden bg-ivory-200" imgClassName="h-full w-full object-cover" />
            <select className={inputCls} value={value} onChange={(e) => onChange(e.target.value)}>
              {imageIds.map((id) => <option key={id} value={id}>{id}</option>)}
            </select>
          </div>
        </div>
      )
    }
    if (name === 'status') {
      return (
        <label className="block"><Label name={name} />
          <select className={inputCls} value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="a-confirmar">A confirmar (não publicado como facto)</option>
            <option value="confirmado">Confirmado oficialmente</option>
          </select>
        </label>
      )
    }
    if (name === 'type' && ['lead', 'split', 'pillars', 'quote', 'banner', 'list', 'notice', 'cta'].includes(value)) {
      return <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">Bloco: {value}</p>
    }
    return <label className="block"><Label name={name} /><input className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} /></label>
  }
  if (Array.isArray(value)) {
    const template = value[0]
    return (
      <fieldset className="border-l-2 border-gold/40 pl-4">
        <legend className="mb-2"><Label name={name} /> <span className="text-xs text-charcoal-400">({value.length})</span></legend>
        <ol className="space-y-4">
          {value.map((item, i) => (
            <li key={i} className="bg-ivory/60 p-3">
              <div className="mb-2 flex items-center justify-between text-xs text-charcoal-500">
                <span>#{i + 1}</span>
                <span className="flex gap-2">
                  <button type="button" disabled={i === 0} onClick={() => { const c = [...value]; [c[i - 1], c[i]] = [c[i], c[i - 1]]; onChange(c) }} className="px-2 disabled:opacity-30">↑</button>
                  <button type="button" disabled={i === value.length - 1} onClick={() => { const c = [...value]; [c[i + 1], c[i]] = [c[i], c[i + 1]]; onChange(c) }} className="px-2 disabled:opacity-30">↓</button>
                  <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="px-2 text-red-600">Remover</button>
                </span>
              </div>
              <FieldEditor name={name} value={item} depth={depth + 1} onChange={(v) => { const c = [...value]; c[i] = v; onChange(c) }} />
            </li>
          ))}
        </ol>
        {template !== undefined && (
          <button type="button" onClick={() => onChange([...value, blank(template)])} className="mt-3 border border-forest/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-forest hover:bg-forest hover:text-ivory">+ Adicionar</button>
        )}
      </fieldset>
    )
  }
  if (value && typeof value === 'object') {
    const obj = value as Record<string, Json>
    return (
      <div className={depth > 0 ? 'space-y-4' : 'space-y-6'}>
        {Object.entries(obj).map(([k, v]) => (
          <div key={k}><FieldEditor name={k} value={v} depth={depth + 1} onChange={(nv) => onChange({ ...obj, [k]: nv })} /></div>
        ))}
      </div>
    )
  }
  return null
}

/** Cria um item vazio com a mesma estrutura do modelo. */
export function blank(template: Json): Json {
  if (isL(template)) return { pt: '', en: '' }
  if (typeof template === 'string') return ''
  if (typeof template === 'number') return 0
  if (typeof template === 'boolean') return false
  if (Array.isArray(template)) return template.length ? [blank(template[0])] : []
  if (template && typeof template === 'object') {
    const out: Record<string, Json> = {}
    for (const [k, v] of Object.entries(template)) {
      if (k === 'id') out[k] = `novo-${Date.now().toString(36)}`
      else if (k === 'image' || k === 'heroImage' || k === 'type' || k === 'status' || k === 'span' || k === 'tone') out[k] = v
      else out[k] = blank(v)
    }
    if ('status' in out) out.status = 'a-confirmar'
    if ('published' in out) out.published = false
    return out
  }
  return template
}
