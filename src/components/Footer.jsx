import { Link } from 'react-router-dom'
import { SITE, buildWhatsAppUrl } from '../lib/constants'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--rule)', background: 'var(--bg-off)', marginTop: '5rem' }}>
      <div className="wrap" style={{ padding: '3.5rem 2rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.4fr', gap: '3rem' }} className="ft-grid">

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <div style={{ width: 26, height: 26, borderRadius: 5, background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>📱</div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem' }}>
                Nova Mobiles<span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>+</span>
              </span>
            </div>
            <p style={{ color: 'var(--ink-muted)', fontSize: '0.82rem', lineHeight: 1.75, maxWidth: 240, marginBottom: '1.25rem' }}>
              Kano's trusted Google Pixel destination. New, London Used & Accessories — backed by 10+ years of expertise.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <a href={buildWhatsAppUrl('Hi!')} target="_blank" rel="noopener noreferrer" className="btn btn-green btn-sm">💬 WhatsApp</a>
              <a href={`https://tiktok.com/${SITE.tiktok}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">TikTok</a>
            </div>
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-faint)', marginBottom: '1rem' }}>Pages</p>
            {[['/', 'Home'], ['/shop', 'Shop'], ['/pixel-guide', 'Pixel Guide'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', color: 'var(--ink-muted)', fontSize: '0.82rem', marginBottom: '0.5rem', transition: 'color 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-muted)'}>
                {label}
              </Link>
            ))}
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-faint)', marginBottom: '1rem' }}>Brands</p>
            {['Google Pixel', 'iPhone', 'Samsung', 'Oppo', 'Accessories'].map(b => (
              <p key={b} style={{ color: 'var(--ink-muted)', fontSize: '0.82rem', marginBottom: '0.5rem' }}>{b}</p>
            ))}
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-faint)', marginBottom: '1rem' }}>Find Us</p>
            {[
              { icon: '📍', text: SITE.address },
              { icon: '🕐', text: SITE.hours },
              { icon: '✉️', text: SITE.email, href: `mailto:${SITE.email}` },
            ].map(({ icon, text, href }) => (
              <div key={text} style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.55rem' }}>
                <span style={{ fontSize: 13, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                {href
                  ? <a href={href} style={{ color: 'var(--ink-muted)', fontSize: '0.8rem', lineHeight: 1.5 }}>{text}</a>
                  : <span style={{ color: 'var(--ink-muted)', fontSize: '0.8rem', lineHeight: 1.5 }}>{text}</span>
                }
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--rule)', marginTop: '2.5rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ color: 'var(--ink-faint)', fontSize: '0.75rem' }}>© 2025 Nova Mobiles Plus. All rights reserved.</p>
          <p style={{ color: 'var(--ink-faint)', fontSize: '0.75rem' }}>No. 6 Lukoro B Farm Center, Kano, Nigeria 🇳🇬</p>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .ft-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; } }
        @media (max-width: 480px) { .ft-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
