import React from 'react'


const Error = props => (
    <div className="error">
        <p>Error occurred: {props.error}</p>
    </div>
)


export default Error