import React from 'react'
import { Button, Form } from 'react-bootstrap'

const LoginForm = props => (
    <Form
        noValidate
        validated={props.validated}
        onSubmit={e => props.handleSubmit(e)} >

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

        <Button variant="primary" type="submit">Submit</Button>
    </Form>
)


export default LoginForm