import React from 'react'
// import { ClipLoader } from 'react-spinners'
import { Spinner } from 'react-bootstrap'


const Loading = () => (
    <div className='loading'>
        <Spinner animation="grow" variant="info" />
    </div>
)


export default Loading