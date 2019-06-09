import React from 'react'
import { Button } from 'react-bootstrap'
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact'

import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'


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
                                <FormControl className='register-select'>
                                    <InputLabel htmlFor='gender'>Gender</InputLabel>
                                    <Select
                                        onChange={handleUpdate}
                                        id='gender'
                                        name='gender'
                                        value={data.gender || 'unknown'}
                                    >
                                        <MenuItem value='unknown'>Unknown</MenuItem>
                                        <MenuItem value='male'>Male</MenuItem>
                                        <MenuItem value='female'>Female</MenuItem>
                                    </Select>
                                </FormControl>
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