import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CodeEditor from '../Editor/CodeEditor';

// StarRating component to display stars based on the grade
function StarRating({ grade }) {
    const totalStars = 5;
    const filledStars = Math.round(grade / 2); // Calculate the number of filled stars based on the grade

    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((_, index) => (
                <span key={index} style={{ color: index < filledStars ? 'yellow' : 'gray' }}>★</span>
            ))}
        </div>
    );
}

function QuestMainPage() {
    const [quest, setQuest] = useState(null); // Stores quest data
    const [feedbacks, setFeedbacks] = useState([]); // Array to store feedback for each question
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Controls the display of new questions

    const location = useLocation();
    const questId = new URLSearchParams(location.search).get("quest_id"); // Extract quest_id from URL

    useEffect(() => {
        if (!questId) {
            alert("No quest ID provided.");
            return;
        }

        // Fetch quest details from the backend
        fetch(`http://127.0.0.1:5000/quest-parameters?quest_id=${questId}`)
            .then(response => response.json())
            .then(data => setQuest(data))
            .catch(error => console.error('Error fetching quest data:', error));
    }, [questId]);

    const submitCode = (answer, language, questionIndex) => {
        if (!quest || !quest.questions[questionIndex]) {
            console.error("Question not found.");
            return;
        }

        const question = quest.questions[questionIndex]; // Get the current question
        console.log(`Submitting code for question ${question}:`, answer, language);

        fetch("http://127.0.0.1:5000/check_answer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question, answer, language }) // Include question, answer, and language
        })
            .then(response => response.text())
            .then(text => {
                // Parse the response to extract Grade and Advice
                const gradeMatch = text.match(/Grade:\s*(\d+)/);
                const adviceMatch = text.match(/Advice:\s*(.+)/);

                const grade = gradeMatch ? parseInt(gradeMatch[1], 10) : null;
                const advice = adviceMatch ? adviceMatch[1] : "";

                // Update feedback for the specific question
                setFeedbacks(prevFeedbacks => {
                    const newFeedbacks = [...prevFeedbacks];
                    newFeedbacks[questionIndex] = { grade, advice };
                    return newFeedbacks;
                });

                // Only reveal the next question if grade is at least 5
                if (grade >= 5 && questionIndex === currentQuestionIndex) {
                    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                }
            })
            .catch(error => console.error('Error submitting code:', error));
    };

    if (!quest) {
        return <div>Loading quest...</div>;
    }

    return (
        <div className="quest-main-page">
            <h1>{quest.questTitle}</h1>
            <p><strong>Description:</strong> {quest.description}</p>
            <p><strong>Background:</strong> {quest.background}</p>

            <div>
                {quest.questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
                    <div key={index} className="question-item">
                        <p><strong>Question:</strong> {question}</p>
                        <CodeEditor onCodeSubmit={(code, language) => submitCode(code, language, index)} />

                        {/* Feedback display for each question */}
                        {feedbacks[index] && (
                            <div className="feedback">
                                <h2>Feedback</h2>
                                <StarRating grade={feedbacks[index].grade} />
                                <p><strong>Advice:</strong> {feedbacks[index].advice}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuestMainPage;
