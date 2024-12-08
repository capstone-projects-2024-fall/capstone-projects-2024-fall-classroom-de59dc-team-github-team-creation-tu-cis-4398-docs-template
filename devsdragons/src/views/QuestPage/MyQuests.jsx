import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import HUD from '../../components/HUD/HUD';
import './MyQuests.css';

const MyQuestsPage = () => {
  const [quests, setQuests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert('User is not logged in.');
      navigate('/'); // Redirect to login or home page
      return;
    }

    // Fetch quests for the logged-in user
    axios
      .get(`/api/user-quests?user_id=${userId}`)
      .then((response) => setQuests(response.data))
      .catch((error) => console.error('Error fetching quests:', error));
  }, [navigate]);

  const handleNavigateToQuest = async (questId) => {
    try {
      // Fetch details for the selected quest
      console.log("get quest details based on quest", questId);
      const response = await axios.get(`/api/quest_details?quest_id=${questId}`);
      const questDetails = response.data;
      console.log("questDetails", questDetails);
      if (!questDetails) {
        alert('Failed to retrieve quest details.');
        return;
      }

      console.log("After getting quest details", questDetails.questId, questDetails.gameType, questDetails.roomCode);
      if (questDetails.gameType === 'two-player') {
        console.log("Before sending the data", questDetails.roomCode, questDetails.questId);
        navigate('/two-player', {
          state: {
            roomCode: questDetails.roomCode,
            questData: questDetails.questId,
            isRoomCreator: true,
          },
        });
      } else {
        navigate(`/quest-main?quest_id=${questId}`);
      }
    } catch (error) {
      console.error('Error retrieving quest details:', error);
      alert('Failed to retrieve quest details. Please try again.');
    }
  };

  return (
    <div className="my-quests-page">
      <div className="my-quests-content">
        <h1>My Quests</h1>
      </div>
      <HUD />

      {quests.length === 0 ? (
        <p className="no-quests-message">You haven&apos;t created any quests yet.</p>
      ) : (
        <div className="quest-list-container">
          <div className="scrollable-container">
            <ul className="quest-list">
              {quests.map((quest) => (
                <li key={quest.quest_id} className="quest-item">
                  <div className="quest-details">
                    <h2 className="quest-title">{quest.questTitle}</h2>
                    <p><strong>Coding Topic:</strong> {quest.codingTopic}</p>
                    <p><strong>Difficulty Level:</strong> {quest.difficultyLevel}</p>
                    <p><strong>Description:</strong> {quest.description}</p>
                  </div>
                  <button
                    onClick={() => handleNavigateToQuest(quest.quest_id)}
                    className="resume-quest-button"
                  >
                    Start Quest
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyQuestsPage;