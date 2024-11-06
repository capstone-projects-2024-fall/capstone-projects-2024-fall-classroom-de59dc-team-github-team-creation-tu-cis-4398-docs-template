import React, { useEffect, useState } from 'react';
import fetchSensorData from './sensorData';  // Import the fetch function
import './Home.css';
import plantImg from './plantTest.png';
import logo from './logo.png';

const Home = () => {
  const [sensorData, setSensorData] = useState({ lux: null, soil_moisture: null, temp: null });
  const [error, setError] = useState(null);

  // Images to cycle through
  const images = [
    { src: plantImg, alt: 'Plant 1' },
    { src: logo, alt: 'Plant 2' },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to toggle images on click
  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
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
          <img
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].alt}
            className="displayed-image interactive"
            onClick={handleImageClick}
          />
        </div>

        {/* Sensor data displayed in individual boxes */}
        <div className="sensor-data-container">
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <div className="sensor-box light-level">
                <p><strong>Light Level:</strong></p>
                <span>{sensorData.lux !== null ? `${sensorData.lux} lux` : 'Loading...'}</span>
              </div>
              <div className="sensor-box soil-moisture">
                <p><strong>Soil Moisture:</strong></p>
                <span>{sensorData.soil_moisture !== null ? sensorData.soil_moisture : 'Loading...'}</span>
              </div>
              <div className="sensor-box temperature">
                <p><strong>Temperature:</strong></p>
                <span>{sensorData.temp !== null ? `${sensorData.temp} °C` : 'Loading...'}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

