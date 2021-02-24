import React from 'react'
import NavBar from '../../components/NavBar/NavBar'


function GamePage(props) {
    return (
        <div className="GamePage">
            <NavBar 
                user={props.user}
                handleLogout={props.handleLogout}
            />
        </div>
    )
}

export default GamePage;