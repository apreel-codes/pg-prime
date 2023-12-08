import React, { useEffect, useState } from 'react';
import './Store.css'
import { Link } from 'react-router-dom';
import AOS from 'aos';
// import { StoreImg } from '../GalleryBg/StoreImg.js';
import 'aos/dist/aos.css';


const Store = () => {
    // const [ currentSlide, setCurrentSlide ] = useState(0);
    // const slideLength = StoreImg.length;


    // const autoScroll = true;
    // let slideInterval;
    // let intervalTime = 4000;

    // const nextSlide = () => {
    //     setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    // }

    // useEffect(() => {
    //     AOS.init({duration: 1200});
    // }, []);

    // function auto() {
    //     slideInterval = setInterval(nextSlide, intervalTime)
    // }

    // useEffect(() => {
    //     // if autoScroll is true, then call auto function
    //     if(autoScroll) {
    //         auto();
    //     }
    //     // this clears the slideInterval variable to avoid conflicts
    //     return () => clearInterval(slideInterval)
    // }, [currentSlide]) 

     
    return (
        <div>
            {/* <div className='store-comp w-[94%] mx-auto'>
                <div className='store-slider md:block hidden'>
                    {
                        StoreImg.map((store, index) => (
                            <div className = {index === currentSlide ? "store-slide 'store-current" : "store-slide"} key={index}>
                                {index === currentSlide && (
                                    <div className=''>
                                        <img data-aos="zoom-out" src={store.img} className='store-img '/>
                                    </div>
                                )}
                                
                            </div>
                        ))
                    }
                </div> */}

            <div className='store-comp w-[94%] mx-auto'>
                    
                    <div className='store-img md:block hidden'></div>            
                
                

                    <div className='store-content md:w-[60%] w-[95%] md:px-2 px-2 mx-auto'>
                        <h2 data-aos="slide-up">Visit Our Store Today</h2>
                        <p data-aos="slide-up">Step into our store and immerse yourself in the world of sneakers.</p>
                        <Link to="https://maps.google.com?q=33a%20Adebayo%20Doherty%20Rd,%20Eti-Osa%20101233,%20Lekki,%20Lagos&ftid=0x0:0xa188c9c24bd3a6f0&hl=en-NG&gl=ng&entry=gps&lucs=,47071704&g_st=iw"
                        ><button className='' data-aos="slide-up">Get Directions</button></Link>
                    </div>
            </div>
        </div>
    )
}
export default Store;