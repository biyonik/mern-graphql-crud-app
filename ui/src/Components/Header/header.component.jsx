import React, {memo} from 'react'
import {Link} from "react-router-dom";

function HeaderComponent() {
  return (
    <nav className='navbar bg-light mb-4 p-4'>
        <div className="container">
            <Link to="/" className="navbar-brand">
                <div className="d-flex">
                    MERNG Crud App
                </div>
            </Link>
        </div>
    </nav>
  )
}

export default memo(HeaderComponent);
