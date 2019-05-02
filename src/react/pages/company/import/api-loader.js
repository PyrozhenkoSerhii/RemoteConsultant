import React, { useState } from 'react'
import axios from 'axios'
import { withAlert } from 'react-alert'
import { Button } from 'react-bootstrap'
// import Spinner from 'react-bootstrap/Spinner'
import _forEach from 'lodash/forEach'
import _map from 'lodash/map'
import _isObject from 'lodash/isObjectLike'



const reduntantFields = ['_id', 'id', '__v', 'updatedAt', 'createdAt']

const ApiLoader = ({ url, setRawData, alert }) => {
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const makeImport = () => {
        setLoading(true)
        axios.get(url)
            .then(res => {
                setRawData(deepCleen(res))
                setLoading(false)
            })
            .catch(err => alert.error('Something went wrong while fetching'))
    }


    const deepCleen = data => {
        const pureObj = data
        _forEach(pureObj, (value, field) => {
            if (reduntantFields.includes(field)) {
                delete pureObj[field]
            } else if (_isObject(value)) {
                pureObj[field] === deepCleen(value)
            }
        })
        return pureObj
    }

    return (
        <React.Fragment>
            <p className='header'>Data Import</p>
            <p className='sub-header'>Click Button to load the data from {url}</p>
            {loading && <Spinner animation="grow" variant="primary" />}
            {!loaded && <Button onClick={makeImport}>Import products</Button>}
            {loaded && <em>Data was imported</em>}
        </React.Fragment>
    )
}


export default withAlert()(ApiLoader)