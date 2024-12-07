//import HUD from "../../components/HUD/HUD";
import React, { useState } from 'react';
import squareBlue from './squareBlue.png';
import squareGreen from './squareGreen.png';
import triangleBlue from './triangleBlue.png';
import triangleGreen from './triangleGreen.png';
import circleBlue from './circleBlue.png';
import circleGreen from './circleGreen.png';


const AvatarPage = () => {
    //initializing colors for all shapes 
    const [squareImage, setSquareImage] = useState(squareBlue);
    const [triangleImage, setTriangleImage] = useState(triangleBlue);
    const [circleImage, setCircleImage] = useState(circleBlue);

    //handling square change 
    const handleSquareChange = (event) => {
        //changes the image based on user's selection 
        const selectedSquareColor = event.target.value;
        if (selectedSquareColor === 'blue') {
            setSquareImage(squareBlue);
        } else if (selectedSquareColor === 'green') {
            setSquareImage(squareGreen);
        }
    }

    //handling triangle change
    const handleTriangleChange = (event) => {
         //changes the image based on user's selection 
         const selectedTriangleColor = event.target.value;
         if(selectedTriangleColor === 'blue') {
            setTriangleImage(triangleBlue);
         } else if (selectedTriangleColor === 'green') {
            setTriangleImage(triangleGreen);
         }
    }
    //handling circle change
    const handleCircleChange = (event) => {
        //changes the image based on user's selection
        const selectedCircleColor = event.target.value;
        if(selectedCircleColor === 'blue') {
            setCircleImage(circleBlue);
        } else if (selectedCircleColor === 'green') {
            setCircleImage(circleGreen);
        }
    }

    return (
        <div style={{ backgroundColor: 'pink', height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1> Avatar Page </h1>
            <HUD />

           
            {/* wrapping all shapes in flex container to make sure they align next to each other*/}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                {/* square and it's dropdown*/}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px' }}>
                    <select onChange={handleSquareChange}> {/*triggers the handleSquareChange function so user can select option*/}
                        <option value="blue"> Blue Square</option>
                        <option value="green"> Green Square</option>
                    </select>
                    <img src={squareImage} alt="Square Shape" style={{ width: '100px' }} />

                </div>
                 {/* triangle and it's dropdown*/}
                <div style={{ display: 'flex', flexDirection: 'column',alignItems: 'center', marginLeft:'10px' }}>
                    <select onChange= {handleTriangleChange}>
                        <option value="blue"> Blue Triangle</option>
                        <option value="green"> Green Triangle</option>
                    </select>
                    <img src={triangleImage} alt="Triangle Shape" style={{ width: '100px', marginLeft: '10px' }} />
                   

                </div>
                {/*circle and it's dropdown*/}
                <div style={{ display: 'flex', flexDirection: 'column',alignItems: 'center', marginLeft:'10px' }}>
                <select onChange= {handleCircleChange}>
                        <option value="blue"> Blue Circle</option>
                        <option value="green"> Green Circle</option>
                    </select>
                <img src={circleImage} alt="Circle Shape" style={{ width: '100px', marginLeft: '10px' }} />
            </div>
            </div>
            
        </div>
    )

};

export default AvatarPage;