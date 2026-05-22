import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPhoneBySlug, getAllPhones } from '../lib/phones'
import { buildPhoneWhatsAppUrl, buildWhatsAppUrl, formatPrice } from '../lib/constants'
import StatusBadge from '../components/StatusBadge'
import PhoneCard from '../components/PhoneCard'

export default function PhoneDetail() {
  const { slug } = useParams()
  const [phone,   setPhone]   = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [imgIdx,  setImgIdx]  = useState(0)

  useEffect(() => {
    setLoading(true); setImgIdx(0)
    getPhoneBySlug(slug).then(data => {
      setPhone(data); setLoading(false)
      if (data) {
        getAllPhones().then(all => {
          setRelated(all.filter(p => p.brand === data.brand && p.slug !== slug && p.available).slice(0, 4))
        })
      }
    })
  }, [slug])

  if (loading) return (
    <div className="page-pt" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 36, height: 36, border: '3px solid var(--blue)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  if (!phone) return (
    <div className="page-pt" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <span style={{ fontSize: 48 }}>📭</span>
      <p style={{ color: 'var(--text-muted)' }}>Phone not found.</p>
      <Link to="/shop" className="btn btn-primary">← Back to Shop</Link>
    </div>
  )

  const SPEC_ICONS = { display: '🖥️', processor: '⚡', camera: '📷', battery: '🔋', ram: '💾' }

  return (
    <div className="page-pt" style={{ paddingBottom: '5rem' }}>
      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>Shop</Link>
          <span>/</span>
          <span style={{ color: 'var(--text)' }}>{phone.name}</span>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3.5rem', alignItems: 'start', marginBottom: '4rem' }} className="detail-grid">

          {/* ── LEFT: Gallery ─────────────────────────────── */}
          <div>
            <div style={{
              background: 'var(--bg-secondary)', borderRadius: 12,
              border: '1px solid var(--border)',
              height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', marginBottom: '0.85rem', position: 'relative',
            }}>
              {phone.images?.[imgIdx]
                ? <img src={phone.images[imgIdx]} alt={phone.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ textAlign: 'center', color: 'var(--text-faint)' }}><div style={{ fontSize: 72 }}>📱</div><p style={{ fontSize: '0.8rem', marginTop: 8 }}>No image available</p></div>
              }
            </div>
            {phone.images?.length > 1 && (
              <div style={{ display: 'flex', gap: 8 }}>
                {phone.images.map((img, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} style={{
                    width: 68, height: 68, flexShrink: 0, padding: 0, cursor: 'pointer',
                    borderRadius: 8, overflow: 'hidden',
                    border: `2px solid ${i === imgIdx ? 'var(--blue)' : 'var(--border)'}`,
                    background: 'var(--bg-secondary)', transition: 'border-color 0.15s',
                  }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Info + Purchase ─────────────────────── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{phone.brand}</span>
              <StatusBadge value={phone.condition} />
              {!phone.available && <StatusBadge value="Sold" />}
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>{phone.name}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              {phone.storage && `${phone.storage}`}{phone.color && ` · ${phone.color}`}
            </p>

            {/* Price panel */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.35rem' }}>Asking Price</p>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', color: 'var(--text)', letterSpacing: '-0.02em' }}>{formatPrice(phone.price)}</p>
              <StatusBadge value={phone.available ? 'Available' : 'Sold'} />
            </div>

            {/* CTAs */}
            {phone.available ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                <a href={buildPhoneWhatsAppUrl(phone)} target="_blank" rel="noopener noreferrer"
                  className="btn btn-green btn-lg" style={{ justifyContent: 'center' }}>
                  💬 Buy via WhatsApp
                </a>
                <a href={buildWhatsAppUrl(`Hi! I want to enquire about the ${phone.name}. Can you give me more details?`)}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost" style={{ justifyContent: 'center' }}>
                  Ask a Question
                </a>
              </div>
            ) : (
              <div style={{ background: 'var(--badge-sold-bg)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--badge-sold-text)', fontWeight: 600, fontSize: '0.9rem' }}>This phone has been sold.</p>
                <Link to="/shop" style={{ color: 'var(--blue)', fontSize: '0.85rem', marginTop: 4, display: 'inline-block' }}>Browse available phones →</Link>
              </div>
            )}

            {/* Trust row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {['✓ Warranty included', '✓ Genuine phone', '✓ Returns accepted', '✓ Secure delivery'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 700 }}>{f.split(' ')[0]}</span>
                  <span>{f.substring(2)}</span>
                </div>
              ))}
            </div>

            {/* Specs */}
            {phone.specs && (
              <div style={{ marginTop: '1.75rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)', marginBottom: '0.75rem' }}>Specifications</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
                  {Object.entries(phone.specs).filter(([, v]) => v).map(([k, v], i) => (
                    <div key={k} style={{ display: 'flex', alignItems: 'center', padding: '0.65rem 1rem', background: i % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-card)', gap: '0.75rem' }}>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>{SPEC_ICONS[k] || '•'}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'capitalize', width: 90, flexShrink: 0, fontWeight: 600 }}>{k}</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RELATED ─────────────────────────────────────── */}
        {related.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>More {phone.brand} Phones</h2>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <Link to="/shop" style={{ fontSize: '0.82rem', color: 'var(--blue)', fontWeight: 600 }}>View All →</Link>
            </div>
            <div className="grid-4">
              {related.map(p => <PhoneCard key={p.id} phone={p} />)}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) { .detail-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }
      `}</style>
    </div>
  )
}
