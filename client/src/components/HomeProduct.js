import { Routes, Route, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from "./Rating";


const HomeProduct = (props) => {
    const { product } = props;

    return (
        <Card className=" border transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300" key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                 <img className='image card-img-top mb-5' src={product.image} />
                </Link>
                <Card.Body className="border pl-7 -mt-1">
                    <Link to={`/product/${product.slug}`}>
                            <Card.Title className="text-base underline hover:underline font-bold">{product.name}</Card.Title>
                    </Link>
                    {/* <Rating rating={product.rating} numReviews={product.numReviews}/> */}
                    <Card.Text className="text-sm">{product.brand}</Card.Text>
                    <Card.Text className="text-md">From &#163;{product.price}</Card.Text>
                    {/* <Button className="bg-blue-500 mt-3 border-radius-0">Add to Cart</Button> */}
                </Card.Body>
        </Card>          
    )
}

export default HomeProduct;