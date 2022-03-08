import { FormEvent, useState } from 'react'

// Firebase
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseConfig } from '../../config/firebase'
import { initializeApp } from 'firebase/app'
import { LoadingSpinner } from '../../components/LoadingSpinner'

export const SignUp: React.FC = () => {
  initializeApp(firebaseConfig)
  const auth = getAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firebaseError, setFirebaseError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSignUp (e: FormEvent) {
    setLoading(true)
    e.preventDefault()
    if (email && password) {
      return createUserWithEmailAndPassword(auth, email, password)
        .catch(error => {
          setFirebaseError(error.message)
          setLoading(false)
        }
        )
    }
    return alert('Por favor preencha os campos')
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
    loading
      ? <LoadingSpinner />
      : <>
      <div className="container p-5">
        <h1>Por favor, crie seu usuário</h1>
        <form onSubmit={handleSignUp} className='needs-validation' noValidate>
          <div className="mb-3 border p-3 rounded">
            <div className='mb-3'>
              <label htmlFor="emailInput" className="form-label">E-mail</label>
              <input
                className="form-control"
                id="emailInput"
                placeholder="seuemail@exemplo.com"
                type="email"
                name="email"
                value={email}
                onChange={text => setEmail(text.target.value)}
                required
              />
              <div className="invalid-feedback">
                Por favor digite seu e-mail.
              </div>
            </div>

            <div className='mb-3'>
              <label htmlFor="password">Senha</label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="passwordInput"
                value={password}
                onChange={text => setPassword(text.target.value)}
                required
              />
              <div className="invalid-feedback">
                Por favor digite sua senha.
              </div>
            </div>
            {firebaseError ? <p style={{ color: 'red' }}>{firebaseError}</p> : null}
            <button className='btn btn-primary mb-3' type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </>
  )
}
