import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AdminService from "../services/AdminService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ".././styles/Admin_Dashboard.css";
import NavBar from "./NavBar";

function Admin() {
  const history = useNavigate();

  //state management using useState() react Hooks
  const [customers, SetCustomers] = useState([]);

  const [message, setMessage] = useState("");
  //React Hook to manage lifecycle of a component -  useEffect
  useEffect(() => {
    fetchProducts(); //invokes fetchPoducts() when component is rendered
  }, []);

  const fetchProducts = () => {
    AdminService.getCustomers().then((response) => {
      SetCustomers(response.data);
    });
  };

  // const addProduct = () =>{
  //     history('/addProduct/_add');  //Navigate to createProduct component and pass add as parameter
  // }
  const editCust = (id) => {
    history(`/addCust/${id}`); //use back quote operator -  evaluate jsx operation
  };
  const viewCust = (id) => {
    history(`/viewCust/${id}`); //use back quote operator -  evaluate jsx operation
  };
  const [validCustomer, setValidCustomer] = useState(0);
  const [value, setValue] = useState(0);
  const validateCust = (id) => {
      AdminService.getCustomerById(id).then((response) => {
          const product = response.data;
          const validCustomerDetails = { setValidate: 1, custId: product.customer.userId };
          setValidCustomer(1);
          setValue(1);
          AdminService.validateCustomer(validCustomerDetails, id).then(() => {
              
              history('/admin');
          });
      });
  };
  const deleteCust = (id) => {
    AdminService.deleteCustomer(id).then(() => {
      // setProducts(products.filter(product => product.id !== id));
      fetchProducts(); // Refresh products list
      setMessage("Customer deleted successfully.");
      // Clear the message after 2 seconds
      setTimeout(() => {
        setMessage("");
      }, 2000);
    });
  };

  return (
    <div>
      <NavBar />
      <br />
      {/* <div className="container">Welcome {user}</div> */}
      <h1 className="text-warning">Accounts List</h1>
      <br />
      {/* <div className="row justify-content-center">
                <button className='btn btn-info w-auto' onClick={addCust}>Add Customer</button>
            </div>
            <br /> */}
      <div className="row justify-content-center">
        <table className="table table-success w-50">
          <thead>
            <tr className="table-danger">
              {/* <th> User Id</th> */}
              <th> Account Number</th>
              <th> Account Type</th>
              <th> Balance</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust.Id}>
                {/* <td> {cust.cId} </td> */}
                <td> {cust.accountNo} </td>
                <td> {cust.accountType} </td>
                <td> {cust.balance} </td>
                <td>
                  <button
                    className="btn btn-success button-css"
                    onClick={() => editCust(cust.accountNo)}
                  >
                    <span>
                      <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
                    </span>
                  </button>{" "}
                  &nbsp;
                  <button
                    className="btn btn-danger button-css"
                    onClick={() => deleteCust(cust.accountNo)}
                  >
                    <span>
                      <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                    </span>
                  </button>
                  <button
                    className="btn btn-primary button-css"
                    onClick={() => viewCust(cust.accountNo)}
                  >
                    <span>
                      <FontAwesomeIcon icon="list"></FontAwesomeIcon>
                    </span>
                  </button>
                  <button
                    className="btn btn-primary button-css"
                    onClick={() => validateCust(cust.accountNo)}
                  >
                    <span>
                      <FontAwesomeIcon icon="check"></FontAwesomeIcon>
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {message && <div className="alert alert-success">{message}</div>}
    </div>
  );
}

export default Admin;
