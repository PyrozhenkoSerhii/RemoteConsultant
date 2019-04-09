import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import RepresentativeContext from './state/context/representative-context'


const Navigation = () => {
    const context = useContext(RepresentativeContext)

    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                {context.token && <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                </li>}
                {!context.token && <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>}
                {!context.token && <li className="nav-item">
                    <Link className="nav-link" to="/login" >Login</Link>
                </li>}
                {context.token && <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={context.logoutRepresentative}>Logout</Link>
                </li>}
            </ul>
        </div>
    </nav>
}

export default Navigation