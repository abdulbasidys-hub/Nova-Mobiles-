import { Link } from 'react-router-dom'
import { buildPhoneWhatsAppUrl, formatPrice } from '../lib/constants'
import StatusBadge from './StatusBadge'

export default function ProductCard({ phone }) {
  const sold = !phone.available
  const condStatus = phone.condition
  const availStatus = phone.available ? 'Available' : 'Sold'

  return (
    <article style={{
      display: 'flex', flexDirection: 'column',
      background: 'var(--surface)', border: `1px solid ${sold ? 'var(--line)' : 'var(--line)'}`,
      borderRadius: 'var(--r)', overflow: 'hidden', opacity: sold ? .6 : 1,
      transition: 'border-color var(--t), box-shadow var(--t)',
    }}
    onMouseEnter={e => { if (!sold) { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.boxShadow = '0 0 0 1px var(--blue)' }}}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none' }}>

      {/* Image */}
      <div style={{ position: 'relative', height: 180, background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
        {phone.images?.[0]
          ? <img src={phone.images[0]} alt={phone.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .35s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
          : <span style={{ fontSize: 44, opacity: .3 }}>📱</span>
        }
        {/* Status row top */}
        <div style={{ position: 'absolute', top: 7, left: 7, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <StatusBadge value={condStatus} />
        </div>
        {phone.featured && !sold && (
          <div style={{ position: 'absolute', top: 7, right: 7 }}>
            <span className="st st-blue">★ Featured</span>
          </div>
        )}
        {sold && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.48)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '.9rem', textTransform: 'uppercase', letterSpacing: '.08em', color: '#fff', background: 'rgba(0,0,0,.6)', padding: '.3rem .9rem', borderRadius: 3 }}>SOLD</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '.85rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--blue)' }}>{phone.brand}</span>
          <StatusBadge value={availStatus} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', lineHeight: 1.15, color: 'var(--ink)' }}>{phone.name}</h3>
        <p style={{ fontSize: '.75rem', color: 'var(--ink-3)', marginBottom: 'auto', paddingBottom: '.65rem' }}>
          {[phone.storage, phone.color].filter(Boolean).join(' · ')}
        </p>
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '.65rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.5rem' }}>
          <span className="num" style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>{formatPrice(phone.price)}</span>
          <div style={{ display: 'flex', gap: '.4rem' }}>
            <Link to={`/shop/${phone.slug}`} className="btn btn-ghost btn-xs">Details</Link>
            {!sold && <a href={buildPhoneWhatsAppUrl(phone)} target="_blank" rel="noopener noreferrer" className="btn btn-green btn-xs">WA</a>}
          </div>
        </div>
      </div>
    </article>
  )
}
