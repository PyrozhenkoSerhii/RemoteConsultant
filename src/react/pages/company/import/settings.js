import React, { useState } from 'react'
import _filter from 'lodash/filter'

import SettingsComponent from '../../../Components/Company/Import/Settings'


const Settings = ({ settings, apiMode, fileMode, updateSettings, pattern, handleSetPattern }) => {
    const [timer, setTimer] = useState(null)
    const [formData, setFormData] = useState(settings)

    const sendRequest = (data, delay) => {
        if (timer) clearTimeout(timer)

        setTimer(setTimeout(() => updateSettings(data), delay))
    }

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

    const handleDeletePattern = id => {
        const newData = { ...formData, patterns: _filter(formData.patterns, pattern => pattern._id !== id) }
        setFormData(newData)
        sendRequest(newData, 0)
    }

    return (
        <SettingsComponent
            apiMode={apiMode}
            fileMode={fileMode}
            formData={formData}
            handleModeUpdate={handleModeUpdate}
            handleSettingsUpdate={handleSettingsUpdate}
            handleDeletePattern={handleDeletePattern}
            currentPattern={pattern}
            handleSetPattern={handleSetPattern}
        />
    )
}


export default Settings