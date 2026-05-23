export default function StatBlock({ value, label, accent = false }) {
  return (
    <div style={{ textAlign: 'center', padding: '1.25rem 1rem', borderRight: '1px solid var(--line)' }}>
      <div className="num" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: accent ? 'var(--blue)' : 'var(--ink)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--ink-3)', marginTop: '.4rem' }}>{label}</div>
    </div>
  )
}
