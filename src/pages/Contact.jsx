import { useState } from 'react'
import { SITE, buildWhatsAppUrl } from '../lib/constants'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const handleSubmit = () => {
    if (!form.name || !form.message) return alert('Please fill in your name and message.')
    const msg = `Hi Nova Mobiles Plus!\n\nName: ${form.name}\nPhone: ${form.phone}\n\nMessage: ${form.message}`
    window.open(buildWhatsAppUrl(msg), '_blank')
  }

  return (
    <div>
      <div className="page-header container">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-sub">Get in touch — we respond fast on WhatsApp.</p>
      </div>

      <div className="container" style={{ paddingBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          <div className="card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Send a Message</h2>
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
                <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={4} placeholder="Tell us what phone you're looking for, your budget, etc." />
              </div>
              <button onClick={handleSubmit} className="btn btn-green" style={{ justifyContent: 'center', padding: '0.875rem' }}>
                💬 Send via WhatsApp
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '📍', title: 'Visit Our Shop', value: SITE.address, href: null },
              { icon: '🕐', title: 'Opening Hours', value: SITE.hours, href: null },
              { icon: '✉️', title: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
              { icon: '💬', title: 'WhatsApp Business', value: `+${SITE.whatsappBusiness}`, href: buildWhatsAppUrl('Hi Nova Mobiles Plus!') },
              { icon: '📞', title: 'WhatsApp Personal', value: `+${SITE.whatsappPersonal}`, href: `https://wa.me/${SITE.whatsappPersonal}` },
            ].map(({ icon, title, value, href }) => (
              <div key={title} className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ fontSize: 24 }}>{icon}</span>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 4 }}>{title}</p>
                  {href
                    ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: 'var(--blue)' }}>{value}</a>
                    : <p style={{ fontWeight: 600 }}>{value}</p>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .container > div[style*="grid"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}
