import React from "react";
import { Link } from "react-router-dom";
import "./Room.css";

const Room = () => {
  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Give your room a unique name ..."
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/${roomName}`} className="enter-room-button">
        <img style={{width: 400, height: 'auto'}} src="http://orig12.deviantart.net/6c80/f/2015/206/8/9/retro_start_button_by_videogameelements-d92sm07.png" alt="start-game" />
      </Link>
    </div>
  );
};

export default Room;