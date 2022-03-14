import React, { FormEvent, useState } from 'react'
import { doc, DocumentData, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage'

export function UserEditForm ({ userInfo }: DocumentData) {
  // States
  const [loading, setLoading] = useState(false)
  const [isImgUploaded, setIsImgUploaded] = useState(false)
  const [userImg, setUserImg] = useState(userInfo.photo || 'https://via.placeholder.com/100')
  const [name, setName] = useState<string>(userInfo.name)
  const [apt, setApt] = useState<string>(userInfo.apt)
  const [tower, setTower] = useState<string>(userInfo.tower)
  const [tel, setTel] = useState<string>(userInfo.tel)

  // Storage
  const storage = getStorage()

  // Functions
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()

      reader.onload = (e: ProgressEvent<FileReader>) => {
        setUserImg(() => e.target?.result)
        setIsImgUploaded(true)
        const storageRef = ref(storage, `usersImages/${userInfo.uid}`)
        uploadString(storageRef, e.target?.result as string, 'data_url')
          .then(async (snapshot) => {
            console.log('Upload realizado com sucesso')
            getDownloadURL(snapshot.ref)
              .then(async downloadUrl => {
                console.log(downloadUrl)
                const docRef = doc(db, 'users', userInfo.uid)
                await updateDoc(docRef, {
                  photo: downloadUrl
                })
              })
          })
      }

      reader.readAsDataURL(e.target.files[0])
    }
  }

  async function handleUpload () {
    setLoading(true)
    const docRef = doc(db, 'users', userInfo.uid)
    await updateDoc(docRef, {
      name: name,
      tel: tel,
      tower: tower,
      apt: apt
    })
    setLoading(false)
  }

  async function handleEdit (e: FormEvent) {
    e.preventDefault()
    if (name.length && apt.length && tower.length && tel.length) {
      return handleUpload()
    }
    return alert('Por favor preencha todos os campos')
  }

  const forms = document.getElementsByClassName('needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(form => {
      form.addEventListener('submit', (e: FormEvent) => {
        if (!form.checkValidity()) {
          e.preventDefault()
          e.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  return (
    <>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Atualize Seus dados</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleEdit} className='needs-validation' noValidate>
              <div className="mb-3 border p-3 rounded">
                <div className='mb-3 d-flex justify-content-center'>

                  {
                    isImgUploaded
                      ? (
                        <label htmlFor="photo" className="form-label">
                          <img
                            src={userImg}
                            style={{ width: '100px', height: '100px' }}
                            className='rounded'
                          />
                        </label>
                        )
                      : (
                        <>
                          <label htmlFor="photo" className="form-label">
                            <img
                            src={userImg || userInfo.photo}
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

                <div className='mb-3'>
                  <label htmlFor="password">Nome</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="nameInput"
                    value={name}
                    onChange={text => setName(text.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor Informe o seu nome.
                  </div>
                </div>

                <div className='mb-3'>
                  <label htmlFor="password">Apartamento</label>
                  <input
                    className="form-control"
                    type="text"
                    name="apt"
                    id="aptInput"
                    value={apt}
                    onChange={text => setApt(text.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor Informe o seu apartamento.
                  </div>
                </div>

                <div className='mb-3'>
                  <label htmlFor="password">Torre</label>
                  <input
                    className="form-control"
                    type="text"
                    name="tower"
                    id="towerInput"
                    value={tower}
                    onChange={text => setTower(text.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor Informe a sua torre.
                  </div>
                </div>

                <div className='mb-3'>
                  <label htmlFor="password">Telefone</label>
                  <input
                    className="form-control"
                    type="text"
                    name="tel"
                    id="telInput"
                    value={tel}
                    onChange={text => setTel(text.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor Informe o seu telefone.
                  </div>
                </div>

              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  {
                    loading
                      ? <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      : <div>Atualizar</div>
                  }
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}
