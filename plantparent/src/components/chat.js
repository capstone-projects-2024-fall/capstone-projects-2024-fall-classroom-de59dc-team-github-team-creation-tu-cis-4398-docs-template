import React, { useState } from 'react';
import './chat.css';  // Import your CSS for styling

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello, Oracle of Planti!', sender: 'user' },
    { text: 'Hi! What information about plants would you like to know?', sender: 'ai' }
  ]);
  const [input, setInput] = useState('');

  // Function to handle sending a message
  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');  // Clear input field

      // Simulate AI response
      simulateAIResponse(input);
    }
  };

  // Function to simulate AI response (you can replace this with an actual API call)
  const simulateAIResponse = (userMessage) => {
    setTimeout(() => {
      const aiResponse = `You said: "${userMessage}"`; // Placeholder AI response
      setMessages((prevMessages) => [...prevMessages, { text: aiResponse, sender: 'ai' }]);
    }, 1000);  // Simulate a 1-second delay for the AI response
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
          >
            {message.text}
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
