import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'


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
                value={props.data.fullname || ''}
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
                value={props.data.email || ''}
                required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="text"
                placeholder="JohnDOE"
                onChange={props.handleUpdate}
                value={props.data.username || ''}
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
                value={props.data.password || ''}
                required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Row>
            <Col>
                <Form.Group controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="18"
                        onChange={props.handleUpdate}
                        value={props.data.age || 0}
                        required
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={props.handleUpdate}
                        value={props.data.gender || 'Unknown'}
                    >
                        <option>unknown</option>
                        <option>male</option>
                        <option>female</option>
                    </Form.Control>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>

        <Form.Group controlId="phone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
                type="text"
                placeholder="(010)1011111 or 0101011111 or 010-101-11-11"
                onChange={props.handleUpdate}
                value={props.data.phone || ''}
                required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
        <Button variant="default" type="button" onClick={props.toggleAction}>Log in</Button>
    </Form >
)


export default RegisterForm