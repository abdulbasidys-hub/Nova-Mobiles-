import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedPhonesInstant, getReviewsInstant } from '../lib/phones'
import { buildWhatsAppUrl } from '../lib/constants'
import ProductCard from '../components/ProductCard'

/* Peek carousel for a set of phones */
function PhoneCarousel({ phones }) {
  if (!phones.length) return (
    <div className="peek-slider">
      {[...Array(3)].map((_,i) => (
        <div key={i} className="sk" style={{ width:240, height:340, flexShrink:0 }} />
      ))}
    </div>
  )
  return (
    <div className="peek-slider" style={{ gap:'1rem', paddingBottom:8 }}>
      {phones.map(p => (
        <div key={p.id} style={{ width:240, flexShrink:0 }}>
          <ProductCard phone={p} />
        </div>
      ))}
      {/* Peek ghost card */}
      <div style={{ width:80, flexShrink:0, borderRadius:16, border:'1px solid var(--outline-var)', background:'var(--glass-bg)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', opacity:.4 }}>
        <span className="material-symbols-outlined" style={{ color:'var(--outline)', fontSize:28 }}>chevron_right</span>
      </div>
    </div>
  )
}

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [reviews,  setReviews]  = useState([])
  const [heroImg,  setHeroImg]  = useState(0)

  useEffect(() => {
    getFeaturedPhonesInstant(setFeatured)
    getReviewsInstant(setReviews)
  }, [])

  // Group featured by brand for sections
  const pixelPhones  = featured.filter(p => p.brand === 'Google Pixel')
  const iPhones      = featured.filter(p => p.brand === 'iPhone')
  const samsungPhones= featured.filter(p => p.brand === 'Samsung')
  const otherPhones  = featured.filter(p => !['Google Pixel','iPhone','Samsung'].includes(p.brand))

  // Hero phone images (screensaver)
  const heroPhones = featured.slice(0, 3)

  return (
    <div style={{ background:'var(--bg)' }} className="pt">

      {/* ══ HERO ═══════════════════════════════════════════ */}
      <section style={{ background:'var(--surface-low)', overflow:'hidden', paddingTop:'4rem', paddingBottom:'5rem' }}>
        <div className="W" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }} className2="hero-g">

          {/* Left: copy */}
          <div style={{ zIndex:1 }}>
            <span style={{
              display:'inline-block', padding:'.4rem 1rem',
              background:'var(--secondary-container)',
              color:'var(--on-secondary-fixed-variant)',
              borderRadius:999, fontSize:'.7rem', fontWeight:600,
              letterSpacing:'.1em', textTransform:'uppercase',
              marginBottom:'1.5rem',
              border:'1px solid rgba(255,255,255,.2)',
              backdropFilter:'blur(8px)',
            }}>
              Kano's Google Pixel Destination
            </span>
            <h1 style={{
              fontFamily:'var(--font-display)',
              fontWeight:700,
              fontSize:'clamp(2.2rem,5vw,3.5rem)',
              lineHeight:1.08, letterSpacing:'-.025em',
              color:'var(--on-bg)',
              marginBottom:'1.25rem',
            }}>
              The Premier Home for{' '}
              <span style={{ color:'var(--primary)' }}>Google Pixel</span>{' '}
              in Kano
            </h1>
            <p style={{ color:'var(--on-surface-var)', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem', maxWidth:480 }}>
              Genuine brand new and London Used smartphones at Farm Center. Clean Android, superior cameras, unmatched expertise.
            </p>
            <div style={{ display:'flex', gap:'.85rem', flexWrap:'wrap' }}>
              <Link to="/shop" className="btn btn-blue btn-lg btn-pill">
                <span className="material-symbols-outlined" style={{ fontSize:18 }}>storefront</span>
                Browse Stock
              </Link>
              <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display:'flex', alignItems:'center', gap:'.4rem',
                  background:'rgba(255,255,255,.65)', backdropFilter:'blur(8px)',
                  color:'var(--on-surface)', border:'1px solid var(--outline-var)',
                  padding:'.75rem 1.5rem', borderRadius:999,
                  fontFamily:'var(--font-body)', fontWeight:600, fontSize:'1rem',
                  textDecoration:'none', transition:'all .15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--surface-dim)' }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,.65)' }}>
                <span className="material-symbols-outlined" style={{ fontSize:18 }}>chat</span>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right: screensaver phone slider */}
          <div style={{ position:'relative', height:560, width:'100%' }}>
            <div style={{ position:'absolute', top:-80, right:-80, width:320, height:320, background:'rgba(173,199,255,.25)', borderRadius:'50%', filter:'blur(80px)', pointerEvents:'none' }} />
            <div style={{ position:'relative', width:'100%', height:'100%' }}>
              {/* Slot 1 */}
              {heroPhones[0]
                ? <div className="hero-slide">
                    <img src={`/images/phones/${heroPhones[0].slug}.jpg`}
                      onError={e => { if (heroPhones[0].images?.[0]) e.target.src = heroPhones[0].images[0] }}
                      alt={heroPhones[0].name}
                      style={{ width:'100%', height:'100%', objectFit:'contain', borderRadius:24 }} />
                  </div>
                : <div className="hero-slide" style={{ background:'var(--surface-mid)', borderRadius:24 }} />
              }
              {/* Slot 2 */}
              {heroPhones[1] && (
                <div className="hero-slide">
                  <img src={`/images/phones/${heroPhones[1].slug}.jpg`}
                    onError={e => { if (heroPhones[1].images?.[0]) e.target.src = heroPhones[1].images[0] }}
                    alt={heroPhones[1].name}
                    style={{ width:'100%', height:'100%', objectFit:'contain', borderRadius:24 }} />
                </div>
              )}
              {/* Slot 3 */}
              {heroPhones[2] && (
                <div className="hero-slide">
                  <img src={`/images/phones/${heroPhones[2].slug}.jpg`}
                    onError={e => { if (heroPhones[2].images?.[0]) e.target.src = heroPhones[2].images[0] }}
                    alt={heroPhones[2].name}
                    style={{ width:'100%', height:'100%', objectFit:'contain', borderRadius:24 }} />
                </div>
              )}
              {/* Fallback if no phones yet */}
              {heroPhones.length === 0 && (
                <div style={{ width:'100%', height:'100%', background:'var(--surface-mid)', borderRadius:24, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize:80, opacity:.15, color:'var(--primary)' }}>smartphone</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURED INVENTORY ══════════════════════════════ */}
      <section style={{ background:'var(--surface)', padding:'4rem 0' }}>
        <div className="W">
          <div style={{ marginBottom:'2.5rem' }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(1.4rem,2.5vw,1.75rem)', color:'var(--on-bg)', marginBottom:'.35rem' }}>Featured Inventory</h2>
            <p style={{ color:'var(--on-surface-var)', fontSize:'.9rem' }}>Hand-picked premium devices, organised by brand.</p>
          </div>

          {/* Google Pixel section */}
          {pixelPhones.length > 0 && (
            <div style={{ marginBottom:'2.75rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', borderLeft:'4px solid var(--primary)', paddingLeft:'1rem', marginBottom:'1.25rem' }}>
                <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem' }}>Google Pixel</h3>
                <Link to="/shop" style={{ color:'var(--primary)', fontSize:'.8rem', fontWeight:600, marginLeft:'auto', display:'flex', alignItems:'center', gap:'.2rem', textDecoration:'none' }}>
                  View all <span className="material-symbols-outlined" style={{ fontSize:14 }}>arrow_forward</span>
                </Link>
              </div>
              <PhoneCarousel phones={pixelPhones} />
            </div>
          )}

          {/* iPhone section */}
          {iPhones.length > 0 && (
            <div style={{ marginBottom:'2.75rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', borderLeft:'4px solid var(--outline-var)', paddingLeft:'1rem', marginBottom:'1.25rem' }}>
                <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem' }}>iPhone</h3>
                <Link to="/shop" style={{ color:'var(--primary)', fontSize:'.8rem', fontWeight:600, marginLeft:'auto', display:'flex', alignItems:'center', gap:'.2rem', textDecoration:'none' }}>
                  View all <span className="material-symbols-outlined" style={{ fontSize:14 }}>arrow_forward</span>
                </Link>
              </div>
              <PhoneCarousel phones={iPhones} />
            </div>
          )}

          {/* Samsung + others in same row if small */}
          {(samsungPhones.length > 0 || otherPhones.length > 0) && (
            <div style={{ marginBottom:'2.75rem' }}>
              {samsungPhones.length > 0 && (
                <>
                  <div style={{ display:'flex', alignItems:'center', gap:'1rem', borderLeft:'4px solid var(--outline-var)', paddingLeft:'1rem', marginBottom:'1.25rem' }}>
                    <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem' }}>Samsung</h3>
                  </div>
                  <PhoneCarousel phones={samsungPhones} />
                </>
              )}
            </div>
          )}

          {/* Fallback: show all if ungrouped */}
          {featured.length > 0 && pixelPhones.length === 0 && iPhones.length === 0 && (
            <div className="g4">
              {featured.map(p => (
                <div key={p.id} style={{ animation:'fadeUp .4s ease both' }}>
                  <ProductCard phone={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ WHY PIXEL ═══════════════════════════════════════ */}
      <section style={{ background:'var(--on-bg)', padding:'5rem 0', overflow:'hidden' }}>
        <div className="W" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }} className2="pixel-g">
          {/* Image */}
          <div style={{ position:'relative' }}>
            <div style={{ aspectRatio:'4/5', borderRadius:24, overflow:'hidden', boxShadow:'0 24px 40px rgba(0,0,0,.3)' }}>
              <img src="/images/pixel-hero.jpg"
                onError={e => { e.target.style.display='none'; e.target.parentNode.style.background='#1a1d22' }}
                alt="Pixel camera" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            </div>
          </div>
          {/* Text */}
          <div>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(1.8rem,3.5vw,2.75rem)', color:'#fff', lineHeight:1.1, marginBottom:'2rem' }}>
              Why Choose <span style={{ color:'var(--primary-fixed-dim)' }}>Pixel?</span>
            </h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
              {[
                { icon:'camera', title:'The Smartest Camera', desc:'Real Tone, Magic Eraser, Night Sight. Capture life as it really looks, even in low light.' },
                { icon:'security', title:'Security at the Core', desc:'The Titan M2 chip keeps your data safe. 7 years of guaranteed security updates.' },
                { icon:'smart_toy', title:'Google AI Integration', desc:'Gemini AI, live translate, call screening — exclusive features only on Google hardware.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ display:'flex', gap:'1rem' }}>
                  <span className="material-symbols-outlined" style={{ color:'var(--primary-fixed-dim)', fontSize:24, flexShrink:0, marginTop:2 }}>{icon}</span>
                  <div>
                    <h4 style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:'1.05rem', color:'#fff', marginBottom:'.35rem' }}>{title}</h4>
                    <p style={{ color:'var(--outline-var)', fontSize:'.875rem', lineHeight:1.65 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TRUST SECTION ════════════════════════════════════ */}
      <section style={{ background:'var(--surface-lowest)', padding:'5rem 0' }}>
        <div className="W">
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(1.4rem,2.5vw,2rem)', marginBottom:'.75rem' }}>Why Nova Mobiles Plus?</h2>
            <div style={{ width:80, height:4, background:'var(--primary)', borderRadius:4, margin:'0 auto' }} />
          </div>
          <div className="g3">
            {[
              { icon:'verified_user', title:'Transparency', desc:"No hidden defects. Every 'London Used' device undergoes a full diagnostic check before hitting the shelf.", fill:true },
              { icon:'terminal',      title:'Expertise',    desc:"We aren't just sellers — we are Pixel enthusiasts. We provide post-purchase tech support and software guidance.", fill:true },
              { icon:'workspace_premium', title:'Quality', desc:"We source only the highest grade devices. Our London Used inventory looks and feels practically brand new.", fill:true },
            ].map(({ icon, title, desc, fill }) => (
              <div key={title} style={{
                display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',
                padding:'2rem', background:'var(--glass-bg)',
                backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)',
                borderRadius:24, border:'1px solid rgba(193,198,214,.35)',
                transition:'border-color .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor='rgba(0,91,191,.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor='rgba(193,198,214,.35)'}>
                <div style={{ width:60, height:60, background:'var(--primary-fixed)', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.25rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize:28, color:'var(--primary)', fontVariationSettings:`'FILL' ${fill?1:0}` }}>{icon}</span>
                </div>
                <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.05rem', marginBottom:'.6rem' }}>{title}</h3>
                <p style={{ color:'var(--on-surface-var)', fontSize:'.875rem', lineHeight:1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ══════════════════════════════════════════ */}
      <section style={{ background:'var(--surface)', padding:'4rem 0' }}>
        <div className="W">
          <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.5rem', marginBottom:'.35rem' }}>Trusted by the Kano Tech Community</h2>
            <p style={{ color:'var(--on-surface-var)', fontSize:'.875rem' }}>Real reviews from our satisfied customers at Farm Center.</p>
          </div>
          <div className="g3">
            {reviews.slice(0,3).map(r => (
              <div key={r.id} style={{
                background:'var(--glass-bg)',
                backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)',
                border:'1px solid var(--outline-var)',
                borderRadius:16, padding:'1.75rem',
                boxShadow:'0 1px 3px rgba(60,64,67,.08)',
                transition:'box-shadow .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow='var(--shadow-md)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow='0 1px 3px rgba(60,64,67,.08)'}>
                <div style={{ display:'flex', gap:2, marginBottom:'1rem' }}>
                  {[...Array(r.rating||5)].map((_,i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontSize:18, color:'#F59E0B', fontVariationSettings:"'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p style={{ color:'var(--on-surface-var)', fontSize:'.875rem', fontStyle:'italic', lineHeight:1.7, marginBottom:'1.25rem' }}>"{r.text}"</p>
                <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
                  <div style={{ width:38, height:38, borderRadius:'50%', background:'var(--secondary-fixed)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'.9rem', color:'var(--on-secondary-fixed)', flexShrink:0 }}>
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

      {/* ══ LOCATION BAND ════════════════════════════════════ */}
      <section style={{ background:'var(--primary)', padding:'2rem 0' }}>
        <div className="W" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.05rem', color:'#fff', marginBottom:'.2rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize:18, marginRight:6 }}>location_on</span>
              No. 6 Lukoro B Farm Center, Kano
            </p>
            <p style={{ fontSize:'.82rem', color:'rgba(255,255,255,.8)' }}>Mon–Sat: 11am – 6pm</p>
          </div>
          <Link to="/contact" style={{
            background:'rgba(255,255,255,.18)', backdropFilter:'blur(8px)',
            color:'#fff', border:'1.5px solid rgba(255,255,255,.35)',
            padding:'.6rem 1.4rem', borderRadius:8,
            fontFamily:'var(--font-body)', fontWeight:600, fontSize:'.875rem',
            textDecoration:'none', transition:'background .14s',
          }}
          onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,.28)'}
          onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,.18)'}>
            Get Directions →
          </Link>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){ [className2="hero-g"]{grid-template-columns:1fr!important} [className2="pixel-g"]{grid-template-columns:1fr!important} }
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  )
}
