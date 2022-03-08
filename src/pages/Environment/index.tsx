// Routes
import { useParams } from 'react-router-dom'

// Styles
import './styles.css'

export function Environment () {
  const { environment } = useParams()
  return (
    <>
      <div id='head'>{environment}</div>
    </>
  )
}
