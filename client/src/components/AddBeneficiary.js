import React, { useState } from 'react';
import '.././styles/AddBeneficiary.css'
import NavBar from './NavBar';
import Footer from './Footer';

const AddBeneficiary = () => {
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
    // Handle form submission, e.g., send data to the server or perform validation
    console.log(formData);
  };

  return (
    <>
    <NavBar/>
    <br></br>
    <div className="add-beneficiary">
      <h2>Add Beneficiary</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountNumber">Account Number:</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit">Add Beneficiary</button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default AddBeneficiary;
