import React, { useState } from "react";
import ReactDOM from "react-dom";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import AuthenticationService from '../services/AuthenticationService'
import '.././styles/Login.css'
// import '.././styles/Register.css'

function Login() {

  const history = useNavigate();
  // React States
  // const [errorMessages, setErrorMessages] = useState({});
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [dealer, setDealer] = useState({
    email: '',
    fname: '',
    lname: '',
    password: '',
    dob: '',
    phoneNo: '',
    address: {
      street: '',
      city: '',
      pincode: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setDealer((prevDealer) => ({
        ...prevDealer,
        [parent]: {
          ...prevDealer[parent],
          [child]: value
        }
      }));
    } else {
      setDealer((prevDealer) => ({
        ...prevDealer,
        [name]: value
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();     //prevent page refresh
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await AuthenticationService.registerDealer(dealer);
        setSuccessMessage('Registration successful!');
        alert("Registration Successfull");
        setTimeout(() => {
          history('/login'); // navigates to Login Component
        }, 3000);

      }

      catch (error) {
        console.error('Registration error', error);
        setSuccessMessage('An error occurred during registration.');
      }
    } else {
      setErrors(validationErrors);
    }
  };


  const validateForm = () => {
    let validationErrors = {};

    if (!dealer.email) {
      validationErrors.email = 'Email is required.';
    }
    if (!dealer.fname) {
      validationErrors.fname = 'First name is required.';
    }
    else if (!/^[a-zA-Z]*$/.test(dealer.fname)) {
      validationErrors.fname = 'Enter Alphabets Only';
    }

    if (!dealer.lname) {
      validationErrors.lname = 'Last name is required.';
    }

    if (!dealer.password) {
      validationErrors.password = 'Password is required.';
    } else if (dealer.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters.';
    }

    // if (!dealer.dob) {
    //   validationErrors.dob = 'Date of Birth is required.';
    // }

    if (!dealer.phoneNo) {
      validationErrors.phoneNo = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(dealer.phoneNo)) {
      validationErrors.phoneNo = 'Invalid phone number. Please enter a 10-digit number.';
    }

    if (!dealer.address.street) {
      validationErrors['address.street'] = 'Street is required.';
    }

    // if (!dealer.address.city) {
    //   validationErrors['address.city'] = 'City is required.';
    // }

    if (!dealer.address.pincode) {
      validationErrors['address.pincode'] = 'Pin Code is required.';
    }

    return validationErrors;
  };
  // Generate JSX code for error message
  // const renderErrorMessage = (name) =>
  //   name === errorMessages.name && (
  //     <div className="error">{errorMessages.message}</div>
  //   );

  // JSX code for login form
  // const renderForm = (
  //   <div className="form">
  //     <form>
  //       <div className="input-container">
  //         <label>Account Number</label>
  //         <input type="text" name="acc_number" required />
  //         {renderErrorMessage("acc_number")}
  //       </div>
  //       <div className="input-container">
  //         <label>Set Login Password </label>
  //         <input type="password" name="login_pass1" required />
  //         {renderErrorMessage("login_pass1")}
  //       </div>
  //       <div className="input-container">
  //         <label>Confirm Login Password </label>
  //         <input type="password" name="login_pass2" required />
  //         {renderErrorMessage("login_pass2")}
  //       </div>
  //       <div className="input-container">
  //         <label>Set Transaction Password </label>
  //         <input type="password" name="transaction_pass1" required />
  //         {renderErrorMessage("transaction_pass1")}
  //       </div>
  //       <div className="input-container">
  //         <label>Confirm Transaction Password </label>
  //         <input type="password" name="transaction_pass2" required />
  //         {renderErrorMessage("transaction_pass2")}
  //       </div>
  //       <div className="input-container">
  //         <label>Enter OTP </label>
  //         <input type="text" name="otp" required />
  //         {renderErrorMessage("otp")}
  //       </div>
  //       <div className="button-container">
  //         <input type="submit" />
  //       </div>
  //     </form>
  //   </div>
  // );

  return (
    
    <div className="app">
      <NavBar/>
      {/* <br></br> */}
      <div className="login-form registration-container">

        {/* <div className='registration-container'> */}
          <h2 className="title">Register your Account here</h2>
          {successMessage && <p className="success-message">{successMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group input-container">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={dealer.email}
                onChange={handleChange}
                className={errors.email && 'error'}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form-group input-container">
              <label>First Name</label>
              <input
                type="text"
                name="fname"
                value={dealer.fname}
                onChange={handleChange}
                className={errors.fname && 'error'}
              />
              {errors.fname && <p className="error-message">{errors.fname}</p>}
            </div>

            <div className="form-group input-container">
              <label>Last Name</label>
              <input
                type="text"
                name="lname"
                value={dealer.lname}
                onChange={handleChange}
                className={errors.lname && 'error'}
              />
              {errors.lname && <p className="error-message">{errors.lname}</p>}
            </div>

            <div className="form-group input-container">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={dealer.password}
                onChange={handleChange}
                className={errors.password && 'error'}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            {/* <div className="form-group input-container">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={dealer.dob}
                onChange={handleChange}
                className={errors.dob && 'error'}
              />
              {errors.dob && <p className="error-message">{errors.dob}</p>}
            </div> */}

            <div className="form-group input-container">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNo"
                value={dealer.phoneNo}
                onChange={handleChange}
                className={errors.phoneNo && 'error'}
              />
              {errors.phoneNo && <p className="error-message">{errors.phoneNo}</p>}
            </div>

            <div className="form-group input-container">
              <label>Street</label>
              <input
                type="text"
                name="address.street"
                value={dealer.address.street}
                onChange={handleChange}
                className={errors['address.street'] && 'error'}
              />
              {errors['address.street'] && <p className="error-message">{errors['address.street']}</p>}
            </div>

            <div className="form-group input-container">
              <label>City</label>
              <input
                type="text"
                name="address.city"
                value={dealer.address.city}
                onChange={handleChange}
                className={errors['address.city'] && 'error'}
              />
              {errors['address.city'] && <p className="error-message">{errors['address.city']}</p>}
            </div>

            <div className="form-group input-container">
              <label>Pincode</label>
              <input
                type="text"
                name="address.pincode"
                value={dealer.address.pincode}
                onChange={handleChange}
                className={errors['address.pincode'] && 'error'}
              />
              {errors['address.pincode'] && <p className="error-message">{errors['address.pincode']}</p>}
            </div>

            {/* <div className="form-group input-container"> */}
              <button type="submit" className="btn btn-primary button-container" onClick={handleSubmit}>
                Register
              </button>
            {/* </div> */}
          </form>
        </div>
        {/* <div className="title">Register for Internet Banking</div>
        {isSubmitted ? <div>Account successfully created</div> : renderForm}
         */}
      {/* </div> */}
    </div>
  );
}

export default Login;



























































