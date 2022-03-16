import { useState } from 'react'
// Firebase
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { getAuth } from 'firebase/auth'

// Style
import './styles.css'

// Interfaces
interface HourContainerProps {
  text: string
  scheduled?: boolean
  userScheduled?: boolean
  initialHour: number
  finalHour: number
  selectedDate: Date
  environment: string
}

export function HourContainer ({ text, scheduled, userScheduled, initialHour, finalHour, selectedDate, environment }: HourContainerProps) {
  // States
  const [loading, setLoading] = useState(false)

  // Functions
  const addZero = (number: number) => {
    return String(number).length < 2 ? `0${number}` : number
  }

  // Consts
  const scheduleId = `${addZero(initialHour)}${addZero(finalHour)}${addZero(Number(selectedDate.getDate() + 1))}${addZero(Number(selectedDate.getMonth() + 1))}${addZero(Number(selectedDate.getFullYear()))}${environment}`
  const user = getAuth().currentUser

  function notifyMe () {
    if (!('Notification' in window)) {
      return console.log('This browser does not support desktop notification')
    }
    if (Notification.permission === 'granted') {
      return console.log('Nofiticações permitidas')
    }
    if (Notification.permission !== 'denied') {
      Notification.requestPermission()
        .then(function (permission) {
          if (permission === 'granted') {
            return console.log('Nofiticações permitidas')
          }
        })
    }
  }

  const handleClick = async () => {
    setLoading(true)
    notifyMe()
    await setDoc(doc(db, 'schedules', scheduleId), {
      apt: 'teste',
      date: selectedDate.getDate() + 1,
      finalHour: finalHour,
      initialHour: initialHour,
      isChecked: false,
      local: environment,
      month: selectedDate.getMonth(),
      name: user?.displayName,
      photo: user?.photoURL,
      tower: 'teste',
      user: user?.uid,
      year: selectedDate.getFullYear()
    })
    setLoading(false)
  }

  if (scheduled) {
    return <button type='button' disabled className="scheduled-hour-container border w-auto p-2 rounded mx-2 mb-3">{text}</button>
  }

  if (userScheduled) {
    return <button type='button' disabled className="user-scheduled-hour-container border w-auto p-2 rounded mx-2 mb-3">{text}</button>
  }

  return (
    <button type='button' disabled={loading} onClick={handleClick} className="hour-container border w-auto p-2 rounded mx-2 mb-3">{loading
      ? <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      : text}</button>
  )
}
