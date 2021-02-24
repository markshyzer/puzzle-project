import React from 'react'
import { Link } from 'react-router-dom';

export default function UserPage(props) {
    return (
        <div>
            <h3>Highest score:  </h3> <br/><br/>
            <Link style={{fontSize: 35}} to='/images'>Start a new game</Link>
            <hr></hr>
            <h1>Join a game</h1>

            {/* map through divs for all existing puzzles */}
        
        </div>
    )
}
