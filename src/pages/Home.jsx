import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedPhonesInstant, getReviewsInstant } from '../lib/phones'
import { buildWhatsAppUrl } from '../lib/constants'
import ProductCard from '../components/ProductCard'

/* ── Auto-detect banner images (banner1.jpg, banner2.jpg, …) ─── */
function useBanners() {
  const [banners, setBanners] = useState([])
  useEffect(() => {
    const found = []
    const tryExt = (n, exts, ei, onFound, onStop) => {
      if (ei >= exts.length) { onStop(); return }
      const img = new Image()
      img.onload = () => onFound(`/images/Banners/banner${n}.${exts[ei]}`)
      img.onerror = () => tryExt(n, exts, ei + 1, onFound, onStop)
      img.src = `/images/Banners/banner${n}.${exts[ei]}`
    }
    const checkNext = (n) => {
      tryExt(n, ['jpg','jpeg','png','webp'], 0,
        (src) => { found.push(src); checkNext(n + 1) },
        ()    => { setBanners([...found]) }
      )
    }
    checkNext(1)
  }, [])
  return banners
}

/* ── Banner slideshow ──────────────────────────────────────────── */
function BannerSlideshow({ banners }) {
  const [idx, setIdx]     = useState(0)
  const [fade, setFade]   = useState(true)

  useEffect(() => {
    if (banners.length <= 1) return
    const t = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % banners.length)
        setFade(true)
      }, 350)
    }, 10000)
    return () => clearInterval(t)
  }, [banners])

  if (!banners.length) return (
    <div style={{ width:'100%', height:'100%', background:'var(--surface-low)', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <span className="material-symbols-outlined" style={{ fontSize:80, opacity:.12, color:'var(--primary)' }}>smartphone</span>
    </div>
  )

  return (
    <div style={{ position:'relative', width:'100%', height:'100%', borderRadius:20, overflow:'hidden', background:'#F1F3F4' }}>
      <img
        src={banners[idx]}
        alt={`Banner ${idx + 1}`}
        style={{
          width:'100%', height:'100%', objectFit:'contain',
          opacity: fade ? 1 : 0,
          transition: 'opacity .35s ease',
          display:'block',
        }}
      />
      {/* Dots */}
      {banners.length > 1 && (
        <div style={{ position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)', display:'flex', gap:6 }}>
          {banners.map((_, i) => (
            <button key={i} onClick={() => { setFade(false); setTimeout(() => { setIdx(i); setFade(true) }, 200) }}
              style={{ width: i===idx ? 20 : 7, height:7, borderRadius:99, border:'none', cursor:'pointer', background: i===idx ? '#fff' : 'rgba(255,255,255,.5)', transition:'all .3s', padding:0 }} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [reviews,  setReviews]  = useState([])
  const banners = useBanners()

  useEffect(() => {
    getFeaturedPhonesInstant(setFeatured)
    getReviewsInstant(setReviews)
  }, [])

  return (
    <div style={{ background:'var(--bg)' }} className="pt">
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes waPulse  { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.5)} 60%{box-shadow:0 0 0 12px rgba(37,211,102,0)} }
        @keyframes waBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        @keyframes cardIn   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        .wa-btn {
          animation: waBounce 2.2s ease-in-out infinite, waPulse 2.2s ease-in-out infinite;
        }
        .wa-btn:hover { animation: none; transform:translateY(-2px) scale(1.03); box-shadow:0 6px 24px rgba(37,211,102,.45)!important; }

        .trust-card { animation: cardIn .5s ease both; }
        .trust-card:hover { transform: translateY(-5px); box-shadow: 0 12px 28px rgba(0,0,0,.09)!important; }
      `}</style>

      {/* ══ HERO ════════════════════════════════════════ */}
      <section style={{ background:'var(--surface-low)', overflow:'hidden', padding:'4rem 0 5rem' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 2.5rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }} className="hero-g">

          {/* Left copy */}
          <div>
            <span style={{ display:'inline-block', padding:'.38rem 1rem', background:'var(--secondary-container)', color:'var(--on-secondary-fixed-variant)', borderRadius:999, fontSize:'.7rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:'1.5rem' }}>
              Kano's Google Pixel Destination
            </span>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(2.1rem,5vw,3.4rem)', lineHeight:1.08, letterSpacing:'-.025em', marginBottom:'1.25rem', animation:'fadeUp .5s ease both' }}>
              The Premier Home for{' '}
              <span style={{ color:'var(--primary)' }}>Google Pixel</span>{' '}
              in Kano
            </h1>
            <p style={{ color:'var(--on-surface-var)', fontSize:'1rem', lineHeight:1.72, maxWidth:460, marginBottom:'2rem', animation:'fadeUp .5s .08s ease both' }}>
              Genuine brand new and London Used smartphones at Farm Center. Clean Android, superior cameras, unmatched expertise.
            </p>
            <div style={{ display:'flex', gap:'.85rem', flexWrap:'wrap', animation:'fadeUp .5s .15s ease both' }}>
              <Link to="/shop" className="btn btn-blue btn-lg btn-pill">
                <span className="material-symbols-outlined" style={{ fontSize:18 }}>storefront</span>
                Shop
              </Link>
              <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')}
                target="_blank" rel="noopener noreferrer"
                className="wa-btn"
                style={{
                  display:'flex', alignItems:'center', gap:'.5rem',
                  background:'var(--green-wa)', color:'#fff',
                  padding:'.75rem 1.5rem', borderRadius:999,
                  fontFamily:'var(--font-body)', fontWeight:600, fontSize:'.95rem',
                  textDecoration:'none',
                  transition:'transform .15s, box-shadow .15s',
                }}>
                <span className="material-symbols-outlined" style={{ fontSize:18, fontVariationSettings:"'FILL' 1" }}>chat</span>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right: banner slideshow */}
          <div style={{ height:520 }}>
            <BannerSlideshow banners={banners} />
          </div>
        </div>
      </section>

      {/* ══ FEATURED INVENTORY — single swipeable line ═══ */}
      <section style={{ background:'var(--surface)', padding:'4rem 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ padding:'0 2.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.5rem', flexWrap:'wrap', gap:'.75rem' }}>
            <div>
              <div className="sec-tag">Just Arrived</div>
              <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(1.3rem,2.5vw,1.75rem)', letterSpacing:'-.02em' }}>Fresh Stock</h2>
            </div>
            <Link to="/shop" className="btn btn-ghost btn-sm">View All →</Link>
          </div>

          {/* Single horizontal swipe — no categories, no ghost card */}
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '1rem',
            padding: '0 2.5rem 1rem',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
          className="feat-scroll">
            {featured.length === 0
              ? [...Array(5)].map((_, i) => (
                  <div key={i} className="sk" style={{ width:180, height:280, flexShrink:0, borderRadius:16 }} />
                ))
              : featured.map((p, i) => (
                  <div key={p.id} style={{
                    width: 180, flexShrink:0,
                    scrollSnapAlign:'start',
                    animation:`cardIn .4s ${i*0.06}s ease both`,
                  }}>
                    <ProductCard phone={p} />
                  </div>
                ))
            }
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE NOVA ══════════════════════════════ */}
      <section style={{ background:'var(--surface-lowest)', padding:'5rem 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 2.5rem' }}>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(1.4rem,2.5vw,2rem)', marginBottom:'.75rem' }}>Why Nova Mobiles Plus?</h2>
            <div style={{ width:72, height:4, background:'var(--primary)', borderRadius:4, margin:'0 auto' }} />
          </div>
          <div className="g3">
            {[
              { icon:'verified_user', title:'Transparency',  desc:"No hidden defects. Every 'London Used' device undergoes a full diagnostic check before hitting the shelf.", delay:.05 },
              { icon:'terminal',      title:'Expertise',     desc:"We aren't just sellers — we are Pixel enthusiasts who provide post-purchase tech support and guidance.", delay:.12 },
              { icon:'workspace_premium', title:'Quality',   desc:"We source only the highest grade devices. Our London Used inventory looks and feels practically brand new.", delay:.19 },
            ].map(({ icon, title, desc, delay }) => (
              <div key={title}
                className="trust-card"
                style={{
                  display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',
                  padding:'2.25rem 1.75rem',
                  background:'var(--surface-low)',
                  borderRadius:20,
                  border:'1px solid rgba(193,198,214,.4)',
                  transition:'transform .25s cubic-bezier(0.34,1.56,0.64,1), box-shadow .25s',
                  animationDelay: `${delay}s`,
                  cursor:'default',
                }}>
                <div style={{ width:58, height:58, background:'var(--primary-fixed)', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.25rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize:28, color:'var(--primary)', fontVariationSettings:"'FILL' 1" }}>{icon}</span>
                </div>
                <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.05rem', marginBottom:'.6rem' }}>{title}</h3>
                <p style={{ color:'var(--on-surface-var)', fontSize:'.875rem', lineHeight:1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY PIXEL — dark section ══════════════════════ */}
      <section style={{ background:'var(--on-bg)', padding:'5rem 0', overflow:'hidden' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 2.5rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }} className="pixel-g">
          <div style={{ aspectRatio:'4/5', borderRadius:24, overflow:'hidden', boxShadow:'0 24px 40px rgba(0,0,0,.3)', background:'#1a1d22' }}>
            <img src="/images/pixel-hero.jpg"
              onError={e => e.target.style.display='none'}
              alt="Pixel camera" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
          <div>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(1.8rem,3.5vw,2.75rem)', color:'#fff', lineHeight:1.1, marginBottom:'2rem' }}>
              Why Choose <span style={{ color:'var(--primary-fixed-dim)' }}>Pixel?</span>
            </h2>
            {[
              { icon:'photo_camera', title:'The Smartest Camera',   desc:'Real Tone, Magic Eraser, Night Sight. Capture life as it really looks, even in low light.' },
              { icon:'security',     title:'Security at the Core',  desc:'Titan M2 chip keeps your data safe. 7 years of guaranteed security updates.' },
              { icon:'smart_toy',    title:'Google AI Integration', desc:'Gemini AI, live translate, call screening — features only available on Google hardware.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ display:'flex', gap:'1rem', marginBottom:'1.75rem' }}>
                <span className="material-symbols-outlined" style={{ color:'var(--primary-fixed-dim)', fontSize:22, flexShrink:0, marginTop:3 }}>{icon}</span>
                <div>
                  <h4 style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:'1rem', color:'#fff', marginBottom:'.3rem' }}>{title}</h4>
                  <p style={{ color:'var(--outline-var)', fontSize:'.875rem', lineHeight:1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ══════════════════════════════════════ */}
      <section style={{ background:'var(--surface)', padding:'4.5rem 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 2.5rem' }}>
          <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.5rem', marginBottom:'.35rem' }}>Trusted by the Kano Tech Community</h2>
            <p style={{ color:'var(--on-surface-var)', fontSize:'.875rem' }}>Real reviews from our customers at Farm Center.</p>
          </div>
          <div className="g3">
            {reviews.slice(0,3).map((r, i) => (
              <div key={r.id} style={{
                background:'var(--glass-bg)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)',
                border:'1px solid var(--outline-var)', borderRadius:16, padding:'1.75rem',
                boxShadow:'0 1px 3px rgba(60,64,67,.07)',
                transition:'box-shadow .2s',
                animation:`cardIn .45s ${i*.09}s ease both`,
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow='0 1px 3px rgba(60,64,67,.07)'}>
                <div style={{ display:'flex', gap:2, marginBottom:'1rem' }}>
                  {[...Array(r.rating||5)].map((_,j) => (
                    <span key={j} className="material-symbols-outlined" style={{ fontSize:17, color:'#F59E0B', fontVariationSettings:"'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p style={{ color:'var(--on-surface-var)', fontSize:'.875rem', fontStyle:'italic', lineHeight:1.7, marginBottom:'1.1rem' }}>"{r.text}"</p>
                <div style={{ display:'flex', alignItems:'center', gap:'.65rem' }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:'var(--secondary-fixed)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'.9rem', color:'var(--on-secondary-fixed)', flexShrink:0 }}>
                    {r.name?.[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight:600, fontSize:'.875rem' }}>{r.name}</p>
                    <p style={{ color:'var(--outline)', fontSize:'.72rem' }}>Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LOCATION BAND ════════════════════════════════ */}
      <section style={{ background:'var(--primary)', padding:'2rem 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 2.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1rem', color:'#fff', marginBottom:'.2rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize:17, marginRight:5, fontVariationSettings:"'FILL' 1" }}>location_on</span>
              No. 6 Lukoro B Farm Center, Kano
            </p>
            <p style={{ fontSize:'.82rem', color:'rgba(255,255,255,.8)' }}>Mon–Sat: 11am – 6pm</p>
          </div>
          <Link to="/contact" style={{ display:'flex', alignItems:'center', gap:'.4rem', background:'rgba(255,255,255,.18)', backdropFilter:'blur(8px)', color:'#fff', border:'1.5px solid rgba(255,255,255,.35)', padding:'.6rem 1.4rem', borderRadius:8, fontFamily:'var(--font-body)', fontWeight:600, fontSize:'.875rem', textDecoration:'none', transition:'background .14s' }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,.28)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,.18)'}>
            Get in Touch →
          </Link>
        </div>
      </section>

      <style>{`
        .feat-scroll::-webkit-scrollbar { display:none }
        @media(max-width:900px){ .hero-g,.pixel-g{ grid-template-columns:1fr!important } }
        @media(max-width:768px){ .feat-scroll{ padding: 0 1.25rem 1rem!important } }
      `}</style>
    </div>
  )
}