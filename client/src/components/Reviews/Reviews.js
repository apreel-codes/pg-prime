import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import ReactPaginate from 'react-paginate';
import MessageBox from "../MessageBox";
import Rating from "../Rating";
import { getError } from "../../uttils";
import { useParams } from "react-router-dom";

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


const Reviews = () => {
    let reviewsRef = useRef();

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

    
    // const [currentItems, setCurrentItems] = useState(null);
    // const [pageCount, setPageCount] = useState(null);
    // const [itemOffset, setItemOffset] = useState(0);
    // const itemsPerPage = 3;

    // useEffect(() => {
    //     const endOffset = itemOffset + itemsPerPage;
    //     setCurrentItems(product.reviews.slice(itemOffset, endOffset));
    //     setPageCount(Math.ceil(product.reviews.length / itemsPerPage));   
    // }, [itemOffset, itemsPerPage, product.reviews]);

    

    //   const handlePageClick = (event) => {
    //     const newOffset = (event.selected * itemsPerPage) % product.reviews.length;
    //     setItemOffset(newOffset);
    //   };


      return (
        <>
            <div className="reviews">
                <h2 ref={reviewsRef}>Reviews</h2>
                <div>
                    {product.reviews.length === 0 && (
                                <MessageBox>There is no review</MessageBox>
                            )}
                            <div>
                                {product.reviews.map((review) => (
                                    <div className="review" key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating rating={review.rating} caption=" "></Rating>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                </div>
            </div>
          {/* <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          /> */}
        </>
      );
}

export default Reviews;