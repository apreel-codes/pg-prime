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

      const [isBrandToggled, setIsBrandToggled] = useState(true);
      const [isCategoryToggled, setIsCategoryToggled] = useState(true);
      const [isPriceToggled, setIsPriceToggled] = useState(true);
      const [isRatingToggled, setIsRatingToggled] = useState(true);
    

    const showBrand = () => {
        setIsBrandToggled(!isBrandToggled);    
    }

    const showCategory = () => {
        setIsCategoryToggled(!isCategoryToggled);    
    }

    const showPrice = () => {
        setIsPriceToggled(!isPriceToggled);    
    }

    const showRating = () => {
        setIsRatingToggled(!isRatingToggled);    
    }




    return (
        <div className=''>
            <Helmet>
                <title>Search Products</title>
            </Helmet>
            <Header />
            <div className='search-page md:mt-20 mx-auto md:w-[50%] mb-4 md:flex md:flex-row md:justify-between md:mt-6'>
                <div className='hidden md:block filter-content md:w-[25%]'> 
                                    <h1>Filter</h1>
                                            <div className='brand'>
                                            <div className='flex flex-row justify-between items-center'>
                                                    <h3 className=''>Brand</h3>
                                                    <div className='fa-stack' onClick={showBrand}>
                                                        <img className= { isBrandToggled ? "downBrand fa-stack-1x h-3 w-4" : "upBrand" } src="../images/down-arrow.png"/>
                                                        <img className= { isBrandToggled ? "upBrand fa-stack-1x h-3 w-4" : "downBrand" } src="../images/up-arrow.png"/>
                                                    </div> 
                                                </div>
                                            
                                            <div className= {isBrandToggled ? "block" : 'hidden'}>
                                                <ul className=''>
                                                            { brands.map((b) => (
                                                                <li key={b}>
                                                                <Link
                                                                        className={brand === b ? 'text-bold' : ''}
                                                                        to={getFilterUrl({ brand: b })}
                                                                    >
                                                                        {b}
                                                                </Link>
                                                            </li>
                                                    ))}
                                                    </ul>
                                            </div>
                                                
                                            </div>
                                            <div className='category'>
                                                <div className='flex flex-row justify-between items-center'>
                                                    <h3>Category</h3>
                                                    <div className='fa-stack' onClick={showCategory}>
                                                        <img className= { isCategoryToggled ? "downCategory fa-stack-1x h-3 w-4" : "upCategory" } src="../images/down-arrow.png"/>
                                                        <img className= { isCategoryToggled ? "upCategory fa-stack-1x h-3 w-4" : "downCategory" } src="../images/up-arrow.png"/>
                                                    </div> 
                                                </div>
                                            
                                            <div className= {isCategoryToggled ? "block" : 'hidden'}>
                                                    <ul>
                                                        { categories.map((c) => (
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
                                                
                                            </div>
                                            <div className='price'>
                                                <div className='flex flex-row justify-between items-center'>
                                                    <h3>Price</h3>
                                                    <div className='fa-stack' onClick={showPrice}>
                                                        <img className= { isPriceToggled ? "downPrice fa-stack-1x h-3 w-4" : "upPrice" } src="../images/down-arrow.png"/>
                                                        <img className= { isPriceToggled ? "upPrice fa-stack-1x h-3 w-4" : "downPrice" } src="../images/up-arrow.png"/>
                                                    </div> 
                                                </div>
            
                                                <div className= {isPriceToggled ? "block" : 'hidden'}>
                                                    <ul>
                                                    { prices.map((p) => (
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
                                                
                                            </div>
                                            <div className='filter-rating'>
                                                <div className='flex flex-row justify-between items-center'>
                                                    <h3>Rating</h3>
                                                    <div className='fa-stack' onClick={showRating}>
                                                        <img className= { isRatingToggled ? "downRating fa-stack-1x h-3 w-4" : "upRating" } src="../images/down-arrow.png"/>
                                                        <img className= { isRatingToggled ? "upRating fa-stack-1x h-3 w-4" : "downRating" } src="../images/up-arrow.png"/>
                                                    </div> 
                                                </div>
            
                                                <div className= {isRatingToggled ? "block" : 'hidden'}>
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
                <div className='md:w-[75%]'>
                    <div className='filter-search flex flex-row justify-between mt-4'>
                        <div className=''>
                            <div className='md:hidden filter-drop-down flex flex-row justify-between items-center'>
                                <p className='cursor-pointer'>Filter</p>
                                <div className='fa-stack -mt-0.5' onClick={handleFilterClick}>
                                    <img className= { isFilterToggled ? "upFilter fa-stack-1x h-3 w-4" : "downFilter" } src="../images/down-arrow.png"/>
                                    <img className= { isFilterToggled ? "downFilter fa-stack-1x h-3 w-4" : "upFilter" } src="../images/up-arrow.png"/>
                                </div>
                            </div>
                            <p className='all-products hidden md:block'>All Products</p>
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

                                    <div className='md:grid md:grid-cols-3 md:gap-0 grid grid-cols-2 gap-3'>
                                        {products.map((product) => (
                                        <div className="mb-24" key={product._id}>
                                            <HomeProduct product={product}></HomeProduct>
                                        </div>
                                        ))}
                                    </div>

                                    <div className='mt-4'>
                                        {[...Array(pages).keys()].map((x) => (
                                            <LinkContainer
                                                key={x + 1}
                                                className="mx-1 border"
                                                to={{
                                                pathname: '/search',
                                                search: getFilterUrl({ page: x + 1 }, true),
                                                }}
                                            >
                                                <button
                                                    className={Number(page) === x + 1 ? 'nav-active' : 'nav-inactive'}
                                                    variant=""
                                                    >
                                                    {x + 1}
                                                </button>
                                            </LinkContainer>
                                        ))}
                                    </div>
                            </div>
                            )}
                    </div>
                </div>
            </div>
            
            <div className='md:hidden'>
                <div className={isFilterToggled ? 'filter-hidden' : 'filter-group'}>
                                    
                        <div className='filter-content'> 
                                    <h1>Filter</h1>
                                            <div className="justify-content-between my-3">
                                                    <div>
                                                        <div>
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
                                            <div className='brand'>
                                            <div className='flex flex-row justify-between items-center'>
                                                    <h3>Brand</h3>
                                                    <div className='fa-stack' onClick={showBrand}>
                                                        <img className= { isBrandToggled ? "downBrand fa-stack-1x h-3 w-4" : "upBrand" } src="../images/down-arrow.png"/>
                                                        <img className= { isBrandToggled ? "upBrand fa-stack-1x h-3 w-4" : "downBrand" } src="../images/up-arrow.png"/>
                                                    </div> 
                                                </div>
                                            
                                            <div className= {isBrandToggled ? "block" : 'hidden'}>
                                                <ul className=''>
                                                            { brands.map((b) => (
                                                                <li key={b}>
                                                                <Link
                                                                        className={brand === b ? 'text-bold' : ''}
                                                                        to={getFilterUrl({ brand: b })}
                                                                    >
                                                                        {b}
                                                                </Link>
                                                            </li>
                                                    ))}
                                                    </ul>
                                            </div>
                                                
                                            </div>
                                            <div className='category'>
                                                <div className='flex flex-row justify-between items-center'>
                                                    <h3>Category</h3>
                                                    <div className='fa-stack' onClick={showCategory}>
                                                        <img className= { isCategoryToggled ? "downCategory fa-stack-1x h-3 w-4" : "upCategory" } src="../images/down-arrow.png"/>
                                                        <img className= { isCategoryToggled ? "upCategory fa-stack-1x h-3 w-4" : "downCategory" } src="../images/up-arrow.png"/>
                                                    </div> 
                                                </div>
                                            
                                            <div className= {isCategoryToggled ? "block" : 'hidden'}>
                                                    <ul>
                                                        { categories.map((c) => (
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
                                                
                                            </div>
                                            <div className='price'>
                                                <div className='flex flex-row justify-between items-center'>
                                                    <h3>Price</h3>
                                                    <div className='fa-stack' onClick={showPrice}>
                                                        <img className= { isPriceToggled ? "downPrice fa-stack-1x h-3 w-4" : "upPrice" } src="../images/down-arrow.png"/>
                                                        <img className= { isPriceToggled ? "upPrice fa-stack-1x h-3 w-4" : "downPrice" } src="../images/up-arrow.png"/>
                                                    </div> 
                                                </div>
            
                                                <div className= {isPriceToggled ? "block" : 'hidden'}>
                                                    <ul>
                                                    { prices.map((p) => (
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
                                                
                                            </div>
                                            <div className='filter-rating'>
                                                <div className='flex flex-row justify-between items-center'>
                                                    <h3>Rating</h3>
                                                    <div className='fa-stack' onClick={showRating}>
                                                        <img className= { isRatingToggled ? "downRating fa-stack-1x h-3 w-4" : "upRating" } src="../images/down-arrow.png"/>
                                                        <img className= { isRatingToggled ? "upRating fa-stack-1x h-3 w-4" : "downRating" } src="../images/up-arrow.png"/>
                                                    </div> 
                                                </div>
            
                                                <div className= {isRatingToggled ? "block" : 'hidden'}>
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
            
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Search;