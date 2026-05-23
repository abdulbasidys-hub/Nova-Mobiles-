const ICONS = { display: '🖥', processor: '⚡', camera: '📷', battery: '🔋', ram: '💾' }
export default function SpecGrid({ specs }) {
  if (!specs) return null
  const entries = Object.entries(specs).filter(([, v]) => v)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 'var(--r)', overflow: 'hidden' }}>
      {entries.map(([k, v]) => (
        <div key={k} style={{ background: 'var(--surface)', padding: '.75rem 1rem', display: 'flex', alignItems: 'center', gap: '.6rem' }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>{ICONS[k] || '•'}</span>
          <div>
            <p style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink-4)' }}>{k}</p>
            <p style={{ fontSize: '.875rem', fontWeight: 600, color: 'var(--ink)' }}>{v}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
