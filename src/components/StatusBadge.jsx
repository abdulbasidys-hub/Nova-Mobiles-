const MAP = {
  'Brand New':      { cls: 'status-new',      dot: '#22c55e', label: 'Brand New' },
  'London Used':    { cls: 'status-london',   dot: '#f59e0b', label: 'London Used' },
  'Nigerian Used':  { cls: 'status-nigeria',  dot: '#3b82f6', label: 'Nigerian Used' },
  'Sold':           { cls: 'status-sold',     dot: '#ef4444', label: 'Sold' },
  'Reserved':       { cls: 'status-reserved', dot: '#8b5cf6', label: 'Reserved' },
  'Available':      { cls: 'status-available',dot: '#22c55e', label: 'Available' },
}

export default function StatusBadge({ value, showDot = true }) {
  const m = MAP[value] || { cls: 'status-new', dot: '#94a3b8', label: value }
  return (
    <span className={`status ${m.cls}`}>
      {showDot && <span style={{ width: 5, height: 5, borderRadius: '50%', background: m.dot, display: 'inline-block', flexShrink: 0 }} />}
      {m.label}
    </span>
  )
}
