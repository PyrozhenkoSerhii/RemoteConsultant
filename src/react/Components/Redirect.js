import React from 'react'
import { Spinner } from 'react-bootstrap'


const Redirect = ({ url }) => (
    <div className='loading'>
        <Spinner animation="border" variant="info" />
        <span>Redirecting to ${url}</span>
    </div>
)


export default Redirect