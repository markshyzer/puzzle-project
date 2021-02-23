import React, { useState, useEffect } from 'react'

export default function ImagePage({match}) {
    const [image, setImage] = useState([]);

    useEffect(async () => {
        const image = await fetch(`/api/images/allImage/${match.params.id}`)
        let imageData = await image.json()
        setImage(imageData)
        console.log(imageData)
    }, [])

    return (
        <div>
            <button>Setup Puzzle</button>
            <img style={{display: 'block', width: 'auto', height: 400, margin: '20px auto'}} src={image.url} alt='image' />
        </div>
    )
}
