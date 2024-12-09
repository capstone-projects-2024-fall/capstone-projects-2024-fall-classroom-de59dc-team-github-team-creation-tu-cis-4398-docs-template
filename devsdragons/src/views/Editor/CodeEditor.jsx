import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ onCodeSubmit }) => {
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("vs-light"); // Default to light mode

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const runCode = () => {
    onCodeSubmit(code);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "vs-light" ? "vs-dark" : "vs-light"));
  };

  const containerStyle = {
    backgroundColor: '#f0f0f0',
    border: '2px solid #ccc',
    height: '600px', // Reduced height for the editor
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    boxSizing: 'border-box',
  };

  const editorContainerStyle = {
    flex: 1, // Takes all available space above the button
    border: '1px solid #ddd',
    borderRadius: '5px',
    overflow: 'hidden',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const toggleButtonStyle = {
    padding: '10px',
    fontSize: '1rem',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const toggleButtonHoverStyle = {
    backgroundColor: '#5a6268',
  };

  return (
    <div style={containerStyle}>
      <div style={buttonContainerStyle}>
        <button
          style={toggleButtonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = toggleButtonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#6c757d')}
          onClick={toggleTheme}
        >
          Toggle {theme === "vs-light" ? "Dark" : "Light"} Mode
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
          onClick={runCode}
        >
          Submit
        </button>
      </div>
      <div style={editorContainerStyle}>
        <Editor
          height="100%" // Adjusts dynamically to container size
          theme={theme} // Dynamically switch between light and dark themes
          value={code}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
};

export default CodeEditor;