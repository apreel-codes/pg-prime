import React, { useContext, useEffect, useState } from 'react';
import CheckoutSteps from '../../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../../Store';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Container from 'react-bootstrap/Container';
import './Payment.css';


const Payment = () => {
    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { 
        cart:{ shippingAddress, paymentMethod },
    } = state;

    const [paymentMethodName, setPaymentMethod] = useState(
        paymentMethod || 'PayPal'
    );

    useEffect(() => {
        if(!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])


    const submitHandler = (e) => {
        e.preventDefault();

        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName});
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder');
    };


    return (           
            <div className=''>
                    <Header />
                        <Helmet>
                            <title>Payment Method</title>
                        </Helmet>
                        <div className='w-[90%] md:w-[40%] my-10 mx-auto'>
                            <Form className='payment-form' onSubmit={submitHandler}> 
                                <h2>Payment Method</h2>
                                        <Form.Group className='my-3'>
                                            <Form.Check
                                                type='radio'
                                                id='PayPal'
                                                label="PayPal"
                                                value="PayPal"
                                                checked={paymentMethodName === "PayPal"}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                         </Form.Group>

                                        <Form.Group>
                                            <Form.Check
                                                type='radio'
                                                id='Cash'
                                                label="Cash on Delivery"
                                                value="Cash"
                                                checked={paymentMethodName === "Cash"}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                        </Form.Group>
                                
                                    <div className='md:w-[30%] mt-4 d-grid'>
                                        <Button className='button py-2.5 border-none text-white'  type="submit">
                                            Next
                                        </Button>
                                    </div>
                            </Form>
                        </div>
                    <Footer /> 
            </div>
    )
}

export default Payment;