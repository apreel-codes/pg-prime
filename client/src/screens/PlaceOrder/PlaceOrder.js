import axios from 'axios';
// import apiClient from '../api';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Store } from '../../Store';
import CheckoutSteps from '../../components/CheckoutSteps';
import { toast } from "react-toastify";
import { getError } from '../../uttils';
import LoadingBox from '../../components/LoadingBox';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './PlaceOrder.css';


const reducer = (state, action) => {
    switch(action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loading: true };
            case 'CREATE_SUCCESS':
                return { ...state, loading: false };
                case 'CREATE_FAIL':
                    return { ...state, loading: false };
        default:
            return state;
    }
}


const PlaceOrder = () => {
    const navigate = useNavigate();

    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
    });

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    // console.log(cart);
    
    const [urgency, setUrgency] = useState('I can wait');

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;   
    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );

    const tax = ((7.5/100) * cart.itemsPrice).toFixed(2);

   if(urgency === 'I can wait'){
    cart.shippingPrice = 8.5;
   }
   if(urgency === 'In 2 - 3 days'){
    cart.shippingPrice = 14;
   }
   if(urgency === 'In 5 - 7 days'){
    cart.shippingPrice = 10;
   }
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + parseFloat(tax);

    const placeOrderHandler = async () => {
        try {
            dispatch({ type: 'CREATE_REQUEST' });
            const { data } = await axios.post(
                '/api/orders',
                {
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    totalPrice: cart.totalPrice,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            ctxDispatch({ type: 'CART_CLEAR' });
            dispatch({ type: 'CREATE_SUCCESS' });
            localStorage.removeItem('cartItems');
            navigate(`/order/${data.order._id}`);
            toast.success('Order successfully created.')

        } catch (err) {
            dispatch({ type: 'CREATE_FAIL' });
            toast.error(getError(err))
        }
    };

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart, navigate])

    return (
        <div >
            <Header />
            <Helmet>
                <title>Preview Order</title>
            </Helmet>
            <div className='w-[90%] md:w-[72%] my-10 mx-auto md:flex md:flex-row md:justify-between'>
                <div className='md:w-[65%]'>
                        <div className='border place-shipping mb-4'>
                            <h1 className='h1'>Shipping</h1>
                            <div className='place-shipping-contact-content space-y-2'>
                                <p><strong>Name:</strong> {cart.shippingAddress.fullName}</p>
                                <p><strong>Address:</strong> {cart.shippingAddress.address}, {''}
                                {cart.shippingAddress.city}, {''}
                                {cart.shippingAddress.country}</p>
                                <p><strong>Phone: </strong>{cart.shippingAddress.phonenumber}</p>
                            </div>
                            <Link className='text-red-600' to="/shipping">Change Address</Link>
                        </div>
                    
                        <div className='border place-shipping mb-4'>
                            <h1 className='h1'>Payment</h1>
                            <div className='place-shipping-payment-content'>
                                <p><strong>Method:</strong> {cart.paymentMethod}</p>
                            </div >
                            <Link className='text-red-600' to="/shipping">Change Payment Method</Link>
                        </div>
                    
                        <div className='border place-shipping mb-4'>
                            <h1 className='h1'>Items</h1>
                            <div className='mb-2'>
                                {cart.cartItems.map((item) => (
                                        <div className='flex flex-row justify-between items-center mb-3' key={item._id}>
                                            <div className='place-img-name'>
                                                <img src={item.image} alt={item.name}
                                                className='img-fluid rounded img-thumbnail'
                                                ></img> {' '}
                                                <Link className='place-name font-medium text-sm' to={`/product/${item.slug}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                <span>{item.quantity}</span>
                                            </div>
                                            <div className='place-price'>
                                            ₦{(item.price).toFixed(2)}
                                            </div>
                                        </div>
                                ))}
                            </div>
                            <Link className='font-medium text-red-600' to="/cart">Change Items</Link>
                        </div>
                </div>

                <div className='md:w-[32%]'>
                    <div>
                        <Form className='border place-shipping mb-4'>
                        <h1 className='h1'>Shipping Info</h1>
                                <div className='my-2'>
                                    <Form.Check
                                        type='radio'
                                        id='icanwait'
                                        label="Shipped on request"
                                        value="I can wait"
                                        checked={urgency === "I can wait"}
                                        onChange={(e) => setUrgency(e.target.value)}
                                    />
                                </div>
                                <div className='my-2'>
                                    <Form.Check
                                        type='radio'
                                        id='2-3days'
                                        label="Express delivery (2 - 3 days)"
                                        value="In 2 - 3 days"
                                        checked={urgency === "In 2 - 3 days"}
                                        onChange={(e) => setUrgency(e.target.value)}
                                    />
                                </div>
                                <div className='my-2'>
                                    <Form.Check
                                        type='radio'
                                        id='5-7days'
                                        label="In 5 - 7 days"
                                        value="In 5 - 7 days"
                                        checked={urgency === "In 5 - 7 days"}
                                        onChange={(e) => setUrgency(e.target.value)}
                                    />
                                </div>
                        </Form>
                        <div className='border order-place-shipping mb-4'>
                                <h1 className='h1'>Order Summary</h1>
                                    <ul>
                                        <li className='flex flex-row justify-between items-center'>
                                            <p>Subtotal: </p>
                                            <span>₦{cart.itemsPrice.toFixed(2)}</span>
                                        </li>
                                        <li className='flex flex-row justify-between items-center'>
                                            <p>Shipping: </p>
                                            <span className='shipping-class'>₦{cart.shippingPrice.toFixed(2)}</span>
                                        </li>
                                        <li className='flex flex-row justify-between items-center'>
                                            <p>Tax: </p>
                                            <span>₦{ tax }</span>
                                        </li>
                                        <li className='place-order-total flex flex-row justify-between items-center'>
                                            <p>Order Total: </p>
                                            <span>₦{cart.totalPrice.toFixed(2)}</span>
                                        </li> 
                                    </ul>
                        </div>
                    </div>

                    <div className='place-button'>
                        <div className='mt-4 d-grid'>
                                <Button
                                    className='button py-2.5 border-none text-white'
                                    type="button"
                                    onClick={placeOrderHandler}
                                    disabled={cart.cartItems.length === 0}
                                    >Place Order</Button>
                        </div>
                        {loading && <LoadingBox></LoadingBox>}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default PlaceOrder;