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
  initializeApp(firebaseConfig)
  const auth = getAuth()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setloading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, user => {
      setloading(true)
      setUser(user)
      user ? navigate('/dashboard') : navigate('/')
      console.log(auth.currentUser)
      setloading(false)
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
