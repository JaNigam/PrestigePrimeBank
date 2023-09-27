import { useEffect, useState } from "react"
import CustomerService from "../services/CustomerService"
import AdminService from "../services/AdminService";
import { useParams,useNavigate } from 'react-router-dom';
import SidePanel from "./sidepanel/SidePanel";
import "../styles/Dashboard.css"
// import { useAuth } from "./security/AuthContext"
// import HeaderComponent from "./HeaderComponent"

export default function TransactionHistory() {

    // const AuthContext = useAuth()
    const { userId } = useParams();
    const [trxarr, setTrxarr] = useState([]);
    const [customer, setCustomer] = useState({});

    useEffect(
        () => 
        {
            getData()
            
        },[customer.accountNo]
    )

    function getData() {

        try{
        CustomerService.getAccountById(userId).then((res)=> {
            setCustomer(res.data);
        })
        // console.log(customer.accountNo)
        
        if(customer.accountNo){
        CustomerService.viewTransactions(customer.accountNo,'2021-01-01','2023-12-31').then((res) => {
            console.log("Transaction" , customer.accountNo)
            setTrxarr(res.data)
        });
        }
    }
        catch(error){
            console.log("error",error)
        }
    }

    return (
        <>

        <section className="container">
            <h1 className="title">Dashboard {'>'} Account Summary</h1>
            <div className="tbl-header">
                <h4 style={{'color': 'black', 'textAlign': 'left' , 'padding' : '10px'}}> Transaction History </h4>
                {/* <hr style={{'color': 'white'}}></hr> */}
                <hl/>
                <table cellspacing="0" cellPadding="0" border="0">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Transaction Id</th>
                            <th scope="col">Transaction Type</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Sender Account Number</th>
                            <th scope="col">Reciever Account No</th>
                            <th scope="col">Timestamp</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    {/* </table> */}
                    {/* </div> */}
                    {/* <div className="tbl-content"> */}
                        {/* <table  cellspacing="0" cellPadding="0" border="0"> */}
                            <tbody>
                            {
                                trxarr.map(
                                    arr => (
                                        <tr key={arr.transactionId}>
                                            <td className= "text-danger">{arr.transactionId}</td>
                                            <td className= "text-danger">{arr.transactionType}</td>
                                            <td>{arr.amount}</td>
                                            <td>{arr.senderAccNo}</td>
                                            <td>{arr.receiverAccNo}</td>
                                            <td>{arr.timeStamp}</td>
                                            <td>{arr.status}</td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
        {/* </div> */}
        {/* <div className="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div className="ps__rail-y" style="top: 0px; height: 410px; right: 0px;"><div className="ps__thumb-y" tabindex="0" style="top: 0px; height: 296px;"></div></div></div></div></div> */}
        </section>



        {/* <section>
            <h1 className="title">Dashboard {'>'} Account Details </h1>
            <div className="tvl-header">
                <table cellspacing="0" cellPadding="0" border="0">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Account Number</th>
                            <th scope="col">Account Type</th>
                            <th scope="col">Opening Date</th>
                            <th scope="col">IFSC Code</th>
                            <th scope="col">Branch</th>
                            <th scope="col">Balance</th>
                        </tr>
                    </thead>
                    </table>
                    </div>
                    <div className="tbl-content">
                        <table  cellspacing="0" cellPadding="0" border="0">
                            <tbody>
                            {
                                trxarr.map(
                                    arr => (
                                        <tr key={arr.transactionId}>
                                            <td className= "text-danger">{arr.accountNo}</td>
                                            <td className= "text-danger">{arr.accountType}</td>
                                            <td>{arr.openingDate}</td>
                                            <td>{arr.ifsc}</td>
                                            <td>{arr.branch}</td>
                                            <td>{arr.balance}</td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
        </section> */}

        </>
    )
}