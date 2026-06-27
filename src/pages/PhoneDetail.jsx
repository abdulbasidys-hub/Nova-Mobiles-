import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPhoneBySlug, getAllPhones, getCatalogById, getAccessoriesByCatalog } from '../lib/phones'
import { buildPhoneWhatsAppUrl, formatPrice } from '../lib/constants'
import ProductCard from '../components/ProductCard'

/* ── Color hex for swatches ──────────────────────── */
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

const isLightColor = (color) =>
  ['White','Porcelain','Pearl','Snow','Starlight','Moonlight','Natural Titanium','Cream','Sand','Silver'].some(l => color?.includes(l))

function buildLiveVideoUrl(phone) {
  const msg = `Hi Nova Mobiles Plus! I'd like to request a live video of the ${phone.name} in ${phone.color} (${phone.condition}). Is it available?`
  return `https://wa.me/2348177777770?text=${encodeURIComponent(msg)}`
}

/* ── Compare Modal ──────────────────────────────── */
const COMPARE_ROWS = [
  {label:'Price',     fn:p=>formatPrice(p.price)},
  {label:'Condition', fn:p=>p.condition},
  {label:'Storage',   fn:p=>p.storage||'—'},
  {label:'Color',     fn:p=>p.color||'—'},
  {label:'Display',   fn:p=>p.specs?.display||'—'},
  {label:'Camera',    fn:p=>p.specs?.camera||'—'},
  {label:'Battery',   fn:p=>p.specs?.battery||'—'},
  {label:'Status',    fn:p=>p.available?'Available':'Sold'},
]

function CompareModal({basePhone, allPhones, onClose}) {
  const [selected, setSelected] = useState([])
  const [search,   setSearch]   = useState('')
  const [view,     setView]     = useState('pick')
  const pool     = allPhones.filter(p=>p.slug!==basePhone.slug)
  const filtered = search?pool.filter(p=>p.name?.toLowerCase().includes(search.toLowerCase())||p.brand?.toLowerCase().includes(search.toLowerCase())):pool
  const toggle   = p=>selected.find(s=>s.slug===p.slug)?setSelected(prev=>prev.filter(s=>s.slug!==p.slug)):selected.length<2?setSelected(prev=>[...prev,p]):null
  const list     = [basePhone,...selected]
  const inp      = {background:'#F2F4F6',color:'#191C1E',border:'1.5px solid #C1C6D6',borderRadius:8,padding:'.55rem .8rem',fontSize:'.85rem',fontFamily:'inherit',outline:'none',width:'100%'}
  return (
    <div style={{position:'fixed',inset:0,zIndex:900,background:'rgba(0,0,0,.55)',display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'}}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:'var(--surface-lowest)',borderRadius:20,width:'100%',maxWidth:840,maxHeight:'90vh',display:'flex',flexDirection:'column',overflow:'hidden',boxShadow:'0 24px 48px rgba(0,0,0,.18)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'1.1rem 1.5rem',borderBottom:'1px solid var(--outline-var)'}}>
          <div>
            <h2 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'1.05rem'}}>Compare Phones</h2>
            <p style={{fontSize:'.75rem',color:'var(--on-surface-var)',marginTop:'.1rem'}}><span style={{color:'var(--primary)',fontWeight:700}}>{basePhone.name}</span> — pick up to 2 more</p>
          </div>
          <div style={{display:'flex',gap:'.5rem',alignItems:'center'}}>
            {selected.length>0&&<button onClick={()=>setView(v=>v==='pick'?'table':'pick')} style={{background:view==='table'?'var(--primary)':'var(--blue-tint)',color:view==='table'?'#fff':'var(--primary)',border:'1px solid var(--blue-ring)',borderRadius:8,padding:'.35rem .8rem',fontFamily:'inherit',fontWeight:700,fontSize:'.8rem',cursor:'pointer'}}>{view==='table'?'← Pick':'Compare '+list.length+' →'}</button>}
            <button onClick={onClose} style={{width:32,height:32,borderRadius:8,background:'var(--surface-low)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}><span className="material-symbols-outlined" style={{fontSize:18}}>close</span></button>
          </div>
        </div>
        {selected.length>0&&view==='pick'&&(
          <div style={{padding:'.55rem 1.5rem',borderBottom:'1px solid var(--outline-var)',display:'flex',gap:'.4rem',flexWrap:'wrap',background:'var(--surface-low)'}}>
            <span style={{display:'inline-flex',alignItems:'center',gap:'.3rem',padding:'.18rem .6rem',background:'var(--primary)',borderRadius:999,fontSize:'.7rem',fontWeight:700,color:'#fff'}}>{basePhone.name}</span>
            {selected.map(p=><button key={p.slug} onClick={()=>toggle(p)} style={{display:'inline-flex',alignItems:'center',gap:'.3rem',padding:'.18rem .6rem',background:'var(--primary-fixed)',border:'none',borderRadius:999,fontSize:'.7rem',fontWeight:600,color:'var(--on-primary-fixed)',cursor:'pointer'}}>{p.name} ✕</button>)}
          </div>
        )}
        {view==='pick'&&(
          <div style={{flex:1,overflowY:'auto',padding:'1.1rem 1.5rem'}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search phones…" style={{...inp,marginBottom:'1rem',borderRadius:999}}/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'.65rem'}} className="modal-g">
              {filtered.map(p=>{const sel=!!selected.find(s=>s.slug===p.slug);const full=selected.length>=2&&!sel;return(
                <button key={p.slug} onClick={()=>!full&&toggle(p)} style={{display:'flex',alignItems:'center',gap:'.55rem',padding:'.6rem .7rem',border:`2px solid ${sel?'var(--primary)':'var(--outline-var)'}`,borderRadius:12,background:sel?'var(--primary-fixed)':'var(--surface-low)',cursor:full?'not-allowed':'pointer',opacity:full?.45:1,transition:'all .12s',textAlign:'left'}}>
                  <div style={{width:34,height:34,background:'var(--surface-mid)',borderRadius:7,overflow:'hidden',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {p.images?.[0]?<img src={p.images[0]} alt="" style={{width:'100%',height:'100%',objectFit:'contain'}}/>:<span style={{fontSize:16,opacity:.3}}>📱</span>}
                  </div>
                  <div style={{minWidth:0,flex:1}}>
                    <p style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:'.8rem',lineHeight:1.2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',color:sel?'var(--primary)':'var(--on-surface)'}}>{p.name}</p>
                    <p style={{fontSize:'.7rem',color:'var(--on-surface-var)',marginTop:'.08rem'}}>{formatPrice(p.price)}</p>
                  </div>
                  {sel&&<span className="material-symbols-outlined" style={{color:'var(--primary)',fontSize:16,flexShrink:0,fontVariationSettings:"'FILL' 1"}}>check_circle</span>}
                </button>
              )})}
              {filtered.length===0&&<p style={{gridColumn:'1/-1',textAlign:'center',color:'var(--on-surface-var)',padding:'2rem 0',fontSize:'.875rem'}}>No phones found</p>}
            </div>
          </div>
        )}
        {view==='table'&&(
          <div style={{flex:1,overflowY:'auto'}}><div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'.82rem',minWidth:460}}>
              <thead><tr style={{background:'var(--primary)'}}>
                <th style={{padding:'.6rem 1rem',textAlign:'left',color:'#fff',fontWeight:700,fontSize:'.68rem',textTransform:'uppercase',letterSpacing:'.07em',width:100}}>Feature</th>
                {list.map(p=><th key={p.slug} style={{padding:'.6rem 1rem',textAlign:'left',color:'#fff',fontWeight:700,borderLeft:'1px solid rgba(255,255,255,.2)'}}>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'.88rem'}}>{p.name}</div>
                  {p.slug===basePhone.slug&&<div style={{fontSize:'.6rem',opacity:.75,marginTop:2}}>This phone</div>}
                </th>)}
              </tr></thead>
              <tbody>{COMPARE_ROWS.map(({label,fn},i)=>(
                <tr key={label} style={{borderBottom:'1px solid var(--outline-var)',background:i%2===0?'var(--surface-lowest)':'var(--surface-low)'}}>
                  <td style={{padding:'.5rem 1rem',fontWeight:600,fontSize:'.68rem',textTransform:'uppercase',letterSpacing:'.05em',color:'var(--on-surface-var)',whiteSpace:'nowrap'}}>{label}</td>
                  {list.map(p=><td key={p.slug} style={{padding:'.5rem 1rem',color:'var(--on-surface)',borderLeft:'1px solid var(--outline-var)',fontWeight:p.slug===basePhone.slug?600:400}}>{fn(p)}</td>)}
                </tr>
              ))}</tbody>
            </table>
          </div></div>
        )}
        <div style={{padding:'.65rem 1.5rem',borderTop:'1px solid var(--outline-var)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <p style={{fontSize:'.72rem',color:'var(--on-surface-var)'}}>{selected.length===0?'Select at least 1 phone':`Comparing ${list.length} phones`}</p>
          <div style={{display:'flex',gap:'.4rem'}}>
            {selected.length>0&&view==='pick'&&<button onClick={()=>setView('table')} style={{background:'var(--primary)',color:'#fff',border:'none',borderRadius:8,padding:'.35rem .8rem',fontFamily:'inherit',fontWeight:700,fontSize:'.78rem',cursor:'pointer'}}>View Table →</button>}
            {view==='table'&&<button onClick={()=>setView('pick')} style={{background:'var(--surface-low)',color:'var(--on-surface)',border:'1px solid var(--outline-var)',borderRadius:8,padding:'.35rem .8rem',fontFamily:'inherit',fontWeight:600,fontSize:'.78rem',cursor:'pointer'}}>← Change</button>}
            <button onClick={onClose} style={{background:'var(--surface-low)',color:'var(--on-surface)',border:'1px solid var(--outline-var)',borderRadius:8,padding:'.35rem .8rem',fontFamily:'inherit',fontWeight:600,fontSize:'.78rem',cursor:'pointer'}}>Close</button>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:580px){.modal-g{grid-template-columns:1fr 1fr!important}}`}</style>
    </div>
  )
}

/* ── Main Detail Page ───────────────────────────── */
export default function PhoneDetail() {
  const { slug } = useParams()
  const [phone,       setPhone]       = useState(null)
  const [catalog,     setCatalog]     = useState(null)  // catalog product
  const [rel,         setRel]         = useState([])
  const [allPhones,   setAllPhones]   = useState([])
  const [load,        setLoad]        = useState(true)
  const [imgIdx,      setImgIdx]      = useState(0)
  const [comparing,   setComparing]   = useState(false)
  const [selColor,    setSelColor]    = useState(null)
  const [accessories, setAccessories] = useState([])  // currently selected color

  useEffect(() => {
    setLoad(true); setImgIdx(0); setComparing(false); setSelColor(null)
    getPhoneBySlug(slug).then(async d => {
      setPhone(d); setLoad(false)
      if (d) {
        setSelColor(d.color)
        // Load catalog for specs + color images
        if (d.catalogId) {
          getCatalogById(d.catalogId).then(setCatalog)
          getAccessoriesByCatalog(d.catalogId).then(setAccessories).catch(()=>{})
        }
        getAllPhones().then(all => {
          setAllPhones(all)
          setRel(all.filter(p => p.brand===d.brand && p.slug!==slug && p.available).slice(0,6))
        })
      }
    })
  }, [slug])

  if (load) return (
    <div className="pt" style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{width:30,height:30,border:'2.5px solid var(--primary)',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .7s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
  if (!phone) return (
    <div className="pt" style={{minHeight:'80vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16}}>
      <span className="material-symbols-outlined" style={{fontSize:56,color:'var(--outline-var)'}}>search_off</span>
      <p style={{color:'var(--on-surface-var)'}}>Phone not found.</p>
      <Link to="/shop" style={{background:'var(--primary)',color:'#fff',padding:'.5rem 1.25rem',borderRadius:8,textDecoration:'none',fontWeight:600,fontSize:'.875rem'}}>← Back to Shop</Link>
    </div>
  )

  const sold = !phone.available

  // Color images from catalog
  const colorImages  = catalog?.colorImages || {}
  const colorOptions = Object.keys(colorImages)

  // Normalise colorImages — may be {front,back,side,extra} object or legacy array
  const getColorImageArray = (color) => {
    const val = colorImages[color]
    if (!val) return []
    if (Array.isArray(val)) return val.filter(Boolean)
    return Object.values(val).filter(Boolean)  // front, back, side, extra
  }

  const currentImages = selColor && getColorImageArray(selColor).length
    ? getColorImageArray(selColor)
    : phone.images?.length
    ? phone.images
    : []

  // Specs table — merge phone specs + catalog specs, no price/status/condition
  const specs = phone.specs || {}
  const specRows = [
    {label:'Brand',       value: phone.brand},
    {label:'Model',       value: phone.name || phone.model},
    {label:'Storage',     value: phone.storage},
    {label:'Color',       value: selColor || phone.color},   // ← updates with selected color
    {label:'Network',     value: phone.network},
    {label:'Display',     value: specs.display || catalog?.display},
    {label:'Rear Camera',  value: specs.camera || catalog?.camera, multiline:true},
    {label:'Front Camera', value: specs.frontCamera || catalog?.frontCamera, multiline:true},
    {label:'Battery',     value: specs.battery || catalog?.battery},
    {label:'Charging',    value: specs.charging || catalog?.charging},
    {label:'OS',          value: specs.os || catalog?.os},
    {label:'Dimensions',  value: catalog?.dimensions},
    {label:'Weight',      value: catalog?.weight},
  ].filter(r => r.value)

  return (
    <div className="pt" style={{paddingBottom:'5rem',background:'var(--bg)'}}>
      {comparing && <CompareModal basePhone={phone} allPhones={allPhones} onClose={()=>setComparing(false)}/>}

      {/* Breadcrumb */}
      <div style={{background:'var(--surface-low)',borderBottom:'1px solid var(--outline-var)'}}>
        <div style={{maxWidth:1280,margin:'0 auto',padding:'.65rem 2.5rem',display:'flex',alignItems:'center',gap:'.4rem',fontSize:'.78rem',color:'var(--on-surface-var)'}}>
          {[['/', 'Home'],['/shop','Shop']].map(([to,l],i)=>(
            <span key={to} style={{display:'flex',alignItems:'center',gap:'.4rem'}}>
              {i>0&&<span>/</span>}
              <Link to={to} style={{color:'var(--on-surface-var)',textDecoration:'none'}} onMouseEnter={e=>e.target.style.color='var(--primary)'} onMouseLeave={e=>e.target.style.color='var(--on-surface-var)'}>{l}</Link>
            </span>
          ))}
          <span>/</span>
          <span style={{color:'var(--on-surface)'}}>{phone.name || phone.model}</span>
        </div>
      </div>

      <div style={{maxWidth:1280,margin:'0 auto',padding:'2rem 2.5rem'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1.35fr',gap:'3rem',alignItems:'start',marginBottom:'2.5rem'}} className="det-g">

          {/* ── LEFT: gallery + actions ─────────────── */}
          <div>
            {/* Main image */}
            <div style={{background:'var(--surface-low)',borderRadius:18,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',marginBottom:'.65rem',aspectRatio:'4/5'}}>
              {currentImages[imgIdx]
                ? <img src={currentImages[imgIdx]} alt={phone.name} style={{width:'90%',height:'90%',objectFit:'contain',transition:'opacity .25s'}} key={`${selColor}-${imgIdx}`}/>
                : <span className="material-symbols-outlined" style={{fontSize:72,opacity:.12,color:'var(--primary)'}}>smartphone</span>
              }
              {/* Condition badge */}
              <div style={{position:'absolute',top:12,right:12}}>
                <span style={{padding:'.22rem .75rem',borderRadius:999,fontSize:'.68rem',fontWeight:700,letterSpacing:'.04em',textTransform:'uppercase',fontFamily:'var(--font-body)',background:phone.condition==='Brand New'?'var(--st-new-bg)':phone.condition==='London Used'?'var(--tertiary-fixed)':'var(--secondary-container)',color:phone.condition==='Brand New'?'var(--st-new-ink)':phone.condition==='London Used'?'var(--on-tertiary-fixed)':'var(--on-secondary-container)'}}>
                  {phone.condition}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {currentImages.length > 1 && (
              <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:'1rem'}}>
                {currentImages.map((src,i) => (
                  <button key={i} onClick={()=>setImgIdx(i)} style={{width:54,height:68,padding:0,borderRadius:10,overflow:'hidden',border:`2px solid ${i===imgIdx?'var(--primary)':'var(--outline-var)'}`,background:'var(--surface-low)',cursor:'pointer',transition:'border-color .12s',flexShrink:0}}>
                    <img src={src} alt="" style={{width:'100%',height:'100%',objectFit:'contain'}}/>
                  </button>
                ))}
              </div>
            )}

            {/* ── Color selector ───────────────────── */}
            {colorOptions.length > 0 && (
              <div style={{marginBottom:'1rem'}}>
                <p style={{fontSize:'.68rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.09em',color:'var(--on-surface-var)',marginBottom:'.5rem'}}>
                  Colour — <span style={{color:'var(--primary)',fontWeight:700}}>{selColor}</span>
                </p>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {colorOptions.map(color => {
                    const hex     = COLOR_HEX[color] || '#999'
                    const isLight = isLightColor(color)
                    const isSel   = selColor === color
                    return (
                      <button key={color} title={color}
                        onClick={() => { setSelColor(color); setImgIdx(0) }}
                        style={{
                          width:32, height:32, borderRadius:'50%', cursor:'pointer',
                          background: hex,
                          border: isSel ? '3px solid var(--primary)' : isLight ? '2px solid var(--outline-var)' : '2px solid transparent',
                          boxShadow: isSel ? '0 0 0 2px white, 0 0 0 4px var(--primary)' : '0 1px 4px rgba(0,0,0,.2)',
                          transition: 'transform .14s, box-shadow .14s',
                          flexShrink: 0,
                          padding: 0,
                        }}
                        onMouseEnter={e=>e.currentTarget.style.transform='scale(1.15)'}
                        onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                      />
                    )
                  })}
                </div>
                {!colorImages[selColor]?.length && selColor && (
                  <p style={{fontSize:'.72rem',color:'var(--outline)',marginTop:'.35rem'}}>No images uploaded for {selColor} yet</p>
                )}
              </div>
            )}

            {/* ── Action buttons ───────────────────── */}
            <div style={{display:'flex',flexDirection:'column',gap:'.6rem'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'.6rem .85rem',background:'var(--surface-low)',borderRadius:10,border:'1px solid var(--outline-var)'}}>
                <span style={{fontSize:'.8rem',color:'var(--on-surface-var)',fontWeight:500}}>Availability</span>
                <span style={{display:'flex',alignItems:'center',gap:'.3rem',fontWeight:700,fontSize:'.82rem',color:phone.available?'var(--green)':'var(--error)'}}>
                  <span className="material-symbols-outlined" style={{fontSize:15,fontVariationSettings:"'FILL' 1"}}>{phone.available?'check_circle':'cancel'}</span>
                  {phone.available?'In Stock':'Sold'}
                </span>
              </div>

              {phone.available ? (
                <>
                  <a href={buildPhoneWhatsAppUrl(phone)} target="_blank" rel="noopener noreferrer"
                    style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'.5rem',background:'#25D366',color:'#fff',height:52,borderRadius:12,fontFamily:'var(--font-display)',fontWeight:700,fontSize:'1rem',textDecoration:'none',transition:'transform .14s,box-shadow .14s'}}
                    onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(37,211,102,.4)'}}
                    onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
                    <span className="material-symbols-outlined" style={{fontSize:20,fontVariationSettings:"'FILL' 1"}}>chat</span>
                    Buy
                  </a>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.5rem'}}>
                    <a href={buildLiveVideoUrl(phone)} target="_blank" rel="noopener noreferrer"
                      style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'.4rem',height:44,border:'2px solid var(--outline-var)',borderRadius:10,color:'var(--on-surface)',fontFamily:'var(--font-body)',fontWeight:600,fontSize:'.82rem',textDecoration:'none',transition:'border-color .14s',background:'transparent'}}
                      onMouseEnter={e=>e.currentTarget.style.borderColor='var(--primary)'}
                      onMouseLeave={e=>e.currentTarget.style.borderColor='var(--outline-var)'}>
                      <span className="material-symbols-outlined" style={{fontSize:16}}>videocam</span>
                      Live Video
                    </a>
                    <button onClick={()=>setComparing(true)}
                      style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'.4rem',height:44,border:'2px solid var(--outline-var)',borderRadius:10,color:'var(--on-surface)',fontFamily:'var(--font-body)',fontWeight:600,fontSize:'.82rem',background:'transparent',cursor:'pointer',transition:'border-color .14s'}}
                      onMouseEnter={e=>e.currentTarget.style.borderColor='var(--primary)'}
                      onMouseLeave={e=>e.currentTarget.style.borderColor='var(--outline-var)'}>
                      <span className="material-symbols-outlined" style={{fontSize:16}}>compare</span>
                      Compare
                    </button>
                  </div>
                </>
              ) : (
                <div style={{textAlign:'center',padding:'1rem',background:'var(--error-container)',borderRadius:12}}>
                  <p style={{color:'var(--on-error-container)',fontWeight:600,fontSize:'.875rem',marginBottom:'.3rem'}}>This phone has been sold.</p>
                  <Link to="/shop" style={{color:'var(--primary)',fontSize:'.8rem',fontWeight:600,textDecoration:'none'}}>Browse available phones →</Link>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: name + price + specs ─────────── */}
          <div>
            <h1 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'clamp(1.5rem,2.5vw,2rem)',letterSpacing:'-.02em',lineHeight:1.1,marginBottom:'.65rem'}}>
              {phone.name || phone.model}
            </h1>
            <div style={{marginBottom:'1.5rem'}}>
              <span style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'1.85rem',color:'var(--primary)',letterSpacing:'-.02em'}}>
                {formatPrice(phone.price)}
              </span>
            </div>

            {/* Specs table */}
            {specRows.length > 0 && (
              <div style={{border:'1px solid var(--outline-var)',borderRadius:14,overflow:'hidden',marginBottom:'1.25rem'}}>
                <div style={{padding:'.5rem .9rem',background:'var(--primary)',display:'flex',alignItems:'center',gap:'.5rem'}}>
                  <span className="material-symbols-outlined" style={{fontSize:15,color:'rgba(255,255,255,.85)'}}>smartphone</span>
                  <span style={{fontFamily:'var(--font-body)',fontSize:'.68rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:'#fff'}}>Full Specifications</span>
                </div>
                {specRows.map(({label,value,multiline},i) => {
                  const lines = multiline && value ? value.split('\n').filter(l=>l.trim()) : null
                  return (
                  <div key={label} style={{display:'flex',borderBottom:i<specRows.length-1?'1px solid var(--outline-var)':'none',background:i%2===0?'var(--surface-lowest)':'var(--surface-low)'}}>
                    <div style={{width:120,flexShrink:0,padding:'.58rem .9rem',borderRight:'1px solid var(--outline-var)',paddingTop: lines?.length > 1 ? '.7rem' : '.58rem'}}>
                      <span style={{fontFamily:'var(--font-body)',fontSize:'.7rem',fontWeight:700,color:'var(--on-surface-var)',textTransform:'uppercase',letterSpacing:'.06em'}}>{label}</span>
                      {lines?.length > 1 && (
                        <div style={{fontSize:'.62rem',color:'var(--primary)',fontWeight:700,marginTop:'.2rem'}}>
                          {lines.length === 2 ? 'Dual' : lines.length === 3 ? 'Triple' : lines.length === 4 ? 'Quad' : lines.length + '×'}
                        </div>
                      )}
                    </div>
                    <div style={{padding:'.58rem .9rem',flex:1}}>
                      {lines?.length > 1 ? (
                        <div style={{display:'flex',flexDirection:'column',gap:'.35rem'}}>
                          {lines.map((line,li) => (
                            <div key={li} style={{display:'flex',alignItems:'flex-start',gap:'.5rem',fontSize:'.82rem',color:'var(--on-surface)',fontWeight:500}}>
                              <span style={{width:6,height:6,borderRadius:'50%',background:'var(--primary)',flexShrink:0,marginTop:6}}/>
                              {line.trim()}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span style={{
                          fontFamily:'var(--font-body)',fontSize:'.875rem',
                          color: label==='Color' ? 'var(--primary)' : 'var(--on-surface)',
                          fontWeight: label==='Color' ? 700 : 500,
                        }}>
                          {label==='Color' && (
                            <span style={{display:'inline-flex',alignItems:'center',gap:'.4rem'}}>
                              <span style={{width:14,height:14,borderRadius:'50%',background:COLOR_HEX[value]||'#999',display:'inline-block',border:isLightColor(value)?'1px solid var(--outline-var)':'none',flexShrink:0}} />
                              {value}
                            </span>
                          )}
                          {label!=='Color' && value}
                        </span>
                      )}
                    </div>
                  </div>
                  )
                })}
              </div>
            )}

            {/* Best For */}
            <div style={{marginBottom:'1rem'}}>
              <p style={{fontFamily:'var(--font-body)',fontSize:'.68rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:'var(--on-surface-var)',marginBottom:'.5rem'}}>Best For</p>
              <div style={{display:'flex',gap:'.4rem',flexWrap:'wrap'}}>
                {(phone.brand==='Google Pixel'?['Photography','Pure Android','Long-term value','AI features']:phone.brand==='iPhone'?['iOS ecosystem','Premium build','Resale value']:['Performance','Everyday use','Value']).map(t=>(
                  <span key={t} style={{background:'var(--blue-tint)',color:'var(--primary)',padding:'.2rem .65rem',borderRadius:999,fontSize:'.7rem',fontWeight:600}}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transparency */}
        <div style={{background:'var(--surface-low)',borderRadius:20,padding:'2rem 2.25rem',marginBottom:'3rem',border:'1px solid var(--outline-var)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'.85rem',marginBottom:'1.1rem'}}>
            <span className="material-symbols-outlined" style={{color:'var(--tertiary)',fontSize:32,fontVariationSettings:"'FILL' 1"}}>verified</span>
            <h2 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'1.1rem'}}>Nova Transparency Promise</h2>
          </div>
          <p style={{color:'var(--on-surface-var)',fontSize:'.875rem',lineHeight:1.75,marginBottom:'1.25rem',maxWidth:640}}>
            This unit is <strong style={{color:'var(--on-surface)'}}>{phone.condition}</strong>.{' '}
            {phone.condition==='London Used'&&'Fully tested and inspected — screens, cameras, battery, and all internals verified before sale.'}
            {phone.condition==='Brand New'&&'Sealed, untouched, with full original manufacturer warranty.'}
            {phone.condition==='Nigerian Used'&&'Inspected and tested by our team before listing.'}
          </p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.65rem'}} className="trust-g">
            {[{t:'Authentic Sourcing',d:'Directly sourced from verified suppliers.'},{t:'Hardware Verified',d:'Original screens and internals. No modifications.'},{t:'Warranty Included',d:'All phones come with our full warranty.'},{t:'Returns Accepted',d:'Not satisfied? We accept returns.'}].map(({t,d})=>(
              <div key={t} style={{display:'flex',gap:'.65rem',alignItems:'flex-start',padding:'.8rem',background:'var(--surface-lowest)',borderRadius:12}}>
                <span className="material-symbols-outlined" style={{color:'var(--primary)',fontSize:18,flexShrink:0,marginTop:2,fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                <div>
                  <p style={{fontWeight:600,fontSize:'.82rem',marginBottom:'.18rem'}}>{t}</p>
                  <p style={{color:'var(--on-surface-var)',fontSize:'.75rem',lineHeight:1.5}}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accessories */}
        {accessories.length > 0 && (
          <div style={{marginBottom:'3rem'}}>
            <h3 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'1.05rem',marginBottom:'1.1rem'}}>
              Accessories for this phone
            </h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'1rem'}}>
              {accessories.map(acc => (
                <div key={acc.id} style={{border:'1px solid var(--outline-var)',borderRadius:12,overflow:'hidden',background:'var(--surface-lowest)'}}>
                  <div style={{aspectRatio:'1/1',background:'var(--surface-low)',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                    {acc.images?.[0]
                      ? <img src={acc.images[0]} alt={acc.name} style={{width:'100%',height:'100%',objectFit:'contain',padding:'8%'}}/>
                      : <span className="material-symbols-outlined" style={{fontSize:40,opacity:.2}}>cable</span>
                    }
                  </div>
                  <div style={{padding:'.65rem .75rem'}}>
                    <p style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'.85rem',marginBottom:'.2rem'}}>{acc.name}</p>
                    <p style={{color:'var(--primary)',fontWeight:700,fontSize:'.9rem'}}>{formatPrice(acc.price)}</p>
                    {acc.images?.length > 1 && (
                      <div style={{display:'flex',gap:4,marginTop:'.4rem'}}>
                        {acc.images.slice(1).map((img,i)=>(
                          <div key={i} style={{width:28,height:28,borderRadius:4,overflow:'hidden',border:'1px solid var(--outline-var)'}}>
                            <img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'contain'}}/>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {rel.length>0&&(
          <div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.1rem'}}>
              <h3 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'1.05rem'}}>You might also like</h3>
              <Link to="/shop" style={{color:'var(--primary)',fontSize:'.8rem',fontWeight:600,textDecoration:'none'}}>All phones →</Link>
            </div>
            <div style={{display:'flex',overflowX:'auto',gap:'1rem',paddingBottom:8,scrollSnapType:'x mandatory',msOverflowStyle:'none',scrollbarWidth:'none'}} className="rel-scroll">
              {rel.map(p=><div key={p.id} style={{width:180,flexShrink:0,scrollSnapAlign:'start'}}><ProductCard phone={p}/></div>)}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media(max-width:768px){.det-g{grid-template-columns:1fr!important;gap:1.75rem!important}.trust-g{grid-template-columns:1fr!important}}
        .rel-scroll::-webkit-scrollbar{display:none}
      `}</style>
    </div>
  )
}