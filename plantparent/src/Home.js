import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Home.css';

const Home = () => {
  const handleLoginSuccess = (response) => {
    console.log("Login Success:", response);
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div>
        {/* Navigation Bar */}
        <nav className="navbar">
          <h1>My PlantParent</h1>
          <div className="nav-links">
            <a href="#home">Chat </a>
            <a href="#about">Plant Module </a>
            <a href="#contact"> Search </a>
          </div>
        </nav>

        <header>
          <h1>Welcome to My PlantParent</h1>
          <p>Automated Help with Your Plants</p>
        </header>

        <section>
          <h2>Login or Sign Up</h2>

          {/* Login Button */}
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            render={(renderProps) => (
              <button 
                className="google-button" 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google icon"
                  className="google-icon"
                />
                Login with Google
              </button>
            )}
          />

          {/* Sign Up Button */}
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            render={(renderProps) => (
              <button 
                className="google-button" 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google icon"
                  className="google-icon"
                />
                Sign Up with Google
              </button>
            )}
          />
        </section>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Home;
