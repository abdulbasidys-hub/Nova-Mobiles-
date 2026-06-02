import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../lib/constants'

const COND_STYLE = {
  'Brand New':     { background:'var(--st-new-bg)',    color:'var(--st-new-ink)' },
  'London Used':   { background:'var(--st-london-bg)', color:'var(--st-london-ink)' },
  'Nigerian Used': { background:'var(--st-avail-bg)',  color:'var(--st-avail-ink)' },
}

/* Phone image: try /images/phones/{slug}.jpg first, then phone.images[0] */
function PhoneImg({ phone }) {
  const [src, setSrc] = useState(`/images/phones/${phone.slug}.jpg`)
  const [tried, setTried] = useState(false)

  const handleError = () => {
    if (!tried && phone.images?.[0]) {
      setSrc(phone.images[0])
      setTried(true)
    } else {
      setSrc(null)
    }
  }

  if (!src) return (
    <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', opacity:.2 }}>
      <span className="material-symbols-outlined" style={{ fontSize:64 }}>smartphone</span>
    </div>
  )

  return <img src={src} alt={phone.name} onError={handleError}
    style={{ maxWidth:'85%', maxHeight:'85%', objectFit:'contain', transition:'transform .5s var(--ease)' }} />
}

import { useState } from 'react'

export default function ProductCard({ phone }) {
  const navigate = useNavigate()
  const sold = !phone.available
  const condStyle = COND_STYLE[phone.condition] || COND_STYLE['Brand New']

  return (
    <article onClick={() => navigate(`/shop/${phone.slug}`)}
      style={{
        background: 'var(--surface-lowest)',
        border: '1px solid rgba(193,198,214,0.35)',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '1.25rem',
        opacity: sold ? .65 : 1,
        transition: 'transform .35s cubic-bezier(0.4,0,0.2,1), box-shadow .35s',
        boxShadow: '0 1px 3px rgba(60,64,67,.08)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-8px)'
        e.currentTarget.style.boxShadow = '0 20px 28px -5px rgba(0,0,0,.09)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(60,64,67,.08)'
      }}
    >
      {/* Name + subtitle at top */}
      <div style={{ padding:'0 1.25rem', marginBottom:'1rem' }}>
        <h4 style={{
          fontFamily:'var(--font-display)', fontWeight:600,
          fontSize:'1rem', lineHeight:1.25,
          color:'var(--on-surface)', marginBottom:'.2rem',
          transition:'color .14s',
        }}>{phone.name}</h4>
        <p style={{ fontSize:'.72rem', color:'var(--on-surface-var)', fontFamily:'var(--font-body)' }}>
          {phone.color || phone.storage || phone.condition}
        </p>
      </div>

      {/* Image area — 3:4 aspect, object-contain, light surface */}
      <div style={{
        flex: 1,
        aspectRatio: '3/4',
        background: 'var(--surface-low)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginTop: 'auto',
      }}>
        <PhoneImg phone={phone} />

        {/* Condition badge over image */}
        <div style={{ position:'absolute', bottom:10, left:12 }}>
          <span style={{
            ...condStyle,
            padding:'.2rem .65rem',
            borderRadius:999,
            fontSize:'.65rem', fontWeight:600,
            fontFamily:'var(--font-body)',
            letterSpacing:'.04em', textTransform:'uppercase',
          }}>
            {phone.condition}
          </span>
        </div>

        {/* Sold overlay */}
        {sold && (
          <div style={{ position:'absolute', inset:0, background:'rgba(255,255,255,.65)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'.85rem', textTransform:'uppercase', letterSpacing:'.1em', color:'var(--on-surface)', background:'rgba(255,255,255,.85)', padding:'.35rem 1rem', borderRadius:6 }}>Sold</span>
          </div>
        )}
      </div>
    </article>
  )
}
