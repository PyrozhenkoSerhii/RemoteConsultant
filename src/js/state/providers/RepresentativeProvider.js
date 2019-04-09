import React, { useState } from 'react'
import RepresentativeContext from '../context/representative-context'


const RepresentativeProvider = props => {
    const [representative, setRepresentative] = useState(JSON.parse(localStorage.getItem('representative')) || null)
    const [token, setToken] = useState(localStorage.getItem('token') || null)

    const authenticateRepresentative = (representative, token) => {
        setRepresentative(representative)
        setToken(token)
        localStorage.setItem('token', token)
        localStorage.setItem('representative', JSON.stringify(representative))

    }
    const logoutRepresentative = () => {
        setRepresentative(null)
        setToken(null)
        localStorage.removeItem('representative')
        localStorage.removeItem('token')
    }

    return <RepresentativeContext.Provider value={{
        representative: representative,
        token: token,
        authenticateRepresentative: authenticateRepresentative,
        logoutRepresentative: logoutRepresentative
    }}>
        {props.children}
    </RepresentativeContext.Provider>
}


export default RepresentativeProvider
