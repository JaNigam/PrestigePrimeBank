import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

import AdminService from '../services/AdminService';
import NavBar from './NavBar';

const AdminView = () => {

    const history = useNavigate();

    const { id } = useParams();
    const [customers, SetCustomers] = useState({});

     // componentDidUpdate usage
    useEffect(() => {
        AdminService.getCustomerById(id).then((res) => {
            SetCustomers(res.data);
        });
    }, [id]);  // //values -id triggers re render whenever they are updated in your program,
                //you can add multiple values by separating them by commas

    const backCustomer = () => {
        history('/admin');
    };
    return (
        <div>
            <NavBar/>
            <br />
            <div className="card col-md-6 offset-md-3">
                <br></br>
                <h3 className="text-center">View Account Details</h3><hr/>
                <div className="card-body">
                    
                    <div className="row">
                        <label>Account Number:</label>
                        <div class="text-success fw-bolder">{customers.accountNo}</div><hr/>
                    </div>
                    <div className="row">
                        <label>Account Type:</label>
                        <div class="text-success fw-bolder">{customers.accountType}</div><hr/>
                    </div>
                    <div className="row">
                        <label>Account Balance:</label>
                        <div class="text-success fw-bolder">{customers.balance}</div><hr/>
                    </div>
                   </div>
                <div className = "row justify-content-center">
                        <button className="btn btn-info w-auto" onClick={backCustomer}>Back To Admin Dashboard</button>
                    </div>
            </div>
        </div>
    );
}

export default AdminView;