import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedPhones, getReviews, getAllPhones } from '../lib/phones'
import { buildWhatsAppUrl, buildPhoneWhatsAppUrl, formatPrice } from '../lib/constants'
import WatermarkSection from '../components/WatermarkSection'
import ProductCard from '../components/ProductCard'
import ReviewCard from '../components/ReviewCard'
import StatBlock from '../components/StatBlock'
import StatusBadge from '../components/StatusBadge'

/* Live stock mini-card for hero panel */
function StockRow({ phone }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.6rem .85rem', borderBottom: '1px solid var(--line)', transition: 'background .12s' }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-3)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
      <div style={{ width: 36, height: 36, background: 'var(--bg-3)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
        {phone.images?.[0] ? <img src={phone.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: 18, opacity: .4 }}>📱</span>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{phone.name}</p>
        <p style={{ fontSize: '.7rem', color: 'var(--ink-3)' }}>{phone.storage}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '.2rem', flexShrink: 0 }}>
        <span className="num" style={{ fontSize: '.9rem' }}>{formatPrice(phone.price)}</span>
        <StatusBadge value={phone.condition} />
      </div>
    </div>
  )
}

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [reviews,  setReviews]  = useState([])
  const [stats,    setStats]    = useState({ total: 0, pixel: 0, london: 0, newArrivals: 0 })

  useEffect(() => {
    getFeaturedPhones().then(setFeatured)
    getReviews().then(setReviews)
    getAllPhones().then(all => setStats({
      total:       all.filter(p => p.available).length,
      pixel:       all.filter(p => p.brand === 'Google Pixel' && p.available).length,
      london:      all.filter(p => p.condition === 'London Used' && p.available).length,
      newArrivals: all.filter(p => p.condition === 'Brand New'  && p.available).length,
    }))
  }, [])

  return (
    <div className="pt">

      {/* ══ HERO ══════════════════════════════════════════ */}
      <WatermarkSection src="/images/logo.png" lightOp={0.03} darkOp={0.05} wmSize="500px" wmAlign="right"
        style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg)' }}>
        <div className="W" style={{ padding: '3.5rem 2rem 0' }}>

          {/* Top label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1.5rem' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', display: 'inline-block', animation: 'pulse 1.8s infinite' }} />
            <span style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-3)' }}>Live Inventory · Kano, Nigeria</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3.5rem', alignItems: 'flex-start' }} className="hero-g">
            {/* Left */}
            <div>
              <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: .95, letterSpacing: '-.02em', marginBottom: '1.25rem' }}>
                KANO'S<br /><span style={{ color: 'var(--blue)' }}>GOOGLE PIXEL</span><br />DESTINATION.
              </h1>
              <p style={{ color: 'var(--ink-2)', fontSize: '1rem', lineHeight: 1.65, maxWidth: 400, marginBottom: '1.75rem' }}>
                Real inventory. Real prices. Instant WhatsApp buying. New phones, London Used, and accessories — all warranted.
              </p>
              <div style={{ display: 'flex', gap: '.65rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <Link to="/shop" className="btn btn-blue btn-lg">Browse Phones →</Link>
                <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')} target="_blank" rel="noopener noreferrer" className="btn btn-green btn-lg">💬 Chat on WhatsApp</a>
              </div>
              {/* Trust pills */}
              <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                {['✓ Warranty on every phone', '✓ 100% genuine stock', '✓ Nationwide delivery', '✓ Returns accepted'].map(t => (
                  <span key={t} style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--ink-3)', padding: '.2rem .6rem', background: 'var(--bg-3)', borderRadius: 999, border: '1px solid var(--line)' }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Right — live stock panel */}
            <div>
              <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--r)', overflow: 'hidden', background: 'var(--surface)' }}>
                <div style={{ padding: '.6rem .85rem', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.1em', color: '#fff' }}>Live Stock Preview</span>
                  <span style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.75)', fontWeight: 600 }}>{stats.total} available</span>
                </div>
                {featured.length === 0
                  ? [...Array(4)].map((_, i) => <div key={i} className="sk" style={{ height: 56, margin: 0, borderRadius: 0, borderBottom: '1px solid var(--line)' }} />)
                  : featured.slice(0, 5).map(p => <StockRow key={p.id} phone={p} />)
                }
                <div style={{ padding: '.7rem .85rem' }}>
                  <Link to="/shop" className="btn btn-outline-blue btn-sm btn-w">View Full Inventory →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div style={{ borderTop: '1px solid var(--line)', marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <StatBlock value={stats.total   || '—'} label="Available Now"  accent />
          <StatBlock value={stats.pixel   || '—'} label="Google Pixels"  />
          <StatBlock value={stats.london  || '—'} label="London Used"    />
          <StatBlock value={stats.newArrivals || '—'} label="Brand New"  />
        </div>
      </WatermarkSection>

      {/* ══ JUST ARRIVED ══════════════════════════════════ */}
      <section className="S" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="W">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="sec-tag">Just Arrived</div>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-.02em' }}>Fresh Stock</h2>
            </div>
            <Link to="/shop" className="btn btn-ghost btn-sm">View All →</Link>
          </div>
          {featured.length === 0
            ? <div className="g4">{[...Array(4)].map((_, i) => <div key={i} className="sk" style={{ height: 320 }} />)}</div>
            : <div className="g4">{featured.map(p => <ProductCard key={p.id} phone={p} />)}</div>
          }
        </div>
      </section>

      {/* ══ SHOP BY NEED ══════════════════════════════════ */}
      <section className="S" style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--line)' }}>
        <div className="W">
          <div className="sec-tag">Shop by Need</div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-.02em', marginBottom: '1.5rem' }}>Find the Right Phone</h2>
          <div className="g4">
            {[
              { icon: '📸', need: 'Best Camera',   desc: 'Google Pixel 8 Pro / 9 Pro. Unmatched computational photography.',        cta: 'Shop Pixels', to: '/shop' },
              { icon: '🔋', need: 'Best Battery',  desc: 'Samsung Galaxy S24+ / Pixel 8. All-day power without compromise.',        cta: 'View Samsung', to: '/shop' },
              { icon: '💰', need: 'Best Budget',   desc: 'Pixel 7a or 6a London Used. Flagship specs at mid-range prices.',         cta: 'Budget Picks', to: '/shop' },
              { icon: '👑', need: 'Premium Pick',  desc: 'iPhone 15 Pro Max / Pixel 9 Pro. The best money can buy in Kano.',        cta: 'Shop Premium', to: '/shop' },
            ].map(({ icon, need, desc, cta, to }) => (
              <div key={need} style={{ padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r)', display: 'flex', flexDirection: 'column', gap: '.75rem', transition: 'border-color var(--t)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
                <span style={{ fontSize: 28 }}>{icon}</span>
                <div>
                  <div className="sec-tag" style={{ marginBottom: '.35rem' }}>{need}</div>
                  <p style={{ color: 'var(--ink-2)', fontSize: '.82rem', lineHeight: 1.6 }}>{desc}</p>
                </div>
                <Link to={to} className="btn btn-outline-blue btn-sm" style={{ marginTop: 'auto' }}>{cta} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ══════════════════════════════════════ */}
      <section className="S" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="W">
          <div className="sec-tag">Customer Reviews</div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-.02em', marginBottom: '1.5rem' }}>Trusted by Thousands</h2>
          {reviews.length === 0
            ? <div className="g3">{[...Array(3)].map((_, i) => <div key={i} className="sk" style={{ height: 160 }} />)}</div>
            : <div className="g3">{reviews.slice(0, 3).map(r => <ReviewCard key={r.id} review={r} />)}</div>
          }
          {/* Trust row */}
          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid var(--line)', paddingTop: '2rem', gap: '1px', background: 'var(--line)' }} className="trust-g">
            {[['🛡️', 'Warranty', 'On every device'], ['✅', 'Genuine', '100% authentic'], ['🚚', 'Nationwide', 'Fast delivery'], ['🔄', 'Returns', 'Hassle-free']].map(([i, t, s]) => (
              <div key={t} style={{ background: 'var(--bg)', padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: '.5rem' }}>{i}</div>
                <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '.9rem', marginBottom: '.2rem' }}>{t}</p>
                <p style={{ fontSize: '.72rem', color: 'var(--ink-3)' }}>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LOCATION BAND ════════════════════════════════ */}
      <section className="S-sm" style={{ background: 'var(--blue)', color: '#fff' }}>
        <div className="W" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '.25rem' }}>📍 No. 6 Lukoro B Farm Center, Kano</p>
            <p style={{ fontSize: '.82rem', opacity: .85 }}>Mon–Sat: 11am – 6pm &nbsp;·&nbsp; novamobileplus@gmail.com</p>
          </div>
          <div style={{ display: 'flex', gap: '.6rem' }}>
            <Link to="/contact" className="btn" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.35)' }}>Get Directions</Link>
            <a href={buildWhatsAppUrl('Hi! I want to visit Nova Mobiles Plus. Are you open?')} target="_blank" rel="noopener noreferrer"
              className="btn" style={{ background: '#fff', color: 'var(--blue)', fontWeight: 700 }}>💬 WhatsApp Us</a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
        @media(max-width:900px){.hero-g{grid-template-columns:1fr!important}}
        @media(max-width:600px){.trust-g{grid-template-columns:1fr 1fr!important}}
      `}</style>
    </div>
  )
}
