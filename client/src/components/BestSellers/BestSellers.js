import axios from 'axios';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import logger from 'use-reducer-logger';
import BestSellersProduct from '../BestSellersProduct/BestSellersProduct';
import './BestSellers.css'
import { Link } from 'react-router-dom';



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

    const bestSellingProducts = getProducts(products, 8);


    return (
        <div className='box mx-auto my-24'>
            <div className='flex flex-row justify-between items-center my-4'>
                <h1 className='best-sellers'>Best Sellers</h1>
                 <button className='best-sellers-button flex flex-row justify-between items-center'>
                    <Link to="/search?category=all&query=all&price=all&brand=all&rating=4&order=newest&page=1">
                            View More
                    </Link>
                    <img src="../images/more.png" />
                </button>
            </div>
            <div className='md:grid md:grid-cols-4 md:gap-6 md:space-y-0 space-y-12 mx-auto'>
                {
                    bestSellingProducts.map((product, i) => (
                            <div key={product.slug} className=''>
                                <BestSellersProduct product={product} key={product.slug}></BestSellersProduct>
                            </div>
                                
                        ))
                    }
            </div>
        </div>
    )
}

// search?category=all&query=all&price=all&brand=all&rating=4&order=newest&page=1


export default BestSellers;