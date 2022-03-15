import React, { useEffect, useState } from 'react'

// Firebase
import { collection, DocumentData, where, query, onSnapshot } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../../config/firebase'

// Unique Id
import { v4 as uuidv4 } from 'uuid'

// styles
import './styles.css'
import { ScheduleCard } from '../ScheduleCard'

export const UserSchedules: React.FC = () => {
  const auth = getAuth()

  const userId = auth.currentUser?.uid

  const [schedules, setSchedules] = useState<DocumentData[]>([])

  useEffect(() => {
    setSchedules([])
    const docsRef = collection(db, 'schedules')
    const q = query(docsRef, where('user', '==', userId))
    const unsubscribe = onSnapshot(q, schedulesSnapshot => {
      setSchedules([])
      schedulesSnapshot.forEach(doc => {
        setSchedules(prevState => [...prevState, { uid: doc.id, data: doc.data() }])
      })
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className='text-center'>
      <h4>Seus últimos agendamentos</h4>
      <div className='d-flex flex-column align-items-center'>
        {
          schedules.length
            ? (
                schedules.map(({ data, uid }) => (
                  data.initialHour < new Date().getHours() &&
                  data.month === new Date().getMonth() &&
                  data.year === new Date().getFullYear()
                    ? null
                    : <ScheduleCard data={data} uid={uid} key={uuidv4()} />
                ))
              )
            : (
              <div>Você ainda não tem agendamentos</div>
              )
        }
      </div>
    </div>
  )
}
