import { useEffect, useState } from 'react'

// Firebase
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { firebaseConfig } from '../config/firebase'
import { initializeApp } from 'firebase/app'

// Routes
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

// Components
import { Navbar } from '../components/Navbar'

export const Routes = () => {
  initializeApp(firebaseConfig)
  const auth = getAuth()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setloading] = useState(false)

  useEffect(() => {
    setloading(true)
    const subscribe = onAuthStateChanged(auth, user => {
      setUser(user)
      console.log(auth.currentUser)
      setloading(false)
    })

    return subscribe
  }, [])

  return (
    loading
      ? (
        <>
          <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
        )
      : (
          user
            ? (
            <>
              <Navbar />
              <AppRoutes />
            </>
              )
            : (
            <>
              <Navbar auth />
              <AuthRoutes />
            </>
              )
        )

  )
}
