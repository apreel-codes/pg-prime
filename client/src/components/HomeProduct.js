import { Routes, Route, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from "./Rating";
import Ruler from '../components/Ruler.js';


const HomeProduct = (props) => {
    const { product } = props;

    return (
        <Card className="" key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                 <img className='image card-img-top mx-3 mx-auto' src={product.image} />
                </Link>
                <Card.Body className="-mt-3 w-[80%] mx-auto">
                    <Link to={`/product/${product.slug}`}>
                            <p className="text-base font-medium">{product.name}</p>
                    </Link>
                    {/* <Rating rating={product.rating} numReviews={product.numReviews}/> */}
                    <Card.Text className="text-sm text-gray-500">{product.brand}</Card.Text>
                    <Card.Text className="text-base font-medium mt-1">&#163;{product.price}</Card.Text>
                </Card.Body>
        </Card>          
    )
}

export default HomeProduct;