import { Link } from 'react-router-dom'
import { SITE, buildWhatsAppUrl } from '../lib/constants'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', marginTop: '5rem' }}>
      <div className="container" style={{ padding: '4rem 2rem 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '3rem' }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.9rem' }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>📱</div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem' }}>Nova Mobiles<span style={{ color: 'var(--blue)' }}>+</span></span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.75, maxWidth: 260, marginBottom: '1.25rem' }}>
              Kano's trusted smartphone destination. New, London Used & Accessories — backed by 10+ years of expertise.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <a href={buildWhatsAppUrl('Hi Nova Mobiles Plus!')} target="_blank" rel="noopener noreferrer"
                className="btn btn-green btn-sm">💬 WhatsApp</a>
              <a href={`https://tiktok.com/${SITE.tiktok}`} target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost btn-sm">TikTok</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-faint)', marginBottom: '1rem' }}>Pages</p>
            {[['/', 'Home'], ['/shop', 'Shop'], ['/pixel-guide', 'Pixel Guide'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.55rem', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                {label}
              </Link>
            ))}
          </div>

          {/* Products */}
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-faint)', marginBottom: '1rem' }}>Brands</p>
            {['Google Pixel', 'Samsung Galaxy', 'iPhone', 'Oppo', 'Accessories'].map(p => (
              <p key={p} style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.55rem' }}>{p}</p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-faint)', marginBottom: '1rem' }}>Contact</p>
            {[
              { icon: '📍', text: SITE.address },
              { icon: '🕐', text: SITE.hours },
              { icon: '✉️', text: SITE.email, href: `mailto:${SITE.email}` },
            ].map(({ icon, text, href }) => (
              <div key={text} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <span style={{ flexShrink: 0, marginTop: 1 }}>{icon}</span>
                {href
                  ? <a href={href} style={{ color: 'var(--text-muted)', fontSize: '0.875rem', transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>{text}</a>
                  : <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{text}</span>
                }
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ color: 'var(--text-faint)', fontSize: '0.82rem' }}>© 2025 Nova Mobiles Plus. All rights reserved.</p>
          <p style={{ color: 'var(--text-faint)', fontSize: '0.82rem' }}>No. 6 Lukoro B Farm Center, Kano, Nigeria 🇳🇬</p>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
