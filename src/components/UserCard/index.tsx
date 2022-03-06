import { getAuth } from 'firebase/auth'

export function UserCard () {
  const auth = getAuth()

  const user = auth.currentUser

  return (
    <div className='d-flex align-items-center justify-content-start'>
      <div className='p-3 align-middle'>
        <img src={user?.photoURL || 'https://loremflickr.com/100/100'} alt="User Photo" className='img-fluid rounded' />
      </div>
      <div className='p-3'>
        <b>Bem vindo,</b>
        <h2>{user?.displayName || 'usuário'}</h2>
        <i>{user?.email}</i>
      </div>
    </div>
  )
}
