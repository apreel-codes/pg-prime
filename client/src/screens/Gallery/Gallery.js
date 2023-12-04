import React, { useEffect } from 'react';
import { FirstData } from './FirstData';
import { Helmet } from "react-helmet-async";
import './Gallery.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { SecondtData } from './SecondData';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Gallery = () => {

    useEffect(() => {
        AOS.init({duration: 1200});
      }, []);


    return (
        <div>
            <Helmet>
               <title>Gallery</title>
            </Helmet>
        <Header />
            <div className='mobile-gallery-bg' />
            <div className='web-gallery-bg' />
            <div className='gallery-page mx-auto'>
                <div className='our-gallery text-center'>
                <h1>Our Gallery</h1>
                <p>At PGF PRIME, we offer a diverse selection of high-quality sneakers for all tastes and occasions, at affordable prices.</p>
                <div className='md:grid md:grid-cols-4 md:gap-4 md:mx-auto md:w-[90%]'>
                {
                    FirstData.map((show, index) => (
                    <img className='gallery-image' src={show.image} key={index} data-aos="slide-up"/>
                    ))
                }
                </div>
                <div className='d-grid'>
                    <button className='gallery-button' data-aos="slide-up">
                        <Link to={{ pathname: '/search', search: `allProducts`}}>
                            SHOP NOW
                        </Link>
                    </button>
                </div>
                </div>
                <div className='happy-customers text-center'>
                <h2>Our Happy Customers</h2>
                <p>Check out these snapshots of our satisfied customers</p>
                <div className='md:grid md:grid-cols-4 md:gap-4 md:mx-auto md:w-[90%]'>
                {
                    SecondtData.map((display, index) => (
                    <img className='gallery-image' src={display.image} key={index} data-aos="slide-up"/>
                    ))
                }
                </div>
                </div>
            </div>
        <Footer />
        </div>
    )
}

export default Gallery;