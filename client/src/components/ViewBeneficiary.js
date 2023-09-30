import { useEffect, useState } from "react"
import CustomerService from "../services/CustomerService"
import AdminService from "../services/AdminService";
import { useParams, useNavigate } from 'react-router-dom';
import SidePanel from "./sidepanel/SidePanel";
import AuthenticationService from "../services/AuthenticationService";
import Footer from "./Footer";
import NavBar from "./NavBar";
export default function ViewBeneficiary() {
    const history = useNavigate();
    const userId = AuthenticationService.getLoggedInUserName();
    console.log("userid: ",userId)
    
    const [beneAccNo, setBeneAccNo] = useState('');
    const [beneName,setBeneName] = useState('');

    useEffect(
        () => 
        {
            if (!AuthenticationService.isUserLoggedIn()) {
                history('/login');
              }
              else{
                getData();
              }
            
        },[userId]
    )
    

    function getData() {
        console.log(1)
        try{
        // CustomerService.getAccountById(userId).then((res)=> {
        //     console.log('plapla',userId)
        //     setCustomer(res.data);
        // })
        console.log("hello ; ",userId)
        
        if(userId){
        CustomerService.getBeneficiary(userId).then((res) => {
            console.log("Beneficiary: " , userId)
            console.log("res::::: ",res.data[0].beneficiaryAccNo);
            console.log("res1::::: ",res.data[0].beneficiaryName);
            setBeneAccNo(res.data[0].beneficiaryAccNo);
            setBeneName(res.data[0].beneficiaryName);
            // setBenearr(res.data[0])
        });
        }
    }
        catch(error){
            console.log("error",error)
        }
    }


    return (
        <>
        
        <NavBar/>

        <section className="container">
            {/* <h1 className="title"> Beneficiary</h1> */}
            
            <div className="tbl-header">
                <h4 style={{'color': 'black' , 'padding' : '10px'}}> BENEFICIARY ACCOUNTS ADDED  </h4>

        
                <hl/>
                <table cellspacing="0" cellPadding="0" border="0">
                    <thead className="thead-light">
                        <tr>
                           
                            <th scope="col">Account Number</th>
                            <th scope="col">Name</th>
                            
                           
                        </tr>
                    </thead>
                            <tbody>
                            {
                                        <tr>
                                            <td>{beneAccNo}</td>
                                            <td>{beneName}</td>
                                        </tr>
                            }
                        </tbody>
                    </table>
                </div>
        </section>
        <Footer/>
        </>
    )
}


