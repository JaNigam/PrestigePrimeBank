import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminService from "../services/AdminService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ".././styles/Admin_Dashboard.css";
import AdminLoginService from "../services/AdminLoginService";

function Admin() {
  const history = useNavigate();

  //state management using useState() react Hooks
  const [customers, SetCustomers] = useState([]);
  const [message, setMessage] = useState("");
  //React Hook to manage lifecycle of a component -  useEffect
  useEffect(() => {
      if (!AdminLoginService.isUserLoggedIn()) {
        history('/login');
      }
      else{
        fetchProducts(); //invokes fetchPoducts() when component is rendered
      }
    
  }, [customers]);

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
      console.log("hi" , response.data);
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

  const handleLogout = () => {
    AdminLoginService.logout();
    history('/adminlogin')
};
  return (
    <div className="app-admin">
      {/* <NavBar /> */}
      <br />
      <h1 className="text-warning">Accounts List</h1>
      <br />
      <div className="row justify-content-center">
        <table className="table-admin table-success-admin w-50">
          <thead>
            <tr className="table-danger">
              <th className="td-admin"> Account Number</th>
              <th className="td-admin"> Account Type</th>
              <th className="td-admin"> Balance</th>
              <th className="td-admin"> Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              
              <tr key={cust.Id} style={cust.customer.validCustomer===true ? {backgroundColor:"#dbf4d8"} : {backgroundColor:"#bb1133"} }  >
                <td className="td-admin" > {cust.accountNo} </td>
                <td className="td-admin"> {cust.accountType} </td>
                <td className="td-admin"> {cust.balance} </td>

                <td className="td-admin1">
                  <button
                    className="btn btn-admin btn-success button-css"
                    onClick={() => editCust(cust.accountNo)}
                  >
                    <span>
                      <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
                    </span>
                  </button>{" "}
                  &nbsp;
                  <button
                    className="btn btn-admin btn-danger button-css"
                    onClick={() => deleteCust(cust.accountNo)}
                  >
                    <span>
                      <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                    </span>
                  </button>
                  <button
                    className="btn btn-admin btn-primary button-css"
                    onClick={() => viewCust(cust.accountNo)}
                  >
                    <span>
                      <FontAwesomeIcon icon="list"></FontAwesomeIcon>
                    </span>
                  </button>
                  {cust.customer.validCustomer===false &&
                  <button
                    className="btn btn-admin btn-secondary button-css"
                    onClick={() => {
                      validateCust(cust.accountNo);
                      alert('Customer validated');
                    }}
                  >
                    <span>
                      <FontAwesomeIcon icon="check"></FontAwesomeIcon>
                    </span>
                  </button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

                        {/* <Link to="/" className="nav-link" onClick={handleLogout}>
                            <span><FontAwesomeIcon icon="sign-out"></FontAwesomeIcon></span> &nbsp;
                            Logout</Link> */}

      {/* {message && <div className="alert alert-success">{message}</div>} */}
      <button className="btn btn-danger" style={{ color: 'white' }} onClick={handleLogout}>
      LOGOUT
    </button>  </div>

  );
}

export default Admin;
