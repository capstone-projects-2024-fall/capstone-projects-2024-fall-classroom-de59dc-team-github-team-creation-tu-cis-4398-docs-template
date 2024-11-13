
import React, {useState} from 'react';



const DragonHealthBar = () => {
    const[health, setHealth] = useState(150); //random value for now (more than player)
    const [isDragonAttacking, setIsDragonAttacking] = useState(false); // State to track player's attack animation
    //health -> variable holding current health
    //setHealth -> function to update health 


    //function to decsease player's health
    const decreaseHealth = () => {
        setHealth((prevHealth) => Math.max(prevHealth - 10, 0)); 
    };
    const triggerDragonAttack = () => {
        setIsDragonAttacking(true);
        decreaseHealth();
        setTimeout(() => setIsDragonAttacking(false), 500);
    };


    return ( 
        <div>
             <button onClick={triggerDragonAttack}>Attack</button>

             {isDragonAttacking && <p>Dragon Attacking!</p>}
             
             {/* Button to decrease health */}
            <button style = {{backgroundColor: 'red', color: 'white'}} onClick= {decreaseHealth}>TakeDamage(Dragon)</button>
             {/* Display current health value */}
            <p>Health: {health}</p> {/*states health*/}

            {/*healthbar*/}
            <div style = {{width: '200px', height: '20px', backgroundColor: '#4a4a4a', position: 'relative' }}> {/*empty (outer) bar is grey*/}
            <div style = {{width:`${(health / 150) * 100}%`, height: '100%', backgroundColor: '#b3e024'}} ></div> {/* filled (inner) bar is bright green*/}
            </div>
        </div>
    );
}


export default DragonHealthBar;