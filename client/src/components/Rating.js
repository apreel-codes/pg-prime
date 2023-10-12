


const Rating = (props) => {
    const { rating, numReviews } = props;
    return (
        <div className="rating flex flex-row justify-between">
        <div>
            <span>
                <i className={rating >= 1 
                ?'fas fa-star' 
                : rating >= 0.5 
                ? 'fas fa-star-half-alt' 
                : 'far fa-star'} />
            </span>
            <span>
                <i className={rating >= 2
                ?'fas fa-star' 
                : rating >= 1.5 
                ? 'fas fa-star-half-alt' 
                : 'far fa-star'} />
            </span>
            <span>
                <i className={rating >= 3
                ?'fas fa-star' 
                : rating >= 2.5 
                ? 'fas fa-star-half-alt' 
                : 'far fa-star'} />
            </span>
            <span>
                <i className={rating >= 4
                ?'fas fa-star' 
                : rating >= 3.5 
                ? 'fas fa-star-half-alt' 
                : 'far fa-star'} />
            </span>
            <span>
                <i className={rating >= 5
                ?'fas fa-star' 
                : rating >= 4.5 
                ? 'fas fa-star-half-alt' 
                : 'far fa-star'} />
            </span>
        </div>
        <span className="text-black text-medium"> {numReviews} reviews</span>
        </div>
    )
}

export default Rating;