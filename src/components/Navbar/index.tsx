import icon from '../../assets/icon.png'
import './styles.css'
// Routes
import { Link } from 'react-router-dom'

// Firebase
import { getAuth, onAuthStateChanged, User, signOut } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../config/firebase'

// Usestate
import { useEffect, useState } from 'react'

export const Navbar = (): JSX.Element => {
  initializeApp(firebaseConfig)
  const auth = getAuth()
  const [user, setuser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const subscribe = onAuthStateChanged(auth, user => {
      Promise.resolve(setuser(user))
        .then(() => setLoading(false))
    })

    return subscribe
  }, [])

  const handleSignOut = () => {
    signOut(auth)
      .catch(error => console.log(error))
  }

  return (
    loading
      ?		<div></div>
      :		<nav className="navbar navbar-expand-sm navbar-light bg-light">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					<img src={icon} alt="infinita campolim logo" id='icon' />
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						{user
						  ? (
								<>
									<li className="nav-item">
										<Link className="nav-link" aria-current="page" to="/dashboard">Início</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" to="booking">Agendar</Link>
									</li>
									<button className='btn btn-danger' id='signoutbtn' onClick={handleSignOut}>Deslogar</button>
								</>
						    )
						  : (
								<>
									<li className="nav-item">
										<Link className="nav-link" aria-current="page" to="/">Fazer Login</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" to="signup">Cadastrar-se</Link>
									</li>
								</>
						    )
						}
					</ul>
				</div>
			</div>
		</nav>
  )
}
