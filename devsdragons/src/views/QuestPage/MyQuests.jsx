import { useState, useEffect } from 'react';
import HUD from '../../components/HUD/HUD';
import './MyQuests.css'; // Custom CSS for MyQuestsPage

const MyQuestsPage = () => {
  // Dummy data for quests (this would typically come from an API or database)
  const [quests, setQuests] = useState([
    { id: 1, title: 'The Algorithmic Forest', type: 'Adventure', difficulty: 'Medium', status: 'In Progress' },
    { id: 2, title: 'Sorting Odyssey', type: 'Puzzle', difficulty: 'Hard', status: 'Completed' },
    { id: 3, title: 'Recursive Battle', type: 'Combat', difficulty: 'Easy', status: 'Not Started' }
  ]);

  return (
    <div className="my-quests-page">
      <h1>My Quests</h1>
      <HUD />

      {/* Conditional rendering: If no quests, show a message */}
      {quests.length === 0 ? (
        <p className="no-quests-message">You haven't created any quests yet.</p>
      ) : (
        <ul className="quest-list">
          {quests.map((quest) => (
            <li key={quest.id} className={`quest-item ${quest.status.toLowerCase().replace(' ', '-')}`}>
              <div className="quest-details">
                <h2 className="quest-title">{quest.title}</h2>
                <p><strong>Type:</strong> {quest.type}</p>
                <p><strong>Difficulty:</strong> {quest.difficulty}</p>
                <p><strong>Status:</strong> {quest.status}</p>
              </div>
              <button className="resume-quest-button">
                {quest.status === 'Completed' ? 'View Quest' : 'Resume Quest'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyQuestsPage;
