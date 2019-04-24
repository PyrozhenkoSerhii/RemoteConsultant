import React from 'react'
import { Button, Form } from 'react-bootstrap'


const RegisterForm = props => (
    <Form
        noValidate
        validated={props.validated}
        onSubmit={e => props.handleSubmit(e)} >
        <Form.Group controlId="fullname">
            <Form.Label>Full name</Form.Label>
            <Form.Control
                type="text"
                placeholder="John Doe"
                onChange={props.handleUpdate}
                value={props.data.fullname}
                required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                type="email"
                placeholder="email@example.com"
                onChange={props.handleUpdate}
                value={props.data.email}
                required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Password123"
                onChange={props.handleUpdate}
                value={props.data.password}
                required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="phone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
                type="text"
                placeholder="(010)1011111 or 0101011111 or 010-101-11-11"
                onChange={props.handleUpdate}
                value={props.data.phone}
                required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="secret">
            <Form.Label>Secret</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter the secret provided by your company"
                onChange={props.handleUpdate}
                value={props.data.secret}
                required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
        <Button variant="default" type="button" onClick={props.toggleAction}>Log in</Button>
    </Form >
)


export default RegisterForm