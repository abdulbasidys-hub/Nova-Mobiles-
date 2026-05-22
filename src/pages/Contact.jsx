import { useState } from 'react'
import { SITE, buildWhatsAppUrl } from '../lib/constants'
import WatermarkBackground from '../components/WatermarkBackground'
import SectionHeader from '../components/SectionHeader'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const handleSubmit = () => {
    if (!form.name || !form.message) return alert('Please fill in your name and message.')
    const msg = `Hi Nova Mobiles Plus!\n\nName: ${form.name}\nPhone: ${form.phone}\n\nMessage: ${form.message}`
    window.open(buildWhatsAppUrl(msg), '_blank')
  }

  return (
    <div className="page-pt">

      {/* ── HEADER ──────────────────────────────────────── */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '3rem 0 2.5rem' }}>
        <WatermarkBackground src="/images/logo.png" opacity={0.04} size="360px" position="right" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--blue)', display: 'block', marginBottom: '0.5rem' }}>Get in Touch</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: '0.6rem' }}>Contact Us</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 460, lineHeight: 1.7 }}>
            WhatsApp is the fastest way to reach us. We reply within minutes during business hours.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>

        {/* ── PRIMARY WHATSAPP CTA ────────────────────────── */}
        <div style={{ background: 'linear-gradient(135deg, #25d366, #1da851)', borderRadius: 12, padding: '2rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '1.3rem', marginBottom: '0.35rem' }}>WhatsApp is fastest.</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>Open now · Usually replies in under 5 minutes · {SITE.hours}</p>
          </div>
          <a href={buildWhatsAppUrl('Hi Nova Mobiles Plus!')} target="_blank" rel="noopener noreferrer"
            style={{ background: '#fff', color: '#1da851', fontWeight: 700, fontSize: '0.95rem', padding: '0.7rem 1.5rem', borderRadius: 8, display: 'inline-flex', alignItems: 'center', gap: 7, textDecoration: 'none', transition: 'transform 0.15s, box-shadow 0.15s', flexShrink: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';   e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)' }}>
            <svg viewBox="0 0 24 24" fill="#1da851" width="18" height="18">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Open WhatsApp
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }} className="contact-grid">
          {/* ── FORM ───────────────────────────────────────── */}
          <div>
            <SectionHeader label="Message Us" title="Send a message." subtitle="We'll reply on WhatsApp." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label>Your Name *</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Ibrahim Musa" />
              </div>
              <div>
                <label>Phone Number</label>
                <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="e.g. 08012345678" />
              </div>
              <div>
                <label>Message *</label>
                <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={4} placeholder="What phone are you looking for? What's your budget?" />
              </div>
              <button onClick={handleSubmit} className="btn btn-green btn-lg" style={{ justifyContent: 'center' }}>
                💬 Send via WhatsApp
              </button>
            </div>
          </div>

          {/* ── CONTACT INFO ───────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <SectionHeader label="Find Us" title="All the ways to reach us." />
            {[
              { icon: '📍', label: 'Address',              value: SITE.address, href: null },
              { icon: '🕐', label: 'Opening Hours',         value: SITE.hours,   href: null },
              { icon: '✉️', label: 'Email',                 value: SITE.email,   href: `mailto:${SITE.email}` },
              { icon: '💬', label: 'WhatsApp (Business)',   value: `+${SITE.whatsappBusiness}`, href: buildWhatsAppUrl('Hi Nova Mobiles Plus!') },
              { icon: '📞', label: 'WhatsApp (Personal)',   value: `+${SITE.whatsappPersonal}`, href: `https://wa.me/${SITE.whatsappPersonal}` },
              { icon: '🎵', label: 'TikTok',               value: SITE.tiktok,  href: `https://tiktok.com/${SITE.tiktok}` },
            ].map(({ icon, label, value, href }, i, arr) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
                padding: '1rem 1.25rem',
                background: i % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderBottom: i < arr.length - 1 ? 'none' : '1px solid var(--border)',
                borderRadius: i === 0 ? '10px 10px 0 0' : i === arr.length - 1 ? '0 0 10px 10px' : 0,
              }}>
                <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                <div>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{label}</p>
                  {href
                    ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--blue)', transition: 'opacity 0.15s' }}>{value}</a>
                    : <p style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-2)' }}>{value}</p>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
