import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPhoneBySlug, getAllPhones } from '../lib/phones'
import { buildPhoneWhatsAppUrl, buildWhatsAppUrl, formatPrice } from '../lib/constants'
import StatusBadge from '../components/StatusBadge'
import SpecGrid from '../components/SpecGrid'
import ProductCard from '../components/ProductCard'

export default function PhoneDetail() {
  const { slug } = useParams()
  const [phone, setPhone]   = useState(null)
  const [rel,   setRel]     = useState([])
  const [load,  setLoad]    = useState(true)
  const [img,   setImg]     = useState(0)

  useEffect(() => {
    setLoad(true); setImg(0)
    getPhoneBySlug(slug).then(d => {
      setPhone(d); setLoad(false)
      if (d) getAllPhones().then(all => setRel(all.filter(p => p.brand === d.brand && p.slug !== slug && p.available).slice(0, 4)))
    })
  }, [slug])

  if (load) return (
    <div className="pt" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 30, height: 30, border: '2.5px solid var(--blue)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin .6s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
  if (!phone) return (
    <div className="pt" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <span style={{ fontSize: 48 }}>📭</span>
      <p style={{ color: 'var(--ink-3)' }}>Phone not found.</p>
      <Link to="/shop" className="btn btn-blue btn-sm">← Back to Shop</Link>
    </div>
  )
  const sold = !phone.available

  return (
    <div className="pt" style={{ paddingBottom: '5rem' }}>
      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
        <div className="W" style={{ padding: '.6rem 2rem', display: 'flex', gap: '.4rem', fontSize: '.72rem', color: 'var(--ink-4)', alignItems: 'center' }}>
          <Link to="/"     style={{ color: 'var(--ink-4)', transition: 'color .12s' }} onMouseEnter={e => e.currentTarget.style.color='var(--blue)'} onMouseLeave={e => e.currentTarget.style.color='var(--ink-4)'}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: 'var(--ink-4)', transition: 'color .12s' }} onMouseEnter={e => e.currentTarget.style.color='var(--blue)'} onMouseLeave={e => e.currentTarget.style.color='var(--ink-4)'}>Shop</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)' }}>{phone.name}</span>
        </div>
      </div>

      <div className="W" style={{ paddingTop: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3.5rem', marginBottom: '3.5rem', alignItems: 'start' }} className="det-g">

          {/* Gallery */}
          <div>
            <div style={{ height: 380, background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 'var(--r)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '.65rem' }}>
              {phone.images?.[img]
                ? <img src={phone.images[img]} alt={phone.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: 72, opacity: .2 }}>📱</span>
              }
            </div>
            {phone.images?.length > 1 && (
              <div style={{ display: 'flex', gap: 6 }}>
                {phone.images.map((src, i) => (
                  <button key={i} onClick={() => setImg(i)} style={{ width: 62, height: 62, flexShrink: 0, padding: 0, cursor: 'pointer', borderRadius: 4, overflow: 'hidden', border: `2px solid ${i === img ? 'var(--blue)' : 'var(--line)'}`, background: 'var(--bg-2)', transition: 'border-color .12s' }}>
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info + Action Panel */}
          <div>
            {/* Brand + badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap', marginBottom: '.5rem' }}>
              <span style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--blue)' }}>{phone.brand}</span>
              <StatusBadge value={phone.condition} />
              {sold && <StatusBadge value="Sold" />}
              {phone.featured && !sold && <span className="st st-blue">★ Featured</span>}
            </div>

            <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', letterSpacing: '-.025em', lineHeight: 1.05, marginBottom: '.4rem' }}>{phone.name}</h1>
            <p style={{ color: 'var(--ink-3)', fontSize: '.82rem', marginBottom: '1.5rem' }}>{[phone.storage, phone.color].filter(Boolean).join(' · ')}</p>

            {/* Price panel */}
            <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--r)', overflow: 'hidden', marginBottom: '1.25rem' }}>
              <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="num" style={{ fontSize: '2rem', color: 'var(--ink)' }}>{formatPrice(phone.price)}</span>
                <StatusBadge value={phone.available ? 'Available' : 'Sold'} />
              </div>
              <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
                {phone.available ? (
                  <>
                    <a href={buildPhoneWhatsAppUrl(phone)} target="_blank" rel="noopener noreferrer" className="btn btn-green btn-w btn-lg">💬 Buy via WhatsApp</a>
                    <a href={buildWhatsAppUrl(`Hi! I want to ask about the ${phone.name}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-w">Ask a Question</a>
                  </>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--st-sold-ink)', fontWeight: 600, fontSize: '.875rem', marginBottom: '.35rem' }}>This phone has been sold.</p>
                    <Link to="/shop" style={{ color: 'var(--blue)', fontSize: '.78rem', fontWeight: 600 }}>Browse available phones →</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Best for */}
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--ink-3)', marginBottom: '.5rem' }}>Best For</p>
              <div style={{ display: 'flex', gap: '.35rem', flexWrap: 'wrap' }}>
                {(phone.brand === 'Google Pixel'
                  ? ['Photography', 'Pure Android', 'Long-term value', 'AI features']
                  : phone.brand === 'iPhone'
                  ? ['iOS ecosystem', 'Premium build', 'Resale value']
                  : ['Performance', 'Everyday use', 'Value']).map(t => (
                  <span key={t} className="st st-blue">{t}</span>
                ))}
              </div>
            </div>

            {/* Condition/what you get */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--line)', borderRadius: 'var(--r)', overflow: 'hidden', marginBottom: '1.25rem' }}>
              <div style={{ padding: '.5rem .85rem', background: 'var(--bg-2)', borderBottom: '1px solid var(--line)' }}>
                <span style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--ink-3)' }}>What You Get</span>
              </div>
              {['Phone in described condition', 'Full warranty included', 'Returns accepted', 'Genuine device — verified'].map((f, i) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '.6rem', padding: '.5rem .85rem', borderBottom: '1px solid var(--line)', fontSize: '.8rem', color: 'var(--ink-2)' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
                </div>
              ))}
            </div>

            {/* Specs */}
            {phone.specs && (
              <div>
                <p style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--ink-3)', marginBottom: '.5rem' }}>Specifications</p>
                <SpecGrid specs={phone.specs} />
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {rel.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.25rem' }}>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.1rem' }}>More {phone.brand} Phones</h2>
              <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
              <Link to="/shop" style={{ fontSize: '.75rem', color: 'var(--blue)', fontWeight: 600 }}>All phones →</Link>
            </div>
            <div className="g4">{rel.map(p => <ProductCard key={p.id} phone={p} />)}</div>
          </div>
        )}

        {/* WhatsApp CTA band */}
        <div style={{ marginTop: '3rem', background: 'var(--green)', borderRadius: 'var(--r)', padding: '1.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: '.25rem' }}>Ready to buy? WhatsApp us now.</p>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '.82rem' }}>We reply fast. Ask about price, delivery, or anything else.</p>
          </div>
          <a href={buildPhoneWhatsAppUrl(phone)} target="_blank" rel="noopener noreferrer"
            className="btn" style={{ background: '#fff', color: 'var(--green)', fontWeight: 700 }}>💬 Open WhatsApp</a>
        </div>
      </div>

      <style>{`@media(max-width:768px){.det-g{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </div>
  )
}
