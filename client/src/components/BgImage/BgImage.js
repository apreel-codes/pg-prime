import React, { useEffect } from 'react';
import './BgImage.css'
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';



const BgImage = () => {

    useEffect(() => {
        AOS.init({duration: 1200});
      }, []);

      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


    return (
        <div className='bg-image-comp'>
            <div className='mobile-bg md:hidden block mx-auto w-full'>
                <div className='mobile-bg-image'>
                    <div className='mobile-bg-content mx-auto'>
                        <h1 data-aos="slide-right">Elevate your sneaker game with PGF Prime</h1>
                        <p data-aos="slide-right">Discover a world of stylish and comfortable sneakers that redefine your every step.</p>
                        <button className=' mobile-bg-button py-2.5 rounded' data-aos="slide-up">
                            <Link onClick={() => window.scrollTo(0, 0)} to={{ pathname: '/search', search: `allProducts`}}> 
                                SHOP NOW
                            </Link>
                        </button>
                    </div>
                </div>
            </div>

            <div className='web-bg md:block hidden'>
                <div className='web-bg-image'>
                    <div className='web-bg-content mx-auto'>
                        <h1 data-aos="slide-right">Elevate your sneaker game with PGF Prime</h1>
                        <p data-aos="slide-right">Discover a world of stylish and comfortable sneakers that redefine your every step.</p>
                        <button className='web-bg-button py-2.5 rounded'  data-aos="slide-up">
                            <Link to={{ pathname: '/search', search: `allProducts`}}>
                                SHOP NOW
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BgImage;