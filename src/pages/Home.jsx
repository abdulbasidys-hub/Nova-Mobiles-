import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedPhones, getReviews, getAllPhones } from '../lib/phones'
import { buildWhatsAppUrl, buildPhoneWhatsAppUrl, formatPrice } from '../lib/constants'
import WatermarkBackground from '../components/WatermarkBackground'
import PhoneCard from '../components/PhoneCard'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [reviews,  setReviews]  = useState([])
  const [potw,     setPotw]     = useState(null) // Phone of the Week

  useEffect(() => {
    getFeaturedPhones().then(d => { setFeatured(d); setPotw(d[0] || null) })
    getReviews().then(setReviews)
  }, [])

  return (
    <div className="page-top">

      {/* ══ HERO ═══════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--rule)', paddingBottom: 0 }}>
        <WatermarkBackground src="/images/logo.png" lightOpacity={0.03} darkOpacity={0.05} size="480px" align="right" />

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

          {/* Masthead headline */}
          <div style={{ padding: '4rem 0 2.5rem', borderBottom: '1px solid var(--rule)' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--blue)', marginBottom: '1rem' }}>
              No. 6 Lukoro B Farm Center, Kano — Est. 2015
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              color: 'var(--ink)',
              marginBottom: '1.5rem',
              maxWidth: 780,
            }}>
              Kano's Trusted<br />
              <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>Google Pixel</em><br />
              Destination.
            </h1>

            {/* Quick links row */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Browse Inventory →', to: '/shop',        cls: 'btn btn-primary btn-sm' },
                { label: 'Compare Pixels',     to: '/pixel-guide', cls: 'btn btn-ghost btn-sm' },
                { label: 'Learn Before Buying', to: '/pixel-guide', cls: 'btn btn-ghost btn-sm' },
                { label: '💬 Chat on WhatsApp', href: buildWhatsAppUrl('Hi! I want to buy a phone.'), cls: 'btn btn-green btn-sm' },
              ].map((l, i) =>
                l.href
                  ? <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className={l.cls}>{l.label}</a>
                  : <Link key={i} to={l.to} className={l.cls}>{l.label}</Link>
              )}
            </div>
          </div>

          {/* Phone of the Week */}
          <div style={{ padding: '2rem 0', borderBottom: '1px solid var(--rule)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-faint)' }}>Phone of the Week</span>
              <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
              <Link to="/shop" style={{ fontSize: '0.75rem', color: 'var(--blue)', fontWeight: 600 }}>See all →</Link>
            </div>

            {potw ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center' }} className="potw-grid">
                {/* Image */}
                <div style={{ background: 'var(--bg-off)', borderRadius: 8, border: '1px solid var(--rule)', height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {potw.images?.[0]
                    ? <img src={potw.images[0]} alt={potw.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ fontSize: 80, opacity: 0.25 }}>📱</span>
                  }
                </div>
                {/* Info */}
                <div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--blue)', display: 'block', marginBottom: '0.5rem' }}>{potw.brand}</span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', lineHeight: 1.1, marginBottom: '0.75rem' }}>{potw.name}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.6rem' }}>{formatPrice(potw.price)}</span>
                    <span className={`badge ${potw.condition === 'Brand New' ? 'badge-new' : potw.condition === 'London Used' ? 'badge-london' : 'badge-ng'}`}>{potw.condition}</span>
                    {potw.storage && <span style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>{potw.storage}</span>}
                  </div>
                  {potw.specs && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-off)', borderRadius: 6, border: '1px solid var(--rule)' }}>
                      {Object.entries(potw.specs).slice(0, 3).map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', gap: '1rem' }}>
                          <span style={{ color: 'var(--ink-faint)', fontSize: '0.75rem', textTransform: 'capitalize', width: 80, flexShrink: 0 }}>{k}</span>
                          <span style={{ color: 'var(--ink-2)', fontSize: '0.82rem', fontWeight: 500 }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <a href={buildPhoneWhatsAppUrl(potw)} target="_blank" rel="noopener noreferrer" className="btn btn-green">💬 Buy on WhatsApp</a>
                    <Link to={`/shop/${potw.slug}`} className="btn btn-ghost">Full Details</Link>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                <div className="skel" style={{ height: 320 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="skel" style={{ height: 28, width: '60%' }} />
                  <div className="skel" style={{ height: 52 }} />
                  <div className="skel" style={{ height: 90 }} />
                </div>
              </div>
            )}
          </div>
        </div>

        <style>{`@media (max-width: 768px) { .potw-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ══ WHY PIXEL? ═════════════════════════════════════ */}
      <section className="sec" style={{ borderBottom: '1px solid var(--rule)' }}>
        <div className="wrap">
          <div className="sec-label"><span>Why Google Pixel?</span></div>
          <div className="g3">
            {[
              {
                num: '01', icon: '📸', head: 'The best camera\non any phone.',
                body: 'Pixel's computational photography — Night Sight, Magic Eraser, Real Tone — produces professional-quality shots without editing. No other Android camera comes close.'
              },
              {
                num: '02', icon: '🤖', head: 'Pure Android.\nNo clutter.',
                body: 'Zero bloatware. No manufacturer skin. Just fast, clean Android exactly as Google designed it — with exclusive AI features like Call Screen and Live Translate.'
              },
              {
                num: '03', icon: '💰', head: 'Flagship value\nfor half the price.',
                body: 'A London Used Pixel 7 Pro gives you flagship performance for the price of a mid-range phone. No other brand offers this kind of value in Kano.'
              },
            ].map(p => (
              <div key={p.num} style={{ paddingTop: '1.5rem', borderTop: '2px solid var(--blue)' }}>
                <span className="editorial-num">{p.num}</span>
                <div style={{ fontSize: 28, margin: '0.75rem 0' }}>{p.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 700, lineHeight: 1.2, whiteSpace: 'pre-line', marginBottom: '0.85rem' }}>{p.head}</h3>
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.875rem', lineHeight: 1.75 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED INVENTORY ═════════════════════════════ */}
      <section className="sec" style={{ background: 'var(--bg-off)', borderBottom: '1px solid var(--rule)' }}>
        <div className="wrap">
          <div className="sec-label"><span>Featured Inventory</span></div>
          {featured.length === 0
            ? <div className="g4">{[...Array(4)].map((_, i) => <div key={i} className="skel" style={{ height: 360 }} />)}</div>
            : <div className="g4">{featured.map(p => <PhoneCard key={p.id} phone={p} />)}</div>
          }
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/shop" className="btn btn-ghost">View Full Inventory →</Link>
          </div>
        </div>
      </section>

      {/* ══ CUSTOMER REVIEWS ═══════════════════════════════ */}
      <section className="sec" style={{ borderBottom: '1px solid var(--rule)' }}>
        <div className="wrap">
          <div className="sec-label"><span>What Customers Say</span></div>
          {reviews.length === 0
            ? <div className="g3">{[...Array(3)].map((_, i) => <div key={i} className="skel" style={{ height: 160 }} />)}</div>
            : <div className="g3">
                {reviews.slice(0, 3).map(r => (
                  <blockquote key={r.id} style={{
                    borderLeft: '3px solid var(--blue)',
                    paddingLeft: '1.25rem',
                    paddingTop: '0.25rem',
                  }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-2)', marginBottom: '1rem' }}>
                      "{r.text}"
                    </p>
                    <footer>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--blue-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700, color: 'var(--blue)', flexShrink: 0 }}>
                          {r.name?.[0]}
                        </div>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--ink)' }}>{r.name}</p>
                          <p style={{ color: 'var(--ink-faint)', fontSize: '0.72rem' }}>{'★'.repeat(r.rating || 5)}</p>
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                ))}
              </div>
          }
        </div>
      </section>

      {/* ══ LONDON USED EDUCATION PREVIEW ══════════════════ */}
      <section className="sec" style={{ borderBottom: '1px solid var(--rule)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }} className="lu-grid">
            <div>
              <div className="sec-label"><span>Education</span></div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
                Buying London Used?<br /><em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>Here's what you should know.</em>
              </h2>
              <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                London Used phones are pre-owned devices sourced from the UK and Europe. At Nova Mobiles Plus, every one is tested, graded, and sold with warranty. They're not gambles — they're smart value.
              </p>
              <Link to="/pixel-guide" className="btn btn-primary btn-sm">Read the Full Guide →</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                ['🔍', 'Inspected before sale', 'Every device tested for faults, screen quality, battery health, and connectivity.'],
                ['📦', 'What\'s in the box', 'Phones arrive with charger or cable. We tell you exactly what comes included.'],
                ['🛡️', 'Warranty still applies', 'You get our warranty regardless of the phone\'s age or origin. No exceptions.'],
                ['💡', 'How to grade the condition', 'We grade each phone Grade A (excellent), Grade B (good), or Grade C (visible wear).'],
              ].map(([icon, title, text], i, arr) => (
                <div key={title} style={{ display: 'flex', gap: '1rem', padding: '1.1rem 0', borderBottom: i < arr.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.2rem' }}>{title}</p>
                    <p style={{ color: 'var(--ink-muted)', fontSize: '0.8rem', lineHeight: 1.65 }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .lu-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }`}</style>
      </section>

      {/* ══ CTA CLOSER ═════════════════════════════════════ */}
      <section className="sec">
        <div className="wrap-narrow" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.1, marginBottom: '0.85rem' }}>
            Ready to find your phone?
          </h2>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '2rem', maxWidth: 440, margin: '0 auto 2rem' }}>
            Message us on WhatsApp — tell us your budget and what you need, and we'll guide you to the right device.
          </p>
          <a href={buildWhatsAppUrl("Hi Nova Mobiles Plus! I'm looking for a phone. Can you help?")}
            target="_blank" rel="noopener noreferrer" className="btn btn-green btn-lg">
            💬 Start the Conversation
          </a>
        </div>
      </section>

    </div>
  )
}
