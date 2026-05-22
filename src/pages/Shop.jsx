import { useState, useEffect, useRef } from 'react'
import { getAllPhones } from '../lib/phones'
import { CONDITIONS } from '../lib/constants'
import PhoneCard from '../components/PhoneCard'
import WatermarkBackground from '../components/WatermarkBackground'

const COMPANIES = ['All', 'Google Pixel', 'iPhone', 'Samsung', 'Oppo', 'Other']
const SORT_OPTIONS = [
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name-asc',   label: 'Name: A → Z' },
]
const COMPANY_ICONS = { 'Google Pixel': '🟢', 'iPhone': '🍎', 'Samsung': '🔵', 'Oppo': '🟠' }

export default function Shop() {
  const [phones, setPhones]       = useState([])
  const [search, setSearch]       = useState('')
  const [brand, setBrand]         = useState('All')
  const [condition, setCondition] = useState('All')
  const [sort, setSort]           = useState('price-desc')
  const [loading, setLoading]     = useState(true)
  const [showSold, setShowSold]   = useState(true)
  const filterRef = useRef(null)

  useEffect(() => {
    getAllPhones().then(data => { setPhones(data); setLoading(false) })
  }, [])

  // Filter
  let filtered = phones.filter(p => {
    if (!showSold && !p.available) return false
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
    const matchBrand  = brand === 'All' || p.brand === brand
    const matchCond   = condition === 'All' || p.condition === condition
    return matchSearch && matchBrand && matchCond
  })

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sort === 'price-asc')  return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'name-asc')   return a.name.localeCompare(b.name)
    return 0
  })

  // Group by brand
  const grouped = {}
  const brands = brand === 'All' ? [...new Set(filtered.map(p => p.brand))] : [brand]
  brands.forEach(b => {
    const list = filtered.filter(p => p.brand === b)
    if (list.length) grouped[b] = list
  })

  const totalCount = filtered.length

  return (
    <div className="page-pt">
      {/* ── PAGE HEADER ────────────────────────────────────── */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '2.5rem 0 2rem' }}>
        <WatermarkBackground src="/images/logo.png" opacity={0.04} size="360px" position="right" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--blue)', display: 'block', marginBottom: '0.4rem' }}>Inventory</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.3rem' }}>All Phones</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{totalCount} device{totalCount !== 1 ? 's' : ''} available</p>
        </div>
      </div>

      {/* ── STICKY FILTER BAR ──────────────────────────────── */}
      <div ref={filterRef} style={{
        position: 'sticky', top: 62, zIndex: 100,
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div className="container" style={{ display: 'flex', gap: '0.75rem', padding: '0.85rem 2rem', overflowX: 'auto', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 180px', minWidth: 140 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)', fontSize: 14, pointerEvents: 'none' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ paddingLeft: '2rem', height: 36, fontSize: '0.85rem' }} />
          </div>

          {/* Brand pills */}
          <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
            {COMPANIES.map(c => (
              <button key={c} onClick={() => setBrand(c)}
                style={{
                  padding: '0.3rem 0.85rem',
                  borderRadius: 999,
                  fontSize: '0.8rem', fontWeight: 600,
                  border: brand === c ? '1.5px solid var(--blue)' : '1.5px solid var(--border)',
                  background: brand === c ? 'var(--blue-muted)' : 'var(--bg-secondary)',
                  color: brand === c ? 'var(--blue)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                }}>
                {COMPANY_ICONS[c] && <span style={{ marginRight: 4 }}>{COMPANY_ICONS[c]}</span>}{c}
              </button>
            ))}
          </div>

          {/* Condition */}
          <select value={condition} onChange={e => setCondition(e.target.value)} style={{ flex: '0 1 160px', minWidth: 120, height: 36, fontSize: '0.85rem', padding: '0 0.75rem' }}>
            {CONDITIONS.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* Sort */}
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ flex: '0 1 190px', minWidth: 130, height: 36, fontSize: '0.85rem', padding: '0 0.75rem' }}>
            {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>

          {/* Show sold toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0, color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 600, margin: 0 }}>
            <input type="checkbox" checked={showSold} onChange={e => setShowSold(e.target.checked)} style={{ width: 'auto', accentColor: 'var(--blue)' }} />
            Show Sold
          </label>
        </div>
      </div>

      {/* ── RESULTS ────────────────────────────────────────── */}
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        {loading ? (
          <div className="grid-4">
            {[...Array(8)].map((_, i) => <div key={i} className="skeleton" style={{ height: 340 }} />)}
          </div>
        ) : totalCount === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <div style={{ fontSize: 48, marginBottom: '1rem' }}>📭</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>No phones match your filters.</p>
            <button onClick={() => { setSearch(''); setBrand('All'); setCondition('All') }}
              className="btn btn-ghost" style={{ marginTop: '1rem' }}>Clear Filters</button>
          </div>
        ) : (
          Object.entries(grouped).map(([b, list]) => (
            <div key={b} style={{ marginBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {COMPANY_ICONS[b] && <span style={{ fontSize: 18 }}>{COMPANY_ICONS[b]}</span>}
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800 }}>{b}</h2>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-faint)', fontWeight: 600 }}>{list.length} model{list.length !== 1 ? 's' : ''}</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              <div className="grid-4">
                {list.map(p => <PhoneCard key={p.id} phone={p} />)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
