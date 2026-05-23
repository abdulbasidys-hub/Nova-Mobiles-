import { Link } from 'react-router-dom'
import { SITE, buildWhatsAppUrl } from '../lib/constants'
export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)', marginTop: '4rem' }}>
      <div className="W" style={{ padding: '3rem 2rem 1.75rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.4fr', gap: '2.5rem' }} className="ft-g">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.85rem' }}>
              <div style={{ width: 26, height: 26, background: 'var(--blue)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>📱</div>
              <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1rem' }}>NOVA MOBILES<span style={{ color: 'var(--blue)' }}>+</span></span>
            </div>
            <p style={{ color: 'var(--ink-3)', fontSize: '.82rem', lineHeight: 1.7, maxWidth: 220, marginBottom: '1rem' }}>Kano's trusted Google Pixel destination. New, London Used & Accessories. 10+ years.</p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              <a href={buildWhatsAppUrl('Hi!')} target="_blank" rel="noopener noreferrer" className="btn btn-green btn-sm">💬 WhatsApp</a>
              <a href={`https://tiktok.com/${SITE.tiktok}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">TikTok</a>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--ink-4)', marginBottom: '.85rem' }}>Pages</p>
            {[['/', 'Home'], ['/shop', 'Shop'], ['/pixel-guide', 'Pixel Guide'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, l]) => (
              <Link key={to} to={to} style={{ display: 'block', color: 'var(--ink-3)', fontSize: '.82rem', marginBottom: '.45rem', transition: 'color .12s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-3)'}>{l}</Link>
            ))}
          </div>
          <div>
            <p style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--ink-4)', marginBottom: '.85rem' }}>Brands</p>
            {['Google Pixel', 'iPhone', 'Samsung', 'Oppo', 'Accessories'].map(b => <p key={b} style={{ color: 'var(--ink-3)', fontSize: '.82rem', marginBottom: '.45rem' }}>{b}</p>)}
          </div>
          <div>
            <p style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--ink-4)', marginBottom: '.85rem' }}>Contact</p>
            {[{ i: '📍', t: SITE.address }, { i: '🕐', t: SITE.hours }, { i: '✉️', t: SITE.email, h: `mailto:${SITE.email}` }].map(({ i, t, h }) => (
              <div key={t} style={{ display: 'flex', gap: '.4rem', marginBottom: '.5rem' }}>
                <span style={{ fontSize: 12, flexShrink: 0, marginTop: 2 }}>{i}</span>
                {h ? <a href={h} style={{ color: 'var(--ink-3)', fontSize: '.8rem', lineHeight: 1.5 }}>{t}</a> : <span style={{ color: 'var(--ink-3)', fontSize: '.8rem', lineHeight: 1.5 }}>{t}</span>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--line)', marginTop: '2rem', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.5rem' }}>
          <p style={{ color: 'var(--ink-4)', fontSize: '.72rem' }}>© 2025 Nova Mobiles Plus. All rights reserved.</p>
          <p style={{ color: 'var(--ink-4)', fontSize: '.72rem' }}>No. 6 Lukoro B Farm Center, Kano 🇳🇬</p>
        </div>
      </div>
      <style>{`@media(max-width:768px){.ft-g{grid-template-columns:1fr 1fr!important}}@media(max-width:480px){.ft-g{grid-template-columns:1fr!important}}`}</style>
    </footer>
  )
}
