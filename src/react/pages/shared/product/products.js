import React, { useState, useMemo } from 'react'
import axios from 'axios'
import { withAlert } from 'react-alert'
import _uniqBy from 'lodash/uniqBy'
import _map from 'lodash/map'

import Loading from '../../../Components/Loading'
import Error from '../../../Components/Error'

import ToolbarComponent from '../../../Components/Shared/Product/Toolbar'
import ProductComponent from '../../../Components/Shared/Product/Product'
import ProductsComponent from '../../../Components/Shared/Product/Products'

import { useHTTP } from '../../../tools/hooks/http'
import { buildUrl } from '../../../tools/functions/query'
import { BASE_URL, PRODUCT, COMPANY, GET } from '../../../../config/routes'


const Products = ({ allowActions }) => {
    const [filters, setFilters] = useState([])

    const [selectedProduct, setSelectedProduct] = useState(null)

    const [loading, products, error] = useHTTP(buildUrl(BASE_URL + PRODUCT + GET, null, filters), [filters])

    const companies = useHTTP(BASE_URL + COMPANY + GET, [])[1]
    const categories = useMemo(() => {
        return _uniqBy(products, 'category').map(uniqByCategory => uniqByCategory.category)
    }, [products])


    const handleSelectFilter = ({ target }) => setFilters({ ...filters, [target.name]: target.value })

    const handleSelectProduct = stringified => {
        const product = JSON.parse(stringified)
        setSelectedProduct(product)
    }

    const makeConsultation = () => {
        console.log('consultantion by: ', selectedProduct)
    }

    const makeOrder = () => {
        console.log('order of: ', selectedProduct)
    }

    return (
        <div className='products-wrapper'>
            <div className='filter animated-slide-up'>
                <ToolbarComponent
                    filters={filters}
                    handleSelectFilter={handleSelectFilter}
                    companies={companies}
                    categories={categories}
                />
            </div>
            <div className='products animated-slide-up'>
                {loading ? <Loading /> :
                    error ? <Error error={error} /> :
                        <ProductsComponent
                            products={products}
                            handleSelectProduct={handleSelectProduct}
                        />
                }
            </div>
            <div className='selected'>
                {selectedProduct &&
                    <ProductComponent
                        product={selectedProduct}
                        allowActions={allowActions}
                        makeConsultation={makeConsultation}
                        makeOrder={makeOrder}
                    />}
            </div>
        </div>
    )
}


export default Products