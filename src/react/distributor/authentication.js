import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { withAlert } from 'react-alert'

import { BASE_URL, REPRESENTATIVE, CUSTOMER, CONSULTANT, POST, AUTHENTICATE } from '../../config/routes'
import globalContext from '../tools/state/context/global-context'

import CompanyLoginComponent from '../Components/Company/Login'
import ConsultantLoginComponent from '../Components/Consultant/Login'
import CustomerLoginComponent from '../Components/Customer/Login'

import ConsultantRegisterComponent from '../Components/Consultant/Register'
import CompanyRegisterComponent from '../Components/Company/Register'
import CustomerRegisterComponent from '../Components/Customer/Register'


const LOGIN_ACTION = 'login'
const REGISTER_ACTION = 'registration'

const components = {
    [LOGIN_ACTION]: {
        customer: CustomerLoginComponent,
        consultant: ConsultantLoginComponent,
        company: CompanyLoginComponent
    },
    [REGISTER_ACTION]: {
        customer: CustomerRegisterComponent,
        consultant: ConsultantRegisterComponent,
        company: CompanyRegisterComponent
    }
}

const paths = {
    [LOGIN_ACTION]: {
        customer: BASE_URL + CUSTOMER + POST + AUTHENTICATE,
        consultant: BASE_URL + CONSULTANT + POST + AUTHENTICATE,
        company: BASE_URL + REPRESENTATIVE + POST + AUTHENTICATE
    },
    [REGISTER_ACTION]: {
        customer: BASE_URL + CUSTOMER + POST,
        consultant: BASE_URL + CONSULTANT + POST,
        company: BASE_URL + REPRESENTATIVE + POST
    }
}


const Authentication = ({ callbackUrl, entity, alert }) => {
    const [validated, setValidated] = useState(false)
    const [formData, setFormData] = useState({})
    const [action, setAction] = useState(LOGIN_ACTION)
    const [redirection, setRedirection] = useState(false)

    const context = useContext(globalContext)

    const handleUpdate = ({ target: { id: field, value } }) => setFormData({ ...formData, [field]: value })

    const handleSubmit = event => {
        const form = event.currentTarget

        event.preventDefault()

        if (form.checkValidity() === false) event.stopPropagation()

        setValidated({ validated: true })

        axios.post(paths[action][entity], { ...formData })
            .then(res => {
                if (action === LOGIN_ACTION) {
                    context.authenticate(entity, res.data.data, res.data.token)
                    setRedirection(true)
                } else {
                    alert.info(`You are a ${entity === 'company' ? 'representative' : entity} now!`)
                    toggleAction()
                }
            })
            .catch(err => {
                console.log(err.response)
                alert.error(JSON.stringify(err.response.data.error))
            })
    }

    const toggleAction = () => setAction(action === LOGIN_ACTION ? REGISTER_ACTION : LOGIN_ACTION)

    const Component = components[action][entity]

    return (
        redirection
            ? <Redirect to={callbackUrl} />
            : <Component
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
                validated={validated}
                data={formData}
                toggleAction={toggleAction}
            />
    )
}


export default withAlert()(Authentication)