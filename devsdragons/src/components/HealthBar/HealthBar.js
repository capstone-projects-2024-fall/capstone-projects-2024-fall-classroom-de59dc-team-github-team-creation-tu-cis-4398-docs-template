import React, { useState } from 'react';
import './HealthBar.css';

const HealthBar = ({ startingHealthPlayer = 100, startingHealthDragon = 150 }) => {
    const [currentCharacter, setCurrentCharacter] = useState('Player');
     //track current character
    const [healthPlayer, setHealthPlayer] = useState(startingHealthPlayer);
    const [healthDragon, setHealthDragon] = useState(startingHealthDragon);
    const [isAttacking, setIsAttacking] = useState(false); //handle attack animation status

    const getCurrentHealth = () => (currentCharacter === 'Player' ? healthPlayer : healthDragon);
    const setCurrentHealth = (newHealth) => {
        if (currentCharacter === 'Player') {
            setHealthPlayer(newHealth);
        } else {
            setHealthDragon(newHealth);
        }
    };

    const takeDamage = () => {
        const currentHealth = getCurrentHealth();
        setCurrentHealth(Math.max(currentHealth - 10, 0));
    };

    const triggerAttack = () => {
        setIsAttacking(true);
        setTimeout(() => setIsAttacking(false), 500); // Reset after 500ms
    };

    const toggleCharacter = () => {
        setCurrentCharacter((prev) => (prev === 'Player' ? 'Dragon' : 'Player'));
    };

    return React.createElement(
        'div',
        null,
        React.createElement(
            /*toggle between characters*/
            'button',
            { onClick: toggleCharacter, style: { marginBottom: '10px' } },
            `Switch to ${currentCharacter === 'Player' ? 'Dragon' : 'Player'}`
        ),
        React.createElement(
            /*button for trigger animation*/ 
            'button',
            { onClick: triggerAttack },
            `Attack (${currentCharacter})`
        ),
        React.createElement(
            /*takes damage to character's health*/
            'button',
            {
                onClick: takeDamage,
                style: { backgroundColor: 'red', color: 'white' }
            },
            `Take Damage (${currentCharacter})`
        ),
        /*animation message (black attack button)*/
        isAttacking && React.createElement('p', null, `${currentCharacter} Attacking!`),
        React.createElement('p', null, `Health: ${getCurrentHealth()}`),
        React.createElement(
            'div',
            { className: 'health-bar' },
            React.createElement('div', {
                className: 'health-bar-fill',
                style: {
                    width: `${(getCurrentHealth() / (currentCharacter === 'Player' ? startingHealthPlayer : startingHealthDragon)) * 100}%`,
                    backgroundColor: '#b3e024',
                    transition: 'width 0.5s ease-in-out', // this is for the smooth transition for width change
                }
            })
        )
    );
};

export default HealthBar;
