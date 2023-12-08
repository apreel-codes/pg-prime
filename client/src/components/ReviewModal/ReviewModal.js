import axios from 'axios';
import React, { useContext, useReducer, useRef, useState } from 'react';
import { getError } from '../../uttils';
import { toast } from "react-toastify";
import Form from 'react-bootstrap/Form';
import LoadingBox from "../../components/LoadingBox";
import './ReviewModal.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Store } from '../../Store';


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

const ReviewModal = () => {

    let reviewsRef = useRef();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');


    const [{ loading, error, product, order, loadingCreateReview }, dispatch] = useReducer(reducer, {
        order: {},
        product: [],
        loading: true, error: ''
    })

    const {state, dispatch: ctxDispatch} = useContext(Store); //by using useContext, we have access to the state and also to change the context
    const { cart, userInfo } = state;


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


    return(
        <div>
            <div className="write-review md:w-[43%]">
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
            </div>
        </div>
    )
}

export default ReviewModal;