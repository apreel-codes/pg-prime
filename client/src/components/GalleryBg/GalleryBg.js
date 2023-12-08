import React, { useEffect, useState } from 'react';
import './GalleryBg.css'
import { Link } from "react-router-dom";
import AOS from 'aos';
import { StoreImg, StoreMobileImg } from '../GalleryBg/StoreImg.js';
import 'aos/dist/aos.css';


const GalleryBg = () => {

    const [ currentSlide, setCurrentSlide ] = useState(0);
    const slideLength = StoreImg.length;


    const autoScroll = true;
    let slideInterval;
    let intervalTime = 4000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    }

    useEffect(() => {
        AOS.init({duration: 1200});
    }, []);

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime)
    }

    useEffect(() => {
        // if autoScroll is true, then call auto function
        if(autoScroll) {
            auto();
        }
        // this clears the slideInterval variable to avoid conflicts
        return () => clearInterval(slideInterval)
    }, [currentSlide]) 

    useEffect(() => {
        AOS.init({duration: 1200});
      }, []);

      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


    return (
        <div className='gallery-comp mb-4'>
            <div className='title w-[90%] mx-auto'>
                <h2 className='' data-aos="slide-up">Our Gallery</h2>
                <p className='' data-aos="slide-up">Explore the world of PGF Prime through our captivating media contents.</p>
            </div>

            {/* <div className='mobile-gallery'>
                <div className='mobile-gallery-image md:hidden block w-[88%] mx-auto' data-aos="zoom-in">
                </div>
            </div> */}
            
            {/* <div className='web-gallery'>
                <div className='web-gallery-image md:block hidden w-[95%] mx-auto' data-aos="zoom-in">
                </div>
            </div> */}

            <div className='mobile-slider md:hidden block'>
                    {
                        StoreMobileImg.map((mobile, index) => (
                            <div className = {index === currentSlide ? "mobile-slide 'mobile-current" : "mobile-slide"} key={index}>
                                {index === currentSlide && (
                                    <div className=''>
                                        <img data-aos="zoom-in" src={mobile.img} className='mobile-image mx-auto'/>
                                    </div>
                                )}
                                
                            </div>
                        ))
                    }
            </div>

            <div className='web-gallery-slider md:block hidden'>
                    {
                        StoreImg.map((store, index) => (
                            <div className = {index === currentSlide ? "web-gallery-slide 'web-gallery-current" : "web-gallery-slide"} key={index}>
                                {index === currentSlide && (
                                    <div className=''>
                                        <img data-aos="zoom-in" src={store.img} className='web-gallery-image mx-auto'/>
                                    </div>
                                )}
                                
                            </div>
                        ))
                    }
                </div>

            <div className='gallery-buttons flex flex-row justify-between md:w-[30%] w-[89%] mx-auto mt-5 space-x-3' data-aos="slide-up">
                <button className='shop-now-button'>
                    <Link onClick={() => window.scrollTo(0, 0)} to={{ pathname: '/search', search: `allProducts`}}>
                        Shop now
                    </Link>
                </button>
                  <button className='explore-button flex flex-row justify-between items-center px-4'>
                     <Link onClick={() => window.scrollTo(0, 0)} className='' to="/gallery">Explore Gallery </Link>
                    <img className='h-3 w-5' src="../images/arrow-right.png" />
                  </button>
            </div>
        </div>
    )
}

export default GalleryBg;