import { Routes, Route, Link, useParams } from "react-router-dom";
import React, { useCallback } from "react";

const Product = () => {
    const params = useParams();
    console.log(params)
    const { slug } = params;

    return (
        <div className="mt-10 mx-28">
            <h1 className="bold text-6xl">{slug}</h1>
        </div>
    )
}

export default Product;