import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import logger from 'use-reducer-logger';
import './NewArrivals.css';
import HomeProduct from '../HomeProduct/HomeProduct';
import Carousel from 'react-multi-carousel';
import Button from 'react-bootstrap/Button';



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

      const productsData =  getProducts(newArrivals, 9);

      console.log(productsData);
      
    
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
    const slideLength = productsData.length;

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
        <div className='md:w-[80%] w-[85%] mx-auto'>
            {/* mobile */}
            <div className= 'mobile-slider md:hidden block'>
                <div className="">
                    <div className='flex flex-row justify-between items-center my-5'>
                        <h1 className='new-arrivals'>New arrivals for you</h1>
                        <Button variant='' className='border button flex flex-row justify-between items-center'>
                            View More
                            <img src="../images/more.png" />
                        </Button>
                    </div>
                    {/* <Carousel responsive={responsive} className=""> */}
                            {
                                productsData.map((product, index) => (
                                    <div className={index === currentSlide ? "mobile-slide mobile-current" : "mobile-slide"} key={index}>
                                        {index === currentSlide && (   
                                            <>
                                                <div key={product.slug} sm={6} md={4} lg={3} className="mobile-content">
                                                    <HomeProduct
                                                    product={product}></HomeProduct>
                                                </div>
                                            </>
                                         )}
                                    </div>      
                                ))
                            }
                    {/* </Carousel>                    */}
                </div>
                <div className='flex flex-row justify-between w-[80%] h-4 mt-16 mx-auto'>
                    <img src="../images/mobile-left.png" className="mobile-arrow mobile-prev" onClick={prevSlide} />
                    <small className='indication'>{currentSlide + 1} of {productsData.length}</small>
                    <img src="../images/mobile-right.png" className="mobile-arrow mobile-next" onClick={nextSlide}/>
                </div>
                {/* <AiOutlineArrowLeft className="mobile-arrow mobile-prev" onClick={prevSlide}/>
                <AiOutlineArrowRight className="mobile-arrow mobile-next" onClick={nextSlide}/> */}
            </div>

            {/* web */}
            <div className="web-slider md:block hidden">
                <div>
                    <h1 className=''>New arrivals for you</h1>
                </div>
                <Carousel responsive={responsive} className="">
                        {productsData.map((product, i) => (
                            <div key={product.slug}  className="web-content">
                                <HomeProduct
                                product={product}></HomeProduct>
                            </div>
                                  
                        ))}
                </Carousel>                   
            </div>
        </div>
    )
}
export default NewArrivals;