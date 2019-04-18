import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { withAlert } from 'react-alert'

import { BASE_URL, REPRESENTATIVE, CUSTOMER, CONSULTANT, POST, AUTHENTICATE } from '../../config/routes'
import globalContext from '../tools/state/context/global-context'

import CompanyLoginComponent from '../Components/Company/Login'
import ConsultantLoginComponent from '../Components/Consultant/Login'
import CustomerLoginComponent from '../Components/Customer/Login'

import Registration from './registration'


const Authentication = ({ callbackUrl, entity, alert }) => {
    const [validated, setValidated] = useState(false)
    const [formData, setFormData] = useState({})
    const [completedRedirection, setCompletedRedirection] = useState(false)
    const [registerRedirection, setRegisterRedirection] = useState(false)

    const context = useContext(globalContext)

    const controller = entity === 'customer' ? CUSTOMER : entity === 'consultant' ? CONSULTANT : REPRESENTATIVE
    const Component = entity === 'company' ? CompanyLoginComponent : entity === 'customer' ? CustomerLoginComponent : ConsultantLoginComponent

    const handleUpdate = ({ target: { id: field, value } }) => setFormData({ ...formData, [field]: value })

    const handleSubmit = event => {
        const form = event.currentTarget

        event.preventDefault()

        if (form.checkValidity() === false) event.stopPropagation()

        setValidated({ validated: true })

        axios.post(BASE_URL + controller + POST + AUTHENTICATE, { ...formData })
            .then(res => {
                context.authenticate(entity, res.data.data, res.data.token)
                setCompletedRedirection(true)
            })
            .catch(err => {
                console.log(err.response)
                alert.error(JSON.stringify(err.response.data.error))
            })
    }

    const handleRegister = () => setRegisterRedirection(true)


    if (registerRedirection) return <Registration entity={entity} callbackUrl={callbackUrl} />
    if (completedRedirection) return <Redirect to={callbackUrl} />

    return (
        <Component
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            validated={validated}
            data={formData}
            handleRegister={handleRegister}
        />
    )
}





export default withAlert()(Authentication)