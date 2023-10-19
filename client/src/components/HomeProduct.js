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
                 <img className='image card-img-top mx-3' src={product.image} />
                </Link>
                <Card.Body className="pl-7 -mt-1">
                    <Link to={`/product/${product.slug}`}>
                            <Card.Title className="text-lg hover:underline font-bold">{product.name}</Card.Title>
                    </Link>
                    {/* <Rating rating={product.rating} numReviews={product.numReviews}/> */}
                    <Card.Text className="text-sm">{product.brand}</Card.Text>
                    <Card.Text className="text-lg bg-gray-200 w-[50%] text-center mt-1 py-3 px-2 rounded font-bold">&#163;{product.price}</Card.Text>
                    {/* <Button className="bg-blue-500 mt-3 border-radius-0">Add to Cart</Button> */}
                </Card.Body>
        </Card>          
    )
}

export default HomeProduct;