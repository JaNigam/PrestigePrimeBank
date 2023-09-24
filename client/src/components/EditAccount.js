import React,{useState,useEffect}from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import AdminLoginService from '../services/AdminLoginService';
import AdminService from '../services/AdminService';
/*The useParams hook returns an object of key/value pairs of the dynamic params 
    from the current URL that were matched by the <Route path>. Child routes inherit 
    all params from their parent routes.
    */
   //component to create or update  anew product
function EditAccount() {
    const navigate= useNavigate();
    const{id}=useParams();
    const [accountNo, setAccountNo] = useState('');
    const [accountType, setAccountType] = useState('');
    const [balance, setBalance] = useState('');

    //component life cycle management
    useEffect(() => {
        if(id!='_add'){
            AdminService.getCustomerById(id).then((response)=>{
                const product=response.data;
                setAccountNo(product.accountNo);
                setAccountType(product.accountType);
                setBalance(product.balance);
                
            })
        }
    }, [id]);
    //values -id triggers re render whenever they are updated in your program,
                //you can add multiple values by separating them by commas

                const saveOrUpdateProduct = (event) => {
                    event.preventDefault();
                    const product = { accountNo, accountType, balance };
            
                    
                    AdminService.updateCustomer(product, id).then(() => {
                            navigate('/admin');
                        });
                    
                };
            
                // methods to set value of state
                const changeAccountNoHandler = (event) => {
                    setAccountNo(event.target.value);
                };
            
                const changeAccountTypeHandler = (event) => {
                    setAccountType(event.target.value);
                };
            
                const changeBalanceHandler = (event) => {
                    setBalance(event.target.value); 
                };
            
               
            
                const cancel = () => {
                    navigate('/admin');
                };
            
                const getTitle = () => {
                    {
                        return <h1 className="text-center">Update Account</h1>;
                    }
                };
  return (
    <div>
            <br></br>
            <div className = "container">
                    <div className = "row">
                        <div className = "form-outline col-12 mb-4">
                            {getTitle()}
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group flex-row">
                                        <label> Account Number: </label>
                                        <input placeholder="Account Number" name="accountNo" className="form-control" 
                                            value={accountNo} onChange={changeAccountNoHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> accountType </label>
                                        <input placeholder="accountType" name="accountType" className="form-control" 
                                            value={accountType} onChange={changeAccountTypeHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> balance: </label>
                                        <input placeholder="balance" name="balance" className="form-control" 
                                            value={balance} onChange={changeBalanceHandler}/>
                                    </div>
                                   

                                    <button className="btn btn-success" onClick={saveOrUpdateProduct}>Save</button>
                                    <button className="btn btn-danger" onClick={cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

               </div>
        </div>
  )
}

export default EditAccount;