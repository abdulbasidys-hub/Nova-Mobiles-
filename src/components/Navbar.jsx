import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

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
    <Link to="/" style={{ display:'flex', alignItems:'center', gap:'.55rem', textDecoration:'none', flexShrink:0 }}>
      {ok && (
        <img
          src="/images/logo.png"
          alt="Nova Mobiles Plus logo"
          onError={() => setOk(false)}
          style={{ height:36, width:'auto', objectFit:'contain' }}
        />
      )}
      <span style={{
        fontFamily:'var(--font-display)',
        fontWeight: 700,
        fontSize: '1.05rem',
        color: 'var(--primary)',
        letterSpacing: '-.01em',
        whiteSpace: 'nowrap',
      }}>
        Nova Mobiles <span style={{ fontWeight:700 }}>Plus</span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname }            = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive:true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <header style={{
        position: 'fixed', top:0, left:0, right:0, zIndex:500,
        height: 72,
        background: 'var(--glass-nav)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderBottom: '1px solid var(--outline-var)',
        boxShadow: scrolled ? '0 1px 12px rgba(60,64,67,.10)' : 'none',
        transition: 'box-shadow .25s',
      }}>
        <div style={{
          maxWidth: 1280, margin:'0 auto', padding:'0 2.5rem',
          height:'100%', display:'flex', alignItems:'center', position:'relative',
        }}>
          {/* Logo — left */}
          <Logo />

          {/* Nav — centered absolutely */}
          <nav className="desk-nav" style={{
            position:'absolute', left:'50%', transform:'translateX(-50%)',
            display:'flex', alignItems:'center', gap:'.25rem',
          }}>
            {NAV.map(n => {
              const act = pathname === n.to || (n.to !== '/' && pathname.startsWith(n.to))
              return (
                <Link key={n.to} to={n.to} style={{
                  padding: '.4rem .85rem',
                  borderRadius: 999,
                  fontSize: '.875rem',
                  fontWeight: act ? 700 : 500,
                  color: act ? 'var(--primary)' : 'var(--on-surface-var)',
                  background: act ? 'var(--blue-tint)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'color .13s, background .13s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { if (!act) { e.currentTarget.style.color='var(--primary)'; e.currentTarget.style.background='var(--surface-low)' }}}
                onMouseLeave={e => { if (!act) { e.currentTarget.style.color='var(--on-surface-var)'; e.currentTarget.style.background='transparent' }}}>
                  {n.l}
                </Link>
              )
            })}
          </nav>

          {/* Hamburger — mobile only, pushed to right */}
          <button className="mob-btn" onClick={() => setOpen(o => !o)} style={{
            display:'none', marginLeft:'auto',
            background:'var(--surface-low)', border:'none', borderRadius:8,
            width:40, height:40, alignItems:'center', justifyContent:'center',
            fontSize:20, cursor:'pointer', color:'var(--on-surface)',
          }}>
            <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position:'fixed', top:72, left:0, right:0, zIndex:499,
          background:'var(--glass-nav)',
          backdropFilter:'blur(20px) saturate(180%)',
          WebkitBackdropFilter:'blur(20px) saturate(180%)',
          borderBottom:'1px solid var(--outline-var)',
          boxShadow:'0 8px 24px rgba(0,0,0,.08)',
        }}>
          <div style={{ maxWidth:1280, margin:'0 auto', padding:'.75rem 2.5rem 1.25rem' }}>
            {NAV.map(n => {
              const act = pathname === n.to || (n.to !== '/' && pathname.startsWith(n.to))
              return (
                <Link key={n.to} to={n.to} style={{
                  display:'block', padding:'.75rem 0',
                  borderBottom:'1px solid var(--outline-var)',
                  fontWeight: act ? 700 : 500, fontSize:'.95rem',
                  color: act ? 'var(--primary)' : 'var(--on-surface)',
                  textDecoration:'none',
                }}>
                  {n.l}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .desk-nav{ display:none!important }
          .mob-btn { display:flex!important }
        }
      `}</style>
    </>
  )
}
