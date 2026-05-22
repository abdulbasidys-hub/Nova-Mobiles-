import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { buildWhatsAppUrl } from '../lib/constants'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { to: '/',            label: 'Home' },
  { to: '/shop',        label: 'Shop' },
  { to: '/pixel-guide', label: 'Pixel Guide' },
  { to: '/about',       label: 'About' },
  { to: '/contact',     label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen]     = useState(false)
  const [solid, setSolid]   = useState(false)
  const { pathname }        = useLocation()

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 62,
        background: solid ? 'var(--bg-card)' : 'transparent',
        borderBottom: solid ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: solid ? 'blur(16px)' : 'none',
        transition: 'all 0.25s',
      }}>
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexShrink: 0 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 7,
              background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15,
            }}>📱</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
              Nova Mobiles<span style={{ color: 'var(--blue)' }}>+</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flex: 1 }} className="desk-nav">
            {NAV_LINKS.map(l => {
              const active = pathname === l.to || (l.to !== '/' && pathname.startsWith(l.to))
              return (
                <Link key={l.to} to={l.to} style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: 6,
                  fontSize: '0.875rem',
                  fontWeight: active ? 600 : 500,
                  color: active ? 'var(--blue)' : 'var(--text-muted)',
                  background: active ? 'var(--blue-muted)' : 'transparent',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--bg-elevated)' }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent' }}}>
                  {l.label}
                </Link>
              )
            })}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginLeft: 'auto' }}>
            <ThemeToggle />
            <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-green btn-sm desk-cta"
              style={{ gap: '0.35rem' }}>
              <span>💬</span> WhatsApp
            </a>
            <button className="mob-menu-btn" onClick={() => setOpen(o => !o)}
              style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text)', fontSize: 22, padding: 4, lineHeight: 1 }}>
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'fixed', top: 62, left: 0, right: 0, zIndex: 199,
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border)',
          padding: '1rem 0',
          boxShadow: 'var(--shadow-lg)',
        }}>
          <div className="container">
            {NAV_LINKS.map(l => {
              const active = pathname === l.to || (l.to !== '/' && pathname.startsWith(l.to))
              return (
                <Link key={l.to} to={l.to} style={{
                  display: 'flex', alignItems: 'center',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid var(--border)',
                  fontWeight: active ? 600 : 500,
                  color: active ? 'var(--blue)' : 'var(--text)',
                  fontSize: '0.95rem',
                }}>
                  {l.label}
                </Link>
              )
            })}
            <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-green"
              style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desk-nav  { display: none !important; }
          .desk-cta  { display: none !important; }
          .mob-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}
