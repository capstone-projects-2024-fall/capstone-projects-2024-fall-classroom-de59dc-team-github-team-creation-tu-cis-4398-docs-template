import React, { useState, useEffect } from 'react';
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
    const [questions, setQuestions] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]); // Array to store feedback for each question
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Controls the display of new questions

    useEffect(() => {
        handleSetQuestions();
    }, []);

    function handleSetQuestions() { // First we will get the questions based on the questForm
        fetch('http://127.0.0.1:5000/quest-parameters?quest_id=0')
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('Error fetching questions:', error));
    }

    function submitCode(answer, language, questionIndex) { // submitting the code from the user for grading
        const question = questions[questionIndex];
        console.log(`Code submitted for question ${question}`, answer, language);

        fetch("http://127.0.0.1:5000/check_answer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question, answer })
        })
        .then(response => response.text())
        .then(text => {
            // Parsing the text response to extract Grade and Advice
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
            if (grade >= 2 && questionIndex === currentQuestionIndex) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            } 
        })
        .catch(error => console.error('Error submitting code:', error));
    }

    return (
        <>
            <h1>Questions</h1>
            <div>
                {questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
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
        </>
    );
}

export default QuestMainPage;