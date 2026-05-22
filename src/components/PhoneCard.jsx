import { Link } from 'react-router-dom'
import { buildPhoneWhatsAppUrl, formatPrice } from '../lib/constants'
import StatusBadge from './StatusBadge'

export default function PhoneCard({ phone }) {
  const isSold = !phone.available

  return (
    <div className="card" style={{
      overflow: 'hidden',
      opacity: isSold ? 0.65 : 1,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Image */}
      <div style={{
        position: 'relative',
        height: 188,
        background: 'var(--bg-secondary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {phone.images?.[0]
          ? <img src={phone.images[0]} alt={phone.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
          : <div style={{ textAlign: 'center', color: 'var(--text-faint)' }}>
              <div style={{ fontSize: 44 }}>📱</div>
              <div style={{ fontSize: '0.72rem', marginTop: 6, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>No Image</div>
            </div>
        }
        {/* Badges row */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          <StatusBadge value={phone.condition} />
        </div>
        {phone.featured && !isSold && (
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <span style={{ background: 'var(--blue)', color: '#fff', fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: 999, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Featured
            </span>
          </div>
        )}
        {isSold && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ background: 'rgba(0,0,0,0.7)', color: '#fff', fontWeight: 800, fontFamily: 'var(--font-display)', fontSize: '1rem', padding: '0.4rem 1.1rem', borderRadius: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Sold</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '0.9rem 1rem 1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{phone.brand}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>{phone.storage}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem', lineHeight: 1.3, color: 'var(--text)' }}>{phone.name}</h3>
        {phone.color && <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.7rem' }}>{phone.color}</p>}

        <div style={{ marginTop: 'auto', paddingTop: '0.65rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.7rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)' }}>{formatPrice(phone.price)}</span>
            <StatusBadge value={phone.available ? 'Available' : 'Sold'} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Link to={`/shop/${phone.slug}`} className="btn btn-ghost btn-sm" style={{ flex: 1 }}>View</Link>
            {!isSold && (
              <a href={buildPhoneWhatsAppUrl(phone)} target="_blank" rel="noopener noreferrer"
                className="btn btn-green btn-sm" style={{ flex: 1 }}>WhatsApp</a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
