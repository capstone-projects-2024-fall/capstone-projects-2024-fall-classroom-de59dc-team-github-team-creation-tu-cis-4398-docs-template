import React, { useState, useEffect } from 'react';
import styles from './SignUpForm.module.css';
import InputField from './InputField';
import wizardLogo from './assets/WizardLogo.png';

const SignUpForm = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Load saved form data from localStorage on component mount
    const savedFormData = localStorage.getItem('signupFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const updatedFormData = { ...formData, [id]: value };
    setFormData(updatedFormData);
    // Save form data to localStorage as user types
    localStorage.setItem('signupFormData', JSON.stringify(updatedFormData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setMessage(data.message);
      // Clear form and localStorage after successful signup
      setFormData({
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      //localStorage.removeItem('signupFormData');
    } catch (error) {
      console.error('Error details:', error);
      if (error.message === 'Failed to fetch') {
        setError('Unable to connect to the server. Please check your internet connection and try again.');
      } else {
        setError(`An error occurred: ${error.message}. Please try again later.`);
      }
    }
  };

  const formFields = [
    { label: 'Name', type: 'text', id: 'name', placeholder: 'Enter your name' },
    { label: 'Last Name', type: 'text', id: 'lastName', placeholder: 'Enter your last name' },
    { label: 'Email', type: 'email', id: 'email', placeholder: 'Enter your email' },
    { label: 'Password', type: 'password', id: 'password', placeholder: 'Enter your password' },
    { label: 'Confirm Password', type: 'password', id: 'confirmPassword', placeholder: 'Confirm your password' },
  ];

  return (
    <section className={styles.signUp}>
      <div className={styles.container}>
        <img src={wizardLogo} alt="Wizard Logo" className={styles.logo} />
        <h1 className={styles.title}>
          <strong>Canvas Quest</strong>
        </h1>
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <InputField
              key={field.id}
              {...field}
              value={formData[field.id]}
              onChange={handleInputChange}
            />
          ))}
          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.submitButton}>Submit</button>
            <button type="button" onClick={switchToLogin} className={styles.submitButton}>Already have an account?</button>
          </div>
        </form>
        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </section>
  );
};

export default SignUpForm;