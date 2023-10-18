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
        <Container fluid className="-mt-8">
        
            <Container fluid className="md:w-[80%]">
            <Helmet>
                <title>PGF PRIME</title>
            </Helmet>   
            <Container fluid className="w-[100%]">
                     <h1 className='text-2xl text-black font-bold'>Featured Products</h1>

                    <Carousel responsive={responsive} className="">
                        {products.map((product, i) => (
                            <div key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                <HomeProduct product={product}></HomeProduct>
                            </div>
                        
                    ))}
                     </Carousel>

            </Container>


            <Row>
                <Col md={3} className="">
                   
                    <div className='filter-container px-2 md:block flex flex-row justify-between w-100 p-2 rounded'>
                        <ul className="text-center md:mb-2"><span className="text-sm font-bold">Categories</span>
                        {categories.map((category) => (
                                <li className="my-1 text-sm text-black" key={category}>
                                    <Link className="hover:underline hover:text-blue-600"
                                        to={{ pathname: '/search', search: `category=${category}`}}
                                    >
                                    {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                         <ul className="text-center md:mb-2"><span className="text-sm font-bold">Available Brands</span>
                            {brands.map((brand) => (
                                    <li className="my-1 text-sm text-black" key={brand}>
                                        <Link className="hover:underline hover:text-blue-600"
                                            to={{ pathname: '/search', search: `brand=${brand}`}}
                                        >
                                        {brand}
                                        </Link>
                                    </li>                             
                                ))}
                            </ul>
                        
                            <ul className="text-center md:mb-2"><span className="text-sm font-bold">Price Range</span>                               
                                        {prices.map((p) => (
                                        <li className="my-1 text-sm text-black" key={p.value}>
                                            <Link className="hover:underline hover:text-blue-600"
                                                to={{ pathname: '/search', search: `price=${p.value}`}}
                                            >
                                        {p.name}
                                        </Link>
                                    </li>                               
                                ))}
                           </ul>
                        </div>
                    
                </Col>
                <Col md={9}>
                <Container fluid className="home-container border mt-7">
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
