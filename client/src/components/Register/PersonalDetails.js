import React, { useState } from 'react';
import '.././../styles/AccountDetails.css'
import NavBar from '../NavBar';

const AccountDetails = () => {
  const [formData, setFormData] = useState({
    name: '',
    fathername: '',
    mothername:'',
    mobile:'',
    email:'',
    aadhar:'',
    dob:'',
    occType:'',
    incomeSource:'',
    grossAnnualIncome:'',
    currentAddress: '',
    permanentAddress: '',
  
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to the backend or perform further processing here
    console.log('Form Data:', formData);
  };

  return (
    <>
    <NavBar/>
    <br></br>
    <div className="personal-details-form">
      <h2>Personal Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-field form-column">
            <label htmlFor="firstName">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="fathername">Father's Name:</label>
            <input
              type="text"
              id="fathername"
              name="fathername"
              value={formData.fathername}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="mothername">Mother's Name:</label>
            <input
              type="text"
              id="mothername"
              name="mothername"
              value={formData.mothername}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="aadhar">Aadhar Card Number:</label>
            <input
              type="text"
              id="aadhar"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="occType">Occupation Type:</label>
            <input
              type="date"
              id="occType"
              name="occType"
              value={formData.occType}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="incomeSource">Income Source:</label>
            <input
              type="date"
              id="incomeSource"
              name="incomeSource"
              value={formData.incomeSource}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="grossAnnualIncome">Gross Annual Income:</label>
            <input
              type="text"
              id="grossAnnualIncome"
              name="grossAnnualIncome"
              value={formData.grossAnnualIncome}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="addressLine1">Address Line 1:</label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="permanentAddress">Permanent Address:</label>
            <input
              type="text"
              id="permanentAddress"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="occupation">Occupation:</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="occupationType">Occupation Type:</label>
            <input
              type="text"
              id="occupationType"
              name="occupationType"
              value={formData.occupationType}
              onChange={handleChange}
            />
          </div>
         
        </div>
        {/* <div className="form-row">
          <button type="submit">Submit</button>
        </div> */}
      </form>
    </div>
    
    </>
  );
};

export default AccountDetails;
