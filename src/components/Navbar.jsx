import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { buildWhatsAppUrl } from '../lib/constants'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/pixel-guide', label: 'Pixel Guide' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname }      = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
    height: 62,
    background: scrolled ? 'var(--bg)' : 'transparent',
    borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
    transition: 'background 0.2s, border-color 0.2s',
  }

  return (
    <>
      <header style={navStyle}>
        <div className="wrap" style={{ height: '100%', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>

          {/* Logo — editorial wordmark */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0, textDecoration: 'none' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 5,
              background: 'var(--blue)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14,
            }}>📱</div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700, fontSize: '1rem',
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
            }}>
              Nova Mobiles<span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>+</span>
            </span>
          </Link>

          {/* Vertical rule */}
          <div style={{ width: 1, height: 20, background: 'var(--rule)', flexShrink: 0 }} className="nav-rule" />

          {/* Nav links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', flex: 1 }} className="desk-nav">
            {LINKS.map(l => {
              const active = pathname === l.to || (l.to !== '/' && pathname.startsWith(l.to))
              return (
                <Link key={l.to} to={l.to} style={{
                  padding: '0.4rem 0.7rem',
                  borderRadius: 5,
                  fontSize: '0.82rem',
                  fontWeight: active ? 600 : 400,
                  color: active ? 'var(--blue)' : 'var(--ink-muted)',
                  background: active ? 'var(--blue-dim)' : 'transparent',
                  transition: 'all 0.12s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--ink)' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--ink-muted)' }}>
                  {l.label}
                </Link>
              )
            })}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginLeft: 'auto' }}>
            <ThemeToggle />
            <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-green btn-sm desk-cta">
              💬 WhatsApp
            </a>
            <button className="mob-btn" onClick={() => setOpen(o => !o)}
              style={{ display: 'none', background: 'none', border: 'none', color: 'var(--ink)', fontSize: 20, padding: 4, lineHeight: 1, cursor: 'pointer' }}>
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div style={{
          position: 'fixed', top: 62, left: 0, right: 0, zIndex: 299,
          background: 'var(--bg)',
          borderBottom: '1px solid var(--rule)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        }}>
          <div className="wrap" style={{ padding: '1rem 2rem' }}>
            {LINKS.map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'flex', alignItems: 'center',
                padding: '0.7rem 0',
                borderBottom: '1px solid var(--rule)',
                fontSize: '0.95rem',
                fontWeight: pathname === l.to ? 600 : 400,
                color: pathname === l.to ? 'var(--blue)' : 'var(--ink)',
              }}>
                {l.label}
              </Link>
            ))}
            <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-green btn-full" style={{ marginTop: '1rem' }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desk-nav, .desk-cta, .nav-rule { display: none !important; }
          .mob-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}
