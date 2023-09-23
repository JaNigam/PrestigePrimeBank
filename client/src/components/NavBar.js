import React from 'react';
import {Link} from 'react-router-dom'
import '../styles/NavBar.css'
const NavBar = () =>{
    return(
        <nav className='navbar'>

            <ul className='nav-list'>
                <li className='nav-item'>
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/about" className="nav-link">About Us</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/addBeneficiary" className="nav-link">Beneficiary</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;