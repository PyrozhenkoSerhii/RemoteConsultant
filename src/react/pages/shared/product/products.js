import React, {useState} from 'react'
import axios from 'axios'
import { withAlert } from 'react-alert'

import Loading from '../../../Components/Loading'
import Error from '../../../Components/Error'
import Toolbar from './toolbar'
import ProductsComponent from '../../../Components/Shared/Product/Products'

import { useHTTP } from '../../../tools/hooks/http'
import { buildUrl } from '../../../tools/functions/query'
import { BASE_URL, PRODUCT, GET } from '../../../../config/routes'


const Products = () => {
    const [filters, setFilters] = useState([])

    const [loading, products, error] = useHTTP(buildUrl(BASE_URL + PRODUCT + GET, null, filters), [filters])


    return (
        <div className='products-wrapper'>
            <Toolbar
                filters={filters} 
                setFilters={setFilters}
            />
            <div className='products'>
                {loading ? <Loading /> :
                    error ? <Error error={error} /> :
                        <ProductsComponent
                            products={products}
                        />
                }
            </div>
        </div>
    )
}


export default Products