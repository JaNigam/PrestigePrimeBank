import { useEffect, useState } from "react"
import CustomerService from "../services/CustomerService"
import AdminService from "../services/AdminService";
import { useParams,useNavigate } from 'react-router-dom';
import AuthenticationService from "../services/AuthenticationService";
import SidePanel from "./sidepanel/SidePanel";
import "../styles/AccountSummary.css"
import NavBar from "./NavBar";

export default function TransactionHistory() {

    // const AuthContext = useAuth()
    // const { userId } = useParams()
    const [customer, setCustomer] = useState({});
    const userId = AuthenticationService.getLoggedInUserName();
    const history = useNavigate();
    useEffect(
        () => 
        {
                if (!AuthenticationService.isUserLoggedIn()) {
                  history('/login');
                }
                else{
                    getData()
                }
            
            
        },[customer.accountNo]
    )

    function getData() {

        try{
        CustomerService.getAccountById(userId).then((res)=> {
            setCustomer(res.data);
        })
        console.log(customer)
        
    }
        catch(error){
            console.log("error",error)
        }
    }

    return (
        <>
        <NavBar/>
        <div className='dashboard'>
        <SidePanel/>

        <section className="container" >
            <h1 className="title">Dashboard {'>'} Account Summary</h1>
            <div className="tbl-header">
                <h4 style={{'color': 'black', 'textAlign': 'left' , 'padding' : '10px'}}> Account Summary </h4>
                {/* <hr style={{'color': 'white'}}></hr> */}
                <hl/>
                <table cellspacing="0" cellPadding="0" border="0">
                    <thead className="thead-light">
                        <tr>
                            <th style={{"maxWidth":"15px"}} scope="col">Account Number</th>
                            <th scope="col">Account Type</th>
                            <th scope="col">Opening Date</th>
                            <th scope="col">IFSC</th>
                            <th scope="col">Branch</th>
                            <th scope="col">Balance</th>
                            {/* <th scope="col">Status</th> */}
                        </tr>
                    </thead>
                    {/* </table> */}
                    {/* </div> */}
                    {/* <div className="tbl-content"> */}
                        {/* <table  cellspacing="0" cellPadding="0" border="0"> */}
                            <tbody>
                            {/* { */}
                                {/* customer.map( */}
                                    {/* arr => ( */}
                                        <tr key={customer.accountNo}>
                                            <td className= "text-danger">{customer.accountNo}</td>
                                            <td className= "text-danger">{customer.accountType}</td>
                                            <td className= "text-danger">{customer.openingDate}</td>
                                            <td>{customer.ifsc}</td>
                                            <td>{customer.branch}</td>
                                            <td>{customer.balance}</td>
                                        </tr>
                                    {/* ) */}
                                {/* ) */}
                            {/* } */}
                        </tbody>
                    </table>
                </div>
        {/* </div> */}
        {/* <div className="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div className="ps__rail-y" style="top: 0px; height: 410px; right: 0px;"><div className="ps__thumb-y" tabindex="0" style="top: 0px; height: 296px;"></div></div></div></div></div> */}
        </section>
        </div>
        </>
    )
}