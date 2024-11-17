
import React, {useState} from 'react';



const PlayerHealthBar = () => {
    const[health, setHealth] = useState(100); //random value for now
    const [isPlayerAttacking, setIsPlayerAttacking] = useState(false); // State to track player's attack animation
   
    //health -> variable holding current health
    //setHealth -> function to update health 


    //function to decrease player's health
    const decreaseHealth = () => {
        setHealth((prevHealth) => Math.max(prevHealth - 10, 0)); 
    };
    //function to trigger player attak
    const triggerAttack = () => {
        setIsPlayerAttacking(true);
        decreaseHealth();
        setTimeout(() => setIsPlayerAttacking(false), 500); // Reset after 500ms (duration of animation)
    };
   
  


    return ( 
        <div>
             {/* Button to decrease health */}
            <button style = {{backgroundColor: 'red', color: 'white'}} onClick= {decreaseHealth}>TakeDamage</button>
             {/* Display current health value */}
            <p>Health: {health}</p> {/*states health*/}
            {/* Button to trigger the attack animation  (not working yet ) */} 
            <button onClick={triggerAttack}>Attack</button>

            {/*attack animation placeholder for now*/}
            {isPlayerAttacking && <p>Player Attacking!</p>}
           
            {/* Button to decrease health */}
            <button style={{ backgroundColor: 'red', color: 'white' }} onClick={decreaseHealth}>TakeDamage(Player)</button>

            {/* Display current health value */}
            <p>Health: {health}</p>

            {/* Health bar */}
            <div style={{ width: '200px', height: '20px', backgroundColor: '#4a4a4a', position: 'relative' }}>
                <div style={{ width: `${health}%`, height: '100%', backgroundColor: '#b3e024' }}></div>
            </div>
        </div>
    );
}


export default PlayerHealthBar;