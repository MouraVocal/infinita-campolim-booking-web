import './styles.css'

interface HourContainerProps {
  text: string
  scheduled?: boolean
  userScheduled?: boolean
}

export function HourContainer ({ text, scheduled, userScheduled }: HourContainerProps) {
  if (scheduled) {
    return <button type='button' disabled className="scheduled-hour-container border w-auto p-2 rounded mx-2 mb-3">{text}</button>
  }

  if (userScheduled) {
    return <button type='button' disabled className="user-scheduled-hour-container border w-auto p-2 rounded mx-2 mb-3">{text}</button>
  }

  return (
    <button type='button' onClick={() => alert('teste')} className="hour-container border w-auto p-2 rounded mx-2 mb-3">{text}</button>
  )
}
