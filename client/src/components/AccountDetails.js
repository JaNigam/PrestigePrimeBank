import React, { useState , useEffect } from 'react';
import './../styles/AccountDetails.css'
import NavBar from './NavBar';
import AuthenticationService from '../services/AuthenticationService';
import CustomerService from '../services/CustomerService';
import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom';

const AccountDetails = () => {

  const userId = AuthenticationService.getLoggedInUserName();
  const [customer, setCustomer] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [alertVariant, setAlertVariant] = useState('');
  console.log(customer.grossAnnualIncome)
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = (e) =>{

    try{
    setDisabled(!disabled);
    e.preventDefault();

    if(disabled===true){
      console.log(formData)
      CustomerService.updateInfo(userId, formData);
      setShowAlert(true);
      setAlertVariant('success')
    }
  }catch(error){
    console.error("erro updating information", error)
    setShowAlert(true)
    setAlertVariant('error')
  }


    
  }


  useEffect(
    () => 
    {
      if (!AuthenticationService.isUserLoggedIn()) {
        history('/login');
      }
      else{
      
        getData()
        setFormData(
          {
            mobile: customer.mobile,
            email: customer.email,
            permanentAddress: customer.permanentAddress,
            currentAddress: customer.currentAddress,
            optForNetBanking: customer.optForNetBanking,
            grossAnnualIncome: customer.grossAnnualIncome,
            incomeSource: customer.incomeSource,
            // occupation: customer.occupation,
            occType: customer.occType
            
          }
        )
      }
    },[customer.name]
)

function getData() {

    try{
      CustomerService.getAccountById(userId).then((res)=> {
          setCustomer(res.data.customer);
          console.log(customer)
      })
    }
    catch(error){
      console.log("error fetching customer details ",error)
  }
}

  return (
    <>
    <NavBar/>
    {/* <Alert variant="success" style={{ width: "35rem" , display: "flex" , flexDirection: "end" }}>
        <Alert.Heading>
          The information has been updated
        </Alert.Heading>
    </Alert> */}

    <br></br>
    <div className="personal-details-form">
      <h2>Personal Details</h2>
      
      {/* <div >  */}
          {/* </div> */}
      <form>
        <div className="form-row">
          <div className="form-field form-column">
            <label htmlFor="firstName">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customer.name}
              // onChange = {(e)=> {setCustomer(e.target.vale)}}
              disabled={true}

            />
          </div>
          <div className="form-field">
            <label htmlFor="fathername">Father's Name:</label>
            <input
              type="text"
              id="fathername"
              name="fathername"
              value={customer.fathername}
              // onChange={handleChange}
              disabled={true}
            />
          </div>
          <div className="form-field">
            <label htmlFor="mothername">Mother's Name:</label>
            <input
              type="text"
              id="mothername"
              name="mothername"
              value={customer.mothername}
              // onChange={handleChange}
              disabled={true}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="number"
              id="mobile"
              name="mobile"
              // value={formData.mobile}
              defaultValue={customer.mobile}
              // onChange={handleChange}
              onChange = {handleChange}
              disabled={!disabled}
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              // value={formData.email}
              defaultValue={customer.email}
              onChange = {handleChange}
              // onChange = {(e)=> {setCustomer.email(e.target.vale)}}
              disabled={!disabled}

            />
          </div>
          <div className="form-field">
            <label htmlFor="aadhar">Aadhar Card Number:</label>
            <input
              type="text"
              id="aadhar"
              name="aadhar"
              value={customer.aadhar}
              // onChange = {(e)=> {setAadhar(e.target.value)}}
              // onChange={handleChange}
              disabled={true}
            />
          </div>
        </div>
        <div className="form-row" style={{"margin":"0"}}>
          <div className="form-field">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={customer.dob}
              // onChange={handleChange}
              disabled={true}

            />
          </div>
          {/* <div className="form-field">
            <label htmlFor="occType">Occupation Type:</label>
            <input
              type="date"
              id="occType"
              name="occType"
              value={customer.occType}
              onChange={handleChange}
            />
          </div> */}
          
          <div className="form-field">
            <label htmlFor="grossAnnualIncome">Gross Annual Income:</label>
            <input
              type="number"
              id="grossAnnualIncome"
              name="grossAnnualIncome"
              default={customer.grossAnnualIncome}
              onChange={handleChange}
              disabled={!disabled}

            />
          </div>
          </div>

          <div className='form-row' style={{"margin":"0"}}>

          <div className="form-field">
            <label htmlFor="incomeSource">Income Source:</label>
            <input
              type="text"
              id="incomeSource"
              name="incomeSource"
              defaultValue={customer.incomeSource}
              onChange={handleChange}
              disabled={!disabled}

            />
          </div>
          <div className="form-field">
            <label htmlFor="occupation">Occupation:</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              defaultValue={customer.occupation}
              onChange={handleChange}
              disabled={!disabled}

            />
          </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="occupationType">Occupation Type:</label>
            <input
              type="text"
              id="occupationType"
              name="occupationType"
              defaultValue={customer.occupationType}
              onChange={handleChange} 
              disabled={!disabled}

            />
          </div>
          </div>

         
        </div>
        <div className='form-row' style={{"margin":"0"}}>
        <div className="form-field">
            <label htmlFor="addressLine1">Current Address:</label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              defaultValue={customer.addressLine1}
              onChange={handleChange}
              disabled={!disabled}

            />
          </div>
          </div>
          <div className="form-field">
            <label htmlFor="permanentAddress">Permanent Address:</label>
            <input
              type="text"
              id="permanentAddress"
              name="permanentAddress"
              defaultValue={customer.permanentAddress}
              onChange={handleChange}
              disabled={!disabled}

            />
          </div>
        {/* <div className="form-row">
          <button type="submit">Submit</button>
        </div> */}
      </form>
      <button type="submit"  style={{ "marginLeft": "270px"}} onClick={handleUpdate}>Update Information</button>
    </div>
    
    </>
  );
};

export default AccountDetails;
