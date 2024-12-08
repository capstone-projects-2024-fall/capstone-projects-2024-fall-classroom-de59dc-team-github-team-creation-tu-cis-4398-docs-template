import React from 'react';
import HealthBar from '../../components/HealthBar/HealthBar.js'; // Explicitly reference .js

const HealthBarExample = () => (
    React.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'center', marginTop: '20px' } },
        React.createElement(HealthBar, { startingHealthPlayer: 100, startingHealthDragon: 150 })
    )
);

export default HealthBarExample;
