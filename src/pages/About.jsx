import { buildWhatsAppUrl, SITE } from '../lib/constants'

export default function About() {
  return (
    <div>
      <div className="page-header container">
        <h1 className="page-title">About Nova Mobiles Plus</h1>
        <p className="page-sub">Kano's most trusted phone shop — built on genuine products and 10+ years of trust.</p>
      </div>

      <div className="container" style={{ paddingBottom: '5rem' }}>
        <div className="card" style={{ padding: '3rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Our Story</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
            Nova Mobiles Plus was founded by <strong style={{ color: '#fff' }}>Auwal Adam Muhammad</strong> with a single mission: to give people in Kano access to genuine, high-quality smartphones at fair prices.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
            Over 10 years, we've grown from a small stall to one of the most recognized phone shops in Kano — known for our honesty, our quality London Used phones, and our deep expertise in Google Pixel devices.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Every phone we sell is personally inspected and verified. We don't sell fakes. We don't compromise on quality. That's the Nova promise.
          </p>
        </div>

        <div className="grid-4" style={{ marginBottom: '2rem' }}>
          {[
            { value: '10+', label: 'Years in Business', icon: '📈' },
            { value: '5,000+', label: 'Happy Customers', icon: '👥' },
            { value: '100%', label: 'Genuine Phones', icon: '✅' },
            { value: 'Every', label: 'Phone Warranted', icon: '🛡️' },
          ].map(({ value, label, icon }) => (
            <div key={label} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>{icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, marginBottom: 4 }}>{value}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg, rgba(244,168,39,0.08), rgba(17,24,39,0.8))', border: '1px solid rgba(244,168,39,0.2)', borderRadius: 'var(--radius)', padding: '2.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>What is "London Used"?</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>London Used phones are pre-owned devices sourced directly from the UK and Europe. They are:</p>
          <div className="grid-2">
            {['Fully functional with no faults', 'Inspected and graded before sale', 'Significantly cheaper than brand new', 'Come with our warranty', 'Authentic, not refurbished fakes', 'Excellent for budget-conscious buyers'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--gold)' }}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Visit Us in Kano</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{SITE.address}</p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{SITE.hours}</p>
          <a href={buildWhatsAppUrl('Hi Auwal! I want to visit Nova Mobiles Plus. Are you open?')} target="_blank" rel="noopener noreferrer"
            className="btn btn-green" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
            💬 WhatsApp Before Visiting
          </a>
        </div>
      </div>
    </div>
  )
}
