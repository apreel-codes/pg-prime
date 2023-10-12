import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from './screens/Home';
import Product from './screens/Product';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import Footer from './components/Footer';
import ErrorPage from './screens/NoPage';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import { Store } from './Store';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;


  return (
    <BrowserRouter>
      <div className="App d-flex flex-column site-container">
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>PG PRIME</Navbar.Brand>
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
