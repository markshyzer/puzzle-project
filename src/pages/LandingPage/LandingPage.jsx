import React from 'react'
import UserPage from '../UserPage/UserPage'

function LandingPage(props) {
  let landingpage = props.user ?
    <div className="LandingPage">
        <UserPage
            user={props.user}
        />
        </div>
    :
    <div>
        <h1>Welcome to P U Z Z L E S</h1>
        <h2>Please sign in to proceed</h2>
    </div>;

  return (
    <div className='NavBar'>
      {landingpage}
    </div>
  );
}

export default LandingPage;