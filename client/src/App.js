import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
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

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT', });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
  }
  return (
    <BrowserRouter>
      <div className="App d-flex flex-column site-container">
      <ToastContainer position='bottom-center' limit={1} />
      <header className=''>
        <Navbar className='bg-black' bg="dark" variant="dark">
          <Container className=''>
            <LinkContainer className='' to="/">
              <Navbar.Brand className=''>PG PRIME</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
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
          </Container>
        </Navbar>
      </header>
      <main className='mt-28'>
        {/* <Container> */}
        <div className='flex flex-wrap'>
          <Routes>
              <Route>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/shipping" element={<ShippingAddress />} />
                <Route path='/product/:slug' element={<Product />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        {/* </Container> */}
      </main>
      <footer className='text-center'>
        All rights reserved.
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
