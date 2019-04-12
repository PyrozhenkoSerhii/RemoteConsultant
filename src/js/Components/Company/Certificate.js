import React from 'react'


const Certificate = (props) => (
    <React.Fragment>
        <p>Company certificates</p>
        {props.company.map(certificate => (
            <div key={certificate._id}>
                <p>{certificate.title}</p>
                <button onClick={() => props.move(certificate._id)}>Remove</button>
            </div>
        ))}

        <p>All certificates</p>
        {props.all.map(certificate => (
            <div key={'all-' + certificate._id}>
                <p>{certificate.title}</p>
                <button onClick={() => props.move(certificate._id)}>Add</button>
            </div>
        ))}
    </React.Fragment>
)


export default Certificate