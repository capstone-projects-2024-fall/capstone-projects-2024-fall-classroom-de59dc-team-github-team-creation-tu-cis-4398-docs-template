// src/views/Examples/HealthBarExample.jsx
import React from 'react';
import PlayerHealthBar from '../../components/PlayerHealthBar/PlayerHealthBar.jsx';

const HealthBarExample = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', height: '100vh'}}>
            <PlayerHealthBar />
        </div>
    );
};

export default HealthBarExample;