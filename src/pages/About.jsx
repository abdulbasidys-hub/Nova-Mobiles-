import { buildWhatsAppUrl, SITE } from '../lib/constants'
import WatermarkBackground from '../components/WatermarkBackground'

export default function About() {
  return (
    <div className="page-top">

      {/* Header */}
      <div style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--rule)', background: 'var(--bg-off)', padding: '3rem 0' }}>
        <WatermarkBackground src="/images/logo.png" lightOpacity={0.03} darkOpacity={0.05} size="360px" align="right" />
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--blue)', display: 'block', marginBottom: '0.5rem' }}>Our Story</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: '0.85rem', maxWidth: 680 }}>
            Ten years of trust,<br /><em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>one shop in Kano.</em>
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', maxWidth: 500, lineHeight: 1.75 }}>
            Nova Mobiles Plus was built on a simple idea: people in Kano deserve access to genuine, high-quality phones — without doubt, without risk.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ paddingBottom: '5rem' }}>

        {/* Stats row */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--rule)' }}>
          {[
            { v: '10+',    l: 'Years trading' },
            { v: '5,000+', l: 'Happy customers' },
            { v: '100%',   l: 'Genuine stock' },
            { v: 'Every',  l: 'Phone warranted' },
          ].map((s, i, arr) => (
            <div key={s.l} style={{ flex: 1, padding: '1.75rem 1.5rem', borderRight: i < arr.length - 1 ? '1px solid var(--rule)' : 'none', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '0.35rem' }}>{s.v}</div>
              <div style={{ color: 'var(--ink-faint)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Story */}
        <div style={{ position: 'relative', overflow: 'hidden', padding: '3rem 0', borderBottom: '1px solid var(--rule)' }}>
          <WatermarkBackground src="/images/logo.png" lightOpacity={0.025} darkOpacity={0.04} size="320px" align="right" />
          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }} className="story-grid">
            <div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-faint)', display: 'block', marginBottom: '1rem' }}>The Founder</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.1 }}>
                Auwal Adam<br />Muhammad.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  'Nova Mobiles Plus was founded with one mission: give people in Kano access to genuine, high-quality smartphones at fair prices — without the guesswork.',
                  'Over a decade, we grew from a small stall in Farm Center to one of the most recognized phone shops in Kano. Our reputation is built on honesty, quality London Used devices, and deep expertise in Google Pixel.',
                  'Every phone we sell is personally inspected. We don\'t sell fakes. We don\'t cut corners. That\'s the Nova promise.',
                ].map((t, i) => <p key={i} style={{ color: 'var(--ink-muted)', fontSize: '0.875rem', lineHeight: 1.8 }}>{t}</p>)}
              </div>
            </div>
            <div>
              {/* Shop image placeholder */}
              <div style={{ height: 280, background: 'var(--bg-surface)', border: '1px solid var(--rule)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center', color: 'var(--ink-faint)' }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>🏪</div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Shop Photo</p>
                  <p style={{ fontSize: '0.7rem', marginTop: 4 }}>Add photo to public/images/shop.jpg</p>
                </div>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--ink-faint)', textAlign: 'center' }}>{SITE.address}</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div style={{ padding: '3rem 0', borderBottom: '1px solid var(--rule)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-faint)' }}>How We Work</span>
            <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
          </div>
          <div className="g3">
            {[
              { i: '🔍', t: 'Transparency', d: 'We tell you exactly what you\'re getting — condition, specs, what\'s included, and the honest price. No surprises.' },
              { i: '🤝', t: 'Trust',         d: 'Most of our customers come through referrals. That repeat trust is our most important business metric.' },
              { i: '📚', t: 'Expertise',     d: 'We know phones deeply — especially Pixel. Ask us anything. We\'ll give you a straight answer, not a sales pitch.' },
            ].map(({ i, t, d }) => (
              <div key={t} style={{ paddingTop: '1.25rem', borderTop: '2px solid var(--rule)' }}>
                <span style={{ fontSize: 24, display: 'block', marginBottom: '0.75rem' }}>{i}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{t}</h3>
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.82rem', lineHeight: 1.7 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* London Used explainer */}
        <div style={{ padding: '3rem 0', borderBottom: '1px solid var(--rule)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-faint)' }}>London Used — An Honest Explanation</span>
            <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }} className="lu-grid2">
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.5rem', lineHeight: 1.1, marginBottom: '1rem' }}>What "London Used" actually means.</h2>
              <p style={{ color: 'var(--ink-muted)', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                London Used phones are pre-owned devices sourced from the UK and Europe — returned phones, trade-ins, and end-of-lease devices from verified suppliers. They arrive in excellent condition, then we inspect and grade each one before sale.
              </p>
              <p style={{ color: 'var(--ink-muted)', fontSize: '0.875rem', lineHeight: 1.8 }}>
                You're not buying a gamble. You're buying a tested, verified, warranted device at a fraction of the brand-new price.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {['Every device tested for faults before sale', 'Cosmetically clean — minor marks possible', 'Come with our full warranty', 'Sourced from verified UK/EU suppliers', 'Dramatically cheaper than brand new', 'Ideal for flagship specs at mid-range prices'].map((item, i, arr) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.65rem 0', borderBottom: i < arr.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                  <span style={{ color: 'var(--blue)', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ color: 'var(--ink-muted)', fontSize: '0.82rem' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hours + Visit */}
        <div style={{ padding: '3rem 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }} className="visit-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-faint)' }}>Visit Us</span>
                <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { l: 'Address',       v: SITE.address },
                  { l: 'Hours',         v: SITE.hours },
                  { l: 'Email',         v: SITE.email },
                ].map(({ l, v }, i, arr) => (
                  <div key={l} style={{ display: 'flex', gap: '1.5rem', padding: '0.85rem 0', borderBottom: i < arr.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                    <span style={{ color: 'var(--ink-faint)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', width: 70, flexShrink: 0, paddingTop: 2 }}>{l}</span>
                    <span style={{ color: 'var(--ink-2)', fontSize: '0.875rem' }}>{v}</span>
                  </div>
                ))}
              </div>
              <a href={buildWhatsAppUrl('Hi Auwal! I want to visit Nova Mobiles Plus. Are you open?')}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-green" style={{ marginTop: '1.5rem' }}>
                💬 WhatsApp Before Visiting
              </a>
            </div>
            <div>
              <div style={{ height: 240, background: 'var(--bg-surface)', border: '1px solid var(--rule)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', color: 'var(--ink-faint)' }}>
                  <span style={{ fontSize: 32, display: 'block', marginBottom: 6 }}>📍</span>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600 }}>Map Embed</p>
                  <p style={{ fontSize: '0.7rem', marginTop: 4 }}>No. 6 Lukoro B Farm Center, Kano</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .story-grid, .lu-grid2, .visit-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  )
}
