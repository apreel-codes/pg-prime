import React from 'react';
import './GalleryBg.css'
import { Link } from "react-router-dom";


const GalleryBg = () => {
    return (
        <div className='gallery mt-34 mb-5'>
            <div className='title w-[90%] mx-auto'>
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

            <div className='gallery-buttons flex flex-row justify-between md:w-[30%] w-[89%] mx-auto mt-5 space-x-3'>
                <button className='shop-now-button'>
                    <Link to={{ pathname: '/search', search: `allProducts`}}>
                        Shop now
                    </Link>
                </button>
                  <button className='explore-button flex flex-row justify-between items-center px-4'>
                     <Link className='' to="/gallery">Explore Gallery </Link>
                    <img className='h-3 w-3' src="../images/more.png" />
                  </button>
            </div>
        </div>
    )
}

export default GalleryBg;