import React, { useEffect, useState } from 'react';
import './ChatComponents.css'; 
import io from 'socket.io-client';

const socket = io('http://localhost:3003');

// eslint-disable-next-line
const ChatComponent = ({sender, receiver, newMessage, closeChat }) => {//Sender is your own name. Receiver is the other person's.
  const [messages, setMessages] = useState([]);//message list
  const [currentMessage, setCurrentMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // socket.on('receiveMessage', message => {
    //   setMessages(prevMessages => [...prevMessages, message]);
    // });

    socket.on(sender, message => {//listen in on oneself
      if(message.receiver!==receiver) return
      if(message.type==='history'){
        setMessages(prevMessages => [...prevMessages, ...message.historyMessage]);
      }else if(message.type==='newMsg'){
        setMessages(prevMessages => [...prevMessages, message.message]);
      }
    });

    

    socket.emit('getHistoryMessage', {sender:sender, receiver: receiver,pageSize:10,pageNo:1});

    return () => {
      socket.off(sender);
    };
    // eslint-disable-next-line 
  }, []);

  const sendMessage = () => {
    const trimmedMessage = currentMessage.trim();
    if (trimmedMessage) {
      setMessages(prevMessages => [...prevMessages, { receiver,sender,message: trimmedMessage,timestamp:new Date() }  ]);

      socket.emit('sendMessage', { sender:sender, receiver: receiver, message: trimmedMessage });
      setCurrentMessage('');
    }
  };

  const deleteMessage = (index) => {
    setMessages(prevMessages => prevMessages.filter((_, i) => i !== index));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div
      className="chat-container"
      style={{ left: position.x, top: position.y }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="chat-header" onMouseDown={handleMouseDown}>
        <h3>{receiver}</h3>
        <button className="close-button" onClick={closeChat}>Close</button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.receiver === receiver ? 'sent' : 'received'}`}>
            <div className="message-content">
              <span className="message-sender">{msg.sender}</span>
              <span className="timestamp">{new Date(msg.timestamp).toLocaleString()}</span>
              <p>{msg.message}</p>
              <span className="delete-icon" onClick={() => deleteMessage(index)}>🗑️</span>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={currentMessage}
          onChange={e => setCurrentMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
