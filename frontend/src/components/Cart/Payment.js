import React, { useRef } from 'react';
import styles from './Payment.module.css';
import StepperCmp from './StepperCmp';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../actions/orderAction';
import { removeFromCart } from '../../actions/cartAction';

const Payment = () => {
    const nameRef = useRef();
    const accNoRef = useRef();
    const cvvRef = useRef();
    const monthRef = useRef();
    const yearRef = useRef();

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { cartItems, shippingInfo } = useSelector(state => state.cart);



    const handlerSubmit = () => {
        if ((nameRef.current.value.trim().length < 8) || (accNoRef.current.value.trim().length < 15) || (monthRef.current.value.trim().length < 1) || (yearRef.current.value.trim().length < 0) || (cvvRef.current.value.trim().length < 3)) {
            alert.show('Invalid credentials');
            return;
        }
        const shippingInformation = {
            ...shippingInfo,
            phoneNumber: shippingInfo.phoneNo
        }

        let itemPrice = 0;
        let taxPrice = 0;
        let shippingPrice = 0;
        let totalPrice = 0;

        const orderItems = cartItems.map(item => {
            itemPrice += item.price * item.quantity;
            return {
                ...item,
                product: item.productID
            }
        })

        taxPrice = 0.18 * itemPrice;
        shippingPrice = (itemPrice > 2000) ? 0 : 200;
        totalPrice = itemPrice + taxPrice + shippingPrice;

        const paymentInfo = {
            "id": 'id',
            "status": "success"
        };

        const data = {
            shippingInfo: shippingInformation,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        };

        dispatch(createOrder(data));

        cartItems.forEach(item => {
            dispatch(removeFromCart(item.productID));
        })

        alert.success('Payment successful');
        navigate('/login');
    };

    return (
        <>
            <StepperCmp activeIndex={2} />
            <div className={styles["col-50"]}>
                <h3>Payment</h3>
                <div>
                    <label>Name on Card</label>
                    <input ref={nameRef} type="text" name="cardname" placeholder="John More Doe" />
                </div>
                <div>
                    <label>Credit card number</label>
                    <input ref={accNoRef} type="text" name="cardnumber" placeholder="1111-2222-3333-4444" />
                </div>
                <div>
                    <label>Exp Month</label>
                    <input ref={monthRef} type="text" name="expmonth" placeholder="September" />
                </div>
                <div>
                    <label>Exp Year</label>
                    <input ref={yearRef} type="text" name="expyear" placeholder="2018" />
                </div>
                <div>
                    <label>CVV</label>
                    <input ref={cvvRef} type="text" name="cvv" placeholder="352" />
                </div>
            </div>
            <button onClick={() => handlerSubmit()} className={styles['pay']}>Pay</button>
        </>
    )
}
export default Payment;