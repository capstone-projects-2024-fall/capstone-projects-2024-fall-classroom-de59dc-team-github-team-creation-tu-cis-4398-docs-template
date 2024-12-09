import React, {useEffect } from 'react';
import "./game.css";
import initGamePlayerAnimation from './gamePlayer.js';
import knightAttack1 from "./GameAssets/Avatar/knight/knightAttack1.png";
import knightAttack2 from "./GameAssets/Avatar/knight/knightAttack2.png";
import knightAttack3 from "./GameAssets/Avatar/knight/knightAttack3.png";
import knightDeath from "./GameAssets/Avatar/knight/knightDeath.png";
import knightHurt from "./GameAssets/Avatar/knight/knightHurt.png";
import knightIdle from "./GameAssets/Avatar/knight/knightIdle.png";
import knightWalk from "./GameAssets/Avatar/knight/knightWalk.png";
import dragonAttack from "./GameAssets/Enemy/Dragon/dragonAttack.png";
import dragonIdle from "./GameAssets/Enemy/Dragon/dragonIdle.png";
import dragonHurt from "./GameAssets/Enemy/Dragon/dragonHurt.png";
import dragonDeath from "./GameAssets/Enemy/Dragon/dragonDeath.png";
import dragonWalk from "./GameAssets/Enemy/Dragon/dragonWalk.png";
import initGameEnemyAnimation from './gameEnemy.js';
import CodeEditor from '../src/views/Editor/CodeEditor.jsx';

const handleCodeSubmit = (code, language) => {
    console.log("Submitted code:", code);
    console.log("Language:", language);
    // You can extend this function to actually run the code, log it, or send it to an API
};


const GameScreen = () => {
    useEffect(() => {
        initGamePlayerAnimation();
        initGameEnemyAnimation();
    }, []);

    return (
        <div id="game-container">
            <div id="canvas-container">
                <div className="panel">QUESTION GOES HERE</div>
                <div id="canvas-area">
                    <img src={knightAttack1} alt="Player Attack 1 SS" id="playerAttack1" style={{display: "none"}} />
                    <img src={knightAttack2} alt="Player Attack 2 SS" id="playerAttack2" style={{display: "none"}} />
                    <img src={knightAttack3} alt="Player Attack 3 SS" id="playerAttack3" style={{display: "none"}} />
                    <img src={knightDeath} alt="Player Death SS" id="playerDeath" style={{display: "none"}} />
                    <img src={knightHurt} alt="Player Hurt SS" id="playerHurt" style={{display: "none"}} />
                    <img src={knightIdle} alt="Player Idle SS" id="playerIdle" style={{display: "none"}} />
                    <img src={dragonAttack} alt="Dragon Attack SS" id="dragonAttack" style={{display: "none"}} />
                    <img src={dragonIdle} alt="Dragon Idle SS" id="dragonIdle" style={{display: "none"}} />
                    <img src={dragonHurt} alt="Dragon Hurt SS" id="dragonHurt" style={{display: "none"}} />
                    <img src={dragonDeath} alt="Dragon Death SS" id="dragonDeath" style={{display: "none"}} />
                    <img src={dragonWalk} alt="Dragon Walk SS" id="dragonWalk" style={{display: "none"}} />
                    {/* <canvas id="canvas1"></canvas> */}
                    <canvas id="playerCanvas"></canvas>
                    <canvas id="enemyCanvas"></canvas>
                </div>
                <div className="panel">NARRATION GOES HERE</div>
            </div>
            <div id="text-editor">
                <CodeEditor onCodeSubmit={handleCodeSubmit} />
            </div>
        </div>
    )
}

export default GameScreen;