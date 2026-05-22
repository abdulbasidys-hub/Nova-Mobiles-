import { Link } from 'react-router-dom'
import { SITE, buildWhatsAppUrl } from '../lib/constants'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-dark)', borderTop: '1px solid var(--border)', marginTop: '5rem' }}>
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <div className="grid-4">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <div style={{ width: 32, height: 32, background: 'var(--blue)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📱</div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Nova Mobiles<span style={{ color: 'var(--blue)' }}>+</span></span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              Kano's trusted source for genuine smartphones. New, London Used & Accessories with 10+ years of expertise.
            </p>
            <a href={`https://tiktok.com/${SITE.tiktok}`} target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--blue)', fontSize: '0.875rem' }}>TikTok: {SITE.tiktok}</a>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Quick Links</h4>
            {[['/', 'Home'], ['/shop', 'Shop'], ['/pixel-guide', 'Pixel Guide'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.6rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                {label}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Products</h4>
            {['Google Pixel', 'Samsung Galaxy', 'iPhones', 'Oppo', 'Accessories'].map(p => (
              <p key={p} style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.6rem' }}>{p}</p>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Contact</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.6rem' }}>📍 {SITE.address}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.6rem' }}>🕐 {SITE.hours}</p>
            <a href={`mailto:${SITE.email}`} style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>{SITE.email}</a>
            <a href={buildWhatsAppUrl('Hi Nova Mobiles Plus!')} target="_blank" rel="noopener noreferrer"
              className="btn btn-green" style={{ fontSize: '0.875rem', padding: '0.6rem 1.25rem', justifyContent: 'center', width: '100%' }}>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>© 2025 Nova Mobiles Plus. All rights reserved.</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Kano, Nigeria 🇳🇬</p>
        </div>
      </div>
    </footer>
  )
}
