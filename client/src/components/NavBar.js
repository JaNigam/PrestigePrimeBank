import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '../styles/NavBar.css'
import AuthenticationService from '../services/AuthenticationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar = () => {
    const history = useNavigate();
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    const userName = AuthenticationService.getLoggedInUserName();

    const handleLogout = () => {
        AuthenticationService.logout();
    }


    return (
        <nav className='navbar'>

            <ul className='nav-list'>

                {isUserLoggedIn ? (<>
                    <li className='nav-item'>
                        <Link to="/about" className="nav-link">
                            <span><FontAwesomeIcon icon="bomb"></FontAwesomeIcon></span> &nbsp;
                            About Us</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/addBeneficiary" className="nav-link">
                            <span><FontAwesomeIcon icon="bomb"></FontAwesomeIcon></span> &nbsp;
                            Beneficiary</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/" className="nav-link" onClick={handleLogout}>
                            <span><FontAwesomeIcon icon="sign-out"></FontAwesomeIcon></span> &nbsp;
                            Logout</Link>
                    </li>
                </>) : (
                    <>

                        <li className='nav-item'>
                            <Link to="/register" className="nav-link">
                                <span><FontAwesomeIcon icon="bomb"></FontAwesomeIcon></span> &nbsp;
                                Register</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/login" className="nav-link">
                                <span><FontAwesomeIcon icon="bomb"></FontAwesomeIcon></span> &nbsp;
                                Login</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/about" className="nav-link">
                                <span><FontAwesomeIcon icon="bomb"></FontAwesomeIcon></span> &nbsp;
                                About Us</Link>
                        </li>

                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;