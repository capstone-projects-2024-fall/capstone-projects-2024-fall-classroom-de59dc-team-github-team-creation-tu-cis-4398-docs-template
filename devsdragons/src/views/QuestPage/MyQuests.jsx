import { useContext } from 'react';
import HUD from '../../components/HUD/HUD';
import { QuestContext } from './QuestContext';
import './MyQuests.css';
import { useNavigate } from'react-router-dom';

const MyQuestsPage = () => {
  const { quests } = useContext(QuestContext); // Access quests from QuestContext
  const navigate = useNavigate();

  const handleNavigateToQuest = (quest) => {
    if (quest.status !== 'Completed') {
      navigate('/quest-main')
    } else {
      alert("Quest is already completed")
    }
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
            <li key={quest.id} className={`quest-item ${quest.status.toLowerCase().replace(' ', '-')}`}>
              <div className="quest-details">
                <h2 className="quest-title">{quest.title}</h2>
                <p><strong>Type:</strong> {quest.type}</p>
                <p><strong>Difficulty:</strong> {quest.difficulty}</p>
                <p><strong>Status:</strong> {quest.status}</p>
              </div>
              <button onClick={() => handleNavigateToQuest(quest)} className="resume-quest-button">
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
