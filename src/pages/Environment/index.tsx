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

// Components
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { HourContainer } from '../../components/HourContainer'
import PostCard from '../../components/PostsCard'

// Excluding undefined type in useParams types to use as an object entry
declare module 'react-router-dom' {
  export function useParams<
    P extends Record<string, string | undefined> = {
      [key: string]: string | undefined;
    }
  >(): P;
}

export function Environment () {
  // Translating
  const toPtBr = {
    gym: 'Academia',
    pool: 'Piscina',
    partyroom: 'Salão de Festas',
    sportscourt: 'Quadra'
  }

  // Getting Params
  const { environment } = useParams<{ environment: 'gym' | 'pool' | 'partyroom' | 'sportscourt' }>()
  const environmentEntry = toPtBr[environment].split(' ').join('')

  const userId = getAuth().currentUser?.uid

  // States
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)
  const [schedules, setSchedules] = useState<DocumentData[]>([])
  const [openedAt, setOpenedAt] = useState('')
  const [closedAt, setClosedAt] = useState('')
  const [posts, setPosts] = useState<DocumentData[]>([])

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
    const docsRef = collection(db, 'boards')
    const querySnapshot = await getDocs(docsRef)
    querySnapshot.forEach(item => {
      if (item.id === environmentEntry) {
        setClosedAt(item.data().closedAt)
        setOpenedAt(item.data().openedAt)
      }
    })
  }

  async function getBoards () {
    setPosts([])
    const docsRef = collection(db, `boards/${environmentEntry}/posts`)
    const querySnapshot = await getDocs(docsRef)
    querySnapshot.forEach(doc => {
      setPosts(prevState => [...prevState, doc.data()])
    })
  }

  useEffect(() => {
    getData(date)
    getEnviromentData()
    getBoards()
  }, [environment])

  // Interfaces
  interface IrenderHours {
    openedAt: number
    closedAt: number
  }

  // Time Helpers
  const renderHours: IrenderHours[] = []
  const actualDate = new Date()
  const actualHour = Number(new Date().getHours())
  const selectedDate = new Date(date)

  // Render buttons for schedules
  for (let i = Number(openedAt); i < Number(closedAt); i++) {
    renderHours.push({ openedAt: i, closedAt: i + 1 })
  }

  return (
    <>
      <div id='head'>{toPtBr[environment]}</div>
      <div className='d-flex py-3 justify-content-center align-items-center'>

        {
          loading
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
      <p className='text-center font-italic'>Funcionamento: das {openedAt}h às {closedAt}h</p>
      <h4 className='text-center p-4'>Escolha um dos horários disponíveis:</h4>
      <div className='d-flex flex-wrap justify-content-center'>

        {
          renderHours.map(item => {
            if (actualDate.getDate() === selectedDate.getDate() + 1 && actualDate.getMonth() === selectedDate.getMonth() && actualDate.getFullYear() === selectedDate.getFullYear() && item.openedAt <= actualHour) {
              return null
            }
            if (schedules.find(schedule => schedule.initialHour === item.openedAt)) {
              if (schedules.find(schedule => schedule.user === userId)) {
                return <HourContainer userScheduled text='Você agendou' />
              }
              return <HourContainer scheduled text='Agendado' />
            }
            return <HourContainer key={uuidv4()} text={`das ${item.openedAt}h até ${item.closedAt}h`}/>
          })
        }
      </div>
      <div className='d-flex flex-wrap justify-content-center'>
      <h4 className='text-center py-2'>Notícias de {toPtBr[environment]}</h4>
        {
          posts.map(item => <PostCard key={item.uid} imageUrl={item.image} text={item.text} id={item.uid} />)
        }
      </div>
    </>
  )
}
