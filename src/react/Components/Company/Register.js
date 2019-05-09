import React from 'react'
import { Button } from 'react-bootstrap'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
} from 'mdbreact'


const RegisterForm = ({ handleSubmit, handleUpdate, toggleAction, data }) => (
    <MDBContainer>
        <MDBRow>
            <MDBCol md='2' />
            <MDBCol md='8'>
                <form
                    className="needs-validation"
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <p className='h5 text-center mb-4'>Register</p>
                    <div className='grey-text'>
                        <MDBInput
                            label='Type your fullname'
                            icon='id-card-alt'
                            group
                            type='text'
                            validate
                            error='wrong'
                            success='right'
                            id='fullname'
                            onChange={handleUpdate}
                            value={data.fullname || ''}
                            required
                        />
                        <MDBInput
                            label='Type your email'
                            icon='envelope'
                            group
                            type='email'
                            validate
                            error='wrong'
                            success='right'
                            id='email'
                            onChange={handleUpdate}
                            value={data.email || ''}
                            required
                        />
                        <MDBInput
                            label='Type your password'
                            icon='lock'
                            group
                            type='password'
                            validate
                            id='password'
                            onChange={handleUpdate}
                            value={data.password || ''}
                            required
                        />
                        <MDBInput
                            label='Type your phone'
                            icon='phone'
                            group
                            type='number'
                            validate
                            error='wrong'
                            success='right'
                            id='phone'
                            onChange={handleUpdate}
                            value={data.phone || ''}
                            required
                        />
                        <MDBInput
                            label='Type company secret'
                            icon='lock'
                            group
                            type='password'
                            validate
                            id='secret'
                            onChange={handleUpdate}
                            value={data.secret || ''}
                            required
                        />
                    </div>
                    <div className='text-center'>
                        <Button variant='success' type='submit'>Register</Button>
                        <Button variant='link' type='button' onClick={toggleAction}>Log in</Button>
                    </div>
                </form>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
)


export default RegisterForm