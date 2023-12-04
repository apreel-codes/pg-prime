import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import logger from 'use-reducer-logger';
import './BestSellers.css'
import { Link } from 'react-router-dom';
import HomeProduct from '../HomeProduct/HomeProduct';
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


const BestSellers = () => {
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

    const getProducts = (arr, num) => {
        return arr.slice(0, num);
      };

    const bestSellingProducts = getProducts(products, 6);

    useEffect(() => {
        AOS.init({duration: 1200});
      }, []);

      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);



    return (
        <div className='best-sellers-comp mx-auto my-14 md:my-30'>
            <div className='flex flex-row justify-between items-center w-[90%] md:w-[78%] mx-auto my-4' data-aos="slide-up">
                <h1 className='best-sellers'>Best Sellers</h1>
                 <button className='best-sellers-button flex flex-row justify-between items-center'>
                    <Link onClick={() => window.scrollTo(0, 0)} to="/search?category=all&query=all&price=all&brand=all&rating=4&order=newest&page=1">
                            View More
                    </Link>
                    <img className='h-4 w-4' src="../images/arrow-right.png" />
                </button>
            </div>
            <div className='box md:grid md:grid-cols-3 mx-auto hidden'>
                {
                    bestSellingProducts.map((product, i) => (
                            <div key={product.slug} className="best-arrival-product" data-aos="slide-up">
                                <HomeProduct product={product} key={product.slug}></HomeProduct>
                            </div>
                                
                        ))
                    }
            </div>


            <div className='md:hidden w-[90%] mx-auto grid grid-cols-2 gap-3 mt-2'>
                {
                  bestSellingProducts.map((product, index) => (
                    <div key={product.slug} data-aos="slide-up">
                          <HomeProduct product={product}></HomeProduct>
                    </div>
                  ))
                }
              </div>
        </div>
    )
}




export default BestSellers;