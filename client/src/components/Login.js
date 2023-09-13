// https://prod.liveshare.vsengsaas.visualstudio.com/join?F287B5983575697C6D6B0C626C3A96F9ADF2

import React, { useState } from "react";
import ReactDOM from "react-dom";
// import {useNavigate} from 'react-router-dom';
// import { Link } from "react-router-dom";
// import loginImg from 'C:/Users/Administrator/Desktop/PrestigePrimeBank/client/public/images/logo-image.jpg'
// import loginImg from '../images/logo-image.jpg'

import '.././styles/Login.css'

function Login() {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // const navigate=useNavigate();
    // const handleClick = () => {
    //     navigate('/other');
    // }
    // User Login info
    const database = [
        {
            username: "user1",
            password: "pass1"
        },
        {
            username: "user2",
            password: "pass2"
        }
    ];

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.username === uname.value);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
            }
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname"  placeholder="Enter your CustomerId here!" required />
                
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" placeholder="Enter your Password here!" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (
        <div>
            <div className="splitScreen">
                <div className="login-form">
                    <div className="title">Login to your Account</div>
                        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
                    <div className="button-container1">
                         <p>First Time User?</p>
                         {/* <button onClick={handleClick}>First time user?</button> */}
                            {/* <ul className='first-time'>
                            <li className='first'>
                                <Link to="/login" className="first-times">Login</Link>
                            </li>
                            </ul> */}
                    </div>
                    <div className="button-container1">
                         <p>Forget UserID?</p>
                    </div>
                    <div className="button-container1">
                        <p>Forgot Password?</p>
                    </div>
                </div>
                <div className="bottomPane">
                    {/* --------dmchwejwe */}
                    <img className="side_image"
                        style={{
                            width:'70%', 
                            height:'60%', 
                            marginTop:'auto',
                            marginBottom:'auto',
                        }} 
                        src="../images/logo-image.jpg" alt="LOGIN-IMAGE"/>
                </div>
            </div>
        </div>
        // <div >
        //     <grid className="app">
        //         <div className="abc d-flex align-items-start">
        //         <div className="login-form">
        //             <div className="title">Login to your Account</div>
        //             {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        //             <div className="button-container1">
        //                 <p>First Time User?</p>
        //             </div>
        //             <div className="button-container1">
        //                 <p>Forget UserID?</p>
        //             </div>
        //             <div className="button-container1">
        //                 <p>Forgot Password?</p>
        //             </div>

        //         </div>
        //         </div>
                
        // <div className="app2">
        // <img style={{width:'80%', height:'300px', marginTop:'40%',marginRight:'20%'}} src="../images/logo-image.jpg" alt="LOGIN-IMAGE"/>
        // </div>
        // </grid>
        // </div>

































        // <div >
        //     <grid className="app">
        //         <div className="abc d-flex align-items-start">
        //         <div className="login-form">
        //             <div className="title">Login to your Account</div>
        //             {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        //             <div className="button-container1">
        //                 <p>First Time User?</p>
        //             </div>
        //             <div className="button-container1">
        //                 <p>Forget UserID?</p>
        //             </div>
        //             <div className="button-container1">
        //                 <p>Forgot Password?</p>
        //             </div>

        //         </div>
        //         </div>
        //         {/* <section className="def"> 
        //         <div className="image-login">
        //             <img src="../images/logo-image.jpg" alt="LOGIN-IMAGE"/>
        //             </div>
        //         </section> */}
                
            
        // <div className="app2">
        // <img style={{width:'80%', height:'300px', marginTop:'40%',marginRight:'20%'}} src="../images/logo-image.jpg" alt="LOGIN-IMAGE"/>
        // </div>
        // </grid>
        // </div>
    );
}

export default Login;