import logo from './logo.svg';
import './App.css';
import Landing_Page from './components/Landing_Page';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Landing_Page/>
      </header>
    </div>
  );
}

export default App;
