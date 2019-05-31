import React, { useState, useMemo } from 'react'
import axios from 'axios'
import _filter from 'lodash/filter'
import _find from 'lodash/find'
import moment from 'moment'
import DoneOutline from '@material-ui/icons/DoneOutline'
import { withAlert } from 'react-alert'


import { BASE_URL, COMPANY, PATCH, REQUEST } from '../../../config/routes'

import CustomTable from '../../Components/Table/Table'


const Request = ({ company, alert }) => {
    const [requests, setRequests] = useState(company.requests)

    const restructuredRequests = useMemo(() => {
        return requests.map(request => {
            return {
                _id: request._id,
                consultant: request.consultant.fullname,
                message: request.message,
                languages: request.consultant.languages.map(lang => `${lang.title}-${lang.level}`).join(' / '),
                date: moment(request.createdAt).fromNow()
            }
        })
    }, [requests])


    const handleResolve = (approved, request) => {
        axios.patch(BASE_URL + COMPANY + PATCH + company._id + REQUEST, { approved, request })
            .then(res => {
                console.log(res)
                setRequests(_filter(requests, value => value._id !== request._id))
            })
            .catch(err => alert(err.response.data.error))
    }

    const approveRequest = id => {
        handleResolve(true, _find(requests, { _id: id }))
    }

    const rejectRequest = ids => {
        handleResolve(false, _find(requests, { _id: ids[0] }))
    }


    const columns = [
        { id: 'consultant', numeric: false, disablePadding: true, label: 'Person' },
        { id: 'languages', numeric: true, disablePadding: false, label: 'Languages' },
        { id: 'message', numeric: true, disablePadding: false, label: 'Message' },
        { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
    ]

    const secondaryOptionIconGetter = () => <DoneOutline />

    return (
        <CustomTable
            data={restructuredRequests}
            title='Requests'
            columns={columns}
            handleDelete={rejectRequest}
            secondaryOptionHandler={approveRequest}
            secondaryOptionIconGetter={secondaryOptionIconGetter}
        />
    )
}


export default withAlert()(Request)