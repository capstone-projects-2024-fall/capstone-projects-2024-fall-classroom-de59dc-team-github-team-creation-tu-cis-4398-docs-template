import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './views/LoginPage/LoginPage.jsx';
import CodeEditor from './views/Editor/CodeEditor.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/code-editor" element={<CodeEditor />} />
      </Routes>
    </Router>
  );
}

export default App;