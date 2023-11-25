import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import './BestSellersProduct.css';
import { Store } from "../../Store";
import { ToastContainer, toast } from "react-toastify";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { useContext, useReducer } from "react";

const reducer = (state, action) => {
    switch(action.type) {
        case 'REFRESH_PRODUCT':
            return { ...state, product: action.payload };
                case 'CREATE_REQUEST':
                        return {...state, loading: true};
                                case 'FETCH_SUCCESS':
                                        return {...state, product: action.payload, loading: false};
                                                case 'FETCH_FAIL':
                                                     return {...state, loading: false, error: action.payload};
        default:
        return state;
    }
};

const BestSellersProduct = (props) => {
    const { product } = props;

    const navigate = useNavigate();

    const [{ loading, error }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true, error: ''
    })


    const {state, dispatch: ctxDispatch} = useContext(Store); //by using useContext, we have access to the state and also to changs the context
    const { cart, userInfo } = state;
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity ) {
            window.alert('Sorry. Product is out of stock');
            return;
        }


        ctxDispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity }});
        navigate('/');
        toast.success('Item added to cart')
    }

    return  ( 
            <div className="best-seller-product relative" key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                    <img className='image' src={product.image} />
                    </Link>
                    <div className="content">
                        <p className="price">&#163;{product.price}</p>
                        <Link to={`/product/${product.slug}`}>
                                <p className="name">{product.name}</p>
                        </Link>
                        {/* <Rating rating={product.rating} numReviews={product.numReviews}/> */}
                        <small className="brand">{product.brand}</small>
                    </div>
                    <div className="d-grid">
                        <button className="button" onClick={addToCartHandler}>
                            Add to cart
                        </button>
                    </div>
        </div>    
    )
}

export default BestSellersProduct;