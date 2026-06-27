import { db } from './firebase'
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, query, where, orderBy, serverTimestamp, writeBatch, getDoc
} from 'firebase/firestore'

/* ── Demo data removed — real inventory only ──── */
export const DEMO_PHONES  = []
export const DEMO_REVIEWS = []

/* ── Instant load (shows empty then fills from Firebase) ── */
export function getAllPhonesInstant(onUpdate) {
  onUpdate([])
  getDocs(query(collection(db,'phones'), orderBy('createdAt','desc')))
    .then(snap => onUpdate(snap.docs.map(d => ({id:d.id,...d.data()}))))
    .catch(() => {})
}

export function getFeaturedPhonesInstant(onUpdate) {
  onUpdate([])
  getDocs(query(collection(db,'phones'), where('available','==',true), orderBy('createdAt','desc')))
    .then(snap => {
      const all = snap.docs.map(d => ({id:d.id,...d.data()}))
      const now         = Date.now()
      const oneWeekAgo  = now - 7 * 24 * 60 * 60 * 1000

      // Phones added in the last 7 days
      const fresh = all.filter(p => {
        const ts = p.createdAt?.seconds ? p.createdAt.seconds * 1000 : (p.createdAt || 0)
        return ts > oneWeekAgo
      })

      if (fresh.length > 0) { onUpdate(fresh); return }

      // No new phones — show best (most expensive) from each brand
      const brands = [...new Set(all.map(p => p.brand))]
      const BRAND_ORDER = ['Google Pixel','iPhone','Huawei','Honor','Oppo','Moto G','Samsung']
      const ordered = [...BRAND_ORDER.filter(b=>brands.includes(b)), ...brands.filter(b=>!BRAND_ORDER.includes(b))]
      const best = ordered.map(brand =>
        all.filter(p=>p.brand===brand).sort((a,b)=>b.price-a.price)[0]
      ).filter(Boolean)

      onUpdate(best.length > 0 ? best : all.slice(0,6))
    })
    .catch(() => {})
}

export function getReviewsInstant(onUpdate) {
  onUpdate([])
  getDocs(query(collection(db,'reviews'), where('approved','==',true)))
    .then(snap => { if (!snap.empty) onUpdate(snap.docs.map(d => ({id:d.id,...d.data()}))) })
    .catch(() => {})
}

/* ── Async versions (Admin) ─────────────────────── */
export async function getAllPhones() {
  const snap = await getDocs(query(collection(db,'phones'), orderBy('createdAt','desc')))
  return snap.docs.map(d => ({id:d.id,...d.data()}))
}

export async function getPhoneBySlug(slug) {
  try {
    const snap = await getDocs(query(collection(db,'phones'), where('slug','==',slug)))
    return snap.empty ? null : {id:snap.docs[0].id,...snap.docs[0].data()}
  } catch { return null }
}

export async function getReviews() {
  try {
    const snap = await getDocs(query(collection(db,'reviews'), where('approved','==',true)))
    return snap.docs.map(d => ({id:d.id,...d.data()}))
  } catch { return [] }
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

/* ── Catalog ─────────────────────────────────────── */
export async function getAllCatalog() {
  const snap = await getDocs(collection(db,'catalog'))
  const docs = snap.docs.map(d => ({id:d.id,...d.data()}))
  const BORDER = ['Google Pixel','iPhone','Huawei','Honor','Oppo','Moto G','Samsung']
  const getNum = name => { const n = (name||'').match(/\d+/g); return n ? Math.max(...n.map(Number)) : 0 }
  return docs.sort((a,b) => {
    const bi = BORDER.indexOf(a.brand), bj = BORDER.indexOf(b.brand)
    const brandDiff = (bi===-1?99:bi) - (bj===-1?99:bj)
    if (brandDiff !== 0) return brandDiff
    return getNum(b.model) - getNum(a.model) || (a.model||'').localeCompare(b.model||'')
  })
}

export async function getCatalogById(id) {
  try {
    const d = await getDoc(doc(db,'catalog',id))
    return d.exists() ? {id:d.id,...d.data()} : null
  } catch { return null }
}

export async function addCatalogProduct(data) {
  return addDoc(collection(db,'catalog'), {...data, createdAt:serverTimestamp()})
}

export async function updateCatalogProduct(id, data) {
  await updateDoc(doc(db,'catalog',id), {...data, updatedAt:serverTimestamp()})
  // Propagate spec changes to all linked variants
  const specs = {
    display:data.display, processor:data.processor, camera:data.camera,
    frontCamera:data.frontCamera, battery:data.battery, charging:data.charging,
    os:data.os, connectivity:data.connectivity, protection:data.protection,
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

export async function updateCatalogColorImages(catalogId, colorImages) {
  return updateDoc(doc(db,'catalog',catalogId), { colorImages, updatedAt:serverTimestamp() })
}

export async function getVariantsByCatalogId(catalogId) {
  try {
    const snap = await getDocs(query(collection(db,'phones'), where('catalogId','==',catalogId)))
    return snap.docs.map(d => ({id:d.id,...d.data()}))
  } catch { return [] }
}

/* ── Banners ─────────────────────────────────────── */
export async function getBanners() {
  try {
    const snap = await getDocs(query(collection(db,'banners'), orderBy('createdAt','asc')))
    return snap.docs.map(d => ({id:d.id,...d.data()}))
  } catch { return [] }
}

export function getBannersInstant(onUpdate) {
  onUpdate([])
  getDocs(query(collection(db,'banners'), orderBy('createdAt','asc')))
    .then(snap => { if (!snap.empty) onUpdate(snap.docs.map(d => ({id:d.id,...d.data()}))) })
    .catch(() => {})
}

export async function addBanner(url) {
  return addDoc(collection(db,'banners'), { url, createdAt: serverTimestamp() })
}

export async function deleteBanner(id) {
  return deleteDoc(doc(db,'banners',id))
}

/* ── Accessories ────────────────────────────────── */
export async function getAccessoriesByCatalog(catalogId) {
  try {
    const snap = await getDocs(query(collection(db,'accessories'), where('catalogId','==',catalogId)))
    return snap.docs.map(d => ({id:d.id,...d.data()}))
  } catch { return [] }
}

export async function addAccessory(data) {
  return addDoc(collection(db,'accessories'), {...data, createdAt:serverTimestamp()})
}

export async function updateAccessory(id, data) {
  return updateDoc(doc(db,'accessories',id), {...data, updatedAt:serverTimestamp()})
}

export async function deleteAccessory(id) {
  return deleteDoc(doc(db,'accessories',id))
}