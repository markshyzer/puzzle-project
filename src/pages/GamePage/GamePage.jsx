import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Puzzle from '../../components/Puzzle/Puzzle'

function GamePage(props) {
    return (
        <div className="GamePage">
            <NavBar 
                user={props.user}
                handleLogout={props.handleLogout}
            />
            <Puzzle />
        </div>
    )
}

export default GamePage;