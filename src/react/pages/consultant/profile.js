import React, { useState, useContext } from 'react'
import axios from 'axios'
import { withAlert } from 'react-alert'

import ProfileComponent from '../../Components/Consultant/Profile'
import PopupComponent from '../../Components/Shared/Popup'

import { BASE_URL, CONSULTANT, PATCH, POST, GET, LIST, COMPANY, CERTIFICATE } from '../../../config/routes'
import globalContext from '../../tools/state/context/global-context'

import { useHTTP } from '../../tools/hooks/http'


const getPopup = (data, type) => {
    const popups = {
        language: {
            title: 'Add new Language',
            structure: [
                {
                    name: 'langTitle',
                    label: 'Language title',
                    type: 'text',
                    icon: 'globe'
                },
                {
                    name: 'langCertificateId',
                    label: 'Certificate ID',
                    type: 'text',
                    icon: 'key'
                },
                {
                    name: 'langLevel',
                    label: 'Level',
                    type: 'select',
                    options: [
                        { 'value': 'A1', 'label': 'A1 (Beginner)' },
                        { 'value': 'A2', 'label': 'A2 (Pre-intermediate)' },
                        { 'value': 'B1', 'label': 'B1 (Intermediate)' },
                        { 'value': 'B2', 'label': 'B2 (Upper-intermediate)' },
                        { 'value': 'C1', 'label': 'C1 (Advanced)' },
                        { 'value': 'C2', 'label': 'C2 (Profficient)' },
                    ]
                },
            ]
        },
        certificate: {
            title: 'Add new Certificate',
            structure: [
                {
                    name: 'certTitle',
                    label: 'Certificate title',
                    type: 'text',
                    icon: 'address-card'
                },
                {
                    name: 'certType',
                    label: 'Type',
                    type: 'select',
                    options: [
                        { 'value': 'Genaral', 'label': 'General' },
                        { 'value': 'PC', 'label': 'Personal Computers' },
                        { 'value': 'Phones', 'label': 'Phones' },
                        { 'value': 'Laptops', 'label': 'Laptops' },
                        { 'value': 'Hardware', 'label': 'Hardware' },
                        { 'value': 'Software', 'label': 'Software' },
                        { 'value': 'Other', 'label': 'Other' }
                    ]
                },
                {
                    name: 'certId',
                    label: 'Certificate Code',
                    type: 'text',
                    icon: 'key'
                },
                {
                    name: 'note',
                    label: 'A small note',
                    type: 'textarea',
                    icon: 'edit'
                },
                {
                    name: 'certImage',
                    label: 'Certificate photo/file',
                    type: 'file',
                    icon: 'edit'
                },
            ]
        },
        request: {
            title: 'Send request to company',
            structure: [
                {
                    name: 'reqMessage',
                    label: 'Message to employers',
                    type: 'textarea',
                    icon: 'edit'
                },
                {
                    name: 'reqCompanyId',
                    label: 'Company title',
                    type: 'select',
                    options: data
                }
            ]
        }
    }
    return popups[type]
}

const Profile = ({ consultant, alert }) => {
    const [loading, companies, error] = useHTTP(BASE_URL + COMPANY + GET, [])

    const [timer, setTimer] = useState(null)
    const [formData, setFormData] = useState(consultant)

    const [activePopup, setActivePopup] = useState(null)
    const [checking, setChecking] = useState(false)

    const context = useContext(globalContext)

    const handleUpdate = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })

        setupTimer({ field: target.name, value: target.value }, 1000)
    }

    const handlePopup = type => setActivePopup(type)

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

    const handleLanguageSubmit = event => {
        event.preventDefault()
        setChecking(true)

        setTimeout(() => {
            setActivePopup(null)
            setChecking(false)

            axios.patch(BASE_URL + CONSULTANT + PATCH + consultant._id, {
                field: 'languages',
                value: {
                    title: formData.langTitle,
                    level: formData.langLevel
                }
            }).then(res => {
                setFormData(prev => ({ ...prev, langTitle: null, level: null, ...res.data.data }))
                context.update('consultant', res.data.data)
            }).catch(err => {
                alert.error('Sorry. An error occurred!')
                console.log(err.response.data.error)
            })
        }, 1000)
    }

    const handleCertificateSubmit = event => {
        event.preventDefault()
        setChecking(true)

        setTimeout(() => {
            setActivePopup(null)
            setChecking(false)

            const data = new FormData()
            data.append('title', formData.certTitle)
            data.append('type', formData.certType)
            data.append('note', formData.note)
            data.append('file', formData.certImage)

            axios.patch(BASE_URL + CONSULTANT + PATCH + consultant._id + '/' + CERTIFICATE, data)
                .then(res => {
                    setFormData(prev => ({ ...prev, certTitle: null, certType: null, note: null, certImage: null, ...res.data.data }))
                    context.update('consultant', res.data.data)
                })
                .catch(err => {
                    alert.error('Sorry. An error occurred!')
                    console.log(err.response.data.error)
                })
        }, 1000)
    }

    const handleRequestSubmit = event => {
        event.preventDefault()
        setChecking(true)

        setTimeout(() => {
            setActivePopup(null)
            setChecking(false)

            axios.patch(BASE_URL + COMPANY + PATCH + formData.reqCompanyId, {
                field: 'requests',
                value: {
                    consultant: consultant._id,
                    message: formData.reqMessage
                }
            }).then(res => {
                setFormData(prev => ({ ...prev, reqMessage: null }))
                alert.success('Request was sent!')
            }).catch(err => {
                alert.error('Sorry. An error occurred!')
                console.log(err.response.data.error)
            })
        }, 1000)
    }

    const handlePopupUpdate = ({ target }) => {
        if (target.type === 'file') setFormData({ ...formData, [target.name]: target.files[0] })
        else setFormData({ ...formData, [target.name]: target.value })
    }

    console.log(consultant)

    const renderPopup = () => {
        let popupData = null
        let submitHandler = null
        switch (activePopup) {
            case 'language':
                popupData = getPopup(null, 'language')
                submitHandler = handleLanguageSubmit
                break;
            case 'request':
                popupData = getPopup(companies.map(company => ({ value: company._id, label: company.title })), 'request')
                submitHandler = handleRequestSubmit
                break;
            case 'certificate':
                popupData = getPopup(null, 'certificate')
                submitHandler = handleCertificateSubmit
                break;
        }

        return <PopupComponent
            title={popupData.title}
            structure={popupData.structure}
            formData={formData}
            handleUpdate={handlePopupUpdate}
            handleSubmit={submitHandler}
            handlePopup={handlePopup}
            checking={checking}
        />
    }

    return (
        <React.Fragment>
            <ProfileComponent
                formData={formData}
                handleUpdate={handleUpdate}
                handlePopup={handlePopup}
            />
            {activePopup && renderPopup()}
        </React.Fragment>

    )

}


export default withAlert()(Profile)
