import {
  Route,
  Routes
} from 'react-router-dom'
import { Book } from '../pages/Book'
import { Dashboard } from '../pages/Dashboard'

export function AppRoutes () {
  return (
    <Routes>
      <Route path='dashboard' element={<Dashboard />} />
      <Route path="book" element={<Book />} />
    </Routes>
  )
}
