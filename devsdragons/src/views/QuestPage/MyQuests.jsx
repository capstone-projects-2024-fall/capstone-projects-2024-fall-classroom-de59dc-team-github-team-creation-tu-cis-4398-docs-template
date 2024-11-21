import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HUD from '../../components/HUD/HUD';
import './MyQuests.css';

const MyQuestsPage = () => {
  const [quests, setQuests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("User is not logged in.");
      navigate("/"); // Redirect to login or home page
      return;
    }

    // Fetch quests for the logged-in user
    axios.get(`http://127.0.0.1:5000/user-quests?user_id=${userId}`)
      .then(response => setQuests(response.data))
      .catch(error => console.error("Error fetching quests:", error));
  }, [navigate]);

  const handleNavigateToQuest = (questId) => {
    navigate(`/quest-main?quest_id=${questId}`);
  };

  return (
    <div className="my-quests-page">
      <h1>My Quests</h1>
      <HUD />

      {quests.length === 0 ? (
        <p className="no-quests-message">You haven&apos;t created any quests yet.</p>
      ) : (
        <ul className="quest-list">
          {quests.map((quest) => (
            <li key={quest.quest_id} className="quest-item">
              <div className="quest-details">
                <h2 className="quest-title">{quest.questTitle}</h2>
                <p><strong>Coding Topic:</strong> {quest.codingTopic}</p>
                <p><strong>Difficulty Level:</strong> {quest.difficultyLevel}</p>
                <p><strong>Description:</strong> {quest.description}</p>
              </div>
              <button onClick={() => handleNavigateToQuest(quest.quest_id)} className="resume-quest-button">
                Start Quest
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyQuestsPage;


