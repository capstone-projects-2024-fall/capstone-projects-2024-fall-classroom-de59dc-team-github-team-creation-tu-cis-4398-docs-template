import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import logo from './logo.png'

const Navbar = () => {
    return (
        <nav>
            <Link to="/Home"> {/* Make the image a clickable link */}
                <img src={logo} alt="Logo" className="logo" />
            </Link>
            <div className="nav-links">
                <Link to="/landing">Home</Link>
                <Link to="/Home">Plant</Link>
                <Link to="/about">About</Link>
                <Link to="/chat">AI Chat</Link>
            </div>
        </nav>
    );
};

export default Navbar;
