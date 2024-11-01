import React, { useEffect, useState } from 'react';
import fetchSensorData from './sensorData';  // Import the fetch function
import './Home.css';
import plantImg from './plantTest.png'
import logo from './logo.png'

const Home = () => {
  const [sensorData, setSensorData] = useState({ lux: null, soil_moisture: null, temp: null });
  const [error, setError] = useState(null);

  // Images to cycle through
  const images = [
    { src: plantImg, alt: 'Plant 1' },
    { src: logo, alt: 'Plant 2' },
  ];

  const [currentImage, setCurrentImage] = useState(images[0]);  // Initial image

  // Function to handle dropdown change
  const handleDropdownChange = (event) => {
    const selectedIndex = event.target.value;
    setCurrentImage(images[selectedIndex]);  // Change the image based on selected option
  };

  // Fetch sensor data when the component mounts
  useEffect(() => {
    fetchSensorData(setSensorData, setError);  // Call the fetch function and pass the state handlers

    // Set up interval to fetch data periodically 
    const interval = setInterval(() => fetchSensorData(setSensorData, setError), 50000000);


    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='page'>
      {/* Left Side: Image */}
      <div className="left-half">
        <div className="image-container">
          <img src={currentImage.src} alt={currentImage.alt} className="displayed-image" />
        </div>

        {/* Sensor data displayed in the bottom-left quarter */}
        <div className="info-container">
          <h2>Current Plant Sensor Data</h2>
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <p><strong>Light Level:</strong> {sensorData.lux !== null ? `${sensorData.lux} lux` : 'Loading...'}</p>
              <p><strong>Soil Moisture:</strong> {sensorData.soil_moisture !== null ? sensorData.soil_moisture : 'Loading...'}</p>
              <p><strong>Temperature:</strong> {sensorData.temp !== null ? `${sensorData.temp} °C` : 'Loading...'}</p>
            </>
          )}
        </div>
      </div>

      {/* Right Half: Dropdown menu commented out for now
      <div className="right-half">
        <select onChange={handleDropdownChange} className="plant-dropdown">
          <option value="0">Plant 1</option>
          <option value="1">Plant 2</option>
        </select>
      </div>
      */}
    </div>
  );
};

export default Home;
