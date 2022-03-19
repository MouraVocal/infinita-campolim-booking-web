// Firebase
import { doc, DocumentData, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

// Assets
import userIcon from '../../assets/user.svg'

// Styles
import './styles.css'

export function AdminUserCard ({ data }: DocumentData) {
  const toggleBlockUser = async () => {
    const docRef = doc(db, 'users', data.uid)
    await updateDoc(docRef, {
      isBlocked: !data.isBlocked
    })
  }

  return (
    <>
      <div className='d-flex align-items-center justify-content-between admin-user-card-container'>

        <div className='p-3 align-middle'>
        {/* <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Phoenix Group - Flaticon</a> */}
          <img src={data.photo || userIcon} style={{ maxWidth: '200px', height: 'auto' }} alt="data Photo" className='img-fluid rounded' />
        </div>
        <div className='p-3'>
          <h2>{data.name || 'usuário'}</h2>
          {data.isAdmin ? <p style={{ color: 'red' }}>Administrador</p> : null}
          <p>Apartamento: {data.apt}</p>
          <p>Torre: {data.tower}</p>
          <p>Telefone: <a href={`https://wa.me/55${data.tel}`}>{data.tel}</a></p>
          <i>{data.email}</i>
        </div>
        <div className="p-3">
          {
            data.isBlocked
              ? <button onClick={toggleBlockUser} className="btn btn-success">Desbloquear</button>
              : <button onClick={toggleBlockUser} className="btn btn-danger">Bloquear</button>
          }
        </div>
      </div>
      <hr />
    </>
  )
}
