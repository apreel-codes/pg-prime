import axios from 'axios';
// import apiClient from '../api';
import React, { useEffect, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getError } from '../../uttils';
// import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../../components/Rating';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Button from 'react-bootstrap/Button';
import HomeProduct from '../../components/HomeProduct/HomeProduct';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BestSellersProduct from '../../components/BestSellersProduct/BestSellersProduct';
import './Search.css';

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
        name: '£90 - £120',
        value: '90-120'
    },
    {
        name: '£121 - £150',
        value: '121-150'
    },
    {
        name: '£151 - £200',
        value: '151-200'
    },
];



export const ratings = [
    {
      name: '4stars & up',
      rating: 4,
    },
  
    {
      name: '3stars & up',
      rating: 3,
    },
  
    {
      name: '2stars & up',
      rating: 2,
    },
  
    {
      name: '1stars & up',
      rating: 1,
    },
  ];



const Search = (e) => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);

    // specify all filters
    const category = sp.get('category') || 'all';
    const brand = sp.get('brand') || 'all';
    const query = sp.get('query') || 'all';
    const price = sp.get('price') || 'all';
    const rating = sp.get('rating') || 'all';
    const size = sp.get('size') || 'all';
    const order = sp.get('order') || 'newest';
    const page = sp.get('page') || 1; // for pagination


    //define a reducer
    const [{ loading, error, products, pages, countProducts }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try{
                const { data } = await axios.get(
                    `/api/products/search?page=${page}&query=${query}&category=${category}&brand=${brand}&price=${price}&size=${size}&rating=${rating}&order=${order}`
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
    }, [brand, category, error, order, page, price, size, query, rating])

    console.log(brand)

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

        const getFilterUrl = (filter, skipPathname) => {
        const filterPage = filter.page || page;
        const filterCategory = filter.category || category;
        const filterBrand = filter.brand || brand;
        const filterQuery = filter.query || query;
        const filterRating = filter.rating || rating;
        const filterPrice = filter.price || price;
        const sortOrder = filter.order || order;
        return `${
          skipPathname ? '' : '/search?'
        }category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&brand=${filterBrand}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
      };

      const [isFilterToggled, setIsFilterToggled] = useState(true);

      const handleFilterClick = () => {
        setIsFilterToggled(!isFilterToggled);
      }
   

    return (
        <div className=''>
            <Helmet>
                <title>Search Products</title>
            </Helmet>
            <Header />
            <div className='search-page'>
                <div className='filter-search flex flex-row justify-between mt-4'>
                    <div className=''>
                        <div onClick={handleFilterClick}  className='filter-drop-down flex flex-row justify-between items-center'>
                         <p className='cursor-pointer'>Filter</p>
                         <img  src="./images/down-arrow.png"/>
                        </div>
                        {/* <div className='filter-group'>
                            <div  className={isFilterToggled ? 'filter-hidden' : 'filter-show"'}>                   
                                <div className=''>
                                    <h3>Category</h3>
                                    <ul>
                                    <li>
                                        <Link
                                        className={'all' === category ? 'text-bold' : ''}
                                        to={getFilterUrl({ category: 'all' })}
                                        >
                                        Any
                                        </Link>
                                    </li>
                                    {categories.map((c) => (
                                        <li key={c}>
                                        <Link
                                            className={c === category ? 'text-bold' : ''}
                                            to={getFilterUrl({ category: c })}
                                        >
                                            {c}
                                        </Link>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                <div className=''>
                                    <h3>Brand</h3>
                                    <ul>
                                    <li>
                                        <Link
                                        className={'all' === brand ? 'text-bold' : ''}
                                        to={getFilterUrl({ brand: 'all' })}
                                        >
                                        Any
                                        </Link>
                                    </li>
                                    {brands.map((b) => (
                                        <li key={b}>
                                        <Link
                                            className={b === brand ? 'text-bold' : ''}
                                            to={getFilterUrl({ brand: b })}
                                        >
                                            {b}
                                        </Link>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                <div className=''>
                                    <h3>Price</h3>
                                    <ul>
                                    <li>
                                        <Link
                                        className={'all' === price ? 'text-bold' : ''}
                                        to={getFilterUrl({ price: 'all' })}
                                        >
                                        Any
                                        </Link>
                                    </li>
                                    {prices.map((p) => (
                                        <li key={p.value}>
                                        <Link
                                            to={getFilterUrl({ price: p.value })}
                                            className={p.value === price ? 'text-bold' : ''}
                                        >
                                            {p.name}
                                        </Link>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                <div className=''>
                                    <h3>Avg. Customer Review</h3>
                                    <ul>
                                    {ratings.map((r) => (
                                        <li key={r.name} className=''>
                                        <Link
                                            to={getFilterUrl({ rating: r.rating })}
                                            className={`${r.rating}` === `${rating}` ? 'text-bold' : ''}
                                        >
                                            <Rating caption={' & up'} rating={r.rating}></Rating>
                                        </Link>
                                        </li>
                                    ))}
                                    <li className=''>
                                        <Link
                                        to={getFilterUrl({ rating: 'all' })}
                                        className={rating === 'all' ? 'text-bold' : ''}
                                        >
                                        <Rating caption={' & up'} rating={0}></Rating>
                                        </Link>
                                    </li>
                                    </ul>
                                </div>
                            </div>
                        </div> */}
                    </div>


                    <div className="sort">
                                    <span>Sort{' '}<br /></span>
                                    <select
                                        className='sort-box border border-black-200 mt-1'
                                        value={order}
                                        onChange={(e) => {
                                        navigate(getFilterUrl({ order: e.target.value }));
                                        }}
                                    >
                                        <option value="newest">Newest Arrivals</option>
                                        <option value="lowest">Price: Low to High</option>
                                        <option value="highest">Price: High to Low</option>
                                        <option value="toprated">Avg. Customer Reviews</option>
                                    </select>
                    </div>
                </div>
                <div className= { isFilterToggled ? 'search-page-body' : 'search-page-body-filter' }>
                        {loading ? (
                            <LoadingBox></LoadingBox>
                        ) : error ? (
                            <MessageBox variant="danger">{error}</MessageBox>
                        ) : (
                        <div>
                                <div className="justify-content-between my-3">
                                        <div>
                                            <div>
                                                {countProducts === 0 ? 'No' : countProducts} Results
                                                {query !== 'all' && ' : ' + query}
                                                {category !== 'all' && ' : ' + category}
                                                {brand !== 'all' && ' : ' + brand}
                                                {price !== 'all' && ' : Price ' + price}
                                                {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                                                {query !== 'all' ||
                                                category !== 'all' ||
                                                brand !== 'all' ||
                                                rating !== 'all' ||
                                                price !== 'all' ? (
                                                <Button
                                                    variant="light"
                                                    onClick={() => navigate('/search')}
                                                >
                                                    <i className="fas fa-times-circle"></i>
                                                </Button>
                                                ) : null}
                                            </div>
                                        </div>
                                </div>
                                {products.length === 0 && (
                                    <MessageBox>No Product Found</MessageBox>
                                )}

                                <div className=''>
                                    {products.map((product) => (
                                    <div className="mb-3" key={product._id}>
                                        <BestSellersProduct product={product}></BestSellersProduct>
                                    </div>
                                    ))}
                                </div>

                                <div>
                                    {[...Array(pages).keys()].map((x) => (
                                        <LinkContainer
                                            key={x + 1}
                                            className="mx-1"
                                            to={{
                                            pathname: '/search',
                                            search: getFilterUrl({ page: x + 1 }, true),
                                            }}
                                        >
                                            <Button
                                                className={Number(page) === x + 1 ? 'text-bold' : ''}
                                                variant="light"
                                                >
                                                {x + 1}
                                            </Button>
                                        </LinkContainer>
                                    ))}
                                </div>
                        </div>
                        )}
                </div>
            </div>



            <div className={isFilterToggled ? 'filter-hidden' : 'filter-group'}>
                        <div className='filter-content'> 
                                <h1>Filter</h1>
                                <div className='brand'>
                                    <h3>Brand</h3>
                                    <ul>
                                    <li className='flex flex-row justify-between items-center'>
                                        <Link
                                            className={'all' === brand ? 'text-bold' : ''}
                                            to={getFilterUrl({ brand: 'all' })}
                                            >
                                            Any
                                        </Link>
                                    </li>
                                    {brands.map((b) => (
                                        <li key={b}>
                                        <Link
                                            className={b === brand ? 'text-bold' : ''}
                                            to={getFilterUrl({ brand: b })}
                                        >
                                            {b}
                                        </Link>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                <div className='category'>
                                    <h3>Category</h3>
                                    <ul>
                                    <li>
                                        <Link
                                        className={'all' === category ? 'text-bold' : ''}
                                        to={getFilterUrl({ category: 'all' })}
                                        >
                                        Any
                                        </Link>
                                    </li>
                                    {categories.map((c) => (
                                        <li key={c}>
                                        <Link
                                            className={c === category ? 'text-bold' : ''}
                                            to={getFilterUrl({ category: c })}
                                        >
                                            {c}
                                        </Link>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                <div className='price'>
                                    <h3>Price</h3>
                                    <ul>
                                    <li>
                                        <Link
                                        className={'all' === price ? 'text-bold' : ''}
                                        to={getFilterUrl({ price: 'all' })}
                                        >
                                        Any
                                        </Link>
                                    </li>
                                    {prices.map((p) => (
                                        <li key={p.value}>
                                        <Link
                                            to={getFilterUrl({ price: p.value })}
                                            className={p.value === price ? 'text-bold' : ''}
                                        >
                                            {p.name}
                                        </Link>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                <div className='filter-rating'>
                                    <h3>Rating</h3>
                                    <ul>
                                    {ratings.map((r) => (
                                        <li key={r.name} className='rating-list'>
                                        <Link
                                            to={getFilterUrl({ rating: r.rating })}
                                            className={`${r.rating}` === `${rating}` ? 'text-bold' : ''}
                                        >
                                            <Rating caption={' & up'} rating={r.rating}></Rating>
                                        </Link>
                                        </li>
                                    ))}
                                    <li className=''>
                                        <Link
                                        to={getFilterUrl({ rating: 'all' })}
                                        className={rating === 'all' ? 'text-bold' : ''}
                                        >
                                        <Rating caption={' & up'} rating={0}>& up</Rating>
                                        </Link>
                                    </li>
                                    </ul>
                                </div>
                        </div>

            </div>
            <Footer />
        </div>
    );
}

export default Search;