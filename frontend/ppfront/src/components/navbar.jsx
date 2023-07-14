import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './styles/navbar.css';

const NavbarHead = ({ user }) => {
    return (
        <Navbar className="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark px-5" data-bs-theme="dark">
            <Navbar.Brand href="/" >PDF Price</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
                    <Nav.Link as={Link} to="/about" className="nav-link">About</Nav.Link>
                </Nav>
                {user ? (
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/profile" className="nav-link">{user.name}</Nav.Link>
                        <Nav.Link as={Link} to="/logout" className="nav-link">Logout</Nav.Link>
                    </Nav>
                ) : (
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
                        <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarHead;
