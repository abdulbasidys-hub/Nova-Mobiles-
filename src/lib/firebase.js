import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

const firebaseConfig = {
  apiKey:            "AIzaSyDuEeOBGHyI3yIyNmv-Uc-LbnsFPEsp-Ws",
  authDomain:        "nova-mobiles-plus.firebaseapp.com",
  projectId:         "nova-mobiles-plus",
  storageBucket:     "nova-mobiles-plus.appspot.com",
  messagingSenderId: "744016269592",
  appId:             "1:744016269592:web:82f45cce4fd6a93ff38e6d",
}

const app = initializeApp(firebaseConfig)

export const db      = getFirestore(app)
export const auth    = getAuth(app)
export const storage = getStorage(app)

/**
 * Upload a file to Firebase Storage.
 * @param {File}     file       — the File object from an input element
 * @param {string}   path       — storage path e.g. "catalog/pixel-8-pro/obsidian/photo1.jpg"
 * @param {Function} onProgress — called with 0-100 during upload
 * @returns {Promise<string>}   — resolves to the public download URL
 */
export function uploadImage(file, path, onProgress) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path)
    const task       = uploadBytesResumable(storageRef, file, { contentType: file.type })

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