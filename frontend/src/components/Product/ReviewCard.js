import styles from './ReviewCard.module.css';
import ReactStars from "react-rating-stars-component";
import { FaRegUserCircle } from "react-icons/fa";

const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        value: review.rating,
        isHalf: true,
        size: 16
    }

    return (
        <div className={styles['review-card']}>
            <div>
                <FaRegUserCircle/>
                {review.name} 
            </div>
            <ReactStars {...options} />
            <small>{review.comment}</small>
        </div>
    )
}

export default ReviewCard;