import { useState } from 'react'
import { buildWhatsAppUrl, SITE } from '../lib/constants'
import WatermarkSection from '../components/WatermarkSection'

function SiteImage({ src, alt, fallbackIcon, fallbackLabel }) {
  const [errored, setErrored] = useState(false)
  if (errored) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '.5rem', background: 'var(--bg-3)' }}>
        <span style={{ fontSize: 48, opacity: .2 }}>{fallbackIcon}</span>
        <p style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink-4)' }}>{fallbackLabel}</p>
        <p style={{ fontSize: '.65rem', color: 'var(--ink-4)' }}>public/images/</p>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  )
}

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

      {/* Stats */}
      <div style={{ borderBottom: '1px solid var(--line)', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }} className="stat-bar">
        {[
          { v: '10+',    l: 'Years trading' },
          { v: '5,000+', l: 'Happy customers' },
          { v: '100%',   l: 'Genuine stock' },
        ].map((s, i, arr) => (
          <div key={s.l} style={{ textAlign: 'center', padding: '1.5rem 1rem', borderRight: i < arr.length - 1 ? '1px solid var(--line)' : 'none' }}>
            <div className="num" style={{ fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: 'var(--blue)', lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--ink-4)', marginTop: '.35rem' }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div className="W" style={{ paddingBottom: '5rem' }}>

        {/* ── SECTION 1: The Founder ─────────────────────── */}
        <WatermarkSection src="/images/logo.png" lightOp={0.025} darkOp={0.045} wmSize="300px" wmAlign="right"
          style={{ padding: '3rem 0', borderBottom: '1px solid var(--line)' }}>
          <div className="sec-tag">The Founder</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }} className="owner-g">

            {/* Owner photo — no caption */}
            <div style={{ width: '100%', aspectRatio: '4/3', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden' }}>
              <SiteImage src="/images/owner.jpg" alt="Auwal Adam Muhammad" fallbackIcon="👤" fallbackLabel="owner.jpg" />
            </div>

            {/* Biography — name on top instead of heading */}
            <div>
              {/* Name + title replace the old heading */}
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: '.2rem' }}>
                Auwal Adam Muhammad
              </h2>
              <p style={{ fontSize: '.78rem', color: 'var(--blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '1.1rem' }}>
                Founder, Nova Mobiles Plus
              </p>

              {[
                'Auwal Adam Muhammad is the founder and owner of Nova Mobiles Plus, one of Kano\'s most recognized smartphone shops. What started as a small stall at Farm Center has grown into a trusted destination for buyers across Nigeria.',
                'With over 10 years of hands-on experience in the phone market, Auwal has built a reputation for honesty, deep product knowledge, and a genuine commitment to his customers. He personally inspects every device that comes through the shop — no exceptions.',
                'His specialty is Google Pixel phones, which he has stocked and sold long before most shops in Kano knew the brand. If you want straight advice on which phone suits your needs and budget, Auwal is the person to ask.',
              ].map((t, i) => (
                <p key={i} style={{ color: 'var(--ink-2)', fontSize: '.875rem', lineHeight: 1.85, marginBottom: '.9rem' }}>{t}</p>
              ))}
            </div>
          </div>
        </WatermarkSection>

        {/* ── SECTION 2: The Shop ───────────────────────── */}
        <div style={{ padding: '3rem 0', borderBottom: '1px solid var(--line)' }}>
          <div className="sec-tag">The Shop</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'start' }} className="shop-g">

            {/* Shop info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: '1.1rem' }}>
                Farm Center, Kano.<br />Come see us.
              </h2>
              <p style={{ color: 'var(--ink-2)', fontSize: '.875rem', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                We're based at No. 6 Lukoro B Farm Center, Kano. Walk in any day Monday to Saturday between 11am and 6pm. You'll find a fully stocked shop where you can see, hold, and test any phone before you buy. No pressure — just honest advice.
              </p>
              <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--r)', overflow: 'hidden', marginBottom: '1.25rem' }}>
                {[
                  { l: 'Address', v: SITE.address },
                  { l: 'Hours',   v: SITE.hours },
                  { l: 'Email',   v: SITE.email },
                ].map(({ l, v }, i, arr) => (
                  <div key={l} style={{ display: 'flex', borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none' }}>
                    <div style={{ width: 90, flexShrink: 0, padding: '.6rem .85rem', background: 'var(--bg-2)', borderRight: '1px solid var(--line)' }}>
                      <span style={{ fontSize: '.68rem', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{l}</span>
                    </div>
                    <div style={{ padding: '.6rem .85rem', flex: 1 }}>
                      <span style={{ fontSize: '.85rem', color: 'var(--ink)', fontWeight: 500 }}>{v}</span>
                    </div>
                  </div>
                ))}
              </div>
              <a href={buildWhatsAppUrl('Hi Auwal! I want to visit Nova Mobiles Plus. Are you open?')}
                target="_blank" rel="noopener noreferrer" className="btn btn-green">
                💬 WhatsApp Before Visiting
              </a>
            </div>

            {/* Shop photo */}
            <div>
              <div style={{ width: '100%', aspectRatio: '4/3', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden' }}>
                <SiteImage src="/images/shop.jpg" alt="Nova Mobiles Plus shop" fallbackIcon="🏪" fallbackLabel="shop.jpg" />
              </div>
              <p style={{ fontSize: '.72rem', color: 'var(--ink-4)', textAlign: 'center', marginTop: '.6rem' }}>No. 6 Lukoro B Farm Center, Kano</p>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .owner-g { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .shop-g  { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .lu-g    { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .shop-g > div:last-child { order: -1; }
          .stat-bar { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 400px) {
          .stat-bar { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
