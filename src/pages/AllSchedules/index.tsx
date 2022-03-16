import { useEffect, useState } from 'react'

import { v4 as uuidV4 } from 'uuid'

// Firebase
import { collection, DocumentData, getDocs } from 'firebase/firestore'
import { AllInfoScheduleCard } from '../../components/AllInfoScheduleCard'
import { db } from '../../config/firebase'

export function AllSchedules () {
  const [schedules, setSchedules] = useState<DocumentData[]>([])

  const getAllSchedules = async () => {
    setSchedules([])
    const docsRef = collection(db, 'schedules')
    const docsSnapshot = await getDocs(docsRef)
    docsSnapshot.forEach(schedule => {
      setSchedules(prevState => [...prevState, schedule.data()])
    })
  }

  useEffect(() => {
    getAllSchedules()
  }, [])
  return (
    <>
      {
        schedules.map(schedule => <AllInfoScheduleCard key={uuidV4()} data={schedule} />)
      }
    </>
  )
}
