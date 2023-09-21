import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // If you're using React Router
import '.././styles/Logout.css'
import NavBar from './NavBar';

const Logout = () => {
  const history = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Set initial login status

  const handleLogout = () => {
    // Redirect to the login page (or any other page as needed)
    history('/login'); // Make sure to adjust the route accordingly
  };
  const handleLogoutBack = () => {
    // Redirect to the login page (or any other page as needed)
    history('/about'); // Make sure to adjust the route accordingly
  };
  return (
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
  );
};

export default Logout;
