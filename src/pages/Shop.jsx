import { useState, useEffect, useRef } from 'react'
import { getAllPhonesInstant } from '../lib/phones'
import ProductCard from '../components/ProductCard'
import WatermarkSection from '../components/WatermarkSection'

const BRAND_ORDER = ['Google Pixel', 'iPhone', 'Samsung', 'Oppo']

function BrandSection({ brand, phones }) {
  const [open, setOpen] = useState(brand === 'Google Pixel') // Pixel open by default

  return (
    <div style={{ marginBottom: 0, borderBottom: '1px solid var(--outline-var)' }}>
      {/* Collapsible header */}
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.1rem 0', background: 'none', border: 'none', cursor: 'pointer',
        textAlign: 'left',
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', color: 'var(--on-surface)' }}>
          {brand}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <span style={{ color: 'var(--outline)', fontSize: '.78rem', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
            {phones.length} model{phones.length !== 1 ? 's' : ''}
          </span>
          <span className="material-symbols-outlined" style={{
            color: 'var(--outline)', fontSize: 22,
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform .25s',
          }}>expand_more</span>
        </div>
      </button>

      {/* Horizontal peek carousel */}
      {open && (
        <div style={{ paddingBottom: '1.75rem' }}>
          <div className="peek-slider" style={{ gap: '1rem' }}>
            {phones.map(p => (
              <div key={p.id} style={{ width: 240, flexShrink: 0 }}>
                <ProductCard phone={p} />
              </div>
            ))}
            {/* Peek ghost */}
            <div style={{ width: 60, flexShrink: 0, borderRadius: 16, border: '1px solid var(--outline-var)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: .4 }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--outline)', fontSize: 24 }}>chevron_right</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Shop() {
  const [phones,  setPhones]  = useState([])
  const [search,  setSearch]  = useState('')

  useEffect(() => { getAllPhonesInstant(setPhones) }, [])

  const q = search.trim().toLowerCase()
  const filtered = q
    ? phones.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.condition?.toLowerCase().includes(q) ||
        p.storage?.toLowerCase().includes(q) ||
        p.color?.toLowerCase().includes(q)
      )
    : phones

  const allBrands = [...new Set(filtered.map(p => p.brand))]
  const ordered   = [
    ...BRAND_ORDER.filter(b => allBrands.includes(b)),
    ...allBrands.filter(b => !BRAND_ORDER.includes(b)),
  ]
  const grouped = {}
  ordered.forEach(b => {
    const l = filtered.filter(p => p.brand === b)
    if (l.length) grouped[b] = l
  })

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }} className="pt">

      {/* Header */}
      <WatermarkSection src="/images/logo.png" lightOp={0.04} darkOp={0.06} wmSize="320px" wmAlign="right"
        style={{ background: 'var(--surface-low)', borderBottom: '1px solid var(--outline-var)', padding: '2rem 0' }}>
        <div className="W">
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.6rem,3.5vw,2.25rem)', letterSpacing: '-.02em', marginBottom: '.3rem' }}>Explore Our Inventory</h1>
          <p style={{ color: 'var(--on-surface-var)', fontSize: '.9rem', maxWidth: 520 }}>
            Precision-inspected, premium quality. Discover the latest Pixel, iPhone, and Samsung flagships.
          </p>
        </div>
      </WatermarkSection>

      {/* Sticky search bar */}
      <div style={{ position: 'sticky', top: 80, zIndex: 200, background: 'var(--glass-nav)', backdropFilter: 'blur(16px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)', borderBottom: '1px solid var(--outline-var)', padding: '.65rem 0' }}>
        <div className="W" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 440 }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: 'var(--outline)', pointerEvents: 'none' }}>search</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search inventory..."
              style={{ paddingLeft: '2.5rem', borderRadius: 999, height: 40, fontSize: '.875rem', background: 'var(--surface-lowest)', boxShadow: '0 1px 3px rgba(60,64,67,.12)' }}
              autoComplete="off"
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--outline)', fontSize: 16, lineHeight: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
              </button>
            )}
          </div>
          {q && (
            <span style={{ fontSize: '.78rem', color: 'var(--outline)', fontWeight: 600, flexShrink: 0 }}>
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="W" style={{ paddingTop: '1.5rem', paddingBottom: '5rem' }}>
        {filtered.length === 0 && q ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 64, color: 'var(--outline-var)', display: 'block', marginBottom: '1rem' }}>search_off</span>
            <p style={{ color: 'var(--on-surface-var)', marginBottom: '.75rem', fontSize: '1rem' }}>No results for "<strong>{q}</strong>"</p>
            <button onClick={() => setSearch('')} className="btn btn-ghost btn-sm">Clear Search</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Object.entries(grouped).map(([brand, list]) => (
              <BrandSection key={brand} brand={brand} phones={list} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
