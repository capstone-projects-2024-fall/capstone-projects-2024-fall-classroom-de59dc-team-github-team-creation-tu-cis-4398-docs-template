import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CodeEditor from '../Editor/CodeEditor';
import Timer from '../../components/Timer/timer';
import "./QuestMainPage.css";

//Animations
import initGamePlayerAnimation from './gamePlayer';
import initGameEnemyAnimation from './gameEnemy';
import initMushRoomAnimation from './mushroom';

//BACKGROUND IMAGES
import forestImage from './GameAssets/Backgrounds/Forest.png'; 
import desertImage from './GameAssets/Backgrounds/Desert.png';
import riverImage from './GameAssets/Backgrounds/RiverCrossing.png';
import castleImage from './GameAssets/Backgrounds/CastleRuins.png';

//KNIGHT IMAGES
import knightAttack1 from "./GameAssets/Avatar/knight/knightAttack1.png";
import knightDeath from "./GameAssets/Avatar/knight/knightDeath.png";
import knightHurt from "./GameAssets/Avatar/knight/knightHurt.png";
import knightIdle from "./GameAssets/Avatar/knight/knightIdle.png";

//DRAGON IMAGES
import dragonAttack from "./GameAssets/Dragon/dragonAttack.png";
import dragonIdle from "./GameAssets/Dragon/dragonIdle.png";
import dragonHurt from "./GameAssets/Dragon/dragonHurt.png";
import dragonDeath from "./GameAssets/Dragon/dragonDeath.png";
import dragonWalk from "./GameAssets/Dragon/dragonWalk.png";

//MUSHROOM IMAGES
import mushroomIdle from "./GameAssets/Mushroom/mushroomIdle.png";
import mushroomAttack from "./GameAssets/Mushroom/mushroomAttack.png";
import mushroomHurt from "./GameAssets/Mushroom/mushroomHurt.png";
import mushroomDeath from "./GameAssets/Mushroom/mushroomDeath.png";

function StarRating({ grade }) {
    const totalStars = 5;
    const filledStars = Math.round(grade / 2);
    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((_, index) => (
                <span key={index} style={{ color: index < filledStars ? 'yellow' : 'gray' }}>★</span>
            ))}
        </div>
    );
}

function QuestMainPage() {
    const [quest, setQuest] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showContinueButton, setShowContinueButton] = useState(false);
    const playerRef = useRef(null);
    const enemyRef = useRef(null);
    const [playerHealth, setPlayerHealth] = useState(100); // Initial health
    const [dragonHealth, setDragonHealth] = useState(100); // Initial health
    const [gameOver, setGameOver] = useState(false);
    const [gameWin, setGameWin] = useState(false);

    //ENEMY SPRITESHEET AND FRAME INIT
    const [enemyIdleSS, setEnemyIdleSS] = useState(null);
    const [enemyIdleFrames, setEnemyIdleFrames] = useState(0);
    const [enemyHurtSS, setEnemyHurtSS] = useState(null);
    const [enemyHurtFrames, setEnemyHurtFrames] = useState(0);
    const [enemyAttackSS, setEnemyAttackSS] = useState(null);
    const [enemyAttackFrames, setEnemyAttackFrames] = useState(0);
    const [enemyDeathSS, setEnemyDeathSS] = useState(null);
    const [enemyDeathFrames, setEnemyDeathFrames] = useState(0);


    const location = useLocation();
    const questId = new URLSearchParams(location.search).get("quest_id");
    const navigate = useNavigate();

    const handleLeaveQuest = () => {
        navigate('/my-quests');
    };

    // Function to get the background style URL
    const getBackgroundStyle = () => {
        if (!quest || !quest.background) return forestImage; // Use imported image as default

        switch (quest.background) {
            case 'Desert':
                return desertImage;
            case 'Castle Ruins':
                return castleImage;
            case 'Forest':
                return forestImage; 
            case 'River Crossing':
                return riverImage;
            default:
                return forestImage; // Use default
        }
    };

    // Adjust Y position for enemy based on enemy type and background
    const getEnemyAdjust_Y = () => {
        switch (quest?.enemy) {
            case "Dragon":
                switch (quest?.background) {
                    case "Desert":
                        return 200;
                    case "Castle Ruins":
                        return 225;
                    case "Forest":
                        return 190;
                    case "River Crossing":
                        return 0;
                    default:
                        return 0;
                }
            case "Mr. Mushroom":
                switch (quest?.background) {
                    case "Desert":
                        return 50;
                    case "Castle Ruins":
                        return 10;
                    case "Forest":
                        return 30;
                    case "River Crossing":
                        return 10;
                    default:
                        return 0;
                }
            default:
                return 0; // Default offset if no specific adjustments needed
        }
    };


     // Set enemy animation parameters
    useEffect(() => {
        const setEnemyAnimations = () => {
            if (!quest || !quest.enemy) return;

            switch (quest.enemy) {
                case "Dragon":
                    setEnemyIdleSS("dragonIdle");
                    setEnemyIdleFrames(3);
                    setEnemyHurtSS("dragonHurt");
                    setEnemyHurtFrames(4);
                    setEnemyAttackSS("dragonAttack");
                    setEnemyAttackFrames(5);
                    setEnemyDeathSS("dragonDeath");
                    setEnemyDeathFrames(6);
                    break;

                case "Mr. Mushroom":
                    setEnemyIdleSS("mushroomIdle");
                    setEnemyIdleFrames(7);
                    setEnemyHurtSS("mushroomHurt");
                    setEnemyHurtFrames(5);
                    setEnemyAttackSS("mushroomAttack");
                    setEnemyAttackFrames(10);
                    setEnemyDeathSS("mushroomDeath");
                    setEnemyDeathFrames(11);
                    break;

                default:
                    console.warn("Unknown enemy type");
                    break;
            }
        };

        setEnemyAnimations();
    }, [quest]);

    // Determine what Enemy was selcted for the quest
    const initializeEnemyAnimation = (getEnemyAdjust_Y) => {
        if (!quest || !quest.enemy) return null; // Ensure quest and enemy exist

        if (quest.enemy === "Dragon") {
            return initGameEnemyAnimation(getEnemyAdjust_Y);
        } else if (quest.enemy === "Mr. Mushroom") {
            return initMushRoomAnimation(getEnemyAdjust_Y);
        }

        return null; // Default to null if no match
    };

    // Determine the timer length based on quest difficulty
    const getTimerLength = () => {
        if (!quest || !quest.difficultyLevel) return "00:03:00"; // Default to 3 minutes
        switch (quest.difficultyLevel.toLowerCase()) {
            case "easy":
                return "00:00:05";
            case "medium":
                return "00:10:01";
            case "hard":
                return "00:07:00";
            default:
                return "00:03:00";
        }
    };

    useEffect(() => {
        if (!questId) {
            alert("No quest ID provided.");
            return;
        }
        fetch(`api/quest-parameters?quest_id=${questId}`)
            .then(response => response.json())
            .then(data => setQuest(data))
            .catch(error => console.error('Error fetching quest data:', error));
    }, [questId]);

    // Init Player Animation based on background
    useEffect(() => {
        const getPlayerAdjustY = () => {
            switch (quest?.background) {
                case "Desert":
                    return 90; 
                case "Castle Ruins":
                    return 100; 
                case "Forest":
                    return 90; 
                case "River Crossing":
                    return -120;
                default:
                    return 0; // Default offset
            }
        };
    
        const timer = setTimeout(() => {
            if (document.getElementById("playerCanvas")) {
                playerRef.current = initGamePlayerAnimation(getPlayerAdjustY());
            }
        }, 100); // Short delay to ensure the canvas is ready
        return () => clearTimeout(timer);
    }, [currentQuestionIndex, quest]); // Depend on quest to reinitialize if background changes
    
    // Set enemy animation parameters
    useEffect(() => {
        const setEnemyAnimations = () => {
            if (!quest || !quest.enemy) return;
    
            switch (quest.enemy) {
                case "Dragon":
                    setEnemyIdleSS("dragonIdle");
                    setEnemyIdleFrames(3);
                    setEnemyHurtSS("dragonHurt");
                    setEnemyHurtFrames(4);
                    setEnemyAttackSS("dragonAttack");
                    setEnemyAttackFrames(5);
                    setEnemyDeathSS("dragonDeath");
                    setEnemyDeathFrames(6);
                    break;
    
                case "Mr. Mushroom":
                    setEnemyIdleSS("mushroomIdle");
                    setEnemyIdleFrames(7);
                    setEnemyHurtSS("mushroomHurt");
                    setEnemyHurtFrames(5);
                    setEnemyAttackSS("mushroomAttack");
                    setEnemyAttackFrames(10);
                    setEnemyDeathSS("mushroomDeath");
                    setEnemyDeathFrames(11);
                    break;
    
                default:
                    console.warn("Unknown enemy type");
                    break;
            }
        };
    
        setEnemyAnimations();
    
    }, [quest]);

    // Init Enemy Animation
    useEffect(() => {
        const adjust_y = getEnemyAdjust_Y();  // Compute adjust_y based on current enemy and background
        console.log("Adjust Y for enemy:", adjust_y);  // Logging to see the computed value

        const enemyTimer = setTimeout(() => {
            if (document.getElementById("enemyCanvas")) {
                console.log("Reinitializing enemy animation with adjust_y:", adjust_y);
                enemyRef.current = initializeEnemyAnimation(adjust_y);
            }
        }, 100);  

        return () => clearTimeout(enemyTimer);
    }, [currentQuestionIndex, quest, quest?.background, quest?.enemy]);  // Dependency on background and enemy to re-trigger the effect


    //win lose check
    useEffect(() => {
        if (playerHealth <= 0) {
            setGameOver(true);
        }
    }, [playerHealth]);

    useEffect(() => {
        if (dragonHealth <= 0) {
            setGameWin(true);
        }
    }, [dragonHealth]);
    
    //Resize if full screen is larger than 1440x570
    useEffect(() => {
        function handleResize() {
            const adjustCanvasSize = () => {
                const scale = window.innerWidth / 1440;
                const newWidth = 500 * scale;
                const newHeight = 500 * scale;
                return { width: newWidth, height: newHeight };
            };

            const canvasSize = adjustCanvasSize();
            const playerCanvas = document.getElementById('playerCanvas');
            const enemyCanvas = document.getElementById('enemyCanvas');
            if (playerCanvas && enemyCanvas) {
                playerCanvas.width = canvasSize.width;
                playerCanvas.height = canvasSize.height;
                enemyCanvas.width = canvasSize.width;
                enemyCanvas.height = canvasSize.height;
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize(); // Call on component mount to adjust immediately
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    

    const submitCode = (answer, language, questionIndex) => {
        if (!quest || !quest.questions[questionIndex]) {
            console.error("Question not found.");
            return;
        }
        const question = quest.questions[questionIndex];
        fetch("api/check_answer", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, answer, language })
        })
        .then(response => response.text())
        .then(text => {
            const gradeMatch = text.match(/Grade:\s*(\d+)/);
            const adviceMatch = text.match(/Advice:\s*(.+)/);
            const grade = gradeMatch ? parseInt(gradeMatch[1], 10) : null;
            const advice = adviceMatch ? adviceMatch[1] : "";

            setFeedbacks(prevFeedbacks => {
                const newFeedbacks = [...prevFeedbacks];
                newFeedbacks[questionIndex] = { grade, advice };
                return newFeedbacks;
            });
            
              // Health Logic
              const totalQuestions = quest.questions.length;
              console.log("total questions:", totalQuestions);

            if (grade >= 7) {
                // Player attacks successfully
                setDragonHealth(dragonHealth - (100/totalQuestions)); // Ensure health does not go below 0
                playerRef.current?.changeAnimation("playerAttack1", 6);
                enemyRef.current?.changeAnimation(enemyHurtSS, enemyHurtFrames);
                // enemyRef.current?.changeAnimation(enemyDeathSS, enemyDeathFrames);

            } else if (grade <= 5) {
                // Enemy attacks successfully
                setPlayerHealth((prev) => Math.max(prev - 25, 0)); // Ensure health does not go below 0
                playerRef.current?.changeAnimation("playerHurt", 5);
                enemyRef.current?.changeAnimation(enemyAttackSS, enemyAttackFrames);
            } else {
                // Neutral animations
                playerRef.current?.changeAnimation("playerIdle", 7);
                enemyRef.current?.changeAnimation(enemyIdleSS, enemyIdleFrames);
            }
            

            setShowContinueButton(grade >= 5 && questionIndex === currentQuestionIndex);
        })
        .catch(error => console.error('Error submitting code:', error));
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setShowContinueButton(false);
    };

    const handleAutoSubmit = () => {
        const question = quest.questions[currentQuestionIndex];
        if (question) {
            submitCode("", "auto", currentQuestionIndex); // Auto-submit with empty answer and "auto" as language
            // setPlayerHealth((prev) => Math.max(prev - 25, 0)); 
        }
    };

    const redirectToMyQuests = () => {
        navigate('/my-quests');
    };

    if (!quest) {
        return <div>Loading quest...</div>;
    }

    if (gameWin) {
        return (
            <div className="win-screen">
                <h1>You Win!</h1>
                <button onClick={redirectToMyQuests}>Back to My Quests</button>
            </div>
        );
    }

    if (gameOver) {
        return (
            <div className="lose-screen">
                <h1>You Lose!</h1>
                <button onClick={redirectToMyQuests}>Back to My Quests</button>
            </div>
        );
    }

    
    return (
        <div className="quest-main-page">
            <div className="content-section">
                {currentQuestionIndex < quest.questions.length && (
                    <div key={currentQuestionIndex} className="question-item">
                        <div className="question-display">
                            <p><strong>Question:</strong> {quest.questions[currentQuestionIndex]}</p>
                        </div>
                        <div className="game-screen-container" style={{ backgroundImage: `url(${getBackgroundStyle()})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div id="game-container">
                                {/* Hidden images for animation frames */}
                                <img src={knightAttack1} alt="Player Attack 1" style={{ display: "none" }} id="playerAttack1" />
                                <img src={knightDeath} alt="Player Death" style={{ display: "none" }} id="playerDeath" />
                                <img src={knightHurt} alt="Player Hurt" style={{ display: "none" }} id="playerHurt" />
                                <img src={knightIdle} alt="Player Idle" style={{ display: "none" }} id="playerIdle" />
                                <img src={dragonAttack} alt="Dragon Attack SS" id="dragonAttack" style={{display: "none"}} />
                                <img src={dragonIdle} alt="Dragon Idle SS" id="dragonIdle" style={{display: "none"}} />
                                <img src={dragonHurt} alt="Dragon Hurt SS" id="dragonHurt" style={{display: "none"}} />
                                <img src={dragonDeath} alt="Dragon Death SS" id="dragonDeath" style={{display: "none"}} />
                                <img src={dragonWalk} alt="Dragon Walk SS" id="dragonWalk" style={{display: "none"}} />
                                <img src={mushroomIdle} alt="Mushroom Idle SS" id="mushroomIdle" style={{display: "none"}} />
                                <img src={mushroomAttack} alt="Mushroom Attack SS" id="mushroomAttack" style={{display: "none"}} />
                                <img src={mushroomHurt} alt="Mushroom Hurt SS" id="mushroomHurt" style={{display: "none"}} />
                                <img src={mushroomDeath} alt="Mushroom Death SS" id="mushroomDeath" style={{display: "none"}} />

                                <button onClick={handleLeaveQuest}>Leave</button>

                                <div className="player-section">
                                    <div className="health-bar-container">
                                        <div className="health-bar">
                                            <div
                                                className="health-bar-inner"
                                                style={{ width: `${playerHealth}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <canvas id="playerCanvas" width="500" height="500"></canvas>
                                </div>

                                {/* Enemy Section */}
                                <div className="enemy-section">
                                    <div className="health-bar-container">
                                        <div className="health-bar">
                                            <div
                                                className="health-bar-inner"
                                                style={{ width: `${dragonHealth}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <canvas id="enemyCanvas" width="500" height="500"></canvas>
                                </div>

                            </div>
                        </div>
                        {feedbacks[currentQuestionIndex] && (
                            <div className="feedback">
                                <h2>Feedback</h2>
                                <StarRating grade={feedbacks[currentQuestionIndex].grade} />
                                <p><strong>Advice:</strong> {feedbacks[currentQuestionIndex].advice}</p>
                                {showContinueButton && (
                                    <button onClick={handleNextQuestion}>Continue</button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="right-container">
                <div className="timer-container">
                    <Timer TIME={getTimerLength()} onTimeout={handleAutoSubmit} />
                </div>
                <div className="code-editor-container">
                    <CodeEditor onCodeSubmit={(code, language) => submitCode(code, language, currentQuestionIndex)} />
                 </div>
            </div>
        </div>
    );
}

export default QuestMainPage;