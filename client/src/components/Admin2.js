import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminService from "../services/AdminService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ".././styles/Admin_Dashboard.css";
import AdminLoginService from "../services/AdminLoginService";

function Admin2() {
  const history = useNavigate();

  //state management using useState() react Hooks
  const [customers, SetCustomers] = useState([]);
  const [message, setMessage] = useState("");

  //React Hook to manage lifecycle of a component -  useEffect
  useEffect(() => {
      if (!AdminLoginService.isUserLoggedIn()) {
        history('/adminlogin');
      }
      else{
        fetchCustomers(); //invokes fetchPoducts() when component is rendered
      }
    
  }, [customers]);

  const fetchCustomers = () => {
    AdminService.getAllCustomers().then((response) => {
    SetCustomers(response.data);
    });
  };

  

  const validateCust = (id) => {
    AdminService.getCustomerById(id).then((response) => {
      const customer = response.data;
      const validCustomerDetails = { setValidate: 1, custId: id };
      AdminService.validateCustomer(validCustomerDetails, id).then(() => {
        history('/admin');
      });
      console.log(customer)

      const account = {
        accountType:"savings",
		    // openingDate: new Date().toLocaleDateString(),
        openingDate:"2023-10-03",
        balance: 0,
        branch:"Delhi"
      }
      console.log(account)

      AdminService.createAccount(account,id)
    });
  };


  
  return (
    <div className="app-admin">
    <div className="app-admin">
      <br />
      <h1 className="text-warning">Customer List</h1>
      <br />
      <div className="row justify-content-center">
        <table className="table-admin table-success-admin w-50">
          <thead>
            <tr className="table-danger">
              <th className="td-admin"> user Id</th>
              <th className="td-admin">Name</th>
              <th className="td-admin"> Email</th>
              <th className="td-admin"> dob</th>
              <th className="td-admin"> Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              
              <tr key={cust.Id}
               style={cust.validCustomer===true ? {backgroundColor:"#dbf4d8"} : {backgroundColor:"#bb1133"} }
                 >
                <td className="td-admin" > {cust.userId} </td>
                <td className="td-admin"> {cust.name} </td>
                <td className="td-admin"> {cust.email} </td>
                <td className="td-admin"> {cust.dob} </td>

                <td className="td-admin11">
                  
                  {/* {cust.customer.validCustomer===false && */}
                  <button
                    className="btn btn-admin btn-secondary button-css"  
                    onClick={() => {
                      validateCust(cust.userId);
                      alert('Customer validated');
                    }}
                  >
                    <span>
                      <FontAwesomeIcon icon="check"></FontAwesomeIcon>
                    </span>
                  </button>
                  {/* } */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        </div>
        </div>

  );
}

export default Admin2;
