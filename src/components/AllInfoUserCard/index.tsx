// Styles
import { DocumentData } from 'firebase/firestore'
import './styles.css'

export function AllInfoUserCard ({ data }: DocumentData) {
  return (
    <>
      <div className='d-flex align-items-center justify-content-start position-relative'>

        <div className='p-3 align-middle'>
          <img src={data.photo || 'https://via.placeholder.com/100'} style={{ width: '100px', height: '100px' }} alt="data Photo" className='img-fluid rounded' />
        </div>
        <div className='p-3'>
          <h2>{data.name || 'usuário'}</h2>
          <i>{data.email}</i>
        </div>
      </div>
      <hr />
    </>
  )
}
