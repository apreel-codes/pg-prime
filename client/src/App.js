import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './screens/Home/Home';
import Product from './screens/Product/Product';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import ErrorPage from './screens/NoPage';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Store } from './Store';
import Cart from './screens/Cart';
import Signin from './screens/Signin/Signin.js';
import ShippingAddress from './screens/ShippingAddress';
import DashboardScreen from './screens/Dashboard';
import Signup from './screens/Signup/Signup';
import Payment from './screens/Payment';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';
import OrderHistory from './screens/OrderHistory';
import Profile from './screens/Profile';
import Button from 'react-bootstrap/Button';
import { getError } from './uttils';
import SearchBox from './components/SearcchBox';
import Search from './screens/Search';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './screens/Dashboard';
import AdminRoute from './components/AdminRoute';
import OrderList from './screens/OrderList';
import ProductList from './screens/ProductList';
import UserList from './screens/UserList';
import ProductEdit from './screens/ProductEdit';
import UserEdit from './screens/UserEdit';
import CreateProduct from './screens/CreateProduct';
import ForgotPassword from './screens/ForgotPassword/ForgotPassword';
import ResetPassword from './screens/ResetPassword/ResetPassword';
import CheckEmail from './screens/CheckEmail/CheckEmail';
import RefundPolicy from './screens/RefundPolicy/RefundPolicy';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';


function App() {
  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { cart, userInfo } = state;

  // const signoutHandler = () => {
  //   ctxDispatch({ type: 'USER_SIGNOUT', });
  //   localStorage.removeItem('userInfo');
  //   localStorage.removeItem('shippingAddress');
  //   localStorage.removeItem('paymentMethod');
  //   window.location.href='/signin';
  // }


  return (
    <BrowserRouter className="relative">
      <ToastContainer position='bottom-center' limit={1} />
      <main>
        <Routes className="">
                <Route>
                  <Route index element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forget-password" element={<ForgotPassword />}/>
                  <Route path="/reset-password/:token" element={<ResetPassword />}/>
                  <Route path="/check-email" element={<CheckEmail />}/>
                  <Route path="/refundpolicy" element={<RefundPolicy />}/>
                  <Route path="/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute> }/>
                  <Route path="/shipping" element={<ShippingAddress />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/placeorder" element={<PlaceOrder />} />
                  <Route path="/search" element={<Search />} />
                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
                  <Route path="/admin/orderlist" element={<AdminRoute><OrderList /></AdminRoute>}></Route>
                  <Route path="/admin/productlist" element={<AdminRoute><ProductList /></AdminRoute>}></Route>
                  <Route path="/admin/product/:id" element={<AdminRoute><ProductEdit /></AdminRoute>}></Route>
                  <Route
                  path="/admin/dashboard" element={<AdminRoute><DashboardScreen /></AdminRoute>}></Route>
                  <Route path="/admin/createproduct" element={<AdminRoute><CreateProduct /></AdminRoute>}></Route>
                  <Route path="/admin/user/:id"element={<AdminRoute><UserEdit /></AdminRoute>}></Route>
                  <Route path="/admin/userlist" element={<AdminRoute><UserList /></AdminRoute>}></Route>
                  <Route path="/order/:id" element={<ProtectedRoute><Order /></ProtectedRoute>} />
                  <Route path="/orderhistory" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                  <Route path='/product/:slug' element={<Product />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
