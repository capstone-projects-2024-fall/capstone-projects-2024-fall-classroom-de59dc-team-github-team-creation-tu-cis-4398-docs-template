import React, { useState, useEffect } from 'react';

const CanvasKeyForm = () => {
  const [canvasKey, setCanvasKey] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Retrieve email from local storage when the component mounts
    const signupFormData = localStorage.getItem('signupFormData');
    if (signupFormData) {
      const { email } = JSON.parse(signupFormData);
      setEmail(email);
    }
  }, []);

  const handleChange = (event) => {
    setCanvasKey(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Reset previous error/success state
    setError(null);
    setSuccess(false);
    console.log(email);

    try {
      const response = await fetch('http://localhost:5000/canvasKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ canvasKey, email }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      setSuccess(true);
      setCanvasKey(''); // Clear the input field after successful submission
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Submit Canvas Key</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Canvas Key:
          <input
            type="text"
            value={canvasKey}
            onChange={handleChange}
            required
          />
        </label>
        <input type="hidden" value={email} />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>Canvas Key submitted successfully!</p>}
    </div>
  );
};

export default CanvasKeyForm;