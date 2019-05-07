import React, { useState } from 'react'
import axios from 'axios'
import _filter from 'lodash/filter'

import RequestComponent from '../../Components/Company/Requests'
import { buildUrl } from '../../tools/functions/query'
import { BASE_URL, COMPANY, PATCH } from '../../../config/routes'

import CustomTable from '../../Components/Table/Table'


const Request = ({ company, alert }) => {
    const [requests, setRequests] = useState(company.requests)

    const handleResolve = (approved, request) => {
        axios.patch(buildUrl(BASE_URL + COMPANY + PATCH, `${id}/request`), { approved, request })
            .then(setRequests(_filter(requests, value => value._id !== request._id)))
            .catch(err => alert(err.response.data.error))
    }

    const columns = [
        { id: 'consultant', numeric: false, disablePadding: true, label: 'Person' },
        { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
        { id: 'message', numeric: false, disablePadding: true, label: 'Message' },
    ]

    return (
        <CustomTable
            data={requests}
            title='Requests'
            columns={columns}
            handleResolve={handleResolve}
        />
    )
}


export default Request