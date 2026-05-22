import { useState, useEffect } from 'react'
import { getAllPhones, addPhone, updatePhone, deletePhone } from '../lib/phones'
import { formatPrice } from '../lib/constants'

const ADMIN_PASSWORD = 'nova2024admin'
const BRANDS = ['Google Pixel', 'Samsung', 'iPhone', 'Oppo', 'Other']
const CONDITIONS = ['Brand New', 'London Used', 'Nigerian Used']
const emptyForm = { name: '', brand: 'Google Pixel', condition: 'Brand New', price: '', storage: '', color: '', images: '', featured: false, available: true, slug: '', specs: { display: '', processor: '', camera: '', battery: '', ram: '' } }

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [phones, setPhones] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)

  const load = async () => { setLoading(true); const data = await getAllPhones(); setPhones(data); setLoading(false) }

  useEffect(() => { if (authed) load() }, [authed])

  const handleLogin = () => { if (pw === ADMIN_PASSWORD) setAuthed(true); else alert('Wrong password') }

  const handleSave = async () => {
    const data = { ...form, price: Number(form.price), images: form.images ? form.images.split(',').map(s => s.trim()) : [], slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }
    editId ? await updatePhone(editId, data) : await addPhone(data)
    setShowForm(false); setForm(emptyForm); setEditId(null); load()
  }

  const handleEdit = (phone) => {
    setForm({ ...phone, images: (phone.images || []).join(', '), specs: phone.specs || emptyForm.specs })
    setEditId(phone.id); setShowForm(true)
  }

  const handleDelete = async (id) => { if (confirm('Delete this phone?')) { await deletePhone(id); load() } }

  if (!authed) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ padding: '2.5rem', width: '100%', maxWidth: 360 }}>
        <h1 style={{ fontSize: '1.75rem', textAlign: 'center', marginBottom: '1.5rem' }}>Admin Login</h1>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Enter password" style={{ marginBottom: '1rem' }}
          onKeyDown={e => e.key === 'Enter' && handleLogin()} />
        <button onClick={handleLogin} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Login</button>
      </div>
    </div>
  )

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Admin Panel</h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => { setShowForm(true); setForm(emptyForm); setEditId(null) }} className="btn btn-primary">+ Add Phone</button>
          <button onClick={() => setAuthed(false)} className="btn btn-ghost">Logout</button>
        </div>
      </div>

      {showForm && (
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>{editId ? 'Edit Phone' : 'Add New Phone'}</h2>
          <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
            {[['name','Name *'], ['storage','Storage (e.g. 128GB)'], ['color','Color'], ['price','Price (₦)'], ['slug','Slug (leave blank to auto-generate)']].map(([key, lbl]) => (
              <div key={key}>
                <label>{lbl}</label>
                <input value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} />
              </div>
            ))}
            <div>
              <label>Brand</label>
              <select value={form.brand} onChange={e => setForm({...form, brand: e.target.value})}>
                {BRANDS.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label>Condition</label>
              <select value={form.condition} onChange={e => setForm({...form, condition: e.target.value})}>
                {CONDITIONS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label>Image URLs (comma-separated)</label>
              <input value={form.images} onChange={e => setForm({...form, images: e.target.value})} />
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', margin: 0 }}>
                <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} style={{ width: 'auto', accentColor: 'var(--blue)' }} /> Featured
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', margin: 0 }}>
                <input type="checkbox" checked={form.available} onChange={e => setForm({...form, available: e.target.checked})} style={{ width: 'auto', accentColor: 'var(--blue)' }} /> Available
              </label>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Specifications</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {['display','processor','camera','battery','ram'].map(k => (
              <div key={k} style={{ flex: '1 1 120px' }}>
                <label style={{ textTransform: 'capitalize' }}>{k}</label>
                <input value={form.specs?.[k] || ''} onChange={e => setForm({...form, specs: {...form.specs, [k]: e.target.value}})} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={handleSave} className="btn btn-green">✓ Save</button>
            <button onClick={() => { setShowForm(false); setForm(emptyForm); setEditId(null) }} className="btn btn-ghost">✕ Cancel</button>
          </div>
        </div>
      )}

      {loading
        ? <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
        : (
          <div className="card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
                  {['Phone', 'Brand', 'Condition', 'Price', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.875rem 1rem', color: 'var(--text-muted)', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {phones.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>{p.name}</td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--text-muted)' }}>{p.brand}</td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--text-muted)' }}>{p.condition}</td>
                    <td style={{ padding: '0.875rem 1rem' }}>{formatPrice(p.price)}</td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: 999, fontSize: '0.75rem', background: p.available ? 'rgba(22,163,74,0.2)' : 'rgba(239,68,68,0.2)', color: p.available ? '#4ade80' : '#f87171' }}>
                        {p.available ? 'Available' : 'Sold'}
                      </span>
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => handleEdit(p)} style={{ background: 'rgba(26,115,232,0.2)', border: 'none', color: 'var(--blue)', padding: '0.3rem 0.6rem', borderRadius: 6, cursor: 'pointer' }}>✏️</button>
                        <button onClick={() => handleDelete(p.id)} style={{ background: 'rgba(239,68,68,0.2)', border: 'none', color: '#f87171', padding: '0.3rem 0.6rem', borderRadius: 6, cursor: 'pointer' }}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  )
}
