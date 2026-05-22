import { Link } from 'react-router-dom'
import { buildWhatsAppUrl } from '../lib/constants'

const ARTICLES = [
  { num: '01', title: 'Why the Pixel camera beats phones costing twice as much',      tag: 'Camera', read: '4 min read' },
  { num: '02', title: 'Understanding London Used: A grading guide for smart buyers',  tag: 'Buying Guide', read: '6 min read' },
  { num: '03', title: 'Pixel 8 vs Pixel 7 Pro: Which is the better buy in 2025?',    tag: 'Comparison', read: '5 min read' },
  { num: '04', title: 'Does the Pixel 6a still hold up in 2025?',                     tag: 'Review', read: '3 min read' },
]

const MODELS = [
  { name: 'Pixel 9 Pro', yr: '2024', price: '₦680k+', tag: 'Latest',        cam: '50MP Triple', upd: '7 yrs', zoom: '5×', highlights: 'Best-ever Pixel. Tensor G4, brightest display, top-tier AI.' },
  { name: 'Pixel 8 Pro', yr: '2023', price: '₦500k+', tag: 'Best Value',    cam: '50MP Triple', upd: '7 yrs', zoom: '5×', highlights: 'Pro Pixel features at a more accessible price. Video Boost included.' },
  { name: 'Pixel 8',     yr: '2023', price: '₦350k+', tag: 'Best Compact',  cam: '50MP',        upd: '7 yrs', zoom: '2×', highlights: 'Smaller, lighter, same 7-year update promise. Ideal daily driver.' },
  { name: 'Pixel 7a',    yr: '2023', price: '₦250k+', tag: 'Best Budget',   cam: '64MP',        upd: '5 yrs', zoom: '2×', highlights: 'Best mid-range camera phone. Wireless charging, IP67, Tensor G2.' },
  { name: 'Pixel 7 Pro', yr: '2022', price: '₦280k+', tag: 'Pro for Less',  cam: '50MP Triple', upd: '5 yrs', zoom: '5×', highlights: 'Curved display, 5× zoom, pro-level camera. Excellent London Used pick.' },
  { name: 'Pixel 6a',    yr: '2022', price: '₦150k+', tag: 'Entry Level',   cam: '12MP',        upd: '5 yrs', zoom: 'None', highlights: 'Clean Android, Tensor G1, excellent value. Best entry-level Pixel.' },
]

const LU_CHECKLIST = [
  { ok: true,  item: 'Screen has no dead pixels or bleed' },
  { ok: true,  item: 'Face unlock and fingerprint scanner working' },
  { ok: true,  item: 'All cameras functional (check selfie + rear)' },
  { ok: true,  item: 'Speakers and microphone clear' },
  { ok: true,  item: 'Charging port not loose or damaged' },
  { ok: true,  item: 'Battery health above 80% ideally' },
  { ok: true,  item: 'IMEI not blacklisted (we verify all our stock)' },
  { ok: false, item: 'Minor cosmetic scratches are normal and expected' },
]

export default function PixelGuide() {
  return (
    <div className="page-top">

      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--rule)', background: 'var(--bg-off)', padding: '3rem 0' }}>
        <div className="wrap">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--blue)', display: 'block', marginBottom: '0.5rem' }}>Google Pixel Specialists — Nova Mobiles Plus</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: '1rem', maxWidth: 680 }}>
            The Pixel Buyer's<br /><em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>Field Guide.</em>
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', maxWidth: 520, lineHeight: 1.75, marginBottom: '1.5rem' }}>
            Ten years of selling Pixels in Kano. This is everything we'd tell a friend before they buy — honest, practical, and direct.
          </p>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-primary btn-sm">Shop Pixels Now →</Link>
            <a href={buildWhatsAppUrl('Hi! I need help picking a Pixel phone.')} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">Ask Us Directly</a>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingBottom: '5rem' }}>

        {/* Article cards */}
        <div style={{ margin: '3rem 0', borderBottom: '1px solid var(--rule)', paddingBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-faint)' }}>Reading</span>
            <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {ARTICLES.map((a, i, arr) => (
              <div key={a.num} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.1rem 0', borderBottom: i < arr.length - 1 ? '1px solid var(--rule)' : 'none', cursor: 'default' }}>
                <span className="editorial-num" style={{ width: 28, flexShrink: 0 }}>{a.num}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3, marginBottom: '0.2rem' }}>{a.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="badge badge-blue">{a.tag}</span>
                    <span style={{ color: 'var(--ink-faint)', fontSize: '0.7rem' }}>{a.read}</span>
                  </div>
                </div>
                <a href={buildWhatsAppUrl(`Hi! I want to learn more about: ${a.title}`)} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--blue)', fontSize: '0.75rem', fontWeight: 600, flexShrink: 0, whiteSpace: 'nowrap' }}>
                  Ask us →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Model comparison */}
        <div style={{ marginBottom: '3rem', borderBottom: '1px solid var(--rule)', paddingBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-faint)' }}>Model Comparison</span>
            <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
          </div>
          <div className="g3">
            {MODELS.map(m => (
              <div key={m.name} style={{ padding: '1.25rem', border: '1px solid var(--card-border)', borderRadius: 8, transition: 'border-color 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue-border)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem' }}>{m.name}</h3>
                  <span style={{ color: 'var(--ink-faint)', fontSize: '0.7rem', fontWeight: 600 }}>{m.yr}</span>
                </div>
                <span className="badge badge-blue" style={{ marginBottom: '0.6rem' }}>{m.tag}</span>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--blue)', marginBottom: '0.75rem' }}>{m.price}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.75rem' }}>
                  {[['📷', m.cam], ['🔄', `${m.upd} updates`], ['🔭', `${m.zoom} zoom`]].map(([ic, val]) => (
                    <div key={val} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                      <span style={{ fontSize: 12 }}>{ic}</span> {val}
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', lineHeight: 1.6, borderTop: '1px solid var(--rule)', paddingTop: '0.6rem' }}>{m.highlights}</p>
              </div>
            ))}
          </div>
        </div>

        {/* London Used Checklist */}
        <div style={{ marginBottom: '3rem', borderBottom: '1px solid var(--rule)', paddingBottom: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="lu-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-faint)' }}>London Used Checklist</span>
                <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
                What to check before buying a used phone.
              </h2>
              <p style={{ color: 'var(--ink-muted)', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                When buying from Nova Mobiles Plus, we've already done these checks. But if you ever buy from elsewhere, this is the list every buyer should run through.
              </p>
              <a href={buildWhatsAppUrl('Hi! I have questions about buying a London Used phone.')} target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost btn-sm">Ask Us a Question →</a>
            </div>
            <div>
              {LU_CHECKLIST.map(({ ok, item }, i) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem 0', borderBottom: i < LU_CHECKLIST.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                  <span style={{ fontSize: 14, marginTop: 1, flexShrink: 0 }}>{ok ? '✅' : '⚠️'}</span>
                  <span style={{ fontSize: '0.85rem', color: ok ? 'var(--ink-2)' : 'var(--ink-muted)', fontWeight: ok ? 500 : 400 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Budget grid */}
        <div style={{ marginBottom: '3rem', borderBottom: '1px solid var(--rule)', paddingBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-faint)' }}>Budget Guide</span>
            <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { r: 'Under ₦200,000',  rec: 'Pixel 6a (London Used)', note: 'Clean Android, solid camera, great for everyday use.' },
              { r: '₦200k – ₦350k',   rec: 'Pixel 7a or Pixel 7 Pro',note: 'Flagship performance at half the price of new.' },
              { r: '₦350k – ₦550k',   rec: 'Pixel 8 or Pixel 8 Pro', note: 'Best current generation — 7-year support, excellent camera.' },
              { r: '₦550,000+',        rec: 'Pixel 9 Pro',            note: 'Future-proof. The absolute best Pixel money can buy.' },
            ].map(({ r, rec, note }, i, arr) => (
              <div key={r} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', padding: '1rem 0', borderBottom: i < arr.length - 1 ? '1px solid var(--rule)' : 'none', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--blue)', width: 155, flexShrink: 0 }}>{r}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.15rem' }}>{rec}</p>
                  <p style={{ color: 'var(--ink-muted)', fontSize: '0.78rem' }}>{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'var(--bg-off)', border: '1px solid var(--rule)', borderRadius: 8, padding: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '0.75rem' }}>
            Still unsure which Pixel is right for you?
          </h2>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.875rem', maxWidth: 400, margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
            Tell us your budget and what you use your phone for. We'll pick the right one.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={buildWhatsAppUrl('Hi! I need help choosing a Google Pixel. My budget is...')} target="_blank" rel="noopener noreferrer" className="btn btn-green btn-lg">💬 Ask on WhatsApp</a>
            <Link to="/shop" className="btn btn-primary btn-lg">Shop Pixel Phones →</Link>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .lu-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }`}</style>
    </div>
  )
}
