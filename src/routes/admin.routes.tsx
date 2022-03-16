import {
  Route,
  Routes
} from 'react-router-dom'

import { AdminHome } from '../pages/AdminHome'
import { AllSchedules } from '../pages/AllSchedules'
import { AllUsers } from '../pages/AllUsers'
import { Boards } from '../pages/Boards'
import { EnvironmentBoard } from '../pages/EnvironmentBoard'

export function AdminRoutes () {
  return (
    <Routes>
      <Route path='/admin' element={<AdminHome />} />
      <Route path='/allusers' element={<AllUsers />} />
      <Route path='/allschedules' element={<AllSchedules />} />
      <Route path='/boards' element={<Boards />} />
      <Route path='/boards/:environment' element={<EnvironmentBoard />} />
      <Route path='*' element={<AdminHome />} />
    </Routes>
  )
}
