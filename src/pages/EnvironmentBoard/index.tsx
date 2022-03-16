import { useEffect, useState } from 'react'

// Routes
import { useParams } from 'react-router-dom'

// Firebase
import { collection, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '../../config/firebase'

// Styles
import './styles.css'

// Components
import { LoadingSpinner } from '../../components/LoadingSpinner'
import AdminPostCard from '../../components/AdminPostCard'

// Excluding undefined type in useParams types to use as an object entry
declare module 'react-router-dom' {
  export function useParams<
    P extends Record<string, string | undefined> = {
      [key: string]: string | undefined;
    }
  >(): P;
}

export function EnvironmentBoard () {
  const toPtBr = {
    gym: 'Academia',
    pool: 'Piscina',
    partyroom: 'Salão de Festas',
    sportscourt: 'Quadra'
  }
  const { environment } = useParams<{ environment: 'gym' | 'pool' | 'partyroom' | 'sportscourt' }>()
  const environmentEntry = toPtBr[environment].split(' ').join('')
  async function getEnviromentData () {
    setLoading(true)
    const docsRef = collection(db, 'boards')
    const querySnapshot = await getDocs(docsRef)
    querySnapshot.forEach(item => {
      if (item.id === environmentEntry) {
        setClosedAt(item.data().closedAt)
        setOpenedAt(item.data().openedAt)
      }
    })
    setLoading(false)
  }

  // States
  const [loading, setLoading] = useState(false)
  const [openedAt, setOpenedAt] = useState('')
  const [closedAt, setClosedAt] = useState('')
  const [posts, setPosts] = useState<DocumentData[]>([])

  async function getBoards () {
    setLoading(true)
    setPosts([])
    const docsRef = collection(db, `boards/${environmentEntry}/posts`)
    const querySnapshot = await getDocs(docsRef)
    querySnapshot.forEach(doc => {
      setPosts(prevState => [...prevState, doc.data()])
    })
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getEnviromentData()
    getBoards()
    setLoading(false)
  }, [])

  return (
    loading
      ? <LoadingSpinner />
      : <>
      <h4 className='text-center py-2'>{environmentEntry}</h4>
      <div>Alterar Horário de funcionamento: das {openedAt}hs às {closedAt}hs</div>
      <form className='form d-flex'>
        <div>Adicionar Foto</div>
        <textarea className='form-control' name="text" id="text" placeholder='Deseja escrever algo?' />
      </form>
      <div className='d-flex flex-wrap justify-content-center'>
        <h4 className='text-center py-2'>Publicações</h4>
        {
          posts.length
            ? posts.map(item => <AdminPostCard key={item.uid} imageUrl={item.image} text={item.text} id={item.uid} />)
            : <div className='w-100 text-center'>Não há notícias por enquanto</div>
        }
      </div>
    </>
  )
}
