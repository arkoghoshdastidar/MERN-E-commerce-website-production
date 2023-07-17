import styles from './OrderItem.module.css';
import { useNavigate } from 'react-router-dom';

const OrderItem = ({ item }) => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate('/orders/'+item.orderID);
    }

    return (
        <div className={styles['order-item-container']}>
            {item.click === false ? <div>{item.orderID}</div> : <div className={styles['link']} onClick={clickHandler}>{item.orderID}</div>}
            <div>{item.status}</div>
            <div>{item.item.quantity}</div>
            {
                item.click === false ? <div>Amount</div> : <div>₹{item.item.price * item.item.quantity}</div>
            }
        </div>
    )
}

export default OrderItem;