import React from 'react'

function SpinnerComponent({type}) {
  return (
    <div className="d-flex justify-content-center">
        <div className={`${type === 'grow' ? 'spinner-grow text-success' : 'spinner-border text-danger'}`}  role="status">
            <span className='sr-only'></span>
        </div>
    </div>
  )
}

export default SpinnerComponent
