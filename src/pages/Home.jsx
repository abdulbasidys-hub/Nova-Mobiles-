import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedPhones, getReviews } from '../lib/phones'
import { buildWhatsAppUrl } from '../lib/constants'
import PhoneCard from '../components/PhoneCard'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    getFeaturedPhones().then(setFeatured)
    getReviews().then(setReviews)
  }, [])

  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: 64 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(26,115,232,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(244,168,39,0.05) 0%, transparent 50%)' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <span className="badge badge-new" style={{ marginBottom: '1.5rem', fontSize: '0.875rem', padding: '0.4rem 1rem' }}>
            🇳🇬 Kano's #1 Phone Shop · 10+ Years Trusted
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Premium Phones.<br /><span style={{ color: 'var(--blue)' }}>Guaranteed</span> Genuine.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: 560, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            New, London Used & Accessories — Google Pixel, iPhone, Samsung, Oppo. Warranty on every phone. Nationwide delivery.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>Browse Phones →</Link>
            <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')} target="_blank" rel="noopener noreferrer"
              className="btn btn-green" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>WhatsApp Us</a>
          </div>
          <div style={{ marginTop: '3rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {['✓ Warranty Included', '✓ Genuine Phones Only', '✓ Returns Accepted', '✓ Nationwide Delivery'].map(t => <span key={t}>{t}</span>)}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>Why Choose Nova Mobiles Plus?</h2>
            <p style={{ color: 'var(--text-muted)' }}>Over a decade of trust, thousands of happy customers across Nigeria.</p>
          </div>
          <div className="grid-4">
            {[
              { icon: '🛡️', title: 'Warranty', desc: 'Every phone comes with warranty coverage for your peace of mind.' },
              { icon: '✅', title: '100% Genuine', desc: 'We only sell authentic phones — no fakes, no clones, ever.' },
              { icon: '🚚', title: 'Nationwide Delivery', desc: 'Fast delivery across Nigeria and worldwide shipping available.' },
              { icon: '🔄', title: 'Returns Policy', desc: 'Not satisfied? We accept returns. Your trust is our priority.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: 32, marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '2.25rem' }}>Featured Phones</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: 4 }}>Hand-picked top deals available now</p>
            </div>
            <Link to="/shop" style={{ color: 'var(--blue)', fontWeight: 600 }}>View All →</Link>
          </div>
          {featured.length === 0
            ? <div className="grid-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 320 }} />)}</div>
            : <div className="grid-3">{featured.slice(0, 3).map(p => <PhoneCard key={p.id} phone={p} />)}</div>
          }
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/shop" className="btn btn-primary">See All Phones →</Link>
          </div>
        </div>
      </section>

      {/* Pixel Spotlight */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg, rgba(26,115,232,0.15), rgba(17,24,39,0.8))', border: '1px solid rgba(26,115,232,0.2)', borderRadius: 'var(--radius)', padding: '4rem 2rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--blue)', fontWeight: 600, marginBottom: '0.75rem' }}>Google Pixel Specialists</p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', marginBottom: '1rem' }}>We Know Pixel Better Than Anyone</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto 2rem', lineHeight: 1.7 }}>
              From Pixel 6 to Pixel 9 Pro — we stock them all. Best camera phones at the best prices in Kano.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/pixel-guide" className="btn btn-primary">Read Pixel Guide</Link>
              <Link to="/shop" className="btn btn-ghost">Shop Pixel Phones</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>What Customers Say</h2>
            <p style={{ color: 'var(--text-muted)' }}>Trusted by thousands across Nigeria</p>
          </div>
          {reviews.length === 0
            ? <div className="grid-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 160 }} />)}</div>
            : <div className="grid-3">
                {reviews.slice(0, 3).map(r => (
                  <div key={r.id} className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ color: 'var(--gold)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{'★'.repeat(r.rating || 5)}</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>"{r.text}"</p>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.name}</p>
                  </div>
                ))}
              </div>
          }
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark">
        <div className="container" style={{ textAlign: 'center', maxWidth: 600 }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Ready to Get Your Phone?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>Message us on WhatsApp and we'll help you find the perfect phone within your budget.</p>
          <a href={buildWhatsAppUrl("Hi Nova Mobiles Plus! I'm looking for a phone. Can you help?")} target="_blank" rel="noopener noreferrer"
            className="btn btn-green" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
            💬 Chat With Us Now
          </a>
        </div>
      </section>
    </div>
  )
}
