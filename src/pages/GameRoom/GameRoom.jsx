
import React, { Component, useEffect, useRef, useState } from 'react';

import "./GameRoom.css";
import useSocket from "../../useSocket";
import Puzzle from '../../components/Puzzle/Puzzle'

const GameRoom = (props) => {
  const { roomId } = props.match.params; // Gets roomId from URL
  const { messages, sendMessage } = useSocket(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  

  // Auto Scroll to chatbox bottom
  const messageEl = useRef(null);
  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

  return (
    <div>
      <h1 className="room-name">Room: {roomId}</h1>
      <Puzzle 
        roomId={props.match.params}
      />
      <div className="chat-room-container">
        
        <div className="messages-container"ref={messageEl}>
          <ol className="messages-list" >
            {messages.map((message, i) => (
              <li
                key={i}
                className={`message-item ${
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
              >
                {message.body}
              </li>
            ))}
          </ol>
        </div>
        <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Chat here..."
          className="new-message-input-field"
        />
        <button onClick={handleSendMessage} className="send-message-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default GameRoom;