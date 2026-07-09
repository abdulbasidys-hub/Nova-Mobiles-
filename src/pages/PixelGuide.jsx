import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllPhonesInstant } from '../lib/phones'
import { formatPrice, buildWhatsAppUrl } from '../lib/constants'

const PRIORITIES = [
  { id:'camera',      label:'📸 Camera',          desc:'Best photo & video quality' },
  { id:'battery',     label:'🔋 Battery Life',     desc:'All-day and beyond' },
  { id:'value',       label:'💰 Best Value',       desc:'Most phone for the money' },
  { id:'performance', label:'⚡ Performance',      desc:'Fast, smooth, no lag' },
  { id:'longevity',   label:'🔄 Long-term Use',    desc:'Updates for years to come' },
  { id:'compact',     label:'🤏 Compact Size',     desc:'Light and easy to carry' },
]

const USE_CASES = [
  { id:'photography', label:'📸 Photography',   desc:'I shoot a lot of photos and videos' },
  { id:'student',     label:'🎓 Student',        desc:'Social media, studying, everyday use' },
  { id:'business',    label:'💼 Business',       desc:'Calls, emails, productivity' },
  { id:'gaming',      label:'🎮 Gaming',         desc:'Mobile gaming and media' },
  { id:'budget',      label:'💵 Tight Budget',   desc:'Best phone I can get right now' },
]

/* Score a phone against selected priorities */
function scorePhone(phone, priorities, useCase) {
  let score = 0
  const specs   = phone.specs || {}
  const model   = (phone.name || phone.model || '').toLowerCase()
  const camera  = (specs.camera || '').toLowerCase()
  const battery = (specs.battery || '').toLowerCase()
  const os      = (specs.os || '').toLowerCase()
  const brand   = (phone.brand || '').toLowerCase()
  const price   = phone.price || 0

  // Newer model = higher base score
  const modelNum = Math.max(...(model.match(/\d+/g) || [0]).map(Number))
  score += Math.min(modelNum * 0.5, 30)

  // Condition: brand new > london used > nigerian used
  if (phone.condition === 'Brand New')    score += 15
  if (phone.condition === 'London Used')  score += 8

  priorities.forEach(p => {
    if (p === 'camera') {
      if (camera.includes('triple') || camera.includes('quad')) score += 25
      if (camera.includes('50mp') || camera.includes('108mp') || camera.includes('200mp')) score += 20
      if (camera.includes('pro') || camera.includes('ois'))   score += 10
    }
    if (p === 'battery') {
      const mah = parseInt((battery.match(/(\d{4,5})mah/i) || [])[1] || 0)
      score += Math.min(mah / 120, 30)
    }
    if (p === 'value') {
      // Lower price = higher value score (inverted)
      score += Math.max(0, 40 - (price / 20000))
    }
    if (p === 'performance') {
      if (brand.includes('google') || brand.includes('pixel')) score += 20
      if (brand.includes('samsung') && model.includes('ultra')) score += 18
      if (model.includes('pro') || model.includes('ultra')) score += 10
    }
    if (p === 'longevity') {
      if (brand.includes('google') || brand.includes('pixel')) score += 30
      if (os.includes('android 14') || os.includes('android 15')) score += 10
    }
    if (p === 'compact') {
      if (!model.includes('pro max') && !model.includes('ultra') && !model.includes('plus')) score += 20
      if (model.includes('mini') || model.includes('compact')) score += 15
    }
  })

  // Use case bonuses
  if (useCase === 'photography') {
    if (camera.includes('triple') || camera.includes('pro')) score += 20
    if (brand.includes('google') || brand.includes('pixel')) score += 15
    if (brand.includes('huawei')) score += 12
  }
  if (useCase === 'student') {
    score += Math.max(0, 25 - (price / 15000))
    if (phone.condition === 'London Used') score += 10
  }
  if (useCase === 'business') {
    if (brand.includes('google') || brand.includes('pixel')) score += 15
    if (brand.includes('iphone')) score += 15
    if (model.includes('pro')) score += 10
  }
  if (useCase === 'gaming') {
    if (model.includes('ultra') || model.includes('pro')) score += 20
    if (brand.includes('samsung')) score += 12
  }
  if (useCase === 'budget') {
    score += Math.max(0, 50 - (price / 8000))
  }

  return score
}

export default function PhoneFinder() {
  const [phones,     setPhones]     = useState([])
  const [selected,   setSelected]   = useState([])   // priority ids
  const [useCase,    setUseCase]    = useState(null)
  const [results,    setResults]    = useState([])
  const [searched,   setSearched]   = useState(false)

  useEffect(() => {
    getAllPhonesInstant(all => setPhones(all.filter(p => p.available)))
  }, [])

  const togglePriority = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : prev.length < 3 ? [...prev, id] : prev
    )
    setSearched(false)
  }

  const findPhones = () => {
    if (!selected.length && !useCase) return
    const scored = phones
      .map(p => ({ ...p, _score: scorePhone(p, selected, useCase) }))
      .sort((a, b) => b._score - a._score)
      .slice(0, 6)
    setResults(scored)
    setSearched(true)
  }

  const reset = () => { setSelected([]); setUseCase(null); setResults([]); setSearched(false) }

  return (
    <div className="pt" style={{ paddingBottom: '5rem', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Logo watermark — right side, bleeds outside page */}
      <img src="/logo.png" alt="" aria-hidden="true"
        style={{ position: 'fixed', right: '-8vw', top: '50%', transform: 'translateY(-50%)', width: '45vw', maxWidth: 420, opacity: 0.045, pointerEvents: 'none', userSelect: 'none', zIndex: 0, filter: 'grayscale(1)' }}
      />
      {/* Logo watermark — right side, partially outside */}
      <img src="/logo.png" alt="" aria-hidden="true"
        style={{ position: 'fixed', right: '-8vw', top: '50%', transform: 'translateY(-50%)', width: '45vw', maxWidth: 420, opacity: 0.045, pointerEvents: 'none', userSelect: 'none', zIndex: 0, filter: 'grayscale(1)' }}
      />

      {/* Header */}
      <div style={{ background: 'var(--primary)', padding: '2.5rem 0' }}>
        <div className="W">
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#fff', letterSpacing: '-.02em', marginBottom: '.5rem' }}>
            Find Your Perfect Phone
          </h1>
          <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '.95rem', maxWidth: 480 }}>
            Tell us what matters most. We'll match you with the best phones we have in stock right now.
          </p>
        </div>
      </div>

      <div className="W" style={{ paddingTop: '2.5rem' }}>

        {/* Step 1 — Priorities */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--on-surface-var)', marginBottom: '.35rem' }}>
            Step 1 — What matters most to you? <span style={{ fontWeight: 400 }}>(pick up to 3)</span>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginTop: '.75rem' }}>
            {PRIORITIES.map(p => {
              const active = selected.includes(p.id)
              const disabled = !active && selected.length >= 3
              return (
                <button key={p.id} onClick={() => !disabled && togglePriority(p.id)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '.1rem', padding: '.6rem 1rem', border: `2px solid ${active ? 'var(--primary)' : 'var(--outline-var)'}`, borderRadius: 12, background: active ? 'var(--blue-tint)' : 'var(--surface-lowest)', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1, transition: 'all .15s', minWidth: 130 }}>
                  <span style={{ fontWeight: 700, fontSize: '.875rem', color: active ? 'var(--primary)' : 'var(--on-surface)' }}>{p.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 2 — Use case */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--on-surface-var)', marginBottom: '.75rem' }}>
            Step 2 — How do you mainly use your phone? <span style={{ fontWeight: 400 }}>(optional)</span>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
            {USE_CASES.map(u => {
              const active = useCase === u.id
              return (
                <button key={u.id} onClick={() => { setUseCase(active ? null : u.id); setSearched(false) }}
                  style={{ padding: '.5rem 1rem', border: `2px solid ${active ? 'var(--primary)' : 'var(--outline-var)'}`, borderRadius: 99, background: active ? 'var(--blue-tint)' : 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontWeight: active ? 700 : 500, fontSize: '.85rem', color: active ? 'var(--primary)' : 'var(--on-surface)', transition: 'all .15s' }}>
                  {u.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Find button */}
        <div style={{ display: 'flex', gap: '.75rem', marginBottom: '2.5rem', alignItems: 'center' }}>
          <button onClick={findPhones} disabled={!selected.length && !useCase}
            style={{ background: selected.length || useCase ? 'var(--primary)' : 'var(--outline-var)', color: '#fff', border: 'none', borderRadius: 12, padding: '.75rem 2rem', fontFamily: 'inherit', fontWeight: 700, fontSize: '1rem', cursor: selected.length || useCase ? 'pointer' : 'default', transition: 'background .15s' }}>
            Find My Phone →
          </button>
          {searched && <button onClick={reset} style={{ background: 'none', border: 'none', color: 'var(--on-surface-var)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '.85rem', textDecoration: 'underline' }}>Start over</button>}
        </div>

        {/* Results */}
        {searched && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--surface-low)', borderRadius: 16, color: 'var(--on-surface-var)' }}>
            <div style={{ fontSize: 40, marginBottom: '1rem' }}>📭</div>
            <p style={{ fontWeight: 700, marginBottom: '.5rem' }}>No matches in stock right now</p>
            <p style={{ fontSize: '.85rem', marginBottom: '1.25rem' }}>Tell us what you need and we'll source it for you.</p>
            <a href={buildWhatsAppUrl('Hi! I used the phone finder and nothing matched. Can you help me find a phone?')} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', background: '#25D366', color: '#fff', padding: '.6rem 1.5rem', borderRadius: 10, fontWeight: 700, fontSize: '.875rem', textDecoration: 'none' }}>
              💬 Ask Us on WhatsApp
            </a>
          </div>
        )}

        {searched && results.length > 0 && (
          <div>
            <p style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--on-surface-var)', marginBottom: '1rem' }}>
              {results.length} best match{results.length !== 1 ? 'es' : ''} in stock
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {results.map((phone, i) => (
                <div key={phone.id} style={{ border: `2px solid ${i === 0 ? 'var(--primary)' : 'var(--outline-var)'}`, borderRadius: 16, overflow: 'hidden', background: 'var(--surface-lowest)', position: 'relative' }}>
                  {i === 0 && (
                    <div style={{ background: 'var(--primary)', color: '#fff', fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', padding: '.25rem .75rem', textAlign: 'center' }}>
                      ⭐ Best Match
                    </div>
                  )}
                  {phone.images?.[0] && (
                    <div style={{ height: 180, background: 'var(--surface-low)', overflow: 'hidden' }}>
                      <img src={phone.images[0]} alt={phone.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    </div>
                  )}
                  <div style={{ padding: '1rem' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.95rem', marginBottom: '.2rem' }}>{phone.name || phone.model}</p>
                    <p style={{ fontSize: '.75rem', color: 'var(--on-surface-var)', marginBottom: '.65rem' }}>{phone.color} · {phone.storage} · {phone.condition}</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '1rem' }}>{formatPrice(phone.price)}</p>
                    <div style={{ display: 'flex', gap: '.5rem' }}>
                      <Link to={`/shop/${phone.slug}`}
                        style={{ flex: 1, display: 'block', textAlign: 'center', background: 'var(--primary)', color: '#fff', padding: '.5rem', borderRadius: 8, fontWeight: 700, fontSize: '.82rem', textDecoration: 'none' }}>
                        View Phone
                      </Link>
                      <a href={buildWhatsAppUrl(`Hi! The phone finder recommended the ${phone.name || phone.model} for me. Is it available?`)}
                        target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#25D366', color: '#fff', padding: '.5rem .75rem', borderRadius: 8, fontSize: '.82rem', textDecoration: 'none', fontWeight: 700 }}>
                        💬
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


      </div>
    </div>
  )
}