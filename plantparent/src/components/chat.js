import React, { useState } from 'react';
import './chat.css';
//css

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello, Oracle of Planti!', sender: 'user' },

    { text: 'Hi! What information about plants would you like to know?', sender: 'ai' },

  ]);
  const [input, setInput] = useState('');


  const sendMessage = () => {
  //sedning
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');  // Clear input field

      // Simulate AI response
      simulateAIResponse(input);
    }
  };

// API call here
  const simulateAIResponse = (userMessage) => {
    setTimeout(() => {
      const aiResponse = `You said: "${userMessage}"`; // Placeholder AI response
      setMessages((prevMessages) => [...prevMessages, { text: aiResponse, sender: 'ai' }]);
    }, 1000);  // response
  };

  return (
    <div className="chat-container">
      <h2 style={{ textAlign: 'center', padding: '10px', color: '#2c3e50' }}>Ask Plant Chat</h2>

      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-wrapper ${message.sender === 'user' ? 'align-right' : 'align-left'}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '10px'
            }}
          >
            {message.sender === 'ai' && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <img
                  src="https://imagizer.imageshack.com/img922/4007/AosLgM.jpg"
                  alt="Plant Parent"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    marginRight: '8px'
                  }}
                />
                <div>
                  <div style={{ fontSize: '12px', color: '#000' }}>Plant Parent</div>
                  <div style={{ fontSize: '10px', color: 'green' }}>online</div>
                </div>
              </div>
            )}
            {message.sender === 'user' && (
              <div style={{ fontSize: '12px', color: '#000', marginBottom: '2px', textAlign: 'right' }}>
                User
              </div>
            )}
            <div
              className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
              style={{
                maxWidth: '70%',
                padding: '8px 12px',
                borderRadius: '20px',
                backgroundColor: message.sender === 'user' ? '#0084ff' : '#f1f0f0',
                color: message.sender === 'user' ? 'white' : '#333',
                textAlign: 'left',
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                borderBottomRightRadius: message.sender === 'user' ? '0' : '20px',
                borderBottomLeftRadius: message.sender === 'ai' ? '0' : '20px'
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
