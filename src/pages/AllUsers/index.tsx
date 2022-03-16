import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../config/firebase'

import { v4 as uuidV4 } from 'uuid'
import { AdminUserCard } from '../../components/AdminUserCard'

export function AllUsers () {
  const [users, setUsers] = useState<DocumentData[]>([])

  useEffect(() => {
    const docsRef = collection(db, 'users')
    const unsubscribe = onSnapshot(docsRef, docs => {
      setUsers([])
      docs.forEach(user =>
        setUsers(prevState => [...prevState, user.data()]))
    })
    return () => unsubscribe()
  }, [])

  return (
    <>
      {
        users.map(data => <AdminUserCard key={uuidV4()} data={data} />)
      }
    </>
  )
}
