import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Image = (props) => {
    return (
        <div>
            <Link to={`/images/${props.id}`}>
                <img style={{width: 'auto', height: 250, marginTop: 10, marginBottom: 10}} src={props.url} alt='image' />
            </Link>
        </div>
    )
}

export default Image;
