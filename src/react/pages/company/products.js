import React, { useState } from 'react'
import axios from 'axios'
import { withAlert } from 'react-alert'
import ViewIcon from '@material-ui/icons/Visibility'

import Loading from '../../Components/Loading'
import Error from '../../Components/Error'

import CustomTable from '../../Components/Shared/Table/Table'


import { useHTTP } from '../../tools/hooks/http'
import { BASE_URL, PRODUCT, GET, DELETE, PUT, BATCH_DELETE } from '../../../config/routes'
import { buildUrl } from '../../tools/functions/query'


const Product = ({ company, alert }) => {
    const [modifiedProduct, setModifiedProduct] = useState(null)

    const [loading, products, error] = useHTTP(buildUrl(BASE_URL + PRODUCT + GET, null, { company: company._id }), [modifiedProduct])

    const handleDelete = (products) => {
        if (products.length === 1) {
            axios.delete(buildUrl(BASE_URL + PRODUCT + DELETE, products[0]))
                .then(res => {
                    alert.info(res.data.message)
                    setModifiedProduct(products[0])
                })
                .catch(err => alert.error(err.response.data.error))
        } else {
            axios.post(buildUrl(BASE_URL + PRODUCT + BATCH_DELETE), products)
                .then(res => {
                    alert.info(res.data.message)
                    setModifiedProduct(products[0])
                })
                .catch(err => alert.error(err.response.data.error))
        }
    }


    const columns = [
        { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
        { id: 'category', numeric: true, disablePadding: false, label: 'Category' },
        { id: 'price', numeric: true, disablePadding: false, label: 'Price ($)' },
        { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
        { id: 'description', numeric: true, disablePadding: false, label: 'Description' },
    ]

    const secondaryOptionIconGetter = () => <ViewIcon />

    const secondaryOptionHandler = () => {
        alert('will be implemented soon')
    }

    return (
        loading ? <Loading /> :
            error ? <Error error={error} /> :
                <CustomTable
                    data={products}
                    handleDelete={handleDelete}
                    columns={columns}
                    title='Products'
                    secondaryOptionIconGetter={secondaryOptionIconGetter}
                    secondaryOptionHandler={secondaryOptionHandler}
                />
    )
}


export default withAlert()(Product)