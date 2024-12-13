import React, { useState, useEffect }  from 'react';
import './index.css';

//gets the amount of gold for current user from database
async function getPlayerData(email){
    const response = await fetch("http://127.0.0.1:5000/api/getPlayerData?email="+email)
    const data = await response.json()
    return data[1].worldState, data[0].gold
  }

const GamePage = ({email}) =>{
    useEffect(() => {
        const getPlayerData = async () => {
            const response = await fetch("http://127.0.0.1:5000/api/getPlayerData?email="+email)
            const data = await response.json()
            localStorage.setItem('email', email)
            localStorage.setItem('worldState', data[1].worldState)
            localStorage.setItem('gold', data[0].gold)
        }
        getPlayerData()
    },[email.email])


    
    return(
        <div>
            <iframe src='public/index.html' width='1000px' height='1000px'></iframe>
        </div>
    );
}

export default GamePage;
