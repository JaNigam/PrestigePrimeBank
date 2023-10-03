import React, { useState, useEffect } from 'react';
import '.././styles/AddBeneficiary.css'
import NavBar from './NavBar';
import Footer from './Footer';
import CustomerService from "../services/CustomerService";
import { useNavigate } from 'react-router-dom';
import AuthenticationService from "../services/AuthenticationService";


const AddBeneficiary = () => {
  const history = useNavigate();
  const userId = AuthenticationService.getLoggedInUserName();
  const [msgCondition, setmsgCondition] = useState(null);
  const [message, setMessage] = useState("");


  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn()) {
      history('/login');
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    accountNumber: '',
    address: '',
    email: '',
    phone: '',
  });

  const divStyles = {
    color: msgCondition ? "green" : "red",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    try{
    e.preventDefault();
    CustomerService.addBeneficiary(formData,userId)
    alert('Action processed successfully!')
    history('/viewBeneficiary')
    // Handle form submission, e.g., send data to the server or perform validation
    }
    catch(error){
      console.log("error adding beneficiary" , error )
    
    }

  };

  return (
    <>
    <NavBar/>
    <br></br>
    <div className="add-beneficiary">
      <h2>Add Beneficiary</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="beneficiaryName">Name:</label>
          <input
            type="text"
            id="beneficiaryName"
            name="beneficiaryName"
            value={formData.beneficiaryName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="beneficiaryNickName;">Nick Name:</label>
          <input
            type="text"
            id="beneficiaryNickName;"
            name="beneficiaryNickName;"
            value={formData.beneficiaryNickName}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="beneficiaryAccNo">Account Number:</label>
          <input
            type="text"
            id="beneficiaryAccNo"
            name="beneficiaryAccNo"
            value={formData.beneficiaryAccNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
        {/* Define an inline arrow function in the onClick event */}
        <button
          type="submit"
          style={{ marginLeft: "50px" }}
          
        >
          Add Beneficiary
        </button>
      </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};


export default AddBeneficiary;
