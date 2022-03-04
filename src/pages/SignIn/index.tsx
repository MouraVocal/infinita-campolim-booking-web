import { FormEvent, useState } from 'react'
import { getAuth, signInWithEmailAndPassword, User } from 'firebase/auth'
import { firebaseConfig } from '../../config/firebase'
import { initializeApp } from 'firebase/app'

export const SignIn: React.FC = () => {
  initializeApp(firebaseConfig)
  const auth = getAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<User>({} as User)
  const [firebaseError, setFirebaseError] = useState('')

  function handleLogin (e: FormEvent) {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setUser(userCredential.user)
        console.log(user)
      }
      )
      .catch(error => setFirebaseError(error.message)
      )
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
      <div className="container p-5">
        <h1>Por favor, faça seu login</h1>
        <form onSubmit={handleLogin} className='needs-validation' noValidate>
          <div className="mb-3 border p-3">
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
            { firebaseError ? <p style={{ color: 'red' }}>Usuário e senha inválidos</p> : null }
            <button className='btn btn-primary mb-3' type="submit">Entrar</button>
          </div>
        </form>
        { user ? <div>{user.email}</div> : null }
      </div>
    </>
  )
}
