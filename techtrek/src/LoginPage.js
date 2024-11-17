import React, { useState } from 'react';
import './LoginPage.css'
import { useNavigate } from "react-router-dom";

import axios from 'axios';


const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const [loggedInSuccess, setLoggedInSuccess] = useState(false)
    // const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      setError('');
      setLoggedInSuccess(false);

      try {
        const response = await axios.post('/match_user', {email, password});
        console.log(response.data)

          if (response.status === 200) {
            // onLogin(true);
            setLoggedInSuccess(true)
            // navigate('/home'); # later when we have a home page
          }

      } catch (error) {
        setLoggedInSuccess(false)
        // Safely check if error.response exists
        if (error.response) {
          setError('Login failed. Please check your credentials.');
          console.error('Error during login:', error.response.data);
        } else if (error.request) {
          // Handle no response received from the server
          setError('No response from server. Please try again later.');
          console.error('No response received:', error.request);
        } else {
          // Handle other errors like network issues or incorrect URL
          setError('Something went wrong. Please try again.');
          console.error('Error during request:', error.message);
        }
      }
    };

  

  return (
    <div className="login-container">
      <div className="quest-text">Let's begin your journey</div>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        
        {error && <p className="error-message">{error}</p>}
        {loggedInSuccess && <p className="success-message">Logged in successfully, Let's begin the Journey!</p>} 
        <button type="submit" className="login-button">Begin Quest</button>
      </form>
    </div>
  );
};


  
export default LoginPage;
