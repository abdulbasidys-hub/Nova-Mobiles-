import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPhoneBySlug, getAllPhones } from '../lib/phones'
import { buildPhoneWhatsAppUrl, buildWhatsAppUrl, formatPrice } from '../lib/constants'
import ProductCard from '../components/ProductCard'

function buildLiveVideoUrl(phone) {
  const msg = `Hi Nova Mobiles Plus! I'm interested in the ${phone.name} (${phone.condition}, ${formatPrice(phone.price)}) and I'd like to request a live video of the phone. Is that possible?`
  return `https://wa.me/2348177777770?text=${encodeURIComponent(msg)}`
}

const ROWS = [
  { label:'Price',     fn:p => formatPrice(p.price) },
  { label:'Condition', fn:p => p.condition },
  { label:'Storage',   fn:p => p.storage || '—' },
  { label:'Color',     fn:p => p.color   || '—' },
  { label:'Display',   fn:p => p.specs?.display   || '—' },
  { label:'Processor', fn:p => p.specs?.processor || '—' },
  { label:'Camera',    fn:p => p.specs?.camera    || '—' },
  { label:'Battery',   fn:p => p.specs?.battery   || '—' },
  { label:'RAM',       fn:p => p.specs?.ram        || '—' },
  { label:'Status',    fn:p => p.available ? 'Available' : 'Sold' },
]

/* Compare modal */
function CompareModal({ basePhone, allPhones, onClose }) {
  const [selected, setSelected] = useState([])
  const [search,   setSearch]   = useState('')
  const [view,     setView]     = useState('pick')

  const pool     = allPhones.filter(p => p.slug !== basePhone.slug)
  const filtered = search ? pool.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())) : pool
  const toggle   = p => selected.find(s => s.slug === p.slug) ? setSelected(prev => prev.filter(s => s.slug !== p.slug)) : selected.length < 2 ? setSelected(prev => [...prev, p]) : null
  const list     = [basePhone, ...selected]

  return (
    <div style={{ position:'fixed', inset:0, zIndex:900, background:'rgba(0,0,0,.55)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background:'var(--surface-lowest)', borderRadius:20, width:'100%', maxWidth:840, maxHeight:'90vh', display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'var(--shadow-lg)' }}>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.25rem 1.5rem', borderBottom:'1px solid var(--outline-var)' }}>
          <div>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem' }}>Compare Phones</h2>
            <p style={{ fontSize:'.78rem', color:'var(--on-surface-var)', marginTop:'.15rem' }}>
              <span style={{ color:'var(--primary)', fontWeight:700 }}>{basePhone.name}</span> — pick up to 2 more
            </p>
          </div>
          <div style={{ display:'flex', gap:'.5rem', alignItems:'center' }}>
            {selected.length > 0 && (
              <button onClick={() => setView(v => v==='pick'?'table':'pick')} className={`btn btn-sm ${view==='table'?'btn-blue':'btn-outline-blue'}`}>
                {view==='table' ? '← Pick Phones' : `Compare ${list.length} →`}
              </button>
            )}
            <button onClick={onClose} style={{ width:34, height:34, borderRadius:8, background:'var(--surface-low)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize:18 }}>close</span>
            </button>
          </div>
        </div>

        {selected.length > 0 && view==='pick' && (
          <div style={{ padding:'.6rem 1.5rem', borderBottom:'1px solid var(--outline-var)', display:'flex', gap:'.4rem', flexWrap:'wrap', background:'var(--surface-low)' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:'.3rem', padding:'.2rem .65rem', background:'var(--primary)', borderRadius:999, fontSize:'.72rem', fontWeight:700, color:'#fff' }}>{basePhone.name}</span>
            {selected.map(p => (
              <button key={p.slug} onClick={() => toggle(p)} style={{ display:'inline-flex', alignItems:'center', gap:'.3rem', padding:'.2rem .65rem', background:'var(--primary-fixed)', border:'none', borderRadius:999, fontSize:'.72rem', fontWeight:600, color:'var(--on-primary-fixed)', cursor:'pointer' }}>
                {p.name} <span style={{ fontSize:13 }}>✕</span>
              </button>
            ))}
          </div>
        )}

        {view==='pick' && (
          <div style={{ flex:1, overflowY:'auto', padding:'1.25rem 1.5rem' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search phones…" style={{ marginBottom:'1rem', borderRadius:999 }} />
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'.75rem' }} className="modal-g">
              {filtered.map(p => {
                const sel = !!selected.find(s => s.slug === p.slug)
                const full= selected.length >= 2 && !sel
                return (
                  <button key={p.slug} onClick={() => !full && toggle(p)} style={{
                    display:'flex', alignItems:'center', gap:'.6rem',
                    padding:'.65rem .75rem', border:`2px solid ${sel?'var(--primary)':'var(--outline-var)'}`,
                    borderRadius:12, background: sel?'var(--primary-fixed)':'var(--surface-low)',
                    cursor: full?'not-allowed':'pointer', opacity: full?.45:1,
                    transition:'all .12s', textAlign:'left',
                  }}>
                    <div style={{ width:36, height:36, background:'var(--surface-mid)', borderRadius:8, overflow:'hidden', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      {p.images?.[0] ? <img src={p.images[0]} alt="" style={{ width:'100%', height:'100%', objectFit:'contain' }} />
                        : <span className="material-symbols-outlined" style={{ fontSize:18, opacity:.3 }}>smartphone</span>}
                    </div>
                    <div style={{ minWidth:0, flex:1 }}>
                      <p style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:'.82rem', lineHeight:1.2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', color: sel?'var(--primary)':'var(--on-surface)' }}>{p.name}</p>
                      <p style={{ fontSize:'.7rem', color:'var(--on-surface-var)', marginTop:'.1rem' }}>{formatPrice(p.price)}</p>
                    </div>
                    {sel && <span className="material-symbols-outlined" style={{ color:'var(--primary)', fontSize:18, flexShrink:0 }}>check_circle</span>}
                  </button>
                )
              })}
              {filtered.length === 0 && <p style={{ gridColumn:'1/-1', textAlign:'center', color:'var(--on-surface-var)', padding:'2rem 0', fontSize:'.875rem' }}>No phones found</p>}
            </div>
          </div>
        )}

        {view==='table' && (
          <div style={{ flex:1, overflowY:'auto' }}>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'.82rem', minWidth:480 }}>
                <thead>
                  <tr style={{ background:'var(--primary)' }}>
                    <th style={{ padding:'.65rem 1rem', textAlign:'left', color:'#fff', fontWeight:700, fontSize:'.7rem', textTransform:'uppercase', letterSpacing:'.07em', width:110 }}>Feature</th>
                    {list.map(p => (
                      <th key={p.slug} style={{ padding:'.65rem 1rem', textAlign:'left', color:'#fff', fontWeight:700, borderLeft:'1px solid rgba(255,255,255,.2)' }}>
                        <div style={{ fontFamily:'var(--font-display)', fontSize:'.9rem' }}>{p.name}</div>
                        {p.slug === basePhone.slug && <div style={{ fontSize:'.62rem', opacity:.75, marginTop:.1+'rem' }}>This phone</div>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map(({ label, fn }, i) => (
                    <tr key={label} style={{ borderBottom:'1px solid var(--outline-var)', background: i%2===0?'var(--surface-lowest)':'var(--surface-low)' }}>
                      <td style={{ padding:'.55rem 1rem', fontWeight:600, fontSize:'.7rem', textTransform:'uppercase', letterSpacing:'.06em', color:'var(--on-surface-var)', whiteSpace:'nowrap' }}>{label}</td>
                      {list.map(p => (
                        <td key={p.slug} style={{ padding:'.55rem 1rem', color:'var(--on-surface)', borderLeft:'1px solid var(--outline-var)', fontWeight: p.slug===basePhone.slug?600:400 }}>{fn(p)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div style={{ padding:'.75rem 1.5rem', borderTop:'1px solid var(--outline-var)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <p style={{ fontSize:'.72rem', color:'var(--on-surface-var)' }}>
            {selected.length === 0 ? 'Select at least 1 phone' : `Comparing ${list.length} phones`}
          </p>
          <div style={{ display:'flex', gap:'.5rem' }}>
            {selected.length > 0 && view==='pick' && <button onClick={() => setView('table')} className="btn btn-blue btn-sm">View Table →</button>}
            {view==='table' && <button onClick={() => setView('pick')} className="btn btn-ghost btn-sm">← Change</button>}
            <button onClick={onClose} className="btn btn-ghost btn-sm">Close</button>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:600px){.modal-g{grid-template-columns:1fr 1fr!important}}`}</style>
    </div>
  )
}

export default function PhoneDetail() {
  const { slug } = useParams()
  const [phone,    setPhone]    = useState(null)
  const [rel,      setRel]      = useState([])
  const [allPhones,setAllPhones]= useState([])
  const [load,     setLoad]     = useState(true)
  const [img,      setImg]      = useState(0)
  const [comparing,setComparing]= useState(false)

  useEffect(() => {
    setLoad(true); setImg(0); setComparing(false)
    getPhoneBySlug(slug).then(d => {
      setPhone(d); setLoad(false)
      if (d) getAllPhones().then(all => {
        setAllPhones(all)
        setRel(all.filter(p => p.brand === d.brand && p.slug !== slug && p.available).slice(0,4))
      })
    })
  }, [slug])

  if (load) return (
    <div className="pt" style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:32, height:32, border:'3px solid var(--primary)', borderTopColor:'transparent', borderRadius:'50%', animation:'spin .7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
  if (!phone) return (
    <div className="pt" style={{ minHeight:'80vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16 }}>
      <span className="material-symbols-outlined" style={{ fontSize:56, color:'var(--outline-var)' }}>search_off</span>
      <p style={{ color:'var(--on-surface-var)' }}>Phone not found.</p>
      <Link to="/shop" className="btn btn-blue btn-sm">← Back to Shop</Link>
    </div>
  )

  const sold   = !phone.available
  const images = phone.images || []
  const SPECS  = phone.specs ? [
    { icon:'tv', label:'Display',   val:phone.specs.display },
    { icon:'memory', label:'Processor', val:phone.specs.processor },
    { icon:'photo_camera', label:'Camera', val:phone.specs.camera },
    { icon:'battery_std', label:'Battery', val:phone.specs.battery },
    { icon:'storage', label:'RAM', val:phone.specs.ram },
    { icon:'storage', label:'Storage', val:phone.storage },
  ].filter(s => s.val) : []

  return (
    <div className="pt" style={{ paddingBottom:'5rem', background:'var(--bg)' }}>
      {comparing && <CompareModal basePhone={phone} allPhones={allPhones} onClose={() => setComparing(false)} />}

      {/* Breadcrumb */}
      <div style={{ background:'var(--surface-low)', borderBottom:'1px solid var(--outline-var)' }}>
        <div className="W" style={{ padding:'.7rem 2.5rem', display:'flex', alignItems:'center', gap:'.4rem', fontSize:'.78rem', color:'var(--on-surface-var)' }}>
          {[['/', 'Home'], ['/shop', 'Shop']].map(([to, l], i) => (
            <span key={to} style={{ display:'flex', alignItems:'center', gap:'.4rem' }}>
              {i > 0 && <span>/</span>}
              <Link to={to} style={{ color:'var(--on-surface-var)', textDecoration:'none', transition:'color .12s' }}
                onMouseEnter={e => e.currentTarget.style.color='var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color='var(--on-surface-var)'}>{l}</Link>
            </span>
          ))}
          <span>/</span>
          <span style={{ color:'var(--on-surface)' }}>{phone.name}</span>
        </div>
      </div>

      <div className="W" style={{ paddingTop:'2.5rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'7fr 5fr', gap:'3.5rem', marginBottom:'3rem', alignItems:'start' }} className="det-g">

          {/* ── GALLERY ───────────────────────────────────── */}
          <div style={{ display:'flex', gap:'1.25rem' }} className="gal-g">
            {/* Thumbnails — desktop side, mobile bottom */}
            <div style={{ display:'flex', flexDirection:'column', gap:'.75rem', flexShrink:0 }} className="thumbs-desk">
              {images.map((src,i) => (
                <button key={i} onClick={() => setImg(i)} style={{ width:70, height:88, borderRadius:10, border:`2px solid ${i===img?'var(--primary)':'var(--outline-var)'}`, overflow:'hidden', background:'var(--surface-low)', cursor:'pointer', padding:0, transition:'border-color .12s' }}>
                  <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div style={{ flex:1, aspectRatio:'4/5', background:'var(--surface-low)', borderRadius:20, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
              {images[img]
                ? <img src={images[img]} alt={phone.name} style={{ width:'85%', height:'85%', objectFit:'contain', transition:'transform .6s' }}
                    className="main-img" />
                : <span className="material-symbols-outlined" style={{ fontSize:80, opacity:.15, color:'var(--primary)' }}>smartphone</span>
              }
              {/* Condition badge */}
              <div style={{ position:'absolute', top:14, right:14 }}>
                <span style={{
                  padding:'.28rem .8rem', borderRadius:999,
                  fontSize:'.72rem', fontWeight:700,
                  background: phone.condition==='London Used' ? 'var(--tertiary-fixed)' : phone.condition==='Brand New' ? 'var(--st-new-bg)' : 'var(--secondary-container)',
                  color: phone.condition==='London Used' ? 'var(--on-tertiary-fixed)' : phone.condition==='Brand New' ? 'var(--st-new-ink)' : 'var(--on-secondary-container)',
                  fontFamily:'var(--font-body)', letterSpacing:'.04em', textTransform:'uppercase',
                }}>
                  {phone.condition}
                </span>
              </div>
            </div>

            {/* Thumbnails — mobile (row at bottom) */}
            {images.length > 1 && (
              <div style={{ display:'none' }} className="thumbs-mob">
                <div style={{ display:'flex', gap:'.5rem', flexWrap:'wrap', marginTop:'.75rem' }}>
                  {images.map((src,i) => (
                    <button key={i} onClick={() => setImg(i)} style={{ width:56, height:68, borderRadius:8, border:`2px solid ${i===img?'var(--primary)':'var(--outline-var)'}`, overflow:'hidden', background:'var(--surface-low)', cursor:'pointer', padding:0 }}>
                      <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── INFO + PURCHASE ────────────────────────────── */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
            {/* Brand + name */}
            <div>
              <span style={{ fontFamily:'var(--font-body)', fontSize:'.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em', color:'var(--primary)', display:'block', marginBottom:'.4rem' }}>
                Pixel Authority Exclusive
              </span>
              <h1 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(1.4rem,2.5vw,1.9rem)', letterSpacing:'-.02em', lineHeight:1.1, marginBottom:'.6rem' }}>{phone.name}</h1>
              {/* Price */}
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'.25rem' }}>
                <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.8rem', color:'var(--primary)', letterSpacing:'-.02em' }}>{formatPrice(phone.price)}</span>
              </div>
            </div>

            {/* Condition + battery panel */}
            <div style={{ background:'var(--surface-low)', borderRadius:14, padding:'1.1rem 1.25rem', display:'flex', flexDirection:'column', gap:'.85rem', border:'1px solid rgba(193,198,214,.3)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontFamily:'var(--font-body)', fontSize:'.82rem', color:'var(--on-surface-var)', fontWeight:500 }}>Condition Status</span>
                <span style={{ background:'var(--secondary-container)', color:'var(--on-secondary-container)', padding:'.22rem .7rem', borderRadius:8, fontFamily:'var(--font-body)', fontSize:'.72rem', fontWeight:600 }}>
                  {phone.condition}
                </span>
              </div>
              {phone.available
                ? <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontFamily:'var(--font-body)', fontSize:'.82rem', color:'var(--on-surface-var)', fontWeight:500 }}>Availability</span>
                    <span style={{ color:'var(--green)', fontWeight:700, fontSize:'.82rem', display:'flex', alignItems:'center', gap:'.3rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize:16, fontVariationSettings:"'FILL' 1" }}>check_circle</span>
                      In Stock
                    </span>
                  </div>
                : <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontFamily:'var(--font-body)', fontSize:'.82rem', color:'var(--on-surface-var)', fontWeight:500 }}>Availability</span>
                    <span style={{ color:'var(--error)', fontWeight:700, fontSize:'.82rem' }}>Sold</span>
                  </div>
              }
            </div>

            {/* CTAs */}
            <div style={{ display:'flex', flexDirection:'column', gap:'.75rem' }}>
              {phone.available ? (
                <>
                  <a href={buildPhoneWhatsAppUrl(phone)} target="_blank" rel="noopener noreferrer"
                    style={{
                      display:'flex', alignItems:'center', justifyContent:'center', gap:'.5rem',
                      background:'var(--green-wa)', color:'#fff',
                      height:56, borderRadius:14,
                      fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.05rem',
                      textDecoration:'none', transition:'transform .14s, box-shadow .14s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(37,211,102,.4)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}>
                    <span className="material-symbols-outlined" style={{ fontSize:22, fontVariationSettings:"'FILL' 1" }}>chat</span>
                    WhatsApp to Buy
                  </a>
                  {/* Secondary row */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.65rem' }}>
                    <a href={buildLiveVideoUrl(phone)} target="_blank" rel="noopener noreferrer"
                      style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'.4rem', height:48, border:'2px solid var(--primary)', borderRadius:12, color:'var(--primary)', fontFamily:'var(--font-body)', fontWeight:600, fontSize:'.82rem', textDecoration:'none', transition:'background .14s', background:'transparent' }}
                      onMouseEnter={e => e.currentTarget.style.background='var(--blue-tint)'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                      <span className="material-symbols-outlined" style={{ fontSize:16 }}>videocam</span>
                      Live Video
                    </a>
                    <button onClick={() => setComparing(true)}
                      style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'.4rem', height:48, border:'2px solid var(--outline-var)', borderRadius:12, color:'var(--on-surface)', fontFamily:'var(--font-body)', fontWeight:600, fontSize:'.82rem', background:'transparent', cursor:'pointer', transition:'border-color .14s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor='var(--primary)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor='var(--outline-var)'}>
                      <span className="material-symbols-outlined" style={{ fontSize:16 }}>compare</span>
                      Compare
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign:'center', padding:'1rem', background:'var(--error-container)', borderRadius:12 }}>
                  <p style={{ color:'var(--on-error-container)', fontWeight:600, fontSize:'.875rem', marginBottom:'.35rem' }}>This phone has been sold.</p>
                  <Link to="/shop" style={{ color:'var(--primary)', fontSize:'.8rem', fontWeight:600, textDecoration:'none' }}>Browse available phones →</Link>
                </div>
              )}
            </div>

            {/* Bento specs grid */}
            {SPECS.length > 0 && (
              <div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'.7rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'.1em', color:'var(--on-surface-var)', marginBottom:'.75rem' }}>Specifications</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.65rem' }}>
                  {SPECS.slice(0,4).map(({ icon, label, val }) => (
                    <div key={label} style={{ background:'var(--surface-high)', borderRadius:12, padding:'.85rem', border:'1px solid rgba(193,198,214,.2)', transition:'transform .2s var(--ease-bounce)' }}
                      onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
                      onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
                      <span className="material-symbols-outlined" style={{ color:'var(--primary)', fontSize:20, display:'block', marginBottom:'.35rem' }}>{icon}</span>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'.65rem', color:'var(--on-surface-var)', marginBottom:'.2rem', opacity:.8 }}>{label}</p>
                      <p style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'.82rem', color:'var(--on-surface)' }}>{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── NOVA TRANSPARENCY SECTION ─────────────────── */}
        <div style={{ background:'var(--surface-low)', borderRadius:20, padding:'2.5rem', marginBottom:'3rem', border:'1px solid var(--outline-var)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.25rem' }}>
            <span className="material-symbols-outlined" style={{ color:'var(--tertiary)', fontSize:36, fontVariationSettings:"'FILL' 1" }}>verified</span>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.2rem' }}>Nova Transparency Promise</h2>
          </div>
          <p style={{ color:'var(--on-surface-var)', fontSize:'.9rem', lineHeight:1.75, marginBottom:'1.25rem', maxWidth:640 }}>
            This unit is <strong style={{ color:'var(--on-surface)' }}>{phone.condition}</strong>.
            {phone.condition === 'London Used' && ' It has undergone a full diagnostic check before sale — screens, cameras, battery, and all hardware verified.'}
            {phone.condition === 'Brand New' && ' Sealed, untouched, with full original warranty.'}
            {phone.condition === 'Nigerian Used' && ' Inspected and tested by our team before listing.'}
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.75rem' }} className="trust-g">
            {[
              { icon:'check_circle', title:'Authentic Sourcing',   desc:'Directly sourced from verified suppliers.' },
              { icon:'check_circle', title:'Hardware Guaranteed', desc:'Original screens and internals. No modifications.' },
              { icon:'check_circle', title:'Warranty Included',    desc:'All phones come with our full warranty.' },
              { icon:'check_circle', title:'Returns Accepted',     desc:'Not satisfied? We accept returns.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ display:'flex', gap:'.75rem', alignItems:'flex-start', padding:'.85rem', background:'var(--surface-lowest)', borderRadius:12, border:'1px solid rgba(255,255,255,.5)' }}>
                <span className="material-symbols-outlined" style={{ color:'var(--primary)', fontSize:20, flexShrink:0, marginTop:2, fontVariationSettings:"'FILL' 1" }}>{icon}</span>
                <div>
                  <p style={{ fontWeight:600, fontSize:'.82rem', marginBottom:'.18rem' }}>{title}</p>
                  <p style={{ color:'var(--on-surface-var)', fontSize:'.75rem', lineHeight:1.5 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PHONE DESCRIPTION ─────────────────────────── */}
        <div style={{ marginBottom:'3rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2.5rem' }} className="mid-g">
          <div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'.7rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'.1em', color:'var(--on-surface-var)', marginBottom:'.65rem' }}>Phone Description</p>
            <div style={{ border:'1px solid var(--outline-var)', borderRadius:12, overflow:'hidden' }}>
              {[
                { l:'Brand',     v:phone.brand },
                { l:'Model',     v:phone.name },
                { l:'Storage',   v:phone.storage },
                { l:'Color',     v:phone.color },
                { l:'Condition', v:phone.condition },
                { l:'Price',     v:formatPrice(phone.price) },
                { l:'Status',    v:phone.available?'Available':'Sold' },
              ].filter(r => r.v).map(({ l, v }, i) => (
                <div key={l} style={{ display:'flex', borderBottom:'1px solid var(--outline-var)' }}>
                  <div style={{ width:100, flexShrink:0, padding:'.6rem .85rem', background:'var(--surface-low)', borderRight:'1px solid var(--outline-var)' }}>
                    <span style={{ fontSize:'.68rem', fontWeight:700, color:'var(--on-surface-var)', textTransform:'uppercase', letterSpacing:'.06em' }}>{l}</span>
                  </div>
                  <div style={{ padding:'.6rem .85rem', flex:1 }}>
                    <span style={{ fontSize:'.875rem', color:'var(--on-surface)', fontWeight: l==='Price'?700:500 }}>{v}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'.7rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'.1em', color:'var(--on-surface-var)', marginBottom:'.65rem' }}>Best For</p>
            <div style={{ display:'flex', gap:'.4rem', flexWrap:'wrap', marginBottom:'1.25rem' }}>
              {(phone.brand === 'Google Pixel'
                ? ['Photography','Pure Android','Long-term value','AI features']
                : phone.brand === 'iPhone'
                ? ['iOS ecosystem','Premium build','Resale value']
                : ['Performance','Everyday use','Value']).map(t => (
                <span key={t} className="st st-blue">{t}</span>
              ))}
            </div>
            {/* All specs table */}
            {phone.specs && Object.values(phone.specs).some(v => v) && (
              <div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'.7rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'.1em', color:'var(--on-surface-var)', marginBottom:'.65rem' }}>Full Specs</p>
                <div style={{ border:'1px solid var(--outline-var)', borderRadius:12, overflow:'hidden' }}>
                  {Object.entries(phone.specs).filter(([,v])=>v).map(([k,v],i)=>(
                    <div key={k} style={{ display:'flex', borderBottom:'1px solid var(--outline-var)', background: i%2===0?'var(--surface-lowest)':'var(--surface-low)' }}>
                      <div style={{ width:100, flexShrink:0, padding:'.55rem .85rem', borderRight:'1px solid var(--outline-var)' }}>
                        <span style={{ fontSize:'.68rem', fontWeight:700, color:'var(--on-surface-var)', textTransform:'capitalize', letterSpacing:'.04em' }}>{k}</span>
                      </div>
                      <div style={{ padding:'.55rem .85rem', flex:1 }}>
                        <span style={{ fontSize:'.82rem', color:'var(--on-surface)' }}>{v}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RELATED — peek slider ─────────────────────── */}
        {rel.length > 0 && (
          <div>
            <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem', marginBottom:'1.25rem' }}>You might also like</h3>
            <div className="peek-slider">
              {rel.map(p => (
                <div key={p.id} style={{ width:260, flexShrink:0 }}>
                  <ProductCard phone={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media(max-width:768px){
          .det-g { grid-template-columns:1fr!important; gap:2rem!important; }
          .gal-g { flex-direction:column-reverse!important; }
          .thumbs-desk { display:none!important; }
          .thumbs-mob { display:block!important; }
          .mid-g { grid-template-columns:1fr!important; gap:1.5rem!important; }
          .trust-g { grid-template-columns:1fr!important; }
        }
        .main-img:hover { transform:scale(1.04) }
      `}</style>
    </div>
  )
}
