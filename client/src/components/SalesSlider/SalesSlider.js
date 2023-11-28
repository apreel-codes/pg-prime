import React, { useState, useEffect } from 'react';
import { SalesSliderData } from './SalesSliderData';
import "./SalesSlider.css";
import { Link } from 'react-router-dom';

const SalesSlider = (props) => {
    const [ currentSlide, setCurrentSlide ] = useState(0);
    const slideLength = SalesSliderData.length;

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

    useEffect(() => {
        // if autoScroll is true, then call auto function
        if(autoScroll) {
            auto();
        }
        // this clears the slideInterval variable to avoid conflicts
        return () => clearInterval(slideInterval)
    }, [currentSlide]) //autoScroll should fire when currenSlide changes

    return (
        <div className='sales-slider'>
            {
                SalesSliderData.map((slide, index) => (
                    <div className={index === currentSlide ? "sales-slide 'sales-current" : "sales-slide"} key={index}>
                        {index === currentSlide && (
                            <div className=''>
                                <p>{slide.text} <span><Link to={slide.to} className='link'>{slide.link}</Link></span> <span>{slide.subtext}</span></p>
                                {/* <p>{slide.subtext}</p> */}
                            </div>
                        )}
                    </div>
                ))
            }
        </div>
    )
}

export default SalesSlider;