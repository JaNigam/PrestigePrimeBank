import React, { useState } from "react";
import ReactDOM from "react-dom";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import Address from "./Address";
import {Row,Col} from "react-bootstrap"
import AuthenticationService from '../services/AuthenticationService'
// import '.././styles/Login.css'




import Form from "./Form"
import { FormProvider } from './FormContext'

function Register() {

  return (
    <FormProvider>
      <Form />
    </FormProvider>
  )

}

export default Register;

// function Login() {

//   const history = useNavigate();
//   // React States
//   // const [errorMessages, setErrorMessages] = useState({});
//   // const [isSubmitted, setIsSubmitted] = useState(false);
//   const [dealer, setDealer] = useState({
//     email: '',
//     fname: '',
//     lname: '',
//     adhaarNo: '',
//     password: '',
//     dob: '',
//     phoneNo: '',
//     currentAddress: {
//       addressLine1: '',
//       addressLine2: '',
//       state: '',
//       city: '',
//       pincode: ''
//     },
//     permanentAddress: {
//       addressLine1: '',
//       addressLine2: '',
//       state: '',
//       city: '',
//       pincode: ''
//     },
//     fatherName:'father',
//     motherName:'mother',
//     occType:'doctor',
//     incomeSource:'doctor',
//     grossAnualIncome:'24',
//     optForNetBanking: 'false'

//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setDealer((prevDealer) => ({
//         ...prevDealer,
//         [parent]: {
//           ...prevDealer[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setDealer((prevDealer) => ({
//         ...prevDealer,
//         [name]: value
//       }));
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();     //prevent page refresh
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         await AuthenticationService.registerDealer(dealer);
//         setSuccessMessage('Registration successful!');
//         alert("Registration Successfull");
//         setTimeout(() => {
//           history('/login'); // navigates to Login Component
//         }, 3000);

//       }

//       catch (error) {
//         console.error('Registration error', error);
//         setSuccessMessage('An error occurred during registration.');
//       }
//     } else {
//       setErrors(validationErrors);
//     }
//   };


//   const validateForm = () => {
//     let validationErrors = {};

//     if (!dealer.email) {
//       validationErrors.email = 'Email is required.';
//     }
//     if (!dealer.fname) {
//       validationErrors.fname = 'First name is required.';
//     }
//     else if (!/^[a-zA-Z]*$/.test(dealer.fname)) {
//       validationErrors.fname = 'Enter Alphabets Only';
//     }

//     if (!dealer.lname) {
//       validationErrors.lname = 'Last name is required.';
//     }

//     if (!dealer.password) {
//       validationErrors.password = 'Password is required.';
//     } else if (dealer.password.length < 6) {
//       validationErrors.password = 'Password must be at least 6 characters.';
//     }

//     // if (!dealer.dob) {
//     //   validationErrors.dob = 'Date of Birth is required.';
//     // }

//     if (!dealer.phoneNo) {
//       validationErrors.phoneNo = 'Phone number is required.';
//     } else if (!/^\d{10}$/.test(dealer.phoneNo)) {
//       validationErrors.phoneNo = 'Invalid phone number. Please enter a 10-digit number.';
//     }

//     if (!dealer.currentAddress.state) {
//       validationErrors['currentAddress.state'] = 'state is required.';
//     }

//     // if (!dealer.address.city) {
//     //   validationErrors['address.city'] = 'City is required.';
//     // }

//     if (!dealer.currentAddress.pincode) {
//       validationErrors['currentAddress.pincode'] = 'Pin Code is required.';
//     }

//     return validationErrors;
//   };


//   return (
    
//     <div className="app">
//       <NavBar/>
//       {/* <br></br> */}
//       <div className="login-form registration-container">

//         {/* <div className='registration-container'> */}
//           <h2 className="title">Register your Account here</h2>
//           {successMessage && <p className="success-message">{successMessage}</p>}
//           <form onSubmit={handleSubmit}>
//             <Row>
//             <Col className="form-group input-container">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={dealer.email}
//                 onChange={handleChange}
//                 className={errors.email && 'error'}
//               />
//               {errors.email && <p className="error-message">{errors.email}</p>}
//             </Col>
            
//             <Col className="form-group input-container">
//               <label>First Name</label>
//               <input
//                 type="text"
//                 name="fname"
//                 value={dealer.fname}
//                 onChange={handleChange}
//                 className={errors.fname && 'error'}
//               />
//               {errors.fname && <p className="error-message">{errors.fname}</p>}
//             </Col>

//             <Col className="form-group input-container">
//               <label>Last Name</label>
//               <input
//                 type="text"
//                 name="lname"
//                 value={dealer.lname}
//                 onChange={handleChange}
//                 className={errors.lname && 'error'}
//               />
//               {errors.lname && <p className="error-message">{errors.lname}</p>}
//             </Col>
//             </Row>

//             < Row>
//             <Col className="form-group input-container">
//               <label>Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={dealer.password}
//                 onChange={handleChange}
//                 className={errors.password && 'error'}
//               />
//               {errors.password && <p className="error-message">{errors.password}</p>}
//             </Col>

//             <Col className="form-group input-container">
//               <label>Date of Birth</label>
//               <input
//                 type="date"
//                 name="dob"
//                 value={dealer.dob}
//                 onChange={handleChange}
//                 className={errors.dob && 'error'}
//               />
//               {errors.dob && <p className="error-message">{errors.dob}</p>}
//             </Col>
//             </Row>

//             <div className="form-group input-container">
//               <label>Phone Number</label>
//               <input
//                 type="text"
//                 name="phoneNo"
//                 value={dealer.phoneNo}
//                 onChange={handleChange}
//                 className={errors.phoneNo && 'error'}
//               />
//               {errors.phoneNo && <p className="error-message">{errors.phoneNo}</p>}
//             </div>

//             <div className="form-group input-container">
//               <label>Address Line 1</label>
//               <input
//                 type="text"
//                 name="CurrentAddress.addressLine1"
//                 value={dealer.currentAddress.addressLine1}
//                 onChange={handleChange}
//                 className={errors['currentAddress.addressLine1'] && 'error'}
//               />
//               {errors['currentAddress.addressLine1'] && <p className="error-message">{errors['currentAddress.addressLine1']}</p>}
//             </div>

//             <div className="form-group input-container">
//               <label>Address Line 2</label>
//               <input
//                 type="text"
//                 name="CurrentAddress.addressLine2"
//                 value={dealer.currentAddress.addressLine2}
//                 onChange={handleChange}
//                 className={errors['currentAddress.addressLine2'] && 'error'}
//               />
//               {errors['currentAddress.addressLine2'] && <p className="error-message">{errors['currentAddress.addressLine2']}</p>}
//             </div>

//             <div className="form-group input-container">
//               <label>State</label>
//               <input
//                 type="text"
//                 name="CurrentAddress.state"
//                 value={dealer.currentAddress.state}
//                 onChange={handleChange}
//                 className={errors['currentAddress.state'] && 'error'}
//               />
//               {errors['currentAddress.state'] && <p className="error-message">{errors['currentAddress.state']}</p>}
//             </div>

//             {/* <div className="form-group input-container">
//               <label>City</label>
//               <input
//                 type="text"
//                 name="currentAddress.city"
//                 value={dealer.currentAddress.city}
//                 onChange={handleChange}
//                 className={errors['currentAddress.city'] && 'error'}
//               />
//               {errors['currentAddress.city'] && <p className="error-message">{errors['currentAddress.city']}</p>}
//             </div>

//             <div className="form-group input-container">
//               <label>Pincode</label>
//               <input
//                 type="text"
//                 name="currentAddress.pincode"
//                 value={dealer.currentAddress.pincode}
//                 onChange={handleChange}
//                 className={errors['currentAddress.pincode'] && 'error'}
//               />
//               {errors['currentAddress.pincode'] && <p className="error-message">{errors['currentAddress.pincode']}</p>}
//             </div> */}

//             <div className="form-group input-container">
//               <label>Address Line 1</label>
//               <input
//                 type="text"
//                 name="permanentAddress.addressLine1"
//                 value={dealer.permanentAddress.addressLine1}
//                 onChange={handleChange}
//                 className={errors['permanentAddress.addressLine1'] && 'error'}
//               />
//               {errors['permanentAddress.addressLine1'] && <p className="error-message">{errors['permanentAddress.addressLine1']}</p>}
//             </div>

//             <div className="form-group input-container">
//               <label>Address Line 2</label>
//               <input
//                 type="text"
//                 name="permanentAddress.addressLine2"
//                 value={dealer.permanentAddress.addressLine2}
//                 onChange={handleChange}
//                 className={errors['permanentAddress.addressLine2'] && 'error'}
//               />
//               {errors['permanentAddress.addressLine2'] && <p className="error-message">{errors['permanentAddress.addressLine2']}</p>}
//             </div>

//             <div className="form-group input-container">
//               <label>State</label>
//               <input
//                 type="text"
//                 name="permanentAddress.state"
//                 value={dealer.permanentAddress.state}
//                 onChange={handleChange}
//                 className={errors['permanentAddress.state'] && 'error'}
//               />
//               {errors['permanentAddress.state'] && <p className="error-message">{errors['permanentAddress.state']}</p>}
//             </div>

//             <div className="form-group input-container">
//               <label>City</label>
//               <input
//                 type="text"
//                 name="permanentAddress.city"
//                 value={dealer.permanentAddress.city}
//                 onChange={handleChange}
//                 className={errors['permanentAddress.city'] && 'error'}
//               />
//               {errors['permanentAddress.city'] && <p className="error-message">{errors['permanentAddress.city']}</p>}
//             </div>

//             <div className="form-group input-container">
//               <label>Pincode</label>
//               <input
//                 type="text"
//                 name="permanentAddress.pincode"
//                 value={dealer.permanentAddress.pincode}
//                 onChange={handleChange}
//                 className={errors['permanentAddress.pincode'] && 'error'}
//               />
//               {errors['permanentAddress.pincode'] && <p className="error-message">{errors['permanentAddress.pincode']}</p>}
//             </div>

            

//             {/* <div className="form-group input-container"> */}
//               <button type="submit" className="btn btn-primary button-container" onClick={handleSubmit}>
//                 Register
//               </button>
//             {/* </div> */}
//           </form>
//         </div>
//         {/* <div className="title">Register for Internet Banking</div>
//         {isSubmitted ? <div>Account successfully created</div> : renderForm}
//          */}
//       {/* </div> */}
//     </div>
//   );
// }

// export default Login;



// import React, { useState } from "react";
// import styled from "styled-components";
// import logo from "../../../assets/logo.png";
// import { Link, useNavigate } from "react-router-dom";
// import Input from "../Input";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Sidebar = () => {
//     const baseURL = "http://localhost:9080/saveCustomer";
//     const navigate = useNavigate();
//     const [user, setUser] = useState({
//         userId: "",
//         password: "",
//         name: "",
//         email: "",
//         mobile: 0,
//         aadhar: "",
//         dob: "",
//     });

//     const submitFormHandler = (e) => {
//         e.preventDefault();
//         if (user.password.length < 8 || user.password.length > 20) {
//             toast.error("Password must be between 8 and 20 characters", {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//             return; // Stop the submission if the validation fails
//         }

//         if (user.mobile.toString().length !== 10) {
//             toast.error("Mobile number must be 10 digits long", {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//             return; // Stop the submission if the validation fails
//         }

//         if (user.aadhar.toString().length !== 12) {
//             toast.error("Aadhar number must be 12 digits long", {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//             return; // Stop the submission if the validation fails
//         }

//         // if age is less than 18 years, then fail
//         const today = new Date();
//         const birthDate = new Date(user.dob);
//         let age = today.getFullYear() - birthDate.getFullYear();
//         const month = today.getMonth() - birthDate.getMonth();
//         if (
//             month < 0 ||
//             (month === 0 && today.getDate() < birthDate.getDate())
//         ) {
//             age--;
//         }

//         if (age < 18) {
//             toast.error("Age must be greater than 18 years", {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//             return; // Stop the submission if the validation fails
//         }

//         if (age > 120) {
//             toast.error("Age must be less than 120 years", {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//             return; // Stop the submission if the validation fails
//         }

//         axios
//             .post(baseURL, user)
//             .then((res) => {
//                 toast.success(
//                     `The User ${user.name} has been successfully created`,
//                     {
//                         position: "top-right",
//                         autoClose: 5000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "light",
//                     }
//                 );
//                 sessionStorage.setItem("userID", user.userId);
//                 navigate("/dashboard");
//             })
//             .catch((error) => {
//                 console.log(error);
//                 toast.error(`Error: ${error.message}`, {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 });
//             });
//     };

//     return (
//         <Container>
//             <LogoWrapper>
//                 <img src={logo} alt="" />
//                 <h3>
//                     Online <span>Banking System</span>
//                 </h3>
//             </LogoWrapper>
//             <Form onSubmit={submitFormHandler}>
//                 <h3>Sign Up</h3>
//                 <Input
//                     type="text"
//                     placeholder="Full Name"
//                     value="name"
//                     obj={user}
//                     handleInputChange={setUser}
//                 />
//                 <Input
//                     type="text"
//                     placeholder="Username"
//                     value="userId"
//                     obj={user}
//                     handleInputChange={setUser}
//                 />
//                 <Input
//                     type="email"
//                     placeholder="Email"
//                     value="email"
//                     obj={user}
//                     handleInputChange={setUser}
//                 />
//                 <Input
//                     type="password"
//                     placeholder="Password"
//                     value="password"
//                     obj={user}
//                     handleInputChange={setUser}
//                 />
//                 <Input
//                     type="number"
//                     placeholder="Mobile Number"
//                     value="mobile"
//                     obj={user}
//                     handleInputChange={setUser}
//                 />
//                 <Input
//                     type="number"
//                     placeholder="Aadhar Number"
//                     value="aadhar"
//                     obj={user}
//                     handleInputChange={setUser}
//                 />
//                 <Input
//                     type="date"
//                     placeholder="Date of Birth"
//                     value="dob"
//                     obj={user}
//                     handleInputChange={setUser}
//                 />
//                 <button>Sign Up</button>
//             </Form>
//             <div>
//                 <Terms>
//                     By signing up, I agree to the Privacy Policy <br /> and
//                     Terms of Service
//                 </Terms>
//                 <h4>
//                     Already have an account? <Link to="/login">Login</Link>
//                 </h4>
//             </div>
//         </Container>
//     );
// };

// const Terms = styled.p`
//     padding: 0 1rem;
//     text-align: center;
//     font-size: 10px;
//     color: #808080;
//     font-weight: 300;
// `;

// const Form = styled.form`
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     h3 {
//         color: #666666;
//         margin-bottom: 2rem;
//     }

//     button {
//         width: 75%;
//         max-width: 350px;
//         min-width: 250px;
//         height: 40px;
//         border: none;
//         margin: 1rem 0;
//         box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
//         border-radius: 8px;
//         background-color: #70edb9;
//         color: #fff;
//         font-weight: 600;
//         cursor: pointer;
//         transition: all 0.2s ease-in;

//         &:hover {
//             transform: translateY(-3px);
//         }
//     }
// `;

// const LogoWrapper = styled.div`
//     img {
//         height: 6rem;
//         width: 14rem;
//     }

//     h3 {
//         color: #ff8d8d;
//         text-align: center;
//         font-size: 22px;
//     }

//     span {
//         color: #5dc399;
//         font-weight: 300;
//         font-size: 18px;
//     }
// `;

// const Container = styled.div`
//     min-width: 400px;
//     backdrop-filter: blur(35px);
//     background-color: rgba(255, 255, 255, 0.8);
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-evenly;
//     align-items: center;
//     padding: 0 2rem;

//     @media (max-width: 900px) {
//         width: 100vw;
//         position: absolute;
//         padding: 0;
//     }

//     h4 {
//         color: #808080;
//         font-weight: bold;
//         font-size: 13px;
//         margin-top: 2rem;

//         a {
//             color: #ff8d8d;
//             cursor: pointer;
//             text-decoration: none;
//         }
//     }
// `;

// export default Sidebar;















