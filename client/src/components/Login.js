import React, { useState , useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import ".././styles/Login.css";
// import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import AuthenticationService from "../services/AuthenticationService";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import CustomerService from "../services/CustomerService";

function Login() {
  // React States

  const history = useNavigate(); //PROGRAMMATICALLY NAVIGATE TI ANOTHER COMPONENT

  // defining state  for email and passwordwith initial value
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [msgCondition, setmsgCondition] = useState(null);
  const [customer,setCustomer] =useState({})

  const divStyles = {
    color: msgCondition ? "green" : "red",
  };

  // method to handle login
  const handleLogin = async () => {
    if (!userId || !password) {
      // setErrorMessage("Please enter both email or password");
      setMessage("Please enter both email or password");
      return;
    }

    const dealer = { userId, password };

    try {
      const loginSuccess = await AuthenticationService.login(dealer); //invoke service method

      if (loginSuccess) {
        setMessage("Login Successful. Redirecting.....");
        setmsgCondition(true);
        AuthenticationService.registerSuccessfullLogin(userId);
        setTimeout(() => {
          history(`../dashboard/${userId}`)
          // history("/about");
        }, 3000);
      } else {
        setMessage("Invalid Email or password");
        setmsgCondition(false);
      }
    } catch (error) {
      console.error("Login error: ", error);

      setMessage("Error occurred while login");
    }
  };

//   useEffect(() => 
//     {
//        CustomerService.getAccountById(userId).then((res)=> {
//         setCustomer(res.data);
//         console.log("customer", res.data);
//        })
        
//     },[customer.accountNo]
// )

  return (
    <div className="app">
      <NavBar></NavBar>

      <div className="login-form form">
      <h2 className="title" style={{ color: 'black' }}>Login to your Account</h2>

        <div className="input-container">
          <label><FontAwesomeIcon icon={faUser} />&nbsp; User Id:</label>

          <input
            type="number"
            value={userId}
            onChange={(e) => 
              {
                console.log(1)
                setUserId(e.target.value)}
              }
          />
        </div>
        <div className="input-container">
          <label><FontAwesomeIcon icon={faLock} />&nbsp; Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary button-container my-3"
          onClick={handleLogin}
        >
          Login
        </button>
        <div style={divStyles}>
          {message && <p className="message">{message}</p>}
        </div>
        <div className="d-flex justify-content-around p-3">
          <div className="button-container1">
            <Link to="/register">New User?</Link>
          </div>
          <div >
            <Link to="/requestemail">Forgot Password?</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
