import {
  Route,
  Routes
} from 'react-router-dom'
import { Booking } from '../pages/Booking'
import { Dashboard } from '../pages/Dashboard'
import { Environment } from '../pages/Environment'

export function AppRoutes () {
  return (
    <Routes>
      <Route path='dashboard' element={<Dashboard />} />
      <Route path="booking" element={<Booking />} />
      <Route path='*' element={<Dashboard />} />
			<Route path='environments/:environment' element={<Environment />} />
    </Routes>
  )
}
