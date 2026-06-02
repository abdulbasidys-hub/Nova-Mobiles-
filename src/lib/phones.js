import { db } from './firebase'
import {
  collection, getDocs, addDoc, updateDoc,
  deleteDoc, doc, query, where, orderBy, serverTimestamp
} from 'firebase/firestore'

export const DEMO_PHONES = [
  { id:'demo-1', name:'Google Pixel 8 Pro',       brand:'Google Pixel', condition:'Brand New',    price:580000,  images:[], storage:'256GB', color:'Obsidian',       featured:true,  available:true,  slug:'google-pixel-8-pro',       specs:{ display:'6.7" LTPO OLED',        processor:'Google Tensor G3',  camera:'50MP Triple',  battery:'5050mAh', ram:'12GB' } },
  { id:'demo-2', name:'iPhone 15 Pro Max',         brand:'iPhone',       condition:'London Used',  price:1100000, images:[], storage:'256GB', color:'Titanium',        featured:true,  available:true,  slug:'iphone-15-pro-max',        specs:{ display:'6.7" Super Retina XDR', processor:'A17 Pro',          camera:'48MP Triple',  battery:'4422mAh', ram:'8GB'  } },
  { id:'demo-3', name:'Samsung Galaxy S24 Ultra',  brand:'Samsung',      condition:'London Used',  price:950000,  images:[], storage:'512GB', color:'Titanium Black',  featured:true,  available:true,  slug:'samsung-s24-ultra',        specs:{ display:'6.8" Dynamic AMOLED',   processor:'Snapdragon 8 Gen 3',camera:'200MP Quad',   battery:'5000mAh', ram:'12GB' } },
  { id:'demo-4', name:'Google Pixel 7a',           brand:'Google Pixel', condition:'London Used',  price:280000,  images:[], storage:'128GB', color:'Charcoal',        featured:false, available:true,  slug:'google-pixel-7a',          specs:{ display:'6.1" OLED',             processor:'Google Tensor G2',  camera:'64MP Dual',    battery:'4385mAh', ram:'8GB'  } },
  { id:'demo-5', name:'iPhone 14',                 brand:'iPhone',       condition:'Nigerian Used',price:420000,  images:[], storage:'128GB', color:'Blue',            featured:false, available:true,  slug:'iphone-14',                specs:{ display:'6.1" Super Retina XDR', processor:'A15 Bionic',        camera:'12MP Dual',    battery:'3279mAh', ram:'6GB'  } },
  { id:'demo-6', name:'Oppo Reno 11 Pro',          brand:'Oppo',         condition:'Brand New',    price:320000,  images:[], storage:'256GB', color:'Rock Grey',       featured:false, available:true,  slug:'oppo-reno-11-pro',         specs:{ display:'6.74" AMOLED',          processor:'Dimensity 8200',    camera:'50MP Triple',  battery:'4600mAh', ram:'12GB' } },
]

export const DEMO_REVIEWS = [
  { id:'r1', name:'Ibrahim Musa',    rating:5, text:'Got my Pixel 8 Pro here, amazing service! Came with warranty and everything was genuine.' },
  { id:'r2', name:'Aisha Suleiman',  rating:5, text:'Best phone shop in Kano. The London Used iPhone was in perfect condition.' },
  { id:'r3', name:'Emeka Okafor',    rating:5, text:'Ordered online and it was delivered to Lagos in 2 days. Very trustworthy.' },
]

/* ─────────────────────────────────────────────────────
   INSTANT LOAD PATTERN
   • Returns demo phones immediately (zero wait)
   • Fires Firebase in background
   • Calls onUpdate(realData) when Firebase responds
   • If Firebase is empty or errors — demo stays, no flicker
──────────────────────────────────────────────────────── */
export function getAllPhonesInstant(onUpdate) {
  // Return demo data right away
  onUpdate(DEMO_PHONES)
  // Then try Firebase silently
  getDocs(query(collection(db, 'phones'), orderBy('createdAt', 'desc')))
    .then(snap => {
      if (!snap.empty) onUpdate(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    .catch(() => { /* keep demo data */ })
}

export function getFeaturedPhonesInstant(onUpdate) {
  onUpdate(DEMO_PHONES.filter(p => p.featured))
  getDocs(query(collection(db, 'phones'), where('featured','==',true), where('available','==',true)))
    .then(snap => {
      if (!snap.empty) onUpdate(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    .catch(() => {})
}

export function getReviewsInstant(onUpdate) {
  onUpdate(DEMO_REVIEWS)
  getDocs(query(collection(db, 'reviews'), where('approved','==',true)))
    .then(snap => {
      if (!snap.empty) onUpdate(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    .catch(() => {})
}

/* ─── Keep original async versions for Admin page ─── */
export async function getAllPhones() {
  try {
    const snap = await getDocs(query(collection(db, 'phones'), orderBy('createdAt', 'desc')))
    if (snap.empty) return DEMO_PHONES
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch { return DEMO_PHONES }
}

export async function getFeaturedPhones() {
  try {
    const snap = await getDocs(query(collection(db, 'phones'), where('featured','==',true), where('available','==',true)))
    if (snap.empty) return DEMO_PHONES.filter(p => p.featured)
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch { return DEMO_PHONES.filter(p => p.featured) }
}

export async function getPhoneBySlug(slug) {
  // Check demo first — instant for detail page
  const demo = DEMO_PHONES.find(p => p.slug === slug)
  try {
    const snap = await getDocs(query(collection(db, 'phones'), where('slug','==',slug)))
    if (snap.empty) return demo || null
    return { id: snap.docs[0].id, ...snap.docs[0].data() }
  } catch { return demo || null }
}

export async function getReviews() {
  try {
    const snap = await getDocs(query(collection(db, 'reviews'), where('approved','==',true)))
    if (snap.empty) return DEMO_REVIEWS
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch { return DEMO_REVIEWS }
}

export async function addPhone(data) {
  return addDoc(collection(db, 'phones'), { ...data, createdAt: serverTimestamp() })
}
export async function updatePhone(id, data) {
  return updateDoc(doc(db, 'phones', id), { ...data, updatedAt: serverTimestamp() })
}
export async function deletePhone(id) {
  return deleteDoc(doc(db, 'phones', id))
}