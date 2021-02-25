import React, {useRef, useEffect} from 'react';
import {TweenMax, TimelineLite, Power3, gsap} from 'gsap'

import { Link } from 'react-router-dom';
import './UserPage.scss'

export default function UserPage(props) {
    let content1 = useRef(null);
    let content2 = useRef(null);
    let tl = new TimelineLite();
    useEffect(() => {
      const link = content1.children[0]
      const h1 = content2.children[0]

      tl.from(content1, 1.5, {x: -360, ease: Power3.easeOut}, 'Start')

      tl.from(content2, 1.5, {x: 360, ease: Power3.easeOut}, 'Start')
        .from(h1, 1.5, {scale: 1.2, ease: Power3.easeOut})

    })

    return (
        <div className="UserPage">
            <div ref={el => content1 = el}>
                <Link style={{fontSize: 35}} to='/images'>Start a new game</Link>
            </div>
            <hr></hr>
            <div ref={el => content2 = el}>
                <h1>Join a game</h1>
            </div>

        </div>
    )
}
