import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import { SignUp } from '../pages/SignUp'
import { SignIn } from '../pages/SignIn'

export function AppRoutes () {
  return (
		<Router>
			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/dashboard" element={<SignUp />} />
			</Routes>
		</Router>
  )
}
