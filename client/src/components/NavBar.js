import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '../styles/NavBar.css'
import Navbar from 'react-bootstrap/Navbar'
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
        <Navbar className='navbar'>

            <ul className='nav-list'>

                {isUserLoggedIn ? (<>
                    <li className='nav-item'>
                        <Link to="/about" className="nav-link">
                            <span><FontAwesomeIcon icon="bomb"></FontAwesomeIcon></span> &nbsp;
                            About Us</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/addBeneficiary" className="nav-link">
                            <span><FontAwesomeIcon icon="address-book"></FontAwesomeIcon></span> &nbsp;
                            Beneficiary</Link>
                    </li>
                    <li className='nav-item'>
                            <Link to= {`/dashboard/${userName}`} className="nav-link">
                            <span><FontAwesomeIcon icon="dashboard"></FontAwesomeIcon></span> &nbsp;
                                Dashboard</Link>
                    </li>
                    
                    <li className='nav-item'>
                        <Link to="/" className="nav-link" onClick={handleLogout}>
                            <span><FontAwesomeIcon icon="sign-out"></FontAwesomeIcon></span> &nbsp;
                            Logout</Link>
                    </li>
                    <li className='nav-item'>
                    <span className='user-style'><FontAwesomeIcon icon="user"></FontAwesomeIcon> &nbsp; Welcome User: {userName}

                    </span>
                    </li>
                </>) : (
                    <>

                        <li className='nav-item'>
                            <Link to="/register" className="nav-link">
                                <span><FontAwesomeIcon icon="sign"></FontAwesomeIcon></span> &nbsp;
                                Register</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/login" className="nav-link">
                                <span><FontAwesomeIcon icon="sign-in"></FontAwesomeIcon></span> &nbsp;
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
        </Navbar>
    );
}

export default NavBar;