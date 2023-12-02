import axios from "axios";
import { useContext } from "react";
import { Store } from "../../Store";
import { Helmet } from "react-helmet-async";
import MessageBox from "../../components/MessageBox";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './Cart.css';

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
            <Helmet>
               <title>My Cart</title>
            </Helmet>
            <Header />
                <div className="cart-page w-[90%] mx-auto md:hidden block">
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
                                            <p className="item-price">₦{item.price.toFixed(2)}</p>
                                            <div className="update-delete flex flex-row justify-between items-center">
                                                <div className="add-minus-qty flex flex-row justify-between items-center">
                                                    <button onClick={ () => updateCartHandler(item, item.quantity - 1 )} disabled={item.quantity === 1}>
                                                    <img src="../images/minus.png" />
                                                    </button>{' '}
                                                    <span className="">{item.quantity}</span>{' '}
                                                    <button onClick={ () => updateCartHandler(item, item.quantity + 1 )}>
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
                            <p className="price">₦{(cartItems.reduce((a, c) => a + c.price * c.quantity, 0)).toFixed(2)}</p>  
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




                <div className="web-cart-page hidden md:block w-[91%] mx-auto">
                <h1>My Shopping Cart</h1>
                    <div>
                    { cartItems.length === 0 ? (
                         <MessageBox>
                             Cart is empty. <Link to="/">Go Shopping</Link>
                        </MessageBox>
                       ) : (
                        <table className="table mt-3 text-sm">
                                         <thead>
                                            <tr className="">
                                              <th>Product</th>
                                              <th>Price</th>
                                              <th>Quantity</th>
                                              <th>Total</th>
                                            </tr>
                                         </thead>
                                        { cartItems.map((item) => (
                                    
                                         
                                         <tbody>
                                          <tr className="web-cart-item py-3">
                                            <td className="">  
                                               <div className="web-image-details-group flex flex-row justify-between items-center relative">
                                                   <div className="web-cart-image-group relative">
                                                     <small>{item.brand}</small>
                                                        <img
                                                           src={item.image}
                                                           alt={item.name}
                                                           className="img-fluid rounded img-thumbnail web-cart-image"
                                                        ></img>
                                                    </div>
                                                    <div className="web-cart-details space-y-2">
                                                       <Link className="web-item-name" to={`/product/${item.slug}`}>{item.name}</Link>
                                                       <p className="web-item-size">Size: {item.size}</p>
                                                       <button className="" onClick={() => removeItemHandler(item)} variant="light">
                                                       <i className="fas fa-trash text-red-600"></i>
                                                       </button>
                                                    </div>
                                               </div>   
                                
                                            </td>
                                            <td className="web-item-price">
                                               <p className="mt-14">&#163;{item.price}</p>
                                            </td>
                                            <td className="web-add-minus-qty">
                                            <div className="web-add-minus-qty-content mt-12 w-[30%] flex flex-row justify-between items-center">
                                                <button onClick={ () => updateCartHandler(item, item.quantity - 1 )} disabled={item.quantity === 1}>
                                                    <img src="../images/minus.png" />
                                                </button>{' '}
                                                <span className="">{item.quantity}</span>{' '}
                                                <button onClick={ () => updateCartHandler(item, item.quantity + 1 )} disabled={item.quantity === item.countInStock}>
                                                   <img src="../images/add.png" />
                                                </button>{' '}   
                                            </div>
                                               
                                            </td>
                                            <td className="web-item-price-total">
                                               <p className="mt-14">&#163;{(item.price * item.quantity).toFixed(2)}</p>
                                            </td>
                                          </tr>
                                        </tbody>
                                  ))
                                }
                        </table>
                       )
                    }
                    </div>
                    <div className="flex flex-row justify-between items-center w-[86%]">
                        <span></span>
                    <div className="web-check-out-section">
                        <div className="web-total flex flex-row justify-between items-center mb-3">
                            <p>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}item(s))</p>
                            <p className="web-price">&#163;{(cartItems.reduce((a, c) => a + c.price * c.quantity, 0)).toFixed(2)}</p>  
                        </div>
                        <div className="d-grid">
                            <button
                                className="web-cart-button"
                                type="button"
                                onClick={checkOutHandler}
                                disabled={ cartItems.length === 0 }
                            >
                            Check Out
                            </button>
                        </div>
                    </div>
                    </div>
                    
                </div>
            <Footer />
        </div>
    )
}

export default CartComponent;
