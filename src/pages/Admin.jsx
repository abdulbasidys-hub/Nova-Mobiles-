import { useState, useEffect, useRef } from 'react'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, uploadImage } from '../lib/firebase'
import {
  getAllPhones, addPhone, updatePhone, deletePhone,
  getAllCatalog, addCatalogProduct, updateCatalogProduct, deleteCatalogProduct,
  updateCatalogColorImages,
  getBanners, addBanner, deleteBanner,
  addAccessory, updateAccessory, deleteAccessory,
} from '../lib/phones'
import { formatPrice } from '../lib/constants'

const DOMAIN = '@novamobilesplus.com'

const BRAND_COLORS = {
  'Huawei':       ['Space Black','Silver Frost','Breathing Crystal','Emerald Green','Nebula Red','Cocoa Gold','Pearl White','Dark Blue'],
  'Honor':        ['Titanium Silver','Midnight Black','Emerald Green','Purple','Cyan Lake','Gold','Magic Night Black','Ice Silver'],
  'Moto G':       ['Mineral Gray','Viva Magenta','Steel Blue','Blush Gold','Charcoal','Sky Blue','Sage Green','Midnight Blue'],
  'Google Pixel': ['Obsidian','Porcelain','Bay','Hazel','Mint','Coral','Lemongrass','Sage','Charcoal','Pearl','Snow','Peony','Matcha','Wintergreen','Mocha'],
  'iPhone':       ['Black Titanium','White Titanium','Natural Titanium','Desert Titanium','Pink','Black','White','Blue','Green','Yellow','Purple','Red','Starlight','Midnight','Storm Blue','Ultramarine','Teal','Sand'],
  'Samsung':      ['Phantom Black','Phantom White','Titanium Black','Titanium Gray','Titanium Blue','Titanium Violet','Titanium Yellow','Cream','Lavender','Green','Navy','Lime','Graphite'],
  'Oppo':         ['Starry Black','Moonlight White','Rock Grey','Dreamy Purple','Emerald Green','Sunset Orange','Gold'],
}
const DEFAULT_COLORS = ['Black','White','Silver','Gold','Blue','Other']

const COLOR_HEX = {
  'Obsidian':'#1A1A1A','Porcelain':'#F5F0E8','Bay':'#7B9EA6','Hazel':'#7B6B3D',
  'Mint':'#B8D4C8','Coral':'#E86B5F','Lemongrass':'#C8D470','Sage':'#8DAF8A',
  'Charcoal':'#3C3C3C','Pearl':'#EDE8E0','Snow':'#F0F4F8','Peony':'#D4607A',
  'Matcha':'#7A9E6E','Mocha':'#8B6F5E','Wintergreen':'#4A7B6F',
  'Black Titanium':'#2C2C2C','White Titanium':'#F0EDE8','Natural Titanium':'#C4B8A4',
  'Desert Titanium':'#C9A97A','Pink':'#F4A7B9','Black':'#1A1A1A','White':'#F5F5F5',
  'Blue':'#4A90D9','Green':'#4CAF50','Yellow':'#F5C518','Purple':'#9B59B6',
  'Red':'#E74C3C','Starlight':'#F2EFE7','Midnight':'#1C1C2E','Storm Blue':'#4A6FA5',
  'Ultramarine':'#2B4590','Teal':'#2E8B84','Sand':'#C4A882',
  'Phantom Black':'#0D0D0D','Phantom White':'#F0EFF4','Titanium Black':'#1A1A1E',
  'Titanium Gray':'#6E7278','Titanium Blue':'#4B6589','Titanium Violet':'#7B5EA7',
  'Titanium Yellow':'#E8C84A','Cream':'#F5EDD6','Lavender':'#B89BC8','Navy':'#1A2F5A',
  'Lime':'#A8D44A','Graphite':'#4A4A4A','Starry Black':'#1A1B2E','Moonlight White':'#F2F0EE',
  'Rock Grey':'#7B7E85','Dreamy Purple':'#8B6B9E','Emerald Green':'#2E8B57',
  'Gold':'#D4AF37','Silver':'#C0C0C0','Other':'#999',
}

const STORAGE_OPTIONS   = ['32GB','64GB','128GB','256GB','512GB','1TB']
const CONDITION_OPTIONS = ['Brand New','London Used','Nigerian Used']
const BRAND_ORDER       = ['Google Pixel','iPhone','Huawei','Honor','Oppo','Moto G','Samsung']
const BRAND_ICONS       = {'Google Pixel':'🟢','iPhone':'🍎','Huawei':'🔴','Honor':'⚪','Oppo':'🟠','Moto G':'🟣','Samsung':'🔵'}

/* ── Shared UI ───────────────────────────────────── */
const I = { background:'#F2F4F6', color:'#191C1E', border:'1.5px solid #C1C6D6', borderRadius:8, padding:'.55rem .8rem', fontSize:'.85rem', fontFamily:'inherit', outline:'none', width:'100%' }
const Sel = ({value, onChange, options, placeholder, disabled}) => (
  <select value={value} onChange={onChange} disabled={disabled} style={{...I, appearance:'none', opacity:disabled?.6:1}}>
    {placeholder && <option value="">{placeholder}</option>}
    {options.map(o => <option key={o} value={o}>{o}</option>)}
  </select>
)
const Lbl = ({children}) => <p style={{fontSize:'.65rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.09em',color:'#414754',marginBottom:'.3rem'}}>{children}</p>
const Field = ({label, children}) => <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}><Lbl>{label}</Lbl>{children}</div>
const Btn = ({onClick, children, variant='primary', disabled, small, type='button'}) => {
  const styles = {primary:{bg:disabled?'#ADC7FF':'#005BBF',col:'#fff',border:'none'}, ghost:{bg:'#F2F4F6',col:'#191C1E',border:'1px solid #C1C6D6'}, danger:{bg:'#FCE8E6',col:'#C5221F',border:'none'}, success:{bg:'#E6F4EA',col:'#137333',border:'none'}}[variant]
  return <button type={type} onClick={onClick} disabled={disabled} style={{background:styles.bg,color:styles.col,border:styles.border,borderRadius:8,padding:small?'.3rem .75rem':'.58rem 1.25rem',fontFamily:'inherit',fontWeight:700,fontSize:small?'.75rem':'.875rem',cursor:disabled?'default':'pointer',transition:'background .15s',whiteSpace:'nowrap',display:'inline-flex',alignItems:'center',gap:'.35rem'}}>{children}</button>
}

function Toggle({checked, onChange, label, sublabel}) {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'.65rem .85rem',background:checked?'#E8F0FE':'#F2F4F6',borderRadius:10,border:`1.5px solid ${checked?'#ADC7FF':'#C1C6D6'}`,cursor:'pointer',transition:'all .15s'}} onClick={()=>onChange(!checked)}>
      <div>
        <p style={{fontWeight:600,fontSize:'.85rem'}}>{label}</p>
        {sublabel&&<p style={{fontSize:'.72rem',color:'#727785',marginTop:'.1rem'}}>{sublabel}</p>}
      </div>
      <div style={{width:44,height:24,borderRadius:999,background:checked?'#005BBF':'#C1C6D6',position:'relative',flexShrink:0,transition:'background .15s'}}>
        <div style={{position:'absolute',top:3,left:checked?20:3,width:18,height:18,borderRadius:'50%',background:'#fff',boxShadow:'0 1px 4px rgba(0,0,0,.2)',transition:'left .15s'}}/>
      </div>
    </div>
  )
}

function useToast() {
  const [toast, setToast] = useState(null)
  const show = (msg, type='success') => { setToast({msg,type}); setTimeout(()=>setToast(null),3500) }
  const Toast = toast ? <div style={{position:'fixed',bottom:24,right:24,zIndex:9999,padding:'.75rem 1.25rem',borderRadius:10,background:toast.type==='error'?'#FFDAD6':'#E6F4EA',color:toast.type==='error'?'#C5221F':'#137333',fontWeight:600,fontSize:'.85rem',boxShadow:'0 4px 16px rgba(0,0,0,.12)',animation:'fadeUp .3s ease',maxWidth:360}}>{toast.msg}</div> : null
  return {show, Toast}
}

const SectionHead = ({title, subtitle, action}) => (
  <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'1.5rem',gap:'1rem',flexWrap:'wrap'}}>
    <div>
      <h2 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'1.1rem',marginBottom:subtitle?'.2rem':0}}>{title}</h2>
      {subtitle&&<p style={{fontSize:'.8rem',color:'#727785'}}>{subtitle}</p>}
    </div>
    {action}
  </div>
)

/* ═══════════════════════════════════════════════
   IMAGE UPLOADER COMPONENT
═══════════════════════════════════════════════ */
function ImageUploader({ storagePath, onUploaded, label='Upload Photo', hint, compact }) {
  const [progress, setProgress] = useState(null)
  const [error,    setError]    = useState('')
  const inputRef = useRef()

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { setError('Please select an image file'); return }
    if (file.size > 10 * 1024 * 1024)   { setError('Image must be under 10MB'); return }
    setError('')
    setProgress(0)
    const ext  = file.name.split('.').pop().toLowerCase()
    const path = `${storagePath}/${Date.now()}.${ext}`
    try {
      const url = await uploadImage(file, path, setProgress)
      onUploaded(url)
      setProgress(null)
    } catch {
      setError('Upload failed — check Firebase Storage rules')
      setProgress(null)
    }
    e.target.value = ''
  }

  const btnStyle = {
    display:'flex', alignItems:'center', gap:'.4rem',
    padding: compact ? '.38rem .75rem' : '.55rem 1rem',
    background: progress!==null ? '#E8F0FE' : '#fff',
    border:'2px dashed #C1C6D6', borderRadius:8,
    fontFamily:'inherit', fontWeight:600,
    fontSize: compact ? '.78rem' : '.82rem',
    color: progress!==null ? '#1967D2' : '#414754',
    cursor: progress!==null ? 'default' : 'pointer',
    transition:'all .15s',
    width: compact ? 'auto' : '100%',
    justifyContent:'center',
  }

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile}
        style={{display:'none'}} capture="environment" />
      <button type="button" onClick={() => inputRef.current?.click()} disabled={progress !== null} style={btnStyle}>
        {progress !== null ? (
          <>
            <div style={{width:12,height:12,border:'2px solid #1967D2',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .6s linear infinite',flexShrink:0}}/>
            {compact ? `${progress}%` : `Uploading… ${progress}%`}
          </>
        ) : (
          <>
            <span className="material-symbols-outlined" style={{fontSize:compact?14:18}}>add_photo_alternate</span>
            {label}
          </>
        )}
      </button>
      {progress !== null && (
        <div style={{marginTop:'.3rem',height:3,background:'#E6E8EA',borderRadius:99,overflow:'hidden'}}>
          <div style={{height:'100%',background:'#005BBF',width:`${progress}%`,transition:'width .2s',borderRadius:99}}/>
        </div>
      )}
      {error && <p style={{fontSize:'.72rem',color:'#C5221F',marginTop:'.3rem',fontWeight:600}}>{error}</p>}
      {hint  && <p style={{fontSize:'.72rem',color:'#727785',marginTop:'.3rem'}}>{hint}</p>}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

/* Image thumbnail with remove button */
function ImageThumb({ url, onRemove, label }) {
  return (
    <div style={{position:'relative',flexShrink:0}}>
      <div style={{width:76,height:96,background:'#F2F4F6',borderRadius:8,overflow:'hidden',border:'1px solid #E6E8EA',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img src={url} alt={label||''} style={{width:'100%',height:'100%',objectFit:'contain'}}
          onError={e=>{e.target.style.display='none'; e.target.parentNode.style.background='#FCE8E6'}}/>
      </div>
      {onRemove && (
        <button type="button" onClick={onRemove}
          style={{position:'absolute',top:-6,right:-6,width:20,height:20,borderRadius:'50%',background:'#C5221F',color:'#fff',border:'none',cursor:'pointer',fontSize:11,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>
          ✕
        </button>
      )}
      {label && <p style={{fontSize:'.6rem',color:'#727785',textAlign:'center',marginTop:'.2rem',maxWidth:76,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{label}</p>}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   TAB 1 — INVENTORY
═══════════════════════════════════════════════ */
function TabInventory({phones, setPhones, onEdit}) {
  const [search,  setSearch]  = useState('')
  const [filter,  setFilter]  = useState('All')
  const [deleting,setDeleting]= useState({})
  const [toggling,setToggling]= useState({})
  const {show, Toast} = useToast()

  const del = async (phone) => {
    if (!confirm(`Delete "${phone.name||phone.model} — ${phone.color} ${phone.storage}"?`)) return
    setPhones(prev => prev.filter(p => p.id !== phone.id))
    setDeleting(d=>({...d,[phone.id]:true}))
    try {
      await deletePhone(phone.id)
      show(`Deleted ${phone.name||phone.model}`)
    } catch {
      setPhones(prev => [...prev, phone])
      show('Delete failed — check Firestore rules','error')
    } finally { setDeleting(d=>{const n={...d};delete n[phone.id];return n}) }
  }

  const toggleSold = async (phone) => {
    setToggling(t => ({...t, [phone.id]: true}))
    const newAvail = !phone.available
    setPhones(prev => prev.map(p => p.id === phone.id ? {...p, available: newAvail} : p))
    try {
      await updatePhone(phone.id, { available: newAvail })
      show(newAvail ? `${phone.name||phone.model} marked as available` : `${phone.name||phone.model} marked as sold`)
    } catch {
      setPhones(prev => prev.map(p => p.id === phone.id ? {...p, available: phone.available} : p))
      show('Update failed — check Firestore rules', 'error')
    } finally { setToggling(t => {const n={...t}; delete n[phone.id]; return n}) }
  }

  const q        = search.trim().toLowerCase()
  const filtered = phones.filter(p => {
    const s = !q || (p.name||p.model||'').toLowerCase().includes(q) || (p.brand||'').toLowerCase().includes(q) || (p.color||'').toLowerCase().includes(q)
    const f = filter==='All' || (filter==='Available'?p.available:!p.available)
    return s && f
  })
  const allB    = [...new Set(filtered.map(p=>p.brand))]
  const ordered = [...BRAND_ORDER.filter(b=>allB.includes(b)),...allB.filter(b=>!BRAND_ORDER.includes(b))]
  const grouped = {}
  ordered.forEach(b=>{const l=filtered.filter(p=>p.brand===b);if(l.length) grouped[b]=l})

  return (
    <div>
      {Toast}
      <div style={{display:'flex',gap:'.65rem',flexWrap:'wrap',marginBottom:'1.25rem',padding:'.85rem 1rem',background:'#F2F4F6',borderRadius:12,border:'1px solid #C1C6D6'}}>
        <div style={{position:'relative',flex:'1 1 180px'}}>
          <span style={{position:'absolute',left:9,top:'50%',transform:'translateY(-50%)',fontSize:13,color:'#727785',pointerEvents:'none'}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search inventory…" style={{...I,paddingLeft:'1.8rem'}}/>
          {search&&<button onClick={()=>setSearch('')} style={{position:'absolute',right:9,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#727785',fontSize:15}}>✕</button>}
        </div>
        {['All','Available','Sold'].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?'#005BBF':'#fff',color:filter===f?'#fff':'#414754',border:'1px solid #C1C6D6',borderRadius:8,padding:'.38rem .85rem',fontFamily:'inherit',fontWeight:600,fontSize:'.8rem',cursor:'pointer'}}>
            {f}
          </button>
        ))}
        <span style={{color:'#727785',fontSize:'.75rem',alignSelf:'center'}}>{filtered.length} variant{filtered.length!==1?'s':''}</span>
      </div>

      {phones.length===0 && (
        <div style={{textAlign:'center',padding:'4rem',color:'#727785',background:'#F2F4F6',borderRadius:12}}>
          <div style={{fontSize:40,marginBottom:'1rem'}}>📦</div>
          <p style={{fontWeight:600,marginBottom:'.35rem'}}>No inventory yet</p>
          <p style={{fontSize:'.82rem'}}>Add phones from the <strong>Add to Inventory</strong> tab</p>
        </div>
      )}

      {Object.entries(grouped).map(([brand,list])=>(
        <div key={brand} style={{marginBottom:'2rem'}}>
          <div style={{display:'flex',alignItems:'center',gap:'.55rem',marginBottom:'.75rem',paddingBottom:'.45rem',borderBottom:'2px solid #E6E8EA'}}>
            <span>{BRAND_ICONS[brand]||'📱'}</span>
            <h3 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'.95rem'}}>{brand}</h3>
            <span style={{fontSize:'.68rem',color:'#727785',fontWeight:600}}>{list.length}</span>
          </div>
          {list.map(p=>(
            <div key={p.id} style={{display:'flex',alignItems:'center',gap:'.85rem',padding:'.6rem .85rem',background:'#fff',border:'1px solid #C1C6D6',borderRadius:10,marginBottom:'.3rem',flexWrap:'wrap',opacity:deleting[p.id]?.5:1,transition:'opacity .2s'}}>
              <div style={{width:40,height:48,background:'#F2F4F6',borderRadius:6,overflow:'hidden',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                {p.images?.[0] ? <img src={p.images[0]} alt="" style={{width:'100%',height:'100%',objectFit:'contain'}}/> : <span style={{fontSize:20,opacity:.3}}>📱</span>}
              </div>
              <div style={{flex:1,minWidth:100}}>
                <p style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'.875rem'}}>{p.name||p.model}</p>
                <p style={{fontSize:'.72rem',color:'#414754'}}>{p.color} · {p.storage} · {p.condition}</p>
              </div>
              <span style={{fontFamily:'var(--font-display)',fontWeight:800,color:'#005BBF',fontSize:'.95rem'}}>{formatPrice(p.price)}</span>
              <span style={{fontSize:'.65rem',fontWeight:700,padding:'.2rem .55rem',borderRadius:999,background:p.available?'#E6F4EA':'#FCE8E6',color:p.available?'#137333':'#C5221F'}}>{p.available?'Available':'Sold'}</span>
              <span style={{fontSize:'.65rem',color:'#727785',background:'#F2F4F6',padding:'.2rem .55rem',borderRadius:6}}>{p.images?.length||0} photo{p.images?.length!==1?'s':''}</span>
              <div style={{display:'flex',gap:'.35rem'}}>
                <button onClick={()=>toggleSold(p)} disabled={toggling[p.id]}
                  style={{background:p.available?'#FEF7E0':'#E6F4EA',color:p.available?'#B06000':'#137333',border:'none',borderRadius:7,padding:'.28rem .7rem',fontFamily:'inherit',fontWeight:700,fontSize:'.75rem',cursor:'pointer',minWidth:60}}>
                  {toggling[p.id]?'…':p.available?'Mark Sold':'Mark Available'}
                </button>
                <button onClick={()=>onEdit(p)} style={{background:'#E8F0FE',color:'#1967D2',border:'none',borderRadius:7,padding:'.28rem .7rem',fontFamily:'inherit',fontWeight:700,fontSize:'.75rem',cursor:'pointer'}}>Edit</button>
                <button onClick={()=>del(p)} disabled={deleting[p.id]} style={{background:'#FCE8E6',color:'#C5221F',border:'none',borderRadius:7,padding:'.28rem .7rem',fontFamily:'inherit',fontWeight:700,fontSize:'.75rem',cursor:'pointer'}}>{deleting[p.id]?'…':'Delete'}</button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   TAB 2 — CATALOG
═══════════════════════════════════════════════ */
const SPEC_FIELDS = [
  {key:'display',      label:'Display',         placeholder:'e.g. 6.7" LTPO OLED, 1-120Hz'},
  {key:'camera',       label:'Rear Camera',     placeholder:'One camera per line e.g.\n50MP, f/1.4, 23mm (wide), OIS\n12MP, f/2.4, 69mm (telephoto)\n8MP, f/2.2, 112° (ultrawide)', multiline:true},
  {key:'frontCamera',  label:'Front Camera',    placeholder:'One camera per line e.g.\n60MP, f/2.4, 100° (ultrawide)\n8MP, f/2.2 (telephoto)', multiline:true},
  {key:'battery',      label:'Battery',         placeholder:'e.g. 5050mAh'},
  {key:'charging',     label:'Charging',        placeholder:'e.g. 30W wired / 23W wireless'},
  {key:'os',           label:'Operating System',placeholder:'e.g. Android 14'},
  {key:'dimensions',   label:'Dimensions',      placeholder:'e.g. 162.6 × 76.5 × 8.8mm'},
  {key:'weight',       label:'Weight',          placeholder:'e.g. 213g'},
]
const BRANDS_LIST = ['Google Pixel','iPhone','Huawei','Honor','Oppo','Moto G','Other']

function CatalogForm({initial, onSave, onCancel, saving}) {
  const [form,        setForm]        = useState(initial || {brand:'',model:'',...Object.fromEntries(SPEC_FIELDS.map(f=>[f.key,''])),availableColors:['','']})
  const [customBrand, setCustomBrand] = useState(initial?.brand && !BRANDS_LIST.slice(0,-1).includes(initial.brand) ? initial.brand : '')
  const [err,         setErr]         = useState('')
  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  const effectiveBrand = form.brand === 'Other' ? customBrand.trim() : form.brand

  const setColor = (idx, val) => {
    const updated = [...(form.availableColors || ['',''])]
    updated[idx] = val
    if (idx === updated.length - 1 && val.trim()) updated.push('')
    set('availableColors', updated)
  }

  const removeColor = (idx) => {
    const updated = (form.availableColors || []).filter((_,i) => i !== idx)
    while (updated.length < 2) updated.push('')
    set('availableColors', updated)
  }

  const submit = () => {
    if (!form.brand) {setErr('Select a brand'); return}
    if (form.brand === 'Other' && !customBrand.trim()) {setErr('Enter the brand name'); return}
    if (!form.model.trim()) {setErr('Enter a model name'); return}
    const filled = (form.availableColors||[]).filter(c=>c.trim())
    if (!filled.length) {setErr('Add at least one colour'); return}
    setErr('')
    const slug = (effectiveBrand+'-'+form.model).toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
    onSave({...form, availableColors: filled, brand: effectiveBrand, slug})
  }

  return (
    <div style={{maxWidth:680}}>
      {err&&<div style={{background:'#FCE8E6',color:'#C5221F',padding:'.6rem .85rem',borderRadius:8,fontSize:'.82rem',fontWeight:600,marginBottom:'1rem'}}>{err}</div>}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem',marginBottom:'1rem'}}>
        <Field label="Brand *">
          <Sel value={form.brand} onChange={e=>set('brand',e.target.value)} options={BRANDS_LIST} placeholder="Select brand…"/>
          {form.brand === 'Other' && (
            <input value={customBrand} onChange={e=>setCustomBrand(e.target.value)}
              placeholder="Type brand name e.g. Infinix, Tecno…"
              style={{...I, marginTop:'.4rem'}}/>
          )}
        </Field>
        <Field label="Model Name *"><input value={form.model} onChange={e=>set('model',e.target.value)} placeholder="e.g. Pixel 8 Pro" style={I}/></Field>
      </div>
      <div style={{borderTop:'1px solid #E6E8EA',paddingTop:'1rem',marginBottom:'1rem'}}>
        <p style={{fontSize:'.7rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.09em',color:'#414754',marginBottom:'.85rem'}}>Fixed Specifications</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem'}}>
          {SPEC_FIELDS.filter(f=>!f.multiline).map(({key,label,placeholder})=>(
            <Field key={key} label={label}>
              <input value={form[key]||''} onChange={e=>set(key,e.target.value)} placeholder={placeholder} style={I}/>
            </Field>
          ))}
          <div style={{gridColumn:'1/-1',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem'}}>
            {SPEC_FIELDS.filter(f=>f.multiline).map(({key,label,placeholder})=>(
              <Field key={key} label={label}>
                <textarea value={form[key]||''} onChange={e=>set(key,e.target.value)} placeholder={placeholder}
                  rows={4} style={{...I, resize:'vertical', lineHeight:1.55, fontFamily:'inherit'}}/>
              </Field>
            ))}
          </div>
        </div>
      </div>

      <div style={{borderTop:'1px solid #E6E8EA',paddingTop:'1rem',marginBottom:'1rem'}}>
        <p style={{fontSize:'.7rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.09em',color:'#414754',marginBottom:'.35rem'}}>Available Colours *</p>
        <p style={{fontSize:'.72rem',color:'#727785',marginBottom:'.75rem'}}>Type each colour name. A new slot appears automatically as you fill them in.</p>
        <div style={{display:'flex',flexDirection:'column',gap:'.45rem'}}>
          {(form.availableColors?.length ? form.availableColors : ['','']).map((color, idx) => (
            <div key={idx} style={{display:'flex',gap:'.4rem',alignItems:'center'}}>
              <input
                value={color}
                onChange={e => setColor(idx, e.target.value)}
                placeholder={`Colour ${idx+1} e.g. Midnight Black`}
                style={{...I, flex:1}}
              />
              {(form.availableColors||[]).length > 2 && (
                <button type="button" onClick={() => removeColor(idx)}
                  style={{background:'none',border:'none',cursor:'pointer',color:'#C5221F',fontSize:18,lineHeight:1,flexShrink:0,padding:'.2rem'}}>
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        {(form.availableColors||[]).filter(c=>c.trim()).length > 0 && (
          <p style={{fontSize:'.72rem',color:'#005BBF',fontWeight:600,marginTop:'.65rem'}}>
            {(form.availableColors||[]).filter(c=>c.trim()).length} colour{(form.availableColors||[]).filter(c=>c.trim()).length!==1?'s':''} added
          </p>
        )}
      </div>

      <div style={{display:'flex',gap:'.55rem'}}>
        <Btn onClick={submit} disabled={saving}>{saving?'⏳ Saving…':'✓ Save to Catalog'}</Btn>
        <Btn onClick={onCancel} variant="ghost">Cancel</Btn>
      </div>
    </div>
  )
}

function TabCatalog({catalog, setCatalog, showToast}) {
  const [adding,   setAdding]   = useState(false)
  const [editing,  setEditing]  = useState(null)
  const [saving,   setSaving]   = useState(false)
  const [deleting, setDeleting] = useState({})
  const [collapsed,setCollapsed]= useState({})
  const [expanded, setExpanded] = useState({})

  const save = async (data) => {
    setSaving(true)
    try {
      if (editing) {
        await updateCatalogProduct(editing.id, data)
        setCatalog(prev=>prev.map(c=>c.id===editing.id?{...c,...data}:c))
        showToast(`${data.model} updated — all variants synced`)
      } else {
        const ref = await addCatalogProduct(data)
        setCatalog(prev=>[...prev,{id:ref.id,...data}])
        showToast(`${data.model} added to catalog`)
      }
      setAdding(false); setEditing(null)
    } catch { showToast('Save failed — check Firestore rules','error') }
    finally { setSaving(false) }
  }

  const del = async (cat) => {
    if (!confirm(`Delete "${cat.model}" from catalog?`)) return
    setDeleting(d=>({...d,[cat.id]:true}))
    try {
      await deleteCatalogProduct(cat.id)
      setCatalog(prev=>prev.filter(c=>c.id!==cat.id))
      showToast(`${cat.model} removed`)
    } catch { showToast('Delete failed','error') }
    finally { setDeleting(d=>{const n={...d};delete n[cat.id];return n}) }
  }

  const allB    = [...new Set(catalog.map(c=>c.brand))]
  const ordered = [...BRAND_ORDER.filter(b=>allB.includes(b)),...allB.filter(b=>!BRAND_ORDER.includes(b))]
  const grouped = {}
  ordered.forEach(b=>{const l=catalog.filter(c=>c.brand===b);if(l.length) grouped[b]=l})

  if (adding||editing) return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:'.75rem',marginBottom:'1.5rem'}}>
        <button onClick={()=>{setAdding(false);setEditing(null)}} style={{background:'#F2F4F6',border:'none',borderRadius:8,padding:'.4rem .75rem',cursor:'pointer',fontSize:'.82rem',fontFamily:'inherit',fontWeight:600}}>← Back</button>
        <h2 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'1.05rem'}}>{editing?`Edit: ${editing.model}`:'New Catalog Product'}</h2>
      </div>
      <CatalogForm initial={editing} onSave={save} onCancel={()=>{setAdding(false);setEditing(null)}} saving={saving}/>
    </div>
  )

  return (
    <div>
      <SectionHead title="Product Catalog" subtitle="Master specs per model. Editing here updates all variants automatically." action={<Btn onClick={()=>setAdding(true)}>+ New Model</Btn>}/>

      {catalog.length===0&&(
        <div style={{textAlign:'center',padding:'4rem',background:'#F2F4F6',borderRadius:12,color:'#727785'}}>
          <div style={{fontSize:40,marginBottom:'1rem'}}>📋</div>
          <p style={{fontWeight:600,marginBottom:'.85rem'}}>Catalog is empty</p>
          <Btn onClick={()=>setAdding(true)}>+ Add First Model</Btn>
        </div>
      )}

      {Object.entries(grouped).map(([brand,list])=>(
        <div key={brand} style={{marginBottom:'1.25rem',border:'1px solid #C1C6D6',borderRadius:12,overflow:'hidden'}}>
          <button
            onClick={()=>setCollapsed(prev=>({...prev,[brand]:!prev[brand]}))}
            style={{width:'100%',display:'flex',alignItems:'center',gap:'.65rem',padding:'.75rem 1rem',background:collapsed[brand]?'#F2F4F6':'#E8F0FE',border:'none',cursor:'pointer',textAlign:'left'}}>
            <span style={{fontSize:18}}>{BRAND_ICONS[brand]||'📱'}</span>
            <span style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'.95rem',flex:1}}>{brand}</span>
            <span style={{fontSize:'.72rem',color:'#727785',fontWeight:600}}>{list.length} model{list.length!==1?'s':''}</span>
            <span style={{fontSize:12,color:'#727785',marginLeft:'.25rem'}}>{collapsed[brand]?'▼':'▲'}</span>
          </button>

          {!collapsed[brand]&&(
            <div style={{padding:'.75rem',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'.6rem',background:'#fff',borderTop:'1px solid #E6E8EA'}}>
              {list.map(cat=>(
                <div key={cat.id}
                  onClick={()=>setExpanded(prev=>({...prev,[cat.id]:!prev[cat.id]}))}
                  style={{border:`1px solid ${expanded[cat.id]?'#005BBF':'#C1C6D6'}`,borderRadius:10,overflow:'hidden',cursor:'pointer',opacity:deleting[cat.id]?.5:1,transition:'border-color .15s',background:expanded[cat.id]?'#F7FAFF':'#fff'}}>
                  <div style={{padding:'.65rem .75rem',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'.4rem'}}>
                    <div>
                      <p style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'.82rem',lineHeight:1.2}}>{cat.model}</p>
                      {cat.availableColors?.length>0&&(
                        <p style={{fontSize:'.65rem',color:'#727785',marginTop:'.18rem'}}>{cat.availableColors.length} colour{cat.availableColors.length!==1?'s':''}</p>
                      )}
                    </div>
                    <span style={{fontSize:11,color:'#727785',flexShrink:0}}>{expanded[cat.id]?'▲':'▼'}</span>
                  </div>

                  {expanded[cat.id]&&(
                    <div style={{borderTop:'1px solid #E6E8EA',padding:'.65rem .75rem'}} onClick={e=>e.stopPropagation()}>
                      {[
                        ['Display',cat.display],['Camera',cat.camera],['Battery',cat.battery],
                        ['Charging',cat.charging],['OS',cat.os],['Dimensions',cat.dimensions],['Weight',cat.weight]
                      ].filter(([,v])=>v).map(([label,val])=>(
                        <div key={label} style={{fontSize:'.72rem',marginBottom:'.25rem',display:'flex',gap:'.35rem'}}>
                          <span style={{color:'#727785',fontWeight:600,flexShrink:0,minWidth:60}}>{label}</span>
                          <span style={{color:'#191C1E'}}>{val.split('\n')[0]}{val.includes('\n')?'…':''}</span>
                        </div>
                      ))}
                      {cat.availableColors?.filter(Boolean).length>0&&(
                        <div style={{marginTop:'.4rem',display:'flex',flexWrap:'wrap',gap:4}}>
                          {cat.availableColors.filter(Boolean).map(col=>(
                            <span key={col} style={{fontSize:'.62rem',background:'#E8F0FE',color:'#1967D2',padding:'.1rem .45rem',borderRadius:999,fontWeight:600}}>{col}</span>
                          ))}
                        </div>
                      )}
                      <div style={{display:'flex',gap:'.4rem',marginTop:'.65rem'}}>
                        <button onClick={()=>setEditing(cat)} style={{flex:1,background:'#E8F0FE',color:'#1967D2',border:'none',borderRadius:7,padding:'.32rem 0',fontFamily:'inherit',fontWeight:700,fontSize:'.75rem',cursor:'pointer'}}>Edit</button>
                        <button onClick={()=>del(cat)} disabled={deleting[cat.id]} style={{flex:1,background:'#FCE8E6',color:'#C5221F',border:'none',borderRadius:7,padding:'.32rem 0',fontFamily:'inherit',fontWeight:700,fontSize:'.75rem',cursor:'pointer'}}>{deleting[cat.id]?'…':'Delete'}</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   TAB 3 — ADD / EDIT INVENTORY VARIANT
═══════════════════════════════════════════════ */
function TabAddInventory({catalog, editPhone, onSave, onCancel, saving}) {
  const [form, setForm] = useState(() => editPhone
    ? {...editPhone, images: editPhone.images || []}
    : {catalogId:'', color:'', storage:'128GB', condition:'Brand New', price:'', images:[], slug:''}
  )
  const [err, setErr] = useState('')
  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  const selectedCatalog = catalog.find(c => c.id === form.catalogId)
  const colors = selectedCatalog
    ? (selectedCatalog.availableColors?.length ? selectedCatalog.availableColors : (BRAND_COLORS[selectedCatalog.brand] || DEFAULT_COLORS))
    : DEFAULT_COLORS

  const handleCatalogChange = (id) => {
    const cp = catalog.find(c => c.id === id)
    set('catalogId', id)
    if (cp) set('color', (BRAND_COLORS[cp.brand]||DEFAULT_COLORS)[0])
  }

  const handlePhotoUploaded = (url) => {
    set('images', [...(form.images||[]), url])
  }
  const removePhoto = (idx) => {
    set('images', form.images.filter((_,i)=>i!==idx))
  }

  const submit = () => {
    if (!form.catalogId) {setErr('Select a phone model'); return}
    if (!form.color)     {setErr('Select a colour'); return}
    if (!form.price)     {setErr('Enter a price'); return}
    setErr('')
    const cp   = catalog.find(c => c.id === form.catalogId)
    const slug = form.slug || (cp ? cp.slug+'-'+form.storage+'-'+form.color : '').toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
    const specs = {
      display:cp?.display, processor:cp?.processor, camera:cp?.camera,
      frontCamera:cp?.frontCamera, battery:cp?.battery, charging:cp?.charging,
      os:cp?.os, connectivity:cp?.connectivity, protection:cp?.protection,
    }
    const featuredUntil = Date.now() + 7 * 24 * 60 * 60 * 1000
    onSave({ catalogId:form.catalogId, brand:cp?.brand||'', model:cp?.model||'', name:cp?.model||'', color:form.color, storage:form.storage, condition:form.condition, price:Number(form.price), available:true, featured:true, featuredUntil, images:form.images||[], slug, specs })
  }

  const variantStoragePath = `inventory/${form.catalogId||'new'}/${form.color||'unknown'}/${form.storage||'default'}`

  return (
    <div style={{maxWidth:640}}>
      <h3 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'1.05rem',marginBottom:'1.5rem'}}>
        {editPhone ? `Editing: ${editPhone.name||editPhone.model}` : 'Add Phone to Inventory'}
      </h3>
      {err&&<div style={{background:'#FCE8E6',color:'#C5221F',padding:'.6rem .85rem',borderRadius:8,fontSize:'.82rem',fontWeight:600,marginBottom:'1rem'}}>{err}</div>}
      {catalog.length===0&&<div style={{background:'#FEF7E0',border:'1.5px solid #FFB95F',borderRadius:10,padding:'1rem',marginBottom:'1rem',fontSize:'.82rem',color:'#653E00'}}>⚠️ Catalog is empty. Add models in the <strong>Catalog</strong> tab first.</div>}

      <div style={{background:'#F2F4F6',borderRadius:12,padding:'1.25rem',marginBottom:'1.25rem',border:'1px solid #C1C6D6'}}>
        <p style={{fontSize:'.68rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.09em',color:'#414754',marginBottom:'.75rem'}}>Step 1 — Select Phone Model</p>
        <Field label="Phone Model *">
          <select value={form.catalogId} onChange={e=>handleCatalogChange(e.target.value)} style={{...I,appearance:'none'}}>
            <option value="">Select from catalog…</option>
            {BRAND_ORDER.map(brand=>{
              const models=catalog.filter(c=>c.brand===brand)
              if(!models.length) return null
              return <optgroup key={brand} label={brand}>{models.map(c=><option key={c.id} value={c.id}>{c.model}</option>)}</optgroup>
            })}
          </select>
        </Field>
        {selectedCatalog&&(
          <div style={{marginTop:'.85rem',padding:'.85rem',background:'#fff',borderRadius:8,border:'1px solid #C1C6D6'}}>
            <p style={{fontSize:'.65rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.09em',color:'#005BBF',marginBottom:'.6rem'}}>✓ Specs auto-filled from catalog</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.35rem'}}>
              {SPEC_FIELDS.filter(f=>selectedCatalog[f.key]).map(f=>(
                <div key={f.key} style={{fontSize:'.75rem'}}><span style={{color:'#727785',fontWeight:600}}>{f.label}: </span>{selectedCatalog[f.key]}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{background:'#F2F4F6',borderRadius:12,padding:'1.25rem',marginBottom:'1.25rem',border:'1px solid #C1C6D6'}}>
        <p style={{fontSize:'.68rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.09em',color:'#414754',marginBottom:'.75rem'}}>Step 2 — Variant Details</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem',marginBottom:'.75rem'}}>
          <Field label="Colour *"><Sel value={form.color} onChange={e=>set('color',e.target.value)} options={colors} disabled={!selectedCatalog}/></Field>
          <Field label="Storage"><Sel value={form.storage} onChange={e=>set('storage',e.target.value)} options={STORAGE_OPTIONS}/></Field>
          <Field label="Condition"><Sel value={form.condition} onChange={e=>set('condition',e.target.value)} options={CONDITION_OPTIONS}/></Field>
          <Field label="Price (₦) *"><input type="number" value={form.price} onChange={e=>set('price',e.target.value)} placeholder="e.g. 580000" style={I}/></Field>
        </div>
      </div>

      <div style={{background:'#F2F4F6',borderRadius:12,padding:'1.25rem',marginBottom:'1.25rem',border:'1px solid #C1C6D6'}}>
        <p style={{fontSize:'.68rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.09em',color:'#414754',marginBottom:'.35rem'}}>Step 3 — Live In-Store Photos</p>
        <p style={{fontSize:'.75rem',color:'#727785',marginBottom:'.85rem'}}>
          Photos of <strong>this specific unit</strong> — the ones customers see first when they open the phone.
        </p>
        {(form.images||[]).length > 0 && (
          <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap',marginBottom:'.85rem'}}>
            {form.images.map((url,i)=>(
              <ImageThumb key={url+i} url={url} onRemove={()=>removePhoto(i)} label={i===0?'Main photo':undefined}/>
            ))}
          </div>
        )}
        <ImageUploader
          storagePath={variantStoragePath}
          onUploaded={handlePhotoUploaded}
          label={form.images?.length ? 'Add Another Photo' : 'Upload Photo (from camera or gallery)'}
          hint="First photo uploaded becomes the main display image."
        />
      </div>

      <div style={{display:'flex',gap:'.55rem'}}>
        <Btn onClick={submit} disabled={saving}>{saving?'⏳ Saving…':`✓ ${editPhone?'Update':'Add to Inventory'}`}</Btn>
        <Btn onClick={onCancel} variant="ghost">Cancel</Btn>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   TAB 4 — MANAGE COLOUR IMAGES
   - Only shows colours defined in the catalog entry
   - Each colour has Front / Back / Side tabs
   - colorImages shape: { [color]: { front: url|'', back: url|'', side: url|'' } }
═══════════════════════════════════════════════ */
function TabImages({catalog, phones, showToast}) {
  const [selId,       setSelId]       = useState('')
  const [colorImages, setColorImages] = useState({})
  const [activeView,  setActiveView]  = useState({})
  const [saving,      setSaving]      = useState(false)

  const selectedCatalog = catalog.find(c => c.id === selId)
  const catalogColors   = selectedCatalog?.availableColors?.filter(Boolean) || []

  const handleSelect = (id) => {
    setSelId(id)
    const cat = catalog.find(c => c.id === id)
    const raw = cat?.colorImages || {}
    const normalised = {}
    ;(cat?.availableColors || []).filter(Boolean).forEach(color => {
      const existing = raw[color]
      if (existing && typeof existing === 'object' && !Array.isArray(existing)) {
        normalised[color] = { front: existing.front||'', back: existing.back||'', side: existing.side||'' }
      } else {
        const arr = Array.isArray(existing) ? existing : []
        normalised[color] = { front: arr[0]||'', back: arr[1]||'', side: arr[2]||'' }
      }
    })
    setColorImages(normalised)
    const views = {}
    ;(cat?.availableColors || []).filter(Boolean).forEach(c => { views[c] = 'front' })
    setActiveView(views)
  }

  const setSlot = (color, slot, url) => {
    setColorImages(prev => ({
      ...prev,
      [color]: { ...(prev[color] || {front:'',back:'',side:''}), [slot]: url }
    }))
  }

  const clearSlot = (color, slot) => setSlot(color, slot, '')

  const saveAll = async () => {
    if (!selId) return
    setSaving(true)
    try {
      await updateCatalogColorImages(selId, colorImages)
      showToast('Colour images saved')
    } catch { showToast('Save failed — check Firestore rules', 'error') }
    finally { setSaving(false) }
  }

  const totalSlots = Object.values(colorImages).reduce((sum, v) => {
    return sum + (v.front?1:0) + (v.back?1:0) + (v.side?1:0)
  }, 0)

  const SLOTS = ['front', 'back', 'side']

  return (
    <div>
      <SectionHead
        title="Phone Images"
        subtitle="Upload Front, Back, and Side photos per colour. Only colours added in Catalog are shown."
      />

      <div style={{background:'#F2F4F6',borderRadius:12,padding:'1.25rem',marginBottom:'1.5rem',border:'1px solid #C1C6D6',maxWidth:480}}>
        <Lbl>Select Phone Model</Lbl>
        <select value={selId} onChange={e=>handleSelect(e.target.value)} style={{...I,appearance:'none'}}>
          <option value="">Choose a model…</option>
          {BRAND_ORDER.map(brand=>{
            const models=catalog.filter(c=>c.brand===brand)
            if(!models.length) return null
            return <optgroup key={brand} label={brand}>{models.map(c=><option key={c.id} value={c.id}>{c.model}</option>)}</optgroup>
          })}
        </select>
      </div>

      {!selId && (
        <div style={{textAlign:'center',padding:'3rem',color:'#727785',background:'#F2F4F6',borderRadius:12}}>
          <div style={{fontSize:36,marginBottom:'1rem'}}>🎨</div>
          <p style={{fontWeight:600}}>Select a model to manage its colour photos</p>
        </div>
      )}

      {selId && catalogColors.length === 0 && (
        <div style={{padding:'1.25rem',background:'#FEF7E0',border:'1.5px solid #FFB95F',borderRadius:10,fontSize:'.82rem',color:'#653E00'}}>
          ⚠️ No colours defined for this model. Go to <strong>Catalog</strong>, edit this model, and add colours first.
        </div>
      )}

      {selId && catalogColors.length > 0 && (
        <>
          {catalogColors.map(color => {
            const hex   = COLOR_HEX[color] || '#999'
            const light = ['White','Porcelain','Pearl','Snow','Starlight','Natural Titanium','Cream','Sand'].some(l=>color.includes(l))
            const imgs  = colorImages[color] || {front:'',back:'',side:''}
            const filled = SLOTS.filter(s=>imgs[s]).length
            const current = activeView[color] || 'front'

            return (
              <div key={color} style={{marginBottom:'1rem',border:'1px solid #C1C6D6',borderRadius:12,overflow:'hidden'}}>
                {/* Color header */}
                <div style={{display:'flex',alignItems:'center',gap:'.75rem',padding:'.65rem 1rem',background:filled===3?'#E6F4EA':'#F2F4F6',borderBottom:'1px solid #E6E8EA'}}>
                  <div style={{width:20,height:20,borderRadius:'50%',background:hex,flexShrink:0,border:light?'1.5px solid #C1C6D6':'none',boxShadow:'0 1px 3px rgba(0,0,0,.2)'}}/>
                  <span style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'.88rem',flex:1}}>{color}</span>
                  <span style={{fontSize:'.68rem',color:filled===3?'#137333':'#727785',fontWeight:600}}>{filled}/3 photos</span>
                </div>

                {/* Front / Back / Side tabs */}
                <div style={{display:'flex',borderBottom:'1px solid #E6E8EA',background:'#fff'}}>
                  {SLOTS.map(slot => {
                    const hasImg  = !!imgs[slot]
                    const isActive = current === slot
                    return (
                      <button key={slot}
                        onClick={() => setActiveView(prev=>({...prev,[color]:slot}))}
                        style={{flex:1,padding:'.42rem .5rem',border:'none',borderBottom:isActive?'2px solid #005BBF':'2px solid transparent',background:'transparent',fontFamily:'inherit',fontWeight:isActive?700:500,fontSize:'.78rem',color:isActive?'#005BBF':hasImg?'#137333':'#727785',cursor:'pointer',textTransform:'capitalize',display:'flex',alignItems:'center',justifyContent:'center',gap:'.3rem',transition:'color .12s'}}>
                        {hasImg ? '✓ ' : ''}{slot}
                      </button>
                    )
                  })}
                </div>

                {/* Active slot */}
                <div style={{padding:'.85rem 1rem',background:'#fff',display:'flex',alignItems:'flex-start',gap:'1rem'}}>
                  {/* Thumbnail */}
                  <div style={{width:70,height:88,background:'#F2F4F6',borderRadius:8,overflow:'hidden',border:'1px solid #E6E8EA',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {imgs[current]
                      ? <img src={imgs[current]} alt="" style={{width:'100%',height:'100%',objectFit:'contain'}} onError={e=>{e.target.style.display='none'}}/>
                      : <span style={{fontSize:22,opacity:.2}}>📱</span>
                    }
                  </div>
                  {/* Upload / remove */}
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{fontSize:'.7rem',color:'#727785',marginBottom:'.5rem',textTransform:'capitalize'}}>
                      {current} view{imgs[current]?' — replace below':''}
                    </p>
                    <ImageUploader
                      storagePath={`catalog/${selId}/${color.toLowerCase().replace(/\s+/g,'-')}/${current}`}
                      onUploaded={url => setSlot(color, current, url)}
                      label={imgs[current] ? `Replace ${current}` : `Upload ${current}`}
                      compact
                    />
                    {imgs[current] && (
                      <button onClick={() => clearSlot(color, current)}
                        style={{marginTop:'.4rem',background:'none',border:'none',color:'#C5221F',cursor:'pointer',fontSize:'.72rem',fontWeight:600,padding:0,fontFamily:'inherit'}}>
                        ✕ Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Sticky save bar */}
          <div style={{position:'sticky',bottom:24,background:'#fff',padding:'.85rem 1rem',borderRadius:12,boxShadow:'0 4px 20px rgba(0,0,0,.12)',border:'1px solid #C1C6D6',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'1rem',flexWrap:'wrap',marginTop:'1rem'}}>
            <p style={{fontSize:'.8rem',color:'#414754'}}>{totalSlots} photo{totalSlots!==1?'s':''} across {catalogColors.length} colour{catalogColors.length!==1?'s':''}</p>
            <Btn onClick={saveAll} disabled={saving}>{saving?'⏳ Saving…':'✓ Save All'}</Btn>
          </div>
        </>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   TAB 5 — EDIT PRICES
═══════════════════════════════════════════════ */
function TabPrices({phones, onSavePrice}) {
  const [prices,setPrices]=useState({})
  const [saving,setSaving]=useState({})
  const [done,  setDone]  =useState({})
  useEffect(()=>{const init={};phones.forEach(p=>{init[p.id]=p.price});setPrices(init)},[phones])
  const save=async(phone)=>{
    const np=Number(prices[phone.id])
    if(!np||np===phone.price) return
    setSaving(s=>({...s,[phone.id]:true}))
    try{await onSavePrice(phone.id,np);setDone(d=>({...d,[phone.id]:true}));setTimeout(()=>setDone(d=>({...d,[phone.id]:false})),2000)}
    catch{alert('Save failed')}
    finally{setSaving(s=>({...s,[phone.id]:false}))}
  }
  const allB=[...new Set(phones.map(p=>p.brand))]
  const ordered=[...BRAND_ORDER.filter(b=>allB.includes(b)),...allB.filter(b=>!BRAND_ORDER.includes(b))]
  return (
    <div>
      <p style={{color:'#414754',fontSize:'.82rem',marginBottom:'1.25rem',padding:'.85rem 1rem',background:'#E8F0FE',border:'1.5px solid #ADC7FF',borderRadius:10}}>Change any price and press <strong>Save</strong> or hit Enter.</p>
      {ordered.map(brand=>{
        const list=phones.filter(p=>p.brand===brand)
        if(!list.length) return null
        return (
          <div key={brand} style={{marginBottom:'2rem'}}>
            <div style={{display:'flex',alignItems:'center',gap:'.55rem',marginBottom:'.75rem',paddingBottom:'.45rem',borderBottom:'2px solid #E6E8EA'}}>
              <span>{BRAND_ICONS[brand]||'📱'}</span>
              <h3 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'.95rem'}}>{brand}</h3>
            </div>
            {list.map(p=>(
              <div key={p.id} style={{display:'flex',alignItems:'center',gap:'1rem',padding:'.55rem .85rem',background:'#fff',border:'1px solid #C1C6D6',borderRadius:10,marginBottom:'.3rem',flexWrap:'wrap'}}>
                <div style={{flex:1,minWidth:120}}>
                  <p style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'.875rem'}}>{p.name||p.model}</p>
                  <p style={{fontSize:'.72rem',color:'#414754'}}>{p.color} · {p.storage} · {p.condition}</p>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'.4rem'}}>
                  <span style={{fontSize:'.8rem',color:'#414754'}}>₦</span>
                  <input type="number" value={prices[p.id]||''} onChange={e=>setPrices(prev=>({...prev,[p.id]:e.target.value}))} style={{...I,width:130,textAlign:'right'}} onKeyDown={e=>e.key==='Enter'&&save(p)}/>
                  <button onClick={()=>save(p)} disabled={saving[p.id]} style={{background:done[p.id]?'#E6F4EA':'#005BBF',color:done[p.id]?'#137333':'#fff',border:'none',borderRadius:8,padding:'.35rem .8rem',fontFamily:'inherit',fontWeight:700,fontSize:'.78rem',cursor:'pointer',minWidth:50,transition:'background .2s'}}>
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

/* ── Inline site image helpers ── */
async function getSiteImages() {
  try {
    const { doc, getDoc } = await import('firebase/firestore')
    const { db } = await import('../lib/firebase')
    const snap = await getDoc(doc(db, 'settings', 'siteImages'))
    return snap.exists() ? snap.data() : {}
  } catch { return {} }
}
async function setSiteImage(key, url) {
  try {
    const { doc, setDoc } = await import('firebase/firestore')
    const { db } = await import('../lib/firebase')
    await setDoc(doc(db, 'settings', 'siteImages'), { [key]: url }, { merge: true })
  } catch { throw new Error('Failed to save') }
}
async function removeSiteImage(key) {
  try {
    const { doc, setDoc, getDoc } = await import('firebase/firestore')
    const { db } = await import('../lib/firebase')
    const snap = await getDoc(doc(db, 'settings', 'siteImages'))
    const current = snap.exists() ? snap.data() : {}
    const updated = { ...current }
    delete updated[key]
    await setDoc(doc(db, 'settings', 'siteImages'), updated)
  } catch { throw new Error('Failed to remove') }
}

/* ═══════════════════════════════════════════════
   TAB — SITE IMAGES
═══════════════════════════════════════════════ */
const SITE_IMAGE_SLOTS = [
  { key:'ownerPhoto', label:"Owner's Photo",    desc:'Shown on the About page beside the founder biography.', fallback:'/images/owner.jpg', hint:'Portrait orientation works best. Face should be clear and well-lit.', aspect:'4/3' },
  { key:'shopPhoto',  label:'Shop Photo',        desc:'Shown on the About page in the Shop section.',          fallback:'/images/shop.jpg',  hint:'Landscape photo of the shop front or interior.',                   aspect:'4/3' },
  { key:'pixelHero', label:'Pixel Hero Image',  desc:'Dark background section on the homepage — "Why Choose Pixel?"', fallback:'/images/pixel-hero.jpg', hint:'Dark or moody photo of a Pixel phone. Landscape orientation.', aspect:'4/3' },
]

function TabSiteImages({ showToast }) {
  const [images,  setImages]  = useState({})
  const [saving,  setSaving]  = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSiteImages().then(imgs => { setImages(imgs); setLoading(false) })
  }, [])

  const handleUploaded = async (key, url) => {
    setSaving(s => ({...s, [key]: true}))
    try {
      await setSiteImage(key, url)
      setImages(prev => ({...prev, [key]: url}))
      showToast('Image updated — live on site immediately')
    } catch { showToast('Save failed — check Firestore rules', 'error') }
    finally { setSaving(s => ({...s, [key]: false})) }
  }

  const handleRemove = async (key) => {
    if (!confirm('Remove this image? The site will fall back to the default.')) return
    setSaving(s => ({...s, [key]: true}))
    try {
      await removeSiteImage(key)
      setImages(prev => {const n={...prev}; delete n[key]; return n})
      showToast('Image removed — site is now using the default')
    } catch { showToast('Remove failed', 'error') }
    finally { setSaving(s => ({...s, [key]: false})) }
  }

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',gap:'.5rem',color:'#727785',fontSize:'.82rem',padding:'2rem 0'}}>
      <div style={{width:16,height:16,border:'2px solid #005BBF',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .6s linear infinite'}}/>
      Loading current images…
    </div>
  )

  return (
    <div>
      <SectionHead title="Site Images" subtitle="Upload or replace any image used on the website. Changes go live immediately."/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1.5rem'}}>
        {SITE_IMAGE_SLOTS.map(slot => {
          const currentUrl = images[slot.key] || slot.fallback
          const hasCustom  = !!images[slot.key]
          return (
            <div key={slot.key} style={{border:'1px solid #C1C6D6',borderRadius:14,overflow:'hidden',background:'#fff'}}>
              <div style={{aspectRatio:slot.aspect,background:'#F2F4F6',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                <img src={currentUrl} alt={slot.label} style={{width:'100%',height:'100%',objectFit:'cover'}}
                  onError={e=>{e.target.style.display='none'; e.target.parentNode.innerHTML='<span style="font-size:36px;opacity:.2">🖼</span>'}}/>
                <span style={{position:'absolute',top:8,right:8,background:hasCustom?'#E6F4EA':'#F2F4F6',color:hasCustom?'#137333':'#727785',fontSize:'.65rem',fontWeight:700,padding:'.18rem .55rem',borderRadius:999}}>
                  {hasCustom ? 'Custom ✓' : 'Default'}
                </span>
              </div>
              <div style={{padding:'1rem'}}>
                <p style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'.9rem',marginBottom:'.2rem'}}>{slot.label}</p>
                <p style={{fontSize:'.75rem',color:'#727785',marginBottom:'.85rem',lineHeight:1.5}}>{slot.desc}</p>
                <ImageUploader storagePath={`site/${slot.key}`} onUploaded={url => handleUploaded(slot.key, url)} label={hasCustom ? 'Replace Image' : 'Upload Image'} hint={slot.hint}/>
                {hasCustom && (
                  <button onClick={() => handleRemove(slot.key)} disabled={saving[slot.key]}
                    style={{marginTop:'.55rem',background:'none',border:'none',color:'#C5221F',cursor:'pointer',fontSize:'.75rem',fontWeight:600,padding:0,fontFamily:'inherit'}}>
                    ✕ Remove custom image (revert to default)
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   TAB — BANNERS
═══════════════════════════════════════════════ */
function TabBanners({ showToast }) {
  const [banners,  setBanners]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [deleting, setDeleting] = useState({})

  const load = async () => {
    setLoading(true)
    try { const items = await getBanners(); setBanners(items) }
    catch { showToast('Could not load banners', 'error') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleUploaded = async (url) => {
    try {
      const ref = await addBanner(url)
      setBanners(prev => [...prev, { id: ref.id, url }])
      showToast('Banner added')
    } catch { showToast('Failed to save banner', 'error') }
  }

  const handleDelete = async (banner) => {
    if (!confirm('Remove this banner?')) return
    setDeleting(d => ({ ...d, [banner.id]: true }))
    try {
      await deleteBanner(banner.id)
      setBanners(prev => prev.filter(b => b.id !== banner.id))
      showToast('Banner removed')
    } catch { showToast('Delete failed', 'error') }
    finally { setDeleting(d => { const n={...d}; delete n[banner.id]; return n }) }
  }

  return (
    <div>
      <SectionHead title="Banners" subtitle="Upload images that rotate on the homepage hero. They cycle automatically."/>
      <div style={{ maxWidth: 360, marginBottom: '2rem' }}>
        <ImageUploader storagePath="banners" onUploaded={handleUploaded} label="Upload New Banner" hint="Recommended size: 1000 × 900px."/>
      </div>
      {loading && (
        <div style={{ display:'flex', alignItems:'center', gap:'.5rem', color:'#727785', fontSize:'.82rem' }}>
          <div style={{ width:16, height:16, border:'2px solid #005BBF', borderTopColor:'transparent', borderRadius:'50%', animation:'spin .6s linear infinite' }}/>
          Loading banners…
        </div>
      )}
      {!loading && banners.length === 0 && (
        <div style={{ textAlign:'center', padding:'3rem', color:'#727785', background:'#F2F4F6', borderRadius:12 }}>
          <div style={{ fontSize:40, marginBottom:'1rem' }}>🖼</div>
          <p style={{ fontWeight:600, marginBottom:'.35rem' }}>No banners yet</p>
          <p style={{ fontSize:'.82rem' }}>Upload your first banner above</p>
        </div>
      )}
      {banners.length > 0 && (
        <div>
          <p style={{ fontSize:'.72rem', color:'#727785', marginBottom:'1rem' }}>{banners.length} banner{banners.length!==1?'s':''}</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'1rem' }}>
            {banners.map((b, i) => (
              <div key={b.id} style={{ border:'1px solid #C1C6D6', borderRadius:12, overflow:'hidden', background:'#fff', opacity:deleting[b.id]?.5:1, transition:'opacity .2s' }}>
                <div style={{ aspectRatio:'10/9', background:'#F2F4F6', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <img src={b.url} alt={`Banner ${i+1}`} style={{ width:'100%', height:'100%', objectFit:'cover' }}
                    onError={e => { e.target.style.display='none'; e.target.parentNode.style.background='#FCE8E6' }}/>
                </div>
                <div style={{ padding:'.65rem .85rem', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontSize:'.78rem', color:'#727785', fontWeight:600 }}>Banner {i+1}</span>
                  <button onClick={() => handleDelete(b)} disabled={deleting[b.id]}
                    style={{ background:'#FCE8E6', color:'#C5221F', border:'none', borderRadius:7, padding:'.28rem .7rem', fontFamily:'inherit', fontWeight:700, fontSize:'.75rem', cursor:'pointer' }}>
                    {deleting[b.id] ? '…' : 'Remove'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   TAB — ACCESSORIES
═══════════════════════════════════════════════ */
function TabAccessories({catalog, showToast}) {
  const [selId,       setSelId]       = useState('')
  const [accessories, setAccessories] = useState([])
  const [loading,     setLoading]     = useState(false)
  const [form,        setForm]        = useState({name:'', price:'', images:[]})
  const [editing,     setEditing]     = useState(null)
  const [saving,      setSaving]      = useState(false)

  const selectedCatalog = catalog.find(c => c.id === selId)

  const load = async (id) => {
    if (!id) { setAccessories([]); return }
    setLoading(true)
    try {
      const { getAccessoriesByCatalog } = await import('../lib/phones')
      const items = await getAccessoriesByCatalog(id)
      setAccessories(items)
    } catch { showToast('Could not load accessories','error') }
    finally { setLoading(false) }
  }

  const handleSelect = (id) => { setSelId(id); load(id); setForm({name:'',price:'',images:[]}); setEditing(null) }
  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  const handlePhotoUploaded = (url) => {
    if ((form.images||[]).length >= 3) return
    set('images', [...(form.images||[]), url])
  }
  const removePhoto = (idx) => set('images', form.images.filter((_,i)=>i!==idx))

  const handleSave = async () => {
    if (!form.name.trim()) { showToast('Enter accessory name','error'); return }
    if (!form.price)       { showToast('Enter a price','error'); return }
    setSaving(true)
    try {
      const data = { name:form.name.trim(), price:Number(form.price), images:form.images||[], catalogId:selId, phoneName:selectedCatalog?.model||'', brand:selectedCatalog?.brand||'' }
      if (editing) {
        await updateAccessory(editing.id, data)
        setAccessories(prev => prev.map(a => a.id===editing.id?{...a,...data}:a))
        showToast('Accessory updated')
      } else {
        const ref = await addAccessory(data)
        setAccessories(prev => [...prev, {id:ref.id,...data}])
        showToast('Accessory added')
      }
      setForm({name:'',price:'',images:[]}); setEditing(null)
    } catch { showToast('Save failed — check Firestore rules','error') }
    finally { setSaving(false) }
  }

  const handleEdit   = (acc) => { setEditing(acc); setForm({name:acc.name,price:acc.price,images:acc.images||[]}) }
  const handleDelete = async (acc) => {
    if (!confirm(`Delete "${acc.name}"?`)) return
    try {
      await deleteAccessory(acc.id)
      setAccessories(prev => prev.filter(a => a.id!==acc.id))
      showToast('Deleted')
    } catch { showToast('Delete failed','error') }
  }

  return (
    <div>
      <SectionHead title="Accessories" subtitle="Add accessories for each phone. They show on the phone detail page."/>
      <div style={{background:'#F2F4F6',borderRadius:12,padding:'1.25rem',marginBottom:'1.5rem',border:'1px solid #C1C6D6',maxWidth:480}}>
        <Lbl>Select Phone Model</Lbl>
        <select value={selId} onChange={e=>handleSelect(e.target.value)} style={{...I,appearance:'none'}}>
          <option value="">Choose a model…</option>
          {BRAND_ORDER.map(brand=>{
            const models=catalog.filter(c=>c.brand===brand)
            if(!models.length) return null
            return <optgroup key={brand} label={brand}>{models.map(c=><option key={c.id} value={c.id}>{c.model}</option>)}</optgroup>
          })}
        </select>
      </div>

      {selId && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2rem',alignItems:'start'}} className="acc-g">
          <div style={{background:'#F2F4F6',borderRadius:12,padding:'1.25rem',border:'1px solid #C1C6D6'}}>
            <p style={{fontSize:'.72rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.09em',color:'#414754',marginBottom:'.85rem'}}>{editing?'Edit Accessory':'Add Accessory'}</p>
            <div style={{display:'flex',flexDirection:'column',gap:'.65rem',marginBottom:'.85rem'}}>
              <Field label="Accessory Name *">
                <input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="e.g. Clear Case, USB-C Charger, Screen Protector" style={I}/>
              </Field>
              <Field label="Price (₦) *">
                <input type="number" value={form.price} onChange={e=>set('price',e.target.value)} placeholder="e.g. 5000" style={I}/>
              </Field>
            </div>
            <Lbl>Photos (up to 3)</Lbl>
            <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap',marginBottom:'.65rem'}}>
              {(form.images||[]).map((url,i)=>(
                <ImageThumb key={i} url={url} onRemove={()=>removePhoto(i)}/>
              ))}
            </div>
            {(form.images||[]).length < 3 && (
              <ImageUploader storagePath={`accessories/${selId}`} onUploaded={handlePhotoUploaded} label="Upload Photo" hint=""/>
            )}
            <div style={{display:'flex',gap:'.5rem',marginTop:'1rem'}}>
              <Btn onClick={handleSave} disabled={saving}>{saving?'⏳ Saving…':editing?'✓ Update':'+ Add'}</Btn>
              {editing && <Btn onClick={()=>{setEditing(null);setForm({name:'',price:'',images:[]})}} variant="ghost">Cancel</Btn>}
            </div>
          </div>

          <div>
            <p style={{fontSize:'.72rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.09em',color:'#414754',marginBottom:'.85rem'}}>
              {accessories.length} Accessor{accessories.length!==1?'ies':'y'} for {selectedCatalog?.model}
            </p>
            {loading && <p style={{color:'#727785',fontSize:'.82rem'}}>Loading…</p>}
            {!loading && accessories.length===0 && (
              <div style={{padding:'2rem',textAlign:'center',color:'#727785',background:'#F2F4F6',borderRadius:10,fontSize:'.82rem'}}>No accessories yet. Add one on the left.</div>
            )}
            {accessories.map(acc => (
              <div key={acc.id} style={{display:'flex',gap:'.75rem',alignItems:'center',padding:'.65rem .85rem',background:'#fff',border:'1px solid #C1C6D6',borderRadius:10,marginBottom:'.4rem',flexWrap:'wrap'}}>
                {acc.images?.[0] && (
                  <div style={{width:44,height:44,background:'#F2F4F6',borderRadius:8,overflow:'hidden',flexShrink:0}}>
                    <img src={acc.images[0]} alt="" style={{width:'100%',height:'100%',objectFit:'contain'}}/>
                  </div>
                )}
                <div style={{flex:1,minWidth:80}}>
                  <p style={{fontWeight:700,fontSize:'.875rem'}}>{acc.name}</p>
                  <p style={{fontSize:'.72rem',color:'#414754'}}>{formatPrice(acc.price)}</p>
                </div>
                <div style={{display:'flex',gap:'.35rem'}}>
                  <button onClick={()=>handleEdit(acc)} style={{background:'#E8F0FE',color:'#1967D2',border:'none',borderRadius:7,padding:'.28rem .7rem',fontFamily:'inherit',fontWeight:700,fontSize:'.75rem',cursor:'pointer'}}>Edit</button>
                  <button onClick={()=>handleDelete(acc)} style={{background:'#FCE8E6',color:'#C5221F',border:'none',borderRadius:7,padding:'.28rem .7rem',fontFamily:'inherit',fontWeight:700,fontSize:'.75rem',cursor:'pointer'}}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!selId && (
        <div style={{textAlign:'center',padding:'3rem',color:'#727785',background:'#F2F4F6',borderRadius:12}}>
          <div style={{fontSize:36,marginBottom:'1rem'}}>🎧</div>
          <p style={{fontWeight:600}}>Select a phone model to manage its accessories</p>
        </div>
      )}
      <style>{`@media(max-width:700px){.acc-g{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   LOGIN
═══════════════════════════════════════════════ */
function LoginScreen() {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [loading, setLoading] =useState(false)
  const [error,   setError]   =useState('')
  const login=async()=>{
    if(!username.trim()||!password){setError('Enter username and password');return}
    setLoading(true);setError('')
    try{await signInWithEmailAndPassword(auth,`${username.trim().toLowerCase()}${DOMAIN}`,password)}
    catch(err){
      if(['auth/user-not-found','auth/wrong-password','auth/invalid-credential'].includes(err.code)) setError('Wrong username or password')
      else if(err.code==='auth/too-many-requests') setError('Too many attempts. Try again later.')
      else setError('Login failed. Check your internet connection.')
    }finally{setLoading(false)}
  }
  return (
    <div className="pt" style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#F7F9FB'}}>
      <div style={{width:'100%',maxWidth:380,padding:'2.5rem',background:'#fff',borderRadius:20,border:'1px solid #C1C6D6',boxShadow:'0 4px 24px rgba(0,0,0,.08)'}}>
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <div style={{width:52,height:52,background:'#005BBF',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto .85rem',fontSize:24}}>📱</div>
          <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'1.25rem'}}>Nova Mobiles Plus</h1>
        </div>
        <div style={{marginBottom:'.75rem'}}><Lbl>Username</Lbl><input value={username} onChange={e=>{setUsername(e.target.value);setError('')}} placeholder="admin" style={I} onKeyDown={e=>e.key==='Enter'&&document.getElementById('adm-pw').focus()}/></div>
        <div style={{marginBottom:'1.25rem'}}><Lbl>Password</Lbl><input id="adm-pw" type="password" value={password} onChange={e=>{setPassword(e.target.value);setError('')}} placeholder="••••••••" style={I} onKeyDown={e=>e.key==='Enter'&&login()}/></div>
        {error&&<div style={{background:'#FCE8E6',color:'#C5221F',padding:'.6rem .85rem',borderRadius:8,fontSize:'.82rem',fontWeight:600,marginBottom:'1rem'}}>{error}</div>}
        <button onClick={login} disabled={loading} style={{width:'100%',background:loading?'#ADC7FF':'#005BBF',color:'#fff',border:'none',borderRadius:10,padding:'.75rem',fontFamily:'inherit',fontWeight:700,fontSize:'.95rem',cursor:loading?'default':'pointer'}}>
          {loading?'⏳ Signing in…':'Sign In'}
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════ */
export default function Admin() {
  const [user,   setUser]   = useState(undefined)
  const [phones, setPhones] = useState([])
  const [catalog,setCatalog]= useState([])
  const [loading,setLoading]= useState(true)
  const [saving, setSaving] = useState(false)
  const [tab,    setTab]    = useState('inventory')
  const [editing,setEditing]= useState(null)
  const {show, Toast} = useToast()

  useEffect(()=>{const unsub=onAuthStateChanged(auth,u=>setUser(u));return unsub},[])

  const load=async()=>{
    setLoading(true)
    try {
      const [p,cat]=await Promise.all([getAllPhones(),getAllCatalog()])
      setPhones(p);setCatalog(cat)
    } catch { show('Failed to load — check Firestore rules in Firebase Console','error') }
    finally { setLoading(false) }
  }
  useEffect(()=>{if(user) load()},[user])

  const handleSave=async(data)=>{
    setSaving(true)
    try{
      if(editing){await updatePhone(editing.id,data)}else{await addPhone(data)}
      setEditing(null);setTab('inventory');load()
      show(editing?'Variant updated':'Phone added to inventory')
    }catch{show('Save failed — check Firestore rules','error')}
    finally{setSaving(false)}
  }
  const handleSavePrice=async(id,price)=>{await updatePhone(id,{price});setPhones(prev=>prev.map(p=>p.id===id?{...p,price}:p))}
  const logout=async()=>{await signOut(auth);setPhones([]);setCatalog([]);setTab('inventory');setEditing(null)}

  if(user===undefined) return(
    <div className="pt" style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{width:28,height:28,border:'2.5px solid #005BBF',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .7s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
  if(!user) return <LoginScreen/>

  const TABS=[
    {id:'inventory',  label:`📦 Inventory (${phones.filter(p=>p.available).length})`},
    {id:'add',        label:editing?'✏️ Edit Variant':'➕ Add to Inventory'},
    {id:'prices',     label:'💰 Edit Prices'},
    {id:'catalog',    label:'📋 Catalog'},
    {id:'images',     label:'📸 Phone Images'},
    {id:'banners',    label:'🖼 Banners'},
    {id:'siteimages', label:'🌐 Site Images'},
    {id:'accessories',label:'🎧 Accessories'},
  ]

  return(
    <div className="pt" style={{paddingBottom:'5rem',background:'var(--bg)',minHeight:'100vh'}}>
      {Toast}
      <div style={{maxWidth:1280,margin:'0 auto',padding:'2rem 2.5rem'}}>
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'1.25rem',gap:'.55rem',alignItems:'center'}}>
          {loading&&<span style={{fontSize:'.78rem',color:'#727785'}}>⏳ Loading…</span>}
          <button onClick={load} style={{background:'#E8F0FE',color:'#1967D2',border:'none',borderRadius:8,padding:'.4rem .85rem',fontFamily:'inherit',fontWeight:600,fontSize:'.8rem',cursor:'pointer'}}>↻ Refresh</button>
          <button onClick={logout} style={{background:'#F2F4F6',color:'#191C1E',border:'1px solid #C1C6D6',borderRadius:8,padding:'.4rem .9rem',fontFamily:'inherit',fontWeight:600,fontSize:'.8rem',cursor:'pointer'}}>Sign Out</button>
        </div>
        <div style={{display:'flex',gap:'.3rem',marginBottom:'2rem',borderBottom:'1px solid #C1C6D6',paddingBottom:'.1rem',overflowX:'auto'}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>{setTab(t.id);if(t.id!=='add')setEditing(null)}}
              style={{padding:'.5rem .95rem',borderRadius:'8px 8px 0 0',border:`1px solid ${tab===t.id?'#C1C6D6':'transparent'}`,borderBottom:tab===t.id?'2px solid #005BBF':'1px solid transparent',background:tab===t.id?'#E8F0FE':'transparent',color:tab===t.id?'#005BBF':'#414754',fontWeight:tab===t.id?700:500,fontFamily:'inherit',fontSize:'.82rem',cursor:'pointer',whiteSpace:'nowrap',transition:'all .12s'}}>
              {t.label}
            </button>
          ))}
        </div>
        {tab==='inventory'  &&<TabInventory    phones={phones} setPhones={setPhones} onEdit={p=>{setEditing(p);setTab('add')}}/>}
        {tab==='catalog'    &&<TabCatalog      catalog={catalog} setCatalog={setCatalog} showToast={show}/>}
        {tab==='add'        &&<TabAddInventory catalog={catalog} editPhone={editing} onSave={handleSave} onCancel={()=>{setEditing(null);setTab('inventory')}} saving={saving}/>}
        {tab==='images'     &&<TabImages       catalog={catalog} phones={phones} showToast={show}/>}
        {tab==='prices'     &&<TabPrices       phones={phones} onSavePrice={handleSavePrice}/>}
        {tab==='banners'    &&<TabBanners      showToast={show}/>}
        {tab==='siteimages' &&<TabSiteImages   showToast={show}/>}
        {tab==='accessories'&&<TabAccessories  catalog={catalog} showToast={show}/>}
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}