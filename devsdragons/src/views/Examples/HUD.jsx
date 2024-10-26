import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HUD from '../../components/HUD/HUD'; 

// Placeholder pages to test navigation
const HomePage = () => <div><h1>Home Page</h1></div>;
const Avatar = () => <div><h1>Avatar</h1></div>;
const CreateQuests = () => <div><h1>Create Quests</h1></div>;
const MyQuests = () => <div><h1>My Quests</h1></div>;
const Guilds = () => <div><h1>Guilds</h1></div>;
const Settings = () => <div><h1>Settings</h1></div>;
const Account = () => <div><h1>Account</h1></div>;

const HUDExample = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/avatar" element={<Avatar />} />
      <Route path="/create-quests" element={<CreateQuests />} />
      <Route path="/my-quests" element={<MyQuests />} />
      <Route path="/guilds" element={<Guilds />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/account" element={<Account />} />
    </Routes>
    <HUD />
  </Router>
);

export default HUDExample;
