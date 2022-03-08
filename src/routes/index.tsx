import { useEffect, useState } from 'react'

// Firebase
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { firebaseConfig } from '../config/firebase'
import { initializeApp } from 'firebase/app'

// Routes
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../components/LoadingSpinner'

export const Routes = () => {
  const [loading, setloading] = useState(true)
  initializeApp(firebaseConfig)
  const auth = getAuth()
  const [user, setUser] = useState<User | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    setloading(true)
    const subscribe = onAuthStateChanged(auth, user => {
      setUser(user)
      setloading(false)
      user ? navigate('/dashboard') : navigate('/')
      console.log(auth.currentUser)
    })

    return subscribe
  }, [])

  return (
    loading
      ? (
        <LoadingSpinner />
        )
      : (
          user ? <AppRoutes /> : <AuthRoutes />
        )
  )
}
