import { FormEvent, useState } from 'react'

// Firebase
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { db, firebaseConfig } from '../../config/firebase'
import { initializeApp } from 'firebase/app'
import { doc, getDoc, setDoc } from 'firebase/firestore'

// assets
import googleLogo from '../../assets/google.svg'
import { LoadingSpinner } from '../../components/LoadingSpinner'

export const SignIn: React.FC = () => {
  initializeApp(firebaseConfig)
  const auth = getAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firebaseError, setFirebaseError] = useState('')
  const [loading, setLoading] = useState(false)

  // Sign In with Google
  const handleGoogleSignIn = () => {
    setLoading(true)
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        const user = userCredential.user
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
          console.log(user.uid, ' do not exists')
          await setDoc(doc(db, 'users', user.uid), {
            name: user.displayName,
            apt: '',
            email: user.email,
            photo: user.photoURL,
            tel: user.phoneNumber,
            tower: '',
            isAdmin: false,
            isBlocked: false,
            uid: user.uid
          })
        }
      })
      .catch(error => {
        setFirebaseError(error.message)
        setLoading(false)
      })
  }

  // Sign In With e-mail and password
  async function handleSignIn (e: FormEvent) {
    setLoading(true)
    e.preventDefault()
    if (email && password) {
      return signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user
          const docRef = doc(db, 'users', user.uid)
          const docSnap = await getDoc(docRef)

          if (!docSnap.exists()) {
            console.log(user.uid, ' do not exists')
            await setDoc(doc(db, 'users', user.uid), {
              name: user.displayName,
              apt: '',
              email: user.email,
              photo: user.photoURL,
              tel: user.phoneNumber,
              tower: '',
              isAdmin: false,
              isBlocked: false,
              uid: user.uid
            })
          }
        })
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
        <h1>Por favor, faça seu login</h1>
        <form onSubmit={handleSignIn} className='needs-validation' noValidate>
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
            {firebaseError ? <p style={{ color: 'red' }}>Usuário e senha inválidos</p> : null}
            <button className='btn btn-primary mb-3' type="submit">Entrar</button>
          </div>
        </form>
        <hr />
        <p className='text-center'>ou</p>
        <button onClick={handleGoogleSignIn} className='btn btn-danger w-100'>
          <img src={googleLogo} alt="googlelogo" className='m-2 img-fluid' />
          Entrar com Google
        </button>
      </div>
    </>
  )
}
