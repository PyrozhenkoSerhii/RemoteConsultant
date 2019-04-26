import React from 'react'
import axios from 'axios'
import { withAlert } from 'react-alert'
import { Button } from 'react-bootstrap'


const ApiLoader = ({ url, setRawData, alert }) => {
    const makeImport = () => {
        axios.get(url)
            .then(res => {
                const data = res.data.data
                setRawData(data)

            })
            .catch(err => alert('Something went wrong while fetching'))
    }

    return url
        ? <Button onClick={makeImport}>Import products</Button>
        : <p>You need to specify url first!</p>
}


export default withAlert()(ApiLoader)