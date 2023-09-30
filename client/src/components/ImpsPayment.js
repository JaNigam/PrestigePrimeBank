import React, { useState ,useEffect} from 'react';
import axios from 'axios'; // You may need to install this library
import '.././styles/ImpsPayment.css'
import NavBar from './NavBar';
import Footer from './Footer';
import CustomerService from '../services/CustomerService';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService';

const ImpsPayment = () => {
  const history = useNavigate();
  const [receiverAccNo, setRecieverAccNo] = useState('');
  const [senderAccNo, setSenderAccNo] = useState('');
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn()) {
      history('/login');
    }
  }, []);

  const [transactionType, setTransactionType] = useState("option1");

	const  handleSelectedOption = (event) => {
		setTransactionType(event.target.value);
	};

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      // Send the transaction data to the backend for processing
      const response = {
        senderAccNo,
        receiverAccNo,
        amount,
        transactionType
      };

      // Handle the response from the backend
      // setResponseMessage(response.data.message);

      CustomerService.transferAmount(response);
      history('/account/')
      
      
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred while processing the transaction.');
    }
  };

  return (
    <>
      <NavBar />
      <br />
      <div className="transaction-container">
        <h2>Fund Transfer</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Sender Account Number:</label>
            <input
              type="text"
              value={senderAccNo}
              onChange={(e) => setSenderAccNo(e.target.value)}
            />
          </div>
          <div>
            <label>Receiver Account Number:</label>
            <input
              type="text"
              value={receiverAccNo}
              onChange={(e) => setRecieverAccNo(e.target.value)}
            />
          </div>

              <div>
        <label>
          Select a Payment Method
            <select  value={transactionType} onChange={handleSelectedOption}>
            <option  value="option1">IMPS</option>
            <option  value="option2"> NEFT</option>
            <option  value="option3"> RTGS</option>
          </select>
        </label>
        {/* <p>Selected option: {selectedOption}</p> */}
      </div>

          <div>
            <label>Amount:</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
        
          <div > 
            <button type="submit" style ={{"margin-left":"100px"}}>Initiate Transaction</button>
          </div>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
      <Footer />
    </>
  );
};

export default ImpsPayment;
