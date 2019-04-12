
import React, { useState } from 'react'
import axios from 'axios'
import { withAlert } from 'react-alert'

import Loading from '../../../Components/Loading'
import Error from '../../../Components/Error'
import ConsultantComponent from '../../../Components/Company/Consultant'

import { useHTTP } from '../../../hooks/http'
import { BASE_URL, CONSULTANT, GET, PATCH } from '../../../../config/routes'
import { buildUrl } from '../../../functions/query'

const Consultant = ({ data: company, alert }) => {
    const [modified, setModified] = useState('')
    const [loading, consultants, error] = useHTTP(buildUrl(BASE_URL + CONSULTANT + GET, null, { company: company._id }), [modified])

    const dismissConsultantant = id => {
        axios.patch(buildUrl(BASE_URL + CONSULTANT + PATCH, id), { field: 'company', value: null })
            .then(setModified(id))
            .catch(err => alert(err.pesponse.data.error))
    }

    return (
        loading ? <Loading /> :
            !consultants ? <Error error={error} /> :
                < ConsultantComponent
                    consultants={consultants}
                    dismiss={dismissConsultantant}
                />
    )
}


export default withAlert()(Consultant)