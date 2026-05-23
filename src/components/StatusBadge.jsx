const MAP = {
  'Brand New':     { cls: 'st-new',    dot: '#60A5FA', label: 'Brand New' },
  'London Used':   { cls: 'st-london', dot: '#FDE047', label: 'London Used' },
  'Nigerian Used': { cls: 'st-avail',  dot: '#4ADE80', label: 'Nigerian Used' },
  'Available':     { cls: 'st-avail',  dot: '#4ADE80', label: 'Available' },
  'Sold':          { cls: 'st-sold',   dot: '#FCA5A5', label: 'Sold' },
  'Reserved':      { cls: 'st-res',    dot: '#C4B5FD', label: 'Reserved' },
  'Last One':      { cls: 'st-last',   dot: '#FB923C', label: 'Last One' },
  'Just Arrived':  { cls: 'st-arr',    dot: '#4ADE80', label: 'Just Arrived' },
}
export default function StatusBadge({ value }) {
  const m = MAP[value] || { cls: 'st-blue', dot: 'var(--blue)', label: value }
  return (
    <span className={`st ${m.cls}`}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: m.dot, display: 'inline-block', flexShrink: 0 }} />
      {m.label}
    </span>
  )
}
