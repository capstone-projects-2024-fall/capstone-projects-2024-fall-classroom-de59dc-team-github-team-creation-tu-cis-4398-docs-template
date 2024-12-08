
import React, {useState} from 'react';

//UNCOMMENT THESE IMPORTS UNTIL THE LINE BREAK TO VIEW GAME SCREEN
import LoginPage from './views/LoginPage/LoginPage.jsx';
import AvatarPage from './views/Avatar/AvatarPage.jsx';
import CreateQuestsPage from './views/QuestPage/CreateQuests.jsx';
import MyQuestsPage from './views/QuestPage/MyQuests.jsx';
import HomePage from './views/HomePage/HomePage.jsx';
import CodeEditor from './views/Editor/CodeEditor.jsx';
import { DropDown, Button, Select, HUD } from './views/Examples'; // example views to showcase each component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme/theme.js';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {QuestProvider} from './views/QuestPage/QuestContext.jsx'
import QuestMainPage from './views/QuestPage/QuestMainPage.jsx';
import MultiplayerCodeEditor from './views/Editor/MultiplayerCodeEditor.jsx';
import TwoPlayerQuestPage from './views/QuestPage/TwoPlayerQuestPage.jsx';
import PlayerAnimation from '../GAME/Player/player.jsx';
import Timer from './components/Timer/timer.jsx';


//UNCOMMENT TO TEST GAME SCREEN
// import PlayerAnimation from '../GAME/Player/player.jsx';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (loginStatus) => {
    setIsLoggedIn(loginStatus);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <QuestProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/code-editor" element={<CodeEditor />} />  
            <Route path="/multiplayer-code-editor" element={<MultiplayerCodeEditor />} />
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/create-quests" element={<CreateQuestsPage />}/>
            <Route path="/my-quests" element={<MyQuestsPage/>} />
            <Route path="/quest-main" element={<QuestMainPage />} /> 
            <Route path="/two-player" element={<TwoPlayerQuestPage />} />
            <Route path="/avatar" element={<AvatarPage />} />
          </Routes>
        </QuestProvider>
      </Router>
    </ThemeProvider>


    // // UNCOMMENT TO VIEW TIMER
    // <Timer />

    //UNCOMMENT TO VIEW GAME SCREEN
    // <div>
    //   <PlayerAnimation />
    // </div>
  );
}

export default App;