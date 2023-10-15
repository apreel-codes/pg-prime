
import { Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useReducer, useState } from "react";
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import HomeProduct from "../components/HomeProduct";
import { Helmet } from 'react-helmet-async';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Container from "react-bootstrap/Container";
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
        <Container className="">
            <Helmet>
                <title>PGF PRIME</title>
            </Helmet>
            <h1 className='text-medium text-3xl font-bold'>Featured Products</h1>
            <div fluid className='flex flex-wrap mt-5'>
            { 
                 (
                    <Row className="">
                        {products.map((product, i) => (
                            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                <HomeProduct product={product}></HomeProduct>
                            </Col>
                        
                 ))}
                    </Row>
                )
             }
            </div>      
        </Container>
    )
}

export default Home;
