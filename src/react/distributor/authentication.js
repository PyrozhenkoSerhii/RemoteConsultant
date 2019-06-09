import React, { useState, useContext, useMemo } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { withAlert } from 'react-alert'
import { Button } from 'react-bootstrap'
import SimpleReactValidator from 'simple-react-validator'

import { BASE_URL, REPRESENTATIVE, CUSTOMER, CONSULTANT, POST, AUTHENTICATE } from '../../config/routes'
import globalContext from '../tools/state/context/global-context'

// currently login component is the same for all roles
import LoginComponent from '../Components/Login'

import ConsultantRegisterComponent from '../Components/Consultant/Register'
import CompanyRegisterComponent from '../Components/Company/Register'
import CustomerRegisterComponent from '../Components/Customer/Register'


const LOGIN_ACTION = 'LOGIN'
const REGISTER_ACTION = 'REGISTRATION'

const components = {
    [REGISTER_ACTION]: {
        customer: CustomerRegisterComponent,
        consultant: ConsultantRegisterComponent,
        company: CompanyRegisterComponent
    },
    [LOGIN_ACTION]: {
        customer: LoginComponent,
        consultant: LoginComponent,
        company: LoginComponent
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
    const [redirectUrl, setRedictUrl] = useState(callbackUrl)

    const context = useContext(globalContext)

    const validator = useMemo(() => new SimpleReactValidator({ className: 'text-danger' }), [])

    const handleUpdate = ({ target }) => {
        setFormData({ ...formData, [target.id || target.name]: target.value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        event.target.className += " was-validated";

        setValidated({ validated: true })
        axios.post(paths[action][entity], { ...formData })
            .then(res => {
                if (action === LOGIN_ACTION) {
                    context.authenticate(entity, res.data.data, res.data.token)
                    setRedirection(true)
                } else {
                    alert.info('Successfully!')
                    toggleAction()
                }
            })
            .catch(err => {
                console.log(err.response.data.error)
                alert.error(JSON.stringify(err.response.status === 400 ? `Something wrong with data` : `Unexpected error on the server`))
            })
    }

    const toggleAction = () => setAction(action === LOGIN_ACTION ? REGISTER_ACTION : LOGIN_ACTION)

    const back = () => {
        setRedictUrl('/')
        setRedirection(true)
    }

    const Component = components[action][entity]

    return (
        redirection
            ? <Redirect to={redirectUrl} />
            : (
                <React.Fragment>
                    <Button variant="primary" type="button" onClick={back}>Go back</Button>
                    <Component
                        handleSubmit={handleSubmit}
                        handleUpdate={handleUpdate}
                        validated={validated}
                        data={formData}
                        toggleAction={toggleAction}
                        validator={validator}
                    />
                </React.Fragment>

            )
    )
}


export default withAlert()(Authentication)