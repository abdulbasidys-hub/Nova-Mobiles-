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

function Logo() {
  const [ok, setOk] = useState(true)
  return (
    <Link to="/" style={{ display:'flex', alignItems:'center', gap:'.5rem', textDecoration:'none' }}>
      {ok
        ? <img src="/images/logo.png" alt="Nova Mobiles Plus" onError={() => setOk(false)}
            style={{ height:32, width:'auto', objectFit:'contain' }} />
        : <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.05rem', color:'var(--primary)', letterSpacing:'-.01em' }}>
            Nova Mobiles<span style={{ color:'var(--primary)' }}>+</span>
          </span>
      }
    </Link>
  )
}

export default function Navbar() {
  const [open,    setOpen]    = useState(false)
  const [scrolled,setScrolled]= useState(false)
  const { pathname }          = useLocation()
  const { theme, toggle }     = useTheme()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive:true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => setOpen(false), [pathname])

  const hStyle = {
    position: 'fixed', top:0, left:0, right:0, zIndex:500,
    height: 80,
    background: 'var(--glass-nav)',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    borderBottom: '1px solid var(--outline-var)',
    boxShadow: scrolled ? '0 1px 12px rgba(60,64,67,0.10)' : 'none',
    transition: 'box-shadow .2s',
  }

  return (
    <>
      <header style={hStyle}>
        <div className="W" style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'2rem' }}>

          <Logo />

          {/* Desktop nav */}
          <nav style={{ display:'flex', alignItems:'center', gap:'2rem', flex:1 }} className="desk-nav">
            {NAV.map(n => {
              const act = pathname === n.to || (n.to !== '/' && pathname.startsWith(n.to))
              return (
                <Link key={n.to} to={n.to} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '.875rem',
                  fontWeight: act ? 700 : 500,
                  color: act ? 'var(--primary)' : 'var(--on-surface-var)',
                  borderBottom: act ? '2px solid var(--primary)' : '2px solid transparent',
                  paddingBottom: '2px',
                  textDecoration: 'none',
                  transition: 'color .14s',
                }}
                onMouseEnter={e => { if (!act) e.currentTarget.style.color = 'var(--primary)' }}
                onMouseLeave={e => { if (!act) e.currentTarget.style.color = 'var(--on-surface-var)' }}>
                  {n.l}
                </Link>
              )
            })}
          </nav>

          {/* Right actions */}
          <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
            {/* Theme toggle */}
            <button onClick={toggle} style={{
              width:36, height:36, borderRadius:'50%',
              background:'var(--surface-low)',
              border:'none', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:16, transition:'background .14s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='var(--surface-mid)'}
            onMouseLeave={e => e.currentTarget.style.background='var(--surface-low)'}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Desktop WhatsApp */}
            <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')}
              target="_blank" rel="noopener noreferrer"
              style={{
                display:'flex', alignItems:'center', gap:'.4rem',
                background: 'var(--green-wa)', color:'#fff',
                padding:'.5rem 1.1rem', borderRadius:8,
                fontFamily:'var(--font-body)', fontWeight:600, fontSize:'.82rem',
                textDecoration:'none',
                transition:'transform .14s, box-shadow .14s',
              }}
              className="desk-cta"
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 4px 14px rgba(37,211,102,.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}>
              <span className="material-symbols-outlined" style={{ fontSize:16 }}>chat</span>
              WhatsApp
            </a>

            {/* Hamburger */}
            <button className="mob-btn" onClick={() => setOpen(o => !o)} style={{
              display:'none', background:'var(--surface-low)',
              border:'none', borderRadius:8,
              width:40, height:40,
              alignItems:'center', justifyContent:'center',
              fontSize:20, cursor:'pointer', color:'var(--on-surface)',
            }}>
              <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position:'fixed', top:80, left:0, right:0, zIndex:499,
          background:'var(--glass-nav)',
          backdropFilter:'blur(20px) saturate(180%)',
          WebkitBackdropFilter:'blur(20px) saturate(180%)',
          borderBottom:'1px solid var(--outline-var)',
          boxShadow:'0 8px 24px rgba(0,0,0,.08)',
        }}>
          <div className="W" style={{ padding:'.75rem 2.5rem 1.25rem' }}>
            {NAV.map(n => {
              const act = pathname === n.to || (n.to !== '/' && pathname.startsWith(n.to))
              return (
                <Link key={n.to} to={n.to} style={{
                  display:'block', padding:'.75rem 0',
                  borderBottom:'1px solid var(--outline-var)',
                  fontFamily:'var(--font-body)', fontWeight: act ? 700 : 500,
                  fontSize:'.95rem',
                  color: act ? 'var(--primary)' : 'var(--on-surface)',
                  textDecoration:'none',
                }}>
                  {n.l}
                </Link>
              )
            })}
            <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-wa btn-w btn-pill"
              style={{ marginTop:'1rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize:18, fill:1 }}>chat</span>
              WhatsApp Us
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .desk-nav,.desk-cta{ display:none!important }
          .mob-btn{ display:flex!important }
        }
      `}</style>
    </>
  )
}
