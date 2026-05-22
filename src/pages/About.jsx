import { buildWhatsAppUrl, SITE } from '../lib/constants'
import SectionHeader from '../components/SectionHeader'
import WatermarkBackground from '../components/WatermarkBackground'

export default function About() {
  return (
    <div className="page-pt">

      {/* ── HEADER ──────────────────────────────────────── */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '3rem 0 2.5rem' }}>
        <WatermarkBackground src="/images/logo.png" opacity={0.05} size="400px" position="right" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--blue)', display: 'block', marginBottom: '0.5rem' }}>Our Story</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: '0.6rem' }}>About Nova Mobiles Plus</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 520, lineHeight: 1.7 }}>
            Kano's most trusted smartphone destination — built on genuine products, honest service, and 10+ years of community trust.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '5rem' }}>

        {/* ── STATS ──────────────────────────────────────── */}
        <div className="grid-4" style={{ margin: '2.5rem 0' }}>
          {[
            { v: '10+',    l: 'Years in Business', i: '📈' },
            { v: '5,000+', l: 'Happy Customers',   i: '👥' },
            { v: '100%',   l: 'Genuine Phones',     i: '✅' },
            { v: 'Every',  l: 'Phone Warranted',    i: '🛡️' },
          ].map(({ v, l, i }) => (
            <div key={l} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: '0.5rem' }}>{i}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.02em', marginBottom: 4 }}>{v}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* ── STORY ──────────────────────────────────────── */}
        <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 14, padding: '2.5rem', marginBottom: '2rem' }}>
          <WatermarkBackground src="/images/logo.png" opacity={0.04} size="320px" position="right" />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 680 }}>
            <SectionHeader label="The Founder" title="Auwal Adam Muhammad" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {[
                'Nova Mobiles Plus was built with one mission: give people in Kano access to genuine, high-quality smartphones at fair prices — without the guesswork.',
                'Over a decade, we\'ve grown from a small stall in Farm Center to one of the most recognized phone shops in Kano. Our reputation is built on honesty, quality London Used devices, and deep expertise in Google Pixel — a brand we\'ve stocked before most people in Nigeria had heard of it.',
                'Every phone we sell is personally inspected. We don\'t sell fakes. We don\'t cut corners. That\'s the Nova promise — and it\'s what keeps customers coming back.'
              ].map((text, i) => (
                <p key={i} style={{ color: 'var(--text-2)', lineHeight: 1.8, fontSize: '0.95rem' }}>{text}</p>
              ))}
            </div>
          </div>
        </div>

        {/* ── VALUES ─────────────────────────────────────── */}
        <div className="grid-3" style={{ marginBottom: '2rem' }}>
          {[
            { icon: '🔍', title: 'Transparency',   desc: 'We tell you exactly what you\'re getting — condition, specs, warranty, and price. No hidden surprises.' },
            { icon: '🤝', title: 'Trust',          desc: 'Our customers refer friends and come back for their next phone. That repeat trust is our most important metric.' },
            { icon: '📚', title: 'Expertise',      desc: 'We know phones deeply — especially Pixel. Ask us anything; we\'ll give you a straight, honest answer.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10 }}>
              <div style={{ fontSize: 28, marginBottom: '0.75rem' }}>{icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.95rem' }}>{title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* ── LONDON USED EXPLAINER ───────────────────────── */}
        <div style={{ border: '1px solid var(--blue-border)', background: 'var(--blue-muted)', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: 22 }}>🇬🇧</span>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>What is "London Used"?</h2>
          </div>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.75, marginBottom: '1.25rem', fontSize: '0.9rem', maxWidth: 620 }}>
            London Used phones are pre-owned devices sourced directly from the UK and Europe — returned phones, trade-ins, and end-of-lease devices from reputable suppliers. They arrive with us in excellent condition, then we inspect and grade each one before sale.
          </p>
          <div className="grid-2" style={{ gap: '0.6rem' }}>
            {['Fully functional — tested before sale', 'Cosmetically clean (minor marks possible)', 'Dramatically cheaper than brand new', 'Come with our full warranty', 'Sourced from verified UK suppliers', 'Ideal for buyers who want flagship specs at mid-range prices'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: 'var(--text-2)', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--blue)', fontWeight: 700, marginTop: 2, flexShrink: 0 }}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── VISIT ──────────────────────────────────────── */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Visit Us in Kano</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 4, fontSize: '0.9rem' }}>{SITE.address}</p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{SITE.hours}</p>
          <a href={buildWhatsAppUrl('Hi Auwal! I want to visit Nova Mobiles Plus. Are you open?')}
            target="_blank" rel="noopener noreferrer" className="btn btn-green btn-lg">
            💬 WhatsApp Before Visiting
          </a>
        </div>
      </div>
    </div>
  )
}
