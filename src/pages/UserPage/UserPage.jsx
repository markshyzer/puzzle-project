import React, {useRef, useEffect, useState} from 'react';
import {TweenMax, TimelineLite, Power3, gsap} from 'gsap'

import socketIOClient from "socket.io-client";
import { Link } from 'react-router-dom';
import './UserPage.scss'
require('dotenv').config();

export default function UserPage(props) {

    const [roomsList, setRoomsList] = useState([]);

    let content1 = useRef(null);
    let content2 = useRef(null);
    let tl = new TimelineLite();
    let socket = socketIOClient(process.env.REACT_APP_ENDPOINT);
    useEffect( async () => {
      const link = content1.children[0]
      const h1 = content2.children[0]
      await socket.emit("roomList")
      await socket.on("roomListReceived", (rooms) =>
      {
        setRoomsList((roomsList) => rooms);
      })
        
      tl.from(content1, 1.5, {x: -360, ease: Power3.easeOut}, 'Start')

      tl.from(content2, 1.5, {x: 360, ease: Power3.easeOut}, 'Start')
        .from(h1, 1.5, {scale: 1.2, ease: Power3.easeOut})
    }, [])
    return (
        <div className="UserPage">
            <div ref={el => content1 = el}>
                <Link style={{fontSize: 35}} to='/Room'>Start a new game</Link>
            </div>
            <hr></hr>
            <div ref={el => content2 = el}>
                <h1>Join a game</h1>
                <div className="room-list-contain">
                    <ul>
                        {roomsList.map((room)=>
                            <a href={room}><li style={{fontSize: 30, position: 'relative', right: 14}}>{room}</li></a>
                        )}
                    </ul>
                </div>

            </div>

        </div>
    )
}
