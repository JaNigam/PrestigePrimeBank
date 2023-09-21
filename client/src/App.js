import logo from './logo.svg';
import './App.css';
import Landing_Page from './components/Landing_Page';
// import Login from './components/Login';
import {Switch, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import AdminView from './components/AdminView';


import {library} from '@fortawesome/fontawesome-svg-core';
import { faSignIn, faCameraRetro, faCoffee } from '@fortawesome/free-solid-svg-icons';
import Register from './components/Register';
import Login from './components/Login';
import About from './components/About';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';
import Logout from './components/Logout';
library.add(faSignIn,faCameraRetro,faCoffee);



function App() {
  return (
    <div className="App">
    
    <Routes>
        <Route path="/" element={<Landing_Page/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/adminlogin' element={<AdminLogin/>}></Route>
        {/* <Route path='/addCust/:id' element={<CreateProduct/>}></Route> */}
        <Route path='/viewCust/:id' element={<AdminView/>}></Route>
    </Routes>
    

      
      <footer className="footer">
        <p>&copy; All Rights Reserved To Wells Fargo.</p>
      </footer>


    </div> 
  );
}

export default App;
