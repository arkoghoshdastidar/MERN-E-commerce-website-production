import styles from './OrderDetails.module.css';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, clearErrors } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';

const OrderDetails = () => {
    const params = useParams();
    const alert = useAlert();
    const orderID = params.orderID;
    const dispatch = useDispatch();
    const { orderDetails, loading, error } = useSelector(state => state.orderDetails);
    const { isAuthenticated } = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOrderDetails(orderID));
    }, [dispatch, orderID]);

    if (!isAuthenticated) {
        alert.show('Login to fetch order details');
        navigate('/login');
    }

    if (error) {
        alert.show(error);
        dispatch(clearErrors());
        navigate('/login');
    }

    let itemPrice = 0;
    if (orderDetails.orders) {
        orderDetails.orders.orderItems.forEach(i => {
            itemPrice += i.price * i.quantity;
        })
    }

    const clickHandler = (id) => {
        navigate('/product/'+id);
    }

    return (
        <>
            {
                loading ? <Loader /> : orderDetails.orders &&
                    <>
                        <div className={styles['order-details-container']}>
                            {
                                orderDetails.orders.orderItems.map((i) => {
                                    return (
                                        <div key={i._id} className={styles['order-item']}>
                                            <div className={styles['img-container']}>
                                                <img src={i.image} alt='order' />
                                            </div>
                                            <div>
                                                <p>{i.name}</p>
                                                <p>{i.price}*{i.quantity} = <b>₹</b>{i.price * i.quantity}</p>
                                                <p className={styles['link']}
                                                    onClick={() => clickHandler(i.product)}
                                                >{i.product}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className={styles['pricing-container']}>
                                <p>Status : {orderDetails.orders.orderStatus}</p>
                                <p>Item Prices = <b>₹</b>{itemPrice}</p>
                                <p>Tax Price = <b>₹</b>{itemPrice * 0.18}</p>
                                <p>Shipping Price = <b>₹</b>{itemPrice > 2000 ? 0 : 200}</p>
                                <p>Total Price = <b>₹</b>{1.18 * itemPrice + (itemPrice > 2000 ? 0 : 200)}</p>
                            </div>
                            <div className={styles['shipping-container']}>
                                {`${orderDetails.orders.shippingInfo.address} ${orderDetails.orders.shippingInfo.city} ${orderDetails.orders.shippingInfo.state} ${orderDetails.orders.shippingInfo.country}-${orderDetails.orders.shippingInfo.pinCode}`}
                                <p>PH : {orderDetails.orders.shippingInfo.phoneNumber}</p>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default OrderDetails;