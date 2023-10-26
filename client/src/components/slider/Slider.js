import React, { useState, useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { sliderData } from './sliderData';
import "./Slider.css";

const Slider = (props) => {
    const [ currentSlide, setCurrentSlide ] = useState(0);
    const slideLength = sliderData.length;

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    }

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime)
    }

    useEffect(() => {
        // puts the current slide to slide 0 on page refresh
        setCurrentSlide(0)
    }, [])

    // useEffect(() => {
    //     // if autoScroll is true, then call auto function
    //     if(autoScroll) {
    //         auto();
    //     }
    //     // this clears the slideInterval variable to avoid conflicts
    //     return () => clearInterval(slideInterval)
    // }, [currentSlide]) //autoScroll should fire when currenSlide changes

    return (
        <div className='slider'>
            <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide}/>
            <AiOutlineArrowRight className="arrow next" onClick={nextSlide}/>

            {
                sliderData.map((slide, index) => (
                    <div className={index === currentSlide ? "slide current" : "slide"} key={index}>
                        {index === currentSlide && (
                            <>
                                <img src={slide.image} alt='slide'/>
                                <div className='content'>
                                    <h2>{slide.heading}</h2>
                                    <p>{slide.desc}</p>
                                    <hr />
                                    <button className='md:mt-3 text-white text-sm'>
                                        Shop Now
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))
            }
        </div>
    )
}

export default Slider;