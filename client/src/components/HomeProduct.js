import { Routes, Route, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from "./Rating";
import Ruler from '../components/Ruler.js';


const HomeProduct = (props) => {
    const { product } = props;

    return (
        <div className="product pt-1" key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                <small className="ml-2">{product.brand}</small>
                 <img className='image card-img-top mx-3 mx-auto my-2' src={product.image} />
                </Link>
                <div className="-mt-3 w-[100%] -ml-2 left">
                    <Link to={`/product/${product.slug}`}>
                            <p className="text-sm card-text">{product.name}</p>
                    </Link>
                    {/* <Rating rating={product.rating} numReviews={product.numReviews}/> */}
                    <small className="text-gray-400">{product.size}</small>
                    <p className="text-sm font-medium mt-1">&#163;{product.price}</p>
                </div>
        </div>          
    )
}

export default HomeProduct;