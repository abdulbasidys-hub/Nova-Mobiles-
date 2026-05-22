import { Link } from 'react-router-dom'
import { buildPhoneWhatsAppUrl, formatPrice } from '../lib/constants'

const conditionBadge = { 'Brand New': 'badge-new', 'London Used': 'badge-london', 'Nigerian Used': 'badge-nigerian' }

export default function PhoneCard({ phone }) {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: 200, background: '#1a2233', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {phone.images?.[0]
          ? <img src={phone.images[0]} alt={phone.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: 48 }}>📱</span>
        }
        <span className={`badge ${conditionBadge[phone.condition] || 'badge-new'}`} style={{ position: 'absolute', top: 10, left: 10 }}>
          {phone.condition}
        </span>
        {phone.featured && (
          <span className="badge badge-featured" style={{ position: 'absolute', top: 10, right: 10 }}>Featured</span>
        )}
      </div>

      <div style={{ padding: '1rem' }}>
        <p style={{ color: 'var(--blue)', fontSize: '0.75rem', fontWeight: 600, marginBottom: 4 }}>{phone.brand}</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{phone.name}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>{phone.storage}{phone.color ? ` · ${phone.color}` : ''}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>{formatPrice(phone.price)}</span>
          <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: 999, background: phone.available ? 'rgba(22,163,74,0.2)' : 'rgba(239,68,68,0.2)', color: phone.available ? '#4ade80' : '#f87171' }}>
            {phone.available ? 'Available' : 'Sold'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to={`/shop/${phone.slug}`} className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', padding: '0.5rem', fontSize: '0.85rem' }}>
            View
          </Link>
          <a href={buildPhoneWhatsAppUrl(phone)} target="_blank" rel="noopener noreferrer"
            className="btn btn-green" style={{ flex: 1, justifyContent: 'center', padding: '0.5rem', fontSize: '0.85rem' }}>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
