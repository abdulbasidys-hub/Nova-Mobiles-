import { Link } from 'react-router-dom'
import { buildWhatsAppUrl } from '../lib/constants'

const PIXELS = [
  { model: 'Pixel 9 Pro', year: 2024, price: '₦680,000+', best: 'Best overall 2024', highlights: ['Tensor G4 chip', '50MP Triple camera', '6.3" OLED display', 'Best AI features'] },
  { model: 'Pixel 8 Pro', year: 2023, price: '₦500,000+', best: 'Best value flagship', highlights: ['Tensor G3 chip', '50MP Triple camera', 'Temperature sensor', 'Video Boost'] },
  { model: 'Pixel 8', year: 2023, price: '₦350,000+', best: 'Best compact Pixel', highlights: ['Tensor G3 chip', '50MP camera', 'Compact 6.2"', '7 years updates'] },
  { model: 'Pixel 7a', year: 2023, price: '₦250,000+', best: 'Best budget Pixel', highlights: ['Tensor G2 chip', '64MP camera', 'Wireless charging', 'IP67 water resistant'] },
  { model: 'Pixel 7 Pro', year: 2022, price: '₦280,000+', best: 'Affordable pro camera', highlights: ['Tensor G2 chip', '50MP Triple camera', '5x optical zoom', '6.7" curved display'] },
  { model: 'Pixel 6a', year: 2022, price: '₦150,000+', best: 'Best entry Pixel', highlights: ['Tensor G1 chip', '12MP camera', 'Clean Android', 'Long battery'] },
]

export default function PixelGuide() {
  return (
    <div>
      <div className="page-header container" style={{ textAlign: 'center' }}>
        <span className="badge badge-new" style={{ marginBottom: '1rem' }}>Google Pixel Specialists</span>
        <h1 className="page-title">The Pixel Buyer's Guide</h1>
        <p className="page-sub" style={{ maxWidth: 560, margin: '0.5rem auto 0' }}>Everything you need to know before buying a Google Pixel in Nigeria.</p>
      </div>

      <div className="container" style={{ paddingBottom: '5rem' }}>
        <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Why Google Pixel?</h2>
          <div className="grid-2">
            {[
              { title: '📸 Best Camera', desc: 'Pixel cameras beat phones costing 3x more. The computational photography is unmatched.' },
              { title: '🤖 Pure Android', desc: 'No bloatware. No manufacturer skin. The cleanest, fastest Android experience available.' },
              { title: '🔄 Longest Updates', desc: 'Pixel 8 and later get 7 years of OS and security updates — no other Android phone offers this.' },
              { title: '🧠 Google AI', desc: 'Call Screen, Live Translate, Magic Eraser — exclusive AI features built into the OS.' },
              { title: '💰 Value for Money', desc: 'A used Pixel 7 Pro outperforms brand new phones at the same price. Incredible value.' },
              { title: '🔋 All-Day Battery', desc: 'Adaptive Battery learns your patterns and optimizes to last all day, every day.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ padding: '1.25rem', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem' }}>Which Pixel Should You Buy?</h2>
        <div className="grid-3" style={{ marginBottom: '2rem' }}>
          {PIXELS.map(p => (
            <div key={p.model} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1rem' }}>{p.model}</h3>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{p.year}</span>
              </div>
              <span className="badge badge-new" style={{ fontSize: '0.7rem', marginBottom: '0.75rem' }}>{p.best}</span>
              <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>{p.price}</p>
              {p.highlights.map(h => (
                <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 4 }}>
                  <span style={{ color: '#4ade80' }}>✓</span> {h}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Budget Guide</h2>
          {[
            { budget: 'Under ₦200,000', rec: 'Pixel 6a (London Used)', note: 'Clean Android, decent camera, great for everyday use' },
            { budget: '₦200k – ₦350k', rec: 'Pixel 7a or Pixel 7 Pro (London Used)', note: 'Best value — flagship experience at mid-range price' },
            { budget: '₦350k – ₦550k', rec: 'Pixel 8 or Pixel 8 Pro', note: 'Best current flagship, 7-year updates, incredible camera' },
            { budget: 'Above ₦550,000', rec: 'Pixel 9 Pro or Pixel 9 Pro XL', note: 'The absolute best — future-proof for years to come' },
          ].map(({ budget, rec, note }) => (
            <div key={budget} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', padding: '1rem', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.9rem', width: 160, flexShrink: 0 }}>{budget}</span>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{rec}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{note}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg, rgba(26,115,232,0.15), rgba(17,24,39,0.8))', border: '1px solid rgba(26,115,232,0.2)', borderRadius: 'var(--radius)', padding: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Still Not Sure Which Pixel?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Message us and we'll recommend the best Pixel for your budget and needs.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={buildWhatsAppUrl('Hi! I need help choosing a Google Pixel. Can you advise?')} target="_blank" rel="noopener noreferrer" className="btn btn-green">
              💬 Ask on WhatsApp
            </a>
            <Link to="/shop" className="btn btn-primary">Shop Pixel Phones</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
