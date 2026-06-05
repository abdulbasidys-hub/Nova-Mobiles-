import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey:            "AIzaSyDuEeOBGHyI3yIyNmv-Uc-LbnsFPEsp-Ws",
  authDomain:        "nova-mobiles-plus.firebaseapp.com",
  projectId:         "nova-mobiles-plus",
  storageBucket:     "nova-mobiles-plus.appspot.com",
  messagingSenderId: "744016269592",
  appId:             "1:744016269592:web:82f45cce4fd6a93ff38e6d",
}

const app = initializeApp(firebaseConfig)

export const db   = getFirestore(app)
export const auth = getAuth(app)