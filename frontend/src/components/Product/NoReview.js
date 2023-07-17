import styles from './NoReview.module.css';
import { FaSadTear } from 'react-icons/fa';

const NoReview = ({ text }) => {
    return (
        <div className={styles['no-reviews']}>
            <div>{text}</div>
            <FaSadTear />
        </div>
    )
}

export default NoReview;