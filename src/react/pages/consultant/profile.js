import React, { useState, useContext } from 'react'
import axios from 'axios'

import ProfileComponent from '../../Components/Consultant/Profile'

import { BASE_URL, CONSULTANT, PATCH } from '../../../config/routes'
import globalContext from '../../tools/state/context/global-context'


const Profile = ({ consultant }) => {
    const [timer, setTimer] = useState(null)
    const [formData, setFormData] = useState(consultant)

    const context = useContext(globalContext)

    const handleUpdate = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })

        setupTimer({ field: target.name, value: target.value }, 1000)
    }

    const setupTimer = (data, delay) => {
        if (timer) clearTimeout(timer)
        setTimer(setTimeout(() => sendRequest(data), delay))
    }

    const sendRequest = data => {
        axios.patch(BASE_URL + CONSULTANT + PATCH + consultant._id, data)
            .then(res => {
                context.update('consultant', res.data.data)
            })
            .catch(err => console.log(err.response.data.error))
    }

    return (
        <ProfileComponent
            formData={formData}
            handleUpdate={handleUpdate}

        />
    )

}


export default Profile