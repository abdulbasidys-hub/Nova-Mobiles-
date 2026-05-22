import { useState } from 'react'
import { SITE, buildWhatsAppUrl } from '../lib/constants'
import WatermarkBackground from '../components/WatermarkBackground'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const handleSubmit = () => {
    if (!form.name || !form.message) return alert('Please fill in your name and message.')
    const msg = `Hi Nova Mobiles Plus!\n\nName: ${form.name}\nPhone: ${form.phone}\n\nMessage: ${form.message}`
    window.open(buildWhatsAppUrl(msg), '_blank')
  }

  return (
    <div className="page-top">

      {/* Header */}
      <div style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--rule)', background: 'var(--bg-off)', padding: '3rem 0' }}>
        <WatermarkBackground src="/images/logo.png" lightOpacity={0.03} darkOpacity={0.05} size="360px" align="right" />
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--blue)', display: 'block', marginBottom: '0.5rem' }}>Contact</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: '0.75rem' }}>
            Get in touch.
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', maxWidth: 420, lineHeight: 1.75 }}>
            WhatsApp is the fastest way to reach us. We reply within minutes during business hours.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>

        {/* WhatsApp hero */}
        <div style={{ borderBottom: '1px solid var(--rule)', paddingBottom: '2.5rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', padding: '1.75rem 2rem', border: '2px solid #25D366', borderRadius: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 44, height: 44, background: '#25D366', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="#fff" width="22" height="22">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', marginBottom: '0.15rem' }}>WhatsApp is the fastest way to reach us.</p>
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.8rem' }}>Usually replies in under 5 minutes · {SITE.hours}</p>
              </div>
            </div>
            <a href={buildWhatsAppUrl('Hi Nova Mobiles Plus!')} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '0.875rem', padding: '0.65rem 1.4rem', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', transition: 'transform 0.12s, background 0.12s', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.background = '#1da851' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';   e.currentTarget.style.background = '#25D366' }}>
              Open WhatsApp →
            </a>
          </div>
        </div>

        {/* Form + Info grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }} className="contact-grid">

          {/* Form */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-faint)' }}>Send a Message</span>
              <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label>Name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
              </div>
              <div>
                <label>Phone Number</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="e.g. 08012345678" />
              </div>
              <div>
                <label>Message *</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Which phone are you looking for? What's your budget?" />
              </div>
              <button onClick={handleSubmit} className="btn btn-green btn-full btn-lg">
                💬 Send via WhatsApp
              </button>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-faint)' }}>Find Us</span>
              <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { label: 'Address',           value: SITE.address,                      href: null },
                { label: 'Hours',             value: SITE.hours,                        href: null },
                { label: 'Email',             value: SITE.email,                        href: `mailto:${SITE.email}` },
                { label: 'WhatsApp Business', value: `+${SITE.whatsappBusiness}`,       href: buildWhatsAppUrl('Hi!') },
                { label: 'WhatsApp Personal', value: `+${SITE.whatsappPersonal}`,       href: `https://wa.me/${SITE.whatsappPersonal}` },
                { label: 'TikTok',            value: SITE.tiktok,                       href: `https://tiktok.com/${SITE.tiktok}` },
              ].map(({ label, value, href }, i, arr) => (
                <div key={label} style={{ display: 'flex', gap: '1.5rem', padding: '0.85rem 0', borderBottom: i < arr.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                  <span style={{ color: 'var(--ink-faint)', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', width: 130, flexShrink: 0, paddingTop: 2 }}>{label}</span>
                  {href
                    ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontSize: '0.875rem', fontWeight: 500, transition: 'opacity 0.12s' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>{value}</a>
                    : <span style={{ color: 'var(--ink-2)', fontSize: '0.875rem' }}>{value}</span>
                  }
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div style={{ height: 180, background: 'var(--bg-surface)', border: '1px solid var(--rule)', borderRadius: 6, marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', color: 'var(--ink-faint)' }}>
                <span style={{ fontSize: 28, display: 'block', marginBottom: 6 }}>📍</span>
                <p style={{ fontSize: '0.72rem', fontWeight: 600 }}>Map · No. 6 Lukoro B Farm Center, Kano</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }`}</style>
    </div>
  )
}
