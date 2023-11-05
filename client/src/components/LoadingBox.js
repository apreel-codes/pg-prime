import Spinner from 'react-bootstrap/Spinner';

const LoadingBox = () => {
    return (     
        <div className='order w-[10%] mx-auto mt-56'>
            <Spinner className='' animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>  
      
    )
}

export default LoadingBox;