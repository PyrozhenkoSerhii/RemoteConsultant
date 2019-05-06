import React, { useState } from 'react'
import axios from 'axios'
import { withAlert } from 'react-alert'
import { Button } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'
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
                setLoaded(true)
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
        <div className='animated-slide-down'>
            <p className='header'>Data Import</p>
            <p className='sub-header'>Click Button to load the data from {url}</p>
            {!loading && !loaded && <Button variant={loaded ? 'success' : 'primary'} onClick={makeImport}>Import products</Button>}
            {!loading && loaded &&  <p className='info-success'>Sucessfully loaded. You can switch over to the next step</p>}
            {loading && <Spinner animation="border" variant="primary" />}
        </div>
    )
}


export default withAlert()(ApiLoader)