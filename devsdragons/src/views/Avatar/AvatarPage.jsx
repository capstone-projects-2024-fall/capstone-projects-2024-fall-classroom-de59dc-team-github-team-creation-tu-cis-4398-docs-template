//import HUD from "../../components/HUD/HUD";
import React, { useState } from 'react';
import squareBlue from './squareBlue.png';
import squareGreen from './squareGreen.png';
import circleImg from './circle.png';
import triangleImg from './triangle.png';


const AvatarPage = () => {
    const [squareImage, setSquareImage] = useState(squareBlue);
    const handleSquareChange = (event) => {
        //changes the image based on user's selection 
        const selectedColor = event.target.value;
        if (selectedColor === 'blue') {
            setSquareImage(squareBlue);
        } else if (selectedColor === 'green') {
            setSquareImage(squareGreen);
        }
    }

    return (
        <div style={{ backgroundColor: 'pink', height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1> Avatar Page </h1>
            {/*<HUD />*/}

            {/*adding drop down to change color of shape*/}
            {/* wrapping all shapes in flex container to make sure they align next to each other*/}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px' }}>
                    <select onChange={handleSquareChange}> {/*triggers the handleSquareChange function so user can select option*/}
                        <option value="blue"> Blue Square</option>
                        <option value="green"> Green Square</option>
                    </select>
                    <img src={squareImage} alt="Square Shape" style={{ width: '100px' }} />

                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={circleImg} alt="Circle Shape" style={{ width: '100px', marginLeft: '10px' }} />
                    <img src={triangleImg} alt="Triangle Shape" style={{ width: '100px', marginLeft: '10px' }} />
                </div>
            </div>
        </div>
    )

};

export default AvatarPage;