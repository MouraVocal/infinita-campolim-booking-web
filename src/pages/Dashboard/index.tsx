// Components
import { UserCard } from '../../components/UserCard'
import { UserSchedules } from '../../components/UserSchedules'

export const Dashboard: React.FC = () => {
  return (
    <>
      <UserCard />
      <UserSchedules />
    </>
  )
}
