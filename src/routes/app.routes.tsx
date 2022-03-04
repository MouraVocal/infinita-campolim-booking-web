import {
  Route,
  Routes
} from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'

export function AppRoutes () {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  )
}
