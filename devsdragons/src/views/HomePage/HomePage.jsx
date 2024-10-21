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
{/* import HUD from '../../components/HUD/HUD' */}

const HomePage = () => {
  return (
    <div style={{ padding: '20px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
      {/* Display the HUD at the top of the page */}
      {/*<HUD />*/}
      <h1>Welcome To Devs and Dragons</h1>
    </div>
  )
}

export default HomePage