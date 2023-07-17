import styles from './Products.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearError } from '../../actions/productActions';
import { useEffect, useState } from 'react';
import Loader from '../../components/layout/Loader/Loader';
import { useAlert } from 'react-alert';
import Product from '../Home/Product';
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Slider from '@mui/material/Slider';
import NoReview from './NoReview';
import Sidebar from './Sidebar';
import { MAX_PRICE, MIN_PRICE, STEPS } from '../../constants/global';
import Rating from '@mui/material/Rating';

const Products = () => {
    const { loading, error, productCount, products, resultPerPage } = useSelector(state => state.products);
    const [category, setCategory] = useState(null);
    const [pageNo, setPageNo] = useState(1);
    const [rating, setRating] = useState(0);
    const [price, setPrice] = useState([MIN_PRICE, MAX_PRICE]);
    const [finalPrice, setFinalprice] = useState([MIN_PRICE, MAX_PRICE]);
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { keyword } = useParams();
    const count = (productCount && resultPerPage) ? Math.ceil(productCount / resultPerPage) : 0;

    useEffect(() => {
        dispatch(getProducts(keyword, pageNo, finalPrice, category, rating));
    }, [dispatch, keyword, pageNo, finalPrice, category, rating]);

    if (error) {
        alert.show(error);
        dispatch(clearError());
    }

    const clickHandler = (id) => {
        navigate('/product/' + id);
    }

    const changePageNo = (e, pageNo) => {
        setPageNo(pageNo);
    }

    const sliderHandler = (e, val) => {
        setPrice(val);
    }

    const finalPriceHandler = (e, val) => {
        setFinalprice(val);
    }

    const setCategoryHandler = (category) => {
        setCategory(category);
    }

    const ratingChangeHandler = (e, val) => {
        setRating(val);
    }

    const marks = [
        {
            value: MIN_PRICE,
            label: `₹${MIN_PRICE}`
        },
        {
            value: MAX_PRICE,
            label: `₹${MAX_PRICE}`
        }
    ]

    return (
        <>
            {
                loading ? <Loader /> : !error && <>
                    <Sidebar setCategoryHandler={setCategoryHandler} />
                    <h2 className={styles['heading']}>All Products</h2>
                    <div className={styles['all-products']}>
                        {
                            products.map((product) => {
                                return <div key={product._id}
                                    onClick={() => clickHandler(product._id)} >
                                    <Product disableLink={true} product={product} />
                                </div>
                            })
                        }
                    </div>

                    {products.length === 0 && <NoReview text={"No Products"} />}
                    
                    <div className={styles['rating-container']}>
                        <div>Filter Rating</div>
                        <Rating
                            precision={0.5}
                            value={rating}
                            onChange={ratingChangeHandler}
                            size="large"
                        />
                    </div>

                    <div className={styles['slider-container']}>
                        <div>Filter Price</div>
                        <Slider
                            aria-label="Price filter"
                            valueLabelDisplay="auto"
                            min={MIN_PRICE}
                            max={MAX_PRICE}
                            marks={marks}
                            value={price}
                            step={STEPS}
                            onChange={sliderHandler}
                            onChangeCommitted={finalPriceHandler}
                            color="primary"
                        />
                    </div>


                    {count > 1 && <div className={styles['pagination-container']}>
                        <Pagination
                            count={count}
                            onChange={changePageNo}
                            page={pageNo}
                            color="primary"
                            variant="outlined"
                        />
                    </div>}
                </>
            }
        </>
    )
}

export default Products;