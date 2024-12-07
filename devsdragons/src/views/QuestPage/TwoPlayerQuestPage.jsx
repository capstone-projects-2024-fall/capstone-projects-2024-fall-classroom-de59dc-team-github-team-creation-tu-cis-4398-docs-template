import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import MultiplayerCodeEditor from '../Editor/MultiplayerCodeEditor';
import HUD from '../../components/HUD/HUD';

// Connect to the backend server socket 
const socket = io('http://192.168.1.208:30000');

// StarRating component to display stars based on the grade. Based directly on the grade.
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
    console.log("location state: ", location.state)
    const { roomCode, questData, isRoomCreator } = location.state || {};
    const [quest, setQuest] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [sharedCode, setSharedCode] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        console.log("questData", questData)
        console.log("roomCode", roomCode)
        if (!roomCode || !questData) return;

        // Fetch questions for the room
        const user_id = localStorage.getItem("user_id");
        console.log("user_id", user_id);
        console.log("TwoPlayerQuestPage.jsx printing quest_id", questData)
        console.log(user_id)
        fetch(`/api/quest-parameters?quest_id=${questData}`)
        .then(response => response.json())
        .then(data => {
            if (data && Array.isArray(data.questions)) {
                setQuestions(data.questions);
            } else {
                console.error('Invalid questions data:', data);
                setQuestions([]); // Set to an empty array if questions are invalid
            }
        })
        console.log(questions.length, "This is the length of questions")
    }, [roomCode, questData]);

    useEffect(() => {
        if (!roomCode) return;

        socket.on("user_joined", (data) => {
            // console.log("User joined event data:", data);
            setMessages((prev) => [...prev, `The person joined ${data.username}, the players in the room ${data.players}`]);
        });

        socket.on("user_left", (data) => {
            console.log("User left event data:", data);
            setMessages((prev) => [...prev, `The person left ${data.username}, the players in the room ${data.players}`]);
        });

        // Socket setup
        socket.on("receive_message", (data) => {
            console.log("received data for the receive_message", data.username, "roomCode", data.message);
            setMessages((prev) => [...prev, `${data.username}: ${data.message}`]);
        });

        socket.on('code_update', (data) => {
            console.log("received data for the code_update", data.code, "roomCode", data.room);
            setSharedCode(data.code); // Synchronize shared code
        });

        socket.on('language_update', (data) => {
            setLanguage(data.language); // Synchronize language
        });

        socket.emit('join_room', {
            username: localStorage.getItem('user_id'),
            room: roomCode,
        });

        socket.on('code_submit', (data) => {
            console.log("Code submission received:", data);
            const {questionIndex, grade, advice} = data;
            setFeedbacks((prevFeedbacks) => {
                const newFeedbacks = [...prevFeedbacks];
                newFeedbacks[questionIndex] = { grade, advice };
                return newFeedbacks;
            });

            if (grade >= 5 && questionIndex === currentQuestionIndex) {
                setCurrentQuestionIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;
                    return nextIndex < questions.length ? nextIndex : prevIndex; // Stop at the last question
                });
            }
        })

        return () => {
            socket.off('receive_message');
            socket.off('code_update');
            socket.off('language_update');
            socket.off('code_submit');
        };
    }, [roomCode]);

    const submitCode = (answer, language, questionIndex) => {
        const question = questions[questionIndex];
        console.log(`Code submitted for question ${question}`, answer, language);

        fetch("/api/check_answer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question, answer }),
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

               
            })
            .catch(error => console.error('Error submitting code:', error));
    };

    const sendMessage = () => {
        if (newMessage.trim()) {
            socket.emit('send_message', { room: roomCode, message: newMessage, username: localStorage.getItem('user_id') });
            setNewMessage("");
        }
    };

    const handleEditorChange = (value, type) => {
        if (type === 'code') {
            // need to print the code before emitting
            setSharedCode(value);
            socket.emit('code_update', { room: roomCode, code: value });
        } else if (type === 'language') {
            setLanguage(value);
            socket.emit('language_update', { room: roomCode, language: value });
        }
    };

    const leaveRoom = () => {
        const username = localStorage.getItem("user_id");
        socket.emit('leave_room', { username, room: roomCode });
        navigate("/my-quests");
    };

    return (
        <div>
            <h1>Room Code: {roomCode}</h1>
            <h1>Two Player Quest</h1>
            <div>
                <h2>Collaborate with your teammate</h2>
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
            <div>
                <h2>Questions</h2>
                {questions.length > 0 ? (
                    questions.map((question, index) => (
                        index <= currentQuestionIndex && ( // Explicitly check against currentQuestionIndex
                            <div key={index} className="question-item">
                                <p><strong>Question:</strong> {question}</p>
                                <MultiplayerCodeEditor
                                    code={sharedCode}
                                    language={language}
                                    onChange={handleEditorChange}
                                    onCodeSubmit={(code, lang) => submitCode(code, lang, index)}
                                />
                                {feedbacks[index] && (
                                    <div className="feedback">
                                        <h3>Feedback</h3>
                                        <StarRating grade={feedbacks[index].grade} />
                                        <p><strong>Advice:</strong> {feedbacks[index].advice}</p>
                                    </div>
                                )}
                            </div>
                        )
                    ))
                ) : (
                    <p>Loading questions or no questions available.</p>
                )}
            </div>
            {!isRoomCreator && (
                <button
                    style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}
                    onClick={leaveRoom}
                >
                    Leave Room
                </button>
            )}
        </div>
    );
}

export default TwoPlayerQuestPage;