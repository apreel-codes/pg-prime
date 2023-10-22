import axios from 'axios';
// import apiClient from '../api';
import React, { useEffect, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getError } from '../uttils';
// import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import HomeProduct from '../components/HomeProduct';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/esm/Container';
// import axios from 'axios';


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
            case 'FETCH_SUCCESS':
                return {
                    ...state,
                    products: action.payload.products,
                    page: action.payload.page,
                    pages: action.payload.pages,
                    countProducts: action.payload.countProducts,
                    loading: false
                };
                case 'FETCH_FAIL':
                    return { ...state, loading: false, error: action.payload };

            default:
                return state;
    }
}

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



const Search = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);

    // specify all filters
    const category = sp.get('category') || 'all';
    const brand = sp.get('brand') || 'all';
    const query = sp.get('query') || 'all';
    const price = sp.get('price') || 'all';
    const size = sp.get('size') || 'all';
    const order = sp.get('order') || 'newest';
    const page = sp.get('page') || 1; // for pagination

    //define a reducer
    const [{ loading, error, products, pages, countProducts }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    })


    useEffect(() => {
        const fetchData = async (skipPathname) => {
            try{
                const { data } = await axios.get(
                    `/api/products/search?page=${page}&query=${query}&category=${category}&brand=${brand}&price=${price}&size=${size}&order=${order}`
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error){
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(error),
                });
            }
        }
        fetchData();
    }, [brand, category, error, order, page, price, size, query])


    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const { data } = await axios.get(`/api/products/categories`);
                setCategories(data)
            } catch (err) {
                toast.error(getError(err));
            }
        };
        fetchCategories();
    }, [dispatch])

    const [brands, setBrands] = useState([]);
    useEffect(() => {
        const fetchBrands = async () => {
            try{
                const { data } = await axios.get(`/api/products/brands`);
                setBrands(data)
            } catch (err) {
                toast.error(getError(err));
            }
        };
        fetchBrands();
    }, [dispatch])


    const [sizes, setSizes] = useState([]);
    useEffect(() => {
        const fetchSizes = async () => {
            try{
                const { data } = await axios.get(`/api/products/sizes`);
                setSizes(data)
            } catch (err) {
                toast.error(getError(err));
            }
        };
        fetchSizes();
    }, [dispatch])

   

    return (
        <div className='md:w-[40%] w-[90%] my-10 mx-auto'>
            <Helmet>
                <title>Search Products</title>
            </Helmet>
            <div className=''>
                <div className=''>
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <>
                        <Row className='justify-content-between mb-3 mx-auto'>
                            <Col md={6}>
                                <div>
                                    {countProducts === 0 ? 'No' : countProducts} Results
                                    {query !== 'all' ||
                                    category !== 'all' ||
                                    brand !== 'all' ||
                                    size !== 'all' ||
                                    price !== 'all' ? (
                                    <Button
                                        variant="light"
                                        onClick={() => navigate('/')}
                                        >
                                            <i className='fas fa-times-circle'></i>
                                    </Button>
                                    ) : null }
                                </div>
                            </Col>
                           
                        </Row>
                        {products.length === 0 && (
                            <MessageBox>No Product Found</MessageBox>
                        )}
                        <Row className='grid grid-cols-2 gap-1 md:w-[100%]'>
                            {products.map((product) => (
                                <Col sm={6} lg={12} className='mb-3' key={product._id}>
                                <HomeProduct product={product}></HomeProduct>
                                </Col>
                            ))}
                        </Row>
                    </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;