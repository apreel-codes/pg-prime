import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './screens/Home';
import Product from './screens/Product';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App d-flex flex-column site-container">
      <Header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>PG PRIME</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
      </Header>
      <main>
        {/* <Container> */}
        <div className='flex flex-wrap'>
          <Routes>
              <Route>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path='/product/:slug' element={<Product />} />
              </Route>
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
