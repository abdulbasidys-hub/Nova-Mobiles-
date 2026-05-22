import { Link } from 'react-router-dom'
import { buildPhoneWhatsAppUrl, formatPrice } from '../lib/constants'

const BADGE = {
  'Brand New':     { cls: 'badge-new',    label: 'Brand New' },
  'London Used':   { cls: 'badge-london', label: 'London Used' },
  'Nigerian Used': { cls: 'badge-ng',     label: 'Nigerian Used' },
}

export default function PhoneCard({ phone }) {
  const sold = !phone.available
  const b = BADGE[phone.condition] || { cls: 'badge-new', label: phone.condition }

  return (
    <article style={{
      display: 'flex', flexDirection: 'column',
      background: 'var(--card-bg)',
      border: '1px solid var(--card-border)',
      borderRadius: 8,
      overflow: 'hidden',
      opacity: sold ? 0.6 : 1,
      transition: 'border-color 0.14s, box-shadow 0.14s',
    }}
    onMouseEnter={e => { if (!sold) { e.currentTarget.style.borderColor = 'var(--blue-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-lift)' }}}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.boxShadow = 'none' }}>

      {/* Image */}
      <div style={{
        position: 'relative',
        height: 196, flexShrink: 0,
        background: 'var(--bg-off)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {phone.images?.[0]
          ? <img src={phone.images[0]} alt={phone.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s var(--ease)' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          : <span style={{ fontSize: 50, opacity: 0.35 }}>📱</span>
        }
        {/* Condition badge top-left */}
        <div style={{ position: 'absolute', top: 9, left: 9 }}>
          <span className={`badge ${b.cls}`}>{b.label}</span>
        </div>
        {/* Featured ribbon top-right */}
        {phone.featured && !sold && (
          <div style={{ position: 'absolute', top: 9, right: 9 }}>
            <span className="badge badge-blue">Featured</span>
          </div>
        )}
        {/* Sold overlay */}
        {sold && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ background: 'rgba(0,0,0,0.75)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.4rem 0.9rem', borderRadius: 4 }}>Sold</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '0.85rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Brand line */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--blue)' }}>{phone.brand}</span>
          {phone.storage && <span style={{ fontSize: '0.7rem', color: 'var(--ink-faint)', fontWeight: 500 }}>{phone.storage}</span>}
        </div>
        {/* Model name */}
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.15rem', color: 'var(--ink)' }}>{phone.name}</h3>
        {/* Spec line */}
        <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginBottom: 'auto', paddingBottom: '0.75rem' }}>
          {[phone.color, phone.storage].filter(Boolean).join(' · ')}
        </p>

        {/* Ruled foot */}
        <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)' }}>{formatPrice(phone.price)}</span>
            <span className={`badge ${phone.available ? 'badge-avail' : 'badge-sold'}`}>{phone.available ? 'Available' : 'Sold'}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to={`/shop/${phone.slug}`} className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Details</Link>
            {!sold && (
              <a href={buildPhoneWhatsAppUrl(phone)} target="_blank" rel="noopener noreferrer"
                className="btn btn-green btn-sm" style={{ flex: 1, justifyContent: 'center' }}>WhatsApp</a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
