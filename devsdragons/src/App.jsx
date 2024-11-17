import LoginPage from './views/LoginPage/LoginPage.jsx';
import AvatarPage from './views/Avatar/AvatarPage.jsx';
import CreateQuestsPage from './views/QuestPage/CreateQuests.jsx';
import MyQuestsPage from './views/QuestPage/MyQuests.jsx';
import HomePage from './views/HomePage/HomePage.jsx';
import ProtoTypePage from './views/ProtoTypePage/ProtoTypePage.jsx';
import CodeEditor from './views/Editor/CodeEditor.jsx';
import { DropDown, Button, Select, HUD } from './views/Examples'; // example views to showcase each component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useState} from 'react';
import theme from './theme/theme.js';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {QuestProvider} from './views/QuestPage/QuestContext.jsx'
// import QuestMainPage from './views/QuestPage/QuestMainPage.jsx';



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
            <Route path="/" element={<HomePage />} />
            <Route path="/code-editor" element={<CodeEditor />} />  
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/create-quests" element={<CreateQuestsPage />}/>
            <Route path="/my-quests" element={<MyQuestsPage/>} />
            {/* <Route path="/quest-main" element={<QuestMainPage />} />  */}
            {/* <Route path="/guilds" element={<GuildsPage />} /> */}
            <Route path="/avatar" element={<AvatarPage />} />
          </Routes>
        </QuestProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;