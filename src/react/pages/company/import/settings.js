import React, { useState } from 'react'
import { withAlert } from 'react-alert'
import axios from 'axios'

import SettingsComponent from '../../../Components/Company/Import/Settings'
import { BASE_URL, COMPANY, PATCH, IMPORT_CONFIG } from '../../../../config/routes'


const Settings = ({ company, settings, setSettings, apiMode, fileMode, alert }) => {
    const [timer, setTimer] = useState(null)
    const [formData, setFormData] = useState(settings)

    const handleSettingsUpdate = ({ target: { id: field, value } }) => {
        const data = { ...formData, [field]: value }
        setFormData(data)
        sendRequest(data, 1000)
    }

    const handleModeUpdate = mode => {
        const data = { ...formData, mode }
        setFormData(data)
        sendRequest(data, 0)
    }

    const sendRequest = (data, delay) => {
        if (timer) clearTimeout(timer)

        setTimer(setTimeout(() => {
            axios.patch(BASE_URL + COMPANY + PATCH + `${company._id}/` + IMPORT_CONFIG, { importConfig: data })
                .then(res => {
                    setSettings(res.data.data.importConfig)
                    alert.info('Changes saved!')
                })
                .catch(err => {
                    console.log(err.response.data.error)
                    alert.error('Something went wrong :(')
                })
        }, delay))
    }


    return (
        <SettingsComponent
            apiMode={apiMode}
            fileMode={fileMode}
            formData={formData}
            handleModeUpdate={handleModeUpdate}
            handleSettingsUpdate={handleSettingsUpdate}
        />
    )
}


export default withAlert()(Settings)