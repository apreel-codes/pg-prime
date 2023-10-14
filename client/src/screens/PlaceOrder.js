import axios from 'axios';
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
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from "react-toastify";
import { getError } from '../uttils';
import LoadingBox from '../components/LoadingBox';


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
    
    const [urgency, setUrgency] = useState('I can wait');

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;   
    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );
   if(urgency === 'I can wait'){
    cart.shippingPrice = 8.5;
   }
   if(urgency === 'In 2 - 3 days'){
    cart.shippingPrice = 14;
   }
   if(urgency === 'In 5 - 7 days'){
    cart.shippingPrice = 10;
   }
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

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
        <Container fluid className='md:w-[80%] w-[80%]'>
            <Helmet>
                <title>Preview Order</title>
            </Helmet>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <h1 className='my-3 text-2xl font-bold'>Preview Order</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                <strong>Address:</strong> {cart.shippingAddress.address}, 
                                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, 
                                {cart.shippingAddress.country}, {cart.shippingAddress.phonenumber}
                            </Card.Text>
                            <Link className='font-bold text-red-600' to="/shipping">Change Address</Link>
                        </Card.Body>
                    </Card>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method:</strong> {cart.paymentMethod}
                            </Card.Text>
                            <Link className='font-bold text-red-600' to="/payment">Change Payment Method</Link>
                        </Card.Body>
                    </Card>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Items</Card.Title>
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item) => (
                                    <ListGroup.Item className='border' key={item._id}>
                                        <Row className='align-items-center'>
                                            <Col md={6}>
                                                <img src={item.image} alt={item.name}
                                                className='img-fluid rounded img-thumbnail'
                                                ></img> {' '}
                                                <Link className='font-medium' to={`/product/${item.slug}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <span>{item.quantity}</span>
                                            </Col>
                                            <Col md={3}>
                                                NGN{item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Link className='font-bold text-red-600' to="/cart">Change Items</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                <div> How quick do you want your items delivered to you?</div>
                <Form>
                            <div className='my-3'>
                                <Form.Check
                                type='radio'
                                id='icanwait'
                                label="I can wait"
                                value="I can wait"
                                checked={urgency === "I can wait"}
                                onChange={(e) => setUrgency(e.target.value)}
                                />
                            </div>
                            <div className='my-3'>
                                <Form.Check
                                type='radio'
                                id='2-3days'
                                label="In 2- 3 days"
                                value="In 2 - 3 days"
                                checked={urgency === "In 2 - 3 days"}
                                onChange={(e) => setUrgency(e.target.value)}
                                />
                            </div>
                            <div className='my-3'>
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
                    <Card>
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>&#163;{cart.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping Price</Col>
                                        <Col>&#163;{cart.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Order Total</strong></Col>
                                        <Col>&#163;{cart.totalPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className='d-grid'>
                                        <Button
                                            className='bg-blue-500'
                                            type="button"
                                            onClick={placeOrderHandler}
                                            disabled={cart.cartItems.length === 0}
                                        >Place Order</Button>
                                    </div>
                                    {loading && <LoadingBox></LoadingBox>}
                                </ListGroup.Item>
                                
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default PlaceOrder;