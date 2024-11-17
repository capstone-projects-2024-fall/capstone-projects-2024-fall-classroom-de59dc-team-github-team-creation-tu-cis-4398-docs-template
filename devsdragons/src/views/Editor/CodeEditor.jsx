import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ( { onCodeSubmit }) => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");


  const handleEditorChange = (value) => {
    setCode(value);
  };

  const runCode = () => {
    // passing the code, and the language to the parent component

    onCodeSubmit(code, language);
  };

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    border: '2px solid #ccc',
    borderRadius: '8px',
    margin: '20px',
  };

  const headerStyle = {
    color: 'black',
    fontSize: '1.5rem',
    margin: '10px 0',
  };

  const selectStyle = {
    margin: '10px 0',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #333',
    fontSize: '1rem',
  };

  const editorContainerStyle = {
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
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

  return (
    <div style={containerStyle}>
      <h3 style={headerStyle}>Try your best to focus more on the code structure than the solution itself.</h3>
      <select
        style={selectStyle}
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>
      <div style={editorContainerStyle}>
        <Editor
          height="30vh"
          language={language}
          theme="vs-light"
          value={code}
          onChange={handleEditorChange}
        />
      </div>
      <button
        style={buttonStyle}
        onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
        onClick={runCode}
      >
        Submit
      </button>
    </div>
  );
};

export default CodeEditor;