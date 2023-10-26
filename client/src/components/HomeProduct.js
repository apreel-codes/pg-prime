import { Routes, Route, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from "./Rating";
import Ruler from '../components/Ruler.js';


const HomeProduct = (props) => {
    const { product } = props;

    return (
        <div className="product pt-1 pl-3" key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                <small className="text-sm">{product.brand}</small>
                 <img className='image card-img-top mx-3 mx-auto' src={product.image} />
                </Link>
                <div className="mt-2 w-[100%] left">
                    <Link to={`/product/${product.slug}`}>
                            <p className="text-base card-text">{product.name}</p>
                    </Link>
                    {/* <Rating rating={product.rating} numReviews={product.numReviews}/> */}
                    <small className="text-gray-400 text-sm">{product.size}</small>
                    <p className="text-base font-medium mt-1">&#163;{product.price}</p>
                </div>
        </div>          
    )
}

export default HomeProduct;