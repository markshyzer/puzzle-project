import React, {useRef, useEffect} from 'react'
import {TweenMax, TimelineLite, Power3, gsap} from 'gsap'
import './LandingPage.scss'
import UserPage from '../UserPage/UserPage'


function LandingPage(props) {

  let app = useRef(null);
  let image = useRef(null);
  let content = useRef(null);
  let tl = new TimelineLite();

  useEffect(() => {
    if(!props.user) {
      const logoImage = image.firstElementChild;
      const h1 = content.children[0]
      const h3 = content.children[1]

      TweenMax.to(app.current, 0, {css: {visibility: 'visible'}})
      tl.from(image, 1.2, {y: 127, ease: Power3.easeOut},'Start')
        .from(logoImage, 1.2, {scale: 1.1, ease: Power3.easeOut})

      tl.staggerFrom([h1.children, h3.children], 1, {
        y: 44,
        ease: Power3.easeOut,
        delay: .15
      }, .15, 'Start')
    } 
  })

  let landingpage = props.user ?
    <div className="LandingPage">
        <UserPage
            user={props.user}
        />
        </div>
    :
    <div className='hero' ref={app}>
      
        <div ref={el => content = el}>
          <div className="content-line">
            <h1>Welcome to P U Z Z L E S</h1>
          </div>
          <div className="content-line">
            <h3>ReAL-TimE PuZZLes with friends</h3>
          </div>
        </div> 
        <div className='logo' ref={el => image = el}>
          <a href="/public"><img style={{marginTop: 50, width: 220}} src='https://image.flaticon.com/icons/png/512/205/205252.png' alt='logo'/></a>
        </div>
    </div>;

  return (
    <div>
      {landingpage}
    </div>
  );
}

export default LandingPage;