import logo from './logo.svg';
import './App.css';
import Landing_Page from './components/Landing_Page';
// import Login from './components/Login';
import { Switch, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import AdminView from './components/AdminView';
import AddBeneficiary from './components/AddBeneficiary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignIn, faCameraRetro, faCoffee, faBomb, faEdit,faTrash,faList,faPeopleGroup,faSearch,faCheck, faMoneyBillTransfer,faSignOut } from '@fortawesome/free-solid-svg-icons';
import Register from './components/Register/Register';
import Login from './components/Login';
import About from './components/About';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';
import Logout from './components/Logout';
import SessionExpired from './components/SessionExpired';
import Footer from './components/Footer';
import ImpsPayment from './components/ImpsPayment';
import AccountDetails from './components/AccountDetails';
import EditAccount from './components/EditAccount';
import Dashboard from './components/Dashboard';
import TransactionHistory from './components/TransactionsHistory';
import AddMoney from './components/AddMoney';
import AccountSummary from './components/AccountSummary'
library.add(faSignIn, faCameraRetro, faCoffee, faBomb, faEdit,faTrash,faList,faPeopleGroup,faSearch,faCheck,faMoneyBillTransfer,faSignOut);



function App() {
  return (
    <div className="App">
    
    <Routes>

        <Route path="/" element={<Landing_Page/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/adminlogin' element={<AdminLogin/>}></Route>

        <Route path="/about" element={<About/>}></Route>
        
        <Route path='/sessionExpired' element={<SessionExpired/>}></Route>
        <Route path='/addBeneficiary' element={<AddBeneficiary/>}></Route>
        
        <Route path='/imps' element={<ImpsPayment/>}></Route>
        <Route path='/user' element={<AccountDetails/>}></Route>
        <Route path='/account' element={<AccountSummary/>}></Route>
        {/* <Route path='/accountDetails' element={<AccountDetails/>}></Route> */}
        <Route path="/logout" element={<Logout/>}></Route>
        <Route path='/addCust/:id' element={<EditAccount/>}></Route>
        <Route path='/addBalCust/:id' element={<AddMoney/>}></Route>
        <Route path='/viewCust/:id' element={<AdminView />}></Route>
        <Route path='/dashboard/:userId' element={<Dashboard />}></Route>

      </Routes>

      <Footer />



    </div>
  );
}

export default App;
