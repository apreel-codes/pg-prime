import React, { useEffect, useState } from "react";
import EditBrand from "./Edit";
import Axios from 'axios';

const ShowBrands = () => {

    const [brands, setBrands] = useState([]);

    //delete brand
    const deleteBrand = async (id) => {
        try {
            const deleteBrand = await fetch(`http://localhost:5000/brands/${id}`, {
                method: "DELETE"
            });

            //to remove deleted items from page
            setBrands(brands.filter(brand => brand.brand_id !== id))
        } catch (err) {
            console.error(err.message)
        }
    }

    const getBrands = async () => {
        try {
            const res = await Axios.get("http://localhost:5000/brands")
            setBrands(res.data);
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getBrands();
    }, []);

    return (
        <div className='py-5 bg-gray-100 rounded mx-40 my-5'>
            <div className="">
                {brands.map((brand, i) => (
                    <div key={brand.brand_id}>
                        {/* <p>{brand.image.data}</p> */}
                        <p>{brand.name}</p>
                        <div>
                            <EditBrand brand={brand} />
                        </div>
                        <button className="btn btn-danger mt-3" onClick={() => deleteBrand(brand.brand_id)}>Delete</button>
                    </div>              
                ))}
            </div>
        </div>
    )
};

export default ShowBrands;


