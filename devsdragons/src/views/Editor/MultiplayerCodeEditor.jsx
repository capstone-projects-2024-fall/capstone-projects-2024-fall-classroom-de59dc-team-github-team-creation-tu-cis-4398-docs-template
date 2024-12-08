import React from 'react';
import Editor from '@monaco-editor/react';

const MultiplayerCodeEditor = ({ code, language, onChange, onCodeSubmit }) => {
  const handleEditorChange = (value) => {
    if (onChange) {
      onChange(value, "code"); // Notify the parent about code changes
    }
  };

  const runCode = () => {
    onCodeSubmit(code, language); // Submit the code and language to the parent
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
   
    border: '1px solid #ddd',
    borderRadius: '5px',
    overflow: 'hidden',
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
      {/* <h3 style={headerStyle}>Try your best to focus more on the code structure than the solution itself.</h3> */}
      {/* <select
        style={selectStyle}
        value={language}
        onChange={(e) => onChange(e.target.value, "language")} // Notify parent about language changes
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select> */}
      <div style={editorContainerStyle}>
        <Editor
          height="30vh"
          language={language}
          theme="vs-light"
          value={code} // Controlled by the parent
          onChange={handleEditorChange} // Notify parent when the editor content changes
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

export default MultiplayerCodeEditor;