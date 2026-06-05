import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { getAllPhones, addPhone, updatePhone, deletePhone } from '../lib/phones'
import { formatPrice } from '../lib/constants'

const DOMAIN = '@novamobilesplus.com'

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
    'Reno 11','Reno 11 Pro','Find X6','Find X7','Find X7 Ultra','A78','A98',
  ],
}

const STORAGE_OPTIONS   = ['64GB','128GB','256GB','512GB','1TB']
const CONDITION_OPTIONS = ['Brand New','London Used','Nigerian Used']
const NETWORK_OPTIONS   = ['4G','5G','4G/5G','Dual SIM 4G','Dual SIM 5G']
const COLOR_OPTIONS     = ['Black','White','Silver','Gold','Blue','Green','Purple','Pink','Red','Yellow','Graphite','Titanium','Natural Titanium','White Titanium','Obsidian','Hazel','Coral','Charcoal','Porcelain','Sage','Sand','Mint','Sky','Lavender','Other']
const BRAND_ICONS       = { 'Google Pixel':'🟢','iPhone':'🍎','Samsung':'🔵','Oppo':'🟠' }
const BRAND_ORDER       = ['Google Pixel','iPhone','Samsung','Oppo']

function loadCatalog() {
  try { return JSON.parse(localStorage.getItem('nv-catalog')) || DEFAULT_CATALOG } catch { return DEFAULT_CATALOG }
}
function saveCatalog(c) { localStorage.setItem('nv-catalog', JSON.stringify(c)) }

const inp = {
  background:'#F2F4F6', color:'#191C1E',
  border:'1.5px solid #C1C6D6', borderRadius:8,
  padding:'.55rem .8rem', fontSize:'.85rem',
  fontFamily:'inherit', outline:'none', width:'100%',
}
const Sel = ({ value, onChange, options, placeholder }) => (
  <select value={value} onChange={onChange} style={{ ...inp, appearance:'none' }}>
    {placeholder && <option value="">{placeholder}</option>}
    {options.map(o => <option key={o} value={o}>{o}</option>)}
  </select>
)
const Label = ({ children }) => (
  <p style={{ fontSize:'.65rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.09em', color:'#414754', marginBottom:'.3rem' }}>{children}</p>
)
const Row = ({ label, children }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:'.28rem' }}>
    <Label>{label}</Label>
    {children}
  </div>
)

/* ═══════════════════════════════════════════════
   LOGIN SCREEN
═══════════════════════════════════════════════ */
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      setError('Enter your username and password')
      return
    }
    setLoading(true)
    setError('')
    const email = `${username.trim().toLowerCase()}${DOMAIN}`
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // onAuthStateChanged in parent will pick this up
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Wrong username or password')
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Try again in a few minutes.')
      } else {
        setError('Login failed. Check your internet connection.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#F7F9FB' }}>
      <div style={{ width:'100%', maxWidth:380, padding:'2.5rem', background:'#fff', borderRadius:20, border:'1px solid #C1C6D6', boxShadow:'0 4px 24px rgba(0,0,0,.08)' }}>

        {/* Logo / Brand */}
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ width:52, height:52, background:'#005BBF', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto .85rem', fontSize:24 }}>📱</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.25rem', color:'#191C1E' }}>Nova Mobiles Plus</h1>
          <p style={{ fontSize:'.8rem', color:'#727785', marginTop:'.25rem' }}>Admin Panel</p>
        </div>

        {/* Username field */}
        <div style={{ marginBottom:'.75rem' }}>
          <Label>Username</Label>
          <input
            value={username}
            onChange={e => { setUsername(e.target.value); setError('') }}
            placeholder="admin"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            style={inp}
            onKeyDown={e => e.key === 'Enter' && document.getElementById('adm-pw').focus()}
          />
        </div>

        {/* Password field */}
        <div style={{ marginBottom:'1.25rem' }}>
          <Label>Password</Label>
          <input
            id="adm-pw"
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError('') }}
            placeholder="••••••••"
            style={inp}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{ background:'#FCE8E6', color:'#C5221F', padding:'.6rem .85rem', borderRadius:8, fontSize:'.82rem', fontWeight:600, marginBottom:'1rem' }}>
            {error}
          </div>
        )}

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width:'100%', background: loading?'#ADC7FF':'#005BBF', color:'#fff', border:'none', borderRadius:10, padding:'.75rem', fontFamily:'inherit', fontWeight:700, fontSize:'.95rem', cursor: loading?'default':'pointer', transition:'background .2s' }}>
          {loading ? '⏳ Signing in…' : 'Sign In'}
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   INVENTORY TAB
═══════════════════════════════════════════════ */
function TabInventory({ phones, setPhones, onEdit }) {
  const [search,   setSearch]   = useState('')
  const [brand,    setBrand]    = useState('All')
  const [cond,     setCond]     = useState('All')
  const [avail,    setAvail]    = useState('All')
  const [deleting, setDeleting] = useState({})
  const [toast,    setToast]    = useState(null)

  const showToast = (msg, type='success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleDelete = async (phone) => {
    if (!confirm(`Delete "${phone.name}"?`)) return
    setPhones(prev => prev.filter(p => p.id !== phone.id))
    setDeleting(d => ({ ...d, [phone.id]:true }))
    try {
      await deletePhone(phone.id)
      showToast(`${phone.name} deleted`)
    } catch {
      setPhones(prev => [...prev, phone])
      showToast('Delete failed — check Firestore rules', 'error')
    } finally {
      setDeleting(d => { const n={...d}; delete n[phone.id]; return n })
    }
  }

  const handleDeleteAll = async () => {
    if (!confirm(`Delete ALL ${phones.length} phones? This cannot be undone.`)) return
    const backup = [...phones]
    setPhones([])
    let failed = 0
    await Promise.all(backup.map(p => deletePhone(p.id).catch(() => failed++)))
    if (failed > 0) {
      setPhones(backup)
      showToast(`${failed} deletions failed — check Firestore rules`, 'error')
    } else {
      showToast('All phones deleted')
    }
  }

  const brands   = ['All', ...new Set(phones.map(p => p.brand))]
  const q        = search.trim().toLowerCase()
  const filtered = phones.filter(p => {
    const s = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    const b = brand==='All' || p.brand===brand
    const c = cond ==='All' || p.condition===cond
    const a = avail==='All' || (avail==='Available' ? p.available : !p.available)
    return s && b && c && a
  })
  const allB    = [...new Set(filtered.map(p=>p.brand))]
  const ordered = [...BRAND_ORDER.filter(b=>allB.includes(b)), ...allB.filter(b=>!BRAND_ORDER.includes(b))]
  const grouped = {}
  ordered.forEach(b => { const l=filtered.filter(p=>p.brand===b); if(l.length) grouped[b]=l })

  return (
    <div>
      {toast && (
        <div style={{ position:'fixed', bottom:24, right:24, zIndex:999, padding:'.75rem 1.25rem', borderRadius:10, background:toast.type==='error'?'#FFDAD6':'#E6F4EA', color:toast.type==='error'?'#C5221F':'#137333', fontWeight:600, fontSize:'.85rem', boxShadow:'0 4px 16px rgba(0,0,0,.12)', animation:'fadeUp .3s ease' }}>
          {toast.msg}
        </div>
      )}

      {/* Filters */}
      <div style={{ display:'flex', gap:'.65rem', flexWrap:'wrap', marginBottom:'1.25rem', padding:'1rem', background:'#F2F4F6', borderRadius:12, border:'1px solid #C1C6D6' }}>
        <div style={{ position:'relative', flex:'1 1 180px' }}>
          <span style={{ position:'absolute', left:9, top:'50%', transform:'translateY(-50%)', fontSize:13, color:'#727785', pointerEvents:'none' }}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search phones…" style={{ ...inp, paddingLeft:'1.8rem' }} />
          {search && <button onClick={()=>setSearch('')} style={{ position:'absolute', right:9, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#727785', fontSize:15 }}>✕</button>}
        </div>
        <select value={brand} onChange={e=>setBrand(e.target.value)} style={{ ...inp, flex:'0 1 140px' }}>{brands.map(b=><option key={b}>{b}</option>)}</select>
        <select value={cond} onChange={e=>setCond(e.target.value)} style={{ ...inp, flex:'0 1 140px' }}>{['All',...CONDITION_OPTIONS].map(c=><option key={c}>{c}</option>)}</select>
        <select value={avail} onChange={e=>setAvail(e.target.value)} style={{ ...inp, flex:'0 1 120px' }}>{['All','Available','Sold'].map(a=><option key={a}>{a}</option>)}</select>
        <span style={{ color:'#727785', fontSize:'.75rem', alignSelf:'center', whiteSpace:'nowrap' }}>{filtered.length} phone{filtered.length!==1?'s':''}</span>
        {phones.length > 0 && (
          <button onClick={handleDeleteAll} style={{ background:'#FCE8E6', color:'#C5221F', border:'1px solid #F2837F', borderRadius:8, padding:'.45rem .9rem', fontFamily:'inherit', fontWeight:700, fontSize:'.78rem', cursor:'pointer', whiteSpace:'nowrap' }}>
            🗑 Delete All ({phones.length})
          </button>
        )}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign:'center', padding:'3rem', color:'#727785' }}>
          {phones.length === 0 ? 'No phones yet. Add your first phone from the Add Phone tab.' : 'No phones match your filters.'}
        </div>
      )}

      {Object.entries(grouped).map(([b, list]) => (
        <div key={b} style={{ marginBottom:'2.25rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'.55rem', marginBottom:'.85rem', paddingBottom:'.5rem', borderBottom:'2px solid #E6E8EA' }}>
            <span>{BRAND_ICONS[b]||'📱'}</span>
            <h3 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'.95rem' }}>{b}</h3>
            <span style={{ fontSize:'.68rem', color:'#727785', fontWeight:600 }}>{list.length} phone{list.length!==1?'s':''}</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'.35rem' }}>
            {list.map(p => (
              <div key={p.id} style={{ display:'flex', alignItems:'center', gap:'.85rem', padding:'.6rem .85rem', background:'#fff', border:'1px solid #C1C6D6', borderRadius:10, flexWrap:'wrap', opacity:deleting[p.id]?.5:1, transition:'opacity .2s' }}>
                <div style={{ width:38, height:38, background:'#F2F4F6', borderRadius:6, overflow:'hidden', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {p.images?.[0] ? <img src={p.images[0]} alt="" style={{ width:'100%', height:'100%', objectFit:'contain' }} /> : <span style={{ fontSize:18, opacity:.3 }}>📱</span>}
                </div>
                <div style={{ flex:1, minWidth:100 }}>
                  <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'.875rem' }}>{p.name}</p>
                  <p style={{ fontSize:'.72rem', color:'#414754' }}>{p.storage} · {p.color} · {p.condition}</p>
                </div>
                <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'.95rem', color:'#005BBF' }}>{formatPrice(p.price)}</span>
                <span style={{ fontSize:'.65rem', fontWeight:700, padding:'.2rem .55rem', borderRadius:999, background:p.available?'#E6F4EA':'#FCE8E6', color:p.available?'#137333':'#C5221F' }}>
                  {p.available?'Available':'Sold'}
                </span>
                <div style={{ display:'flex', gap:'.35rem' }}>
                  <button onClick={()=>onEdit(p)} style={{ background:'#E8F0FE', color:'#1967D2', border:'none', borderRadius:7, padding:'.28rem .7rem', fontFamily:'inherit', fontWeight:700, fontSize:'.75rem', cursor:'pointer' }}>Edit</button>
                  <button onClick={()=>handleDelete(p)} disabled={deleting[p.id]} style={{ background:'#FCE8E6', color:'#C5221F', border:'none', borderRadius:7, padding:'.28rem .7rem', fontFamily:'inherit', fontWeight:700, fontSize:'.75rem', cursor:deleting[p.id]?'default':'pointer' }}>
                    {deleting[p.id]?'…':'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   EDIT PRICES TAB
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
    setSaving(s => ({ ...s, [phone.id]:true }))
    try {
      await onSavePrice(phone.id, newPrice)
      setDone(d => ({ ...d, [phone.id]:true }))
      setTimeout(() => setDone(d => ({ ...d, [phone.id]:false })), 2000)
    } catch { alert('Save failed') }
    finally { setSaving(s => ({ ...s, [phone.id]:false })) }
  }

  const allB    = [...new Set(phones.map(p=>p.brand))]
  const ordered = [...BRAND_ORDER.filter(b=>allB.includes(b)), ...allB.filter(b=>!BRAND_ORDER.includes(b))]

  return (
    <div>
      <p style={{ color:'#414754', fontSize:'.82rem', marginBottom:'1.25rem', padding:'.85rem 1rem', background:'#E8F0FE', border:'1.5px solid #ADC7FF', borderRadius:10 }}>
        Change any price and press <strong>Save</strong>. You can also press Enter to save quickly.
      </p>
      {ordered.map(brand => {
        const list = phones.filter(p=>p.brand===brand)
        if (!list.length) return null
        return (
          <div key={brand} style={{ marginBottom:'2.25rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'.55rem', marginBottom:'.85rem', paddingBottom:'.45rem', borderBottom:'2px solid #E6E8EA' }}>
              <span>{BRAND_ICONS[brand]||'📱'}</span>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'.95rem' }}>{brand}</h3>
            </div>
            {list.map(p => (
              <div key={p.id} style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'.55rem .85rem', background:'#fff', border:'1px solid #C1C6D6', borderRadius:10, marginBottom:'.3rem', flexWrap:'wrap' }}>
                <p style={{ flex:1, minWidth:120, fontFamily:'var(--font-display)', fontWeight:700, fontSize:'.875rem' }}>
                  {p.name}
                  <span style={{ fontWeight:400, color:'#414754', fontSize:'.75rem', marginLeft:'.5rem' }}>{p.storage} · {p.condition}</span>
                </p>
                <div style={{ display:'flex', alignItems:'center', gap:'.4rem' }}>
                  <span style={{ fontSize:'.8rem', color:'#414754' }}>₦</span>
                  <input type="number" value={prices[p.id]||''} onChange={e=>setPrices(prev=>({...prev,[p.id]:e.target.value}))}
                    style={{ ...inp, width:130, textAlign:'right' }}
                    onKeyDown={e=>e.key==='Enter'&&save(p)} />
                  <button onClick={()=>save(p)} disabled={saving[p.id]}
                    style={{ background:done[p.id]?'#E6F4EA':'#005BBF', color:done[p.id]?'#137333':'#fff', border:'none', borderRadius:8, padding:'.35rem .8rem', fontFamily:'inherit', fontWeight:700, fontSize:'.78rem', cursor:'pointer', minWidth:50, transition:'background .2s' }}>
                    {saving[p.id]?'…':done[p.id]?'✓':'Save'}
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
   ADD / EDIT PHONE TAB
═══════════════════════════════════════════════ */
const emptyForm = {
  brand:'', name:'', condition:'Brand New', storage:'128GB', color:'Black',
  network:'4G', price:'', images:'', featured:false, available:true, slug:'',
  specs:{ display:'', processor:'', camera:'', battery:'', ram:'' }
}

function TabAddEdit({ catalog, editPhone, onSave, onCancel, saving }) {
  const [form, setForm] = useState(editPhone ? {
    ...emptyForm, ...editPhone,
    images:(editPhone.images||[]).join(', '),
    specs:{ display:'', processor:'', camera:'', battery:'', ram:'', ...(editPhone.specs||{}) }
  } : emptyForm)
  const [err, setErr] = useState('')

  const brands = Object.keys(catalog)
  const models = form.brand ? (catalog[form.brand]||[]) : []
  const set     = (k,v) => setForm(f=>({...f,[k]:v}))
  const setSpec = (k,v) => setForm(f=>({...f,specs:{...f.specs,[k]:v}}))

  const handleSave = () => {
    if (!form.brand) { setErr('Select a brand'); return }
    if (!form.name)  { setErr('Select a model'); return }
    if (!form.price) { setErr('Enter a price'); return }
    setErr('')
    const slug = form.slug || (form.brand+'-'+form.name).toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
    onSave({ ...form, slug, price:Number(form.price), images:form.images?form.images.split(',').map(s=>s.trim()).filter(Boolean):[] })
  }

  return (
    <div style={{ maxWidth:680 }}>
      <h3 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.05rem', marginBottom:'1.5rem' }}>
        {editPhone ? `Editing: ${editPhone.name}` : 'Add New Phone'}
      </h3>
      {err && <div style={{ background:'#FCE8E6', color:'#C5221F', padding:'.65rem 1rem', borderRadius:8, fontSize:'.82rem', fontWeight:600, marginBottom:'1rem' }}>{err}</div>}

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.85rem', marginBottom:'.85rem' }}>
        <Row label="Brand *"><Sel value={form.brand} onChange={e=>{set('brand',e.target.value);set('name','')}} options={brands} placeholder="Select brand…" /></Row>
        <Row label="Model *"><Sel value={form.name} onChange={e=>set('name',e.target.value)} options={models} placeholder={form.brand?'Select model…':'Select brand first'} /></Row>
        <Row label="Condition"><Sel value={form.condition} onChange={e=>set('condition',e.target.value)} options={CONDITION_OPTIONS} /></Row>
        <Row label="Storage"><Sel value={form.storage} onChange={e=>set('storage',e.target.value)} options={STORAGE_OPTIONS} /></Row>
        <Row label="Color"><Sel value={form.color} onChange={e=>set('color',e.target.value)} options={COLOR_OPTIONS} /></Row>
        <Row label="Network"><Sel value={form.network} onChange={e=>set('network',e.target.value)} options={NETWORK_OPTIONS} /></Row>
        <Row label="Price (₦) *"><input type="number" value={form.price} onChange={e=>set('price',e.target.value)} placeholder="e.g. 580000" style={inp} /></Row>
        <Row label="Slug (auto if blank)"><input value={form.slug} onChange={e=>set('slug',e.target.value)} placeholder="e.g. pixel-8-pro" style={inp} /></Row>
      </div>

      <Row label="Image URLs — comma separated">
        <input value={form.images} onChange={e=>set('images',e.target.value)} placeholder="https://…, https://…" style={{ ...inp, marginBottom:'.85rem' }} />
      </Row>

      <div style={{ marginBottom:'.85rem' }}>
        <Label>Specifications</Label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'.55rem' }}>
          {[['display','Display'],['processor','Processor'],['camera','Camera'],['battery','Battery'],['ram','RAM']].map(([k,l])=>(
            <div key={k}><Label>{l}</Label><input value={form.specs[k]||''} onChange={e=>setSpec(k,e.target.value)} placeholder={l} style={inp} /></div>
          ))}
        </div>
      </div>

      <div style={{ display:'flex', gap:'1.25rem', marginBottom:'1.5rem' }}>
        {[['featured','⭐ Featured'],['available','✅ Available']].map(([k,l])=>(
          <label key={k} style={{ display:'flex', alignItems:'center', gap:'.4rem', cursor:'pointer', fontSize:'.875rem', fontWeight:500 }}>
            <input type="checkbox" checked={form[k]} onChange={e=>set(k,e.target.checked)} style={{ accentColor:'#005BBF', width:'auto' }} />{l}
          </label>
        ))}
      </div>

      <div style={{ display:'flex', gap:'.55rem' }}>
        <button onClick={handleSave} disabled={saving} style={{ background:saving?'#ADC7FF':'#005BBF', color:'#fff', border:'none', borderRadius:8, padding:'.6rem 1.4rem', fontFamily:'inherit', fontWeight:700, fontSize:'.875rem', cursor:saving?'default':'pointer' }}>
          {saving?'⏳ Saving…':`✓ ${editPhone?'Update Phone':'Add Phone'}`}
        </button>
        <button onClick={onCancel} style={{ background:'#F2F4F6', color:'#191C1E', border:'1px solid #C1C6D6', borderRadius:8, padding:'.6rem 1.25rem', fontFamily:'inherit', fontWeight:600, fontSize:'.875rem', cursor:'pointer' }}>Cancel</button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   MANAGE CATALOG TAB
═══════════════════════════════════════════════ */
function TabCatalog() {
  const [catalog,  setCatalog]  = useState(loadCatalog)
  const [selBrand, setSelBrand] = useState(Object.keys(loadCatalog())[0])
  const [newBrand, setNewBrand] = useState('')
  const [newModel, setNewModel] = useState('')
  const [saved,    setSaved]    = useState(false)

  const save = (u) => { setCatalog(u); saveCatalog(u); setSaved(true); setTimeout(()=>setSaved(false),1800) }
  const addBrand   = () => { const b=newBrand.trim(); if(!b||catalog[b])return; save({...catalog,[b]:[]}); setSelBrand(b); setNewBrand('') }
  const removeBrand= (b) => { if(!confirm(`Remove "${b}" and all its models?`))return; const{[b]:_,...rest}=catalog; save(rest); setSelBrand(Object.keys(rest)[0]||'') }
  const addModel   = () => { const m=newModel.trim(); if(!m||(catalog[selBrand]||[]).includes(m))return; save({...catalog,[selBrand]:[...(catalog[selBrand]||[]),m]}); setNewModel('') }
  const removeModel= m => save({...catalog,[selBrand]:catalog[selBrand].filter(x=>x!==m)})
  const moveModel  = (m,dir) => { const list=[...catalog[selBrand]],idx=list.indexOf(m),ni=idx+dir; if(ni<0||ni>=list.length)return; [list[idx],list[ni]]=[list[ni],list[idx]]; save({...catalog,[selBrand]:list}) }

  return (
    <div>
      <p style={{ color:'#414754', fontSize:'.82rem', marginBottom:'1.25rem', padding:'.85rem 1rem', background:'#E8F0FE', border:'1.5px solid #ADC7FF', borderRadius:10 }}>
        Manage brands and models in the Add Phone dropdowns.
        {saved && <span style={{ marginLeft:'.75rem', color:'#005BBF', fontWeight:700 }}>✓ Saved</span>}
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:'2rem', alignItems:'start' }} className="cat-g">
        <div>
          <Label>Brands</Label>
          <div style={{ border:'1px solid #C1C6D6', borderRadius:10, overflow:'hidden', marginBottom:'.65rem' }}>
            {Object.keys(catalog).map((b,i)=>(
              <div key={b} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'.5rem .75rem', background:b===selBrand?'#E8F0FE':i%2===0?'#fff':'#F2F4F6', borderBottom:'1px solid #C1C6D6', cursor:'pointer' }}
                onClick={()=>setSelBrand(b)}>
                <span style={{ fontSize:'.85rem', fontWeight:b===selBrand?700:400, color:b===selBrand?'#005BBF':'#191C1E' }}>{BRAND_ICONS[b]||'📱'} {b}</span>
                <button onClick={e=>{e.stopPropagation();removeBrand(b)}} style={{ background:'none', border:'none', cursor:'pointer', color:'#727785', fontSize:13 }}>✕</button>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:'.4rem' }}>
            <input value={newBrand} onChange={e=>setNewBrand(e.target.value)} placeholder="New brand…" style={{ ...inp, flex:1 }} onKeyDown={e=>e.key==='Enter'&&addBrand()} />
            <button onClick={addBrand} style={{ background:'#005BBF', color:'#fff', border:'none', borderRadius:7, padding:'.35rem .75rem', fontFamily:'inherit', fontWeight:700, fontSize:'.78rem', cursor:'pointer' }}>Add</button>
          </div>
        </div>
        <div>
          {selBrand && <>
            <Label>Models — {selBrand}</Label>
            <div style={{ border:'1px solid #C1C6D6', borderRadius:10, overflow:'hidden', marginBottom:'.65rem', maxHeight:360, overflowY:'auto' }}>
              {(catalog[selBrand]||[]).length===0 && <div style={{ padding:'1rem', textAlign:'center', color:'#727785', fontSize:'.82rem' }}>No models yet.</div>}
              {(catalog[selBrand]||[]).map((m,i,arr)=>(
                <div key={m} style={{ display:'flex', alignItems:'center', gap:'.5rem', padding:'.48rem .75rem', background:i%2===0?'#fff':'#F2F4F6', borderBottom:i<arr.length-1?'1px solid #C1C6D6':'none' }}>
                  <span style={{ flex:1, fontSize:'.85rem' }}>{m}</span>
                  <button onClick={()=>moveModel(m,-1)} disabled={i===0} style={{ background:'none', border:'none', cursor:i===0?'default':'pointer', color:'#727785', fontSize:13, opacity:i===0?.3:1 }}>↑</button>
                  <button onClick={()=>moveModel(m,1)} disabled={i===arr.length-1} style={{ background:'none', border:'none', cursor:i===arr.length-1?'default':'pointer', color:'#727785', fontSize:13, opacity:i===arr.length-1?.3:1 }}>↓</button>
                  <button onClick={()=>removeModel(m)} style={{ background:'none', border:'none', cursor:'pointer', color:'#C5221F', fontSize:13 }}>✕</button>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:'.4rem' }}>
              <input value={newModel} onChange={e=>setNewModel(e.target.value)} placeholder={`New ${selBrand} model…`} style={{ ...inp, flex:1 }} onKeyDown={e=>e.key==='Enter'&&addModel()} />
              <button onClick={addModel} style={{ background:'#005BBF', color:'#fff', border:'none', borderRadius:7, padding:'.35rem .75rem', fontFamily:'inherit', fontWeight:700, fontSize:'.78rem', cursor:'pointer' }}>Add</button>
            </div>
          </>}
        </div>
      </div>
      <style>{`@media(max-width:600px){.cat-g{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   MAIN ADMIN
═══════════════════════════════════════════════ */
export default function Admin() {
  const [user,    setUser]    = useState(undefined) // undefined = checking, null = logged out
  const [phones,  setPhones]  = useState([])
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [tab,     setTab]     = useState('inventory')
  const [editing, setEditing] = useState(null)
  const catalog = loadCatalog()

  // Listen to Firebase auth state — persists across page refreshes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
    })
    return unsub
  }, [])

  // Load phones when logged in
  useEffect(() => {
    if (user) {
      setLoading(true)
      getAllPhones().then(d => { setPhones(d); setLoading(false) })
    }
  }, [user])

  const load = () => {
    setLoading(true)
    getAllPhones().then(d => { setPhones(d); setLoading(false) })
  }

  const handleSave = async (data) => {
    setSaving(true)
    try {
      if (editing) { await updatePhone(editing.id, data) }
      else         { await addPhone(data) }
      setEditing(null); setTab('inventory'); load()
    } catch {
      alert('Save failed — check your Firestore rules in Firebase Console')
    } finally {
      setSaving(false)
    }
  }

  const handleSavePrice = async (id, price) => {
    await updatePhone(id, { price })
    setPhones(prev => prev.map(p => p.id===id ? {...p,price} : p))
  }

  const handleLogout = async () => {
    await signOut(auth)
    setPhones([])
    setTab('inventory')
    setEditing(null)
  }

  // Checking auth state
  if (user === undefined) return (
    <div className="pt" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:28, height:28, border:'2.5px solid #005BBF', borderTopColor:'transparent', borderRadius:'50%', animation:'spin .7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  // Not logged in
  if (!user) return <LoginScreen />

  // Logged in
  const TABS = [
    { id:'inventory', label:`📦 Inventory (${phones.filter(p=>p.available).length} available)` },
    { id:'add',       label: editing ? '✏️ Edit Phone' : '➕ Add Phone' },
    { id:'prices',    label:'💰 Edit Prices' },
    { id:'catalog',   label:'📋 Manage Catalog' },
  ]

  return (
    <div className="pt" style={{ paddingBottom:'5rem', background:'var(--bg)', minHeight:'100vh' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'2rem 2.5rem' }}>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(1.5rem,3vw,2rem)', letterSpacing:'-.02em' }}>Admin Panel</h1>
            <p style={{ fontSize:'.78rem', color:'#727785', marginTop:'.2rem' }}>
              Signed in as <strong>{user.email}</strong>
            </p>
          </div>
          <div style={{ display:'flex', gap:'.65rem', alignItems:'center' }}>
            {loading && <span style={{ fontSize:'.78rem', color:'#727785' }}>⏳ Loading…</span>}
            <button onClick={load} style={{ background:'#E8F0FE', color:'#1967D2', border:'none', borderRadius:8, padding:'.4rem .85rem', fontFamily:'inherit', fontWeight:600, fontSize:'.8rem', cursor:'pointer' }}>↻ Refresh</button>
            <button onClick={handleLogout} style={{ background:'#F2F4F6', color:'#191C1E', border:'1px solid #C1C6D6', borderRadius:8, padding:'.4rem .9rem', fontFamily:'inherit', fontWeight:600, fontSize:'.8rem', cursor:'pointer' }}>Sign Out</button>
          </div>
        </div>

        <div style={{ display:'flex', gap:'.3rem', marginBottom:'2rem', borderBottom:'1px solid #C1C6D6', paddingBottom:'.1rem', overflowX:'auto' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={()=>{ setTab(t.id); if(t.id!=='add') setEditing(null) }}
              style={{ padding:'.5rem .95rem', borderRadius:'8px 8px 0 0', border:`1px solid ${tab===t.id?'#C1C6D6':'transparent'}`, borderBottom:tab===t.id?'2px solid #005BBF':'1px solid transparent', background:tab===t.id?'#E8F0FE':'transparent', color:tab===t.id?'#005BBF':'#414754', fontWeight:tab===t.id?700:500, fontFamily:'inherit', fontSize:'.82rem', cursor:'pointer', whiteSpace:'nowrap', transition:'all .12s' }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab==='inventory' && <TabInventory phones={phones} setPhones={setPhones} onEdit={p=>{setEditing(p);setTab('add')}} />}
        {tab==='add'       && <TabAddEdit   catalog={catalog} editPhone={editing} onSave={handleSave} onCancel={()=>{setEditing(null);setTab('inventory')}} saving={saving} />}
        {tab==='prices'    && <TabPrices    phones={phones} onSavePrice={handleSavePrice} />}
        {tab==='catalog'   && <TabCatalog />}
      </div>
    </div>
  )
}