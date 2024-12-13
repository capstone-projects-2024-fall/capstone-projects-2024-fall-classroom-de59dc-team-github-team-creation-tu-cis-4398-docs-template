import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import InputField from './InputField';
import wizardLogo from './assets/WizardLogo.png';
import { useAuth } from './Router'; 

const LoginPage = ({ switchToSignUp, switchToDashboard }) => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setIsSignIn} = useAuth();
  console.log("useAuth values:", useAuth());
  const { setUserEmail } = useAuth(); // Access setUserEmail from AuthContext
  console.log("setUserEmail function:", setUserEmail);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();  // Call handleLogin when the form is submitted
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.status === 200) {
        console.log("Login successful, setting userEmail:", email);
        setMessage('Login successful');
        setIsSignIn(true); // Update global signed-in state
        //setUserEmail(email); // Store logged-in user's email
        setUserEmail((prev) => {
          console.log("Previous email:", prev);
          console.log("Setting new email:", email);
          return email;
        });
        
        switchToDashboard(); // Redirect to dashboard upon successful login
      } else if (response.status === 404) {
        setMessage('Account does not exist');
      } else if (response.status === 401) {
        setMessage('Invalid password');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <main className={styles.loginContainer}>
      <img src={wizardLogo} alt="Wizard Logo" className={styles.logo} />
      <h1 className={styles.title}>
        <strong>CanvasQuest</strong>
      </h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <InputField
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className={styles.buttonGroup}>
          <button 
            type="submit" 
            className={styles.signUpButton}
            disabled={!email || !password} // Disable button if email or password is empty
          >
            Sign In
          </button>
          <button type="button" onClick={switchToSignUp} className={styles.signUpButton}>
            Sign Up
          </button>
        </div>
      </form>
      {message && <p className={styles.message}>{message}</p>} {/* Display login messages */}
    </main>
  );
};

export default LoginPage;
