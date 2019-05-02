import React, { useState } from 'react'
import axios from 'axios'
import { withAlert } from 'react-alert'
import _filter from 'lodash/filter'
import _some from 'lodash/some'
import _pull from 'lodash/pull'
import _intersection from 'lodash/intersection'

import Loading from '../../Components/Loading'
import Error from '../../Components/Error'
import CertificateComponent from '../../Components/Company/Certificates'

import { useHTTP } from '../../tools/hooks/http';
import { buildUrl } from '../../tools/functions/query'
import { BASE_URL, CERTIFICATE, GET, COMPANY, PATCH } from '../../../config/routes'


const Certificate = ({ company, alert }) => {
    const [companyCertificates, setCompanyCertificates] = useState(company.certificates)
    const [loading, certificates, error] = useHTTP(buildUrl(BASE_URL + CERTIFICATE + GET), [])

    const moveCertificate = certificateId => {
        axios.patch(buildUrl(BASE_URL + COMPANY + PATCH, company._id), { field: 'certificates', value: certificateId })
            .then(response => {
                if (response.status === 200) {
                    setCompanyCertificates(response.data.data.certificates)
                }
            })
            .catch(err => alert.error(err.response.data.error))
    }


    return (
        loading ? <Loading /> :
            !certificates ? <Error error={error} /> :
                <CertificateComponent
                    company={companyCertificates}
                    all={_filter(certificates, value => !_some(companyCertificates, value))}
                    move={moveCertificate}
                />
    )

}


export default withAlert()(Certificate)