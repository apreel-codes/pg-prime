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
            <div className='md:w-[40%] w-[90%] my-10 mx-auto'>
                        <Helmet>
                            <title>Payment Method</title>
                        </Helmet>
                        {/* <CheckoutSteps step1 step2 step3></CheckoutSteps> */}
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
                                id='Cash'
                                label="Cash on Delivery/Transfer"
                                value="Cash"
                                checked={paymentMethodName === "Cash"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                            </div>
                            {/* <div className='mt-4 d-grid'>
                                <Button className='bg-black rounded-full py-3 text-gray-100 border-none'  type="submit">
                                    Continue
                                </Button>
                            </div> */}
                        </Form>
            </div>
    )
}

export default Payment;