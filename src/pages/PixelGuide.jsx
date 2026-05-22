import { Link } from 'react-router-dom'
import { buildWhatsAppUrl } from '../lib/constants'
import SectionHeader from '../components/SectionHeader'

const MODELS = [
  { model: 'Pixel 9 Pro',  year: 2024, price: '₦680k+', tag: 'Latest · Best Overall', highlights: ['Tensor G4 · AI-first chip', '50MP Triple camera system', '6.3" LTPO OLED · 120Hz', '7 years of updates guaranteed'] },
  { model: 'Pixel 8 Pro',  year: 2023, price: '₦500k+', tag: 'Best Value Flagship',    highlights: ['Tensor G3 processor', '50MP Triple + temperature sensor', 'Video Boost for pro video', 'Best-in-class low-light camera'] },
  { model: 'Pixel 8',      year: 2023, price: '₦350k+', tag: 'Best Compact',           highlights: ['Tensor G3 · Compact 6.2"', '50MP main camera', '7 years OS updates', 'All-day battery life'] },
  { model: 'Pixel 7a',     year: 2023, price: '₦250k+', tag: 'Best Budget Pixel',      highlights: ['Tensor G2 · 64MP camera', 'Wireless charging support', 'IP67 water resistance', 'Flagship feel, mid-range price'] },
  { model: 'Pixel 7 Pro',  year: 2022, price: '₦280k+', tag: 'Pro Camera on a Budget', highlights: ['50MP Triple · 5x optical zoom', '6.7" curved LTPO OLED', 'Face unlock + fingerprint', 'Ideal London Used pick'] },
  { model: 'Pixel 6a',     year: 2022, price: '₦150k+', tag: 'Entry Pixel',            highlights: ['Tensor G1 · Clean Android', '12MP camera · OIS', 'Long software support', 'Best entry-level value'] },
]

const REASONS = [
  { icon: '📸', title: 'Best Camera Android',    body: 'Pixel cameras beat phones costing 3x more. Google\'s computational photography — Night Sight, Magic Eraser, Real Tone — produces shots that feel professional without any editing.' },
  { icon: '🔄', title: '7 Years of Updates',     body: 'Pixel 8 and later receive 7 full years of Android OS and security updates. No other Android brand comes close. Your investment stays secure and current.' },
  { icon: '🤖', title: 'Exclusive Google AI',    body: 'Call Screen, Live Translate, Magic Eraser, and on-device AI features are exclusive to Pixel. These aren\'t gimmicks — they\'re genuinely useful, every day.' },
  { icon: '📱', title: 'Pure Android Experience', body: 'No manufacturer skin, no bloatware, no preloaded apps you can\'t remove. Pixel runs Android as Google designed it — fast, clean, and responsive.' },
]

const COMPARISON = [
  { label: 'Camera Quality',    p6a: '⭐⭐⭐', p7a: '⭐⭐⭐⭐', p8: '⭐⭐⭐⭐', p8p: '⭐⭐⭐⭐⭐', p9p: '⭐⭐⭐⭐⭐' },
  { label: 'Update Years',      p6a: '5 yrs',  p7a: '5 yrs', p8: '7 yrs', p8p: '7 yrs',     p9p: '7 yrs' },
  { label: 'Optical Zoom',      p6a: 'None',   p7a: 'None',  p8: 'None',  p8p: '5x',        p9p: '5x' },
  { label: 'Wireless Charging', p6a: '❌',     p7a: '✅',    p8: '✅',    p8p: '✅',         p9p: '✅' },
  { label: 'Water Resistance',  p6a: 'IP67',   p7a: 'IP67',  p8: 'IP68',  p8p: 'IP68',       p9p: 'IP68' },
  { label: 'Our Price (est.)',   p6a: '₦150k+', p7a: '₦250k+',p8: '₦350k+',p8p: '₦500k+',  p9p: '₦680k+' },
]

export default function PixelGuide() {
  return (
    <div className="page-pt">

      {/* ── HEADER ──────────────────────────────────────── */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '3rem 0 2.5rem', textAlign: 'center' }}>
        <div className="container">
          <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--blue)', display: 'block', marginBottom: '0.5rem' }}>Google Pixel Specialists</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: '0.75rem' }}>The Pixel Buyer's Guide</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 520, margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
            10+ years of selling Pixels in Kano. This is everything we'd tell a friend before they buy.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-primary">Shop Pixels Now →</Link>
            <a href={buildWhatsAppUrl('Hi! I need help choosing a Google Pixel phone.')} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Ask Us Directly</a>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '5rem' }}>

        {/* ── WHY PIXEL ──────────────────────────────────── */}
        <div style={{ margin: '3rem 0' }}>
          <SectionHeader label="Why Pixel?" title="Four reasons Pixel wins." subtitle="Not marketing — real reasons our customers keep coming back to Pixel." />
          <div className="grid-2">
            {REASONS.map(({ icon, title, body }) => (
              <div key={title} style={{ display: 'flex', gap: '1rem', padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{icon}</span>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MODEL CARDS ────────────────────────────────── */}
        <div style={{ marginBottom: '3rem' }}>
          <SectionHeader label="Which Pixel?" title="Every model explained." subtitle="Sorted from newest to most affordable." />
          <div className="grid-3">
            {MODELS.map(p => (
              <div key={p.model} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '1.25rem', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue-border)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem' }}>{p.model}</h3>
                  <span style={{ color: 'var(--text-faint)', fontSize: '0.72rem', fontWeight: 600 }}>{p.year}</span>
                </div>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{p.tag}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text)', marginBottom: '0.85rem' }}>{p.price}</p>
                {p.highlights.map(h => (
                  <div key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 5, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--green)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span> {h}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── COMPARISON TABLE ────────────────────────────── */}
        <div style={{ marginBottom: '3rem' }}>
          <SectionHeader label="Side by Side" title="Comparison table." subtitle="At a glance — all six models compared on what matters." />
          <div style={{ overflowX: 'auto', borderRadius: 10, border: '1px solid var(--border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--blue)' }}>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: '#fff', fontWeight: 700, whiteSpace: 'nowrap' }}>Feature</th>
                  {['Pixel 6a', 'Pixel 7a', 'Pixel 8', 'Pixel 8 Pro', 'Pixel 9 Pro'].map(m => (
                    <th key={m} style={{ padding: '0.85rem 1rem', textAlign: 'center', color: '#fff', fontWeight: 700, whiteSpace: 'nowrap' }}>{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>{row.label}</td>
                    {[row.p6a, row.p7a, row.p8, row.p8p, row.p9p].map((v, j) => (
                      <td key={j} style={{ padding: '0.75rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── BUDGET GUIDE ────────────────────────────────── */}
        <div style={{ marginBottom: '3rem' }}>
          <SectionHeader label="Budget" title="What can you get for your money?" />
          {[
            { range: 'Under ₦200,000',  rec: 'Pixel 6a (London Used)', note: 'Clean Android, good camera, reliable updates' },
            { range: '₦200k – ₦350k',   rec: 'Pixel 7a or Pixel 7 Pro (London Used)', note: 'Flagship experience at half the price' },
            { range: '₦350k – ₦550k',   rec: 'Pixel 8 or Pixel 8 Pro',  note: 'Best current gen — 7-year updates, pro camera' },
            { range: '₦550,000+',        rec: 'Pixel 9 Pro',             note: 'The absolute best. Future-proof for years.' },
          ].map(({ range, rec, note }, i) => (
            <div key={range} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', padding: '1rem 1.25rem', background: i % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: i === 0 ? '10px 10px 0 0' : i === 3 ? '0 0 10px 10px' : 0, borderBottom: i < 3 ? 'none' : '1px solid var(--border)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--blue)', width: 145, flexShrink: 0 }}>{range}</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 3 }}>{rec}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ─────────────────────────────────────────── */}
        <div style={{ background: 'var(--blue-muted)', border: '1px solid var(--blue-border)', borderRadius: 12, padding: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.75rem' }}>Still not sure which Pixel?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem', maxWidth: 400, margin: '0 auto 1.5rem' }}>
            Tell us your budget and what you use your phone for — we'll pick the right one for you.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={buildWhatsAppUrl('Hi! I need help choosing a Google Pixel. Can you advise me?')} target="_blank" rel="noopener noreferrer" className="btn btn-green btn-lg">💬 Ask on WhatsApp</a>
            <Link to="/shop" className="btn btn-primary btn-lg">Shop Pixels →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
