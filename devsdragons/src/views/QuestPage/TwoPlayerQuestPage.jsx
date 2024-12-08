import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import MultiplayerCodeEditor from '../Editor/MultiplayerCodeEditor';
import './TwoPlayerQuestPage.css';
import ForestBackground from './GameAssets/Backgrounds/Forest.png';
import DesertBackground from './GameAssets/Backgrounds/Desert.png';
import RiverBackground from './GameAssets/Backgrounds/RiverCrossing.png';
import CastleBackground from './GameAssets/Backgrounds/CastleRuins.png';

// Connect to the backend server socket
const socket = io('http://10.0.0.93:30000');

// StarRating component to display stars based on the grade
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

function TwoPlayerQuestPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { roomCode, questData, isRoomCreator } = location.state || {};
    const [quest, setQuest] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [sharedCode, setSharedCode] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showContinueButton, setShowContinueButton] = useState(false);
    const [gameBackground, setGameBackground] = useState(ForestBackground); // Default background

    // Fetch quest data
    useEffect(() => {
        if (!roomCode || !questData) return;

        fetch(`/api/quest-parameters?quest_id=${questData}`)
            .then(response => response.json())
            .then(data => {
                setQuest(data);
                if (data && Array.isArray(data.questions)) {
                    setQuestions(data.questions);
                }
            })
            .catch(error => console.error('Error fetching quest data:', error));
    }, [roomCode, questData]);

    // Dynamically set the background based on quest.background
    useEffect(() => {
        if (!quest || !quest.background) return;

        const getBackgroundStyle = () => {
            switch (quest.background) {
                case 'Desert':
                    return DesertBackground;
                case 'Castle Ruins':
                    return CastleBackground;
                case 'River Crossing':
                    return RiverBackground;
                case 'Forest':
                default:
                    return ForestBackground;
            }
        };

        setGameBackground(getBackgroundStyle());
    }, [quest]);

    // Handle socket events
    useEffect(() => {
        if (!roomCode) return;

        socket.on("user_joined", (data) => {
            setMessages((prev) => [...prev, `The person joined ${data.username}, the players in the room ${data.players}`]);
        });

        socket.on("user_left", (data) => {
            setMessages((prev) => [...prev, `The person left ${data.username}, the players in the room ${data.players}`]);
        });

        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, `${data.username}: ${data.message}`]);
        });

        socket.on('code_update', (data) => {
            setSharedCode(data.code);
        });

        socket.on('language_update', (data) => {
            setLanguage(data.language);
        });

        socket.on('next_question', (data) => {
            console.log('Received next_question event:', data);
            setCurrentQuestionIndex(data.questionIndex);
            if (data.feedbacks) {
                setFeedbacks(data.feedbacks);
            }
            const nextFeedback = data.feedbacks[data.questionIndex];
            const shouldShowContinue = nextFeedback && nextFeedback.grade >= 6;
            console.log("Feedback for next question (from next_question event):", nextFeedback);
            console.log("Setting showContinueButton in next_question handler:", shouldShowContinue);
            setShowContinueButton(shouldShowContinue);
        });

        socket.on('code_submit', (data) => {
            const { questionIndex, grade, advice } = data;
            console.log("Code submit event received:", data);
            setFeedbacks((prevFeedbacks) => {
                const newFeedbacks = [...prevFeedbacks];
                newFeedbacks[questionIndex] = { grade, advice };
                return newFeedbacks;
            });
            // Determine and set showContinueButton based on the grade and current question index
            const shouldShowContinue = grade >= 6 && questionIndex === currentQuestionIndex;
            console.log("Setting showContinueButton in code_submit handler:", shouldShowContinue);
            setShowContinueButton(shouldShowContinue);
        });

        socket.emit('join_room', {
            username: localStorage.getItem('user_id'),
            room: roomCode,
        });

        return () => {
            socket.off('receive_message');
            socket.off('code_update');
            socket.off('language_update');
            socket.off('next_question');
            socket.off('code_submit');
        };
    }, [roomCode, currentQuestionIndex]);

    // Handle code submission
    const submitCode = (answer, language, questionIndex) => {
        const question = questions[questionIndex];
        fetch("/api/check_answer", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, answer })
        })
            .then(response => response.text())
            .then((text) => {
                const gradeMatch = text.match(/Grade:\s*(\d+)/);
                const adviceMatch = text.match(/Advice:\s*(.+)/);
                const grade = gradeMatch ? parseInt(gradeMatch[1], 10) : null;
                const advice = adviceMatch ? adviceMatch[1] : "";

                socket.emit('code_submit', {
                    room: roomCode,
                    questionIndex,
                    grade,
                    advice
                });

                setFeedbacks((prevFeedbacks) => {
                    const newFeedbacks = [...prevFeedbacks];
                    newFeedbacks[questionIndex] = { grade, advice };
                    return newFeedbacks;
                });

                // Show continue button only if grade >= 6
                const shouldShowContinue = grade >= 6;
                console.log("Grade:", grade, "Setting showContinueButton in submitCode:", shouldShowContinue);
                setShowContinueButton(shouldShowContinue);
            })
            .catch(error => console.error('Error submitting code:', error));
    };

    // Handle next question
    const handleNextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;

        console.log("Emitting next_question:", {
            room: roomCode,
            questionIndex: nextIndex,
            feedbacks,
        });

        socket.emit('next_question', {
            room: roomCode,
            questionIndex: nextIndex,
            feedbacks,
        });

        setCurrentQuestionIndex(nextIndex);
        // Reset showContinueButton based on the next question's feedback
        const nextFeedback = feedbacks[nextIndex];
        const shouldShowContinue = nextFeedback && nextFeedback.grade >= 6;
        console.log("Feedback for next question:", nextFeedback);
        console.log("Setting showContinueButton in handleNextQuestion:", shouldShowContinue);
        setShowContinueButton(shouldShowContinue);
    };

    // Handle chat message submission
    const sendMessage = () => {
        if (newMessage.trim()) {
            socket.emit('send_message', { room: roomCode, message: newMessage, username: localStorage.getItem('user_id') });
            setNewMessage("");
        }
    };

    // Handle code editor changes
    const handleEditorChange = (value, type) => {
        if (type === 'code') {
            setSharedCode(value);
            socket.emit('code_update', { room: roomCode, code: value });
        } else if (type === 'language') {
            setLanguage(value);
            socket.emit('language_update', { room: roomCode, language: value });
        }
    };

    // Handle leaving the room
    const leaveRoom = () => {
        const username = localStorage.getItem('user_id');
        socket.emit('leave_room', { username, room: roomCode });
        navigate("/my-quests");
    };

    return (
        <div className="quest-main-page">
            <div className="content-section">
                <div className="header">
                    <h4>Room Code: {roomCode}</h4>
                    <button className="leave-room-button" onClick={leaveRoom}>
                        Leave
                    </button>
                </div>

                {currentQuestionIndex < questions.length && (
                    <div className="question-item">
                        <div className="question-display">
                            <p><strong>Question:</strong> {questions[currentQuestionIndex]}</p>
                        </div>
                        <div
                            className="game-screen"
                            style={{
                                backgroundImage: `url(${gameBackground})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '100%',
                                height: '400px',
                            }}
                        ></div>
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
                {currentQuestionIndex >= questions.length && <h2>All questions completed!</h2>}
            </div>

            <div className="right-container">
                <div className="chat-container">
                    <h2>Collaborate with Your Teammate</h2>
                    <div style={{ border: '1px solid black', padding: '10px', height: '200px', overflowY: 'scroll' }}>
                        {messages.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Talk to your peer"
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>

                <div className="code-editor-container">
                    <MultiplayerCodeEditor
                        code={sharedCode}
                        language={language}
                        onChange={handleEditorChange}
                        onCodeSubmit={(code, lang) => submitCode(code, lang, currentQuestionIndex)}
                    />
                </div>
            </div>
        </div>
    );
}

export default TwoPlayerQuestPage;







// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';
// import { useLocation, useNavigate } from 'react-router-dom';
// import MultiplayerCodeEditor from '../Editor/MultiplayerCodeEditor';
// import './TwoPlayerQuestPage.css';
// import HUD from '../../components/HUD/HUD';

// // Connect to the backend server socket 
// const socket = io('http://10.0.0.93:30000');

// // StarRating component to display stars based on the grade. Based directly on the grade.
// function StarRating({ grade }) {
//     const totalStars = 5;
//     const filledStars = Math.round(grade / 2);

//     return (
//         <div className="star-rating">
//             {[...Array(totalStars)].map((_, index) => (
//                 <span key={index} style={{ color: index < filledStars ? 'yellow' : 'gray' }}>★</span>
//             ))}
//         </div>
//     );
// }

// function TwoPlayerQuestPage() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     console.log("location state: ", location.state)
//     const { roomCode, questData, isRoomCreator } = location.state || {};
//     const [quest, setQuest] = useState(null);
//     const [questions, setQuestions] = useState([]);
//     const [feedbacks, setFeedbacks] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [sharedCode, setSharedCode] = useState("");
//     const [language, setLanguage] = useState("javascript");
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [showContinueButton, setShowContinueButton] = useState(false);
    
//     useEffect(() => {
//         console.log("questData", questData)
//         console.log("roomCode", roomCode)
//         if (!roomCode || !questData) return;

//         // Fetch questions for the room
//         const user_id = localStorage.getItem("user_id");
//         console.log("user_id", user_id);
//         console.log("TwoPlayerQuestPage.jsx printing quest_id", questData)
//         console.log(user_id)
//         fetch(`/api/quest-parameters?quest_id=${questData}`)
//         .then(response => response.json())
//         .then(data => {

//             console.log("Fetched quest data:", data);
            
//             // Set the full quest object
//             setQuest(data);

//             if (data && Array.isArray(data.questions)) {
//                 setQuestions(data.questions);
//             } else {
//                 console.error('Invalid questions data:', data);
//                 setQuestions([]); // Set to an empty array if questions are invalid
//             }
//         })
//         console.log(questions.length, "This is the length of questions")
        
//     }, [roomCode, questData]);

//     // TEMPORARY FUNCTION TO ENSURE WE ARE PULLING DATA CORRECTLY
//     useEffect(() => {
//         if (quest) {
//             console.log(quest.background, "is the background selected.");
//             console.log(quest.enemy, "is who we are facing.");
//         } else {
//             console.log("Quest is not yet available.");
//         }
//     }, [quest]);

//     useEffect(() => {
//         if (!roomCode) return;

//         socket.on("user_joined", (data) => {
//             // console.log("User joined event data:", data);
//             setMessages((prev) => [...prev, `The person joined ${data.username}, the players in the room ${data.players}`]);
//         });

//         socket.on("user_left", (data) => {
//             console.log("User left event data:", data);
//             setMessages((prev) => [...prev, `The person left ${data.username}, the players in the room ${data.players}`]);
//         });

//         // Socket setup
//         socket.on("receive_message", (data) => {
//             console.log("received data for the receive_message", data.username, "roomCode", data.message);
//             setMessages((prev) => [...prev, `${data.username}: ${data.message}`]);
//         });

//         socket.on('code_update', (data) => {
//             console.log("received data for the code_update", data.code, "roomCode", data.room);
//             setSharedCode(data.code); // Synchronize shared code
//         });

//         socket.on('language_update', (data) => {
//             setLanguage(data.language); // Synchronize language
//         });

//         socket.emit('join_room', {
//             username: localStorage.getItem('user_id'),
//             room: roomCode,
//         });

//         socket.on('code_submit', (data) => {
//             console.log("Code submission received:", data);
//             const {questionIndex, grade, advice} = data;
//             setFeedbacks((prevFeedbacks) => {
//                 const newFeedbacks = [...prevFeedbacks];
//                 newFeedbacks[questionIndex] = { grade, advice };
//                 return newFeedbacks;
//             });

//             if (grade >= 5 && questionIndex === currentQuestionIndex) {
//                 setCurrentQuestionIndex((prevIndex) => {
//                     const nextIndex = prevIndex + 1;
//                     return nextIndex < questions.length ? nextIndex : prevIndex; // Stop at the last question
//                 });
//             }
//         })

//         return () => {
//             socket.off('receive_message');
//             socket.off('code_update');
//             socket.off('language_update');
//             socket.off('code_submit');
//         };
//     }, [roomCode]);

//     const submitCode = (answer, language, questionIndex) => {
//         const question = questions[questionIndex];
//         console.log(`Code submitted for question ${question}`, answer, language);

//         fetch("/api/check_answer", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ question, answer }),
//         })
//             .then(response => response.text())
//             .then((text) => {
//                 const gradeMatch = text.match(/Grade:\s*(\d+)/);
//                 const adviceMatch = text.match(/Advice:\s*(.+)/);
//                 const grade = gradeMatch ? parseInt(gradeMatch[1], 10) : null;
//                 const advice = adviceMatch ? adviceMatch[1] : "";

//                 socket.emit('code_submit', {
//                     room: roomCode,
//                     questionIndex,
//                     grade,
//                     advice
//                 });

               
//             })
//             .catch(error => console.error('Error submitting code:', error));
//     };

//     const sendMessage = () => {
//         if (newMessage.trim()) {
//             socket.emit('send_message', { room: roomCode, message: newMessage, username: localStorage.getItem('user_id') });
//             setNewMessage("");
//         }
//     };

//     const handleEditorChange = (value, type) => {
//         if (type === 'code') {
//             // need to print the code before emitting
//             setSharedCode(value);
//             socket.emit('code_update', { room: roomCode, code: value });
//         } else if (type === 'language') {
//             setLanguage(value);
//             socket.emit('language_update', { room: roomCode, language: value });
//         }
//     };

//     const leaveRoom = () => {
//         const username = localStorage.getItem("user_id");
//         socket.emit('leave_room', { username, room: roomCode });
//         navigate("/my-quests");
//     };

// return (
//     <div className="quest-main-page">
//         {/* Left Section */}
//         <div className="content-section">
//             <div className="header">
//                 <h4>Room Code: {roomCode}</h4>
//                 <button className="leave-room-button" onClick={leaveRoom}>
//                     Leave
//                 </button>
//             </div>

//             <div className="question-display">
//                 {questions.length > 0 ? (
//                     questions.map((question, index) => (
//                         index <= currentQuestionIndex && (
//                             <div key={index} className="question-item">
//                                 <p><strong>Question:</strong> {question}</p>
//                             </div>
//                         )
//                     ))
//                 ) : (
//                     <p>Loading questions or no questions available.</p>
//                 )}
//             </div>

//             <div className="game-screen-container">
//                 <h1>Game Container Placeholder</h1>
//             </div>

//             {/* Feedback Section */}
//             <div className="feedback-container">
//                 {feedbacks[currentQuestionIndex] && (
//                     <div className="feedback">
//                         <h3>Feedback</h3>
//                         <StarRating grade={feedbacks[currentQuestionIndex].grade} />
//                         <p><strong>Advice:</strong> {feedbacks[currentQuestionIndex].advice}</p>
//                     </div>
//                 )}
//             </div>
//         </div>

//         {/* Right Section */}
//         <div className="right-container">
//             {/* Timer */}
//             <div className="timer-container">
//                 <h1>Timer Placeholder</h1>
//             </div>

//             {/* Chat */}
//             <div className="chat-container">
//                 <h2>Collaborate with Your Teammate</h2>
//                 <div style={{ border: '1px solid black', padding: '10px', height: '200px', overflowY: 'scroll' }}>
//                     {messages.map((msg, index) => (
//                         <p key={index}>{msg}</p>
//                     ))}
//                 </div>
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Talk to your peer"
//                 />
//                 <button onClick={sendMessage}>Send</button>
//             </div>

//             {/* Code Editor */}
//             <div className="code-editor-container">
//                 <MultiplayerCodeEditor
//                     code={sharedCode}
//                     language={language}
//                     onChange={handleEditorChange}
//                     onCodeSubmit={(code, lang) => submitCode(code, lang, currentQuestionIndex)}
//                 />
//             </div>
//         </div>
//     </div>
// );

// }
// export default TwoPlayerQuestPage;