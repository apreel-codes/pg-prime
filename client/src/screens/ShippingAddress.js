import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';


const ShippingAddress = () => {
    const navigate = useNavigate();
    const{ state, dispatch: ctxDispatch } = useContext(Store);
    const {
        userInfo,
        cart: { shippingAddress },
    } = state;

    const[fullName, setFullName] = useState(shippingAddress.fullName || '');
    const[address, setAddress] = useState(shippingAddress.address || '');
    const[city, setCity] = useState(shippingAddress.city || '');
    const[postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const[country, setCountry] = useState(shippingAddress.country || '');

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping')
        }
    }, [userInfo, navigate])


    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country
            }
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country
            })
        );
        navigate('/payment');
    }

    return (
        <Container className='md:w-[40%] small-container w-[80%] -mt-7'>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <h1 className='my-3 text-2xl font-bold'>Shipping Address</h1>
            <Form className='mt-8' onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="fullName">
                    <Form.Label>Full Name</Form.Label>
                        <Form.Control
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                        <Form.Control
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="city">
                    <Form.Label>City</Form.Label>
                        <Form.Control
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                        ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="country">
                    <Form.Label>Country</Form.Label>
                        <Form.Control
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        ></Form.Control>
                        <div className='my-4 d-grid'>
                            <Button className='bg-blue-500' variant="primary" type="submit">
                                Continue
                            </Button>
                        </div>
                        
                </Form.Group>
            </Form>
        </Container>
    )
}

export default ShippingAddress;