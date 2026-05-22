import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { buildWhatsAppUrl } from '../lib/constants'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/pixel-guide', label: 'Pixel Guide' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(10,15,30,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
      transition: 'all 0.3s'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: 'var(--blue)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📱</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>
            Nova Mobiles<span style={{ color: 'var(--blue)' }}>+</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
              {l.label}
            </Link>
          ))}
          <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')}
            target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
            WhatsApp Us
          </a>
        </div>

        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer', display: 'none' }} className="menu-btn">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '1.5rem' }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '0.75rem 0', color: 'var(--text-muted)', fontWeight: 500, borderBottom: '1px solid var(--border)' }}>
              {l.label}
            </Link>
          ))}
          <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')}
            target="_blank" rel="noopener noreferrer" className="btn btn-green" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
            WhatsApp Us
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
