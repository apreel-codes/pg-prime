import React from 'react';
import { FirstData } from './FirstData';
import './Gallery.css'

const Gallery = () => {
    return (
        <div>
          {
            FirstData.map((image, index) => (
                <img src={image.image} key={index} />
            ))
          }
        </div>
    )
}

export default Gallery;