import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'


const Navigation = ({ context, entity, title }) => (
    <Navbar sticky="top" bg="light" variant="light" expand="lg">
        {title && <Navbar.Brand>{title.toUpperCase()}</Navbar.Brand>}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Link className="nav-link" to="/company">Home</Link>
                <Link className="nav-link" to="/company/certificates">Certificates</Link>
                <Link className="nav-link" to="/company/consultants">Consultants</Link>
                <Link className="nav-link" to="/company/products">Products</Link>
                <Link className="nav-link" to="/company/products/import">Import</Link>
                <Link className="nav-link" to="/company/representatives">Representatives</Link>
                <Link className="nav-link" to="/company/requests">Requests</Link>
            </Nav>
            <Nav>
                <Link className="nav-link" to="/">Back</Link>
                <Link className="nav-link" to="/company" onClick={() => context.logout(entity)}>Logout</Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)


export default Navigation