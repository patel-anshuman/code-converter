import React from 'react';
import './CodeEditor.css';

const CodeEditor = ({ onCodeChange }) => {
  const handleChange = (event) => {
    const newCode = event.target.value;
    onCodeChange(newCode); // Pass the code back to the parent component
  };

  return (
    <div className='code-editor'>
      <h3>Code Input:</h3>
      <textarea
        rows="10"
        cols="40"
        placeholder="Enter your code here..."
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default CodeEditor;
