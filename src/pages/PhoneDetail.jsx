import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPhoneBySlug, getAllPhones } from '../lib/phones'
import { buildPhoneWhatsAppUrl, buildWhatsAppUrl, formatPrice } from '../lib/constants'
import PhoneCard from '../components/PhoneCard'

const BADGE_MAP = {
  'Brand New':     'badge-new', 'London Used': 'badge-london',
  'Nigerian Used': 'badge-ng',  'Sold': 'badge-sold',
}

export default function PhoneDetail() {
  const { slug } = useParams()
  const [phone,   setPhone]   = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [img,     setImg]     = useState(0)

  useEffect(() => {
    setLoading(true); setImg(0)
    getPhoneBySlug(slug).then(data => {
      setPhone(data); setLoading(false)
      if (data) getAllPhones().then(all =>
        setRelated(all.filter(p => p.brand === data.brand && p.slug !== slug && p.available).slice(0, 4))
      )
    })
  }, [slug])

  if (loading) return (
    <div className="page-top" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 32, height: 32, border: '2px solid var(--blue)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  if (!phone) return (
    <div className="page-top" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <span style={{ fontSize: 48 }}>📭</span>
      <p style={{ color: 'var(--ink-muted)' }}>Phone not found.</p>
      <Link to="/shop" className="btn btn-primary btn-sm">← Back to Shop</Link>
    </div>
  )

  const sold = !phone.available
  const SPEC_ICONS = { display: '🖥️', processor: '⚡', camera: '📷', battery: '🔋', ram: '💾' }

  return (
    <div className="page-top">

      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid var(--rule)', background: 'var(--bg-off)' }}>
        <div className="wrap" style={{ padding: '0.7rem 2rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--ink-faint)' }}>
          <Link to="/"     style={{ color: 'var(--ink-faint)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-faint)'}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: 'var(--ink-faint)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-faint)'}>Shop</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)' }}>{phone.name}</span>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>

        {/* ── MAIN LAYOUT ─────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '4rem', marginBottom: '4rem', alignItems: 'start' }} className="detail-grid">

          {/* Gallery */}
          <div>
            <div style={{
              height: 400, background: 'var(--bg-off)',
              border: '1px solid var(--rule)', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', marginBottom: '0.75rem',
            }}>
              {phone.images?.[img]
                ? <img src={phone.images[img]} alt={phone.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: 80, opacity: 0.2 }}>📱</span>
              }
            </div>
            {phone.images?.length > 1 && (
              <div style={{ display: 'flex', gap: 6 }}>
                {phone.images.map((src, i) => (
                  <button key={i} onClick={() => setImg(i)} style={{
                    width: 64, height: 64, flexShrink: 0, padding: 0, cursor: 'pointer', borderRadius: 6, overflow: 'hidden',
                    border: `2px solid ${i === img ? 'var(--blue)' : 'var(--rule-strong)'}`, background: 'var(--bg-off)',
                  }}>
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {/* Top: brand + condition */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--blue)' }}>{phone.brand}</span>
              <span className={`badge ${BADGE_MAP[phone.condition] || 'badge-new'}`}>{phone.condition}</span>
              {sold && <span className="badge badge-sold">Sold</span>}
            </div>

            {/* Model name — big */}
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', letterSpacing: '-0.025em', lineHeight: 1.08, marginBottom: '0.5rem' }}>{phone.name}</h1>
            <p style={{ color: 'var(--ink-muted)', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
              {[phone.storage, phone.color].filter(Boolean).join(' · ')}
            </p>

            {/* Price + CTA */}
            <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', padding: '1.1rem 0', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.02em' }}>{formatPrice(phone.price)}</span>
                <span className={`badge ${phone.available ? 'badge-avail' : 'badge-sold'}`}>{phone.available ? 'Available' : 'Sold'}</span>
              </div>
              {phone.available ? (
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <a href={buildPhoneWhatsAppUrl(phone)} target="_blank" rel="noopener noreferrer"
                    className="btn btn-green btn-full" style={{ flex: 2 }}>💬 Buy via WhatsApp</a>
                  <a href={buildWhatsAppUrl(`Hi! I want to ask about the ${phone.name}. Is it still available?`)}
                    target="_blank" rel="noopener noreferrer"
                    className="btn btn-ghost" style={{ flex: 1 }}>Ask a Question</a>
                </div>
              ) : (
                <div style={{ background: 'var(--status-sold-bg)', border: '1px solid rgba(185,28,28,0.2)', borderRadius: 6, padding: '0.85rem', textAlign: 'center' }}>
                  <p style={{ color: 'var(--status-sold-ink)', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>This phone has been sold.</p>
                  <Link to="/shop" style={{ color: 'var(--blue)', fontSize: '0.78rem', fontWeight: 600 }}>Browse available phones →</Link>
                </div>
              )}
            </div>

            {/* Best For */}
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-faint)', marginBottom: '0.5rem' }}>Best For</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {phone.brand === 'Google Pixel'
                  ? ['Photography', 'Clean Android', 'Long-term value', 'AI features'].map(t => <span key={t} className="badge badge-blue">{t}</span>)
                  : phone.brand === 'iPhone'
                  ? ['iOS ecosystem', 'Premium build', 'Long resale value'].map(t => <span key={t} className="badge badge-blue">{t}</span>)
                  : ['Everyday use', 'Performance', 'Value for money'].map(t => <span key={t} className="badge badge-blue">{t}</span>)
                }
              </div>
            </div>

            {/* What you get */}
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-faint)', marginBottom: '0.6rem' }}>What You Get</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem' }}>
                {['Phone in described condition', 'Our full warranty', 'Returns accepted', 'Genuine device guaranteed'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                    <span style={{ color: 'var(--green)', fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            {phone.specs && (
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-faint)', marginBottom: '0.6rem' }}>Specifications</p>
                <div style={{ border: '1px solid var(--rule)', borderRadius: 6, overflow: 'hidden' }}>
                  {Object.entries(phone.specs).filter(([, v]) => v).map(([k, v], i) => (
                    <div key={k} style={{
                      display: 'flex', alignItems: 'center',
                      padding: '0.55rem 0.85rem', gap: '0.75rem',
                      background: i % 2 === 0 ? 'var(--bg-off)' : 'var(--bg)',
                      borderBottom: '1px solid var(--rule)',
                    }}>
                      <span style={{ fontSize: 14, flexShrink: 0 }}>{SPEC_ICONS[k] || '•'}</span>
                      <span style={{ color: 'var(--ink-faint)', fontSize: '0.72rem', textTransform: 'capitalize', width: 80, flexShrink: 0, fontWeight: 600 }}>{k}</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--ink-2)', fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar phones */}
        {related.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800 }}>Similar {phone.brand} Phones</h2>
              <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
              <Link to="/shop" style={{ fontSize: '0.75rem', color: 'var(--blue)', fontWeight: 600 }}>All phones →</Link>
            </div>
            <div className="g4">{related.map(p => <PhoneCard key={p.id} phone={p} />)}</div>
          </div>
        )}
      </div>

      <style>{`@media (max-width: 768px) { .detail-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }`}</style>
    </div>
  )
}
