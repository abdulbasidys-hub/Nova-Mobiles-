import { useState } from 'react'
import { SITE, buildWhatsAppUrl } from '../lib/constants'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const send = () => {
    if (!form.name || !form.message) return alert('Fill in your name and message.')
    window.open(buildWhatsAppUrl(`Hi Nova Mobiles Plus!\n\nName: ${form.name}\nPhone: ${form.phone}\n\nMessage: ${form.message}`), '_blank')
  }

  return (
    <div className="pt">

      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--line)', padding: '2.5rem 0', background: 'var(--bg-2)' }}>
        <div className="W">
          <div className="sec-tag">Contact</div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-.025em' }}>GET IN TOUCH</h1>
        </div>
      </div>

      <div className="W" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>

        {/* WhatsApp hero — top */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', padding: '1.5rem 1.75rem', border: '2px solid #25D366', borderRadius: 'var(--r)', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 42, height: 42, background: '#25D366', borderRadius: 'var(--r)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" fill="#fff" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1rem', marginBottom: '.2rem' }}>WhatsApp is the fastest way to reach us.</p>
              <p style={{ color: 'var(--ink-3)', fontSize: '.78rem' }}>Usually replies in under 5 minutes · {SITE.hours}</p>
            </div>
          </div>
          <a href={buildWhatsAppUrl('Hi Nova Mobiles Plus!')} target="_blank" rel="noopener noreferrer"
            className="btn" style={{ background: '#25D366', color: '#fff', fontWeight: 700, flexShrink: 0 }}>Open WhatsApp →</a>
        </div>

        {/* Two column */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'start' }} className="ct-g">

          {/* Left: info */}
          <div>
            <div className="sec-tag">Find Us</div>
            <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-.02em', marginBottom: '1.25rem' }}>All Contact Details</h2>
            <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--r)', overflow: 'hidden', marginBottom: '1.5rem' }}>
              {[
                { l: 'Address',           v: SITE.address,              href: null },
                { l: 'Hours',             v: SITE.hours,                href: null },
                { l: 'Email',             v: SITE.email,                href: `mailto:${SITE.email}` },
                { l: 'WhatsApp Business', v: `+${SITE.whatsappBusiness}`, href: buildWhatsAppUrl('Hi!') },
                { l: 'WhatsApp Personal', v: `+${SITE.whatsappPersonal}`, href: `https://wa.me/${SITE.whatsappPersonal}` },
                { l: 'TikTok',            v: SITE.tiktok,              href: `https://tiktok.com/${SITE.tiktok}` },
              ].map(({ l, v, href }, i, arr) => (
                <div key={l} style={{ display: 'flex', gap: '1.25rem', padding: '.7rem 1rem', borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none', background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-2)' }}>
                  <span style={{ color: 'var(--ink-4)', fontSize: '.63rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', width: 120, flexShrink: 0, paddingTop: 2 }}>{l}</span>
                  {href ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontSize: '.875rem', fontWeight: 500 }}>{v}</a>
                         : <span style={{ color: 'var(--ink-2)', fontSize: '.875rem' }}>{v}</span>}
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div style={{ height: 180, background: 'var(--bg-3)', border: '1px solid var(--line)', borderRadius: 'var(--r)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', color: 'var(--ink-4)' }}>
                <span style={{ fontSize: 26, display: 'block', marginBottom: 4 }}>📍</span>
                <p style={{ fontSize: '.7rem', fontWeight: 700 }}>Map · No. 6 Lukoro B Farm Center, Kano</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <div className="sec-tag">Message Us</div>
            <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-.02em', marginBottom: '1.25rem' }}>Send a Message</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div><label>Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" /></div>
              <div><label>Phone Number</label><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="e.g. 08012345678" /></div>
              <div><label>Message *</label><textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Which phone are you looking for? What's your budget?" /></div>
              <button onClick={send} className="btn btn-green btn-w btn-lg">💬 Send via WhatsApp</button>
            </div>

            {/* WhatsApp CTA repeat at bottom */}
            <div style={{ marginTop: '1.5rem', padding: '1.1rem', background: 'var(--blue-tint)', border: '1.5px solid var(--blue-ring)', borderRadius: 'var(--r)', textAlign: 'center' }}>
              <p style={{ fontWeight: 700, fontSize: '.875rem', color: 'var(--ink)', marginBottom: '.35rem' }}>Prefer to message directly?</p>
              <a href={buildWhatsAppUrl('Hi! I want to buy a phone from Nova Mobiles Plus.')} target="_blank" rel="noopener noreferrer" className="btn btn-outline-blue btn-sm">💬 Open WhatsApp</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.ct-g{grid-template-columns:1fr!important;gap:2.5rem!important}}`}</style>
    </div>
  )
}
