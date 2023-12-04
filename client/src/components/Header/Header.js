import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import Home from '../../screens/Home/Home';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
// import ErrorPage from '../../screens/NotFound/NoPage';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Store } from '../../Store';
import Signin from '../../screens/Signin/Signin.js';
import ShippingAddress from '../../screens/ShippingAddress/ShippingAddress';
import DashboardScreen from '../../screens/Dashboard';
import Signup from '../../screens/Signup/Signup';
import Payment from '../../screens/Payment/Payment';
import PlaceOrder from '../../screens/PlaceOrder/PlaceOrder';
import Order from '../../screens/Order/Order';
import OrderHistory from '../../screens/OrderHistory/OrderHistory';
import Profile from '../../screens/Profile/Profile';
import Button from 'react-bootstrap/Button';
import { getError } from '../../uttils';
import Search from '../../screens/Search/Search';
import ProtectedRoute from '../ProtectedRoute';
import Dashboard from '../../screens/Dashboard';
import AdminRoute from '../AdminRoute';
import OrderList from '../../screens/OrderList/OrderList';
import ProductList from '../../screens/ProductList/ProductList';
import UserList from '../../screens/UserList/UserList';
import EditProduct from '../../screens/EditProduct/EditProduct';
import UserEdit from '../../screens/UserEdit/UserEdit';
import CreateProduct from '../../screens/CreateProduct/CreateProduct';
import './Header.css';
import SearchBox from '../SearcchBox';
import classNames from 'classnames';
import SalesSlider from '../SalesSlider/SalesSlider';


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

const Header = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const [{ loading, error, products, pages, countProducts }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    })

    const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT', });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href='/signin';
  }

  const profile = <img src='../images/user.png'/>

  const [isToggled, setIsToggled] = useState(true);
  const [isNavBarToggled, setIsNavBarToggled] = useState(false);
  const [isCloseToggled, setIsCloseToggled] = useState(false);

  const [isAdminToggled, setIsAdminToggled] = useState(false);

  const showSearchBar = () => {
        setIsToggled(!isToggled);    
  }

  const showSideNav = () => {
    setIsNavBarToggled(!isNavBarToggled);
    setIsCloseToggled(!isCloseToggled);
  }

  const showAdmin = () => {
    setIsAdminToggled(!isAdminToggled);    
}


const [brands, setBrands] = useState([]);
    useEffect(() => {
        const fetchBrands = async () => {
            try{
                const { data } = await axios.get(`/api/products/brands`);
                setBrands(data);
            } catch (err) {
                toast.error(getError(err));
            }
        };
        fetchBrands();
    }, [dispatch])

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const { data } = await axios.get(`/api/products/categories`);
                setCategories(data);
            } catch (err) {
                toast.error(getError(err));
            }
        };
        fetchCategories();
    }, [dispatch])

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


    return (
            <header className='relative header'>
                <SalesSlider />
                <div className='top-nav flex flex-row justify-between items-center py-1 px-6 md:px-18'>
                    <div className='socials flex flex-row justify-between'>
                        <Link><img className='h-8 w-18 mt-0.5 mr-1' src='../images/nav-twitter.png'/></Link>
                        <Link to="https://www.facebook.com/profile.php?id=61551700054426&mibextid=LQQJ4d"
                        ><img className='h-10 w-22' src='../images/nav-facebook.png'/></Link>
                        <Link to="https://instagram.com/pgf_prime?igshid=MzRIODBiNWFIZA=="
                        ><img className='h-10 w-22' src='../images/nav-insta.png'/></Link>
                    </div>
                    <div className='flex flex-row justify-between gallery-refund md:w-80'>
                        <Link onClick={() => window.scrollTo(0, 0)} className='hidden md:block' to="https://maps.google.com?q=33a%20Adebayo%20Doherty%20Rd,%20Eti-Osa%20101233,%20Lekki,%20Lagos&ftid=0x0:0xa188c9c24bd3a6f0&hl=en-NG&gl=ng&entry=gps&lucs=,47071704&g_st=iw">Our store</Link>
                        <Link onClick={() => window.scrollTo(0, 0)} className='hidden md:block' to="/gallery">Gallery</Link>
                        <Link onClick={() => window.scrollTo(0, 0)} className='' to='/refundpolicy'>Refund Policy</Link>
                    </div>
                </div>
                <div className='web-second md:flex md:flex-row md:justify-between items-center hidden md:block'>
                    <Link onClick={() => window.scrollTo(0, 0)} to='/'><img className='h-16 w-24' src='../images/nav-logo.png'/></Link>
                    <div className='search-profile-cart flex flex-row justify-between items-center'>
                        <SearchBox />
                        { userInfo ? (
                            <NavDropdown className='web-profile-history-sign' title={profile} id="basic-nav-dropdown">
                                <Link 
                                    onClick={() => window.scrollTo(0, 0)}
                                    className='dropdown-item' 
                                    to="/profile"
                                >
                                    Account
                                </Link>

                                { userInfo && userInfo.isAdmin && (
                                    <NavDropdown title="Admin" id="admin-nav-dropdown" className='dropdown-item'>
                                        <LinkContainer to='/admin/dashboard'>
                                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>                    
                                    </NavDropdown>
                                )}


                                <Link 
                                    onClick={() => window.scrollTo(0, 0)}
                                    className='dropdown-item'
                                    to="/orderhistory"
                                >
                                    Order History
                                </Link>
                                <Link 
                                    className='dropdown-item'
                                    to="#signout"
                                    onClick={signoutHandler}
                                >
                                    Sign Out
                                </Link>             
                            </NavDropdown>
                        ) : (
                            <Link 
                                onClick={() => window.scrollTo(0, 0)}
                                className='signin'
                                to="/signin">
                                Sign In
                            </Link>
                        )}
                        <div className='border flex flex-row justify-between items-center px-1.5 py-2.5 w-16 rounded'>
                            <Link onClick={() => window.scrollTo(0, 0)} to="/cart" className="nav-link">
                                <img className='w-7 h-7' src='../images/shopping-bag.png'/>
                            </Link>
                            {cart.cartItems.length > 0 && (
                                <small className='cart-text'>
                                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                </small>
                            )}

                        </div>
                    </div>
                </div>
                <div className='mobile-second md:hidden'>
                    <div className='flex flex-row justify-between items-center'>
                        <Link onClick={() => window.scrollTo(0, 0)} to='/'> <img className='h-12 w-20' src='../images/nav-logo.png'/></Link>
                        <div className='search-cart-ham flex flex-border justify-between items-center'>
                                <img className='w-4 h-4' src='../images/search.png' onClick={showSearchBar}/>
                                <div className='flex flex-row justify-between items-center px-1.5 py-2 w-12 rounded'>
                                    <Link onClick={() => window.scrollTo(0, 0)} to="/cart" className="nav-link">
                                        <img className='w-5 h-5' src='../images/shopping-bag.png'/>
                                    </Link>

                                    { cart.cartItems.length > 0 && (
                                        <small className='cart-text'>
                                            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                        </small>
                                    )}

                                </div>
                                <span className='fa-stack' onClick={showSideNav}>
                                    <img className= { isCloseToggled ? 'hamburger w-7 h-7 fa-stack-2x' : 'close' } src='../images/hamburger.png'/> 
                                    <img className= { isCloseToggled ? 'close w-7 h-7 fa-stack-1x' : 'hamburger' } src='../images/close.png'/>  
                                </span>
                                
                        </div>
                    </div>
                    <div className = {isToggled ? 'hidden' : 'my-2' }>
                     <SearchBox />
                    </div>
                </div>

                <div className='hidden md:block page-navs'>
                    <ul className='brand-header flex flex-row justify-between items-center w-[55%] my-3 ml-6'>
                        <Link onClick={() => window.scrollTo(0, 0)} to="/"><li>Home</li></Link>
                        <Link onClick={() => window.scrollTo(0, 0)} to={{ pathname: '/search', search: `allProducts`}}><li>New Arrivals</li></Link>
                        <Link onClick={() => window.scrollTo(0, 0)} to="/search?category=all&query=all&price=all&brand=all&rating=4&order=newest&page=1"><li>Best Sellers</li></Link>

                        { categories && 
                            categories.map((c, i) => (
                                <div className='brand w-16 flex flex-row justify-between items-center'>
                                <Link onClick={() => window.scrollTo(0, 0)} className='mobile-brands' to={{ pathname: '/search', search: `category=${c}`}} key={i}><li>{c}</li></Link>
                                <img className='ml-2' src='../images/arrow-down.png' />
                                </div>
                            ))
                        }
                        
                        { brands && 
                            brands.map((b, i) => (
                                <div className='brand w-16 flex flex-row justify-between items-center'>
                                    <Link onClick={() => window.scrollTo(0, 0)} to={{ pathname: '/search', search: `brand=${b}`}} key={i}><li>
                                        {b}
                                    </li>
                                    </Link>
                                    <img className='ml-2' src='../images/arrow-down.png' />
                                </div>
                            ))
                                
        
                        }
                    </ul>
                </div>

                <div className='side-body'>
                    <div className= { isNavBarToggled ? 'mobile-side-nav' : 'hide-mobile-side-nav'} >
                            <ul className='content flex flex-col py-1'>
                                <Link onClick={showSideNav} to="/"><li>Home</li></Link>
                                <Link onClick={() => window.scrollTo(0, 0)} to={{ pathname: '/search', search: `allProducts`}}><li>New Arrivals</li></Link>
                                <Link onClick={() => window.scrollTo(0, 0)} to="/search?category=all&query=all&price=all&brand=all&rating=4&order=newest&page=1"><li>Best Sellers</li></Link>

                                { categories && 
                                    categories.map((c, i) => (
                                        <Link onClick={() => window.scrollTo(0, 0)} className='mobile-brands' to={{ pathname: '/search', search: `category=${c}`}} key={i}><li>{c}</li></Link>
                                    ))
                                }
                                 
                                { brands && 
                                    brands.map((b, i) => (
                                        <Link onClick={() => window.scrollTo(0, 0)} className='mobile-brands' to={{ pathname: '/search', search: `brand=${b}`}} key={i}><li>{b}</li></Link>
                                    ))
                                }
                            
                            </ul>
                            {userInfo ? (
                                <div className='profile-signout flex flex-col'>
                                    <Link 
                                        onClick={() => window.scrollTo(0, 0)}
                                        className='dropdown-item mb-3'
                                        to="/profile"
                                    >
                                        Account
                                    </Link>

                                
                                { userInfo && userInfo.isAdmin && (
                                    <div className="admin-group">
                                        <div className="admin flex flex-row justify-between w-[27%]">
                                            <h3 className='mb-3'>Admin</h3>
                                            <div className='fa-stack' onClick={showAdmin}>
                                                <img className= { isAdminToggled ? "downAdmin fa-stack-1x h-3 w-4" : "upAdmin" } src="../images/down-arrow.png"/>
                                                <img className= { isAdminToggled ? "upAdmin fa-stack-1x h-3 w-4" : "downAdmin" } src="../images/up-arrow.png"/>
                                            </div>   
                                        </div>
                                        <div className= {isAdminToggled ? "" : 'hidden'}>
                                            <div className='admin-content flex flex-col space-y-4'>
                                                <Link onClick={() => window.scrollTo(0, 0)} to='/admin/dashboard'>
                                                        Dashboard
                                                    </Link>
                                                    <Link onClick={() => window.scrollTo(0, 0)} to='/admin/productlist'>
                                                        Products
                                                    </Link>
                                                    <Link onClick={() => window.scrollTo(0, 0)} to='/admin/orderlist'>
                                                        Orders
                                                    </Link>
                                                    <Link onClick={() => window.scrollTo(0, 0)} className='mb-3' to='/admin/userlist'>
                                                    Users   
                                                </Link>          
                                            </div>
                                                
                                        </div>
                                     </div>
                                )}

                                    <Link 
                                        onClick={() => window.scrollTo(0, 0)}
                                        className='dropdown-item'
                                        to="/orderhistory"
                                    >
                                        Order History
                                    </Link>

                                    <Link 
                                        className='signout'
                                        to="#signout"
                                        onClick={signoutHandler}
                                    >

                                        <Button className='button py-2 w-full mt-4'>Sign Out</Button>
                                    </Link>             
                                </div>
                            ) : (
                                <div className='flex flex-col mt-14'>
                                    <Link 
                                        onClick={() => window.scrollTo(0, 0)}
                                        className='signin'
                                        to="/signin">
                                        <Button className='sign-in-button w-full'>Sign in</Button>
                                    </Link>

                                    <Link 
                                        onClick={() => window.scrollTo(0, 0)}
                                        className='signup'
                                        to="/signup">
                                        <Button className='button w-full py-2'>Sign up</Button>
                                    </Link>
                                </div>
                                
                            )}
                    </div>
                </div>
            </header>
    )
}

export default Header;