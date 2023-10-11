import Header from "../components/Header";
import { Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useReducer, useState } from "react";
import axios from 'axios';
import logger from 'use-reducer-logger';
// import data from "../data";

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
    const [{ loading, error, products}, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true, error: ''
    })
    // const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try{
                const result = await axios.get('/api/products');
                dispatch({type: 'FETCH_SUCCESS', payload: result.data})
            } catch(err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            }
            
            // setProducts(result.data);
        };
        fetchData();
    }, [])



    return (
        <div className="mt-10 mx-28">
            <h1 className='text-medium text-5xl'>Featured products</h1>
            <div className='flex flex-wrap w-full mt-5'>
            {
                loading ? ( <div>Loading...</div> )
                :
                error ? ( <div>{error}</div> )
                : (
                products.map((product, i) => (
                <div className='border mx-5' key={product.slug}>
                    <Link to={`/product/${product.slug}`}>
                    <img className='image' src={product.image} />
                    </Link>
                    <div className='p-5'>
                    <Link to={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                    </Link>
                    <p><strong>$</strong>{product.price}</p>
                    <button className='bg-orange-500 px-5 py-2 mt-3 rounded'>Add to Cart</button>
                </div>
                </div>          
                 ))
                )
             }
            </div>      
        </div>
    )
}

export default Home;
