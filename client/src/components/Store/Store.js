import React from 'react';
import './Store.css'
import { Link } from 'react-router-dom';


const Store = () => {
    return (
        <div>
            <div className='store w-[94%] mx-auto'>
                <div className='store-img md:block hidden'>
                </div>
                <div className='store-content w-[60%] mx-auto'>
                    <h2>Visit Our Store Today</h2>
                    <p>Step into our store and immerse yourself in the world of sneakers.</p>
                    <Link to="https://maps.google.com?q=33a%20Adebayo%20Doherty%20Rd,%20Eti-Osa%20101233,%20Lekki,%20Lagos&ftid=0x0:0xa188c9c24bd3a6f0&hl=en-NG&gl=ng&entry=gps&lucs=,47071704&g_st=iw"
                    ><button>Get Directions</button></Link>
                </div>
            </div>
        </div>
    )
}
export default Store;