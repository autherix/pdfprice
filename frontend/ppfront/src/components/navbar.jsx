import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { UserContext } from './contexts/UserContext';

import './styles/navbar.scss';

import { useState } from 'react';

export const MyNavbar = () => {
    const { user, setUser } = useContext(UserContext);
    const [searchText, setSearchText] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    const NavLow = () => {
        return (
            <div className="navbar myLowNavbar">
                directories here
            </div>
        );
    };

    const NavMiddle = () => {
        return (
            <div className="container">
                <div className="myNavTitle">
                    <a className="navbar-brand myNavTitle" href="/">PDF Price</a>
                </div>
                <div className="d-flex">
                    <form className="me-2">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={searchText} onChange={handleSearchTextChange} />
                    </form>
                    <select value={selectedFilter} onChange={handleFilterChange} className="form-select-sm ms-auto" aria-label="Default select example">
                        <option value="All">All</option>
                        <option value="Filter1">Filter1</option>
                        <option value="Filter2">Filter2</option>
                        <option value="Filter3">Filter3</option>
                    </select>
                </div>
                <NavLow />
            </div >
        )
    };

    const WholeNav = () => {
        return (
            <div className="container myHighNavbar">
                welcome to this website !
                <NavMiddle />
            </div>
        );
    };


    return (
        <nav className="navbar navbar-dark bg-dark allNav">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top navbar-toggleable-sm sticky-top navbar-expand">
                <div className="container">
                    <a className="navbar-brand" href="/">PDF Price</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
                            </li>
                            <li className="nav-item">
                                <Nav.Link as={Link} to="/about" className="nav-link">About</Nav.Link>
                            </li>
                        </ul>
                        {user ? (
                            <ul className="navbar-nav ms-lg-auto">
                                <li className="nav-item">
                                    <Nav.Link as={Link} to="/logout" className="nav-link">Logout</Nav.Link>
                                </li>
                                <li className="nav-item">
                                    <Nav.Link as={Link} to="/dashboard" className="nav-link">{user.name}</Nav.Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav ms-lg-auto">
                                <li className="nav-item">
                                    <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
                                </li>
                                <li className="nav-item">
                                    <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
            {/* <WholeNav /> */}
        </nav>
    );
};

export default MyNavbar;
