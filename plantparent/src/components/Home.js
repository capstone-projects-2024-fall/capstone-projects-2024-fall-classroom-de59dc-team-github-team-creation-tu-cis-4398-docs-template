import React, { useState } from 'react';
import Plant from './Plant';
import './Home.css';

const Home = () => {
    const [plants, setPlants] = useState([1, 2]);

    // Function to add a new plant container
    const addPlant = () => {
        setPlants((prevPlants) => [...prevPlants, prevPlants.length + 1]);
    };

    // Function to delete a plant container by its ID
    const deletePlant = (id) => {
        setPlants((prevPlants) => prevPlants.filter((plantId) => plantId !== id));
    };

    return (
        <div className="page">
            <div className="plant-grid">
                {plants.map((id) => (
                    <div key={id} className="plant-row">
                        <button className="delete-plant" onClick={() => deletePlant(id)}>×</button>
                        <Plant plantId={id} />
                    </div>
                ))}
                <button className="add-plant" onClick={addPlant}>+</button>
            </div>
        </div>
    );
};

export default Home;
