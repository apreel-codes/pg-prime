import React from 'react';
import './GalleryBg.css'
import Button from 'react-bootstrap/Button';


const GalleryBg = () => {
    return (
        <div className='gallery'>
            <div className='title'>
                <h2 className=''>Our Gallery</h2>
                <p className=''>Explore the world of PGF Prime through our captivating media contents.</p>
            </div>
            <div className='mobile-gallery'>
                <div className='mobile-gallery-image md:hidden block w-[88%] mx-auto'>
                </div>
            </div>
            
            <div className='web-gallery'>
                <div className='web-gallery-image md:block hidden w-[95%] mx-auto'>
                </div>
            </div>

            <div className='flex flex-row justify-between md:w-[28%] w-[89%] mx-auto mt-5'>
                <button className='shop-now-button'>
                    Shop now
                </button>
                <button className='explore-button flex flex-row justify-between items-center px-4'>
                    Explore Gallery
                    <img className='h-3 w-3' src="../images/more.png" />
                </button>
            </div>
        </div>
    )
}
export default GalleryBg;