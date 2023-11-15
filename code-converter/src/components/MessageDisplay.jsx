import React from 'react';
import './MessageDisplay.css';

const MessageDisplay = ({ message }) => {
  return (
    <div>
      <h3>Message:</h3>
      <div className="message-box">
        <textarea value={message} readOnly />
      </div>
    </div>
  );
};

export default MessageDisplay;
