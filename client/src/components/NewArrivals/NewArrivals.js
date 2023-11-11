import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import logger from 'use-reducer-logger';
import './NewArrivals.css';
import HomeProduct from '../HomeProduct/HomeProduct';
import Carousel from 'react-multi-carousel';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';



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


const NewArrivals = () => {


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


    const reverseArray = (products) => {
        // Function to reverse an array
        let reversedArray = [];
        for (let i = products.length - 1; i >= 0; i--) {
          reversedArray.push(products[i]);
        }
        return reversedArray;
      };

      const newArrivals = reverseArray(products);

      const getProducts = (arr, num) => {
        return arr.slice(0, num);
      };

      const webProductsData =  getProducts(newArrivals, 9);
      const mobileProductsData = getProducts(newArrivals, 4);


      var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ]
      };
      
    
      const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 600 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 600, min: 0 },
          items: 1
        }
      };

      const [ currentSlide, setCurrentSlide ] = useState(0);
      const slideLength = mobileProductsData.length;
  
      const nextSlide = () => {
          setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
      }
  
      const prevSlide = () => {
          setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
      }
     
      useEffect(() => {
          // puts the current slide to slide 0 on page refresh
          setCurrentSlide(0)
      }, [])


    return (
        <div>
            <div className='web-carousel hidden md:block mb-4 mt-24'>
            <div className='flex flex-row justify-between items-center my-4 w-[90%] mx-auto'>
                        <h1 className='new-arrivals'>New arrivals for you</h1>
                        <button variant='' className='slider-button flex flex-row justify-between items-center'>
                            View More
                            <img src="../images/more.png" />
                        </button>
            </div>
              <Slider {...settings} className='slider'>
                  {
                      webProductsData.map((product, i) => (
                              <div key={product.slug} className='carousel-product'>
                                      <HomeProduct product={product}></HomeProduct>
                              </div>
                              
                      ))
                  }
              </Slider>
            </div>

            <div className="mx-auto w-[90%] mt-20 md:hidden block">
              <div className='flex flex-row justify-between items-center'>
                          <h1 className='new-arrivals'>New arrivals for you</h1>
                          <button variant='' className='slider-button flex flex-row justify-between items-center'>
                              View More
                              <img src="../images/more.png" />
                          </button>
              </div>
              {/* <Carousel responsive={responsive} className="new-arrival-carousel">
                      { 
                          webProductsData.map((product, i) => (
                                      <div key={product.slug} className="mb-3">
                                          <HomeProduct
                                          product={product}></HomeProduct>
                                      </div>
                                  
                        ))
                      }
              </Carousel>   */}

              
              <div className='new-arrival-slider'>
              {
                mobileProductsData.map((product, index) => (
                    <div className={index === currentSlide ? "new-arrival-slide new-arrival-current" : "new-arrival-slide"} key={index}>
                        {index === currentSlide && (
                            <div key={product.slug} className="new-arrival-content">
                              <HomeProduct
                              product={product}></HomeProduct>
                          </div>
                        )}
                    </div>
                    
                ))
              }
              </div>
              <div className='flex flex-row justify-between items-center mt-3'>
                    <AiOutlineArrowLeft className="new-arrival-arrow new-arrival-prev" onClick={prevSlide}/>
                    <span>{currentSlide + 1}/{slideLength}</span>
                    <AiOutlineArrowRight className="new-arrival-arrow new-arrival-next" onClick={nextSlide}/>
              </div>
            </div>

        </div>
    )
}
export default NewArrivals;