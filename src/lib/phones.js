import { db } from './firebase'
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, query, where, orderBy, serverTimestamp, writeBatch, getDoc
} from 'firebase/firestore'

/* ── Demo data (shows instantly while Firebase loads) ── */
export const DEMO_PHONES = [
  { id:'demo-1', catalogId:'demo-cat-1', name:'Google Pixel 8 Pro', brand:'Google Pixel', condition:'Brand New', price:580000, images:[], storage:'256GB', color:'Obsidian', featured:true, available:true, slug:'google-pixel-8-pro', specs:{ display:'6.7" LTPO OLED 1-120Hz', processor:'Google Tensor G3', camera:'50MP Triple + 10.5MP front', battery:'5050mAh', charging:'30W wired / 23W wireless', os:'Android 14', connectivity:'5G, WiFi 7, BT 5.3, NFC', protection:'IP68' } },
  { id:'demo-2', catalogId:'demo-cat-2', name:'iPhone 15 Pro Max', brand:'iPhone', condition:'London Used', price:1100000, images:[], storage:'256GB', color:'Natural Titanium', featured:true, available:true, slug:'iphone-15-pro-max', specs:{ display:'6.7" Super Retina XDR 120Hz', processor:'A17 Pro', camera:'48MP Triple + 12MP front', battery:'4422mAh', charging:'27W wired / 15W MagSafe', os:'iOS 17', connectivity:'5G, WiFi 6E, BT 5.3, NFC', protection:'IP68' } },
  { id:'demo-3', catalogId:'demo-cat-3', name:'Samsung Galaxy S24 Ultra', brand:'Samsung', condition:'London Used', price:950000, images:[], storage:'512GB', color:'Titanium Black', featured:true, available:true, slug:'samsung-galaxy-s24-ultra', specs:{ display:'6.8" Dynamic AMOLED 1-120Hz', processor:'Snapdragon 8 Gen 3', camera:'200MP Quad + 12MP front', battery:'5000mAh', charging:'45W wired / 15W wireless', os:'Android 14 / One UI 6', connectivity:'5G, WiFi 7, BT 5.3, NFC', protection:'IP68' } },
]

export const DEMO_REVIEWS = [
  { id:'r1', name:'Ibrahim Musa',   rating:5, text:'Got my Pixel 8 Pro here, amazing service! Came with warranty and everything was genuine.' },
  { id:'r2', name:'Aisha Suleiman', rating:5, text:'Best phone shop in Kano. The London Used iPhone was in perfect condition.' },
  { id:'r3', name:'Emeka Okafor',   rating:5, text:'Ordered online and it was delivered to Lagos in 2 days. Very trustworthy.' },
]

/* ── Instant load pattern ───────────────────────── */
export function getAllPhonesInstant(onUpdate) {
  onUpdate(DEMO_PHONES)
  getDocs(query(collection(db,'phones'), orderBy('createdAt','desc')))
    .then(snap => { if (!snap.empty) onUpdate(snap.docs.map(d => ({id:d.id,...d.data()}))) })
    .catch(() => {})
}

export function getFeaturedPhonesInstant(onUpdate) {
  onUpdate(DEMO_PHONES.filter(p => p.featured))
  getDocs(query(collection(db,'phones'), where('featured','==',true), where('available','==',true)))
    .then(snap => { if (!snap.empty) onUpdate(snap.docs.map(d => ({id:d.id,...d.data()}))) })
    .catch(() => {})
}

export function getReviewsInstant(onUpdate) {
  onUpdate(DEMO_REVIEWS)
  getDocs(query(collection(db,'reviews'), where('approved','==',true)))
    .then(snap => { if (!snap.empty) onUpdate(snap.docs.map(d => ({id:d.id,...d.data()}))) })
    .catch(() => {})
}

/* ── Async versions (for Admin) ─────────────────── */
export async function getAllPhones() {
  try {
    const snap = await getDocs(query(collection(db,'phones'), orderBy('createdAt','desc')))
    if (snap.empty) return DEMO_PHONES
    return snap.docs.map(d => ({id:d.id,...d.data()}))
  } catch { return DEMO_PHONES }
}

export async function getPhoneBySlug(slug) {
  const demo = DEMO_PHONES.find(p => p.slug === slug)
  try {
    const snap = await getDocs(query(collection(db,'phones'), where('slug','==',slug)))
    if (snap.empty) return demo || null
    return {id:snap.docs[0].id,...snap.docs[0].data()}
  } catch { return demo || null }
}

export async function getReviews() {
  try {
    const snap = await getDocs(query(collection(db,'reviews'), where('approved','==',true)))
    if (snap.empty) return DEMO_REVIEWS
    return snap.docs.map(d => ({id:d.id,...d.data()}))
  } catch { return DEMO_REVIEWS }
}

export async function addPhone(data) {
  return addDoc(collection(db,'phones'), {...data, createdAt:serverTimestamp()})
}
export async function updatePhone(id, data) {
  return updateDoc(doc(db,'phones',id), {...data, updatedAt:serverTimestamp()})
}
export async function deletePhone(id) {
  return deleteDoc(doc(db,'phones',id))
}

/* ── Catalog (master products) ──────────────────── */
export async function getAllCatalog() {
  try {
    const snap = await getDocs(query(collection(db,'catalog'), orderBy('brand'), orderBy('model')))
    return snap.docs.map(d => ({id:d.id,...d.data()}))
  } catch { return [] }
}

export async function getCatalogProduct(id) {
  try {
    const d = await getDoc(doc(db,'catalog',id))
    return d.exists() ? {id:d.id,...d.data()} : null
  } catch { return null }
}

export async function addCatalogProduct(data) {
  return addDoc(collection(db,'catalog'), {...data, createdAt:serverTimestamp()})
}

export async function updateCatalogProduct(id, data) {
  // Update the catalog doc
  await updateDoc(doc(db,'catalog',id), {...data, updatedAt:serverTimestamp()})
  // Propagate spec changes to all linked variants
  const specs = {
    display:data.display, processor:data.processor, camera:data.camera,
    battery:data.battery, charging:data.charging, os:data.os,
    connectivity:data.connectivity, protection:data.protection,
    dimensions:data.dimensions, weight:data.weight,
  }
  const varSnap = await getDocs(query(collection(db,'phones'), where('catalogId','==',id)))
  if (!varSnap.empty) {
    const batch = writeBatch(db)
    varSnap.docs.forEach(d => batch.update(d.ref, { specs, brand:data.brand, model:data.model, updatedAt:serverTimestamp() }))
    await batch.commit()
  }
}

export async function deleteCatalogProduct(id) {
  return deleteDoc(doc(db,'catalog',id))
}

export async function getVariantsByCatalogId(catalogId) {
  try {
    const snap = await getDocs(query(collection(db,'phones'), where('catalogId','==',catalogId)))
    return snap.docs.map(d => ({id:d.id,...d.data()}))
  } catch { return [] }
}

/* ── Color images (stored on catalog doc) ───────── */
export async function updateCatalogColorImages(catalogId, colorImages) {
  return updateDoc(doc(db,'catalog',catalogId), { colorImages, updatedAt:serverTimestamp() })
}

export async function getCatalogById(id) {
  try {
    const d = await getDoc(doc(db,'catalog',id))
    return d.exists() ? {id:d.id,...d.data()} : null
  } catch { return null }
}