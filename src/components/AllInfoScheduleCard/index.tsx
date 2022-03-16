// Firebase
import { doc, deleteDoc, DocumentData } from 'firebase/firestore'
import { db } from '../../config/firebase'

// Assets
import Academia from '../../assets/academia.jpeg'
import Piscina from '../../assets/piscina.jpeg'
import Salao from '../../assets/salao.jpg'
import Quadra from '../../assets/quadra.jpeg'

export function AllInfoScheduleCard ({ data }: DocumentData) {
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

  const uid = data.user

  const handleDeleteSchedule = async (uid: string) => {
    await deleteDoc(doc(db, 'schedules', uid))
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
          ? (data.isChecked === false ? <button className='btn btn-danger'>Não Checkado</button> : <button className='btn btn-success'>Checkado</button>)
          : (<button className='btn btn-danger' onClick={() => handleDeleteSchedule(uid)} >
            DELETAR
          </button>)
      }

    </div>
  </div>
  )
}
