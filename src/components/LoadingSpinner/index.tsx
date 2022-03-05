import React from 'react'

export function LoadingSpinner () {
  return (
    <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
