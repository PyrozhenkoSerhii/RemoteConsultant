import React from 'react'
import { Card, Button, CardGroup } from 'react-bootstrap'


const Representative = ({ representatives, remove }) => (
    <div className='representatives-wrapper'>
        <CardGroup>
            {representatives.map(representative => (
                <Card className='representatives-card' key={representative._id} style={{ width: '18rem' }}>
                    <Card.Img className='representatives-image' variant='top' src={representative.image} />
                    <Card.Body>
                        <Card.Title className='representatives-title'>{representative.fullname}</Card.Title>
                        <Card.Text className='representatives-text'>{representative.note}</Card.Text>
                        <Button onClick={() => remove(representative._id)} variant='danger'>Remove</Button>
                    </Card.Body>
                </Card>
            ))}
        </CardGroup>
    </div>
)


export default Representative