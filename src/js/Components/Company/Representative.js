import React from 'react'


const Representative = props => (
    <React.Fragment>
        <p>Representative component</p>
        {props.representatives.map(el => (
            <div className='representative' key={el._id}>
                <p>{el.fullname}</p>
                <button onClick={() => props.remove(el._id)}>Remove</button>
            </div>

        ))}
    </React.Fragment>
)


export default Representative