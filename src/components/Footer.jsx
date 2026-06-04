import { Link } from 'react-router-dom'
import { SITE } from '../lib/constants'

export default function Footer() {
  return (
    <footer style={{ background:'var(--surface-lowest)', borderTop:'1px solid var(--outline-var)', marginTop:'5rem' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'3.5rem 2.5rem 0' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1.5fr', gap:'2.5rem' }} className="ft-g">

          <div>
            <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.05rem', marginBottom:'.85rem' }}>Nova Mobiles Plus</p>
            <p style={{ color:'var(--on-secondary-container)', fontSize:'.875rem', lineHeight:1.7, maxWidth:240, marginBottom:'1.25rem' }}>
              Your premier authority for flagship mobile devices in Kano. Genuine products, expert support.
            </p>
          </div>

          <div>
            <p style={{ fontFamily:'var(--font-body)', fontWeight:700, fontSize:'.68rem', textTransform:'uppercase', letterSpacing:'.12em', color:'var(--primary)', marginBottom:'1rem' }}>Explore</p>
            {[['/', 'Home'], ['/shop', 'Shop'], ['/pixel-guide', 'Pixel Guide'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, l]) => (
              <Link key={to} to={to} style={{ display:'block', color:'var(--on-secondary-container)', fontSize:'.875rem', marginBottom:'.5rem', textDecoration:'none', transition:'color .12s' }}
                onMouseEnter={e => e.currentTarget.style.color='var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color='var(--on-secondary-container)'}>
                {l}
              </Link>
            ))}
          </div>

          <div>
            <p style={{ fontFamily:'var(--font-body)', fontWeight:700, fontSize:'.68rem', textTransform:'uppercase', letterSpacing:'.12em', color:'var(--primary)', marginBottom:'1rem' }}>Brands</p>
            {['Google Pixel', 'iPhone', 'Samsung', 'Oppo', 'Accessories'].map(b => (
              <p key={b} style={{ color:'var(--on-secondary-container)', fontSize:'.875rem', marginBottom:'.5rem' }}>{b}</p>
            ))}
          </div>

          <div>
            <p style={{ fontFamily:'var(--font-body)', fontWeight:700, fontSize:'.68rem', textTransform:'uppercase', letterSpacing:'.12em', color:'var(--primary)', marginBottom:'1rem' }}>Visit Us</p>
            <p style={{ color:'var(--on-secondary-container)', fontSize:'.875rem', lineHeight:1.75, marginBottom:'1rem' }}>{SITE.address}</p>
            <p style={{ color:'var(--on-secondary-container)', fontSize:'.875rem', marginBottom:'.4rem' }}>{SITE.hours}</p>
            <a href={`mailto:${SITE.email}`} style={{ color:'var(--primary)', fontSize:'.875rem', textDecoration:'none' }}>{SITE.email}</a>
          </div>
        </div>

        {/* Bottom strip — centered name only */}
        <div style={{ borderTop:'1px solid var(--outline-var)', marginTop:'2rem', padding:'1.25rem 0', textAlign:'center' }}>
          <p style={{ color:'var(--on-secondary-container)', fontSize:'.78rem' }}>2026 Nova Mobiles Plus</p>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){.ft-g{grid-template-columns:1fr 1fr!important;gap:2rem!important}}
        @media(max-width:480px){.ft-g{grid-template-columns:1fr!important}}
      `}</style>
    </footer>
  )
}
