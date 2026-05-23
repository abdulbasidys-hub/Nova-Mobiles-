import { buildWhatsAppUrl, SITE } from '../lib/constants'
import WatermarkSection from '../components/WatermarkSection'

export default function About() {
  return (
    <div className="pt">

      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--line)', padding: '2.5rem 0', background: 'var(--bg-2)' }}>
        <div className="W">
          <div className="sec-tag">Our Story</div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-.025em', marginBottom: '.6rem' }}>ABOUT NOVA MOBILES PLUS</h1>
          <p style={{ color: 'var(--ink-3)', fontSize: '.9rem', maxWidth: 520, lineHeight: 1.7 }}>Kano's most trusted smartphone destination — built on genuine stock, honest prices, and 10+ years of community trust.</p>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ borderBottom: '1px solid var(--line)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} className="stat-bar">
        {[{ v: '10+', l: 'Years trading' }, { v: '5,000+', l: 'Happy customers' }, { v: '100%', l: 'Genuine stock' }, { v: 'Every', l: 'Phone warranted' }].map(s => (
          <div key={s.l} style={{ textAlign: 'center', padding: '1.5rem 1rem', borderRight: '1px solid var(--line)' }}>
            <div className="num" style={{ fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: 'var(--blue)', lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--ink-4)', marginTop: '.35rem' }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div className="W" style={{ paddingBottom: '5rem' }}>

        {/* Story section */}
        <WatermarkSection src="/images/logo.png" lightOp={0.025} darkOp={0.045} wmSize="320px" wmAlign="right"
          style={{ padding: '3rem 0', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'start' }} className="story-g">
            <div>
              <div className="sec-tag">The Founder</div>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', letterSpacing: '-.02em', marginBottom: '1rem', lineHeight: 1.05 }}>AUWAL ADAM MUHAMMAD</h2>
              {['Nova Mobiles Plus was built with one mission: give people in Kano access to genuine, high-quality smartphones at fair prices — without the guesswork.',
                'Over a decade, we grew from a small stall in Farm Center to one of Kano\'s most recognized phone shops. Our reputation is built on honesty, quality London Used devices, and deep expertise in Google Pixel.',
                'Every phone we sell is personally inspected. We don\'t sell fakes. We don\'t cut corners. That\'s the Nova promise.'
              ].map((t, i) => <p key={i} style={{ color: 'var(--ink-2)', fontSize: '.875rem', lineHeight: 1.8, marginBottom: '.85rem' }}>{t}</p>)}
            </div>
            <div>
              <div style={{ height: 280, background: 'var(--bg-3)', border: '1px solid var(--line)', borderRadius: 'var(--r)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '.6rem' }}>
                <div style={{ textAlign: 'center', color: 'var(--ink-4)' }}>
                  <span style={{ fontSize: 36, display: 'block', marginBottom: 6 }}>🏪</span>
                  <p style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em' }}>Shop Photo</p>
                  <p style={{ fontSize: '.68rem', marginTop: 4 }}>Add to public/images/shop.jpg</p>
                </div>
              </div>
              <p style={{ fontSize: '.72rem', color: 'var(--ink-4)', textAlign: 'center' }}>{SITE.address}</p>
            </div>
          </div>
        </WatermarkSection>

        {/* Values */}
        <div style={{ padding: '3rem 0', borderBottom: '1px solid var(--line)' }}>
          <div className="sec-tag">How We Work</div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-.02em', marginBottom: '1.5rem' }}>Our Values</h2>
          <div className="g3">
            {[
              { i: '🔍', t: 'Transparency', b: 'We tell you exactly what you\'re getting. Condition, specs, warranty, price. No hidden surprises, ever.' },
              { i: '🤝', t: 'Trust',        b: 'Most customers come through referrals. That repeat trust is our most important business metric.' },
              { i: '📚', t: 'Expertise',    b: 'We know phones deeply — especially Pixel. Ask us anything. You\'ll get a straight answer, not a sales pitch.' },
            ].map(({ i, t, b }) => (
              <div key={t} style={{ padding: '1.5rem', border: '1px solid var(--line)', borderRadius: 'var(--r)', borderTop: `3px solid var(--blue)` }}>
                <span style={{ fontSize: 26, display: 'block', marginBottom: '.65rem' }}>{i}</span>
                <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '.95rem', marginBottom: '.35rem' }}>{t}</h3>
                <p style={{ color: 'var(--ink-3)', fontSize: '.82rem', lineHeight: 1.7 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* London Used */}
        <div style={{ padding: '3rem 0', borderBottom: '1px solid var(--line)' }}>
          <div className="sec-tag">London Used Explained</div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-.02em', marginBottom: '1.5rem' }}>What "London Used" Actually Means</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }} className="lu-g2">
            <div>
              <p style={{ color: 'var(--ink-2)', fontSize: '.875rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                London Used phones are pre-owned devices sourced from the UK and Europe — returns, trade-ins, and end-of-lease units from verified suppliers. We inspect and grade each one before sale.
              </p>
              <p style={{ color: 'var(--ink-2)', fontSize: '.875rem', lineHeight: 1.8 }}>
                You're not buying a gamble. You're buying a tested, verified, warranted device at a fraction of the new price.
              </p>
            </div>
            <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--r)', overflow: 'hidden' }}>
              {['Fully tested before sale', 'Clean cosmetic condition (minor marks possible)', 'Full warranty included', 'IMEI verified — not blacklisted', 'Sourced from UK/EU suppliers', 'Dramatically cheaper than brand new'].map((item, i, arr) => (
                <div key={item} style={{ display: 'flex', gap: '.65rem', padding: '.65rem .9rem', borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none', background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-2)', alignItems: 'center' }}>
                  <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '.75rem', flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: '.82rem', color: 'var(--ink-2)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hours + Visit */}
        <div style={{ padding: '3rem 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }} className="visit-g">
            <div>
              <div className="sec-tag">Find Us</div>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-.02em', marginBottom: '1.25rem' }}>Visit the Shop</h2>
              <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--r)', overflow: 'hidden' }}>
                {[{ l: 'Address', v: SITE.address }, { l: 'Hours', v: SITE.hours }, { l: 'Email', v: SITE.email }].map(({ l, v }, i, arr) => (
                  <div key={l} style={{ display: 'flex', gap: '1.5rem', padding: '.75rem 1rem', borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none', background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-2)' }}>
                    <span style={{ color: 'var(--ink-4)', fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', width: 70, flexShrink: 0, paddingTop: 2 }}>{l}</span>
                    <span style={{ color: 'var(--ink-2)', fontSize: '.875rem' }}>{v}</span>
                  </div>
                ))}
              </div>
              <a href={buildWhatsAppUrl('Hi Auwal! I want to visit. Are you open?')} target="_blank" rel="noopener noreferrer" className="btn btn-green" style={{ marginTop: '1.25rem' }}>💬 WhatsApp Before Visiting</a>
            </div>
            <div style={{ height: 220, background: 'var(--bg-3)', border: '1px solid var(--line)', borderRadius: 'var(--r)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', color: 'var(--ink-4)' }}>
                <span style={{ fontSize: 30, display: 'block', marginBottom: 6 }}>📍</span>
                <p style={{ fontSize: '.72rem', fontWeight: 700 }}>Map Preview</p>
                <p style={{ fontSize: '.68rem', marginTop: 4 }}>No. 6 Lukoro B Farm Center, Kano</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){.story-g,.lu-g2,.visit-g{grid-template-columns:1fr!important;gap:2rem!important}}
        @media(max-width:480px){.stat-bar{grid-template-columns:1fr 1fr!important}}
      `}</style>
    </div>
  )
}
