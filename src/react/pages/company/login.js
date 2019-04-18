import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { withAlert } from 'react-alert'

import LoginComponent from '../../Components/Company/Login'
import { BASE_URL, REPRESENTATIVE, POST, AUTHENTICATE } from '../../../config/routes'
import globalContext from '../../tools/state/context/global-context'


const Login = ({ alert }) => {
    const [validated, setValidated] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const context = useContext(globalContext)

    const handleUpdate = ({ target: { id: field, value } }) => setFormData({ ...formData, [field]: value })

    const handleSubmit = event => {
        const form = event.currentTarget

        event.preventDefault()

        if (form.checkValidity() === false) event.stopPropagation()

        setValidated({ validated: true })

        axios.post(BASE_URL + REPRESENTATIVE + POST + AUTHENTICATE, { ...formData })
            .then(res => {
                context.authenticateRepresentative(res.data.data, res.data.token)
                setRedirect(true)
            })
            .catch(err => {
                console.log(err.response)
                alert.error(JSON.stringify(err.response.data.error))
            })
    }

    return redirect
        ? <Redirect to='/' />
        : <LoginComponent
            handleUpdate={handleUpdate}
            handleSubmit={handleSubmit}
            validated={validated}
            data={formData}
        />
}


export default withAlert()(Login)