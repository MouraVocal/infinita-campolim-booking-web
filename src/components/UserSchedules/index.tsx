import React, { useEffect, useState } from 'react'

// Firestore
import { collection, DocumentData, where, query, doc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../../config/firebase'

// Unique Id
import { v4 as uuidv4 } from 'uuid'

// Assets
import Academia from '../../assets/academia.jpeg'
import Piscina from '../../assets/piscina.jpeg'
import Salao from '../../assets/salao.jpg'
import Quadra from '../../assets/quadra.jpeg'

// styles
import './styles.css'

const photo = (name: string) => {
  if (name === 'Academia') {
    return Academia
  }
  if (name === 'Piscina') {
    return Piscina
  }
  if (name === 'Salão de Festas') {
    return Salao
  }
  if (name === 'Quadra') {
    return Quadra
  }
}

export const UserSchedules: React.FC = () => {
  const auth = getAuth()

  const userId = auth.currentUser?.uid

  const [schedules, setSchedules] = useState<DocumentData[]>([])

  const getUserSchedules = async () => {
    setSchedules([])
    const docsRef = collection(db, 'schedules')
    const q = query(docsRef, where('user', '==', userId))
    onSnapshot(q, schedulesSnapshot => {
      setSchedules([])
      schedulesSnapshot.forEach(doc => {
        setSchedules(prevState => [...prevState, { uid: doc.id, data: doc.data() }])
      })
    })
  }

  const deleteSchedule = async (uid: string) => {
    alert(uid)
    await deleteDoc(doc(db, 'schedules', uid))
  }

  useEffect(() => {
    getUserSchedules()
  }, [])

  return (
    <div>
      <h4>Seus últimos agendamentos</h4>
      <div>
        {
          schedules.length
            ? (
                schedules.map(({ data, uid }) => (
                <div key={uuidv4()} className='d-flex border rounded p-2 mb-2 shadow-sm align-items-center justify-content-between schedules-container'>
                  <div>
                    <img src={photo(data.local)} className='rounded img-fluid' alt="foto" />
                  </div>
                  <div className='px-2'>
                    <b>{data.local}</b>
                    <p>{data.date}/{data.month + 1}/{data.year}</p>
                    <p>Das {data.initialHour}h às {data.finalHour}h</p>
                  </div>
                  <div className='px-3'>
                    <button className='btn btn-danger' onClick={() => deleteSchedule(uid)} >
                      DESISTIR
                    </button>
                  </div>
                </div>
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
