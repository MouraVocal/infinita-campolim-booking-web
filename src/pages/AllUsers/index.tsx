import { collection, DocumentData, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../config/firebase'

import { v4 as uuidV4 } from 'uuid'
import { AllInfoUserCard } from '../../components/AllInfoUserCard'

export function AllUsers () {
  const [users, setUsers] = useState<DocumentData[]>([])

  const getAllUsers = async () => {
    setUsers([])
    const docsRef = collection(db, 'users')
    const querySnapshot = await getDocs(docsRef)
    querySnapshot.forEach(user => setUsers(prevState => [...prevState, user.data()]))
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <>
      {
        users.map(data => <AllInfoUserCard key={uuidV4()} data={data} />)
      }
    </>
  )
}
