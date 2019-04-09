import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { withAlert } from 'react-alert'

import RegisterForm from '../Components/RegisterForm'
import { BASE_URL, REPRESENTATIVE, POST } from '../../config/routes'


const Register = ({ alert }) => {
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

        axios.post(BASE_URL + REPRESENTATIVE + POST, { secret: formData.secret, data: formData })
            .then(res => {
                setRedirect(true)
                alert.info('You are a representative now!')
            })
            .catch(err => {
                console.log(err.response)
                alert.error(err.response.data.error)
            })


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


export default withAlert()(Register)