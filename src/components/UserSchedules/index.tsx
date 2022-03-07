import React, { useEffect, useState } from 'react'

// Firestore
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, Firestore, DocumentData, where, query } from 'firebase/firestore'
import { firebaseConfig } from '../../config/firebase'
import { getAuth } from 'firebase/auth'

import { v4 as uuidv4 } from 'uuid'

// Assets
import Academia from '../../assets/academia.jpeg'
import Piscina from '../../assets/piscina.jpeg'
import Salao from '../../assets/salao.jpg'
import Quadra from '../../assets/quadra.jpeg'

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
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const auth = getAuth()

  const userId = auth.currentUser?.uid
  const [schedules, setSchedules] = useState<DocumentData[]>([])

  const querySnapshot = async (db: Firestore) => {
    const schedulesCol = collection(db, 'schedules')
    const userSchedules = query(schedulesCol, where('user', '==', userId))
    const schedulesSnapshot = await getDocs(userSchedules)
    const schedulesList = schedulesSnapshot.docs.map(doc => doc.data())
    return schedulesList
  }

  useEffect(() => {
    querySnapshot(db)
      .then((items) => setSchedules(items))
  }, [])

  return (
    <div className='container-fluid'>
      <h4>Seus agendamentos</h4>
      {
        schedules.length
          ? (
              schedules.map(item => (
              <div key={uuidv4()} className='d-flex border rounded align-items-center'>
                <div style={{ height: 100, width: 100 }}>
                  <img src={photo(item.local)} className='rounded' style={{ height: 100, width: 100 }} alt="foto" />
                  </div>
                <div className='border m-4'>
                  <p >{item.local}</p>
                  <p>{item.date}/{item.month}/{item.year}</p>
                  <p>Das {item.initialHour}h às {item.finalHour}h</p>
                </div>
                <div>cancelar</div>
              </div>
              ))
            )
          : (
            <div>Você ainda não tem agendamentos</div>
            )
      }
    </div>
  )
}