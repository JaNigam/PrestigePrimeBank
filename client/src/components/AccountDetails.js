import React, { useState } from 'react';
import './../styles/AccountDetails.css'
import NavBar from './NavBar';

const AccountDetails = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fathersName: '',
    mobileNumber: '',
    email: '',
    aadharCardNumber: '',
    dateOfBirth: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    permanentAddress: '',
    occupation: '',
    occupationType: '',
    debitCard: false,
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
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="fathersName">Father's Name:</label>
            <input
              type="text"
              id="fathersName"
              name="fathersName"
              value={formData.fathersName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
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
            <label htmlFor="aadharCardNumber">Aadhar Card Number:</label>
            <input
              type="text"
              id="aadharCardNumber"
              name="aadharCardNumber"
              value={formData.aadharCardNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
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
            <label htmlFor="addressLine2">Address Line 2:</label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="landmark">Landmark:</label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              value={formData.landmark}
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
          <div className="form-field">
            <label htmlFor="debitCard">Debit/ATM Card:</label>
            <input
              type="text"
              id="debitCard"
              name="debitCard"
              checked={formData.debitCard}
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
