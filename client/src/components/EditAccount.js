
import React, { useState, useEffect } from 'react'               //rfce
import { useNavigate, useParams } from 'react-router-dom'
import '.././styles/EditAccount.css';

import AdminService from '../services/AdminService';
import AdminLoginService from '../services/AdminLoginService';

//Component to create or update a product

function EditAccount() {
    const navigate = useNavigate();
    const history = useNavigate();

    /*
    The useParams hook returns an object of key/value pairs of the dynamic params 
    from the current URL that were matched by the <Route path>. Child routes inherit 
    all params from their parent routes.
    */

    const { id } = useParams();                   //It fetches id from URL

    //state mgmt
   
    const [branch, setbranch] = useState('');
    
    


    //component lifecycle Management - ComponentUpdate
    useEffect(() => {


            if (!AdminLoginService.isUserLoggedIn()) {
              history('/adminlogin');
            }
            else{
                if (id !== 'add') {
                    // update product 
                    AdminService.getAccountById(id).then((response) => {
                        const product = response.data;
                       
                        setbranch(product.branch);
                    });
                }
            }
          
        


    }, [id]);           //values -id triggers re render whenever they are updated in your program,
    //you can add multiple values by separating them by commas

    const saveOrUpdateProduct = (event) => {
        event.preventDefault();
        const product = {branch };

        if (id === '_add') {
            AdminService.createProduct(product).then(() => {
                navigate('/admin');
            });
        } else {
            AdminService.getAccountById(id).then((response) => {
                const product = response.data;
                setbranch(product.branch);
            });
            AdminService.updateCustomer(product, id,branch).then(() => {
                navigate('/admin');
            });
        }
    };

    // methods to set value of state
    const changeNameHandler = (event) => {
        setbranch(event.target.value);
    };

    

    const cancel = () => {
        navigate('/admin');
    };

    const getTitle = () => {
        if (id === '_add') {
            return <h1 className="text-center">Add Details</h1>;
        } else {
            return<h1 className="text-center" style={{ color: 'black' }}>Update Branch</h1>
        }
    };


    return (
        <div className='app-editAccount'>
            <br></br>
            <div className="container-editAccount">
                <div className="row">
                    <div className="form-outline col-12 mb-4">
                        {getTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group flex-row">
                                    <label> Branch: </label>
                                    <input placeholder="Branch Name" name="name" className="form-control"
                                        value={branch} onChange={changeNameHandler} />
                               
                                </div>
                                <div className='button-editAccount'>
                                <button className="btn btn-success" onClick={saveOrUpdateProduct}>Save</button>
                                <button className="btn btn-danger" onClick={cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditAccount