import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedPhones, getReviews, getAllPhones } from '../lib/phones'
import { buildWhatsAppUrl, buildPhoneWhatsAppUrl, formatPrice } from '../lib/constants'
import SectionHeader from '../components/SectionHeader'
import StatusBadge from '../components/StatusBadge'
import WatermarkBackground from '../components/WatermarkBackground'
import PhoneCard from '../components/PhoneCard'

function FeaturedTile({ phone }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        height: 180, background: 'var(--bg-secondary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {phone.images?.[0]
          ? <img src={phone.images[0]} alt={phone.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: 52 }}>📱</span>
        }
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <StatusBadge value={phone.condition} />
        </div>
      </div>
      <div style={{ padding: '0.9rem 1rem' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{phone.brand}</p>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.6rem' }}>{phone.name}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem' }}>{formatPrice(phone.price)}</span>
          <a href={buildPhoneWhatsAppUrl(phone)} target="_blank" rel="noopener noreferrer"
            className="btn btn-green btn-sm">Buy</a>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [reviews, setReviews]   = useState([])
  const [stats, setStats]       = useState({ total: 0, london: 0, brandNew: 0 })

  useEffect(() => {
    getFeaturedPhones().then(setFeatured)
    getReviews().then(setReviews)
    getAllPhones().then(phones => {
      setStats({
        total:    phones.filter(p => p.available).length,
        london:   phones.filter(p => p.condition === 'London Used' && p.available).length,
        brandNew: phones.filter(p => p.condition === 'Brand New' && p.available).length,
      })
    })
  }, [])

  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 62, overflow: 'hidden' }}>
        <WatermarkBackground src="/images/logo.png" opacity={0.04} size="500px" position="right" />

        {/* Subtle grid texture */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.4,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%', padding: '4rem 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--blue-muted)', border: '1px solid var(--blue-border)', borderRadius: 999, padding: '0.3rem 0.85rem', marginBottom: '1.75rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', display: 'inline-block', animation: 'blink 1.6s infinite' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--blue)', letterSpacing: '0.04em' }}>Open Now · Mon–Sat 11am–6pm</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
                Kano's Premium<br />
                <span style={{ color: 'var(--blue)' }}>Pixel Showroom</span>
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '2rem', maxWidth: 420 }}>
                Genuine smartphones — New, London Used & Accessories. Google Pixel, iPhone, Samsung, Oppo. Warranty on every device.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link to="/shop" className="btn btn-primary btn-lg">Browse Phones →</Link>
                <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')}
                  target="_blank" rel="noopener noreferrer" className="btn btn-green btn-lg">
                  💬 WhatsApp Us
                </a>
              </div>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                {['✓ Warranty Included', '✓ Genuine Only', '✓ Nationwide Delivery', '✓ Returns Accepted'].map(t => (
                  <span key={t} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Right — featured tiles */}
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: '0.85rem' }}>
                Featured Right Now
              </p>
              {featured.length === 0
                ? <div className="grid-2">{[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 260 }} />)}</div>
                : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
                    {featured.slice(0, 3).map((p, i) => (
                      <div key={p.id} style={{ gridColumn: i === 0 ? 'span 2' : 'span 1' }}>
                        <FeaturedTile phone={p} />
                      </div>
                    ))}
                  </div>
              }
            </div>
          </div>
        </div>
        <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      </section>

      {/* ── LIVE INVENTORY STRIP ─────────────────────────────── */}
      <div style={{ background: 'var(--blue)', color: '#fff' }}>
        <div className="container" style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
          {[
            { label: 'Available Phones', value: stats.total || '—' },
            { label: 'London Used',      value: stats.london || '—' },
            { label: 'Brand New',        value: stats.brandNew || '—' },
            { label: 'Brands Stocked',   value: '4+' },
            { label: 'Years in Business',value: '10+' },
          ].map((s, i) => (
            <div key={s.label} style={{
              flex: '1 0 140px', padding: '1rem 1.5rem',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.2)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.6rem', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, opacity: 0.85, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY US ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeader label="Why Nova Mobiles Plus" title="Not just a phone shop." subtitle="A decade of trust, genuine stock, and expert knowledge — everything you need, nothing you don't." align="center" />
          <div className="grid-4">
            {[
              { icon: '🛡️', title: 'Warranty on Every Phone', desc: 'All phones — new and used — come with warranty coverage. No exceptions.' },
              { icon: '✅', title: '100% Genuine Stock',       desc: 'Every device is personally verified. No imitations, no compromises.' },
              { icon: '🚚', title: 'Nationwide Delivery',      desc: 'We ship across Nigeria and internationally. Fast, safe, insured.' },
              { icon: '🔄', title: 'Hassle-Free Returns',      desc: 'If something isn\'t right, we make it right. Simple as that.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 28, marginBottom: '0.85rem' }}>{icon}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL FEATURED PHONES ──────────────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <SectionHeader label="Inventory" title="Available Now" subtitle="Hand-picked phones ready for immediate purchase." style={{ marginBottom: 0 }} />
            <Link to="/shop" className="btn btn-ghost btn-sm">View Full Shop →</Link>
          </div>
          {featured.length === 0
            ? <div className="grid-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 340 }} />)}</div>
            : <div className="grid-3">{featured.map(p => <PhoneCard key={p.id} phone={p} />)}</div>
          }
        </div>
      </section>

      {/* ── PIXEL EDITORIAL ──────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="pixel-grid">
            <div>
              <SectionHeader label="Google Pixel Specialists" title="The best camera phone for your budget." subtitle="From Pixel 6a to Pixel 9 Pro — we know every model inside-out and stock them all." />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {['Best computational photography of any Android phone', '7 years of guaranteed OS updates (Pixel 8+)', 'Pure Android — no bloatware, no slowdowns', 'Exclusive Google AI features built into the OS'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <span style={{ color: 'var(--blue)', fontWeight: 700, marginTop: 2, flexShrink: 0 }}>—</span>
                    <span style={{ color: 'var(--text-2)', fontSize: '0.9rem' }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link to="/pixel-guide" className="btn btn-primary">Read Pixel Guide →</Link>
                <Link to="/shop" className="btn btn-ghost">Shop Pixels</Link>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { model: 'Pixel 9 Pro', tag: 'Latest 2024', price: '₦680k+' },
                { model: 'Pixel 8 Pro', tag: 'Best Value',  price: '₦500k+' },
                { model: 'Pixel 7a',    tag: 'Budget Pick', price: '₦250k+' },
                { model: 'Pixel 6a',    tag: 'Entry Level', price: '₦150k+' },
              ].map(p => (
                <div key={p.model} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '1rem', cursor: 'pointer', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue-border)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{p.tag}</span>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', margin: '0.3rem 0 0.2rem' }}>{p.model}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 600 }}>{p.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .pixel-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader label="Customer Reviews" title="Trusted by thousands." subtitle="Real feedback from real buyers across Nigeria." align="center" />
          {reviews.length === 0
            ? <div style={{ display: 'flex', gap: '1.25rem' }}>{[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 140, flex: 1 }} />)}</div>
            : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
                {reviews.map(r => (
                  <div key={r.id} className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                      <div style={{ display: 'flex', gap: 3 }}>
                        {[...Array(r.rating || 5)].map((_, i) => (
                          <span key={i} style={{ color: '#F59E0B', fontSize: '0.85rem' }}>★</span>
                        ))}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{r.date || 'Verified buyer'}</span>
                    </div>
                    <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem', fontStyle: 'italic' }}>"{r.text}"</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--blue-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--blue)' }}>
                        {r.name?.[0] || '?'}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{r.name}</span>
                    </div>
                  </div>
                ))}
              </div>
          }
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <WatermarkBackground src="/images/logo.png" opacity={0.035} size="360px" />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 620, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.85rem' }}>
            Found the right phone?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Message us on WhatsApp and we'll confirm availability, answer questions, and arrange delivery — all in one conversation.
          </p>
          <a href={buildWhatsAppUrl("Hi Nova Mobiles Plus! I'm looking for a phone. Can you help?")}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-green btn-lg" style={{ fontSize: '1rem' }}>
            💬 Start a Conversation
          </a>
        </div>
      </section>

    </div>
  )
}
