import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import RepresentativeContext from '../../state/context/representative-context'


const Navigation = () => {
    const context = useContext(RepresentativeContext)

    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                {context.token && <li className="nav-item">
                    <Link className="nav-link" to="/company/certificates">Certificates</Link>
                </li>}
                {context.token && <li className="nav-item">
                    <Link className="nav-link" to="/company/products">Products</Link>
                </li>}
                {context.token && <li className="nav-item">
                    <Link className="nav-link" to="/company/products/import">Import</Link>
                </li>}
                {context.token && <li className="nav-item">
                    <Link className="nav-link" to="/company/requests">Requests</Link>
                </li>}
                {context.token && <li className="nav-item">
                    <Link className="nav-link" to="/company/consultants">Consultants</Link>
                </li>}
                {context.token && <li className="nav-item">
                    <Link className="nav-link" to="/company/representatives">Representatives</Link>
                </li>}
            </ul>
        </div>
    </nav>
}

export default Navigation