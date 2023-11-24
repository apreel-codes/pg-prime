import React, { useContext, useEffect, useState } from 'react';
import './video.css';


const HomeVideo = () => {
    return (
        <div>
            <div className='video-wrap w-[90%] mx-auto mb-5'>
                <video width="640" height="360"  autoplay loop muted className='video mx-auto' controls>
                    <source src="../images/video.mp4" type="video/mp4" />
                </video>    
            </div>
        </div>
        
    )
}

export default HomeVideo;