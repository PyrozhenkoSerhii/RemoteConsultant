import React from 'react'
import { Link } from 'react-router-dom'


const Switch = () => (
    <div className='distributor-wrapper'>
        <Link className="nav-link company-link" to="/company">
            <div className='distributor-mask company-mask'></div>
            <div className='distributor-label'>
                <p className='distributor-header'>Company</p>
                <p className='distributor-description'>Use platform as a representative of a company</p>
            </div>
        </Link>
        <Link className="nav-link consultant-link" to="/consultant">
            <div className='distributor-mask consultant-mask'></div>
            <div className='distributor-label'>
                <p className='distributor-header'>Consultant</p>
                <p className='distributor-description'>Use platform to consult people</p>
            </div>
        </Link>
        <Link className="nav-link customer-link" to="/customer">
            <div className='distributor-mask customer-mask'></div>
            <div className='distributor-label'>
                <p className='distributor-header'>Customer</p>
                <p className='distributor-description'>Use platform to get a qualified help</p>
            </div>
        </Link>
    </div>
)


export default Switch