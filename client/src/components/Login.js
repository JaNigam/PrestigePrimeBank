import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import '.././styles/Login.css'
// import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import AuthenticationService from '../services/AuthenticationService'
import {Link} from 'react-router-dom'

function Login() {
  // React States

    // ************//***************** */
    const history = useNavigate();   //PROGRAMMATICALLY NAVIGATE TI ANOTHER COMPONENT
    // defining state  for email and passwordwith initial value
    const [userId,setUserId] = useState();
    const [password,setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    // ************//***************** */


  // method to handle login 
  const handleLogin = async () =>{
    if(!userId || !password){
        setErrorMessage('Please enter both email or password');
        return;
    }
    // const emailed = Number(email)
    // const num= 
    const dealer = {userId,password};

    try{
      console.log('before login const')
        const loginSuccess = await AuthenticationService.login(dealer);    //invoke service method
        console.log('API response: ',loginSuccess);
        if(loginSuccess){
            setSuccessMessage('Login Successful. Redirecting.....');
            setTimeout(() => {
                history('/about');
            }, 3000);
            
        }
        else{
            setErrorMessage('Invalid Email or password');
        }
    }
    catch(error){
        console.error('Login error: ',error);
        setErrorMessage('Error occurred while login');
    }

    
}




  return (
  <div className="app"   >
      <NavBar></NavBar>
      {/* <br></br> */}

      <div className='login-form form'>
        <h2 className="title">Login to your Account</h2>
          <div className='input-container'>
            <label>User Id</label>
              <input type='number' value={userId} onChange={(e) => setUserId(e.target.value)} />
          </div>
          <div className='input-container'>
            <label>Password</label>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='btn btn-primary button-container' onClick={handleLogin}>Login</button>
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
          {successMessage && <p className='success-message'>{successMessage}</p>}
          <div className="button-container1">
            {/* <p>First Time User?</p> */}
            <Link to="/register">First Time User?</Link>
          </div>
          <div className="button-container1">
            {/* <p>Forget UserID?</p> */}
            <Link to="/register">Forget UserID?</Link>
          </div>
          <div className="button-container1">
            {/* <p>Forgot Password?</p> */}
            <Link to="/register">Forgot Password?</Link>
          </div>
      </div>
    </div>
  );
}

export default Login;









































// import React, { useState } from "react";
// import ReactDOM from "react-dom";

// import '.././styles/Login.css'

// function Login() {
//     // React States
//     const [errorMessages, setErrorMessages] = useState({});
//     const [isSubmitted, setIsSubmitted] = useState(false);

//     // User Login info
//     const database = [
//         {
//             username: "user1",
//             password: "pass1"
//         },
//         {
//             username: "user2",
//             password: "pass2"
//         }
//     ];

//     const errors = {
//         uname: "invalid username",
//         pass: "invalid password"
//     };

//     const handleSubmit = (event) => {
//         //Prevent page reload
//         event.preventDefault();

//         var { uname, pass } = document.forms[0];

//         // Find user login info
//         const userData = database.find((user) => user.username === uname.value);

//         // Compare user info
//         if (userData) {
//             if (userData.password !== pass.value) {
//                 // Invalid password
//                 setErrorMessages({ name: "pass", message: errors.pass });
//             } else {
//                 setIsSubmitted(true);
//             }
//         } else {
//             // Username not found
//             setErrorMessages({ name: "uname", message: errors.uname });
//         }
//     };

//     // Generate JSX code for error message
//     const renderErrorMessage = (name) =>
//         name === errorMessages.name && (
//             <div className="error">{errorMessages.message}</div>
//         );

//     // JSX code for login form
//     const renderForm = (
//         <div className="form">
//             <form onSubmit={handleSubmit}>
//                 <div className="input-container">
//                     <label>Username </label>
//                     <input type="text" name="uname"  placeholder="Enter your CustomerId here!" required />
                
//                     {renderErrorMessage("uname")}
//                 </div>
//                 <div className="input-container">
//                     <label>Password </label>
//                     <input type="password" name="pass" placeholder="Enter your Password here!" required />
//                     {renderErrorMessage("pass")}
//                 </div>
//                 <div className="button-container">
//                     <input type="submit" />
//                 </div>
//             </form>
//         </div>
//     );

//     return (
//         <div>
//             <div className="splitScreen">
//                 <div className="login-form">
//                     <div className="title">Login to your Account</div>
//                         {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
//                     <div className="button-container1">
//                          <p>First Time User?</p>
//                          {/* <button onClick={handleClick}>First time user?</button> */}
//                             {/* <ul className='first-time'>
//                             <li className='first'>
//                                 <Link to="/login" className="first-times">Login</Link>
//                             </li>
//                             </ul> */}
//                     </div>
//                     <div className="button-container1">
//                          <p>Forget UserID?</p>
//                     </div>
//                     <div className="button-container1">
//                         <p>Forgot Password?</p>
//                     </div>
//                 </div>
//                 <div className="bottomPane">
//                     {/* --------dmchwejwe */}
//                     <img className="side_image"
//                         style={{
//                             width:'70%', 
//                             height:'60%', 
//                             marginTop:'auto',
//                             marginBottom:'auto',
//                         }} 
//                         src="../images/logo-image.jpg" alt="LOGIN-IMAGE"/>
//                 </div>
//             </div>
//         </div>
//         // <div >
//         //     <grid className="app">
//         //         <div className="abc d-flex align-items-start">
//         //         <div className="login-form">
//         //             <div className="title">Login to your Account</div>
//         //             {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
//         //             <div className="button-container1">
//         //                 <p>First Time User?</p>
//         //             </div>
//         //             <div className="button-container1">
//         //                 <p>Forget UserID?</p>
//         //             </div>
//         //             <div className="button-container1">
//         //                 <p>Forgot Password?</p>
//         //             </div>

//         //         </div>
//         //         </div>
                
//         // <div className="app2">
//         // <img style={{width:'80%', height:'300px', marginTop:'40%',marginRight:'20%'}} src="../images/logo-image.jpg" alt="LOGIN-IMAGE"/>
//         // </div>
//         // </grid>
//         // </div>

































//         // <div >
//         //     <grid className="app">
//         //         <div className="abc d-flex align-items-start">
//         //         <div className="login-form">
//         //             <div className="title">Login to your Account</div>
//         //             {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
//         //             <div className="button-container1">
//         //                 <p>First Time User?</p>
//         //             </div>
//         //             <div className="button-container1">
//         //                 <p>Forget UserID?</p>
//         //             </div>
//         //             <div className="button-container1">
//         //                 <p>Forgot Password?</p>
//         //             </div>

//         //         </div>
//         //         </div>
//         //         {/* <section className="def"> 
//         //         <div className="image-login">
//         //             <img src="../images/logo-image.jpg" alt="LOGIN-IMAGE"/>
//         //             </div>
//         //         </section> */}
                
            
//         // <div className="app2">
//         // <img style={{width:'80%', height:'300px', marginTop:'40%',marginRight:'20%'}} src="../images/logo-image.jpg" alt="LOGIN-IMAGE"/>
//         // </div>
//         // </grid>
//         // </div>
//     );
// }

// export default Login;