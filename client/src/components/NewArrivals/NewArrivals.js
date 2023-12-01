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
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';



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
          items: 2
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

      useEffect(() => {
        AOS.init({duration: 1200});
      }, []);


    return (
        <div>
            <div className='web-carousel hidden md:block mb-4 mt-24 w-[100%] mx-auto'>
            <div className='flex flex-row justify-between items-center my-4 w-[88%] mx-auto' data-aos="slide-up">
                        <h1 className='new-arrivals'>New arrivals for you</h1>
                        <button variant='' className='slider-button flex flex-row justify-between items-center'>
                            <Link to={{ pathname: '/search', search: `allProducts`}}> 
                              View More
                            </Link>
                            <img className='h-4 w-4' src="../images/arrow-right.png" />
                        </button>
            </div>
            <div className='3/4 m-auto wrapper'>
              <div>
                <Slider {...settings}>
                  {
                      webProductsData.map((product, i) => (
                        <div key={product.slug} className='carousel-product' data-aos="slide-up">
                          <HomeProduct product={product}></HomeProduct>
                        </div>
                                
                      ))
                    }
                </Slider>
              </div>
            </div>
            </div>

            <div className="mx-auto w-[90%] mt-20 md:hidden block mobile-new-all">
              <div className='flex flex-row justify-between items-center' data-aos="slide-up">
                          <h1 className='new-arrivals'>New arrivals for you</h1>
                          <button variant='' className='slider-button flex flex-row justify-between items-center'>
                            <Link to={{ pathname: '/search', search: `allProducts`}}> 
                              View More
                            </Link>
                              <img className='h-4 w-4' src="../images/arrow-right.png" />
                          </button>
              </div>

              {/* <div className='new-arrival-slider'>
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
              </div> */}

              <div className='grid grid-cols-2 gap-3 mt-2'>
                {
                  mobileProductsData.map((product, index) => (
                    <div key={product.slug} className="new-arrival-content" data-aos="slide-up">
                          <HomeProduct product={product}></HomeProduct>
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
    )
}
export default NewArrivals;