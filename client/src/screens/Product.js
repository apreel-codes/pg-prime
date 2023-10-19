import axios from "axios";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useReducer, useState } from "react";
// import axios from 'axios';
// import apiClient from "../api";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from "../components/Rating";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Badge from 'react-bootstrap/Badge';
import { Helmet } from 'react-helmet-async';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../uttils";
import { Store } from "../Store";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";




const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
            case 'FETCH_SUCCESS':
                return {...state, product: action.payload, loading: false};
                case 'FETCH_FAIL':
                    return {...state, loading: false, error: action.payload};
                    default:
                        return state;
    }
};

const Product = () => {
    const [selectedImage, setSelectedImage] = useState('');

    const navigate = useNavigate();
    const params = useParams();
    console.log(params)
    const { slug } = params;


    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true, error: ''
    })


    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try{
                const result = await axios.get(`/api/products/slug/${slug}`);
                dispatch({type: 'FETCH_SUCCESS', payload: result.data})
            } catch(err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
            }
        };
        fetchData();
    }, [slug])


    //this function adds an item to the cart
    const {state, dispatch: ctxDispatch} = useContext(Store); //by using useContext, we have access to the state and also to changs the context
    const { cart } = state;
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity ) {
            window.alert('Sorry. Product is out of stock');
        }


        ctxDispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity }});
        navigate('/cart');
        toast.success('Item added to cart')
        // alert("Item added to cart!");
    }


    return (
        <div className="md:w-[60%] mx-auto my-7">
            <ToastContainer position='top-center' limit={1} />
            {
                loading ? ( <LoadingBox /> )
                :
                error ? ( <MessageBox variant="danger">{error}</MessageBox> ) : (
                    <Row className="md:mx-20">
                        <Col className="" md={6}>
                            <img
                                className="img-large" 
                                // 
                                src={selectedImage || product.image}
                                alt={product.image}
                            ></img>
                        </Col>
                        <Col className="" md={6}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Helmet>
                                        <title>{product.name}</title>
                                    </Helmet>
                                    <h1 className="text-5xl font-bold">{product.name}</h1>
                                </ListGroup.Item>
                                <ListGroup.Item className="text-lg text-bold">
                                    Price: &#163;{product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                <Row xs={1} md={7} className="grid grid-cols-3 gap-2 w-100">
                                    {[product.image, ...product.images].map((x) => (
                                    <Col key={x}>
                                        <Card>
                                        <Button
                                            className="thumbnail"
                                            type="button"
                                            variant="light"
                                            onClick={() => setSelectedImage(x)}
                                        >
                                            <Card.Img variant="top" src={x} alt="product" />
                                        </Button>
                                        </Card>
                                    </Col>
                                    ))}
                                </Row>
                                </ListGroup.Item>
                                <ListGroup.Item className="text-lg">
                                   {product.description}
                                </ListGroup.Item>
                                <Card className="border-none">
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            <ListGroupItem>
                                                <Row>
                                                    <Col><strong>Price:</strong></Col>
                                                    <Col>&#163;{product.price}</Col>
                                                </Row>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Row>
                                                    <Col><strong>Status:</strong></Col>
                                                    <Col>
                                                    { product.countInStock > 0 ? 
                                                    <Badge className="py-3 px-5 text-sm text-green-500 bg-white border">In Stock</Badge>
                                                     : 
                                                    <Badge className="py-3 px-5 text-sm" bg="danger">Out Of Stock</Badge>
                                                    }  </Col>
                                                </Row>   
                                            </ListGroupItem>

                                            {product.countInStock > 0 && (
                                                <ListGroupItem>
                                                    <div className="d-grid">
                                                        <Button onClick={addToCartHandler} className="bg-white border-black text-black py-3" variant="primary">
                                                            Add to Cart
                                                        </Button>
                                                        <Button onClick={addToCartHandler} className="bg-black py-4 mt-4" variant="primary">
                                                            Buy Now
                                                        </Button>
                                                    </div>
                                                </ListGroupItem>
                                            )}

                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </ListGroup>
                        </Col>
                    </Row>
                    )
            }
        </div>

    )
}

export default Product;