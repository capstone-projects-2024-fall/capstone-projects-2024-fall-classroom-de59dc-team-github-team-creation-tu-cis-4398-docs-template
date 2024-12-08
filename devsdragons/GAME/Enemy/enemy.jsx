import React, { useEffect } from "react";
import "./enemy.css";
import dragonAttack from "../GameAssets/Enemy/Dragon/dragonAttack.png";
import dragonIdle from "../GameAssets/Enemy/Dragon/dragonIdle.png";
import dragonHurt from "../GameAssets/Enemy/Dragon/dragonHurt.png";
import dragonDeath from "../GameAssets/Enemy/Dragon/dragonDeath.png";
import dragonWalk from "../GameAssets/Enemy/Dragon/dragonWalk.png";
import initDragonAnimation from "./enemy";

const EnemyAnimation = () => {
    useEffect(() => {
        initDragonAnimation();
    }, []);
    
    return (
        <div id="contain">
            <img src={dragonAttack} alt="Dragon Attack SS" id="dragonAttack" style={{display: "none"}} />
            <img src={dragonIdle} alt="Dragon Idle SS" id="dragonIdle" style={{display: "none"}} />
            <img src={dragonHurt} alt="Dragon Hurt SS" id="dragonHurt" style={{display: "none"}} />
            <img src={dragonDeath} alt="Dragon Death SS" id="dragonDeath" style={{display: "none"}} />
            <img src={dragonWalk} alt="Dragon Walk SS" id="dragonWalk" style={{display: "none"}} />

            <div id="controls">
                <p>Enemy Animation</p>
                <div>
                    <input type="button" name="animation" id="idle" defaultChecked />
                    <label htmlFor="idle">Idle</label>
                </div>
                <div>
                    <input type="button" name="animation" id="attack" defaultChecked />
                    <label htmlFor="attack">Attack</label>
                </div>
                <div>
                    <input type="button" name="animation" id="hurt" defaultChecked />
                    <label htmlFor="hurt">Hurt</label>
                </div>
                <div>
                    <input type="button" name="animation" id="death" defaultChecked />
                    <label htmlFor="death">Death</label>
                </div>
                <div>
                    <input type="button" name="animation" id="walk" defaultChecked />
                    <label htmlFor="walk">Walk</label>
                </div>
            </div>
            <canvas id="enemyCanvas"></canvas>
        </div>
    )

}

export default EnemyAnimation;