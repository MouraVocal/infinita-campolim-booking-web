import { useEffect, useState } from 'react'

// Uuid
import { v4 as uuidv4 } from 'uuid'

// Routes
import { useParams } from 'react-router-dom'

// Firebase
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'
import { firebaseConfig } from '../../config/firebase'

// Styles
import './styles.css'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { HourContainer } from '../../components/HourContainer'

// Excluding undefined in useParams types to use as an object value
declare module 'react-router-dom' {
  export function useParams<
    P extends Record<string, string | undefined> = {
      [key: string]: string | undefined;
    }
  >(): P;
}

export function Environment () {
  // Getting Params
  const { environment } = useParams<{ environment: 'gym' | 'pool' | 'partyroom' | 'sportscourt' }>()

  // Translating
  const toPtBr = {
    gym: 'Academia',
    pool: 'Piscina',
    partyroom: 'Salão de Festas',
    sportscourt: 'Quadra'
  }
  // Initialize Firebase
  initializeApp(firebaseConfig)
  const db = getFirestore()

  // States
  // const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [date, setDate] = useState('2021-07-19')
  const [loading, setLoading] = useState(false)
  const [serverHours, setServerHours] = useState<{}[]>([])

  // Get Data
  async function getData (date: string) {
    setLoading(true)
    setDate(date)
    const docsRef = collection(db, 'schedules')
    const docFilterDate = where('date', '==', new Date(date).getDate() + 1)
    const docFilterMonth = where('month', '==', new Date(date).getMonth() + 1)
    const docFilterYear = where('year', '==', new Date(date).getFullYear())
    const docFilterEnvironment = where('local', '==', toPtBr[environment])
    const q = query(docsRef, docFilterDate, docFilterMonth, docFilterYear, docFilterEnvironment)
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
      console.log(doc.data())
      setServerHours(prevState => [...prevState, doc.data()])
    })
    setLoading(false)
  }

  async function getOpeningHours () {
    const environmentEntry = toPtBr[environment].split(' ').join('')
    console.log(environmentEntry)
  }

  useEffect(() => {
    getData(date)
    getOpeningHours()
  }, [])

  return (
    <>
      <div id='head'>{toPtBr[environment]}</div>
      <div className='d-flex py-3 justify-content-center align-items-center'>
        {loading
          ? <LoadingSpinner />
          : <>
            <label htmlFor="datepicker" className='px-3'>Escolha a data:</label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              name="datepicker"
              id="datepicker"
              className='form-control w-auto'
              value={date}
              onChange={(value) => getData(value.target.value)}
            />
          </>
        }
      </div>
      <div>
        {
          serverHours.map(item => <HourContainer key={uuidv4()} openedAt={item.initialHour} closedAt={item.finalHour} />)
        }
      </div>
    </>
  )
}
