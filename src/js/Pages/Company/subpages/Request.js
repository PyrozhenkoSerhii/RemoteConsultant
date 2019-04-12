import React, { useState } from 'react'
import { withAlert } from 'react-alert'
import axios from 'axios'
import _filter from 'lodash/filter'

import RequestComponent from '../../../Components/Company/Request'
import { buildUrl } from '../../../functions/query'
import { BASE_URL, COMPANY, PATCH } from '../../../../config/routes'


const Request = ({ company, alert }) => {
    const [requests, setRequests] = useState(company.requests)

    const handleRequest = (approved, request) => {
        axios.patch(buildUrl(BASE_URL + COMPANY + PATCH, `${id}/request`), { approved, request })
            .then(setRequests(_filter(requests, value => value._id !== request._id)))
            .catch(err => alert(err.response.data.error))
    }

    return <RequestComponent
        requests={requests}
        handleRequest={handleRequest}
    />
}


export default Request