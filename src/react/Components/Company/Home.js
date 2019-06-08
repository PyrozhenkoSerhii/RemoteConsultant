import React from 'react'
import { Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = ({ company, itemsAvailable, onlineConsultants, newRequests }) => (
    <div className='company-home-wrapper'>
        <div className='company-content-wrapper'>
            <div className='company-image-wrapper'>
                <Image src={company.image} rounded />
                <a className='description' href={company.website}>{company.website}</a>
            </div>
            <div className='company-info-wrapper'>
                <p className='sub-header'>{company.info}</p>
            </div>
        </div>

        <div className='company-digest'>
            <div className='company-digest-item'>
                <p className='sub-header'>Consultants</p>
                <p className='description'>{onlineConsultants} consultants was hired!</p>
                <Link to='/company/consultants'>
                    <Button variant='info'>Find out more</Button>
                </Link>
            </div>
            <div className='company-digest-item'>
                <p className='sub-header'>Requests</p>
                <p className='description'>You have {newRequests} new requests!</p>
                <Link to='/company/requests'>
                    <Button variant='info'>Find out more</Button>
                </Link>
            </div>
            <div className='company-digest-item'>
                <p className='sub-header'>Products</p>
                <p className='description'>{itemsAvailable} items are available now!</p>
                <Link to='/company/products'>
                    <Button variant='info'>Find out more</Button>
                </Link>
            </div>
        </div>
    </div>
)


export default Home