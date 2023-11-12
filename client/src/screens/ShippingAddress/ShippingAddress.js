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

   
    const subtotal = (state.cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)).toFixed(2);
    const shipping = (0).toFixed(2);
    const tax = ((7.5/100) * subtotal).toFixed(2);
    const total = (parseFloat(subtotal) + parseInt(shipping) + parseFloat(tax)).toFixed(2);


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
        if(!phonenumber) {
            toast.error('Please provide a phone number');
            return;
        }
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

            <div className='w-[90%] md:w-[72%] my-10 mx-auto md:flex md:flex-row md:justify-between'>
                
                    <div className='md:w-[65%] shipping-contact mb-5'>
                    <Form className='shipping-form mt-8' onSubmit={submitHandler}>
                        <h1 className='h1'>Contact</h1>

                        <Form.Group className="full-name d-grid mb-4" controlId="fullName">
                        <Form.Label>Full name</Form.Label>
                                <input
                                className='w-full'
                                type='text'
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                />
                        </Form.Group>


                       <div className='md:grid md:grid-cols-2 md:gap-3'>
                        <Form.Group className="phone-group mb-4" controlId="phonenumber">
                            <Form.Label>Phone</Form.Label>
                                    <PhoneInput
                                    value={phonenumber}
                                    onChange={setPhoneNumber}
                                    type='tel'
                                    required
                                    />
                            </Form.Group>

                            <Form.Group className="email-group mb-4 d-grid" controlId="postalCode">
                            <Form.Label>Email</Form.Label>
                                    <input
                                    className='w-full'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    />
                            </Form.Group>
                       </div>
                        

                        <div className='md:grid md:grid-cols-2 md:gap-3'>
                            <Form.Group className="mb-4 d-grid" controlId="country">
                            <Form.Label>Country</Form.Label>
                                    <input
                                    className='w-full'
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                    />
                            </Form.Group>


                            <Form.Group className="mb-4 d-grid" controlId="city">
                            <Form.Label>City</Form.Label>
                                    <input
                                    className='w-full'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    />
                            </Form.Group>
                        </div>
                        


                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                                <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className='address-input'
                                ></textarea>
                        </Form.Group>

                        <div className="billing-address flex flex-row justify-between items-center">
                                <input className="box w-5 h-5" type="checkbox" id="billing-same" name="billing-same" value="billing-same" />
                                <span className="biling-same" for="billing-same"> Billing and delivery address are the same</span>
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
                    </Form>

                    <div className='md:w-[30%] mt-4 d-grid'>
                            <Button className="button py-2.5 border-none text-white" onClick={submitHandler} type="submit">
                                Next
                            </Button>
                    </div>
                    
                    </div>

                    <div className='md:w-[32%] md:mt-8 details-image-group'>
                        <div className='order-details border mb-5'>
                        <h1 className='h1'>Order details</h1>
                        <ul>
                                <li className='flex flex-row justify-between items-center'>
                                    <p>Subtotal: </p>
                                    <span>&#163;{ subtotal }</span>
                                </li>
                                <li className='flex flex-row justify-between items-center'>
                                    <p>Shipping: </p>
                                    <span className='shipping-class'>&#163;{ shipping }</span>
                                </li>
                                <li className='flex flex-row justify-between items-center'>
                                    <p>Tax: </p>
                                    <span>+ &#163;{ tax }</span>
                                </li>
                                
                        </ul>
                        <div className='order-total flex flex-row justify-between items-center'>
                                <p>Total:</p>
                                <span>&#163;{ total }</span>
                        </div>
                        </div>
                

                        <div className='shipping-item-images border mt-4'>
                            <h1 className='h1'>Order details</h1>
                            <div className='. space-y-4'>
                                {
                                        state.cart.cartItems.map((item) => (
                                            <div className='shipping-item flex flex-row justify-between items-center'>
                                                <div className="shipping-image-group">
                                                <img src={item.image} className='shipping-image'/>
                                                </div>
                                                
                                                <div className='shipping-item-content space-y-1'>
                                                    <p className='s-item-name-price'>{item.name}</p>
                                                    <p className='s-item-name'>{item.brand}</p>
                                                    <p className='s-item-name-price'>&#163;{item.price}</p>
                                                </div>
                                            </div>
                                    ))
                                }
                            </div> 
                        </div>
                    </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default ShippingAddress