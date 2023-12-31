import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // If you're using React Router
import '.././styles/Logout.css'
import NavBar from './NavBar';
import Footer from "./Footer";
import AdminLoginService from "../services/AdminLoginService";
import AuthenticationService from "../services/AuthenticationService";
const Logout = () => {
  const history = useNavigate();
  //   const [isLoggedIn, setIsLoggedIn] = useState(false); // Set initial login status

  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn() && !AdminLoginService.isUserLoggedIn()) {
      history('/login');
    }
  }, []);
  const handleLogout = () => {
    // Redirect to the login page (or any other page as needed)
    history('/'); // Make sure to adjust the route accordingly
  };
  const handleLogoutBack = () => {
    // Redirect to the login page (or any other page as needed)
    history('/admin'); // Make sure to adjust the route accordingly
  };
  return (
    <>
      <NavBar />
      <div className="logout-container">
        {/* <NavBar/> */}
        {/* <br/> */}
        <div className="logout-box">
          <h2>Logout</h2>
          <p>Are you sure you want to log out?</p>
          <button className="logout-button" onClick={handleLogout}>
            Yes
          </button>&nbsp;
          <button className="logout-button" onClick={handleLogoutBack}>
            No
          </button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Logout;
