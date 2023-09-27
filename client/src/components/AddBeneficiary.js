import React, { useState } from 'react';
import '.././styles/AddBeneficiary.css'
import NavBar from './NavBar';
import Footer from './Footer';
import CustomerService from "../services/CustomerService";
import { useParams,useNavigate } from 'react-router-dom';
import AuthenticationService from "../services/AuthenticationService";

const AddBeneficiary = () => {

  const userId = AuthenticationService.getLoggedInUserName();
  console.log(userId)
  const [formData, setFormData] = useState({
    name: '',
    accountNumber: '',
    address: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CustomerService.addBeneficiary(formData,userId)
    // Handle form submission, e.g., send data to the server or perform validation

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
          <button type="submit" style ={{"margin-left":"100px"}}>Add Beneficiary</button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default AddBeneficiary;
