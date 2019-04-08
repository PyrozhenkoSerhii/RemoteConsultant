import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import RegisterForm from '../Components/RegisterForm'


const Register = () => {
    const [validated, setValidated] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: '',
        secret: ''
    })

    const handleUpdate = ({ target: { id: field, value } }) => setFormData({ ...formData, [field]: value })

    const handleSubmit = event => {
        event.preventDefault()
        
        const form = event.currentTarget
        
        if (form.checkValidity() === false) {
            event.stopPropagation()
        }

        setValidated({ validated: true })

        
    }

    return redirect
        ? <Redirect to='/login' />
        : <RegisterForm
            handleUpdate={handleUpdate}
            handleSubmit={handleSubmit}
            validated={validated}
            data={formData}
        />
}


export default Register