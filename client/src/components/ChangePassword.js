import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '.././styles/ChangePassword.css'
import Footer from './Footer';
import NavBar from './NavBar';
const ChangePassword
 = () => {
  const history= useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(1);
      const response = await fetch('http://localhost:8083/ppb/customer/changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, password: newPassword }),
      });
      console.log(2);
      // const data = await response.json();
      console.log(3);
      history('/login');
      console.log(4);
    } catch (error) {
      console.error('Error:');
    }
  };

  return (
    <div className='app-changePassword'>
    <NavBar/>
    <div className="form-container-changePassword">
      <h2>CHANGE PASSWORD</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-changePassword" style={{"width":"330px"}}
        >
          
          <label className='label-changePassword'>Email:</label>
          <input
            type="email"
            value={email}
            className="input-field-changePassword"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group-changePassword">
          <label className='label-changePassword'>OTP:</label>
          <input
            type="text"
            value={otp}
            className="input-field-changePassword"
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div className="form-group-changePassword">
          <label className='label-changePassword'>New Password:</label>
          <input
            type="password"
            value={newPassword}
            className="input-field-changePassword"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button-changePassword">Change Password</button>
      </form>
    </div>
    <div className='footer-changePassword'>
    <Footer/>
    </div>
    
    </div>
  );
  
};

export default ChangePassword;
