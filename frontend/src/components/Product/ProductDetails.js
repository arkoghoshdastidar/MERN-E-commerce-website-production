import styles from './ProductDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getProductDetails, addNewReivew } from '../../actions/productActions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Loader from '../layout/Loader/Loader';
import ReactStars from "react-rating-stars-component";
import ReviewCard from './ReviewCard.js';
import NoReview from './NoReview.js';
import { useAlert } from 'react-alert'
import { clearError } from '../../actions/productActions';
import { addItemToCart } from '../../actions/cartAction';
import Carousel from '../layout/Carousel/Carousel.js';

const ProductDetails = () => {
    const [index, setIndex] = useState(0);
    const [count, setCount] = useState(1);
    const params = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetails);
    const { isAuthenticated } = useSelector(state => state.user);
    const alert = useAlert();
    const textAreaRef = useRef();
    const [rating, setRating] = useState(null);
    const productId = params.id;
    const { reviewLoading } = useSelector(state => state.newReview);

    useEffect(() => {
        dispatch(getProductDetails(productId));
    }, [dispatch, productId, reviewLoading]);

    if (error) {
        alert.show(error);
        dispatch(clearError());
    }

    const options = {
        edit: true,
        value: (product) ? product.rating : 0,
        isHalf: true,
        size: 32
    }

    const addOne = () => {
        if (count < product.stock) {
            setCount(count + 1);
        }
    }

    const subOne = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    const addToCartHandler = () => {
        if (product.stock === 0) {
            alert.show('Product out of stock');
            return;
        }
        dispatch(addItemToCart(params.id, count));
        alert.success('Item added to cart successfully.');
    }

    const productName = (product && product.name) ? product.name.toUpperCase() : " ";

    const submitReview = async () => {
        const comment = textAreaRef.current.value.trim();
        if (comment.length === 0 || rating === null) {
            alert.show('Enter some text and add a rating to submit review');
            return;
        } else {
            dispatch(addNewReivew({comment, rating, productId}));
            alert.success('Review added successfully.');
        }
        textAreaRef.current.value = '';
        setRating(null);
    }

    const ratingChangeHandler = (newRating) => {
        setRating(newRating);
    }

    const setPrevHandler = () => {
        if(!product){
            return;
        }
        setIndex((index-1+product.images.length)%product.images.length);
    }

    const setNextHandler = () => {
        if(!product){
            return;
        }
        setIndex((index+1)%product.images.length);
    }

    return (
        <>
            <div className={styles['container']}>
                {loading || reviewLoading ? <Loader /> : product &&
                    <>
                        <div className={styles['carousel-container']}>
                            {product.images && <Carousel images={product.images} index={index}/>
                            }
                            <div>
                                <button onClick={() => setPrevHandler()}>Prev</button>
                                <button onClick={() => setNextHandler()}>Next</button>
                            </div>
                        </div>
                        <div className={styles['details-container']}>
                            <div className={styles['large']}><strong>{productName}</strong></div>
                            <div><strong>ID:</strong> {product._id}</div>
                            <div className={styles['large']}><strong>Price: ₹{product.price}</strong></div>
                            <div><strong>Description: </strong>{product.description}</div>
                            <div><strong>Stock: </strong>
                                <span className={product.stock < 1 ? styles['danger'] : styles['success']}>
                                    {product.stock < 1 ? " Out of stock " : " In stock "}
                                </span>
                                <small>({product.stock} {product.stock > 1 ? " items remaining" : " item remaining"})</small>
                            </div>
                            <div>
                                <button onClick={subOne}>-</button>
                                <input type="number" value={count} readOnly min={1}></input>
                                <button onClick={addOne}>+</button>
                            </div>
                            <button onClick={addToCartHandler} >Add to cart</button>
                            <div>
                                <ReactStars onChange={ratingChangeHandler} {...options} />
                            </div>
                            {/* review container */}
                            {
                                isAuthenticated && <>
                                    <div>
                                        <textarea ref={textAreaRef} className={styles['text-area']} />
                                    </div>
                                    <button onClick={submitReview}>Submit Review</button>
                                </>
                            }
                        </div>
                    </>
                }
            </div>
            <div className={styles['reviews-container']}>
                <h2>Product Reviews</h2>
                {
                    !loading && product && product.reviews && product.reviews.length > 0 &&
                    product.reviews.map((review) => <ReviewCard key={review._id} review={review} />)
                }
                {
                    !loading && product && product.reviews && product.reviews.length === 0 && <NoReview text={"No Reviews"} />
                }
            </div>
        </>
    );
}

export default ProductDetails;