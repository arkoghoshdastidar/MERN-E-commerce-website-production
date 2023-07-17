import styles from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import NoItem from '../Product/NoReview';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const Cart = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.user);
    const items = useSelector(state => state.cart.cartItems);

    let totalPrice = 0;

    for (let i = 0; i < items.length; i++) {
        totalPrice += items[i].price * items[i].quantity;
    }

    if (!items || items.length === 0) {
        return <NoItem text={"No item in cart"} />
    }

    const orderHandler = () => {
        if(isAuthenticated){
            navigate('/shipping');
        }else{
            navigate('/login');
            alert.info('Please login to place order.');
        }
    }

    return (
        <>
            <div className={styles['cart-container']}>
                <div className={`${styles['d-grid']} ${styles['primary-background']}`}>
                    <div>Product</div>
                    <div>Quantity</div>
                    <div>Subtotal</div>
                </div>
                {
                    items.map(item => <CartItem key={item.productID} item={item} />)
                }
            </div>
            <div className={styles['order-container']}>
                <div className={styles['total-price']}>₹{totalPrice}</div>
                <button className={styles['order-button']} onClick={orderHandler}>Order Now</button>
            </div>
        </>
    )
}

export default Cart;