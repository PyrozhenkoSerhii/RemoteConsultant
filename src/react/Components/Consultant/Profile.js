import React from 'react'
import moment from 'moment'

import { Image } from 'react-bootstrap'
import { MDBInput, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn, MDBContainer, MDBIcon, MDBCardImage } from "mdbreact"

import renderImage from '../../tools/functions/imageRenderer'

const renderCompanyInfo = (company) => {
    if (!company) return 'Not employed yet'

    return `${company.title} (${company.website})`
}


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

        <div className='languages-wrapper'>
            {formData.languages && formData.languages.map(language => (
                <MDBCard className="text-center" key={language._id}>
                    <MDBCardHeader color="primary-color">Verified</MDBCardHeader>
                    <MDBCardBody>
                        <MDBCardTitle>{language.title}</MDBCardTitle>
                        <MDBCardText>{language.level} </MDBCardText>
                    </MDBCardBody>
                    <MDBCardFooter color="primary-color">{moment(language.createdAt).fromNow()}</MDBCardFooter>
                </MDBCard>
            ))}
        </div>

        {/* <div className='profile-company'>
            <span className='header'>Company: <em>{renderCompanyInfo(formData.company)}</em></span>
            <MDBIcon icon="sync-alt" onClick={() => handlePopup('request')} className='icon-add' />
        </div> */}

        <div className='profile-certificates'>
            <span className='header'>Certificates</span>
            <MDBIcon icon="sync-alt" onClick={() => handlePopup('certificate')} className='icon-add' />

            {formData.certificate && <MDBCard style={{ width: "22rem" }}>
                <MDBCardImage className="img-fluid" src={renderImage(formData.certificate.image)} waves />
                <MDBCardBody>
                    <MDBCardTitle>{formData.certificate.title} ({formData.certificate.type})</MDBCardTitle>
                    <MDBCardText>{formData.certificate.note}</MDBCardText>
                </MDBCardBody>
            </MDBCard>}
        </div>


    </div>
)



export default Profile