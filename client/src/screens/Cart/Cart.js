import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Helmet } from 'react-helmet-async';
import CartComponent from '../../components/Cart/CartComponent';

const Cart = () => {
    return (
      <div className='md:hidden block'>
        <Helmet>
               <title>My Cart</title>
        </Helmet>
        <Header />
        <CartComponent />
        <Footer />
      </div>
    )
}

export default Cart;
