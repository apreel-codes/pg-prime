import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from '../screens/Home';
import Product from '../screens/Product';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import Footer from '../components/Footer';
import ErrorPage from '../screens/NoPage';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Store } from '../Store';
import Cart from '../screens/Cart';
import Signin from '../screens/Signin/Signin.js';
import ShippingAddress from '../screens/ShippingAddress';
import DashboardScreen from '../screens/Dashboard';
import Signup from '../screens/Signup/Signup';
import Payment from '../screens/Payment';
import PlaceOrder from '../screens/PlaceOrder';
import Order from '../screens/Order';
import OrderHistory from '../screens/OrderHistory';
import Profile from '../screens/Profile';
import Button from 'react-bootstrap/Button';
import { getError } from '../uttils';
import SearchBox from '../components/SearcchBox';
import Search from '../screens/Search';
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from '../screens/Dashboard';
import AdminRoute from '../components/AdminRoute';
import OrderList from '../screens/OrderList';
import ProductList from '../screens/ProductList';
import UserList from '../screens/UserList';
import ProductEdit from '../screens/ProductEdit';
import UserEdit from '../screens/UserEdit';
import CreateProduct from '../screens/CreateProduct';

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


    return (
            <header className=''>
                <div className='bg-white'><p className='text-sm text-center py-2 italic'>Confidence in your sole...</p></div>
                <Navbar className='bg-black' bg="dark" variant="dark" expand="lg">
                <Container fluid className='px-4'>
                    <LinkContainer className='' to="/">
                    <Navbar.Brand className=''><img src='../images/logo.png' className='w-6 h-7'></img></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className=''>
                    <SearchBox />
                    <Nav className="me-auto w-100 justify-content-end">
                        <Link to="/cart" className="nav-link">
                        Cart
                        {cart.cartItems.length > 0 && (
                            <Badge pill bg="danger">
                            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                            </Badge>
                        )}
                        </Link>
                        {userInfo ? (
                        
                        <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                            
                            <LinkContainer to="/profile">
                                <NavDropdown.Item>User Profile</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/orderhistory">
                                <NavDropdown.Item>Order History</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <Link 
                            className='dropdown-item'
                            to="#signout"
                            onClick={signoutHandler}
                            >
                                Sign Out
                            </Link>             
                        </NavDropdown>
                        ) : (
                        <Link className="nav-link" to="/signin">
                            Sign In
                        </Link>
                        )}
                        {userInfo && userInfo.isAdmin && (
                        <NavDropdown title="Admin" id="admin-nav-dropdown">
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
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </header>
    )
}

export default Header;