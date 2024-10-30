import React from 'react';
import './App.css';
import Home from './Home';
import logo from './logo.png';


function App() {
  return (
    
    <div className="App">
      <img src={logo} width={250} height={250} alt="Logo" />
      <Home />
    </div>
  );
}
export default App;