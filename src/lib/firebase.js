import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

const firebaseConfig = {
  apiKey:            "AIzaSyDuEeOBGHyI3yIyNmv-Uc-LbnsFPEsp-Ws",
  authDomain:        "nova-mobiles-plus.firebaseapp.com",
  projectId:         "nova-mobiles-plus",
  storageBucket:     "nova-mobiles-plus.firebasestorage.app",
  messagingSenderId: "744016269592",
  appId:             "1:744016269592:web:82f45cce4fd6a93ff38e6d",
}

const app = initializeApp(firebaseConfig)

export const db   = getFirestore(app)
export const auth = getAuth(app)

// Firebase changed default bucket naming for newer projects.
// If uploads hang, go to Firebase Console → Storage and copy the bucket name
// (looks like: nova-mobiles-plus.appspot.com OR nova-mobiles-plus.firebasestorage.app)
// then paste it below.
export const storage = getStorage(app)

/**
 * Compress an image file using Canvas before uploading.
 * Reduces a 4MB phone photo to ~150-350KB with no visible quality loss.
 * @param {File}   file    — original File from input
 * @param {number} maxPx   — max width or height in pixels (default 1400)
 * @param {number} quality — JPEG quality 0-1 (default 0.82)
 * @returns {Promise<Blob>}
 */
export function compressImage(file, maxPx = 1400, quality = 0.82) {
  return new Promise((resolve) => {
    // GIF — skip compression entirely (canvas can't preserve animation)
    if (file.type === 'image/gif') { resolve(file); return }

    // Very small files — not worth compressing
    if (file.size < 80 * 1024) { resolve(file); return }

    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)
      const { width, height } = img
      const scale  = Math.min(1, maxPx / Math.max(width, height))
      const w      = Math.round(width  * scale)
      const h      = Math.round(height * scale)
      const canvas = document.createElement('canvas')
      canvas.width  = w
      canvas.height = h
      const ctx = canvas.getContext('2d')

      // For PNG with transparency — keep white background before JPEG conversion
      if (file.type === 'image/png') {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, w, h)
      }

      ctx.drawImage(img, 0, 0, w, h)

      // PNG stays PNG to preserve quality for logos/graphics; everything else → JPEG
      const outType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
      const outQuality = outType === 'image/jpeg' ? quality : undefined

      canvas.toBlob(
        blob => resolve(blob || file),
        outType,
        outQuality
      )
    }

    img.onerror = () => { URL.revokeObjectURL(url); resolve(file) }
    img.src = url
  })
}

/**
 * Compress then upload a file to Firebase Storage.
 * @param {File}     file       — the File object from an input element
 * @param {string}   path       — storage path e.g. "catalog/pixel-8-pro/obsidian/front.jpg"
 * @param {Function} onProgress — called with 0-100 during upload
 * @returns {Promise<string>}   — resolves to the public download URL
 */
export function uploadImage(file, path, onProgress) {
  return new Promise(async (resolve, reject) => {
    try {
      // Compress first — happens entirely in the browser, no network needed
      const compressed = await compressImage(file)

      const storageRef = ref(storage, path)
      // Always store as JPEG after compression
      const contentType = compressed.type || file.type || 'image/jpeg'
      const task = uploadBytesResumable(storageRef, compressed, { contentType })

      task.on(
        'state_changed',
        (snap) => {
          if (onProgress) onProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100))
        },
        reject,
        async () => {
          try {
            const url = await getDownloadURL(task.snapshot.ref)
            resolve(url)
          } catch (e) { reject(e) }
        }
      )
    } catch (e) { reject(e) }
  })
}

/**
 * Delete a file from Firebase Storage by its full download URL.
 */
export async function deleteImage(url) {
  try {
    const storageRef = ref(storage, url)
    await deleteObject(storageRef)
  } catch { /* ignore if already deleted */ }
}