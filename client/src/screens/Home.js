import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useReducer, useState } from "react";
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import HomeProduct from "../components/HomeProduct";
import { Helmet } from 'react-helmet-async';
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from "react-router-bootstrap";
import { getError } from "../uttils";
import { toast } from "react-toastify";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


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

    const prices = [
        {
            name: '1 to 50',
            value: '1-50'
        },
        {
            name: '51 to 200',
            value: '51-200'
        },
        {
            name: '201 to 1000',
            value: '201-1000'
        },
    ];
      
      const [categories, setCategories] = useState([]);
      const [brands, setBrands] = useState([]);
    
      useEffect(() => {
          const fetchCategories = async () => {
            try{
              const { data } = await axios.get('/api/products/categories');
              setCategories(data);
            } catch(err) {
              toast.error(getError(err));
            }
          }
          fetchCategories();
    
          const fetchBrands = async () => {
            try{
              const { data } = await axios.get('/api/products/brands');
              setBrands(data);
            } catch(err) {
              toast.error(getError(err));
            }
          }
          fetchBrands();
      }, []);



      const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };


    return (
        <Container fluid className="-mt-14">
        
            <Container fluid className="md:w-[100%] border carousel-parent">
            <Helmet>
                <title>PGF PRIME</title>
            </Helmet>   
            <Container fluid className="border w-[90%]">
                     <h1 className='text-3xl text-black font-base my-2'>Featured Products</h1>

                    <Carousel responsive={responsive} className="border">
                        {products.map((product, i) => (
                            <div key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                <HomeProduct product={product}></HomeProduct>
                            </div>
                        
                    ))}
                     </Carousel>

            </Container>


            <Row>
                <Col md={3}>
                    <Nav className='flex-column text-black w-100 p-2 border border rounded'>
                        <Nav.Item className="text-black hover:text-blue-600"><strong>Categories</strong></Nav.Item>
                        {categories.map((category) => (
                                <Nav.Item key={category}>
                                    <LinkContainer className='text-black'
                                        to={{ pathname: '/search', search: `category=${category}`}}
                                    >
                                    <Nav.Link className=''>{category}</Nav.Link>
                                    </LinkContainer>
                            </Nav.Item>
                            ))}
                        <Nav.Item>
                            <Nav.Item className="text-black"><strong>Available Brands</strong></Nav.Item>
                            {brands.map((brand) => (
                                    <Nav.Item key={brand}>
                                        <LinkContainer className='text-black'
                                            to={{ pathname: '/search', search: `brand=${brand}`}}
                                        >
                                        <Nav.Link className=''>{brand}</Nav.Link>
                                        </LinkContainer>
                                </Nav.Item>
                                ))}
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Item className="text-black"><strong>Price Range</strong></Nav.Item>
                                    </Nav.Item>
                                        {prices.map((p) => (
                                        <Nav.Item key={p.value}>
                                            <LinkContainer className='text-black'
                                                to={{ pathname: '/search', search: `price=${p.value}`}}
                                            >
                                                <Nav.Link>{p.name}</Nav.Link>
                                            </LinkContainer>
                                        </Nav.Item>
                            ))}
                            </Nav>
                </Col>
                <Col md={9}>
                <Container fluid className="home-container">
                    <div fluid className='flex flex-wrap'>
                        { 
                            (
                                <Row className="">
                                    {randProducts.map((product, i) => (
                                        <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                            <HomeProduct product={product}></HomeProduct>
                                        </Col>
                                    
                            ))}
                                </Row>
                            )
                        }
                    </div>      
            </Container>
                </Col>
            </Row>

            {/* <Container>
                <h2>Available Brands</h2>
                
            </Container> */}
        </Container>
        </Container>
    
    )
}

export default Home;
