
import React, { useState } from 'react'
import axios from 'axios'
import { withAlert } from 'react-alert'
import ViewIcon from '@material-ui/icons/Visibility'

import Loading from '../../Components/Loading'
import Error from '../../Components/Error'
import CustomTable from '../../Components/Shared/Table/Table'

import { useHTTP } from '../../tools/hooks/http'
import { BASE_URL, CONSULTANT, GET, PATCH } from '../../../config/routes'
import { buildUrl } from '../../tools/functions/query'


const Consultant = ({ company, alert }) => {
    const [modified, setModified] = useState('')
    const [loading, consultants, error] = useHTTP(buildUrl(BASE_URL + CONSULTANT + GET, null, { company: company._id }), [modified])

    const dismissConsultantant = id => {
        axios.patch(buildUrl(BASE_URL + CONSULTANT + PATCH, id), { field: 'company', value: null })
            .then(setModified(id))
            .catch(err => alert(err.pesponse.data.error))
    }

    const columns = [
        { id: 'username', numeric: false, disablePadding: true, label: 'Username' },
        { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
        { id: 'rating', numeric: true, disablePadding: false, label: 'Rating (0-100)' },
        { id: 'phone', numeric: true, disablePadding: false, label: 'Phone' },
        { id: 'online', numeric: true, disablePadding: false, label: 'Online now' },
    ]

    const secondaryOptionIconGetter = () => <ViewIcon />

    const secondaryOptionHandler = () => {
        alert('will be implemented soon')
    }

    return (
        loading ? <Loading /> :
            error ? <Error error={error} /> :
                <CustomTable
                    data={consultants}
                    handleDelete={dismissConsultantant}
                    columns={columns}
                    title='Consultants'
                    secondaryOptionHandler={secondaryOptionHandler}
                    secondaryOptionIconGetter={secondaryOptionIconGetter}
                />
    )
}


export default withAlert()(Consultant)