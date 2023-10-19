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
import Ruler from '../components/Ruler.js';


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
    const randProductsTwo = randomizeDataset(randProducts);

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


      const handleCatClick = () => {
          setIsCatToggled(!isCatToggled);
        }

        const handleBrandClick = () => {
            setIsBrandToggled(!isBrandToggled);
          }

          const handlePriceClick = () => {
            setIsPriceToggled(!isPriceToggled);  
          }
      

    


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

      
        // Function to specify a particular number of objects from the array
        const getFourProducts = (arr, num) => {
          return arr.slice(0, num);
        };
      
        const fourProducts = getFourProducts(products, 4);


    return (
            <div className="md:w-[100%] mx-auto bg-gray-100 relative">
                <img className="hero mx-auto" src="./images/hero.avif"></img>
                <Helmet>
                    <title>PGF PRIME</title>
                </Helmet>   

                <div className="w-[90%] mx-auto">
                <h1 className="text-justify text-sm mt-5 font-bold mb-4">Step into style and unleash your inner sneakerhead with our 
                incredible collection of kicks.</h1>

                <button className="shop-now px-4 py-3 ">Shop now</button> 
                </div>


                <Ruler className="mt-5" />


                <div className="mt-5 md:w-[70%] mx-auto">
                        <h1 className='text-black font-bold trending mb-3'>Trending</h1>

                        <Carousel responsive={responsive} className="mx-auto">
                            {randProducts.map((product, i) => (
                                <div key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                    <HomeProduct product={product}></HomeProduct>
                                </div>
                            
                        ))}
                        </Carousel>

                        <Carousel responsive={responsive} className="mt-3 mx-auto">
                            {randProductsTwo.map((product, i) => (
                                <div key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                    <HomeProduct product={product}></HomeProduct>
                                </div>
                            
                        ))}
                        </Carousel>
                </div>

                <Ruler className="my-3" />

                <Row className="mx-auto">
                    
                    <Col md={3} className=" bg-white pt-2 mt-2">
                    
                        <div className='filter-container flex flex-column p-3 rounded mt-2 mb-3'>
                            <span className="italic text-sm">Filter Sneakers by</span>
                            <Link className="font-bold mt-2 p-2 bg-gray-200 rounded" onClick={handleCatClick}>Categories</Link>
                            <ul className={isCatToggled ? 'category-hidden' : 'category-show"'}>
                            {categories.map((category) => (
                                    <li className="my-2 text-base text-black" key={category}>
                                        <Link className="hover:text-blue-600"
                                            to={{ pathname: '/search', search: `category=${category}`}}
                                        >
                                        {category}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            
                            <Link className="font-bold mt-2 p-2 bg-gray-200 rounded " onClick={handleBrandClick}>Brands</Link>
                            <ul className={isBrandToggled ? 'brand-hidden' : 'brand-show"'}>
                                {brands.map((brand) => (
                                        <li className="my-2 text-base text-black" key={brand}>
                                            <Link className="hover:text-blue-600"
                                                to={{ pathname: '/search', search: `brand=${brand}`}}
                                            >
                                            {brand}
                                            </Link>
                                        </li>                             
                                    ))}
                                </ul>

                                <Link className="font-bold mt-2 p-2 bg-gray-200 rounded " onClick={handlePriceClick}>Price</Link>
                                <ul className={isPriceToggled ? 'price-hidden' : 'price-show"'}>                               
                                            {prices.map((p) => (
                                            <li className="my-2 text-base text-black" key={p.value}>
                                                <Link className="hover:text-blue-600"
                                                    to={{ pathname: '/search', search: `price=${p.value}`}}
                                                >&#163;{p.name}
                                            </Link>
                                        </li>                               
                                    ))}
                            </ul>
                        </div>               
                    </Col> 
                    <Col md={9}>
                    <h1 className='text-black font-bold trending md:mt-3 mt-10'>Newest Arrivals</h1>
                        <Carousel responsive={responsive} className="mt-3 mx-auto">
                                {products.map((product, i) => (
                                    <div key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                        <HomeProduct
                                        product={product}></HomeProduct>
                                    </div>
                                
                                ))}
                        </Carousel>                   
                    </Col>
               </Row>


                <div>
                  <h2>Top Rated</h2>
                <div className="grid grid-cols-2 gap-0">
                        {fourProducts.map((product, i) => (
                                      <div key={product.slug} sm={6} md={4} lg={3} className="">
                                          <HomeProduct product={product}></HomeProduct>
                                      </div>                             
                        ))}
                  </div>

                </div>

                
                <Row className="mx-auto md:w-[80%]">
                  <Col md={6}>
                    <div className="nike-red md:nike-second rounded"/>
                  </Col>
                  <Col md={6} className="mt-5">


                    <h2 className='text-black font-bold trending mb-5'>Brands</h2>
                    <div fluid className="grid grid-cols-2 gap-5 text-center px-20">
                          <img className="nike w-36" src="./images/nike.png"></img>
                          <img className="nike  w-36" src="./images/puma.png"></img>
                          <img className="nike  w-36" src="./images/adidas.png"></img> 
                          <img className="nike  w-36" src="./images/balance.png"></img>
                    </div>
                        <p className="text-center font-bold">and many more</p>
                  </Col>   
                </Row>  
                
                <div className="store text-center mt-5 pt-40">
                                    
                    <p className="w-[60%] mx-auto text-2xl text-white font-black">Come on in, and let's make some sneaker magic together!</p>
                      <Link to="https://maps.google.com?q=33a%20Adebayo%20Doherty%20Rd,%20Eti-Osa%20101233,%20Lekki,%20Lagos&ftid=0x0:0xa188c9c24bd3a6f0&hl=en-NG&gl=ng&entry=gps&lucs=,47071704&g_st=iw">
                        <p className="bg-white text-black rounded text-base font-medium w-44 mx-auto mt-3 py-3">Locate our store</p>
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
