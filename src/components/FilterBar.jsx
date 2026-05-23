import { CONDITIONS } from '../lib/constants'
const BRANDS = ['All', 'Google Pixel', 'iPhone', 'Samsung', 'Oppo', 'Other']
const SORTS  = [{ v: 'price-desc', l: 'High → Low' }, { v: 'price-asc', l: 'Low → High' }, { v: 'name', l: 'Name A–Z' }]
const ICONS  = { 'Google Pixel': '🟢', iPhone: '🍎', Samsung: '🔵', Oppo: '🟠' }

function Chip({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '.3rem .8rem', borderRadius: 999, fontSize: '.75rem', fontWeight: 600,
      fontFamily: 'var(--font-body)',
      border: `1.5px solid ${active ? 'var(--blue)' : 'var(--line-2)'}`,
      background: active ? 'var(--blue-tint)' : 'transparent',
      color: active ? 'var(--blue)' : 'var(--ink-3)',
      cursor: 'pointer', transition: 'all .12s', whiteSpace: 'nowrap',
    }}>{children}</button>
  )
}

export default function FilterBar({ search, setSearch, brand, setBrand, condition, setCondition, sort, setSort, showSold, setShowSold, count }) {
  return (
    <div style={{ position: 'sticky', top: 58, zIndex: 300, background: 'var(--bg)', borderBottom: '1px solid var(--line)' }}>
      <div className="W" style={{ display: 'flex', alignItems: 'center', gap: '.65rem', padding: '.65rem 2rem', overflowX: 'auto', flexWrap: 'nowrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: 'var(--ink-4)', pointerEvents: 'none' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" style={{ paddingLeft: '1.75rem', height: 32, width: 148, fontSize: '.78rem', borderRadius: 999 }} />
        </div>
        <div style={{ width: 1, height: 18, background: 'var(--line)', flexShrink: 0 }} />
        {BRANDS.map(b => <Chip key={b} active={brand === b} onClick={() => setBrand(b)}>{ICONS[b] && <span style={{ marginRight: 3 }}>{ICONS[b]}</span>}{b}</Chip>)}
        <div style={{ width: 1, height: 18, background: 'var(--line)', flexShrink: 0 }} />
        {CONDITIONS.map(c => <Chip key={c} active={condition === c} onClick={() => setCondition(c)}>{c}</Chip>)}
        <div style={{ width: 1, height: 18, background: 'var(--line)', flexShrink: 0 }} />
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ height: 32, fontSize: '.75rem', borderRadius: 999, padding: '0 .75rem', minWidth: 140, flexShrink: 0 }}>
          {SORTS.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: '.35rem', cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap', margin: 0, fontSize: '.75rem', color: 'var(--ink-3)', fontWeight: 600, textTransform: 'none', letterSpacing: 0 }}>
          <input type="checkbox" checked={showSold} onChange={e => setShowSold(e.target.checked)} style={{ width: 'auto', accentColor: 'var(--blue)' }} />Show Sold
        </label>
        <span style={{ marginLeft: 'auto', fontSize: '.72rem', color: 'var(--ink-4)', fontWeight: 700, flexShrink: 0 }}>{count} result{count !== 1 ? 's' : ''}</span>
      </div>
    </div>
  )
}
