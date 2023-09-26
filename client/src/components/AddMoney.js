
import React, { useState, useEffect } from 'react'               //rfce
import { useNavigate, useParams } from 'react-router-dom'


import AdminService from '../services/AdminService';

//Component to create or update a product

function AddMoney() {
    const navigate = useNavigate();

    /*
    The useParams hook returns an object of key/value pairs of the dynamic params 
    from the current URL that were matched by the <Route path>. Child routes inherit 
    all params from their parent routes.
    */

    const { id } = useParams();                   //It fetches id from URL

    //state mgmt
   
    const [balance, setBalance] = useState('');
    
    


    //component lifecycle Management - ComponentUpdate
    useEffect(() => {
        if (id !== 'add') {
            // update product 
            AdminService.getCustomerById(id).then((response) => {
                const product = response.data;
               
                setBalance(product.balance);
            });
        }


    }, [id]);           //values -id triggers re render whenever they are updated in your program,
    //you can add multiple values by separating them by commas

    const saveOrUpdateProduct = (event) => {
        event.preventDefault();
        const product = {balance };

        if (id === '_add') {
            AdminService.createProduct(product).then(() => {
                navigate('/admin');
            });
        } else {
            AdminService.getCustomerById(id).then((response) => {
                const product = response.data;
               
                setBalance(product.balance);
            });
            AdminService.addMoneyCustomer(product, id).then(() => {
                navigate('/admin');
            });
        }
    };

    // methods to set value of state
    const changeNameHandler = (event) => {
        setBalance(event.target.value);
    };

    

    const cancel = () => {
        navigate('/admin');
    };

    const getTitle = () => {
        if (id === '_add') {
            return <h1 className="text-center">Add Product</h1>;
        } else {
            return <h1 className="text-center">Update Product</h1>;
        }
    };


    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="form-outline col-12 mb-4">
                        {getTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group flex-row">
                                    <label> Balance</label>
                                    <input placeholder="Product Name" name="name" className="form-control"
                                        value={balance} onChange={changeNameHandler} />
                               
                                </div>

                                <button className="btn btn-success" onClick={saveOrUpdateProduct}>Save</button>
                                <button className="btn btn-danger" onClick={cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddMoney;