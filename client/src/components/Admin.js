import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminService from '../services/AdminService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
    The useNavigate() hook is introduced in the React Router v6 
    to replace the useHistory() hook.
    the React Router’s new navigation API provides a useNavigate() 
    hook which is an imperative version to perform the navigation actions 
    with better compatibility. 

    The useNavigate hook lets you navigate programmatically within your React code.
*/

function Admin() {

    const history = useNavigate();

    //state management using useState() react Hooks
    const [customers, SetCustomers] = useState([]);

    const [message, setMessage] = useState('');
    //React Hook to manage lifecycle of a component -  useEffect
    useEffect(() => {
        fetchProducts();        //invokes fetchPoducts() when component is rendered
    }, []);

    const fetchProducts = () => {
        AdminService.getCustomers().then((response) => {
            SetCustomers(response.data);
        });
    }

    // const addProduct = () =>{
    //     history('/addProduct/_add');  //Navigate to createProduct component and pass add as parameter
    // }
    const editCust = (id) =>{
        history(`/addCust/${id}`);  //use back quote operator -  evaluate jsx operation
    }
    const viewCust = (id) =>{
        history(`/viewCust/${id}`);  //use back quote operator -  evaluate jsx operation
    }
    const validateCust = (id) =>{
        AdminService.validateCust(id).then(() => {
            // setProducts(products.filter(product => product.id !== id));
            fetchProducts(); // Refresh products list
             setMessage('Customer validated successfully.'); 
              // Clear the message after 2 seconds
              setTimeout(() => {
                 setMessage('');
             }, 2000);
         });
    }
    const deleteCust = (id) => {
        AdminService.deleteProduct(id).then(() => {
           // setProducts(products.filter(product => product.id !== id));
           fetchProducts(); // Refresh products list
            setMessage('Customer deleted successfully.'); 
             // Clear the message after 2 seconds
             setTimeout(() => {
                setMessage('');
            }, 2000);
        });
    };
    
    return (
        <div>
            <br />
            {/* <div className="container">Welcome {user}</div> */}
            <h1 className="text-warning">Customer List</h1>
            <br />
            {/* <div className="row justify-content-center">
                <button className='btn btn-info w-auto' onClick={addCust}>Add Customer</button>
            </div>
            <br /> */}
            <div className="row justify-content-center" >
                <table className="table table-success w-50">
                    <thead>
                        <tr className="table-danger">
                            <th> User Id</th>
                            <th> Account Number</th>
                            <th> Account Type</th>
                            <th> Balance</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(
                            cust =>
                                <tr key={cust.id}>
                                    <td> {cust.cid} </td>
                                    <td> {cust.accno} </td>
                                    <td> {cust.accType} </td>
                                    <td> {cust.balance} </td>
                                    <td>
                                        <button className='btn btn-success' onClick={() => editCust(cust.cid)}>
                                            <span>
                                                <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
                                            </span>
                                        </button> &nbsp;
                                        <button className='btn btn-danger' onClick={() =>deleteCust(cust.cid)}>
                                            <span>
                                                <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                                            </span>
                                        </button> 
                                        <button className='btn btn-primary' onClick={() =>viewCust(cust.cid)}>
                                            <span>
                                                <FontAwesomeIcon icon="list"></FontAwesomeIcon>
                                            </span>
                                        </button>
                                        <button className='btn btn-primary' onClick={() =>validateCust(cust.cid)}>
                                            <span>
                                                <FontAwesomeIcon icon="list"></FontAwesomeIcon>
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
            {message && <div className="alert alert-success">{message}</div>}
        </div>
  )
}

export default Admin
