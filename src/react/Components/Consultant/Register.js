import React from 'react'
import { Button, Form } from 'react-bootstrap'
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
                            label='Type your username'
                            icon='user-circle'
                            group
                            type='text'
                            validate
                            error='wrong'
                            success='right'
                            id='username'
                            onChange={handleUpdate}
                            value={data.username || ''}
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
                        <MDBRow>
                            <MDBCol md='6'>
                                <MDBInput
                                    label='Type your age'
                                    icon='calendar-alt'
                                    group
                                    type='number'
                                    validate
                                    error='wrong'
                                    success='right'
                                    id='age'
                                    onChange={handleUpdate}
                                    value={data.age || ''}
                                    required
                                />
                            </MDBCol>
                            <MDBCol md='6'>
                                <Form.Group controlId='gender'>
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control
                                        as='select'
                                        onChange={handleUpdate}
                                        value={data.gender || 'Unknown'}
                                    >
                                        <option>unknown</option>
                                        <option>male</option>
                                        <option>female</option>
                                    </Form.Control>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </MDBCol>
                        </MDBRow>
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