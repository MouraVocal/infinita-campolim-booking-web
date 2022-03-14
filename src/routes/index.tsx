import { useEffect, useState } from 'react'

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db, firebaseConfig } from '../config/firebase'
import { initializeApp } from 'firebase/app'

// Routes
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const Routes = () => {
  const [loading, setloading] = useState(true)
  initializeApp(firebaseConfig)
  const auth = getAuth()
  const [ok, setOk] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setloading(true)
      async function verifyUser () {
        if (user) {
          const docRef = (doc(db, 'users', user.uid))
          const docSnap = await getDoc(docRef)
          if (!docSnap.exists()) {
            setDoc(doc(db, 'users', user.uid), {
              name: user.displayName,
              apt: '',
              tower: '',
              tel: user.phoneNumber,
              email: user.email,
              photo: user.photoURL,
              isAdmin: false,
              isBlocked: false,
              uid: user.uid
            })
              .then(() => {
                setOk(true)
                setloading(false)
              })
          }
          setOk(true)
          setloading(false)
        } else {
          setOk(false)
          setloading(false)
        }
      }

      verifyUser()
    })
  }, [])

  return (
    loading
      ? (
        <LoadingSpinner />
        )
      : (
          ok ? <AppRoutes /> : <AuthRoutes />
        )
  )
}
