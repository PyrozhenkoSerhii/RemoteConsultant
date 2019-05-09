import React from 'react'
import { Button } from 'react-bootstrap'
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact'


const LoginForm = ({ handleUpdate, handleSubmit, toggleAction, data }) => (
    <MDBContainer>
        <MDBRow>
            <MDBCol md='3' />
            <MDBCol md='6' >
                <form
                    className="needs-validation"
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <p className='h5 text-center mb-4'>Sign in</p>
                    <div className='grey-text'>
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
                    </div>
                    <div className='text-center'>
                        <Button variant='success' type='submit'>Sign in</Button>
                        <Button variant='link' type='button' onClick={toggleAction}>Create an Account</Button>
                    </div>
                </form>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
)


export default LoginForm