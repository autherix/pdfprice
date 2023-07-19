import React from 'react';
import { useState } from 'react';   
import '../../styles/dashboard.scss';


function Navbar() {
    const menuItems = ['Item 1', 'Item 2', 'Item 3'];
    const [isMenuVisible, setMenuVisible] = useState(false);

    setMenuVisible(!isMenuVisible);
    return (
        <div className="dashboard-navbar">
            <nav className="navbar top-nav sticky-top navbar-expand-lg navbar-dark bg-dark navbar-toggleable-sm">
                <button className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`navbar-collapse ${isMenuVisible ? 'show' : ''}`}>
                    <ul className="navbar-nav mr-auto">
                        {menuItems.map((item, index) => (
                            <li className="nav-item" key={index}>
                                <a className="nav-link" href="#">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Item 4</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Item 5</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Item 6</a>
                    </li>
                    <button className="btn btn-primary floating-menu-btn px-3">
                        Open Menu
                    </button>
                </ul>
            </nav>

            <div className={`menu-container ${isMenuVisible ? 'visible' : ''}`}>
                <ul className="menu-items">
                    {menuItems.map((item, index) => (
                        <li className="menu-item" key={index}>
                            <a href="#">{item}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Navbar
