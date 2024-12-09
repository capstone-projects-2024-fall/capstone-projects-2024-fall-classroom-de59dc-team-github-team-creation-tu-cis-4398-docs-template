import React from 'react';
import Editor from '@monaco-editor/react';

const MultiplayerCodeEditor = ({ code, language, onChange, onCodeSubmit, disabled }) => {
  const handleEditorChange = (value) => {
    if (!disabled && onChange) {
      onChange(value, "code"); // Notify the parent about code changes
    }
  };

  const runCode = () => {
    if (!disabled) {
      onCodeSubmit(code, language); // Submit the code and language to the parent
    }
  };

  const containerStyle = {
    backgroundColor: '#f0f0f0',
    border: '2px solid #ccc',
    height: '600px',
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
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={containerStyle}>
      <div style={editorContainerStyle}>
        <Editor
          height="30vh"
          language={language}
          theme="vs-light"
          value={code} // Controlled by the parent
          options={{
            readOnly: disabled, // Disable editor interaction if locked
          }}
          onChange={handleEditorChange} // Notify parent when the editor content changes
        />
      </div>
      <button
        style={buttonStyle}
        onMouseEnter={(e) => {
          if (!disabled) e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
        }}
        onMouseLeave={(e) => {
          if (!disabled) e.target.style.backgroundColor = '#007bff';
        }}
        onClick={runCode}
        disabled={disabled} // Disable the submit button if editor is locked
      >
        Submit
      </button>
    </div>
  );
};

export default MultiplayerCodeEditor;