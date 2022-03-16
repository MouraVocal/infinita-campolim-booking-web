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

  const numberActualHour = Number(new Date().getHours())
  const numberActualDate = Number(new Date().getDate())
  const numberActualMonth = Number(new Date().getMonth())
  const numberActualYear = Number(new Date().getFullYear())

  return (
    <div className='text-center'>
      <h4>Seus próximos agendamentos</h4>
      <div className='d-flex flex-column align-items-center'>
        {
          schedules.length
            ? (
                schedules.map(({ data, uid }) => (
                  (data.initialHour < numberActualHour && data.date === numberActualDate && data.month === numberActualMonth && data.year === numberActualYear) || (data.date < numberActualDate && data.month === numberActualMonth && data.year === numberActualYear) || (data.month < numberActualMonth && data.year === numberActualYear) || data.year < numberActualYear
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
