import styles from './CartItem.module.css';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { removeFromCart, addItemToCart } from '../../actions/cartAction';
import { useRef } from 'react';

const CartItem = ({ item }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const quantityRef = useRef();

    const removeItemFromCart = () => {
        dispatch(removeFromCart(item.productID));
        alert.show(`Item : ${item.productID} removed from cart`);
    }

    const addItemToCartHandler = () => {
        if (item.quantity >= item.stock) {
            return;
        }
        dispatch(addItemToCart(item.productID, item.quantity + 1));
        quantityRef.current.value = Number(quantityRef.current.value)+1;
    }

    const removeItemFromCartHandler = () => {
        if (item.quantity > 1) {
            dispatch(addItemToCart(item.productID, item.quantity - 1));
            quantityRef.current.value -= 1;
        } else {
            dispatch(removeFromCart(item.productID));
        }
    }

    return (
        <div className={styles['d-grid']}>
            <div className={styles['product-details-container']}>
                <img src={item.image} alt='item' />
                <div>
                    <div>{item.name}</div>
                    <div className={styles['pid']}>{item.productID}</div>
                    <div className={styles['price']}>Price: ₹{item.price}</div>
                    <div className={styles['remove']} onClick={removeItemFromCart}>Remove</div>
                </div>
            </div>

            <div className={styles['quantity-container']}>
                <button onClick={addItemToCartHandler}><strong>+</strong></button>
                <input type="number" ref={quantityRef} defaultValue={item.quantity} readOnly></input>
                <button onClick={removeItemFromCartHandler}><strong>-</strong></button>
            </div>

            <div className={styles['price-container']}>₹{item.price * item.quantity}</div>
        </div>
    )
}

export default CartItem;