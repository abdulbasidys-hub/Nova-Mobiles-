import { useState, useEffect } from 'react'
import { getAllPhones } from '../lib/phones'
import { CONDITIONS } from '../lib/constants'
import PhoneCard from '../components/PhoneCard'

const COMPANIES = ['All', 'Google Pixel', 'Samsung', 'iPhone', 'Oppo', 'Other']

export default function Shop() {
  const [phones, setPhones] = useState([])
  const [search, setSearch] = useState('')
  const [condition, setCondition] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPhones().then(data => { setPhones(data); setLoading(false) })
  }, [])

  // Filter phones
  const filtered = phones.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
    const matchCondition = condition === 'All' || p.condition === condition
    return matchSearch && matchCondition
  })

  // Group by company/brand
  const grouped = COMPANIES.filter(c => c !== 'All').reduce((acc, company) => {
    const list = filtered.filter(p => p.brand === company)
    if (list.length > 0) acc[company] = list
    return acc
  }, {})

  // Also catch any brand not in our list
  const otherBrands = [...new Set(filtered.filter(p => !COMPANIES.includes(p.brand)).map(p => p.brand))]
  otherBrands.forEach(b => {
    const list = filtered.filter(p => p.brand === b)
    if (list.length > 0) grouped[b] = list
  })

  const totalCount = filtered.length

  return (
    <div>
      <div className="page-header container">
        <h1 className="page-title">Our Phone Shop</h1>
        <p className="page-sub">{totalCount} phone{totalCount !== 1 ? 's' : ''} available</p>
      </div>

      <div className="container" style={{ paddingBottom: '5rem' }}>
        {/* Filters */}
        <div className="card" style={{ padding: '1rem', marginBottom: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search phones..."
            style={{ flex: '1 1 200px' }}
          />
          <select value={condition} onChange={e => setCondition(e.target.value)} style={{ flex: '0 1 180px' }}>
            {CONDITIONS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="grid-4">
            {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 320 }} />)}
          </div>
        ) : totalCount === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
            No phones found. Try adjusting your search or filter.
          </div>
        ) : (
          // Render each company section
          Object.entries(grouped).map(([company, list]) => (
            <div key={company} style={{ marginBottom: '3.5rem' }}>
              {/* Company header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: 22 }}>
                    {company === 'Google Pixel' ? '🟢' : company === 'iPhone' ? '🍎' : company === 'Samsung' ? '🔵' : company === 'Oppo' ? '🟠' : '📱'}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700 }}>{company}</h2>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  {list.length} model{list.length !== 1 ? 's' : ''}
                </span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>

              {/* Models grid */}
              <div className="grid-4">
                {list
                  .sort((a, b) => b.price - a.price)
                  .map(phone => <PhoneCard key={phone.id} phone={phone} />)
                }
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
