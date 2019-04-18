import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { withAlert } from 'react-alert'

import { BASE_URL, REPRESENTATIVE, CUSTOMER, CONSULTANT, POST } from '../../config/routes'
import globalContext from '../tools/state/context/global-context'

import ConsultantRegisterComponent from '../Components/Consultant/Register'
import CompanyRegisterComponent from '../Components/Company/Register'
import CustomerRegisterComponent from '../Components/Customer/Register'

import Authentication from './authentication'


const Registration = ({ entity, callbackUrl, alert }) => {
    const [validated, setValidated] = useState(false)
    const [formData, setFormData] = useState({})
    const [completedRedirection, setCompletedRedirection] = useState(false)
    const [autheticateRedirection, setAutheticateRedirection] = useState(false)

    const controller = entity === 'customer' ? CUSTOMER : entity === 'consultant' ? CONSULTANT : REPRESENTATIVE
    const Component = entity === 'company' ? CompanyRegisterComponent : entity === 'customer' ? CustomerRegisterComponent : ConsultantRegisterComponent

    const handleUpdate = ({ target: { id: field, value } }) => setFormData({ ...formData, [field]: value })

    const handleSubmit = event => {
        const form = event.currentTarget

        event.preventDefault()

        if (form.checkValidity() === false) event.stopPropagation()

        setValidated({ validated: true })

        axios.post(BASE_URL + controller + POST, { secret: formData.secret, data: formData })
            .then(res => {
                setCompletedRedirection(true)
                alert.info(`You are a ${entity === 'company' ? 'representative' : entity} now!`)
            })
            .catch(err => {
                console.log(err.response)
                alert.error(JSON.stringify(err.response.data.error))
            })
    }

    const handleAuthenticate = () => setAutheticateRedirection(true)


    if (autheticateRedirection || completedRedirection)
        return <Authentication entity={entity} callbackUrl={callbackUrl} />

    return (
        <Component
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            validated={validated}
            data={formData}
            handleAuthenticate={handleAuthenticate}
        />
    )
}


export default withAlert()(Registration)