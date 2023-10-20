import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MessageBox from "../components/MessageBox";
import { Link, useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
// import apiClient from "../api";




const Cart = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity ) {
            window.alert('Sorry. Product is out of stock');
        }

        ctxDispatch({type: 'CART_ADD_ITEM', payload: {...item, quantity }});
    }

    
    const removeItemHandler = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item }); 
    }

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    }

    return (
        <Container fluid className="md:w-[80%] w-[95%] my-20">
            <Helmet>
                <title>My Cart</title>
            </Helmet>
            <h1 className='text-2xl font-bold'>My Cart</h1>
            <Row className="mt-3">
                <Col md={8} className="">
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Cart is empty. <Link to="/">Go Shopping</Link>
                        </MessageBox>
                    ):
                    (
                        <ListGroup>
                            {cartItems.map((item) => (
                                <ListGroupItem key={item._id} className="mb-3">
                                    <Row className="align-items-center grid grid-cols-4 gap-0 flex flex-row justify-between">
                                        <Col className="">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="img-fluid rounded img-thumbnail"
                                            ></img>{' '}
                                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                        </Col>
                                        <Col className="flex flex-row justify-between align-items-center text-center">
                                            <Button variant="" onClick={ () => updateCartHandler(item, item.quantity - 1 )} disabled={item.quantity === 1}>
                                                <i className="fas fa-minus-circle"></i>
                                            </Button>{' '}
                                            <span className="">{item.quantity}</span>{' '}
                                            <Button variant="" onClick={ () => updateCartHandler(item, item.quantity + 1 )} disabled={item.quantity === item.countInStock}>
                                                <i className="fas fa-plus-circle"></i>
                                            </Button>{' '}
                                        </Col>
                                        <Col className="text-center">&#163;{item.price}</Col>
                                        <Col className="text-center">
                                            <Button className="" onClick={() => removeItemHandler(item)} variant="light">
                                                <i className="fas fa-trash text-red-600"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                            
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <h3 className="text-lg font-bold">
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                                        items) : &#163
                                        {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                    </h3>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <div className="d-grid">
                                        <Button className="border-none bg-black rounded-full py-3 text-gray-100"
                                        type="button"
                                        
                                        onClick={checkoutHandler}
                                        disabled={ cartItems.length === 0 }
                                        >Proceed to Checkout</Button>
                                    </div>
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Cart;