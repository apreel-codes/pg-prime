import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useReducer, useRef, useState } from "react";
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import HomeProduct from "../../components/HomeProduct/HomeProduct";
import { Helmet } from 'react-helmet-async';
import { getError } from "../../uttils";
import { toast } from "react-toastify";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { sliderData } from "../../components/slider/sliderData";
import { indexOf } from "core-js/es/array";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import BgImage from "../../components/BgImage/BgImage";
import BestSellers from "../../components/BestSellers/BestSellers";
import GalleryBg from "../../components/GalleryBg/GalleryBg";
import  Store from "../../components/Store/Store";
import HomeVideo from "../../components/Video/video";
import BackToTop from "../../components/BackToTop/BackToTop";


const Home = () => {
  
    return (
            <div className="">
                <Helmet>
                    <title>PGF PRIME</title>
                </Helmet>
                <Header />
                  <BgImage />
                  <NewArrivals />
                  <BestSellers/>
                  <GalleryBg />
                  <Store />
                  <BackToTop />
                  <Link to="https://api.whatsapp.com/message/JYVSRELGD47UC1?autoload=1&app_absent=0">
                    <img className="whatsapp"  src="./images/whatsapp.png"/>               
                  </Link>
                <Footer />
            </div>
    )
}

export default Home;


// https://images.unsplash.com/photo-1596122787821-95c4255bb936?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1887
