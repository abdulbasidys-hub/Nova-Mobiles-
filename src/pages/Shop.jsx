import { useState, useEffect } from 'react'
import { getAllPhones } from '../lib/phones'
import { BRANDS, CONDITIONS } from '../lib/constants'
import PhoneCard from '../components/PhoneCard'

export default function Shop() {
  const [phones, setPhones] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [brand, setBrand] = useState('All')
  const [condition, setCondition] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPhones().then(data => { setPhones(data); setFiltered(data); setLoading(false) })
  }, [])

  useEffect(() => {
    let result = phones
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    if (brand !== 'All') result = result.filter(p => p.brand === brand)
    if (condition !== 'All') result = result.filter(p => p.condition === condition)
    setFiltered(result)
  }, [search, brand, condition, phones])

  return (
    <div>
      <div className="page-header container">
        <h1 className="page-title">Our Phone Shop</h1>
        <p className="page-sub">{filtered.length} phones available</p>
      </div>

      <div className="container" style={{ paddingBottom: '5rem' }}>
        <div className="card" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search phones..." style={{ flex: '1 1 200px' }} />
          <select value={brand} onChange={e => setBrand(e.target.value)} style={{ flex: '0 1 180px' }}>
            {BRANDS.map(b => <option key={b}>{b}</option>)}
          </select>
          <select value={condition} onChange={e => setCondition(e.target.value)} style={{ flex: '0 1 180px' }}>
            {CONDITIONS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {loading
          ? <div className="grid-4">{[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 320 }} />)}</div>
          : filtered.length === 0
            ? <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>No phones found. Try adjusting your filters.</div>
            : <div className="grid-4">{filtered.map(p => <PhoneCard key={p.id} phone={p} />)}</div>
        }
      </div>
    </div>
  )
}
