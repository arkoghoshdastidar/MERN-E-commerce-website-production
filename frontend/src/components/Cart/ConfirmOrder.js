import StepperCmp from './StepperCmp';
import { useSelector } from 'react-redux';
import styles from './ConfirmOrder.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '@mui/material/Button';

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const name = user ? (user.user ? user.user.name : '') : '';
    const phoneNo = shippingInfo.phoneNo;
    const address = `${shippingInfo.address} ${shippingInfo.city} ${shippingInfo.state} ${shippingInfo.country} - ${shippingInfo.pinCode}`;
    let subtotal = 0;

    cartItems.forEach(cartItem => {
        subtotal += cartItem.price * cartItem.quantity;
    });

    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const total = subtotal + shippingCharges + 0.18*subtotal;

    useEffect(() => {
        if (user && user.isAuthenticated === false) {
            navigate('/login');
        }
    }, [navigate, user]);

    const checkoutHandler = () => {
        sessionStorage.setItem('shippingInfo', JSON.stringify({...shippingInfo,
        subtotal,
        taxes: 0.18*subtotal,
        shippingCharges,
        total
        }));
        navigate('/process/checkout');
    }

    return (
        <>
            <StepperCmp activeIndex={1} />
            <div className={styles['confirm-order-container']}>
                <div className={styles['shipping-information']}>
                    <h2>Shipping Information</h2>
                    <div className={styles['user-info']}>
                        <p>Name : <span>{name}</span></p>
                        <p>Phone Number : <span>{phoneNo}</span></p>
                        <p>Address : <span>{address}</span></p>
                    </div>
                    <h2>Cart Items</h2>
                    <div className={styles['cart-items']}>
                        {
                            cartItems.map((item) => {
                                return (
                                    <div key={item.productID} className={styles['item']}>
                                        <img className={styles['product-image']} src={item.image} alt={item.name} />
                                        <small className={styles['product-link']} onClick={() => navigate(`/product/${item.productID}`)}>{item.name}</small>
                                        <p>{item.price}*{item.quantity} = ₹{item.price * item.quantity}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles['payment-details']}>
                    <h2>Order Summary</h2>
                    <p>Subtotal: ₹{subtotal}<span></span></p>
                    <p>Shipping Charger: ₹{subtotal > 1000 ? 0 : 200}<span></span></p>
                    <p>Taxex: ₹{subtotal * 0.18}<span></span></p>
                    <p><b>Total: ₹{total}<span></span></b></p>
                </div>
            </div>
            <div className={styles['btn-container']}>
                <Button onClick={() => checkoutHandler()} size="medium" variant="contained">Checkout</Button>
            </div>
        </>
    )
}

export default ConfirmOrder;