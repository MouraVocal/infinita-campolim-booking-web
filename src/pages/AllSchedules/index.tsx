import { useEffect, useState } from 'react'

import { v4 as uuidV4 } from 'uuid'

// Firebase
import { collection, DocumentData, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { AdminScheduleCard } from '../../components/AdminScheduleCard'
import { db } from '../../config/firebase'

export function AllSchedules () {
  const [schedules, setSchedules] = useState<DocumentData[]>([])
  const [lastItem, setLastItem] = useState(10)
  const [firstItem, setFirstItem] = useState(1)

  const firstPage = () => {
    setFirstItem(0)
    setLastItem(10)
  }

  useEffect(() => {
    const docsRef = collection(db, 'schedules')
    const q = query(docsRef, orderBy('year', 'desc'), orderBy('month', 'desc'), orderBy('date', 'desc'), limit(10))
    const unsubscribe = onSnapshot(q, docs => {
      setSchedules([])
      docs.forEach(schedule => {
        setSchedules(prevState => [...prevState, { id: schedule.id, ...schedule.data() }])
      })
    })
    return () => unsubscribe()
  }, [])
  return (
    <>
      {
        schedules.map(schedule => <AdminScheduleCard key={uuidV4()} data={schedule} />)
      }
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" onClick={firstPage} href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}
