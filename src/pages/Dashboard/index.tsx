import React, { useState, useEffect } from 'react'

// uuid
import { v4 as uuidv4 } from 'uuid'

// Firebase
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../config/firebase'
import { getDocs, collection, getFirestore, Firestore, DocumentData } from 'firebase/firestore'

// Components
import { UserCard } from '../../components/UserCard'

export const Dashboard: React.FC = () => {
  const app = initializeApp(firebaseConfig)
  const [schedules, setSchedules] = useState<DocumentData[]>([])

  const db = getFirestore(app)

  const querySnapshot = async (db: Firestore) => {
    const schedulesCol = collection(db, 'schedules')
    const citySnapshot = await getDocs(schedulesCol)
    const schedulesList = citySnapshot.docs.map(doc => doc.data())
    return schedulesList
  }

  useEffect(() => {
    querySnapshot(db)
      .then((items) => setSchedules(items))
  }, [])

  return (
    <>
      <UserCard />
      {
        schedules.map(item => (
          <>
            <p key={uuidv4()}>{item.local}</p>
            <p>{item.date}/{item.month}/{item.year}</p>
          </>
        ))
      }
    </>
  )
}
