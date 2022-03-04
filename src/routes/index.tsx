import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { AuthRoutes } from './auth.routes'
import { firebaseConfig } from '../config/firebase'
import { initializeApp } from 'firebase/app'
import { AppRoutes } from './app.routes'

export const Routes = () => {
  initializeApp(firebaseConfig)
  const auth = getAuth()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, user => setUser(user))

    return subscribe
  }, [])

  return (
    user ? <AppRoutes /> : <AuthRoutes />
  )
}
