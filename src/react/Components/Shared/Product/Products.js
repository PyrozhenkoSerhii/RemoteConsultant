import React from 'react'
import { Card } from 'react-bootstrap'


const Products = ({ products, handleSelectProduct }) => (
    <React.Fragment>
        {products.map(product => (
            <Card className='products-card animated-slide-up' key={product._id} onClick={() => handleSelectProduct(JSON.stringify(product))}>
                <Card.Img className='products-image' variant='top' src={product.image} />
                <Card.Body>
                    <Card.Title className='products-title'>{product.title}</Card.Title>
                    <Card.Text className='products-text'>{product.note}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Card.Text>{product.price}$</Card.Text>
                    <Card.Text>{product.quantity > 0 ? 'available' : 'ansent'}</Card.Text>
                </Card.Footer>
            </Card>
        ))}
    </React.Fragment>
)


export default Products