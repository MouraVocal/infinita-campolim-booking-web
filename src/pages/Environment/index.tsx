import { useEffect, useState } from 'react'

// Uuid
import { v4 as uuidv4 } from 'uuid'

// Routes
import { useParams } from 'react-router-dom'

// Firebase
import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { getAuth } from 'firebase/auth'

// Styles
import './styles.css'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { HourContainer } from '../../components/HourContainer'

// Excluding undefined type in useParams types to use as an object entry
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

  const userId = getAuth().currentUser

  // States
  // const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [date, setDate] = useState('2021-07-19')
  const [loading, setLoading] = useState(false)
  const [schedules, setSchedules] = useState<DocumentData[]>([])
  const [openedAt, setOpenedAt] = useState('')
  const [closedAt, setClosedAt] = useState('')

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
      setSchedules(prevState => [...prevState, doc.data()])
    })
    setLoading(false)
  }

  async function getEnviromentData () {
    const environmentEntry = toPtBr[environment].split(' ').join('')
    const docsRef = collection(db, 'boards')
    const querySnapshot = await getDocs(docsRef)
    querySnapshot.forEach(item => {
      if (item.id === environmentEntry) {
        setClosedAt(item.data().closedAt)
        setOpenedAt(item.data().openedAt)
      }
    })
  }

  useEffect(() => {
    getData(date)
    getEnviromentData()
  }, [])

  return (
    <>
      <div id='head'>{toPtBr[environment]}</div>
      <div className='d-flex py-3 justify-content-center align-items-center'>
        {loading
          ? <LoadingSpinner />
          : <>
            <label htmlFor="datepicker" className='p-3'>Escolha a data:</label>
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
      <p className='text-center fst-italic'>Funcionamento: das {openedAt}h às {closedAt}h</p>
      <h4 className='text-center p-4'>Escolha um dos horários disponíveis:</h4>
      <div className='d-flex flex-wrap justify-content-center' onClick={() => alert('teste')}>
        {
          schedules.map(item => {
            if (item.user === userId) {
              return <div>Você já agendou</div>
            }
            return <HourContainer key={uuidv4()} initialHour={item.initialHour} finalHour={item.finalHour} />
          })
        }
      </div>
    </>
  )
}
