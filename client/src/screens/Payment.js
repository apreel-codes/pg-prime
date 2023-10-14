import React, { useContext, useEffect, useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';


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
            <Container className='md:w-[40%] small-container w-[80%]'>
                        <Helmet>
                            <title>Payment Method</title>
                        </Helmet>
                        <CheckoutSteps step1 step2 step3></CheckoutSteps>
                        <h1 className='my-3 text-2xl font-bold'>Payment Method</h1>
                        <Form onSubmit={submitHandler}>
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
                                id='Stripe'
                                label="Stripe"
                                value="Stripe"
                                checked={paymentMethodName === "Stripe"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                            </div>
                            <div className='mt-4 d-grid'>
                                <Button className='bg-blue-500' variant="primary" type="submit">
                                    Continue
                                </Button>
                            </div>
                        </Form>
            </Container>
    )
}

export default Payment;