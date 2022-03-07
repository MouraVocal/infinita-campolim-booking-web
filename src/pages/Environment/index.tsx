import { useParams } from 'react-router-dom'

export function Environment () {
  const { environment } = useParams()
  return (
    <div>{environment}</div>
  )
}
