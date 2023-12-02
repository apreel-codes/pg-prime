import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { getError } from "../../uttils";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from "react-toastify";
import Rating from "../../components/Rating";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { Store } from "../../Store";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './Product.css';
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import { currencyData, eusizes, ussizes, uksizes } from './Currency';




const reducer = (state, action) => {
    switch(action.type) {
        case 'REFRESH_PRODUCT':
            return { ...state, product: action.payload };
                case 'CREATE_REQUEST':
                    return { ...state, loadingCreateReview: true };
                        case 'CREATE_SUCCESS':
                            return { ...state, loadingCreateReview: false };
                                case 'CREATE_FAIL':
                                    return { ...state, loadingCreateReview: false };
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
    let reviewsRef = useRef();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [size, setSize] = useState('Select a size');
    const [active, setActive] = useState({});
    const [buttonToggled, setButtonToggled] = useState(0);
    const [isDetailsToggled, setIsDetailsToggled] = useState(false);
    const [isDescriptionToggled, setIsDescriptionToggled] = useState(false);
    const [isReviewToggled, setIsReviewToggled] = useState(false);
    const [toggled, setToggled] = useState(1);
  


      const showDetails = () => {
          setIsDetailsToggled(!isDetailsToggled);    
    }

      const showDescription = () => {
          setIsDescriptionToggled(!isDescriptionToggled);    
    }

      const showReview = () => {
          setIsReviewToggled(!isReviewToggled);    
    }

    const updateToggle = (id) => {
          setToggled(id);
    }
   

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    }

    const updateButton = (index) => {
        setButtonToggled(index);
    }

  
    const navigate = useNavigate();
    const params = useParams();
    const { slug } = params;


    const [{ loading, error, product, loadingCreateReview }, dispatch] = useReducer(reducer, {
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
    const {state, dispatch: ctxDispatch} = useContext(Store); //by using useContext, we have access to the state and also to change the context
    const { cart, userInfo } = state;

    const euSizes = product.euSizes;
    const usSizes = product.usSizes;
    const ukSizes = product.ukSizes;
  
    const addToCartHandler = async () => {
        product.size = size;
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity ) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity }});
        navigate('/cart');
        toast.success('Item added to cart');
        return;
    }



    const submitHandler = async (e) => {
        e.preventDefault();
        if (!comment || !rating) {
          toast.error('Please enter comment and rating');
          return;
        }
        try {
          const { data } = await axios.post(
            `/api/products/${product._id}/reviews`,
            { rating, comment, name: userInfo.name },
            {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            }
          );
          dispatch({
            type: 'CREATE_SUCCESS',
          });
          toast.success('Review submitted successfully');
          product.reviews.unshift(data.review);
          product.numReviews = data.numReviews;
          product.rating = data.rating;
          dispatch({ type: 'REFRESH_PRODUCT', payload: product });
          window.scrollTo({
            behavior: 'smooth',
            top: reviewsRef.current.offsetTop,
          });
        } catch (error) {
          toast.error(getError(error));
          dispatch({ type: 'CREATE_FAIL' });
        }

        setRating(0);
        setComment('');
    };

    

    return loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="">
            <Helmet>
                <title>{product.name}</title>
            </Helmet>
            <Header />
            <div className="product-page mx-auto mb-8" >
                <div className="image-specs-button md:flex md:flex-row md:justify-between">
                    <div className="product-page-image-specs">
                        <img
                            className="product-page-image" 
                            src={selectedImage || product.image}
                            alt={product.image}
                        ></img>
                        <Row xs={1} md={7} className="thumbnails grid grid-cols-3 gap-1 w-100">
                                { [product.image, ...product.images].map((x) => (
                                <Col key={x}>
                                    <div>
                                        <Button
                                            className="thumbnail"
                                            type="button"
                                            variant="light"
                                            onClick={() => setSelectedImage(x)}
                                            >
                                            <img src={x} alt="product" />
                                            </Button>
                                    </div>
                                </Col>
                                ))}
                        </Row>
                    </div>

                    <div className="specs-content">
                        <div className="specs mt-6 md:mt-0">
                                <div>
                                    <h1 className="font-bold">{product.name}</h1>
                                    <p className="brand">Brand: {product.brand}</p>
                                    <Rating rating={product.rating} numReviews={product.numReviews} />
                                    <p className="price">₦{product.price}</p>  
                                </div>

                                <p className="product-availability">{product.availability}</p>

                                <div className="size">
                                    <p>Size: {size}</p>

                                    <div className="countries mb-3 flex flex-row justify-between">
                                        <p className = { toggled === 1 ? "country-text" : "country-text-inactive"} onClick={() => updateToggle(1)}>EU</p>
                                        <p className = { toggled === 2 ? "country-text" : "country-text-inactive"} onClick={() => updateToggle(2)}>US</p>
                                        <p className = { toggled === 3 ? "country-text" : "country-text-inactive"} onClick={() => updateToggle(3)}>UK</p>
                                    </div>

                                    <div className = { toggled === 1 ? "buttons-active" : "buttons" }>
                                        <div className="size-button">
                                                {euSizes.map((eusize, index) => (
                                                    <button 
                                                    
                                                    active = {active === 1} 
                                                    className = { buttonToggled === index ? "button-select" : "" } 
                                                    key = {index}
                                                    value={eusize} 
                                                    onClick={(e) => {
                                                        handleSizeChange(e) 
                                                        updateButton(index)
                                                    }}
                                                    type="submit">{eusize}
                                                    </button>
                                                ))}
                                            </div>
                                    </div>
                                    
                                    <div className = { toggled === 2 ? "buttons-active" : "buttons" } >
                                            <div className="size-button">
                                                {usSizes.map((ussize, index) => (
                                                    <button 
                                                    active = {active === 1} 
                                                    className = { buttonToggled === index ? "button-select" : "" } 
                                                    key = {index}
                                                    value={ussize} 
                                                    onClick={(e) => {
                                                        handleSizeChange(e) 
                                                        updateButton(index)
                                                    }} 
                                                    type="submit">{ussize}
                                                    </button>
                                                ))}
                                            </div>
                                    </div>

                                    <div className = { toggled === 3 ? "buttons-active" : "buttons" } >
                                        <div className="size-button">
                                                {ukSizes.map((uksize, index) => (
                                                    <button 
                                                    active = {active === 1} 
                                                    className = { buttonToggled === index ? "button-select" : "" } 
                                                    key = {index}
                                                    value={uksize} 
                                                    onClick={(e) => {
                                                        handleSizeChange(e) 
                                                        updateButton(index)
                                                    }}
                                                    type="submit">{uksize}
                                                    </button>
                                                ))}
                                            </div>
                                    </div>                                   
                                </div>
                        </div>
                        <div className="product-buttons d-grid space-y-4">
                            <button onClick={addToCartHandler} className="add-cart">
                                Add to Cart
                            </button>
                            <button onClick={addToCartHandler} className="buy-now">
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="product-details md:w-[43%]">                   
                    <div className="details-group">
                            <div className="details flex flex-row justify-between">
                                <h3>Product Details</h3>
                                <div className='fa-stack' onClick={showDetails}>
                                    <img className= { isDetailsToggled ? "downDetails fa-stack-1x h-3 w-4" : "upDetails" } src="../images/down-arrow.png"/>
                                    <img className= { isDetailsToggled ? "upDetails fa-stack-1x h-3 w-4" : "downDetails" } src="../images/up-arrow.png"/>
                                </div>   
                            </div>
                            <div className= {isDetailsToggled ? "details-content" : 'hidden'}>
                                <p>Name: <span>{product.name}</span></p>
                                <p>Brand: <span>{product.brand}</span></p>
                            </div>
                    </div>

                    <div className="description-group">
                            <div className="product-description flex flex-row justify-between">
                                <h3>Description</h3>
                                <div className='fa-stack' onClick={showDescription}>
                                    <img className= { isDescriptionToggled ? "downDescription fa-stack-1x h-3 w-4" : "upDescription" } src="../images/down-arrow.png"/>
                                    <img className= { isDescriptionToggled ? "upDescription fa-stack-1x h-3 w-4" :  "downDescription" } src="../images/up-arrow.png"/>
                                </div>   
                            </div>
                            <div className= { isDescriptionToggled ? "description-content" : "hidden" } >
                                <p>{product.description}</p>
                            </div>
                    </div>

                    <div className="review-group">
                            <div className="product-review flex flex-row justify-between">
                                <h3 ref={reviewsRef}>Product Reviews</h3>
                                <div className='fa-stack' onClick={showReview}> 
                                    <img className= { isReviewToggled ? "downReview fa-stack-1x h-3 w-4" : "upReview" } src="../images/down-arrow.png"/>
                                    <img className= { isReviewToggled ? "upReview fa-stack-1x h-3 w-4" : "downReview" } src="../images/up-arrow.png"/>
                                </div>   
                            </div>
                            <div className= { isReviewToggled ? "review-content" : "hidden" } >
                                    <div>
                                        {product.reviews.length === 0 && (
                                            <MessageBox>There are no reviews yet.</MessageBox>
                                        )}
                                            <div>
                                                    {product.reviews.map((review) => (
                                                        <div className="review flex flex-row justify-between items-center" key={review._id}>
                                                            <div className="space-y-1">
                                                                <strong>{review.name}</strong>
                                                                <p className="date">{review.createdAt.substring(0, 10)}</p>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <Rating rating={review.rating} caption=" "></Rating>
                                                                <p className="comment">{review.comment}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                        </div>
                                    </div>
                            </div>

                    </div>
                </div>

                <div className="write-review md:w-[43%]">
                            {
                                userInfo ? (
                                                <form onSubmit={submitHandler}>
                                                    <h2>Write a review</h2>
                                                    <Form.Group className="mb-3 rating-group" controlId="rating">
                                                        <Form.Label className="label">Rating</Form.Label>
                                                        <Form.Select
                                                            aria-label="Rating"
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                        <option value="">Select...</option>
                                                        <option value="1">1- Poor</option>
                                                        <option value="2">2- Fair</option>
                                                        <option value="3">3- Good</option>
                                                        <option value="4">4- Very good</option>
                                                        <option value="5">5- Excelent</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <FloatingLabel
                                                        controlId="floatingTextarea"
                                                        label="Drop a review"
                                                        className="mb-3 drop-a-review"
                                                    >
                                                        <Form.Control
                                                        as="textarea"
                                                        className="comment-text"
                                                        placeholder="Leave a comment here"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        />
                                                    </FloatingLabel>

                                                    <div className="mt-4 d-grid">
                                                        <button className="comment-button" disabled={loadingCreateReview} type="submit">
                                                            Submit
                                                        </button>
                                                        {loadingCreateReview && <LoadingBox></LoadingBox>}
                                                    </div>
                                                </form>
                                                ) : (
                                                    <MessageBox>
                                                    Please,{' '}
                                                    <Link className="font-bold" to={`/signin?redirect=/product/${product.slug}`}>
                                                                Sign In
                                                    </Link>{' '}
                                                    to write a review
                                                    </MessageBox>
                                                )
                            }
                </div>
            </div>
            <div className="mt-6 mb-20">
                <NewArrivals />
            </div>
            <Footer />
        </div>
        
    );
}

export default Product;