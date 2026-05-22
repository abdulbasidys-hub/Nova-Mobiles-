import { useState, useEffect } from 'react'
import { getAllPhones } from '../lib/phones'
import { CONDITIONS } from '../lib/constants'
import PhoneCard from '../components/PhoneCard'
import WatermarkBackground from '../components/WatermarkBackground'

const BRANDS = ['All', 'Google Pixel', 'iPhone', 'Samsung', 'Oppo', 'Other']
const SORTS  = [
  { v: 'price-desc', l: 'Price: High → Low' },
  { v: 'price-asc',  l: 'Price: Low → High' },
  { v: 'name',       l: 'Name A–Z' },
]
const ICONS = { 'Google Pixel': '🟢', 'iPhone': '🍎', 'Samsung': '🔵', 'Oppo': '🟠' }

function Chip({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '0.32rem 0.9rem',
      borderRadius: 999,
      fontSize: '0.78rem', fontWeight: 600,
      fontFamily: 'var(--font-body)',
      border: `1px solid ${active ? 'var(--blue)' : 'var(--rule-strong)'}`,
      background: active ? 'var(--blue-dim)' : 'transparent',
      color: active ? 'var(--blue)' : 'var(--ink-muted)',
      cursor: 'pointer',
      transition: 'all 0.12s',
      whiteSpace: 'nowrap',
    }}>{children}</button>
  )
}

export default function Shop() {
  const [phones,    setPhones]    = useState([])
  const [search,    setSearch]    = useState('')
  const [brand,     setBrand]     = useState('All')
  const [condition, setCondition] = useState('All')
  const [sort,      setSort]      = useState('price-desc')
  const [showSold,  setShowSold]  = useState(true)
  const [loading,   setLoading]   = useState(true)

  useEffect(() => { getAllPhones().then(d => { setPhones(d); setLoading(false) }) }, [])

  let filtered = phones.filter(p => {
    if (!showSold && !p.available) return false
    const s = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
    const b = brand === 'All' || p.brand === brand
    const c = condition === 'All' || p.condition === condition
    return s && b && c
  }).sort((a, b) => {
    if (sort === 'price-asc')  return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    return a.name.localeCompare(b.name)
  })

  const activeBrands = brand === 'All'
    ? [...new Set(filtered.map(p => p.brand))]
    : [brand]

  const grouped = {}
  activeBrands.forEach(b => {
    const list = filtered.filter(p => p.brand === b)
    if (list.length) grouped[b] = list
  })

  return (
    <div className="page-top">

      {/* Header */}
      <div style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--rule)', background: 'var(--bg-off)', padding: '2.5rem 0' }}>
        <WatermarkBackground src="/images/logo.png" lightOpacity={0.03} darkOpacity={0.05} size="360px" align="right" />
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--blue)', display: 'block', marginBottom: '0.4rem' }}>Inventory</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', letterSpacing: '-0.025em', marginBottom: '0.4rem' }}>All Phones</h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.82rem', maxWidth: 540 }}>
            Every phone listed here has been personally sourced, inspected, and verified by Nova Mobiles Plus. Inventory updates regularly.
          </p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div style={{ position: 'sticky', top: 62, zIndex: 200, background: 'var(--bg)', borderBottom: '1px solid var(--rule)' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 2rem', overflowX: 'auto', flexWrap: 'nowrap' }}>

          {/* Search */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-faint)', fontSize: 12, pointerEvents: 'none' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              style={{ paddingLeft: '1.75rem', width: 160, height: 32, fontSize: '0.78rem', borderRadius: 999 }} />
          </div>

          <div style={{ width: 1, height: 20, background: 'var(--rule)', flexShrink: 0 }} />

          {/* Brand chips */}
          {BRANDS.map(b => (
            <Chip key={b} active={brand === b} onClick={() => setBrand(b)}>
              {ICONS[b] && <span style={{ marginRight: 4 }}>{ICONS[b]}</span>}{b}
            </Chip>
          ))}

          <div style={{ width: 1, height: 20, background: 'var(--rule)', flexShrink: 0 }} />

          {/* Condition chips */}
          {CONDITIONS.map(c => (
            <Chip key={c} active={condition === c} onClick={() => setCondition(c)}>{c}</Chip>
          ))}

          <div style={{ width: 1, height: 20, background: 'var(--rule)', flexShrink: 0 }} />

          {/* Sort */}
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ height: 32, fontSize: '0.75rem', borderRadius: 999, padding: '0 0.75rem', minWidth: 160, flexShrink: 0 }}>
            {SORTS.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
          </select>

          {/* Show sold */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap', fontSize: '0.75rem', color: 'var(--ink-muted)', fontWeight: 600, margin: 0 }}>
            <input type="checkbox" checked={showSold} onChange={e => setShowSold(e.target.checked)}
              style={{ width: 'auto', accentColor: 'var(--blue)' }} />
            Show Sold
          </label>

          <span style={{ fontSize: '0.72rem', color: 'var(--ink-faint)', marginLeft: 'auto', flexShrink: 0 }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Results */}
      <div className="wrap" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        {loading ? (
          <div className="g4">{[...Array(8)].map((_, i) => <div key={i} className="skel" style={{ height: 360 }} />)}</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <p style={{ fontSize: 40, marginBottom: '1rem' }}>📭</p>
            <p style={{ color: 'var(--ink-muted)', marginBottom: '1rem' }}>No phones match your filters.</p>
            <button onClick={() => { setSearch(''); setBrand('All'); setCondition('All') }} className="btn btn-ghost btn-sm">Clear Filters</button>
          </div>
        ) : (
          Object.entries(grouped).map(([b, list]) => (
            <div key={b} style={{ marginBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  {ICONS[b] && <span>{ICONS[b]}</span>}
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800 }}>{b}</h2>
                  {b === 'Google Pixel' && (
                    <span className="badge badge-blue" style={{ marginLeft: 4 }}>Specialists</span>
                  )}
                </div>
                <span style={{ color: 'var(--ink-faint)', fontSize: '0.72rem', fontWeight: 600 }}>{list.length} model{list.length !== 1 ? 's' : ''}</span>
                <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
              </div>
              <div className="g4">{list.map(p => <PhoneCard key={p.id} phone={p} />)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
