export default function ReviewCard({ review }) {
  return (
    <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[...Array(review.rating || 5)].map((_, i) => (
          <span key={i} style={{ color: '#FBBF24', fontSize: '.9rem', lineHeight: 1 }}>★</span>
        ))}
      </div>
      <p style={{ color: 'var(--ink-2)', fontSize: '.875rem', lineHeight: 1.65, flex: 1 }}>"{review.text}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', paddingTop: '.6rem', borderTop: '1px solid var(--line)' }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--blue-tint)', border: '1.5px solid var(--blue-ring)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '.85rem', color: 'var(--blue)', flexShrink: 0 }}>
          {review.name?.[0]}
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: '.8rem' }}>{review.name}</p>
          <p style={{ color: 'var(--ink-4)', fontSize: '.7rem' }}>{review.date || 'Verified buyer'}</p>
        </div>
      </div>
    </div>
  )
}
