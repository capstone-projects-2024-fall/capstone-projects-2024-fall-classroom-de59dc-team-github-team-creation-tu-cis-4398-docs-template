import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Chat from './components/chat';
import About from './components/about';
import Landing from './components/landing';


function App() {
  return (
    
    <Router>
      <Navbar />
      <div className="main-content"> {}
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/landing' element={<Landing />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/about' element={<About />} />
          </Routes>
      </div>
    </Router>
  );
}
export default App;