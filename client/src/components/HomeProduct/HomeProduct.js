import { Routes, Route, Link } from "react-router-dom";
import './HomeProduct.css';


const HomeProduct = (props) => {
    const { product } = props;

    return (
        <div className="product" key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                    <img className='image' src={product.image} />
                    </Link>
                    <div className="mt-2">
                        <Link to={`/product/${product.slug}`}>
                                <p className="product-name">{product.name}</p>
                        </Link>
                        {/* <Rating rating={product.rating} numReviews={product.numReviews}/> */}
                        <small className="brand">{product.category}'s wear</small>
                        <p className="price">&#163;{product.price}</p>
                    </div>
        </div>          
    )
}

export default HomeProduct;