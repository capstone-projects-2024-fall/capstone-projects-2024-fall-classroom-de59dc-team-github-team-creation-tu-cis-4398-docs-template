import React, { useState, useEffect } from 'react';
import styles from './SignUpForm.module.css';
import InputField from './InputField';
import wizardLogo from './assets/WizardLogo.png';
import CanvasPage from './ConnectCanvas';
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const SignUpForm = ({ switchToLogin, switchToCanvas }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    canvasKey: '',
    selectedMotto: '',
    
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isHelpOpen, setHelpOpen] = useState(false);

  const toggleHelpDialog = () => setHelpOpen(!isHelpOpen);


  const mottos = [
    'Knowledge is Power',
    'Master Your Quest',
    'Learn, Grow, Conquer',
    'Wisdom Through Effort',
    'Study. Focus. Triumph.',
    'Challenge Accepted',
    'Level Up Your Mind',
    'Progress, Not Perfection',
    'Strength in Learning',
    'Rise to the Challenge',
  ];

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

  const handleDropdownChange = (e) => {
    const updatedFormData = { ...formData, selectedMotto: e.target.value };
    setFormData(updatedFormData);
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
      

      // const validateData = await validateResponse.json();
      // console.log('Success:', validateData);
      // setSuccess(true);
      // setCanvasKey(''); // Clear the input field after successful submission

      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          lastName: formData.lastName,
          nickname: formData.nickname,
          email: formData.email,
          password: formData.password,
          canvasKey: formData.canvasKey,
          selectedMotto: formData.selectedMotto,
          
        }),
      });

      

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }


      console.log('Payload sent to backend:', {
        canvasKey: formData.canvasKey,
        email: formData.email,
      });
      const validateResponse = await fetch('http://localhost:5000/canvasKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          canvasKey: formData.canvasKey,
          email: formData.email,
          }),
      });

      if (!validateResponse.ok) {
        // Extract error message from the backend response
        const errorData = await validateResponse.json();

        throw new Error(errorData.message || 'An unknown error occurred.');
      }


      const data = await response.json();

      setMessage(data.message);
      // Clear form and localStorage after successful signup
      setFormData({
        name: '',
        lastName: '',
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
        canvasKey: '',
        selectedMotto: '',
        
      });
      //localStorage.removeItem('signupFormData');
      switchToLogin(); // Switch to Login page after successful signup
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
    { label: 'Nickname', type: 'text', id: 'nickname', placeholder: 'Enter your nickname' },
    { label: 'Email', type: 'email', id: 'email', placeholder: 'Enter your email' },
    { label: 'Password', type: 'password', id: 'password', placeholder: 'Enter your password' },
    { label: 'Confirm Password', type: 'password', id: 'confirmPassword', placeholder: 'Confirm your password' },
    { label: 'Canvas Key', type: 'text', id: 'canvasKey', placeholder: 'Enter your Canvas access key' },
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

          <Tooltip title="Click for help with Canvas Key" arrow>

          <IconButton onClick={toggleHelpDialog} aria-label="Help with Canvas Key">

            <HelpOutlineIcon />

          </IconButton>

          </Tooltip>

          {/* dropdown motto menu */}

          <div style={{ margin: '16px 0' }}></div>

          <label htmlFor="selectedMotto" className={styles.dropdownLabel}>
            Choose Your Motto:
          </label>
          <select
            id="selectedMotto"
            value={formData.selectedMotto}
            onChange={handleDropdownChange}
            className={styles.dropdown}
          >
            <option value="" disabled>
              Select a motto
            </option>
            {mottos.map((motto, index) => (
              <option key={index} value={motto}>
                {motto}
              </option>
            ))}
          </select>

          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.submitButton}>Submit</button>
            <button type="button" onClick={switchToLogin} className={styles.submitButton}>Already have an account?</button>
          </div>
        </form>
        {/* Dialog for Canvas Key instructions */}

        <Dialog open={isHelpOpen} onClose={toggleHelpDialog}>

          <DialogTitle>What is a Canvas Key?</DialogTitle>

          <DialogContent>

            <p>

              A Canvas Key is a personal access token that you can generate in your Canvas account settings. 

              Use this key to connect your account securely to Canvas Quest.

            </p>

            <ol>

              <li>Log in to your Canvas account.</li>

              <li>Go to Account Settings.</li>

              <li>Select 'Access Tokens' and generate a new token.</li>

              <li>Copy the token and paste it here.</li>

            </ol>

          </DialogContent>

          <DialogActions>

            <Button onClick={toggleHelpDialog} color="primary">

              Close

            </Button>

          </DialogActions>

        </Dialog>
        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </section>
  );
};

export default SignUpForm;