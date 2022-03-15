// Firebase
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

// Assets
import Academia from '../../assets/academia.jpeg'
import Piscina from '../../assets/piscina.jpeg'
import Salao from '../../assets/salao.jpg'
import Quadra from '../../assets/quadra.jpeg'
import InfinitaLogo from '../../assets/icon.png'

interface IScheduleCard {
  data: {
    date: number
    month: number
    year: number
    local: string
    initialHour: number
    finalHour: number
    isChecked: boolean
  }
  uid: string
}

export function ScheduleCard ({ data, uid }: IScheduleCard) {
  const verifyIfHasNotifications = setInterval(() => {
    if (data.initialHour === new Date().getHours() &&
    data.month === new Date().getMonth() &&
    data.year === new Date().getFullYear()) {
      if (Notification.permission === 'granted') {
        // eslint-disable-next-line no-unused-vars
        const notification = new Notification('Entre no App Pra fazer Check-in 😎', {
          body: `${data.local}: das ${data.initialHour}h às ${data.finalHour}`,
          icon: InfinitaLogo
        })
      }
    }
  }, 1000 * 60 * 60)

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

  const handleCheckIn = async (uid: string) => {
    const docRef = doc(db, 'schedules', uid)
    await updateDoc(docRef, { isChecked: true })
  }

  const handleDeleteSchedule = async (uid: string) => {
    await deleteDoc(doc(db, 'schedules', uid))
    clearInterval(verifyIfHasNotifications)
  }

  return (
  <div className='container-fluid d-flex border rounded p-2 mb-2 shadow-sm align-items-center justify-content-between schedules-container'>
    <div>
      <img src={photo(data.local)} className='rounded img-fluid' alt="foto" />
    </div>
    <div className='px-2'>
      <b>{data.local}</b>
      <p>{data.date}/{data.month + 1}/{data.year}</p>
      <p>Das {data.initialHour}h às {data.finalHour}h</p>
    </div>
    <div className='px-3'>

      {
        (
          data.initialHour === new Date().getHours() &&
          data.month === new Date().getMonth() &&
          data.year === new Date().getFullYear()
        )
          ? (data.isChecked === false ? <button className='btn btn-info' onClick={() => handleCheckIn(uid)}>CHECK-IN</button> : <button className='btn btn-success'>Confirmado</button>)
          : (<button className='btn btn-danger' onClick={() => handleDeleteSchedule(uid)} >
            DESISTIR
          </button>)
      }

    </div>
  </div>
  )
}
