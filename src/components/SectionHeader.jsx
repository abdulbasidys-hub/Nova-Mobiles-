export default function SectionHeader({ label, title, subtitle, align = 'left', style: extraStyle }) {
  const ta = align === 'center' ? 'center' : 'left'
  return (
    <div style={{ textAlign: ta, marginBottom: '2.5rem', ...extraStyle }}>
      {label && (
        <span style={{
          display: 'inline-block',
          fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--blue)',
          marginBottom: '0.65rem',
        }}>
          {label}
        </span>
      )}
      <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', fontWeight: 800, marginBottom: subtitle ? '0.6rem' : 0 }}>
        {title}
      </h2>
      {subtitle && <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: align === 'center' ? 520 : '100%', margin: align === 'center' ? '0 auto' : 0, lineHeight: 1.65 }}>{subtitle}</p>}
    </div>
  )
}
