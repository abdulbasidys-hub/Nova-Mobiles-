'use client'
import { useState, useEffect } from 'react'
import { getAllPhones, addPhone, updatePhone, deletePhone } from '../lib/phones'
import { formatPrice } from '../lib/constants'

/* ─── Password ─────────────────────────────────── */
const ADMIN_PASSWORD = 'nova2024admin'

/* ─── Default catalog — editable in Manage tab ─── */
const DEFAULT_CATALOG = {
  'Google Pixel': [
    'Pixel 6a','Pixel 7','Pixel 7a','Pixel 7 Pro',
    'Pixel 8','Pixel 8a','Pixel 8 Pro',
    'Pixel 9','Pixel 9 Pro','Pixel 9 Pro XL','Pixel 9 Pro Fold',
  ],
  'iPhone': [
    'iPhone 11','iPhone 11 Pro','iPhone 11 Pro Max',
    'iPhone 12','iPhone 12 Mini','iPhone 12 Pro','iPhone 12 Pro Max',
    'iPhone 13','iPhone 13 Mini','iPhone 13 Pro','iPhone 13 Pro Max',
    'iPhone 14','iPhone 14 Plus','iPhone 14 Pro','iPhone 14 Pro Max',
    'iPhone 15','iPhone 15 Plus','iPhone 15 Pro','iPhone 15 Pro Max',
    'iPhone 16','iPhone 16 Plus','iPhone 16 Pro','iPhone 16 Pro Max',
  ],
  'Samsung': [
    'Galaxy S21','Galaxy S21+','Galaxy S21 Ultra',
    'Galaxy S22','Galaxy S22+','Galaxy S22 Ultra',
    'Galaxy S23','Galaxy S23+','Galaxy S23 Ultra',
    'Galaxy S24','Galaxy S24+','Galaxy S24 Ultra',
    'Galaxy A54','Galaxy A55','Galaxy A35','Galaxy A25',
    'Galaxy Z Fold 5','Galaxy Z Flip 5',
  ],
  'Oppo': [
    'Reno 8','Reno 8 Pro','Reno 10','Reno 10 Pro',
    'Reno 11','Reno 11 Pro','Find X6','Find X7','Find X7 Ultra',
    'A78','A98',
  ],
}

const STORAGE_OPTIONS  = ['32GB','64GB','128GB','256GB','512GB','1TB']
const CONDITION_OPTIONS= ['Brand New','London Used','Nigerian Used']
const NETWORK_OPTIONS  = ['4G','5G','4G/5G','Dual SIM 4G','Dual SIM 5G']
const COLOR_OPTIONS    = ['Black','White','Silver','Gold','Blue','Green','Purple','Pink','Red','Yellow','Graphite','Titanium','Natural Titanium','White Titanium','Obsidian','Hazel','Coral','Charcoal','Porcelain','Sage','Sand','Mint','Sky','Lavender','Other']

/* ─── Small helpers ────────────────────────────── */
const BRAND_ICONS = { 'Google Pixel':'🟢', 'iPhone':'🍎', 'Samsung':'🔵', 'Oppo':'🟠' }
const T = ({ children, style: s }) => <span style={{ fontSize:'.65rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.09em', color:'var(--ink-3)', ...s }}>{children}</span>
const Row = ({ label, children }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:'.3rem' }}>
    <T>{label}</T>
    {children}
  </div>
)
const inp = { background:'var(--bg-2)', color:'var(--ink)', border:'1.5px solid var(--line)', borderRadius:'var(--r)', padding:'.55rem .8rem', fontSize:'.85rem', fontFamily:'var(--font-body)', outline:'none', width:'100%' }
const Sel = ({ value, onChange, options, placeholder }) => (
  <select value={value} onChange={onChange} style={{ ...inp, appearance:'none' }}>
    {placeholder && <option value="">{placeholder}</option>}
    {options.map(o => <option key={o} value={o}>{o}</option>)}
  </select>
)

function loadCatalog() {
  try { return JSON.parse(localStorage.getItem('nv-catalog')) || DEFAULT_CATALOG } catch { return DEFAULT_CATALOG }
}
function saveCatalog(c) { localStorage.setItem('nv-catalog', JSON.stringify(c)) }

/* ═══════════════════════════════════════════════
   TAB: INVENTORY
═══════════════════════════════════════════════ */
function TabInventory({ phones, onEdit, onDelete, loading }) {
  const [search, setSearch]   = useState('')
  const [brand,  setBrand]    = useState('All')
  const [cond,   setCond]     = useState('All')
  const [avail,  setAvail]    = useState('All')

  const brands = ['All', ...new Set(phones.map(p => p.brand))]
  const q = search.trim().toLowerCase()

  const filtered = phones.filter(p => {
    const s = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    const b = brand === 'All' || p.brand === brand
    const c = cond  === 'All' || p.condition === cond
    const a = avail === 'All' || (avail === 'Available' ? p.available : !p.available)
    return s && b && c && a
  })

  const BRAND_ORDER = ['Google Pixel','iPhone','Samsung','Oppo']
  const allBrands   = [...new Set(filtered.map(p => p.brand))]
  const ordered     = [...BRAND_ORDER.filter(b => allBrands.includes(b)), ...allBrands.filter(b => !BRAND_ORDER.includes(b))]
  const grouped     = {}
  ordered.forEach(b => { const l = filtered.filter(p => p.brand === b); if (l.length) grouped[b] = l })

  if (loading) return <div style={{ padding:'3rem', textAlign:'center', color:'var(--ink-4)' }}>Loading inventory…</div>

  return (
    <div>
      {/* Search + filters */}
      <div style={{ display:'flex', gap:'.65rem', flexWrap:'wrap', marginBottom:'1.5rem', padding:'1rem', background:'var(--bg-2)', borderRadius:'var(--r)', border:'1px solid var(--line)' }}>
        <div style={{ position:'relative', flex:'1 1 200px' }}>
          <span style={{ position:'absolute', left:9, top:'50%', transform:'translateY(-50%)', fontSize:13, color:'var(--ink-4)', pointerEvents:'none' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search phones…" style={{ ...inp, paddingLeft:'1.9rem' }} />
          {search && <button onClick={() => setSearch('')} style={{ position:'absolute', right:9, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--ink-4)', fontSize:15 }}>✕</button>}
        </div>
        <select value={brand} onChange={e => setBrand(e.target.value)} style={{ ...inp, flex:'0 1 160px' }}>
          {brands.map(b => <option key={b}>{b}</option>)}
        </select>
        <select value={cond} onChange={e => setCond(e.target.value)} style={{ ...inp, flex:'0 1 160px' }}>
          {['All',...CONDITION_OPTIONS].map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={avail} onChange={e => setAvail(e.target.value)} style={{ ...inp, flex:'0 1 140px' }}>
          {['All','Available','Sold'].map(a => <option key={a}>{a}</option>)}
        </select>
        <span style={{ color:'var(--ink-4)', fontSize:'.75rem', alignSelf:'center' }}>{filtered.length} phone{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign:'center', padding:'3rem', color:'var(--ink-4)' }}>No phones match your filters.</div>
      )}

      {Object.entries(grouped).map(([b, list]) => (
        <div key={b} style={{ marginBottom:'2.5rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'.65rem', marginBottom:'1rem', paddingBottom:'.5rem', borderBottom:'2px solid var(--line)' }}>
            <span>{BRAND_ICONS[b] || '📱'}</span>
            <h3 style={{ fontFamily:'var(--font-head)', fontWeight:800, fontSize:'1rem' }}>{b}</h3>
            <span style={{ fontSize:'.7rem', color:'var(--ink-4)', fontWeight:600 }}>{list.length} phone{list.length!==1?'s':''}</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'.4rem' }}>
            {list.map(p => (
              <div key={p.id} style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'.65rem .85rem', background:'var(--bg-2)', border:'1px solid var(--line)', borderRadius:'var(--r)', flexWrap:'wrap' }}>
                <div style={{ width:40, height:40, background:'var(--bg-3)', borderRadius:5, overflow:'hidden', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {p.images?.[0] ? <img src={p.images[0]} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <span style={{ fontSize:18, opacity:.3 }}>📱</span>}
                </div>
                <div style={{ flex:1, minWidth:120 }}>
                  <p style={{ fontFamily:'var(--font-head)', fontWeight:700, fontSize:'.875rem' }}>{p.name}</p>
                  <p style={{ fontSize:'.72rem', color:'var(--ink-3)' }}>{p.storage} · {p.color} · {p.condition}</p>
                </div>
                <span style={{ fontFamily:'var(--font-head)', fontWeight:800, fontSize:'1rem', color:'var(--blue)' }}>{formatPrice(p.price)}</span>
                <span style={{ fontSize:'.65rem', fontWeight:700, padding:'.2rem .5rem', borderRadius:3, background: p.available ? 'var(--st-avail-bg)' : 'var(--st-sold-bg)', color: p.available ? 'var(--st-avail-ink)' : 'var(--st-sold-ink)' }}>
                  {p.available ? 'Available' : 'Sold'}
                </span>
                <div style={{ display:'flex', gap:'.4rem' }}>
                  <button onClick={() => onEdit(p)} className="btn btn-outline-blue btn-xs">Edit</button>
                  <button onClick={() => onDelete(p.id)} className="btn btn-xs" style={{ background:'rgba(220,38,38,.12)', color:'#f87171', border:'none' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   TAB: EDIT PRICES
═══════════════════════════════════════════════ */
function TabPrices({ phones, onSavePrice }) {
  const [prices, setPrices] = useState({})
  const [saving, setSaving] = useState({})
  const [done,   setDone]   = useState({})

  useEffect(() => {
    const init = {}
    phones.forEach(p => { init[p.id] = p.price })
    setPrices(init)
  }, [phones])

  const save = async (phone) => {
    const newPrice = Number(prices[phone.id])
    if (!newPrice || newPrice === phone.price) return
    setSaving(s => ({ ...s, [phone.id]: true }))
    await onSavePrice(phone.id, newPrice)
    setSaving(s => ({ ...s, [phone.id]: false }))
    setDone(d => ({ ...d, [phone.id]: true }))
    setTimeout(() => setDone(d => ({ ...d, [phone.id]: false })), 2000)
  }

  const BRAND_ORDER = ['Google Pixel','iPhone','Samsung','Oppo']
  const allBrands   = [...new Set(phones.map(p => p.brand))]
  const ordered     = [...BRAND_ORDER.filter(b => allBrands.includes(b)), ...allBrands.filter(b => !BRAND_ORDER.includes(b))]

  return (
    <div>
      <p style={{ color:'var(--ink-3)', fontSize:'.82rem', marginBottom:'1.5rem', padding:'1rem', background:'var(--blue-tint)', border:'1.5px solid var(--blue-ring)', borderRadius:'var(--r)' }}>
        Change prices below. Press <strong>Save</strong> on each row to apply. Changes are saved to the database immediately.
      </p>

      {ordered.map(brand => {
        const list = phones.filter(p => p.brand === brand)
        if (!list.length) return null
        return (
          <div key={brand} style={{ marginBottom:'2.5rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'.65rem', marginBottom:'1rem', paddingBottom:'.5rem', borderBottom:'2px solid var(--line)' }}>
              <span>{BRAND_ICONS[brand] || '📱'}</span>
              <h3 style={{ fontFamily:'var(--font-head)', fontWeight:800, fontSize:'1rem' }}>{brand}</h3>
            </div>
            {list.map(p => (
              <div key={p.id} style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'.6rem .85rem', background:'var(--bg-2)', border:'1px solid var(--line)', borderRadius:'var(--r)', marginBottom:'.4rem', flexWrap:'wrap' }}>
                <p style={{ flex:1, minWidth:140, fontFamily:'var(--font-head)', fontWeight:700, fontSize:'.875rem' }}>
                  {p.name}
                  <span style={{ fontWeight:400, color:'var(--ink-3)', fontSize:'.75rem', marginLeft:'.5rem' }}>{p.storage} · {p.condition}</span>
                </p>
                <div style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
                  <span style={{ fontSize:'.8rem', color:'var(--ink-3)', flexShrink:0 }}>₦</span>
                  <input
                    type="number"
                    value={prices[p.id] || ''}
                    onChange={e => setPrices(prev => ({ ...prev, [p.id]: e.target.value }))}
                    style={{ ...inp, width:140, textAlign:'right' }}
                  />
                  <button onClick={() => save(p)} disabled={saving[p.id]}
                    className="btn btn-blue btn-xs" style={{ minWidth:52 }}>
                    {saving[p.id] ? '…' : done[p.id] ? '✓' : 'Save'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   TAB: ADD / EDIT PHONE
═══════════════════════════════════════════════ */
const emptyForm = {
  brand:'', name:'', condition:'Brand New', storage:'128GB', color:'Black',
  network:'4G', price:'', images:'', featured:false, available:true, slug:'',
  specs:{ display:'', processor:'', camera:'', battery:'', ram:'' }
}

function TabAddEdit({ catalog, editPhone, onSave, onCancel }) {
  const [form, setForm] = useState(editPhone ? {
    ...emptyForm, ...editPhone,
    images: (editPhone.images||[]).join(', '),
    specs: { display:'', processor:'', camera:'', battery:'', ram:'', ...(editPhone.specs||{}) }
  } : emptyForm)

  const brands  = Object.keys(catalog)
  const models  = form.brand ? (catalog[form.brand] || []) : []

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setSpec = (k, v) => setForm(f => ({ ...f, specs: { ...f.specs, [k]: v } }))

  const handleSave = () => {
    if (!form.brand || !form.name || !form.price) return alert('Brand, model, and price are required.')
    const slug = form.slug || (form.brand + '-' + form.name).toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
    onSave({ ...form, slug, price: Number(form.price), images: form.images ? form.images.split(',').map(s => s.trim()).filter(Boolean) : [] })
  }

  return (
    <div style={{ maxWidth:700 }}>
      <h3 style={{ fontFamily:'var(--font-head)', fontWeight:800, fontSize:'1.1rem', marginBottom:'1.5rem' }}>
        {editPhone ? `Editing: ${editPhone.name}` : 'Add New Phone'}
      </h3>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem' }}>
        {/* Brand — dropdown */}
        <Row label="Brand *">
          <Sel value={form.brand} onChange={e => { set('brand', e.target.value); set('name','') }} options={brands} placeholder="Select brand…" />
        </Row>

        {/* Model — dropdown populated from brand */}
        <Row label="Model *">
          <Sel value={form.name} onChange={e => set('name', e.target.value)} options={models} placeholder={form.brand ? 'Select model…' : 'Select brand first'} />
        </Row>

        {/* Condition — dropdown */}
        <Row label="Condition">
          <Sel value={form.condition} onChange={e => set('condition', e.target.value)} options={CONDITION_OPTIONS} />
        </Row>

        {/* Storage — dropdown */}
        <Row label="Storage">
          <Sel value={form.storage} onChange={e => set('storage', e.target.value)} options={STORAGE_OPTIONS} />
        </Row>

        {/* Color — dropdown */}
        <Row label="Color">
          <Sel value={form.color} onChange={e => set('color', e.target.value)} options={COLOR_OPTIONS} />
        </Row>

        {/* Network — dropdown */}
        <Row label="Network">
          <Sel value={form.network} onChange={e => set('network', e.target.value)} options={NETWORK_OPTIONS} />
        </Row>

        {/* Price — free text */}
        <Row label="Price (₦) *">
          <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="e.g. 580000" style={inp} />
        </Row>

        {/* Slug — optional */}
        <Row label="Slug (leave blank to auto-generate)">
          <input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="e.g. pixel-8-pro-256gb" style={inp} />
        </Row>
      </div>

      {/* Image URLs */}
      <Row label="Image URLs — comma separated">
        <input value={form.images} onChange={e => set('images', e.target.value)} placeholder="https://… , https://…" style={{ ...inp, marginBottom:'1rem' }} />
      </Row>

      {/* Specs */}
      <div style={{ marginBottom:'1rem' }}>
        <T style={{ display:'block', marginBottom:'.65rem' }}>Specifications</T>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'.65rem' }}>
          {[['display','Display'],['processor','Processor'],['camera','Camera'],['battery','Battery'],['ram','RAM']].map(([k,l]) => (
            <Row key={k} label={l}>
              <input value={form.specs[k]||''} onChange={e => setSpec(k, e.target.value)} placeholder={l} style={inp} />
            </Row>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div style={{ display:'flex', gap:'1.5rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
        {[['featured','⭐ Featured'],['available','✅ Available']].map(([k,l]) => (
          <label key={k} style={{ display:'flex', alignItems:'center', gap:'.4rem', cursor:'pointer', fontSize:'.85rem', color:'var(--ink-2)', fontWeight:500 }}>
            <input type="checkbox" checked={form[k]} onChange={e => set(k, e.target.checked)} style={{ accentColor:'var(--blue)', width:'auto' }} />
            {l}
          </label>
        ))}
      </div>

      <div style={{ display:'flex', gap:'.65rem' }}>
        <button onClick={handleSave} className="btn btn-blue">✓ {editPhone ? 'Update Phone' : 'Add Phone'}</button>
        <button onClick={onCancel} className="btn btn-ghost">Cancel</button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   TAB: MANAGE CATALOG
═══════════════════════════════════════════════ */
function TabCatalog() {
  const [catalog, setCatalog]   = useState(loadCatalog)
  const [selBrand, setSelBrand] = useState(Object.keys(loadCatalog())[0])
  const [newBrand, setNewBrand] = useState('')
  const [newModel, setNewModel] = useState('')
  const [saved,    setSaved]    = useState(false)

  const save = (updated) => {
    setCatalog(updated)
    saveCatalog(updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  const addBrand = () => {
    const b = newBrand.trim()
    if (!b || catalog[b]) return
    const updated = { ...catalog, [b]: [] }
    save(updated)
    setSelBrand(b)
    setNewBrand('')
  }

  const removeBrand = (b) => {
    if (!confirm(`Remove brand "${b}" and all its models?`)) return
    const { [b]: _, ...rest } = catalog
    save(rest)
    setSelBrand(Object.keys(rest)[0] || '')
  }

  const addModel = () => {
    const m = newModel.trim()
    if (!m || (catalog[selBrand]||[]).includes(m)) return
    save({ ...catalog, [selBrand]: [...(catalog[selBrand]||[]), m] })
    setNewModel('')
  }

  const removeModel = (m) => {
    save({ ...catalog, [selBrand]: catalog[selBrand].filter(x => x !== m) })
  }

  const moveModel = (m, dir) => {
    const list  = [...catalog[selBrand]]
    const idx   = list.indexOf(m)
    const newIdx= idx + dir
    if (newIdx < 0 || newIdx >= list.length) return
    ;[list[idx], list[newIdx]] = [list[newIdx], list[idx]]
    save({ ...catalog, [selBrand]: list })
  }

  const brands = Object.keys(catalog)

  return (
    <div>
      <p style={{ color:'var(--ink-3)', fontSize:'.82rem', marginBottom:'1.5rem', padding:'1rem', background:'var(--blue-tint)', border:'1.5px solid var(--blue-ring)', borderRadius:'var(--r)' }}>
        Manage the brands and phone models that appear in the Add Phone dropdowns. Changes save instantly to your browser.
        {saved && <span style={{ marginLeft:'.75rem', color:'var(--blue)', fontWeight:700 }}>✓ Saved</span>}
      </p>

      <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:'2rem', alignItems:'start' }} className="cat-g">

        {/* Brand list */}
        <div>
          <T style={{ display:'block', marginBottom:'.65rem' }}>Brands</T>
          <div style={{ border:'1px solid var(--line)', borderRadius:'var(--r)', overflow:'hidden', marginBottom:'.65rem' }}>
            {brands.map((b, i) => (
              <div key={b} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'.55rem .75rem', background: b === selBrand ? 'var(--blue-tint)' : i % 2 === 0 ? 'var(--bg)' : 'var(--bg-2)', borderBottom:'1px solid var(--line)', cursor:'pointer' }}
                onClick={() => setSelBrand(b)}>
                <span style={{ fontSize:'.85rem', fontWeight: b === selBrand ? 700 : 400, color: b === selBrand ? 'var(--blue)' : 'var(--ink)' }}>{BRAND_ICONS[b] || '📱'} {b}</span>
                <button onClick={e => { e.stopPropagation(); removeBrand(b) }} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--ink-4)', fontSize:13 }}>✕</button>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:'.4rem' }}>
            <input value={newBrand} onChange={e => setNewBrand(e.target.value)} placeholder="New brand…" style={{ ...inp, flex:1 }} onKeyDown={e => e.key === 'Enter' && addBrand()} />
            <button onClick={addBrand} className="btn btn-blue btn-xs">Add</button>
          </div>
        </div>

        {/* Models for selected brand */}
        <div>
          {selBrand && (
            <>
              <T style={{ display:'block', marginBottom:'.65rem' }}>Models — {selBrand}</T>
              <div style={{ border:'1px solid var(--line)', borderRadius:'var(--r)', overflow:'hidden', marginBottom:'.65rem', maxHeight:400, overflowY:'auto' }}>
                {(catalog[selBrand]||[]).length === 0 && (
                  <div style={{ padding:'1rem', textAlign:'center', color:'var(--ink-4)', fontSize:'.82rem' }}>No models yet. Add one below.</div>
                )}
                {(catalog[selBrand]||[]).map((m, i, arr) => (
                  <div key={m} style={{ display:'flex', alignItems:'center', gap:'.5rem', padding:'.5rem .75rem', background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-2)', borderBottom: i < arr.length-1 ? '1px solid var(--line)' : 'none' }}>
                    <span style={{ flex:1, fontSize:'.85rem' }}>{m}</span>
                    <button onClick={() => moveModel(m,-1)} disabled={i===0} style={{ background:'none', border:'none', cursor:i===0?'default':'pointer', color:'var(--ink-4)', fontSize:13, opacity:i===0?.3:1 }}>↑</button>
                    <button onClick={() => moveModel(m,1)} disabled={i===arr.length-1} style={{ background:'none', border:'none', cursor:i===arr.length-1?'default':'pointer', color:'var(--ink-4)', fontSize:13, opacity:i===arr.length-1?.3:1 }}>↓</button>
                    <button onClick={() => removeModel(m)} style={{ background:'none', border:'none', cursor:'pointer', color:'#f87171', fontSize:13 }}>✕</button>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', gap:'.4rem' }}>
                <input value={newModel} onChange={e => setNewModel(e.target.value)} placeholder={`New ${selBrand} model…`} style={{ ...inp, flex:1 }} onKeyDown={e => e.key === 'Enter' && addModel()} />
                <button onClick={addModel} className="btn btn-blue btn-xs">Add</button>
              </div>
            </>
          )}
        </div>
      </div>
      <style>{`@media(max-width:600px){.cat-g{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   MAIN ADMIN PAGE
═══════════════════════════════════════════════ */
export default function Admin() {
  const [authed,  setAuthed]  = useState(false)
  const [pw,      setPw]      = useState('')
  const [phones,  setPhones]  = useState([])
  const [loading, setLoading] = useState(true)
  const [tab,     setTab]     = useState('inventory')  // inventory | add | prices | catalog
  const [editing, setEditing] = useState(null)
  const [catalog, setCatalog] = useState(loadCatalog)

  const load = () => {
    setLoading(true)
    getAllPhones().then(d => { setPhones(d); setLoading(false) })
  }

  useEffect(() => { if (authed) load() }, [authed])

  const handleSave = async (data) => {
    if (editing) {
      await updatePhone(editing.id, data)
    } else {
      await addPhone(data)
    }
    setEditing(null)
    setTab('inventory')
    load()
  }

  const handleEdit = (phone) => {
    setEditing(phone)
    setTab('add')
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this phone?')) return
    await deletePhone(id)
    load()
  }

  const handleSavePrice = async (id, newPrice) => {
    await updatePhone(id, { price: newPrice })
    setPhones(prev => prev.map(p => p.id === id ? { ...p, price: newPrice } : p))
  }

  /* ── Login screen ── */
  if (!authed) return (
    <div className="pt" style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:'100%', maxWidth:360, padding:'2.5rem', border:'1px solid var(--line)', borderRadius:8, background:'var(--bg-2)' }}>
        <h1 style={{ fontFamily:'var(--font-head)', fontWeight:900, fontSize:'1.5rem', marginBottom:'1.5rem', textAlign:'center' }}>Admin Login</h1>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)}
          placeholder="Password" style={{ ...inp, marginBottom:'1rem' }}
          onKeyDown={e => e.key === 'Enter' && (pw === ADMIN_PASSWORD ? setAuthed(true) : alert('Wrong password'))} />
        <button onClick={() => pw === ADMIN_PASSWORD ? setAuthed(true) : alert('Wrong password')} className="btn btn-blue btn-w btn-lg">
          Login
        </button>
      </div>
    </div>
  )

  const TABS = [
    { id:'inventory', label:`📦 Inventory (${phones.filter(p=>p.available).length} available)` },
    { id:'add',       label: editing ? '✏️ Edit Phone' : '➕ Add Phone' },
    { id:'prices',    label:'💰 Edit Prices' },
    { id:'catalog',   label:'📋 Manage Catalog' },
  ]

  return (
    <div className="pt" style={{ paddingBottom:'5rem' }}>
      <div className="W" style={{ paddingTop:'2rem' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <div className="sec-tag">Admin</div>
            <h1 style={{ fontFamily:'var(--font-head)', fontWeight:900, fontSize:'clamp(1.8rem,4vw,2.5rem)', letterSpacing:'-.02em' }}>NOVA MOBILES PLUS</h1>
          </div>
          <button onClick={() => setAuthed(false)} className="btn btn-ghost btn-sm">Logout</button>
        </div>

        {/* Tab bar */}
        <div style={{ display:'flex', gap:'.35rem', marginBottom:'2rem', borderBottom:'1px solid var(--line)', paddingBottom:'.1rem', overflowX:'auto' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); if (t.id !== 'add') setEditing(null) }}
              style={{ padding:'.55rem 1rem', borderRadius:'var(--r) var(--r) 0 0', border:'1px solid var(--line)', borderBottom: tab === t.id ? '2px solid var(--blue)' : '1px solid var(--line)', background: tab === t.id ? 'var(--blue-tint)' : 'var(--bg-2)', color: tab === t.id ? 'var(--blue)' : 'var(--ink-3)', fontWeight: tab === t.id ? 700 : 500, fontFamily:'var(--font-body)', fontSize:'.82rem', cursor:'pointer', whiteSpace:'nowrap', transition:'all .12s' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'inventory' && <TabInventory phones={phones} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />}
        {tab === 'add'       && <TabAddEdit   catalog={catalog} editPhone={editing} onSave={handleSave} onCancel={() => { setEditing(null); setTab('inventory') }} />}
        {tab === 'prices'    && <TabPrices    phones={phones} onSavePrice={handleSavePrice} />}
        {tab === 'catalog'   && <TabCatalog />}
      </div>
    </div>
  )
}