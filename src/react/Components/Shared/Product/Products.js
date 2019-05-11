import React from 'react'
import { Card, Button, CardGroup } from 'react-bootstrap'


const Products = ({ products }) => (
    <CardGroup>
        {products.map(product => (
            <Card className='products-card animated-slide-up' key={product._id}>
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
    </CardGroup>
)


export default Products