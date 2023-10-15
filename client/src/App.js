import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './screens/Home';
import Product from './screens/Product';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import Footer from './components/Footer';
import ErrorPage from './screens/NoPage';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Store } from './Store';
import Cart from './screens/Cart';
import Signin from './screens/Signin';
import ShippingAddress from './screens/ShippingAddress';
import Signup from './screens/Signup';
import Payment from './screens/Payment';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';
import OrderHistory from './screens/OrderHistory';
import Profile from './screens/Profile';
import Button from 'react-bootstrap/Button';
import { getError } from './uttils';
import axios from 'axios';
import SearchBox from './components/SearcchBox';


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT', });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href='/signin';
  }

  const [sidebarIsOpen, setSidebarIsOpen ] = useState(false);
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

  return (
    <BrowserRouter>
      <div className={sidebarIsOpen ? "d-flex flex-column site-container active-cont" : "d-flex flex-column site-container" }>
      <ToastContainer position='bottom-center' limit={1} />
      <header className=''>
        <div className='bg-white'><p className='text-xl text-center my-3 font-bold italic'>Confidence in your sole...</p></div>
        <Navbar className='bg-black' bg="dark" variant="dark" expand="lg">
          <Container className=''>
            <Button className='border-0'
            variant='dark'
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            ><i className='fas fa-bars'></i></Button>
            <LinkContainer className='' to="/">
              <Navbar.Brand className=''>PGF PRIME</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
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
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <div className={
        sidebarIsOpen ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
                      : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
      }>
        <Nav className='flex-column text-white w-100 p-2 mt-16'>
          <Nav.Item>
            <strong>Categories</strong>
          </Nav.Item>
          {categories.map((category) => (
            <Nav.Item key={category}>
              <LinkContainer
                to={{ pathname: '/search', search: `category=${category}`}}
                onClick={() => setSidebarIsOpen(false)}
              >
                <Nav.Link>{category}</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          ))}

        <Nav.Item>
            <strong>Brands</strong>
            </Nav.Item>
            {brands.map((brand) => (
            <Nav.Item key={brand}>
              <LinkContainer
                to={{ pathname: '/search', search: `brand=${brand}`}}
                onClick={() => setSidebarIsOpen(false)}
              >
                <Nav.Link>{brand}</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          ))}
        </Nav>
      
      </div>
      <main className='my-24'>
        {/* <Container> */}
        <div className=''>
          <Routes>
              <Route>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/shipping" element={<ShippingAddress />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/placeorder" element={<PlaceOrder />} />
                <Route path="/order/:id" element={<Order />} />
                <Route path="/orderhistory" element={<OrderHistory />} />
                <Route path='/product/:slug' element={<Product />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        {/* </Container> */}
      </main>
      <Footer></Footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
