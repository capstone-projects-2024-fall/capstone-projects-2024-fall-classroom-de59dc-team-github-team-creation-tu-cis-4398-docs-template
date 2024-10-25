import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios';
import SignUpForm from './SignUpForm';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedInSuccess, setLoggedInSuccess] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const navigate = useNavigate();

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Basic email format validation
        return emailRegex.test(email);
    };

    // Password validation function
    const validatePassword = (password) => {
        // At least 8 characters, 1 uppercase, 1 number, and 1 special character
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return passwordRegex.test(password);
    };

    const signUpButton = () => {
        setShowSignUp(true);
    };

    const handleSignUpClose = () => {
        setShowSignUp(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setLoggedInSuccess(false);

        // Validate email and password before making API call
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Invalid Credentials');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/match_user', { email, password });
            console.log(response.data);

            if (response.status === 200) {
                setLoggedInSuccess(true);
                navigate('/home-page'); // Navigate to the HomePage
            }

        } catch (error) {
            setLoggedInSuccess(false);
            if (error.response) {
                setError('Login failed. Please check your credentials.');
                console.error('Error during login:', error.response.data);
            } else if (error.request) {
                setError('No response from server. Please try again later.');
                console.error('No response received:', error.request);
            } else {
                setError('Something went wrong. Please try again.');
                console.error('Error during request:', error.message);
            }
        }
    };

    return (
        <div className="login-container">
            <div className="quest-text">Let&apos;s begin your journey</div>
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
                {loggedInSuccess && <p className="success-message">Logged in successfully, Let&apos;s begin the Journey!</p>}
                <button type="submit" className="login-button">Begin Quest</button>
                <div>
                    <button type="button" onClick={signUpButton}>Sign Up</button>
                </div>
            </form>
            {showSignUp && <SignUpForm onClose={handleSignUpClose} />}
        </div>
    );
};

export default LoginPage;