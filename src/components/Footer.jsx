import { Link } from 'react-router-dom'
import { SITE } from '../lib/constants'

export default function Footer() {
  return (
    <footer style={{ background:'var(--surface-lowest)', borderTop:'1px solid var(--outline-var)', marginTop:'5rem' }}>
      <div className="W" style={{ padding:'4rem 2.5rem 1.5rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1.5fr', gap:'2.5rem' }} className="ft-g">

          <div>
            <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.05rem', color:'var(--on-surface)', marginBottom:'.85rem' }}>Nova Mobiles Plus</p>
            <p style={{ color:'var(--on-secondary-container)', fontSize:'.875rem', lineHeight:1.7, maxWidth:240, marginBottom:'1.25rem' }}>
              Your premier authority for flagship mobile devices in Kano. Genuine products, expert support.
            </p>
            <div style={{ display:'flex', gap:'.65rem' }}>
              <a href={`https://tiktok.com/${SITE.tiktok}`} target="_blank" rel="noopener noreferrer"
                style={{ width:38, height:38, borderRadius:'50%', background:'var(--surface-mid)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--primary)', transition:'background .14s', textDecoration:'none' }}
                onMouseEnter={e => e.currentTarget.style.background='var(--primary-fixed)'}
                onMouseLeave={e => e.currentTarget.style.background='var(--surface-mid)'}>
                <span className="material-symbols-outlined" style={{ fontSize:18 }}>photo_camera</span>
              </a>
              <a href={`mailto:${SITE.email}`}
                style={{ width:38, height:38, borderRadius:'50%', background:'var(--surface-mid)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--primary)', transition:'background .14s', textDecoration:'none' }}
                onMouseEnter={e => e.currentTarget.style.background='var(--primary-fixed)'}
                onMouseLeave={e => e.currentTarget.style.background='var(--surface-mid)'}>
                <span className="material-symbols-outlined" style={{ fontSize:18 }}>mail</span>
              </a>
            </div>
          </div>

          <div>
            <p style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'.7rem', textTransform:'uppercase', letterSpacing:'.12em', color:'var(--primary)', marginBottom:'1rem' }}>Explore</p>
            {[['/', 'Home'], ['/shop', 'Shop'], ['/pixel-guide', 'Pixel Guide'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, l]) => (
              <Link key={to} to={to} style={{ display:'block', color:'var(--on-secondary-container)', fontSize:'.875rem', marginBottom:'.55rem', transition:'color .12s', textDecoration:'none' }}
                onMouseEnter={e => e.currentTarget.style.color='var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color='var(--on-secondary-container)'}>
                {l}
              </Link>
            ))}
          </div>

          <div>
            <p style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'.7rem', textTransform:'uppercase', letterSpacing:'.12em', color:'var(--primary)', marginBottom:'1rem' }}>Service</p>
            {['Google Pixel', 'iPhone', 'Samsung', 'Oppo', 'Accessories'].map(b => (
              <p key={b} style={{ color:'var(--on-secondary-container)', fontSize:'.875rem', marginBottom:'.55rem' }}>{b}</p>
            ))}
          </div>

          <div>
            <p style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'.7rem', textTransform:'uppercase', letterSpacing:'.12em', color:'var(--primary)', marginBottom:'1rem' }}>Visit Our Store</p>
            <p style={{ color:'var(--on-secondary-container)', fontSize:'.875rem', lineHeight:1.75, marginBottom:'1rem' }}>
              {SITE.address}<br />Nigeria.
            </p>
            <p style={{ color:'var(--on-secondary-container)', fontSize:'.875rem', marginBottom:'.4rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize:15, marginRight:4 }}>schedule</span>
              {SITE.hours}
            </p>
            <a href={`mailto:${SITE.email}`} style={{ color:'var(--primary)', fontSize:'.875rem', textDecoration:'none' }}>{SITE.email}</a>
          </div>
        </div>

        <div style={{ borderTop:'1px solid var(--outline-var)', marginTop:'2.5rem', paddingTop:'1.25rem', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'.5rem' }}>
          <p style={{ color:'var(--on-secondary-container)', fontSize:'.75rem' }}>© 2025 Nova Mobiles Plus Kano. Premier Pixel Authority.</p>
          <p style={{ color:'var(--outline)', fontSize:'.75rem' }}>Designed with precision for the tech-forward.</p>
        </div>
      </div>
      <style>{`@media(max-width:768px){.ft-g{grid-template-columns:1fr 1fr!important;gap:2rem!important}}@media(max-width:480px){.ft-g{grid-template-columns:1fr!important}}`}</style>
    </footer>
  )
}
