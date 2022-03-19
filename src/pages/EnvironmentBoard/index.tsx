import { useEffect, useState } from 'react'

// Routes
import { useParams } from 'react-router-dom'

// Firebase
import { collection, getDocs, DocumentData, setDoc, doc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { getStorage, ref, getDownloadURL, uploadString } from 'firebase/storage'

// Styles
import './styles.css'

// Assets
import addPhotoIcon from '../../assets/addphoto.svg'

// Components
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
  const storage = getStorage()
  const toPtBr = {
    gym: 'Academia',
    pool: 'Piscina',
    partyroom: 'Salão de Festas',
    sportscourt: 'Quadra'
  }

  const { environment } = useParams<{ environment: 'gym' | 'pool' | 'partyroom' | 'sportscourt' }>()

  const environmentEntry = toPtBr[environment].split(' ').join('')

  async function getEnviromentData () {
    setLoadingOpeningHours(true)
    const docsRef = collection(db, 'boards')
    const querySnapshot = await getDocs(docsRef)
    querySnapshot.forEach(item => {
      if (item.id === environmentEntry) {
        setClosedAt(item.data().closedAt)
        setOpenedAt(item.data().openedAt)
      }
    })
    setLoadingOpeningHours(false)
  }

  // States
  const [loading] = useState(false)
  const [loadingOpeningHours, setLoadingOpeningHours] = useState(false)
  const [loadingPosting, setLoadingPosting] = useState(false)
  const [openedAt, setOpenedAt] = useState(0)
  const [closedAt, setClosedAt] = useState(0)
  const [posts, setPosts] = useState<DocumentData[]>([])
  const [isImgUploaded, setIsImgUploaded] = useState(false)
  const [postImg, setPostImg] = useState(addPhotoIcon)
  const [text, setText] = useState('')

  useEffect(() => {
    const docsRef = collection(db, `boards/${environmentEntry}/posts`)
    const q = query(docsRef, orderBy('uid', 'desc'))
    const unsubscribe = onSnapshot(q, querySnapShot => {
      setLoadingPosting(true)
      setPosts([])
      querySnapShot.forEach(post => setPosts(prevState => [...prevState, post.data()]))
      setLoadingPosting(false)
    },
    (error) => {
      console.log(error)
      setLoadingPosting(false)
    }
    )
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    getEnviromentData()
  }, [])

  const handleOpeningHours = async () => {
    setLoadingOpeningHours(true)
    const docRef = doc(db, 'boards', environmentEntry)
    await updateDoc(docRef, {
      openedAt: openedAt,
      closedAt: closedAt
    })
      .then(() => {
        console.log('Horário atualizado com sucesso!')
        setLoadingOpeningHours(false)
      })
      .catch(error => {
        console.log(error.message)
        setLoadingOpeningHours(false)
      })
  }

  const handlePost = async (uid: string) => {
    setLoadingPosting(true)
    const storageRef = ref(storage, `boards/${environmentEntry}/${uid}`)
    await uploadString(storageRef, postImg as string, 'data_url')
      .then(async (snapshot) => {
        console.log('Upload realizado com sucesso')
        getDownloadURL(snapshot.ref)
          .then(async downloadUrl => {
            console.log(downloadUrl)
            const docRef = doc(db, `boards/${environmentEntry}/posts/${uid}`)
            await setDoc(docRef, {
              text: text,
              image: downloadUrl,
              uid: uid
            })
          })
          .then(() => {
            setPostImg(addPhotoIcon)
            setText('')
            setLoadingPosting(false)
          })
          .catch((error) => {
            console.log(error.message)
            setLoadingPosting(false)
          })
      })
  }

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()

      reader.onload = (e: ProgressEvent<FileReader>) => {
        setPostImg(() => e.target?.result as string)
        setIsImgUploaded(true)
      }

      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <>
      <h4 className='text-center py-2'>{environmentEntry}</h4>
      <hr />
      <div className="container-fluid">
      <h4 className='text-break text-center'>Alterar Horário de funcionamento:</h4>
      {
        loading
          ? <div className='d-flex justify-content-center align-items-center'>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          : <h5 className='text-break text-center'>
            <span>
              das
              <input
                className='number-input'
                type="number"
                name="openedat"
                id="openedat"
                value={openedAt}
                onChange={e => setOpenedAt(Number(e.target.value))}
                max={24}
                min={0}
              />
              hs às
              <input
                className='number-input'
                type="number"
                name="openedat"
                id="openedat"
                value={closedAt}
                max={24}
                min={0}
                onChange={e => setClosedAt(Number(e.target.value))}
              />
              hs
              <button onClick={handleOpeningHours} className='btn btn-info hourBtn my-2' disabled={loadingOpeningHours}>
                {
                  loadingOpeningHours
                    ? <div className='d-flex justify-content-center align-items-center'>
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                    : 'Atualizar'
                }
              </button>
            </span>
          </h5>
      }
      </div>
      <hr />
      <div className='d-flex mb-3'>
        <div className="p-3">
          <div className='mb-3 d-flex justify-content-center'>

            {
              isImgUploaded
                ? (
                  <label htmlFor="photo" className="form-label">
                    <img
                      src={postImg}
                      style={{ width: '100px', height: '100px' }}
                    />
                  </label>
                  )
                : (
                  <>
                    <label htmlFor="photo" className="form-label">
                      <img
                        src={postImg}
                        alt="Foto do usuário"
                        style={{ width: '100px', height: '100px' }}
                      />
                    </label>
                    <input
                      className="form-control"
                      id="photo"
                      type="file"
                      name="photo"
                      accept='image/*'
                      onChange={handleImgChange}
                      style={{ display: 'none' }}
                    />
                  </>
                  )
            }
            <input
              className="form-control"
              id="photo"
              type="file"
              name="photo"
              accept='image/*'
              onChange={handleImgChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <textarea
          className='form-control'
          name="text"
          id="text"
          placeholder='Deseja escrever algo?'
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
      <button onClick={() => handlePost(String(Date.now()))} className='btn btn-info w-100' disabled={loadingPosting}>
        {
          loadingPosting
            ? <div className='d-flex justify-content-center align-items-center'>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            : 'Publicar'
        }
      </button>

      <hr />
      <div className='d-flex flex-wrap justify-content-center'>
        <h4 className='text-center py-2 w-100'>Publicações</h4>

        {
          loading
            ? <div className='d-flex justify-content-center align-items-center'>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            : posts.length
              ? posts.map(item => <AdminPostCard
                key={item.uid}
                imageUrl={item.image}
                text={item.text}
                id={item.uid}
                environment={environmentEntry}
              />)
              : <div className='w-100 text-center'>Não há notícias por enquanto</div>
        }
      </div>
    </>
  )
}
