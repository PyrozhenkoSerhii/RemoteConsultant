import React from 'react'
import { Image } from 'react-bootstrap'

const Main = ({ company }) => (
    <div className='company-home-wrapper'>
        <div className='company-content-wrapper'>
            <div className='company-image-wrapper'>
                <Image src={company.image} rounded />
                <p className='description'>{company.website}</p>
            </div>
            <div className='company-info-wrapper'>
                <p className='sub-header'>{company.info}</p>
            </div>
        </div>
    </div>
)


export default Main