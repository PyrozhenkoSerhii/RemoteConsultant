import React from 'react'
import { Link } from 'react-router-dom'


const Switch = () => (
    <React.Fragment>
        <Link className="nav-link" to="/company">Company</Link>
        <Link className="nav-link" to="/consultant">Consultant</Link>
        <Link className="nav-link" to="/customer">Customer</Link>
    </React.Fragment>
)


export default Switch