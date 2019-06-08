import React, { useState } from 'react'

import ProductContext from '../context/product-context'


const ProductProvider = props => {
    const [product, setProduct] = useState(null)

    const addProduct = product => {
        console.log(product)
        setProduct(product)
    }

    const removeProduct = () => setProduct(null)

    return <ProductContext.Provider value={{ product, addProduct, removeProduct }}>
        {props.children}
    </ProductContext.Provider>
}


export default ProductProvider
