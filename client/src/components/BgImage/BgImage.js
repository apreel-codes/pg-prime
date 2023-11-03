import React from 'react';
import './BgImage.css'
import Button from 'react-bootstrap/Button';




const BgImage = () => {
    return (
        <div>
            <div className='mobile-bg md:hidden block mx-auto w-full'>
                <div className='mobile-bg-image'>
                    <div className='mobile-bg-content mx-auto'>
                        <h1>Elevate your sneaker game with PGF Prime</h1>
                        <p>Discover a world of stylish and comfortable sneakers that redefine your every step.</p>
                        <button className=' mobile-bg-button py-2.5 rounded'>Shop Now</button>
                    </div>
                </div>
            </div>
            <div className='web-bg md:block hidden'>
                <div className='web-bg-image'>
                    <div className='web-bg-content mx-auto'>
                        <h1>Elevate your sneaker game with PGF Prime</h1>
                        <p>Discover a world of stylish and comfortable sneakers that redefine your every step.</p>
                        <button className='web-bg-button py-2.5 rounded'>Shop Now</button>
                    </div>
                    <img src='../images/angle-down.png' className='w-7 h-7 mx-auto mt-5' />
                </div>
            </div>
        </div>
    )
}
export default BgImage;