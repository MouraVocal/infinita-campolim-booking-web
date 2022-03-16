import { useEffect, useState } from 'react'

// Firebase
import { getAuth } from 'firebase/auth'
import { doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { db } from '../../config/firebase'

// Assets
import EditIcon from '../../assets/pencil-square.svg'
import accountIcon from '../../assets/account.png'

// Components
import { UserExtraInfo } from '../UserExtraInfo'
import { UserEditForm } from '../UserEditForm'
import { LoadingSpinner } from '../LoadingSpinner'

// Styles
import './styles.css'

export function UserCard () {
  // States
  const [userInfo, setUserInfo] = useState<DocumentData>({})
  const [loading, setLoading] = useState(true)

  // Get user info
  const auth = getAuth()
  const user = auth.currentUser

  useEffect(() => {
    if (user) {
      setLoading(true)
      const docRef = doc(db, 'users', user.uid)
      const unsubscribe = onSnapshot(docRef, docSnap => {
        setUserInfo(() => docSnap.data())
        setLoading(false)
      })

      return () => unsubscribe()
    }
  }, [])

  return (
    loading
      ? <LoadingSpinner />
      : <>
        <div className='d-flex align-items-center justify-content-start position-relative'>
          <button className="btn btn-outline-secondary position-absolute top-0 end-0 d-flex align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target="#edit-data-modal">
            <span className='edit-user-btn-text px-1'>Editar Perfil</span>
            <img className='px-1' src={EditIcon} alt="Botão editar" />
          </button>

          <div className="modal fade" id="edit-data-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <UserEditForm userInfo={userInfo} />
          </div>

          <div className='p-3 align-middle'>
            <img src={userInfo?.photo || accountIcon} style={{ width: '100px', height: '100px' }} alt="User Photo" className='img-fluid rounded user-avatar' />
          </div>
          <div className='p-3'>
            <h6>Bem vindo(a),</h6>
            <h2 className='text-break'>{userInfo.name || 'usuário'}</h2>
            <i className='text-break'>{user?.email}</i>
          </div>
        </div>
        <UserExtraInfo user={userInfo} />
        <hr />
      </>
  )
}
