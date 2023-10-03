import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '.././styles/ImpsPayment.css'
import NavBar from './NavBar';
import Footer from './Footer';
import CustomerService from '../services/CustomerService';
import AuthenticationService from '../services/AuthenticationService';

const ImpsPayment = () => {
  const history = useNavigate();
  const [receiverAccNo, setRecieverAccNo] = useState('');
  const [senderAccNo, setSenderAccNo] = useState('');
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [msgCondition, setmsgCondition] = useState(null);
  const [transactionType, setTransactionType] = useState('');
  const [customer, setCustomer] = useState({});

  const [message, setMessage] = useState("");
  
  const userId= AuthenticationService.getLoggedInUserName()
  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn()) {
      history('/login');
    }
    CustomerService.getAccountById(userId).then((res)=> {
    setCustomer(res.data);
  })
  }, []);

  const divStyles = {
    color: msgCondition ? "green" : "red",
  };

	const  handleSelectedOption = (event) => {
		setTransactionType(event.target.value);
	};

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // Send the transaction data to the backend for processing
      if(amount<customer.balance)
      {
      
      const response = {
        senderAccNo,
        receiverAccNo,
        amount,
        transactionType
      };

      // Handle the response from the backend
      // setResponseMessage(response.data.message);
      console.log(response)

      CustomerService.transferAmount(response);
      history('/account/')
      setmsgCondition(true);
      alert("Fund successfully transferred! Redirecting...");
        // AuthenticationService.registerSuccessfullLogin(userId);
        setTimeout(() => {
          history("/account")
        }, 3000);   
      }
      else{
        alert("insufficient balance")
      }  
       
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred while processing the transaction.');
      setMessage("An error occurred while processing the transaction");
    }
  };

  return (
    <>
      <NavBar />
      <br />
      <div className="transaction-container">
        <h2>Fund Transfer</h2>
        <form onSubmit={
          handleSubmit
          }>
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
            <select  value={transactionType} onChange={ (e)=> { setTransactionType(e.target.value) }}>
            <option  value=""> Select</option>
            <option  value="IMPS"> IMPS</option>
            <option  value="NEFT"> NEFT</option>
            <option  value="RTGS"> RTGS</option>
          </select>
        </label>
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
            <button type="submit" style ={{display: "flex",  "justifyContent": "center" , marginTop: "10px"}}>Initiate Transaction</button>
          </div>
          <div style={divStyles}>
          {message && <p className="message">{message}</p>}
        </div>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
      <Footer />
    </>
  );
};

export default ImpsPayment;
