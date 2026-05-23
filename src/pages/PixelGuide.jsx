import { Link } from 'react-router-dom'
import { buildWhatsAppUrl } from '../lib/constants'
import StatusBadge from '../components/StatusBadge'

const MODELS = [
  { name: 'Pixel 9 Pro',  yr: 2024, price: '₦680k+', tag: 'Just Arrived', cam: '50MP Triple', upd: '7 yrs', zoom: '5×', verdict: 'The flagship. Best Tensor chip ever, brightest display, top AI.' },
  { name: 'Pixel 8 Pro',  yr: 2023, price: '₦500k+', tag: 'London Used',  cam: '50MP Triple', upd: '7 yrs', zoom: '5×', verdict: 'Pro performance, Video Boost, temperature sensor. Excellent value.' },
  { name: 'Pixel 8',      yr: 2023, price: '₦350k+', tag: 'London Used',  cam: '50MP',        upd: '7 yrs', zoom: '2×', verdict: 'Compact powerhouse with 7-year support. The daily driver pick.' },
  { name: 'Pixel 7a',     yr: 2023, price: '₦250k+', tag: 'London Used',  cam: '64MP',        upd: '5 yrs', zoom: '2×', verdict: 'Wireless charging, IP67, 64MP camera. The best budget Pixel.' },
  { name: 'Pixel 7 Pro',  yr: 2022, price: '₦280k+', tag: 'London Used',  cam: '50MP Triple', upd: '5 yrs', zoom: '5×', verdict: '5× optical zoom, curved display. Great London Used flagship.' },
  { name: 'Pixel 6a',     yr: 2022, price: '₦150k+', tag: 'London Used',  cam: '12MP',        upd: '5 yrs', zoom: 'None', verdict: 'Pure Tensor at entry price. Great for first-time Pixel buyers.' },
]

const CHECKLIST = [
  { ok: true,  t: 'Screen — no dead pixels, no bleed, touch works everywhere' },
  { ok: true,  t: 'All cameras (front + rear) — test photo, video, zoom' },
  { ok: true,  t: 'Face unlock & fingerprint — fast and consistent' },
  { ok: true,  t: 'Speaker & microphone — clear, no distortion' },
  { ok: true,  t: 'Charging port — firm connection, no wobble' },
  { ok: true,  t: 'IMEI check — not blacklisted (we verify all stock)' },
  { ok: true,  t: 'Battery health — ideally above 80%' },
  { ok: false, t: 'Minor cosmetic marks — expected and normal at this price' },
]

export default function PixelGuide() {
  return (
    <div className="pt">

      {/* Header */}
      <div style={{ background: 'var(--blue)', color: '#fff', padding: '3rem 0', borderBottom: '1px solid rgba(255,255,255,.15)' }}>
        <div className="W">
          <span style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', opacity: .75, display: 'block', marginBottom: '.5rem' }}>Nova Mobiles Plus — Google Pixel Specialists</span>
          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-.025em', lineHeight: .95, marginBottom: '1rem' }}>
            PIXEL BUYER'S<br />FIELD GUIDE
          </h1>
          <p style={{ opacity: .85, fontSize: '.95rem', maxWidth: 480, lineHeight: 1.65, marginBottom: '1.5rem' }}>
            10 years of selling Pixels in Kano. Everything you need to know before you buy — straight, honest, practical.
          </p>
          <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn" style={{ background: '#fff', color: 'var(--blue)', fontWeight: 700 }}>Browse Pixels →</Link>
            <a href={buildWhatsAppUrl('Hi! I need help choosing a Google Pixel.')} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.35)' }}>Ask Us Directly</a>
          </div>
        </div>
      </div>

      <div className="W" style={{ paddingBottom: '5rem' }}>

        {/* Model comparison grid */}
        <div className="S" style={{ borderBottom: '1px solid var(--line)' }}>
          <div className="sec-tag">Model Comparison</div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-.02em', marginBottom: '1.5rem' }}>Which Pixel Should You Buy?</h2>
          <div className="g3">
            {MODELS.map(m => (
              <div key={m.name} style={{ border: '1px solid var(--line)', borderRadius: 'var(--r)', overflow: 'hidden', transition: 'border-color var(--t)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
                <div style={{ padding: '.65rem .85rem', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1rem' }}>{m.name}</h3>
                    <span style={{ fontSize: '.65rem', color: 'var(--ink-4)', fontWeight: 600 }}>{m.yr}</span>
                  </div>
                  <StatusBadge value={m.tag} />
                </div>
                <div style={{ padding: '.85rem' }}>
                  <span className="num" style={{ fontSize: '1.2rem', color: 'var(--blue)', display: 'block', marginBottom: '.75rem' }}>{m.price}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem', marginBottom: '.75rem' }}>
                    {[['📷', m.cam], ['🔄', `${m.upd} updates`], ['🔭', `${m.zoom} zoom`]].map(([ic, v]) => (
                      <div key={v} style={{ display: 'flex', gap: '.4rem', fontSize: '.75rem', color: 'var(--ink-2)', alignItems: 'center' }}>
                        <span style={{ fontSize: 11 }}>{ic}</span> {v}
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: '.78rem', color: 'var(--ink-3)', lineHeight: 1.6, borderTop: '1px solid var(--line)', paddingTop: '.65rem' }}>{m.verdict}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Pixel */}
        <div className="S" style={{ borderBottom: '1px solid var(--line)' }}>
          <div className="sec-tag">Why Pixel?</div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-.02em', marginBottom: '1.5rem' }}>Four Reasons Pixel Wins</h2>
          <div className="g2">
            {[
              { i: '📸', t: 'Best Camera on Android', b: "Pixel's computational photography beats phones costing 3× more. Night Sight, Magic Eraser, Real Tone. No other Android camera comes close." },
              { i: '🤖', t: 'Pure Android, No Clutter', b: 'Zero bloatware. Zero manufacturer skin. Just fast, clean Android as Google designed it — with exclusive AI features baked in.' },
              { i: '🔄', t: '7 Years of Updates',      b: 'Pixel 8 and later get 7 full years of OS and security updates. No other Android brand offers this. Your investment stays protected.' },
              { i: '💰', t: 'Flagship Value',           b: 'A London Used Pixel 7 Pro gives you pro-level specs at mid-range prices. Unmatched value for money in the Kano market.' },
            ].map(({ i, t, b }) => (
              <div key={t} style={{ display: 'flex', gap: '1rem', padding: '1.25rem', border: '1px solid var(--line)', borderRadius: 'var(--r)', borderLeft: `3px solid var(--blue)` }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{i}</span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '.95rem', marginBottom: '.35rem' }}>{t}</h3>
                  <p style={{ color: 'var(--ink-3)', fontSize: '.82rem', lineHeight: 1.65 }}>{b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* London Used Checklist */}
        <div className="S" style={{ borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '3.5rem', alignItems: 'start' }} className="lu-g">
            <div>
              <div className="sec-tag">London Used Checklist</div>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-.02em', lineHeight: 1.05, marginBottom: '1rem' }}>What to Check Before You Buy</h2>
              <p style={{ color: 'var(--ink-3)', fontSize: '.875rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                When buying from Nova Mobiles Plus, we've already done these checks. But if you buy elsewhere, run through this list every time.
              </p>
              <a href={buildWhatsAppUrl('Hi! I want to ask about a London Used phone.')} target="_blank" rel="noopener noreferrer" className="btn btn-outline-blue btn-sm">Ask Us a Question →</a>
            </div>
            <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--r)', overflow: 'hidden' }}>
              {CHECKLIST.map(({ ok, t }, i) => (
                <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem', padding: '.75rem 1rem', borderBottom: i < CHECKLIST.length - 1 ? '1px solid var(--line)' : 'none', background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-2)' }}>
                  <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{ok ? '✅' : '⚠️'}</span>
                  <span style={{ fontSize: '.82rem', color: ok ? 'var(--ink-2)' : 'var(--ink-3)' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Budget guide */}
        <div className="S" style={{ borderBottom: '1px solid var(--line)' }}>
          <div className="sec-tag">Budget Guide</div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-.02em', marginBottom: '1.5rem' }}>What Can You Get for Your Budget?</h2>
          <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--r)', overflow: 'hidden' }}>
            {[
              { r: 'Under ₦200,000', m: 'Pixel 6a (London Used)', n: 'Clean Android, solid camera, great everyday use.' },
              { r: '₦200k – ₦350k',  m: 'Pixel 7a or 7 Pro',      n: 'Flagship performance at half the new price.' },
              { r: '₦350k – ₦550k',  m: 'Pixel 8 or 8 Pro',       n: '7-year updates, pro camera, current generation.' },
              { r: '₦550,000+',       m: 'Pixel 9 Pro',            n: 'Future-proof. The absolute best Pixel money can buy.' },
            ].map(({ r, m, n }, i, arr) => (
              <div key={r} style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none', background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-2)', flexWrap: 'wrap' }}>
                <span className="num" style={{ color: 'var(--blue)', fontSize: '.9rem', width: 155, flexShrink: 0 }}>{r}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '.9rem', marginBottom: '.1rem' }}>{m}</p>
                  <p style={{ color: 'var(--ink-3)', fontSize: '.75rem' }}>{n}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: '2.5rem', background: 'var(--blue)', borderRadius: 'var(--r)', padding: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#fff', marginBottom: '.65rem' }}>Still not sure which Pixel?</h2>
          <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '.9rem', marginBottom: '1.5rem' }}>Tell us your budget and what you use your phone for. We'll pick the right one.</p>
          <div style={{ display: 'flex', gap: '.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={buildWhatsAppUrl('Hi! I need help choosing a Google Pixel. My budget is...')} target="_blank" rel="noopener noreferrer" className="btn btn-green btn-lg">💬 Ask on WhatsApp</a>
            <Link to="/shop" className="btn btn-lg" style={{ background: '#fff', color: 'var(--blue)', fontWeight: 700 }}>Browse Pixels →</Link>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.lu-g{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </div>
  )
}
