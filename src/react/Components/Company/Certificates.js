import React from 'react'
import { Card, Button, CardGroup } from 'react-bootstrap'


const Certificate = ({ company, move, all }) => (
    <div className='certificates-wrapper'>

        <div className='certificates-company'>
            <p className='header'>Your trusted certificates</p>
            <CardGroup>
                {!company.length && (
                    <div className='certificates-empty'>
                        <p className='description'>You can add some certificates that you approve as a trusted resource.</p>
                        <p className='description'>It means that consultants with this certificate have an opportunity to be hired by your company</p>
                    </div>
                )}
                {company.length > 0 && company.map(certificate => (
                    <Card className='certificates-card' key={certificate._id} style={{ width: '18rem' }}>
                        <Card.Img className='certificates-image' variant='top' src={certificate.image} />
                        <Card.Body>
                            <Card.Title className='certificates-title'>{certificate.title}</Card.Title>
                            <Card.Text className='certificates-text'>{certificate.note}</Card.Text>
                            <Button onClick={() => move(certificate._id)} variant='danger'>Remove</Button>
                        </Card.Body>
                    </Card>
                ))}
            </CardGroup>
        </div>

        <div className='certificates-all'>
            <p className='header'>All available certificates</p>
            <CardGroup>
                {!all.length && (
                    <div className='certificates-empty'>
                        <p className='description'>There is no awailable certificates. </p>
                        <p className='description'>If You haven't found the one you needed, please, contact our support group.</p>
                    </div>
                )}
                {all.length > 0 && all.map(certificate => (
                    <Card className='certificates-card' key={certificate._id} style={{ width: '18rem' }}>
                        <Card.Img className='certificates-image' variant='top' src={certificate.image} />
                        <Card.Body>
                            <Card.Title className='certificates-title'>{certificate.title}</Card.Title>
                            <Card.Text className='certificates-text'>{certificate.note}</Card.Text>
                            <Button onClick={() => move(certificate._id)} variant='success'>Add</Button>
                        </Card.Body>
                    </Card>
                ))}
            </CardGroup>
        </div>

    </div>
)


export default Certificate