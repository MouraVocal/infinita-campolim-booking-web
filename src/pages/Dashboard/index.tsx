import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, User, signOut } from 'firebase/auth'

import { firebaseConfig } from '../../config/firebase'

export const Dashboard: React.FC = () => {
  initializeApp(firebaseConfig)
  const auth = getAuth()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, user => setUser(user))

    return subscribe
  }, [])

  const handleSignOut = () => {
    signOut(auth)
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
