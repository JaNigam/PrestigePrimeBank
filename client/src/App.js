import logo from './logo.svg';
import './App.css';
import Landing_Page from './components/Landing_Page';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
function App() {
  return (
    <div className="App">

      <header>
        <div style={{
          // backgroundImage: "url(/images/back.webp)",
          backgroundSize: 'cover',
          
          margin: '0', padding: '1px'
        }}>
          <Router>
            <NavBar></NavBar>
          </Router>
        </div>
      </header>
      <section>



      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Landing_Page/>
      </header> */}

      <Login />


      </section>
      <footer className="footer">
        <p>&copy; All Rights Reserved To Wells Fargo.</p>
      </footer>
    </div>
  );
}

export default App;
