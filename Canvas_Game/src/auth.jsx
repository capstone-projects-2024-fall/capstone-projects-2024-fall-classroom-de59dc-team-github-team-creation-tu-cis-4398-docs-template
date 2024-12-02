import React, { useState } from 'react'; // Combined imports
import ReactDOM from 'react-dom';
import SignUpForm from './SignUpForm';
import LoginPage from './LoginPage';
import App from './App';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);  // Login is the default state
  const [isDashboard, setIsDashboard] = useState(false);

  const switchToSignUp = () => {
    setIsLogin(false);  // Switch to sign up
  };

  const switchToLogin = () => {
    setIsLogin(true);  // Switch to login
  };

  const switchToDashboard = () => {
    setIsDashboard(true);  // Switch to dashboard
  };

  return (
    <div className='auth'>
      {isDashboard ? (
        <App />
      ) : isLogin ? (
        <LoginPage switchToSignUp={switchToSignUp} switchToDashboard={switchToDashboard} />
      ) : (
        <SignUpForm switchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default AuthPage;
