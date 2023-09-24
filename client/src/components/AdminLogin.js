import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import '.././styles/Login.css';
import NavBar from "./NavBar";
import AdminLoginService from "../services/AdminLoginService";

function AdminLogin() {
    // React States

    const history = useNavigate();   //PROGRAMMATICALLY NAVIGATE TI ANOTHER COMPONENT
    // defining state  for email and passwordwith initial value
    const [userId, setUserId] = useState();
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // method to handle login 
    const handleLogin = async () => {
        if (!userId || !password) {
            setErrorMessage('Please enter both email or password');
            return;
        }
        const dealer = { userId, password };

        try {
            console.log('before login const')
            const loginSuccess = await AdminLoginService.login(dealer);    //invoke service method
            console.log('API response: ', loginSuccess);
            if (loginSuccess) {
                setSuccessMessage('Login Successful. Redirecting.....');
                setTimeout(() => {
                    history('/admin');
                }, 3000);
            }
            else {
                setErrorMessage('Invalid Email or password');
            }
        }
        catch (error) {
            console.error('Login error: ', error);
            setErrorMessage('Error occurred while login');
        }
    }


    return (
        <div className="app"   >
            <NavBar></NavBar>
            <br></br>

            <div className='login-form form'>
                <h2 className="title">Login to your Account</h2>
                <div className='input-container'>
                    <label>user id:</label>
                    <input type='number' value={userId} onChange={(e) => setUserId(e.target.value)} />
                </div>
                <div className='input-container'>
                    <label>Password:</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='btn btn-primary button-container' onClick={handleLogin}>Login</button>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                {successMessage && <p className='success-message'>{successMessage}</p>}
            </div>
        </div>
    );
}

export default AdminLogin;
