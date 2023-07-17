import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const Product = ({ product, disableLink }) => {
    const options = {
        edit: false,
        value: product.rating,
        isHalf: true
    }
    const numOfReviews = product.reviews.length;
    const linkClass = (disableLink) ? `${styles['product-card']} ${styles['disable-link']}` : styles['product-card'];

    return (
        <Link className={linkClass} to={`product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /> <span>({numOfReviews <= 1 ? `${numOfReviews} Review` : `${numOfReviews} Reviews`})</span>
            </div>
            <span>₹ {product.price}</span>
        </Link>
    )
}

export default Product;