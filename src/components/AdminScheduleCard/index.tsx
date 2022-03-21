// Firebase
import { doc, deleteDoc, DocumentData } from 'firebase/firestore'
import { db } from '../../config/firebase'

// Assets
import Academia from '../../assets/academia.jpeg'
import Piscina from '../../assets/piscina.jpeg'
import Salao from '../../assets/salao.jpg'
import Quadra from '../../assets/quadra.jpeg'
import { useState } from 'react'

export function AdminScheduleCard ({ data }: DocumentData) {
  const [deleted, setDeleted] = useState(false)
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

  const handleDeleteSchedule = async (uid: string) => {
    await deleteDoc(doc(db, 'schedules', uid))
    setDeleted(true)
  }

  return (
    deleted
      ? null
      : <div className='container-fluid d-flex border rounded p-2 mb-2 shadow-sm align-items-center justify-content-between schedules-container'>
        <div>
          <p className='text-break'>Agendado por:</p>
          <b className='text-break'>{data.name}</b>
          <div className='position relative'>
            <img
              src={data.photo}
              alt="user photo"
              className='rounded'
              style={{ maxWidth: '100px', height: 'auto' }}
            />
          <p className='text-break'>Apt: {data.apt}</p>
          <p className='text-break'>Torre: {data.tower}</p>
          </div>
        </div>
        <div className='px-2'>
          <img
            src={photo(data.local)}
            className='rounded-circle img-fluid m-2'
            alt="foto"
            style={{ maxWidth: '30px', height: 'auto' }}
          />
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
              : (<button className='btn btn-danger' onClick={() => handleDeleteSchedule(data.id)} >
                DELETAR
              </button>)
          }

        </div>
      </div>
  )
}
