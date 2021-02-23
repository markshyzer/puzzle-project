import React from 'react'
import { Link } from 'react-router-dom';

export default function UserPage(props) {
    console.log(props)
    return (
        <div>
            <h1>Highest score:  </h1>
            <Link to='/images'>Start a new game</Link>
            <hr></hr>
            <h1>Join a game</h1>

            {/* map through divs for all existing puzzles */}
        
        </div>
    )
}
