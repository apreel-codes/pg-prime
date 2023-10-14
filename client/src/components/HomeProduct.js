import { Routes, Route, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from "./Rating";


const HomeProduct = (props) => {
    const { product } = props;

    return (
        <Card className="mt-3 border-0 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300" key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                 <img className='image card-img-top' src={product.image} />
                </Link>
                <Card.Body>
                    <Link to={`/product/${product.slug}`}>
                            <Card.Title className="text-base hover:underline font-bold">{product.name}</Card.Title>
                    </Link>
                    <Rating rating={product.rating} numReviews={product.numReviews}/>
                    <Card.Text className="text-md">NGN{product.price}</Card.Text>
                    {/* <Button className="bg-blue-500 mt-3 border-radius-0">Add to Cart</Button> */}
                </Card.Body>
        </Card>          
    )
}

export default HomeProduct;