import React, { useState } from 'react'
import axios from 'axios'
import { withAlert } from 'react-alert'

import RepresentativeComponent from '../../../Components/Company/Representative'
import Loading from '../../../Components/Loading'
import Error from '../../../Components/Error'

import { useHTTP } from '../../../hooks/http'
import { BASE_URL, REPRESENTATIVE, GET, DELETE } from '../../../../config/routes'
import { buildUrl } from '../../../functions/query'


const Representative = ({ company, alert }) => {
    const [modified, setModified] = useState('')
    const [loading, representatives, error] = useHTTP(buildUrl(BASE_URL + REPRESENTATIVE + GET, null, { company: company._id }), [modified])

    const removeRepresentative = id => {
        axios.delete(buildUrl(BASE_URL + REPRESENTATIVE + DELETE, id))
            .then(setModified(id))
            .catch(error => alert(error.response.data.error))
    }

    return (
        loading ? <Loading /> :
            !representatives ? <Error error={error} /> :
                <RepresentativeComponent
                    representatives={representatives}
                    remove={removeRepresentative}
                />
    )
}


export default withAlert()(Representative)