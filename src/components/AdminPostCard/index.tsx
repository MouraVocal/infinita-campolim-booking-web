// Assets
import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import trashIcon from '../../assets/trash.svg'
import { db } from '../../config/firebase'

interface IPostCard {
  imageUrl?: string
  text: string
  id: string
  environment: string
}

export default function AdminPostCard ({ imageUrl, text, id, environment }: IPostCard) {
  const storage = getStorage()

  const handleDeletePost = async () => {
    const docRef = (doc(db, `boards/${environment}/posts/${id}`))
    await deleteDoc(docRef)
      .then(() => {
        console.log('post deleted with success')
        const storageRef = ref(storage, `boards/${environment}/${id}`)
        deleteObject(storageRef)
      })
      .then(() => console.log('image deleted with success'))
  }

  return (
    <>
      <div className="d-flex border rounded shadow-sm justify-content-space-around w-100 mb-4 position-relative">
        <img src={imageUrl} className='p-2' alt="Imagem do Post" style={{ height: 100, width: 100 }} data-bs-toggle="modal" data-bs-target={`#modal${id}`} />
        <div className="text-break mb-2">
          {text}
        </div>
        <button onClick={handleDeletePost} className='btn btn-link position-absolute top-0 start-100 translate-middle rounded-circle'>
          <img src={trashIcon} style={{ width: 20, height: 20 }} alt="botão delete" />
        </button>
      </div>

      {/* Modal */}
      <div className="modal fade" id={`modal${id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <img src={imageUrl} className='img-fluid rounded mx-auto d-block' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
