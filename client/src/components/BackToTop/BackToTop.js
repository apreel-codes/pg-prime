import React, { useState, useEffect } from 'react';


const BackToTop = () => {
    const [backToTopButton, setBackToTopButton ] = useState(false);
    
    useEffect(() => {
        window.addEventListener("scroll", () => {
            //if user scrolls more than a 100pixels
            if(window.scrollY > 200) {
                setBackToTopButton(true)
            } else {
                setBackToTopButton(false)
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }


    return (
        <div className='border'>
           { backToTopButton && (
            <div>
                <button 
                onClick={scrollUp} 
                style={{
                    position: "fixed",
                    bottom: "85px",
                    right: "90px",
                    height: "20px",
                    width: "20px",
                    fontSize: "30px",
                }}>^</button>
            </div>
            
           )}
        </div>
    )
}

export default BackToTop;