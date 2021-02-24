import React, { useState, useEffect } from 'react'
import Image from '../../components/Image/Image'
import './ImagesPage.css'
export default function ImagesPage() {
    const [images, setImages] = useState([]);

    useEffect(async () => {
        const images = await fetch('/api/images/allImage')
        let imageData = await images.json()
        setImages(imageData)
        console.log(imageData)
    }, [])

    return (
        <div>
            <h1>Choose Image</h1>
            <div className='images-flexbox'>
                {Array.isArray(images) ? (
                    images.map((image, idx) => {
                        return <Image url={image.url} id={image._id} key={idx}/>
                    })
                ) : (<h2>No Images</h2>)
                }
            </div>
        </div>
    )
}
