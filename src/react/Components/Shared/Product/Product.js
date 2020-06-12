import React from 'react'
import { MDBCard, MDBCardBody, MDBCardHeader, MDBBtn } from "mdbreact"
import _map from 'lodash/map'

const Product = ({ product, allowActions, makeOrder, makeConsultation }) => (
    <MDBCard style={{ marginTop: "1rem" }}>
        <MDBCardHeader color="primary-color">{product.title}</MDBCardHeader>
        <MDBCardBody>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
            {product.specification && _map(product.specification, (value, key) => (
                <p key={key}>{key}: {JSON.stringify(value)}</p>
            ))}
            {allowActions && <MDBBtn color="primary-color" onClick={makeConsultation}>Get a consultion</MDBBtn>}
            {allowActions && <MDBBtn color="primary-color" onClick={makeOrder}>Order</MDBBtn>}
        </MDBCardBody>
    </MDBCard>
)


export default Product