import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
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
import Payment from '../../screens/Payment';
import PlaceOrder from '../../screens/PlaceOrder/PlaceOrder';
import Order from '../../screens/Order/Order';
import OrderHistory from '../../screens/OrderHistory';
import Profile from '../../screens/Profile';
import Button from 'react-bootstrap/Button';
import { getError } from '../../uttils';
import Search from '../../screens/Search/Search';
import ProtectedRoute from '../ProtectedRoute';
import Dashboard from '../../screens/Dashboard';
import AdminRoute from '../AdminRoute';
import OrderList from '../../screens/OrderList';
import ProductList from '../../screens/ProductList';
import UserList from '../../screens/UserList';
import ProductEdit from '../../screens/ProductEdit';
import UserEdit from '../../screens/UserEdit';
import CreateProduct from '../../screens/CreateProduct';
import './Header.css';
import SearchBox from '../SearcchBox';
import classNames from 'classnames';

const Header = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

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


    return (
            <header className='relative header'>
                <div className='top-nav flex flex-row justify-between items-center py-2 px-6 md:px-20 md:py-2'>
                    <div className='socials flex flex-row justify-between'>
                        <Link><img className='h-8 w-18 mt-0.5 mr-1' src='../images/nav-twitter.png'/></Link>
                        <Link to="https://www.facebook.com/profile.php?id=61551700054426&mibextid=LQQJ4d"
                        ><img className='h-10 w-22' src='../images/nav-facebook.png'/></Link>
                        <Link to="https://instagram.com/pgf_prime?igshid=MzRIODBiNWFIZA=="
                        ><img className='h-10 w-22' src='../images/nav-insta.png'/></Link>
                    </div>
                    <div className='flex flex-row justify-between gallery-refund md:w-48'>
                        <Link className='hidden md:block' to="/gallery">Gallery</Link>
                        <Link className='' to='/refundpolicy'>Refund Policy</Link>
                    </div>
                </div>
                <div className='web-second md:flex md:flex-row md:justify-between items-center md:px-20 md:py-2 hidden md:block'>
                    <Link to='/'><img className='h-16 w-24' src='../images/nav-logo.png'/></Link>
                    <div className='search-profile-cart flex flex-row justify-between items-center'>
                        <SearchBox />
                        {userInfo ? (
                            <NavDropdown className='web-profile-history-sign' title={profile} id="basic-nav-dropdown">
                                <Link 
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
                                className='signin'
                                to="/signin">
                                Sign In
                            </Link>
                        )}
                        <div className='border flex flex-row justify-between items-center px-1.5 py-2.5 w-16 rounded'>
                            <Link to="/cart" className="nav-link">
                                <img className='w-7 h-7' src='../images/shopping-cart.png'/>
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
                        <Link to='/'> <img className='h-12 w-20' src='../images/nav-logo.png'/></Link>
                        <div className='search-cart-ham flex flex-border justify-between items-center'>
                                <img className='w-4 h-4' src='../images/search.png' onClick={showSearchBar}/>
                                <div className='flex flex-row justify-between items-center px-1.5 py-2 w-12 rounded'>
                                    <Link to="/cart" className="nav-link">
                                        <img className='w-5 h-5' src='../images/shopping-cart.png'/>
                                    </Link>
                                    {cart.cartItems.length > 0 && (
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
                    <div className = {isToggled ? 'hidden' : 'mt-3' }>
                     <SearchBox />
                    </div>
                </div>
                <div className='hidden md:block page-navs'>
                    <ul className='flex flex-row justify-between items-center w-[55%] my-3 ml-20'>
                        <Link to="/"><li>Home</li></Link>
                        <Link to={{ pathname: '/search', search: `allProducts`}}><li>New Arrivals</li></Link>
                        <Link to="/search?category=all&query=all&price=all&brand=all&rating=4&order=newest&page=1"><li>Best Sellers</li></Link>
                        <div className='brands w-16'><li>Nike</li><img className='h-2' src='../images/arrow-down.png'/></div>
                        <div className='brands w-20'><li>Adidas</li><img className='h-2' src='../images/arrow-down.png'/></div>
                        <div className='brands w-20'><li>Jordan</li><img className='h-2' src='../images/arrow-down.png'/></div>
                        <div className='brands w-32'><li>New Balance</li><img className='h-2' src='../images/arrow-down.png'/></div>
                    </ul>
                </div>

                <div className='side-body'>
                    <div className= { isNavBarToggled ? 'mobile-side-nav' : 'hide-mobile-side-nav'} >
                            <ul className='content flex flex-col py-1'>
                                <Link to="/"><li >Home</li></Link>
                                <Link to={{ pathname: '/search', search: `allProducts`}}><li>New Arrivals</li></Link>
                                <Link to="/search?category=all&query=all&price=all&brand=all&rating=4&order=newest&page=1"><li>Best Sellers</li></Link>
                                <div className='mobile-brands'><li>Nike</li><img className='w-3 h-4' src='../images/mobile-right.png'/></div>
                                <div className='mobile-brands'><li>Adidas</li><img className='w-3 h-4' src='../images/mobile-right.png'/></div>
                                <div className='mobile-brands'><li>Jordan</li><img className='w-3 h-4' src='../images/mobile-right.png'/></div>
                                <div className='mobile-brands'><li>New Balance</li><img className='w-3 h-4' src='../images/mobile-right.png'/></div>
                            </ul>
                            {userInfo ? (
                                <div className='profile-signout flex flex-col mt-12'>
                                    <Link 
                                        className='dropdown-item mb-3'
                                        to="/profile"
                                    >
                                        Account
                                    </Link>

                                
                                { userInfo && userInfo.isAdmin && (
                                    <div className="admin-group">
                                        <div className="admin flex flex-row justify-between w-[30%]">
                                            <h3 className='mb-3'>Admin</h3>
                                            <div className='fa-stack' onClick={showAdmin}>
                                                <img className= { isAdminToggled ? "downAdmin fa-stack-1x h-3 w-4" : "upAdmin" } src="../images/down-arrow.png"/>
                                                <img className= { isAdminToggled ? "upAdmin fa-stack-1x h-3 w-4" : "downAdmin" } src="../images/up-arrow.png"/>
                                            </div>   
                                        </div>
                                        <div className= {isAdminToggled ? "" : 'hidden'}>
                                            <div className='admin-content flex flex-col space-y-4'>
                                                <Link to='/admin/dashboard'>
                                                        Dashboard
                                                    </Link>
                                                    <Link to='/admin/productlist'>
                                                        Products
                                                    </Link>
                                                    <Link to='/admin/orderlist'>
                                                        Orders
                                                    </Link>
                                                    <Link className='mb-3' to='/admin/userlist'>
                                                    Users   
                                                </Link>          
                                            </div>
                                                
                                        </div>
                                     </div>
                                )}

                                    <Link 
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

                                        <Button className='button py-2 w-full mt'>Sign Out</Button>
                                    </Link>             
                                </div>
                            ) : (
                                <div className='flex flex-col mt-14'>
                                    <Link 
                                        className='signin'
                                        to="/signin">
                                        <Button className='button w-full py-2'>Sign in</Button>
                                    </Link>
                                    <Link 
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