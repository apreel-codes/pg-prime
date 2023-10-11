import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import data from './data';
import Home from './screens/Home';
import Product from './screens/Product';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Header />
      <div>
        <Routes>
          <Route>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path='/product/:slug' element={<Product />} />
          </Route>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
