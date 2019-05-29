import React from 'react'
import { Image, Button } from 'react-bootstrap'
import { MDBInput } from 'mdbreact';


const Profile = ({ formData, handleUpdate }) => (
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

        <div className='profile-certificates'>
            <p className='header'>Certificates</p>

        </div>

        <div className='profile-languages'>
            <p className='header'>Languages</p>

        </div>

        <div className='profile-company'>
            <p className='header'>Company</p>

        </div>


    </div>
)


export default Profile