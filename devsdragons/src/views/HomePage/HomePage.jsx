import React from 'react';
import HUD from '../../components/HUD/HUD';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const handleMyQuestsClick = () => {
    // Logic to navigate to the My Quests tab
    window.location.href = '/my-quests';
  };

  return (
    <div className="homepage-container">
      {/* Display the HUD at the top of the page */}
      <HUD />
      <h1 className="homepage-title">Welcome To Devs and Dragons</h1>
      <button className="myquests-button" onClick={handleMyQuestsClick}>
        Go to My Quests
      </button>
    </div>
  );
};

export default HomePage;