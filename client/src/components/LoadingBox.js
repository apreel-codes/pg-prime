import Spinner from 'react-bootstrap/Spinner';

const LoadingBox = () => {
    return (
        
            <Spinner className='mx-auto' animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
      
    )
}

export default LoadingBox;