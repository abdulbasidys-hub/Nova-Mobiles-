import { useState, useEffect } from 'react'
import { getAllPhones } from '../lib/phones'
import { CONDITIONS } from '../lib/constants'
import ProductCard from '../components/ProductCard'
import FilterBar from '../components/FilterBar'
import WatermarkSection from '../components/WatermarkSection'

const BRANDS  = ['All', 'Google Pixel', 'iPhone', 'Samsung', 'Oppo', 'Other']
const ICONS   = { 'Google Pixel': '🟢', iPhone: '🍎', Samsung: '🔵', Oppo: '🟠' }

export default function Shop() {
  const [phones, setPhones]   = useState([])
  const [search, setSearch]   = useState('')
  const [brand,  setBrand]    = useState('All')
  const [cond,   setCond]     = useState('All')
  const [sort,   setSort]     = useState('price-desc')
  const [sold,   setSold]     = useState(true)
  const [loading,setLoading]  = useState(true)

  useEffect(() => { getAllPhones().then(d => { setPhones(d); setLoading(false) }) }, [])

  let filtered = phones.filter(p => {
    if (!sold && !p.available) return false
    const s = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
    const b = brand === 'All' || p.brand === brand
    const c = cond  === 'All' || p.condition === cond
    return s && b && c
  }).sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : a.name.localeCompare(b.name))

  const brands = brand === 'All' ? [...new Set(filtered.map(p => p.brand))] : [brand]
  const grouped = {}
  brands.forEach(b => { const l = filtered.filter(p => p.brand === b); if (l.length) grouped[b] = l })

  return (
    <div className="pt">
      {/* Header */}
      <WatermarkSection src="/images/logo.png" lightOp={0.025} darkOp={0.045} wmSize="340px" wmAlign="right"
        style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-2)', padding: '2rem 0' }}>
        <div className="W">
          <div className="sec-tag">Inventory</div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', letterSpacing: '-.025em', marginBottom: '.35rem' }}>ALL PHONES</h1>
          <p style={{ color: 'var(--ink-3)', fontSize: '.82rem' }}>
            Every phone verified and warranted by Nova Mobiles Plus. Stock updates regularly.
          </p>
        </div>
      </WatermarkSection>

      {/* Sticky filter bar */}
      <FilterBar search={search} setSearch={setSearch} brand={brand} setBrand={setBrand}
        condition={cond} setCondition={setCond} sort={sort} setSort={setSort}
        showSold={sold} setShowSold={setSold} count={filtered.length} />

      {/* Results */}
      <div className="W" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        {loading ? (
          <div className="g4">{[...Array(8)].map((_, i) => <div key={i} className="sk" style={{ height: 320 }} />)}</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <p style={{ fontSize: 40, marginBottom: '1rem' }}>📭</p>
            <p style={{ color: 'var(--ink-3)', marginBottom: '1rem' }}>No phones match your filters.</p>
            <button onClick={() => { setSearch(''); setBrand('All'); setCond('All') }} className="btn btn-ghost btn-sm">Clear Filters</button>
          </div>
        ) : (
          Object.entries(grouped).map(([b, list]) => (
            <div key={b} style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.25rem' }}>
                {ICONS[b] && <span style={{ fontSize: 16 }}>{ICONS[b]}</span>}
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-.01em' }}>{b}</h2>
                {b === 'Google Pixel' && <span className="st st-blue">Specialists</span>}
                <span style={{ color: 'var(--ink-4)', fontSize: '.7rem', fontWeight: 700 }}>{list.length} model{list.length !== 1 ? 's' : ''}</span>
                <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
              </div>
              <div className="g4">{list.map(p => <ProductCard key={p.id} phone={p} />)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
