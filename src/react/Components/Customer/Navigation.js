import React from 'react'
import { Link } from 'react-router-dom'


const Navigation = ({ context, entity }) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/customer">Home</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/">Back</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/customer" onClick={() => context.logout(entity)}>Logout</Link>
                </li>

            </ul>
        </div>
    </nav>
)


export default Navigation