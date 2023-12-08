import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import PaystackPop from '@paystack/inline-js';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import { getError } from '../../uttils';
import { Helmet } from 'react-helmet-async';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import copy from "copy-to-clipboard";
import './Order.css';
import Button from 'react-bootstrap/Button';
import ReviewModal from '../../components/ReviewModal/ReviewModal';


function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
            case 'FETCH_SUCCESS':
                return { ...state, loading: false, order: action.payload, error: '' };
                case 'FETCH_FAIL':
                    return { ...state, loading: false, error: action.payload };
                    case 'PAY_REQUEST':
                        return { ...state, loadingPay: true };
                        case 'PAY_SUCCESS':
                            return { ...state, loadingPay: false, successPay: true };
                            case 'PAY_FAIL':
                                return { ...state, loadingPay: false };
                                case 'PAY_RESET':
                                    return { ...state, loadingPay: false, successPay: false };


        default:
            return state;
    }
}

const Order = () => {
    

    const { state } = useContext(Store);
    const { userInfo, cart } = state;

    const params = useParams();
    const { id: orderId } = params;
    const navigate = useNavigate();

    const [{ loading, error, order, successPay, loadingPay }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
        successPay: false,
        loadingPay: false,
    });

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();


    function createOrder(data, actions) {
        return actions.order
        .create({
            purchase_units: [
                {
                    amount: { value: order.totalPrice },
                },
            ],
        })
        .then((orderID) => {
            return orderID;
        });
    }

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                dispatch({ type: 'PAY_REQUEST' });
                const { data } = await axios.put(
                    `/api/orders/${order._id}/pay`,
                    details,
                    {
                        headers: { authorization: `Bearer ${userInfo.token}` },
                    }
                );
                dispatch({ type: 'PAY_SUCCESS', payload: data });

                toast.success('Order is paid!')
            } catch (err) {
                dispatch({ type: 'PAY_FAIL', payload: getError(err) });
                toast.error(getError(err));
            }
        });
    }

    function onError(err) {
        toast.error(getError(err));
    }

    useEffect(() => {
        const fetchOrder = async () => {
            try{
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };

        if(!userInfo) {
            return navigate('/login');
        }
        if (!order._id || successPay || (order._id && order._id !== orderId)) {
            fetchOrder();
            if (successPay) {
                dispatch({ type: 'PAY_RESET' });
            }
        } else {
            const loadPayPalScript = async () => {
                const { data: clientId } = await axios.get('/api/keys/paypal', {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': clientId,
                        currency: 'GBP',
                    },
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            }
            loadPayPalScript();
        }
    }, [order, userInfo, orderId, navigate, paypalDispatch, successPay]);


    const [paymentMade, setPaymentMade] = useState(false);


    const payWithPayStack = (e) => {
        e.preventDefault();
        //declare a variale to be an instance of PaystackPop
        const paystack = new PaystackPop()
        paystack.newTransaction({
            key: "pk_test_1ceb68041ee70bc2174a59bf690e6d5afbf0dfc0",
            amount: cart.totalPrice * 100,
            email: userInfo.email,
            fullname: cart.shippingAddress.fullName,
            // shows when transaction has been completed
            onSuccess(transaction){
                let message = `Payment Complete! Reference ${transaction.reference}`
                alert(message)
                navigate('/')
                // console.log(order);
                setPaymentMade(!paymentMade)
            },
            //shows when users closes a transaction without completing
            onCancel(){
                alert('You have cancelled a transaction.')
            }
        })
    }


    const orderIdShort = orderId.slice(0, 8);

    const copyToClipboard = () => {
        copy(orderIdShort);
        toast.success('Order ID copied to clipboard!');
        return;
    };

    return loading ? 
        (<LoadingBox></LoadingBox>)
        :
        error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        )
        :
        (
            <div>
                <Header />
                <Helmet>
                    <title>Order {orderId}</title>
                </Helmet>
                <div className='order-page md:w-[30%] mx-auto w-[90%] my-12'>
                    <h1 className='order-h1 font-black'>Thanks for your order!</h1>
                    <p className='order-p'>Your order will be sent to your address via the selected delivery service after payment confirmation has been made.</p>

                    <div className='order-id flex flex-row justify-between items-center mx-auto'>
                        <p className='order-id-text'>Your order ID</p>
                        <div className='order-border flex flex-row justify-between items-center py-1 px-2'>
                            <p>#{orderIdShort}</p>
                            <img src="../images/copy.png" onClick={copyToClipboard} className='cursor-pointer'/>
                        </div>
                    </div>

                    {/* { 
                        cart.paymentMethod === "PayPal" && 
                        <div className='paypal-group mt-9'>
                            <Card className='mb-3'>
                                <Card.Body>
                                    
                                    <ListGroup className='' variant="flush">
                                        {!order.isPaid && (
                                            <ListGroup.Item className='mt-1'>
                                                { isPending ? (
                                                    <LoadingBox />
                                                ) : 
                                                (
                                                    <div>
                                                        
                                                        <PayPalButtons
                                                            className='pal-buttons'
                                                            createOrder={createOrder}
                                                            onApprove={onApprove}
                                                            onError={onError}
                                                        ></PayPalButtons>
                                                    </div>
                                                )}
                                                {loadingPay && <LoadingBox></LoadingBox>}
                                            </ListGroup.Item>
                                        )}                                                                     
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </div>
                    } */}

                    { 
                        cart.paymentMethod === "Paystack" && 
                        <div className='paypal-group mt-3'>
                            <div className='mb-3 border-none'>
                                <div>
                                    
                                    <ListGroup className='' variant="flush">
                                        { !paymentMade && (
                                            <ListGroup.Item className='mt-1'>
                                                { isPending ? (
                                                    <LoadingBox />
                                                ) : 
                                                (
                                                    <div className='paystack-group'>
                                                        <h2 className=''>Pay with Paystack</h2>
                                                        <form id='paymentForm' className=''>
                                                            <div className='form-group d-grid mb-4'>
                                                                <label className='label' htmlFor='amount'>Email address</label>
                                                                <input className='input' type='email' id='email-address' value={userInfo.email} disabled/>
                                                            </div>

                                                            <div className='form-group d-grid mb-4'>
                                                                <label className='label' htmlFor='amount'>Amount</label>
                                                                <input className='input' type='tel' id='amount' value={cart.totalPrice} disabled/>
                                                            </div>

                                                            <div className='form-group d-grid mb-4'>
                                                                <label className='label' htmlFor='first-name'>Full Name</label>
                                                                <input className='input' type='text' id='first-name' value={cart.shippingAddress.fullName} disabled/>
                                                            </div>
                                                            
                                                            <div className='order-button d-grid'>
                                                                <Button className='pay-button border-none text-white mx-auto'
                                                                
                                                                onClick={payWithPayStack}
                                                                type='submit'>Pay
                                                                </Button> 
                                                            </div>
                                                        </form>
                                                        
                                                    </div>
                                                )}
                                                {loadingPay && <LoadingBox></LoadingBox>}
                                            </ListGroup.Item>
                                        )}                                                                     
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    }

                </div>
                <Footer />
            </div>
        );
}

export default Order;