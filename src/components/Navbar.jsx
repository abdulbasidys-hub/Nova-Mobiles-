import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { buildWhatsAppUrl } from '../lib/constants'
import { useTheme } from '../context/ThemeContext'

const NAV = [
  { to: '/',            l: 'Home' },
  { to: '/shop',        l: 'Shop' },
  { to: '/pixel-guide', l: 'Pixel Guide' },
  { to: '/about',       l: 'About' },
  { to: '/contact',     l: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 4)
    window.addEventListener('scroll', fn, { passive: true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400, height: 58,
        background: solid ? 'var(--bg)' : 'transparent',
        borderBottom: solid ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'background .18s, border-color .18s',
      }}>
        <div className="W" style={{ height: '100%', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, background: 'var(--blue)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📱</div>
            <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-.01em' }}>
              NOVA MOBILES<span style={{ color: 'var(--blue)' }}>+</span>
            </span>
          </Link>

          {/* Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '.15rem', flex: 1 }} className="desk-nav">
            {NAV.map(n => {
              const act = pathname === n.to || (n.to !== '/' && pathname.startsWith(n.to))
              return (
                <Link key={n.to} to={n.to} style={{
                  padding: '.38rem .7rem', borderRadius: 4, fontSize: '.82rem', fontWeight: act ? 700 : 500,
                  color: act ? 'var(--blue)' : 'var(--ink-3)',
                  background: act ? 'var(--blue-tint)' : 'transparent',
                  transition: 'all .12s',
                }}
                onMouseEnter={e => { if (!act) e.currentTarget.style.color = 'var(--ink)' }}
                onMouseLeave={e => { if (!act) e.currentTarget.style.color = 'var(--ink-3)' }}>
                  {n.l}
                </Link>
              )
            })}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginLeft: 'auto' }}>
            {/* Theme toggle */}
            <button onClick={toggle} style={{ width: 32, height: 32, borderRadius: 4, background: 'var(--bg-3)', border: '1px solid var(--line)', color: 'var(--ink-3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')} target="_blank" rel="noopener noreferrer" className="btn btn-green btn-sm desk-cta">💬 WhatsApp</a>
            <button className="mob-btn" onClick={() => setOpen(o => !o)} style={{ display: 'none', background: 'none', border: 'none', color: 'var(--ink)', fontSize: 20, padding: 4, cursor: 'pointer' }}>
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div style={{ position: 'fixed', top: 58, left: 0, right: 0, zIndex: 399, background: 'var(--bg)', borderBottom: '1px solid var(--line)', boxShadow: '0 8px 24px rgba(0,0,0,.15)' }}>
          <div className="W" style={{ padding: '.75rem 2rem 1.25rem' }}>
            {NAV.map(n => (
              <Link key={n.to} to={n.to} style={{ display: 'block', padding: '.65rem 0', borderBottom: '1px solid var(--line)', fontSize: '.95rem', fontWeight: pathname === n.to ? 700 : 400, color: pathname === n.to ? 'var(--blue)' : 'var(--ink)' }}>
                {n.l}
              </Link>
            ))}
            <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')} target="_blank" rel="noopener noreferrer" className="btn btn-green btn-w" style={{ marginTop: '.85rem' }}>💬 WhatsApp Us</a>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:768px){ .desk-nav,.desk-cta{display:none!important} .mob-btn{display:flex!important} }
      `}</style>
    </>
  )
}
