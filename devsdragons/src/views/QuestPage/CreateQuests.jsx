import { useState } from 'react';
import HUD from '../../components/HUD/HUD';
import axios from 'axios';
import './CreateQuests.css'; // Import the CSS file for styling
import { useContext} from 'react';
import { QuestContext } from './QuestContext'; 
import { useNavigate } from 'react-router-dom';


const CreateQuestsPage = () => {
  const navigate = useNavigate();
  const [questTitle, setQuestTitle] = useState('');
  const [codingTopic, setCodingTopic] = useState('');
  const [problemCount, setProblemCount] = useState(3); // Default to 3 problems
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [enemy, setEnemy] = useState('');
  const [background, setBackground] = useState('');
  const [description, setDescription] = useState('');
  const [programmingLanguage, setProgrammingLanguage] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [gameType, setGameType] = useState('');
  const [questId, setQuestID] = useState('');
  const [roomOption, setRoomOption] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder values for coding topics, enemies, and backgrounds
  const codingTopics = ['Algorithms', 'Arrays', 'Data Structures', 'Recursion', 'Sorting', 'Dynamic Programming'];
  const enemies = ['Dragon', 'Mr. Mushroom'];
  const backgrounds = ['Forest', 'Desert', 'Castle Ruins'];
  const programmingLanguageOptions = ['Python', 'Java', 'JavaScript', 'C', "C++"];

  const {addQuest} = useContext(QuestContext); // taking a context object and assing that to QuestContext

  const handleCreateQuest = async (e) => {
    e.preventDefault();

    if (gameType === "two-player" && !roomCode) {
      alert('Please enter a room code for two-player quests.');
      return;
    }

    setIsLoading(true);
    const user_id = localStorage.getItem('user_id')
    try {
      const response = await axios.post('/api/quest-parameters', { user_id, questTitle, codingTopic, problemCount, difficultyLevel, enemy, background, description, programmingLanguage, gameType, roomCode: gameType === 'two-player' ? roomCode: null,});

      console.log(response.data);
      setQuestID(response.data.quest_id); 
      if (response.status === 200) {
        const newQuest = {
          id: Math.random().toString(36).substr(2, 9), 
          title: questTitle,
          difficulty: difficultyLevel,
          status: 'Not Started',
          gameType: gameType,
          roomCode: gameType === 'two-player'? roomCode: null,

        };
        addQuest(newQuest);
        alert('Quest created successfully');
        // if the quest is two-player then navigate directly to page else my-quests
        console.log("gameType", gameType)
        console.log("questID", response.data.quest_id);
        navigate("/my-quests")
      }
    } catch (error) {
      console.error('Error creating quest:', error);
      alert('Failed to create quest. Please try again.');
    } finally {
      setIsLoading(false)
    }
  };

  const handleStartRoom = async () => {
    try {
      const username = localStorage.getItem('user_id');
      const quest_id = localStorage.getItem('quest_id');
      if (!username) {
        alert("No user name provided")
        return;
      }
      console.log("username", username)
      const response = await axios.post('/api/create_room', {username, quest_id});
      if (response.status === 200) {
        setRoomCode(response.data.room_code);
      }
    } catch (error) {
      console.error("Error creating room: ", error);
      alert('Failed to create room. Please try again.');
    }
  }

  const handleJoinRoom = async () => {
    if (!roomCode) {
      alert('Please enter a room code to join a room.');
      return;
    }
    try {
      const response = await axios.post('/api/join_room', {
        room_code: roomCode,
        username: localStorage.getItem("user_id"),
      });
      if (response.status === 200) {
        alert('You have joined the room successfully!');
        console.log("Joining the room frontend", response.data)
        navigate('/two-player', { state: { roomCode: response.data.room_code, questData: response.data.quest_id, isRoomCreator: false} });

      }
    } catch (error) {
      console.error('Error joining room:', error);
      alert('Failed to join the room. Please check your room code and try again.');
    }
  }

  return (
    <div className="create-quest-page">
      <h1 className="create-quest-title">Create Quests</h1>
      <HUD />
  
      {!isPreview ? (
        <form onSubmit={handleCreateQuest} className="quest-form">
          <label className="form-label">
            Game Type:
            <div className="game-type-options">
              <label>
                <input
                  type="radio"
                  name="gameType"
                  value="one-player"
                  checked={gameType === 'one-player'}
                  onChange={() => {
                    setGameType('one-player');
                    setRoomOption('');
                    setRoomCode('');
                  }}
                />
                One Player
              </label>
              <label>
                <input
                  type="radio"
                  name="gameType"
                  value="two-player"
                  checked={gameType === 'two-player'}
                  onChange={() => setGameType('two-player')}
                />
                Two Player
              </label>
            </div>
          </label>
  
          {gameType === 'two-player' && (
            <div>
              <label className="form-label">
                Room Options:
                <div className="room-options">
                  <label>
                    <input
                      type="radio"
                      name="roomOption"
                      value="start-room"
                      checked={roomOption === 'start-room'}
                      onChange={() => {
                        setRoomOption('start-room');
                        handleStartRoom();
                      }}
                    />
                    Start Room
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="roomOption"
                      value="join-room"
                      checked={roomOption === 'join-room'}
                      onChange={() => {
                        setRoomOption('join-room');
                        setRoomCode('');
                      }}
                    />
                    Join Room
                  </label>
                </div>
              </label>
  
              {roomOption === 'join-room' && (
                <label className="form-label">
                  Room Code:
                  <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    placeholder="Enter room code"
                    className="form-input"
                    required
                  />
                  <button type="button" onClick={handleJoinRoom} className="join-room-button">
                    Join Room
                  </button>
                </label>
              )}
  
              {roomOption === 'start-room' && roomCode && (
                <p>
                  <strong>Generated Room Code:</strong> {roomCode}
                </p>
              )}
            </div>
          )}
  
          {(gameType === 'one-player' || roomOption === 'start-room') && (
            <>
              {/* Show the rest of the form only if "One Player" or "Start Room" is selected */}
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
  
              <label className="form-label">
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
                Quest Description:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter quest description"
                  className="form-textarea"
                  required
                />
              </label>
            </>
          )}
  
            <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
            aria-busy={isLoading}
            aria-label={isLoading ? 'Creating quest, please wait...' : 'Create Quest'}
          >
            {isLoading ? (
              <>
                <span className="spinner" /> Creating Quest...
              </>
            ) : (
              'Create Quest'
            )}
          </button>

        </form>
      ) : (
        <div className="quest-preview">
          {/* Preview section */}
        </div>
      )}
    </div>
  );

};

export default CreateQuestsPage;



          

