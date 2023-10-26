import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useReducer, useRef, useState } from "react";
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import HomeProduct from "../components/HomeProduct";
import { Helmet } from 'react-helmet-async';
import { getError } from "../uttils";
import { toast } from "react-toastify";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { sliderData } from "../components/slider/sliderData";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { indexOf } from "core-js/es/array";


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

    const newestProducts =reverseArray(products);

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
        const sectionRef = useRef(null);
        
        const handleButtonClick = () => {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
          };



    return (
            <div className="md:w-[100%] mx-auto bg-gray-100 relative">
                <Helmet>
                    <title>PGF PRIME</title>
                </Helmet> 

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
                                                      <hr />
                                                      {
                                                        sliderData.indexOf(slide) === 2 && (
                                                          <div>
                                                            <Link>
                                                              <button onClick={handleButtonClick} className='md:mt-3 md:text-lg text-white text-base'>
                                                                  Shop Now
                                                              </button>
                                                            </Link>
                                                          </div>
                                                        )
                                                      }
                                                      
                                                  </div>
                                              </>
                                          )}
                                      </div>
                                  ))
                              }
                    </div>


                <div ref={sectionRef} className="mx-auto w-[90%]">
                        <h1 className='text-black text- md:text-4xl trending mb-4 mt-5 underline'><span className="text-red-600">Best</span>Sellers</h1>
                        {/* <hr className="trending-line -mt-6 mb-4"/> */}

                        <Carousel responsive={responsive} className="">
                            {randProducts.map((product, i) => (
                                <div key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                    <HomeProduct product={product}></HomeProduct>
                                </div>
                            
                        ))}
                        </Carousel>


                </div>               
                      
                    <div className="mx-auto w-[90%] mt-5">
                      <h1 className='text-black md:text-4xl trending mb-3 underline'><span className="text-red-600">Newest</span> Arrivals</h1>
                      {/* <hr className="trending-line -mt-4 mb-3 w-[50%]"/> */}
                          <Carousel responsive={responsive} className="mt-3 mx-auto">
                                  {newestProducts.map((product, i) => (
                                      <div key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                          <HomeProduct
                                          product={product}></HomeProduct>
                                      </div>
                                  
                                  ))}
                          </Carousel>                   
                    </div>
             


                <div className="mx-auto w-[90%] mt-5">
                  <h2 className='text-black text- md:text-4xl trending mb-4 mt-5 underline'><span className="text-red-600">Top</span> Rated</h2>
                  {/* <span className="text-sm text-gray-500">Discover the sneakers that have stolen the hearts of sneakerheads worldwide.</span> */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-3">
                        {fourProducts.map((product, i) => (
                                      <div key={product.slug} className="">
                                          <HomeProduct product={product}></HomeProduct>
                                      </div>                             
                        ))}
                  </div>

                </div>


                <div className="mx-auto w-[90%] mt-5">
                      <h1 className='text-black md:text-4xl trending mb-3 underline'><span className="text-red-600">Shop</span> Now</h1>
                      {/* <hr className="trending-line -mt-4 mb-3 w-[50%]"/> */}
                          <Carousel responsive={responsive} className="mt-3 mx-auto">
                                  {products.map((product, i) => (
                                      <div key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                          <HomeProduct
                                          product={product}></HomeProduct>
                                      </div>
                                  
                                  ))}
                          </Carousel>
                          {/* <div className="text-center mt-5">
                            <button className="md:mt-3 md:text-lg text-white text-base">View All</button>
                          </div>                   */}
                    </div>



                
                <Row className="mx-auto w-[95%] md:w-[80%] my-24">
                  <Col md={6} className="">
                    <div className="nike-red md:nike-second rounded"/>
                  </Col>
                  
                  
                  <Col md={6} className="">
                    <div fluid className="brands flex flex-row justify-between pt-16 md:grid md:grid-cols-2 md:gap-5 md:px-40 md:pt-44">
                          <Link to="/search?brand=Nike"><img className="nike w-16 mx-auto" src="./images/nike.png"></img></Link>
                          <Link to="/search?brand=Puma"><img className="nike w-12 mx-auto" src="./images/puma.png"></img></Link>
                          <Link to="/search?brand=Adidas"><img className="nike w-12 mx-auto" src="./images/adidas.png"></img></Link>
                          <Link to="/search?brand=New%20Balance"><img className="nike w-16 mx-auto" src="./images/balance.png"></img></Link>
                    </div>
                  </Col>   
                </Row>  
                
                <div className="store text-center pt-40">
                                    
                    <p className="w-[70%] mx-auto text-xl text-white font-semibold">Come on in, and let's make some sneaker magic together!</p>
                      <Link to="https://maps.google.com?q=33a%20Adebayo%20Doherty%20Rd,%20Eti-Osa%20101233,%20Lekki,%20Lagos&ftid=0x0:0xa188c9c24bd3a6f0&hl=en-NG&gl=ng&entry=gps&lucs=,47071704&g_st=iw">
                        <p className="bg-white text-black rounded-full text-base font-medium w-44 mx-auto mt-3 py-3">Locate our store</p>
                      </Link> 
                </div> 

                <Link to="https://api.whatsapp.com/message/JYVSRELGD47UC1?autoload=1&app_absent=0">
                  <img className="whatsapp"  src="./images/whatsapp.png"/>               
                </Link>
            </div>
    )
}

export default Home;


// https://images.unsplash.com/photo-1596122787821-95c4255bb936?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1887
