import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { toast } from "react-toastify";
import { Store } from '../../Store';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './ShippingAddress.css';



const ShippingAddress = () => {
    const navigate = useNavigate();
    const{ state, dispatch: ctxDispatch } = useContext(Store);
    const {
        userInfo,
        cart:{ shippingAddress, paymentMethod },
    } = state;

    console.log(state.cart.cartItems);


    const subtotal = state.cart.itemsPrice;
    const shipping = state.cart.shippingPrice;
    const tax = (7.5/100) * state.cart.itemsPrice;

    const total = subtotal + shipping + tax;

    const[fullName, setFullName] = useState(shippingAddress.fullName || '');
    const[address, setAddress] = useState(shippingAddress.address || '');
    const[city, setCity] = useState(shippingAddress.city || '');
    const[email, setEmail] = useState(shippingAddress.email || '');
    const[country, setCountry] = useState(shippingAddress.country || '');
    const[phonenumber, setPhoneNumber] = useState(shippingAddress.phonenumber || '');

    const [paymentMethodName, setPaymentMethod] = useState(
        paymentMethod || 'PayPal'
    );


    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping')
        }
    }, [userInfo, navigate])


    const submitHandler = (e) => {
        e.preventDefault();
        if( !(phonenumber.match('[0-9]{10}')) ){
            toast.error('Please provide valid phone number');
            return;
        } 
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                email,
                country,
                phonenumber
            }
        });

        // remove this if doesn't work
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName});
        localStorage.setItem('paymentMethod', paymentMethodName);

        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                email,
                country,
                phonenumber,
            })
        );
        // navigate('/payment');

        navigate('/placeorder');

    }

    return (
        <div>
            <Header />
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <div className='shipping-page md:w-[40%] w-[90%] my-10 mx-auto'>
            <h1 className=''>Contact</h1>
            <Form className='shipping-form mt-8' onSubmit={submitHandler}>
                <Form.Group className="mb-4" controlId="fullName">
                <Form.Label>Full name</Form.Label>
                        <input
                        type='text'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        />
                </Form.Group>

                <Form.Group className="mb-4" controlId="phonenumber">
                <Form.Label>Phone</Form.Label>
                        <PhoneInput
                        value={phonenumber}
                        onChange={setPhoneNumber}
                        type='tel'
                        required
                        />
                </Form.Group>

                <Form.Group className="mb-4" controlId="postalCode">
                <Form.Label>Email</Form.Label>
                        <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                </Form.Group>


                <Form.Group className="mb-4" controlId="country">
                    <Form.Label>Country</Form.Label>
                        <input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        />
                </Form.Group>


                <Form.Group className="mb-4" controlId="city">
                    <Form.Label>City</Form.Label>
                        <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        />
                </Form.Group>


                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                        <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className='address-input'
                        ></textarea>
                </Form.Group>

                <div className="billing-address flex flex-row items-center">
                        <input className="box w-5 h-5" type="checkbox" id="billing-same" name="billing-same" value="billing-same" />
                        <label className="biling-same" for="billing-same"> Billing and delivery address are the same</label>
                </div>

               <div className='payment'>
                            <h2>Payment Method</h2>
                            <div className='my-3'>
                                <Form.Check
                                type='radio'
                                id='PayPal'
                                label="PayPal"
                                value="PayPal"
                                checked={paymentMethodName === "PayPal"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                            </div>
                            <div>
                                <Form.Check
                                type='radio'
                                id='Cash'
                                label="Cash on Delivery"
                                value="Cash"
                                checked={paymentMethodName === "Cash"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                            </div>
                </div>

                <div className='mt-4 d-grid'>
                    <Button className="button py-2.5 border-none text-white" type="submit">
                        Next
                    </Button>
                </div>
            </Form>
            
            </div>
            <div>
               <ul>
                    <li className='flex flex-row justify-between items-center'>
                        <span>Subtotal: </span>
                        <span>&#163;{ (subtotal).toFixed(2) }</span>
                    </li>
                    <li className='flex flex-row justify-between items-center'>
                        <span>Shipping: </span>
                        <span>&#163;{ (shipping).toFixed(2) }</span>
                    </li>
                    <li className='flex flex-row justify-between items-center'>
                        <span>Tax: </span>
                        <span>&#163;{ (tax).toFixed(2) }</span>
                    </li>
               </ul>
               <div className='flex flex-row justify-between items-center'>
                    <span>Total:</span>
                    <span>&#163;{ (total).toFixed(2) }</span>
               </div>
            </div>

            <div>
                {
                        state.cart.cartItems.map((item) => (
                            <div className='shipping-item flex flex-row justify-between items-center'>
                                <div className="shipping-image-group">
                                 <img src={item.image} className='img-fluid rounded img-thumbnail shipping-image'/>
                                </div>
                                
                                <div>
                                    <p>{item.name}</p>
                                    <p>{item.brand}</p>
                                    <p>{item.price}</p>
                                </div>
                            </div>
                    ))
                }
            </div>
            <Footer />
        </div>
    )
}

export default ShippingAddress;