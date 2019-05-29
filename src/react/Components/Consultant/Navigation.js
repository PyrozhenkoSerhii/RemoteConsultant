import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'


const Navigation = ({ context, entity }) => (
    <Navbar sticky="top" bg="light" variant="light" expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Link className="nav-link" to="/consultant">Home</Link>
                <Link className="nav-link" to="/consultant/profile">Profile</Link>
                <Link className="nav-link" to="/consultant/chat">Chat</Link>
                <Link className="nav-link" to="/consultant/profile">Profile</Link>
            </Nav>
            <Nav>
                <Link className="nav-link" to="/">Back</Link>
                <Link className="nav-link" to="/consultant" onClick={() => context.logout(entity)}>Logout</Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)


export default Navigation