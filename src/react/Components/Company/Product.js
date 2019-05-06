import React from 'react'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import _map from 'lodash/map'
import _isObject from 'lodash/isObjectLike'


const renderDeep = (data, base) => {
    if (_isObject(data)) {
        return _map(data, (value, key) => {
            if (_isObject(value)) {
                return renderDeep(value)
            } else {
                return <ListGroupItem key={key} className='product-spec'>{key}:{value}</ListGroupItem>
            }
        })
    } else {
        return <ListGroupItem className='product-spec'>{base}:{data}</ListGroupItem>
    }
}

const Product = ({ product, allowActions, handleEdit, handleDelete }) => (
    <Card border='success' className='product-card' key={product._id}>
        <Card.Img className='product-image' variant='top' src={product.image} />
        <Card.Body>
            <Card.Title className='product-title'>{product.title}</Card.Title>
            <Card.Subtitle className='product-category'>{product.category}</Card.Subtitle>
            <Card.Text className='product-description'>{product.description}</Card.Text>
            <ListGroup className='list-group-flush'>
                {renderDeep(product.specification, 'specification')}
            </ListGroup>
        </Card.Body>
        <Card.Footer>
            <div className='product-price-quantity-wrapper'>
                <Card.Text className='product-price'>{product.price}$</Card.Text>
                <Card.Text className='product-quantity'>{product.quantity} pc</Card.Text>
            </div>
            {allowActions &&
                <div className='product-actions-wrapper'>
                    <Button onClick={() => handleEdit(id)} variant='warning'>Edit</Button>
                    <Button onClick={() => handleDelete(id)} variant='danger'>Remove</Button>
                </div>
            }
        </Card.Footer>
    </Card>
)



export default Product