import { useState } from 'react';
import axios from 'axios';


/**
 * SignUpForm provides a user interface for creating a new user account.
 * It collects user information such as first name, last name, email, and password,
 * and sends these details to the backend for registration. It also manages
 * form validation and displays success or error messages.
 *
 * @component
 * @param {Function} onClose - Function to close the modal form.
 * @returns {React.Component} The SignUpForm component with form elements and logic.
 */


const SignUpForm = ({ onClose }) => {
    /**
     * State to store the first name input by the user.
     * @type {string}
     */
    const [name, setName] = useState('');
    /**
     * State to store the last name input by the user.
     * @type {string}
     */
    const [email, setEmail] = useState('');
    /**
     * State to store the password input by the user.
     * @type {string}
     */
    const [password, setPassword] = useState('');
    /**
     * State to store the success message after successful registration.
     * @type {string}
     */
    const [successMessage, setSuccessMessage] = useState('');
    /**
     * State to store error messages related to form validation or registration failure.
     * @type {string}
     */
    const [errorMessage, setErrorMessage] = useState('');
    /**
     * Handles the form submission for signing up a new user. Validates input fields,
     * constructs a user object, and attempts to register the user via a POST request.
     * Displays success or error messages based on the outcome.
     *
     * @param {React.FormEvent} e - The form submission event.
     */

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
        return emailRegex.test(email);
    };

    // Password validation function
    const validatePassword = (password) => {
        // At least 8 characters, 1 uppercase, 1 number, and 1 special character
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return passwordRegex.test(password);
    };


    const handleSignUp = async (e) => {

        e.preventDefault();
        // Handle sign-up form submission
        // Send user details to backend for registration

        // Check if any input field is empty
        if (!name || !email || !password) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage('Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.');
            setLoading(false);
            return;
        }

        const newUser = {
            name: name,
            email: email,
            password: password,
        };
        try {
            const response = await axios.post('http://127.0.0.1:5000/create_contact', newUser);
            console.log(response.data);
            setSuccessMessage('Account created');
            onClose();
        } catch (error) {
            const message = error.response?.data?.message || 'Account creation failed';
            if (message === 'Email already exists') {
                setErrorMessage('User already exists.');
            } else {
                setErrorMessage(message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-modal">
            <div className="signup-container">
                <div className="signup-close" onClick={onClose}>X</div>
                <h2 className="create-an-account">Create an Account</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <form onSubmit={handleSignUp} className="signup-form">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="signup-input"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="signup-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="signup-input"
                    />
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
