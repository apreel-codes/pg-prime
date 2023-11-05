import axios from "axios";
import { useContext } from "react";
import { Store } from "../../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MessageBox from "../MessageBox";
import { Link, useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './CartComponent.css';

const CartComponent = () => {
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

    const checkOutHandler = () => {
        navigate('/signin?redirect=/shipping');
    }

    return (
        <div>
            {/* <Helmet>
               <title>My Cart</title>
            </Helmet>
            <Header /> */}
                <div className="cart-page w-[90%] mx-auto">
                    <h1>My Shopping Cart</h1>
                    <div>
                        { cartItems.length === 0 ? (
                         <MessageBox>
                             Cart is empty. <Link to="/">Go Shopping</Link>
                        </MessageBox>
                       ) : (
                            <div>
                                { cartItems.map((item) => (
                                    <div className="cart-item flex flex-row justify-between">
                                        <div className="cart-image-group relative">
                                            <small>{item.brand}</small>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="img-fluid rounded img-thumbnail cart-image"
                                             ></img>
                                        </div>
                                        <div className="cart-details">
                                            <Link className="item-name" to={`/product/${item.slug}`}>{item.name}</Link>
                                            <p className="item-size">Size: {item.size}</p>
                                            <p className="item-price">&#163;{item.price}</p>
                                            <div className="update-delete flex flex-row justify-between items-center">
                                                <div className="add-minus-qty flex flex-row justify-between items-center">
                                                    <button onClick={ () => updateCartHandler(item, item.quantity - 1 )} disabled={item.quantity === 1}>
                                                    <img src="../images/minus.png" />
                                                    </button>{' '}
                                                    <span className="">{item.quantity}</span>{' '}
                                                    <button onClick={ () => updateCartHandler(item, item.quantity + 1 )} disabled={item.quantity === item.countInStock}>
                                                    <img src="../images/add.png" />
                                                    </button>{' '}   
                                                </div>
                                                <button className="" onClick={() => removeItemHandler(item)} variant="light">
                                                 <i className="fas fa-trash text-red-600"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                }
                            </div>
                            
                       )
                    }
                    </div>
                    <div className="check-out-section">
                        <div className="total flex flex-row justify-between items-center mb-3">
                            <p>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}item(s))</p>
                            <p className="price">&#163;{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</p>  
                        </div>
                        <div className="d-grid">
                            <button
                                className="cart-button"
                                type="button"
                                onClick={checkOutHandler}
                                disabled={ cartItems.length === 0 }
                            >
                            Check Out
                            </button>
                        </div>
                    </div>
                </div>
            {/* <Footer /> */}
        </div>
    )
}

export default CartComponent;