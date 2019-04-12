import React, { useState } from 'react'
import axios from 'axios'
import { withAlert } from 'react-alert'

import Loading from '../../../Components/Loading'
import Error from '../../../Components/Error'
import ProductComponent from '../../../Components/Company/Product'

import { useHTTP } from '../../../hooks/http'
import { BASE_URL, PRODUCT, GET, DELETE, PUT } from '../../../../config/routes'
import { buildUrl } from '../../../functions/query'


const Product = ({ company, alert }) => {
    const [modified, setModified] = useState('')

    // _id of product which is editable now
    const [editMode, setEditMode] = useState(null)

    const [loading, products, error] = useHTTP(buildUrl(BASE_URL + PRODUCT + GET, null, { company: company._id }), [modified])

    const editProduct = (id, product) => {
        axios.put(buildUrl(BASE_URL + PRODUCT + PUT, id), product)
            .then(setModified(id))
            .catch(err => alert(err.response.data.error))
            .finally(setEditMode(null))
    }

    const deleteProduct = id => {
        axios.delete(buildUrl(BASE_URL + PRODUCT + DELETE, id))
            .then(setModified(id))
            .error(err => alert(err.response.data.error))
    }


    return (
        loading ? <Loading /> :
            !products ? <Error error={error} /> :
                <ProductComponent
                    products={products}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    delete={deleteProduct}
                    edit={editProduct}
                />

    )
}


export default withAlert()(Product)