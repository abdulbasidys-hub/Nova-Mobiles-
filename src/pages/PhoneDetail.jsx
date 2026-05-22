import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPhoneBySlug } from '../lib/phones'
import { buildPhoneWhatsAppUrl, formatPrice } from '../lib/constants'

const conditionBadge = { 'Brand New': 'badge-new', 'London Used': 'badge-london', 'Nigerian Used': 'badge-nigerian' }

export default function PhoneDetail() {
  const { slug } = useParams()
  const [phone, setPhone] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => {
    getPhoneBySlug(slug).then(data => { setPhone(data); setLoading(false) })
  }, [slug])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, border: '3px solid var(--blue)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  if (!phone) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <p style={{ color: 'var(--text-muted)' }}>Phone not found.</p>
      <Link to="/shop" className="btn btn-primary">← Back to Shop</Link>
    </div>
  )

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <Link to="/shop" style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: '2rem', transition: 'color 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
        ← Back to Shop
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        {/* Images */}
        <div>
          <div className="card" style={{ height: 340, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '1rem' }}>
            {phone.images?.[imgIdx]
              ? <img src={phone.images[imgIdx]} alt={phone.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ fontSize: 80 }}>📱</span>
            }
          </div>
          {phone.images?.length > 1 && (
            <div style={{ display: 'flex', gap: 10 }}>
              {phone.images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)} style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', border: `2px solid ${i === imgIdx ? 'var(--blue)' : 'var(--border)'}`, cursor: 'pointer', background: 'none', padding: 0 }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p style={{ color: 'var(--blue)', fontWeight: 600, marginBottom: 8 }}>{phone.brand}</p>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{phone.name}</h1>
          <span className={`badge ${conditionBadge[phone.condition] || 'badge-new'}`}>{phone.condition}</span>
          <div style={{ margin: '1.5rem 0', fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>{formatPrice(phone.price)}</div>

          {phone.specs && (
            <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: '1rem' }}>Specifications</h3>
              <div className="grid-2" style={{ gap: '0.75rem' }}>
                {Object.entries(phone.specs).map(([k, v]) => (
                  <div key={k}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'capitalize' }}>{k}</p>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            {['Warranty included', 'Genuine phone guaranteed', 'Returns accepted', 'Nationwide delivery available'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 8 }}>
                <span style={{ color: '#4ade80' }}>✓</span> {f}
              </div>
            ))}
          </div>

          <a href={buildPhoneWhatsAppUrl(phone)} target="_blank" rel="noopener noreferrer"
            className="btn btn-green" style={{ width: '100%', justifyContent: 'center', fontSize: '1.1rem', padding: '1rem' }}>
            💬 Buy via WhatsApp
          </a>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .container > div[style*="grid"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}
