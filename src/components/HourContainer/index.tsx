import './styles.css'

interface HourContainerProps {
  initialHour: string
  finalHour: string
}

export function HourContainer ({ initialHour, finalHour }: HourContainerProps) {
  return (
    <div className="hour-container border w-auto p-2 rounded mx-2 mb-3">das {initialHour}h às {finalHour}h</div>
  )
}
