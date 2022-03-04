import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { AuthRoutes } from './auth.routes'
import { firebaseConfig } from '../config/firebase'
import { initializeApp } from 'firebase/app'
import { AppRoutes } from './app.routes'
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
