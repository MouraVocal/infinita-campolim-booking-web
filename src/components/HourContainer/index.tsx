import './styles.css'

interface HourContainerProps {
  openedAt: string
  closedAt: string
}

export function HourContainer ({ openedAt, closedAt }: HourContainerProps) {
  return (
    <div className="hour-container">das {openedAt} às {closedAt}</div>
  )
}
