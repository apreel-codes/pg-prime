import React, { useEffect } from 'react';
import './Store.css'
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Store = () => {

    useEffect(() => {
        AOS.init({duration: 1200});
      }, []);

     
    return (
        <div>
            <div className='store-comp w-[94%] mx-auto'>
                <div className='store-img md:block hidden'>
                </div>
                <div className='store-content md:w-[60%] w-[95%] md:px-2 px-2 mx-auto'>
                    <h2 data-aos="slide-up">Visit Our Store Today</h2>
                    <p data-aos="slide-up">Step into our store and immerse yourself in the world of sneakers.</p>
                    <Link to="https://maps.google.com?q=33a%20Adebayo%20Doherty%20Rd,%20Eti-Osa%20101233,%20Lekki,%20Lagos&ftid=0x0:0xa188c9c24bd3a6f0&hl=en-NG&gl=ng&entry=gps&lucs=,47071704&g_st=iw"
                    ><button className='' data-aos="slide-up">Get Directions</button></Link>
                </div>
            </div>
        </div>
    )
}
export default Store;