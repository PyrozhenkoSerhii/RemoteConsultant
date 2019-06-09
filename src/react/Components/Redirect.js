import React from 'react'
import { Spinner } from 'react-bootstrap'


const Redirect = ({ url }) => (
    <div className='redirect'>
        <Spinner animation="border" variant="info" />
        <span>Redirecting to {url}</span>
    </div>
)


export default Redirect