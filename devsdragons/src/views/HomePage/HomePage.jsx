/*
// HomePage.jsx
import React from 'react';
import CustomButton from "../../components/Button/Button.jsx";
import HUD from '../../components/HUD/HUD'; // Import the HUD component

const HomePage = () => (
  <div style={{ padding: '20px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
    {/* Display the HUD at the top of the page }
    <HUD />

    <h1>Welcome To Devs and Dragons</h1>
  </div>
);

export default HomePage;
*/
import HUD from '../../components/HUD/HUD'
import { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [mockField, setMockField] = useState(0);
  const [incrementSuccess, setIncrementSuccess] = useState('');
  
  // Retrieve the user ID from localStorage
  const userId = localStorage.getItem('user_id');

  // Function to fetch user data
  const fetchUserData = async () => {
    if (!userId) {
      setIncrementSuccess('User not logged in');
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:5000/get_user_data', {
        params: {
          user_id: userId,
        },
      });

      if (response.status === 200) {
        setMockField(response.data.mock_field);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // UseEffect to fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to handle increment button click
  const handleIncrementClick = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/update_mock_field', {
        user_id: userId,
        increment_value: 1,
      });

      if (response.status === 200) {
        setIncrementSuccess('Mock field incremented successfully');
        // Fetch the updated value after incrementing
        fetchUserData();
      }
    } catch (error) {
      setIncrementSuccess('Failed to increment mock field');
      console.error('Error incrementing mock field:', error);
    }
  };

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
      {/* Display the HUD at the top of the page */}
      <HUD />
      <h1>Welcome To Devs and Dragons</h1>
      <p>Mock Field Count: {mockField}</p>
      <button onClick={handleIncrementClick}>Increment Mock Field</button>
      {incrementSuccess && <p>{incrementSuccess}</p>}
    </div>
  );
};

export default HomePage;


