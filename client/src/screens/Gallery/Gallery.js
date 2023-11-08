import React from 'react';
import { FirstData } from './FirstData';
import { Helmet } from "react-helmet-async";
import './Gallery.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Gallery = () => {
    return (
        <div>
            <Helmet>
               <title>Gallery</title>
            </Helmet>
        <Header />
           <div className='mobile-gallery-bg' />
           <div className='gallery-page mx-auto'>
             <div className='our-gallery'>
              <h1 className='h1'>Our Gallery</h1>
              <p>At PGF PRIME, we offer a diverse selection of high-quality sneakers for all tastes and occasions, at affordable prices.</p>
            {
              FirstData.map((show, index) => (
                <img className='gallery-image' src={show.image} key={index} />
              ))
           }
             <div className='d-grid'>
              <button className='gallery-button'>SHOP NOW</button>
             </div>
             </div>
             <div className='happy-customers border'>
              <h2>Our Happy Customers</h2>
              <p>Check out these snapshots of our satisfied customers</p>
             </div>
          </div>
        <Footer />
        </div>
    )
}

export default Gallery;