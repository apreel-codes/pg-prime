import Header from "../components/Header";
import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import data from "../data";

const Home = () => {
    return (
        <div className="mt-10 mx-28">
            <h1 className='text-medium text-5xl'>Featured products</h1>
            <div className='flex flex-wrap w-full mt-5'>
            {data.products.map((product, i) => (
                <div className='border mx-5' key={product.slug}>
                    <Link to={`/product/${product.slug}`}>
                    <img className='image' src={product.image} />
                    </Link>
                    <div className='p-5'>
                    <Link to={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                    </Link>
                    <p><strong>$</strong>{product.price}</p>
                    <button className='bg-orange-500 px-5 py-2 mt-3 rounded'>Add to Cart</button>
                </div>
                </div>          
            ))}
            </div>      
        </div>
    )
}

export default Home;
