import { FormEvent, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseConfig } from '../config/firebase'
import UserData from '../components/UserData'

export function Home() {
	const app = initializeApp(firebaseConfig)
	const auth = getAuth()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState({})
	

	function handleLogin (e: FormEvent) {
		e.preventDefault()
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				setUser(userCredential.user)
				console.log(user)
			}
			)
			.catch(error => console.log(error)
			)
	}

	return (
		<>
			<form onSubmit={handleLogin}>
				<label htmlFor="email">E-mail</label>
				<input 
					type="email" 
					name="email" 
					id="email" 
					value={email} 
					onChange={text => setEmail(text.target.value)}
				/>

				<label htmlFor="password">Password</label>
				<input 
					type="password" 
					name="password" 
					id="password" 
					value={password} 
					onChange={text => setPassword(text.target.value)}
				/>

				<button type="submit">Entrar</button>
			</form>
			{ user? <UserData user={user} /> : null}
		</>
	)
}
