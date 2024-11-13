import { useState } from 'react';
import HUD from '../../components/HUD/HUD';
import axios from 'axios';
import './CreateQuests.css'; // Import the CSS file for styling
import { useContext} from 'react';
import { QuestContext } from './QuestContext'; 
import { Navigate } from 'react-router-dom';

const CreateQuestsPage = () => {
  const [questTitle, setQuestTitle] = useState('');
  const [codingTopic, setCodingTopic] = useState('');
  const [problemCount, setProblemCount] = useState(3); // Default to 3 problems
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [enemy, setEnemy] = useState('');
  const [background, setBackground] = useState('');
  const [description, setDescription] = useState('');
  const [programmingLanguage, setProgrammingLanguage] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  // Placeholder values for coding topics, enemies, and backgrounds
  const codingTopics = ['Algorithms', 'Data Structures', 'Recursion', 'Sorting', 'Dynamic Programming'];
  const enemies = ['Evil wizard', 'Dragons', 'wizards', 'professor', 'scientist'];
  const backgrounds = ['Forest', 'Desert', 'Cave', 'Mountain'];
  const programmingLanguageOptions = ['Python', 'Java', 'JavaScript', 'C', "C++"];

  const {addQuest} = useContext(QuestContext); // taking a context object and assing that to QuestContext

  const handleCreateQuest = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/quest-parameters', { questTitle, codingTopic, problemCount, difficultyLevel, enemy, background, description, programmingLanguage });
      console.log(response.data);
      if (response.status === 200) {
        const newQuest = {
          id: Math.random().toString(36).substr(2, 9), 
          title: questTitle,
          type: 'Adventure', // Adjust as necessary
          difficulty: difficultyLevel,
          status: 'Not Started'
        };
        addQuest(newQuest);
        alert('Quest created successfully');
        Navigate("/my-quests")

      }
    } catch (error) {
      console.error('Error creating quest:', error);
    }
  };

  return (
    <div className="create-quest-page">
      <h1 className="create-quest-title">Create Quests</h1>
      <HUD />

      {!isPreview ? (
        <form onSubmit={handleCreateQuest} className="quest-form">
          <label className="form-label">
            Quest Title:
            <input
              type="text"
              value={questTitle}
              onChange={(e) => setQuestTitle(e.target.value)}
              placeholder="Enter quest title"
              className="form-input"
              required
            />
          </label>

          <label className="form-label">
            Coding Topic:
            <input
              list="coding-topics"
              value={codingTopic}
              onChange={(e) => setCodingTopic(e.target.value)}
              placeholder="Select or search for a coding topic"
              className="form-input"
              required
            />
            <datalist id="coding-topics">
              {codingTopics.map((topic, index) => (
                <option key={index} value={topic} />
              ))}
            </datalist>
          </label>

          <label className="form-label">
            Amount of Problems (3-8):
            <input
              type="number"
              value={problemCount}
              onChange={(e) => setProblemCount(Math.min(Math.max(e.target.value, 3), 8))}
              className="form-input"
              min="3"
              max="8"
              required
            />
          </label>

          <label className="form-label">
            Difficulty Level:
            <select
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>

          <label className="form-label">
            Enemy:
            <select
              value={enemy}
              onChange={(e) => setEnemy(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select Enemy</option>
              {enemies.map((enemy, index) => (
                <option key={index} value={enemy}>
                  {enemy}
                </option>
              ))}
            </select>
          </label>

          <label className="form-label">
            Background:
            <select
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select Background</option>
              {backgrounds.map((bg, index) => (
                <option key={index} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </label>

          <label className='form-label'>
            Programming Language:
            <select
              value={programmingLanguage}
              onChange={(e) => setProgrammingLanguage(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select Programming Language</option>
              {programmingLanguageOptions.map((language, index) => (
                <option key={index} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </label>

          <label className="form-label">
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter quest description"
              className="form-textarea"
              required
            />
          </label>

          <button type="submit" className="submit-button">Create Quest</button>
        </form>
      ) : (
        <div className="quest-preview">
          <h2>Preview Your Quest</h2>
          <p><strong>Quest Title:</strong> {questTitle}</p>
          <p><strong>Coding Topic:</strong> {codingTopic}</p>
          <p><strong>Amount of Problems:</strong> {problemCount}</p>
          <p><strong>Difficulty Level:</strong> {difficultyLevel}</p>
          <p><strong>Enemy:</strong> {enemy}</p>
          <p><strong>Background:</strong> {background}</p>
          <p><strong>Description:</strong> {description}</p>

          <div className="button-group">
            <button className="back-button" onClick={() => setIsPreview(false)}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuestsPage;
