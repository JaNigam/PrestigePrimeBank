import React, { useState } from 'react';
import axios from 'axios'; // You may need to install this library
import '.././styles/ImpsPayment.css'
import NavBar from './NavBar';
import Footer from './Footer';
const NeftPayment = () => {
  const [senderAccount, setSenderAccount] = useState('');
  const [beneficiaryAccount, setBeneficiaryAccount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the transaction data to the backend for processing
      const response = await axios.post('/api/imps/initiate', {
        senderAccount,
        beneficiaryAccount,
        transferAmount,
        remarks,
      });

      // Handle the response from the backend
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred while processing the transaction.');
    }
  };

  return (
    <>
    <NavBar/>
    <br/>
    <div className="transaction-container">
      <h2>NEFT Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>From Account:</label>
          <input
            type="text"
            value={senderAccount}
            onChange={(e) => setSenderAccount(e.target.value)}
          />
        </div>
        <div>
          <label>To Account:</label>
          <input
            type="text"
            value={beneficiaryAccount}
            onChange={(e) => setBeneficiaryAccount(e.target.value)}
          />
        </div>
        <div>
          <label>Transfer Amount:</label>
          <input
            type="text"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Transaction Date:</label>
          <input
            type="date"
            // value={dot}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        <div>
          <label>Maturity Instructions:</label>
          <input
            type="text"
            // value={inst}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        <div>
          <label>Remarks:</label>
          <input
            type="text"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Initiate Transaction</button>
        </div>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
    <Footer/>
    </>
  );
};

export default NeftPayment;
