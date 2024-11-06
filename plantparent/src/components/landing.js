import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import './landing.css'
const handleLoginSuccess = (response) => {
    console.log("Login Success:", response);
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };


function Landing() {
    return (
    
      <div className='page'>

        <h1>Welcome to My PlantParent</h1>
        <p>Automated Help with Your Plants</p>

        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
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
        
        </section>

        <button>Sign Up</button>
        </GoogleOAuthProvider>
      </div>
    );
  }
  export default Landing;