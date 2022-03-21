import { useEffect, useState } from 'react'

import { v4 as uuidV4 } from 'uuid'

// Firebase
import { collection, DocumentData, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'
import { AdminScheduleCard } from '../../components/AdminScheduleCard'
import { db } from '../../config/firebase'

export function AllSchedules () {
  // States
  const [schedules, setSchedules] = useState<DocumentData[]>([])
  const [docsLength, setDocsLength] = useState(0)
  const [lastVisible, setLastVisible] = useState<DocumentData>({})
  const [hasMore, setHasMore] = useState(true)

  const getFirstSchedules = async () => {
    setSchedules([])
    const docsRef = collection(db, 'schedules')
    const q = query(docsRef, orderBy('year', 'desc'), orderBy('month', 'desc'), orderBy('date', 'desc'), limit(10))
    const docsSnapshot = await getDocs(q)
    docsSnapshot.forEach(doc => setSchedules(prevState => [...prevState, { id: doc.id, ...doc.data() }]))
    setDocsLength(docsSnapshot.docs.length)
    setLastVisible(() => docsSnapshot.docs[docsSnapshot.docs.length - 1])
  }

  useEffect(() => {
    getFirstSchedules()
  }, [])

  const fetchMore = async () => {
    if (docsLength < 10) {
      setHasMore(false)
      return console.log('Não há mais dados')
    }
    const docsRef = collection(db, 'schedules')
    const q = query(docsRef, orderBy('year', 'desc'), orderBy('month', 'desc'), orderBy('date', 'desc'), startAfter(lastVisible), limit(10))
    const docsSnapshot = await getDocs(q)
    docsSnapshot.forEach(doc => setSchedules(prevState => [...prevState, { id: doc.id, ...doc.data() }]))
    setDocsLength(docsSnapshot.docs.length)
    setLastVisible(docsSnapshot.docs[docsSnapshot.docs.length - 1])
  }

  return (
    <>
      {
        schedules.map(schedule => <AdminScheduleCard key={uuidV4()} data={schedule} />)
      }
        <div className='d-flex align-items-center justify-content-center p-3'>
          {
            hasMore
              ? <button onClick={fetchMore} className='btn btn-info'>Carregar mais...</button>
              : <div>Não há mais dados</div>
          }
        </div>
        :
    </>
  )
}
