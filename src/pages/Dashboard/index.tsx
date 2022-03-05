import { useState, useEffect } from 'react'

// Firebase
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, User, signOut } from 'firebase/auth'
import { firebaseConfig } from '../../config/firebase'

// Routes
import { useNavigate } from 'react-router-dom'

export const Dashboard: React.FC = () => {
  initializeApp(firebaseConfig)
  const auth = getAuth()
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, user => setUser(user))
    return subscribe
  }, [])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate('/'))
      .catch(error => console.log(error)
      )
  }

  return (
    <>
      <div>{user?.email}</div>
      <button className='btn btn-danger' onClick={handleSignOut}>Deslogar</button>
    </>
  )
}
