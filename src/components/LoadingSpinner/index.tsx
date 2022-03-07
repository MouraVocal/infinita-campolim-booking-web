import './styles.css'

export function LoadingSpinner () {
  return (
    <div className="loading-container">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
