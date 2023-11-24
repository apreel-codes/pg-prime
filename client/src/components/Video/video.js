import React, { useContext, useEffect, useState } from 'react';
import './video.css';


const HomeVideo = () => {
    return (
        <div>
            <div className='video-wrap w-[90%] mx-auto mb-5'>
                <video className='video' controls>
                    <source src="../images/video.mp4" type="video/mp4" />
                </video>    
            </div>

            {/* <div className='ratio ratio-16x9'>
                <iframe src="../images/video.mp4" title='Home video' allowFullScreen ></iframe>
            </div> */}
        </div>
        
    )
}

export default HomeVideo;