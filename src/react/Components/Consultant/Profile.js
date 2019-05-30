import React from 'react'
import moment from 'moment'

import { Image } from 'react-bootstrap'

import { MDBInput, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn, MDBContainer, MDBIcon } from "mdbreact"



const Profile = ({ formData, handleUpdate, handlePopup }) => (
    <div className='profile-wrapper'>
        <div className='profile-info'>
            <div className='profile-left'>
                <Image src={formData.image} rounded />
                <p className='header'>{formData.username}</p>
            </div>

            <div className='profile-right'>
                <p className='header'>Personal Info</p>

                <div className='info-disabled'>
                    <MDBInput
                        label='Fullname'
                        value={formData.fullname}
                        type='text'
                        disabled
                    />
                    <MDBInput
                        label='Gender'
                        value={formData.gender}
                        type='text'
                        disabled
                    />
                    <MDBInput
                        label='Rating'
                        value={formData.rating}
                        type='number'
                        disabled
                    />
                    <MDBInput
                        label='Bill'
                        value={10}
                        type='number'
                        disabled
                    />
                </div>

                <MDBInput
                    label='Email'
                    value={formData.email}
                    onChange={handleUpdate}
                    name='email'
                    type='email'
                />
                <MDBInput
                    label='Username'
                    onChange={handleUpdate}
                    name='username'
                    value={formData.username}
                    type='text'
                />
                <MDBInput
                    label='Age'
                    onChange={handleUpdate}
                    name='age'
                    value={formData.age}
                    type='number'
                />
                <MDBInput
                    label='Phone'
                    onChange={handleUpdate}
                    name='phone'
                    value={formData.phone}
                    type='number'
                />

                <MDBInput
                    label='Info'
                    onChange={handleUpdate}
                    name='info'
                    value={formData.info}
                    type='textarea'
                />
            </div>
        </div>


        <span className='header'>Languages</span>
        <MDBIcon icon="plus-circle" onClick={() => handlePopup('language')} className='icon-add' />

        {formData.languages && formData.languages.map(language => (
            <div className='languages-wrapper' key={language._id}>
                <MDBCard className="text-center">
                    <MDBCardHeader color="primary-color">Verified</MDBCardHeader>
                    <MDBCardBody>
                        <MDBCardTitle>{language.title}</MDBCardTitle>
                        <MDBCardText>{language.level} </MDBCardText>
                    </MDBCardBody>
                    <MDBCardFooter color="primary-color">{moment(language.createdAt).fromNow()}</MDBCardFooter>
                </MDBCard>
            </div>
        ))}

        <div className='profile-company'>
            <span className='header'>Company: <em>{formData.company || 'non employed yet'}</em></span>
            <MDBIcon icon="sync-alt" onClick={() => handlePopup('request')} className='icon-add' />
        </div>

        <div className='profile-certificates'>
            <span className='header'>Certificates</span>
            <MDBIcon icon="sync-alt" onClick={() => handlePopup('certificate')} className='icon-add' />
        </div>


    </div>
)



export default Profile