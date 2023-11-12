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


const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
            case 'FETCH_SUCCESS':
                return {...state, products: action.payload, loading: false};
                case 'FETCH_FAIL':
                    return {...state, loading: false, error: action.payload};
                    default:
                        return state;
    }
};

const Home = () => {
    const [isCatToggled, setIsCatToggled] = useState(true);
    const [isPriceToggled, setIsPriceToggled] = useState(true);
    const [isBrandToggled, setIsBrandToggled] = useState(true);
    const [isSizeToggled, setIsSizeToggled] = useState(true);
    const [link, setLink] = ('');
    
    const [{ loading, error, products}, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true, error: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try{
                const result = await axios.get('/api/products');
                dispatch({type: 'FETCH_SUCCESS', payload: result.data})
            } catch(err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            }
            
        };
        fetchData();
    }, [])

    function randomizeDataset(products) {
        const randomizedDataset = products.slice();
      
        for (let i = randomizedDataset.length - 1; i > 0; i--) {
          const randomIndex = Math.floor(Math.random() * (i + 1));
          [randomizedDataset[i], randomizedDataset[randomIndex]] = [randomizedDataset[randomIndex], randomizedDataset[i]];
        }
      
        return randomizedDataset;
      }
    
    const randProducts = randomizeDataset(products);


    const reverseArray = (products) => {
      // Function to reverse an array
      let reversedArray = [];
      for (let i = products.length - 1; i >= 0; i--) {
        reversedArray.push(products[i]);
      }
      return reversedArray;
    };

    const newestProducts = reverseArray(products);

    // Function to specify a particular number of objects from the array
    const getFourProducts = (arr, num) => {
      return arr.slice(0, num);
    };
  
    const fourProducts = getFourProducts(products, 4);


      const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 600 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 600, min: 0 },
          items: 2
        }
      };

        //autoscroll
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


         //set scroll to section
        // const sectionRef = useRef(null);
        
        // const handleButtonClick = () => {
        //     sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        //   };


          const [allProducts, setAllProducts] = useState([]);

          useEffect(() => {
            const fetchAllProducts = async () => {
              try{
                const { data } = await axios.get('/api/products/allProducts');
                setAllProducts(data);
              } catch(err) {
                toast.error(getError(err));
              }
            }
            fetchAllProducts();
          }, []);

          const sectionRef = useRef(null);

          useEffect(() => {
               console.log(sectionRef.current);
             }, []);

             const handleButtonClick = () => {
              sectionRef.current.scrollIntoView({ behavior: 'smooth' });
          };
      



    return (
            <div className="">
                <Helmet>
                    <title>PGF PRIME</title>
                </Helmet>
                <Header />
                <BgImage props={handleButtonClick} />
                <NewArrivals />
                <Link to={{ pathname: '/search', search: `allProducts`}}>
                      <button className="md:mt-3 md:text-lg text-white text-base">View All</button>
                </Link>
                <BestSellers ref={sectionRef}/>
                <GalleryBg />
                <Store />

                <Link to="https://api.whatsapp.com/message/JYVSRELGD47UC1?autoload=1&app_absent=0">
                  <img className="whatsapp"  src="./images/whatsapp.png"/>               
                </Link>
            <Footer />
            </div>
    )
}

export default Home;


// https://images.unsplash.com/photo-1596122787821-95c4255bb936?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1887
