import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import { getError } from '../uttils';
import { Helmet } from 'react-helmet-async';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

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
    const { userInfo } = state;


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

    console.log(isPending);


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

    return loading ? 
        (<LoadingBox></LoadingBox>)
        :
        error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        )
        :
        (
            <Container fluid className='md:w-[80%] w-[80%]'>
                <Helmet>
                    <title>Order {orderId}</title>
                </Helmet>
                <h1 className='mb-3 text-center text-2xl font-bold'>Order {orderId}</h1>
                <Row>
                    <Col md={8}>
                        <Card className='mb-3'>
                            <Card.Body>
                                <Card.Title>Shipping</Card.Title>
                                <Card.Text className='mb-3'>
                                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {order.shippingAddress.address}, 
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}, 
                                    {order.shippingAddress.country}, {order.shippingAddress.phonenumber}
                                </Card.Text>
                                {order.isDelivered ? (
                                    <MessageBox variant ="success">
                                        delivered at {order.deliveredAt}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Not Delivered</MessageBox>
                                )}
                            </Card.Body>
                        </Card>
                        <Card className='mb-3'>
                            <Card.Body>
                                <Card.Title>Payment</Card.Title>
                                <Card.Text className='mb-3'>
                                    <strong>Method: </strong> {order.paymentMethod}
                                </Card.Text>
                                {order.isPaid ? (
                                    <MessageBox variant="success">
                                        Paid at {order.paidAt.substring(0, 10)}
                                    </MessageBox>
                                ): (
                                    <MessageBox variant="danger">Not Paid</MessageBox>
                                )}
                            </Card.Body>
                        </Card>
                        <Card className='mb-3'>
                            <Card.Body>
                                <Card.Title>Items</Card.Title>
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item) => (
                                        <ListGroup.Item key={item._id}>
                                            <Row className='align-items-center'>
                                                <Col md={6}>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className='img-fluid rounded img-thumbnail'
                                                    ></img>{' '}
                                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
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
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='mb-3'>
                            <Card.Body>
                                <Card.Title>Order Summary</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>NGN{order.itemsPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>NGN{order.shippingPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Order Total</Col>
                                            <Col>NGN{order.totalPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            { isPending ? (
                                                <LoadingBox />
                                            ) : 
                                            (
                                                <div>
                                                    <PayPalButtons
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
                    </Col>
                </Row>
            </Container>
        );
}

export default Order;