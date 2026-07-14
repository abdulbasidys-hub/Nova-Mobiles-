import { useState } from 'react'
import { buildWhatsAppUrl, SITE } from '../lib/constants'
import WatermarkSection from '../components/WatermarkSection'

function SiteImage({ src, alt, fallbackIcon, fallbackLabel }) {
  const [errored, setErrored] = useState(false)
  if (errored) {
    return (
      <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'.5rem', background:'var(--bg-3)' }}>
        <span style={{ fontSize:48, opacity:.2 }}>{fallbackIcon}</span>
        <p style={{ fontSize:'.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', color:'var(--ink-4)' }}>{fallbackLabel}</p>
      </div>
    )
  }
  return (
    <img src={src} alt={alt} onError={() => setErrored(true)}
      style={{ width:'100%', height:'100%', objectFit:'contain', display:'block' }} />
  )
}

export default function About() {
  const ownerSrc = '/owner.jpg'
  const shopSrc  = '/shop.jpg'

  return (
    <div className="pt">

      {/* Header */}
      <div style={{ borderBottom:'1px solid var(--outline-var)', padding:'2.5rem 0', background:'var(--surface-low)' }}>
        <div className="W">
          <div className="sec-tag">Our Story</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(2rem,5vw,3.5rem)', letterSpacing:'-.025em', marginBottom:'.6rem' }}>ABOUT NOVA MOBILES PLUS</h1>
          <p style={{ color:'var(--on-surface-var)', fontSize:'.9rem', maxWidth:520, lineHeight:1.7 }}>Kano's most trusted smartphone destination — built on genuine stock, honest prices, and community trust.</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ borderBottom:'1px solid var(--outline-var)', display:'grid', gridTemplateColumns:'repeat(3,1fr)' }} className="stat-bar">
        {[
          { v:'10+',    l:'Years trading' },
          { v:'5,000+', l:'Happy customers' },
          { v:'100%',   l:'Genuine stock' },
        ].map((s,i,arr) => (
          <div key={s.l} style={{ textAlign:'center', padding:'1.5rem 1rem', borderRight:i<arr.length-1?'1px solid var(--outline-var)':'none' }}>
            <div className="num" style={{ fontSize:'clamp(1.8rem,3vw,2.5rem)', color:'var(--primary)', lineHeight:1 }}>{s.v}</div>
            <div style={{ fontSize:'.65rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.09em', color:'var(--on-surface-var)', marginTop:'.35rem' }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div className="W" style={{ paddingBottom:'5rem' }}>

        {/* ── The Founder ─────────────────────────────── */}
        <WatermarkSection src="/logo.png" lightOp={0.025} darkOp={0.045} wmSize="300px" wmAlign="right"
          style={{ padding:'3rem 0', borderBottom:'1px solid var(--outline-var)' }}>
          <div className="sec-tag">The Founder</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'3rem', alignItems:'start' }} className="owner-g">

            {/* Owner photo */}
            <div style={{ width:'100%', aspectRatio:'3/4', border:'1px solid var(--outline-var)', borderRadius:8, overflow:'hidden' }}>
              <SiteImage src={ownerSrc} alt="Auwal Adam Muhammad" fallbackIcon="👤" fallbackLabel="owner photo" />
            </div>

            {/* Biography */}
            <div>
              <h2 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(1.3rem,2.5vw,1.9rem)', letterSpacing:'-.02em', lineHeight:1.1, marginBottom:'.2rem' }}>
                Auwal Adam Muhammad
              </h2>
              <p style={{ fontSize:'.78rem', color:'var(--primary)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', marginBottom:'1.1rem' }}>
                Founder, Nova Mobiles Plus
              </p>
              {[
                "Auwal Adam Muhammad is the founder and owner of Nova Mobiles Plus, one of Kano's most recognized smartphone shops. What started as a small stall at Farm Center has grown into a trusted destination for buyers across Nigeria.",
                "With over 10 years of hands-on experience in the phone market, Auwal has built a reputation for honesty, deep product knowledge, and a genuine commitment to his customers. He personally inspects every device that comes through the shop — no exceptions.",
                "His specialty is Google Pixel phones, which he has stocked and sold long before most shops in Kano knew the brand. If you want straight advice on which phone suits your needs and budget, Auwal is the person to ask.",
              ].map((t,i) => (
                <p key={i} style={{ color:'var(--on-surface-var)', fontSize:'.875rem', lineHeight:1.85, marginBottom:'.9rem' }}>{t}</p>
              ))}
            </div>
          </div>
        </WatermarkSection>

        {/* ── The Shop ────────────────────────────────── */}
        <div style={{ padding:'3rem 0', borderBottom:'1px solid var(--outline-var)' }}>
          <div className="sec-tag">The Shop</div>
          <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:'3rem', alignItems:'start' }} className="shop-g">

            <div>
              <h2 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(1.3rem,2.5vw,1.9rem)', letterSpacing:'-.02em', lineHeight:1.1, marginBottom:'1.1rem' }}>
                Farm Center, Kano.<br />Come see us.
              </h2>
              <p style={{ color:'var(--on-surface-var)', fontSize:'.875rem', lineHeight:1.85, marginBottom:'1.25rem' }}>
                We're based at No. 6 Lukoro B Farm Center, Kano. Walk in any day Monday to Saturday between 11am and 6pm. See, hold, and test any phone before you buy. No pressure — just honest advice.
              </p>
              <div style={{ border:'1px solid var(--outline-var)', borderRadius:12, overflow:'hidden', marginBottom:'1.25rem' }}>
                {[
                  { l:'Address', v: SITE.address },
                  { l:'Hours',   v: SITE.hours },
                  { l:'Email',   v: SITE.email },
                ].map(({ l, v }, i, arr) => (
                  <div key={l} style={{ display:'flex', borderBottom:i<arr.length-1?'1px solid var(--outline-var)':'none' }}>
                    <div style={{ width:90, flexShrink:0, padding:'.6rem .85rem', background:'var(--surface-low)', borderRight:'1px solid var(--outline-var)' }}>
                      <span style={{ fontSize:'.68rem', fontWeight:700, color:'var(--on-surface-var)', textTransform:'uppercase', letterSpacing:'.06em' }}>{l}</span>
                    </div>
                    <div style={{ padding:'.6rem .85rem', flex:1 }}>
                      <span style={{ fontSize:'.85rem', color:'var(--on-surface)', fontWeight:500 }}>{v}</span>
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
              <div style={{ width:'100%', aspectRatio:'2/3', border:'1px solid var(--outline-var)', borderRadius:8, overflow:'hidden' }}>
                <SiteImage src={shopSrc} alt="Nova Mobiles Plus shop" fallbackIcon="🏪" fallbackLabel="shop photo" />
              </div>
              <p style={{ fontSize:'.72rem', color:'var(--on-surface-var)', textAlign:'center', marginTop:'.6rem' }}>No. 6 Lukoro B Farm Center, Kano</p>
            </div>
          </div>
        </div>

        {/* ── Values ──────────────────────────────────── */}
        <div style={{ padding:'3rem 0', borderBottom:'1px solid var(--outline-var)' }}>
          <div className="sec-tag">How We Work</div>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(1.5rem,3vw,2rem)', letterSpacing:'-.02em', marginBottom:'1.5rem' }}>Our Values</h2>
          <div className="g3">
            {[
              { i:'🔍', t:'Transparency', b:"No hidden defects. Every 'London Used' device undergoes a full check before hitting the shelf." },
              { i:'🤝', t:'Trust',        b:'Most customers come through referrals. That repeat trust is our most important business metric.' },
              { i:'📚', t:'Expertise',    b:"We know phones deeply — especially Pixel. Ask us anything. You'll get a straight answer, not a sales pitch." },
            ].map(({ i, t, b }) => (
              <div key={t} style={{ padding:'1.5rem', border:'1px solid var(--outline-var)', borderRadius:16, borderTop:'3px solid var(--primary)' }}>
                <span style={{ fontSize:26, display:'block', marginBottom:'.65rem' }}>{i}</span>
                <h3 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'.95rem', marginBottom:'.35rem' }}>{t}</h3>
                <p style={{ color:'var(--on-surface-var)', fontSize:'.82rem', lineHeight:1.7 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── London Used ──────────────────────────────── */}
        <div style={{ padding:'3rem 0' }}>
          <div className="sec-tag">London Used Explained</div>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(1.5rem,3vw,2rem)', letterSpacing:'-.02em', marginBottom:'1.5rem' }}>What "London Used" Actually Means</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2.5rem' }} className="lu-g">
            <div>
              <p style={{ color:'var(--on-surface-var)', fontSize:'.875rem', lineHeight:1.8, marginBottom:'1rem' }}>
                London Used phones are pre-owned devices sourced from the UK and Europe — returns, trade-ins, and end-of-lease units from verified suppliers. We inspect and grade each one before sale.
              </p>
              <p style={{ color:'var(--on-surface-var)', fontSize:'.875rem', lineHeight:1.8 }}>
                You're not buying a gamble. You're buying a tested, verified, warranted device at a fraction of the new price.
              </p>
            </div>
            <div style={{ border:'1px solid var(--outline-var)', borderRadius:12, overflow:'hidden' }}>
              {['Fully tested before sale','Clean cosmetic condition (minor marks possible)','Full warranty included','IMEI verified — not blacklisted','Sourced from UK/EU suppliers','Dramatically cheaper than brand new'].map((item,i,arr) => (
                <div key={item} style={{ display:'flex', gap:'.65rem', padding:'.65rem .9rem', borderBottom:i<arr.length-1?'1px solid var(--outline-var)':'none', background:i%2===0?'var(--surface-lowest)':'var(--surface-low)', alignItems:'center' }}>
                  <span style={{ color:'var(--primary)', fontWeight:800, fontSize:'.75rem', flexShrink:0 }}>✓</span>
                  <span style={{ fontSize:'.82rem', color:'var(--on-surface-var)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .owner-g,.shop-g,.lu-g{ grid-template-columns:1fr!important; gap:1.5rem!important }
          .shop-g>div:last-child{ order:-1 }
          .stat-bar{ grid-template-columns:repeat(3,1fr)!important }
        }
        @media(max-width:400px){ .stat-bar{ grid-template-columns:1fr!important } }
      `}</style>
    </div>
  )
}