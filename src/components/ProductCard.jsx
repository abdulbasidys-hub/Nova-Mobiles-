import { useNavigate } from 'react-router-dom'

export default function ProductCard({ phone }) {
  const navigate = useNavigate()
  const sold     = !phone.available
  const src      = phone.images?.[0] || null

  return (
    <article
      onClick={() => navigate(`/shop/${phone.slug}`)}
      style={{
        position: 'relative',
        aspectRatio: '9 / 14',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#F1F3F4',
        flexShrink: 0,
        transition: 'transform .28s cubic-bezier(0.34,1.56,0.64,1), box-shadow .28s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'
        e.currentTarget.style.boxShadow = '0 18px 32px rgba(0,0,0,.13)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Phone image — always the inventory photo, fit to fill card from top */}
      {src ? (
        <img
          src={src}
          alt={phone.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
          }}
        />
      ) : (
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize:72, opacity:.12, color:'#5F6368' }}>smartphone</span>
        </div>
      )}

      {/* Bottom gradient so name is always readable */}
      <div style={{
        position: 'absolute', bottom:0, left:0, right:0, height:'48%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.28) 55%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Name overlay */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'.75rem .85rem .85rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '.92rem',
          lineHeight: 1.25,
          color: '#fff',
          textShadow: '0 1px 6px rgba(0,0,0,.55)',
          margin: 0,
        }}>
          {phone.name}
        </h3>
      </div>

      {/* Sold overlay */}
      {sold && (
        <div style={{ position:'absolute', inset:0, background:'rgba(255,255,255,.58)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ background:'rgba(0,0,0,.65)', color:'#fff', fontFamily:'var(--font-display)', fontWeight:800, fontSize:'.78rem', textTransform:'uppercase', letterSpacing:'.1em', padding:'.3rem 1rem', borderRadius:6 }}>Sold</span>
        </div>
      )}
    </article>
  )
}