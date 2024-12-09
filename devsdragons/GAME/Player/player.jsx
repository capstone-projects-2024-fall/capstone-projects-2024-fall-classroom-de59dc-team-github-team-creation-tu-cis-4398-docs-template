import React, { useEffect } from "react";
import "./player.css";
import initKnightAnimation from "./player";
import knightAttack1 from "../GameAssets/Avatar/knight/knightAttack1.png";
import knightAttack2 from "../GameAssets/Avatar/knight/knightAttack2.png";
import knightAttack3 from "../GameAssets/Avatar/knight/knightAttack3.png";
import knightDeath from "../GameAssets/Avatar/knight/knightDeath.png";
import knightHurt from "../GameAssets/Avatar/knight/knightHurt.png";
import knightIdle from "../GameAssets/Avatar/knight/knightIdle.png";
import knightWalk from "../GameAssets/Avatar/knight/knightWalk.png";

const PlayerAnimation = () => {
    useEffect(() => {
        initKnightAnimation();
    }, []);

    return (
        <div id="container">
            <img src={knightAttack1} alt="Player Attack 1 SS" id="playerAttack1" style={{display: "none"}} />

            {/* <div id="controls">
                <p>Player Animations</p>
                <div>
                    <input type="radio" name="animation" id="all" defaultChecked />
                    <label htmlFor="all">All</label>
                </div>
            </div> */}
            <canvas id="playerCanvas"></canvas>
        </div>
    )
}

export default PlayerAnimation;