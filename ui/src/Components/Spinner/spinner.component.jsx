import React from 'react'

function SpinnerComponent() {
  return (
    <div className="d-flex justify-content-center">
        <div className="spinner-border text-danger" role="status">
            <span className='sr-only'></span>
        </div>
    </div>
  )
}

export default SpinnerComponent